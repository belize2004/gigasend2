"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FileUploader } from "../Upload/FileUploader";
// import { AdvancedParams } from "./AdvancedParams";
import { TermsConditions } from "../TermsConditions";
import FileList from "../File/FileList";
import Image from '@/components/compat/Image';
import { type FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFormSchema } from "./schema/uploadSchema";
import { z } from "zod";
import { useFileContext } from "@/context/FileContext";
import { useAuth } from "@/context/useAuth";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from '@/components/compat/navigation';
import { ZipWriter } from "@zip.js/zip.js";
import { formatBytes, renameDuplicates } from "@/lib/utils";
import axios from "axios";
import type { UsageData } from '@/types/app-data';
import { PLANS } from "@/lib/constant";
import pLimit from "p-limit";
import { addMonitoringBreadcrumb, captureMonitoringException } from "@/lib/monitoring";
import { brand } from "@/lib/brand";

type UploadFormData = z.infer<typeof UploadFormSchema>;
type UploadStatus = "initiating" | "uploading" | "zipping" | "sending email" | "finalizing" | null
type UploadedPart = { PartNumber: number; ETag: string; size: number };
type SavedUploadSession = {
  uploadId: string;
  key: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileLastModified: number;
  partSize: number;
  parts: UploadedPart[];
  createdAt: number;
};
type TelemetryEvent = "completed" | "canceled" | "failed";
type UploadTelemetry = {
  retryCount: number;
  completedParts: number;
  pauseCount: number;
  partSize: number | null;
  resumedFromSavedSession: boolean;
  canceled: boolean;
  transferMode: string;
  initMs: number;
  transferMs: number;
  finalizeMs: number;
  shareCreationMs: number;
  shareId: string | null;
};
type InitiatedUpload = { uploadId: string; key: string; urls?: Record<string, string> };
type UploadedFile = { key: string; uploadedSize: number };
type UploadSingleFileOptions = {
  persistSession?: boolean;
  preserveProgress?: boolean;
};
type DeliveryMode = "email" | "link";

const UPLOAD_CONCURRENCY = 8;
const MAX_ADAPTIVE_CONCURRENCY = 12;
const DIRECT_FILE_UPLOAD_CONCURRENCY = 8;
const PRESIGN_BATCH_SIZE = 32;
const PACKAGE_MULTI_FILE_UPLOADS_AS_ZIP = false;
const MULTI_FILE_DIRECT_UPLOAD_COUNT_THRESHOLD = 1;
const MULTI_FILE_DIRECT_UPLOAD_SIZE_THRESHOLD = 0;
const DIRECT_PUT_FILE_SIZE_THRESHOLD = 16 * 1024 * 1024;
const SMALL_MULTIPART_PART_SIZE = 8 * 1024 * 1024;
const MIN_PART_SIZE = 16 * 1024 * 1024;
const MEDIUM_FILE_PART_SIZE = 32 * 1024 * 1024;
const LARGE_FILE_PART_SIZE = 64 * 1024 * 1024;
const SMALL_MULTIPART_THRESHOLD = 64 * 1024 * 1024;
const MEDIUM_FILE_THRESHOLD = 512 * 1024 * 1024;
const LARGE_FILE_THRESHOLD = 2 * 1024 * 1024 * 1024;
const MAX_MULTIPART_PARTS = 10_000;
const MAX_MULTIPART_PART_SIZE = 5 * 1024 * 1024 * 1024;
const PART_SIZE_ALIGNMENT = 1024 * 1024;
const SAVED_UPLOAD_SESSION_KEY = "gigasend:upload-session:v1";
const ADAPTIVE_TUNING_KEY = "gigasend:adaptive-speed-profile:v1";
const limit = pLimit(MAX_ADAPTIVE_CONCURRENCY);

function readAdaptiveTuning(): {
  concurrency: number;
  chunkSizeMultiplier: number;
  presignBatchSize: number;
} {
  if (typeof window === "undefined") {
    return { concurrency: UPLOAD_CONCURRENCY, chunkSizeMultiplier: 1, presignBatchSize: PRESIGN_BATCH_SIZE };
  }
  try {
    const raw = window.localStorage.getItem(ADAPTIVE_TUNING_KEY);
    if (!raw) {
      return { concurrency: UPLOAD_CONCURRENCY, chunkSizeMultiplier: 1, presignBatchSize: PRESIGN_BATCH_SIZE };
    }
    const parsed = JSON.parse(raw);
    return {
      concurrency: Math.min(MAX_ADAPTIVE_CONCURRENCY, Math.max(4, Number(parsed.concurrency) || UPLOAD_CONCURRENCY)),
      chunkSizeMultiplier: parsed.chunkSizeMultiplier === 0.5 || parsed.chunkSizeMultiplier === 2 ? parsed.chunkSizeMultiplier : 1,
      presignBatchSize: Math.min(64, Math.max(16, Number(parsed.presignBatchSize) || PRESIGN_BATCH_SIZE)),
    };
  } catch {
    return { concurrency: UPLOAD_CONCURRENCY, chunkSizeMultiplier: 1, presignBatchSize: PRESIGN_BATCH_SIZE };
  }
}

function getAdaptiveConcurrency(liveRetryCount = 0): number {
  if (liveRetryCount >= 2) {
    return 4;
  }
  return readAdaptiveTuning().concurrency;
}

function getUploadPartSize(fileSize: number) {
  const { chunkSizeMultiplier } = readAdaptiveTuning();
  const rawBasePartSize =
    fileSize < SMALL_MULTIPART_THRESHOLD
      ? SMALL_MULTIPART_PART_SIZE
      : fileSize < MEDIUM_FILE_THRESHOLD
        ? MIN_PART_SIZE
        : fileSize < LARGE_FILE_THRESHOLD
          ? MEDIUM_FILE_PART_SIZE
          : LARGE_FILE_PART_SIZE;
  const basePartSize = Math.max(SMALL_MULTIPART_PART_SIZE, Math.round(rawBasePartSize * chunkSizeMultiplier));
  const requiredPartSize = Math.ceil(fileSize / MAX_MULTIPART_PARTS);
  const alignedPartSize = Math.ceil(requiredPartSize / PART_SIZE_ALIGNMENT) * PART_SIZE_ALIGNMENT;

  return Math.min(MAX_MULTIPART_PART_SIZE, Math.max(basePartSize, alignedPartSize));
}

function shouldUploadFilesIndividually(fileCount: number, totalBytes: number) {
  if (!PACKAGE_MULTI_FILE_UPLOADS_AS_ZIP) {
    return fileCount > MULTI_FILE_DIRECT_UPLOAD_COUNT_THRESHOLD || totalBytes > MULTI_FILE_DIRECT_UPLOAD_SIZE_THRESHOLD;
  }

  if (totalBytes > MULTI_FILE_DIRECT_UPLOAD_SIZE_THRESHOLD) {
    return true;
  }

  if (fileCount > MULTI_FILE_DIRECT_UPLOAD_COUNT_THRESHOLD) {
    return true;
  }

  return false;
}

async function waitForUploadSlot(uploadPromises: Array<Promise<void>>, concurrency: number) {
  while (uploadPromises.length >= concurrency) {
    await Promise.race(uploadPromises);
  }
}

function removeUploadPromise(uploadPromises: Array<Promise<void>>, uploadPromise: Promise<void>) {
  const index = uploadPromises.indexOf(uploadPromise);
  if (index > -1) {
    uploadPromises.splice(index, 1);
  }
}

function isUploadCanceled(error: unknown) {
  return error instanceof Error && error.message === "Upload canceled";
}

function isUploadRejected(error: unknown) {
  if (isUploadCanceled(error)) {
    return;
  }

  throw error;
}

export const FileForm = () => {
  const { files, setFiles } = useFileContext();
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState(false);
  const totalBytesRef = useRef(0);
  const totalUploadedRef = useRef(0);
  const chunkProgressRef = useRef<{ [chunkId: string]: number }>({});
  const uploadStartTimeRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const pauseStartedAtRef = useRef<number | null>(null);
  const pausedDurationRef = useRef(0);
  const pauseResolversRef = useRef<Array<() => void>>([]);
  const activeXhrsRef = useRef<Set<XMLHttpRequest>>(new Set());
  const presignedUrlCacheRef = useRef<Map<string, string>>(new Map());
  const presignedUrlBatchesRef = useRef<Map<string, Promise<Record<string, string>>>>(new Map());
  const activeSessionRef = useRef<SavedUploadSession | null>(null);
  const abortRequestedRef = useRef(false);
  const telemetryRef = useRef<UploadTelemetry>({
    retryCount: 0,
    completedParts: 0,
    pauseCount: 0,
    partSize: null,
    resumedFromSavedSession: false,
    canceled: false,
    transferMode: "multipart_single",
    initMs: 0,
    transferMs: 0,
    finalizeMs: 0,
    shareCreationMs: 0,
    shareId: null,
  });
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState<number | null>(null);
  const [currentSpeedMBps, setCurrentSpeedMBps] = useState<number | null>(null);
  const [savedSession, setSavedSession] = useState<SavedUploadSession | null>(null);
  const [allowedLimit, setAllowedLimit] = useState(PLANS.free.storageBytes * (1024 ** 3));
  const [usageLoading, setUsageLoading] = useState(true);
  const [expiryLimit, setExpiryLimit] = useState(3); // in days
  const [expiryDateText, setExpiryDateText] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(null)
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("link");
  const { auth } = useAuth();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({
    open: false,
    msg: "",
  });
  const router = useRouter();
  const startTimeRef = useRef<null | number>(null)
  const partNumberRef = useRef(1);

  useEffect(() => {
    if (!uploading) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [uploading]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<UploadFormData>({
    resolver: zodResolver(UploadFormSchema),
    shouldUnregister: true,
  });

  const showToast = (msg: string) => setToast({ open: true, msg });

  const resetTelemetry = () => {
    telemetryRef.current = {
      retryCount: 0,
      completedParts: 0,
      pauseCount: 0,
      partSize: null,
      resumedFromSavedSession: false,
      canceled: false,
      transferMode: files.length > 1 ? "multipart_parallel_files" : "multipart_single",
      initMs: 0,
      transferMs: 0,
      finalizeMs: 0,
      shareCreationMs: 0,
      shareId: null,
    };
  };

  const sendTelemetry = (event: TelemetryEvent, errorMessage?: string) => {
    if (!uploadStartTimeRef.current) return;

    const activeMs = Math.max(1, Date.now() - uploadStartTimeRef.current - pausedDurationRef.current);
    const effectiveTransferMs =
      telemetryRef.current.transferMs > 0
        ? telemetryRef.current.transferMs
        : Math.max(
            1,
            activeMs -
              telemetryRef.current.initMs -
              telemetryRef.current.finalizeMs -
              telemetryRef.current.shareCreationMs,
          );
    const averageMbps =
      effectiveTransferMs > 0
        ? (totalUploadedRef.current * 8) / (effectiveTransferMs / 1000) / 1_000_000
        : 0;
    const conn = typeof navigator !== "undefined" ? (navigator as any).connection : null;

    const payload = {
      event,
      direction: "upload",
      shareId: telemetryRef.current.shareId,
      transferMode: telemetryRef.current.transferMode,
      deliveryMode,
      fileCount: files.length,
      totalBytes: totalBytesRef.current,
      uploadedBytes: totalUploadedRef.current,
      partSize: telemetryRef.current.partSize,
      concurrency: getAdaptiveConcurrency(telemetryRef.current.retryCount),
      completedParts: telemetryRef.current.completedParts,
      retryCount: telemetryRef.current.retryCount,
      pauseCount: telemetryRef.current.pauseCount,
      resumedFromSavedSession: telemetryRef.current.resumedFromSavedSession,
      durationMs: Math.max(0, activeMs),
      pausedMs: pausedDurationRef.current,
      initMs: telemetryRef.current.initMs,
      transferMs: effectiveTransferMs,
      finalizeMs: telemetryRef.current.finalizeMs,
      shareCreationMs: telemetryRef.current.shareCreationMs,
      averageMbps: Number(averageMbps.toFixed(2)),
      clientConnectionType: typeof conn?.effectiveType === "string" ? conn.effectiveType : null,
      clientDownlinkMbps: typeof conn?.downlink === "number" ? conn.downlink : null,
      clientRttMs: typeof conn?.rtt === "number" ? conn.rtt : null,
      errorMessage,
      canceled: telemetryRef.current.canceled,
    };

    fetch("/api/uploads/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then((res) => res.json().catch(() => null))
      .then((data) => {
        if (typeof window !== "undefined" && data?.evaluation?.recommendedTuning) {
          try {
            window.localStorage.setItem(
              ADAPTIVE_TUNING_KEY,
              JSON.stringify(data.evaluation.recommendedTuning),
            );
          } catch {
            // Ignore localStorage quota errors
          }
        }
      })
      .catch((error) => console.warn("Failed to send upload telemetry:", error));
  };

  const getFileFingerprint = (file: File) =>
    `${file.name}:${file.size}:${file.type || "application/octet-stream"}:${file.lastModified}`;

  const getSessionFingerprint = (session: SavedUploadSession) =>
    `${session.fileName}:${session.fileSize}:${session.fileType}:${session.fileLastModified}`;

  const readSavedSession = (): SavedUploadSession | null => {
    if (typeof window === "undefined") return null;

    try {
      const raw = window.localStorage.getItem(SAVED_UPLOAD_SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as SavedUploadSession;
      const maxAgeMs = 12 * 60 * 60 * 1000;
      const isExpired = !parsed?.createdAt || Date.now() - parsed.createdAt > maxAgeMs;
      const hasMissingEtag = Array.isArray(parsed?.parts) && parsed.parts.some((p) => !p?.ETag);
      if (!parsed?.uploadId || !parsed?.key || isExpired || hasMissingEtag) {
        window.localStorage.removeItem(SAVED_UPLOAD_SESSION_KEY);
        return null;
      }
      return parsed;
    } catch {
      window.localStorage.removeItem(SAVED_UPLOAD_SESSION_KEY);
      return null;
    }
  };

  const writeSavedSession = (session: SavedUploadSession, updateState = false) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SAVED_UPLOAD_SESSION_KEY, JSON.stringify(session));
    if (updateState) {
      setSavedSession(session);
    }
  };

  const clearSavedSession = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(SAVED_UPLOAD_SESSION_KEY);
    }
    setSavedSession(null);
    activeSessionRef.current = null;
  };

  const abortUploadSession = async (session: SavedUploadSession | null) => {
    if (!session) return;

    await fetch("/api/uploads/abort", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uploadId: session.uploadId, key: session.key }),
    });
  };

  const cancelUpload = async () => {
    abortRequestedRef.current = true;
    telemetryRef.current.canceled = true;
    sendTelemetry("canceled");
    resumeUpload();

    const session = activeSessionRef.current ?? savedSession;
    activeXhrsRef.current.forEach((xhr) => xhr.abort());
    activeXhrsRef.current.clear();
    clearSavedSession();

    try {
      await abortUploadSession(session);
    } catch (error) {
      console.warn("Failed to abort upload session:", error);
    }

    setUploading(false);
    setUploadStatus(null);
    setOverallProgress(0);
    setEstimatedTimeLeft(null);
  };

  const waitWhilePaused = useCallback(async () => {
    if (!pausedRef.current) return;

    await new Promise<void>((resolve) => {
      pauseResolversRef.current.push(resolve);
    });
  }, []);

  const pauseUpload = () => {
    if (!uploading || pausedRef.current) return;

    addMonitoringBreadcrumb("Upload paused", {
      uploadedBytes: totalUploadedRef.current,
      totalBytes: totalBytesRef.current,
      pauseCount: telemetryRef.current.pauseCount + 1,
    }, "upload");
    pausedRef.current = true;
    pauseStartedAtRef.current = Date.now();
    telemetryRef.current.pauseCount += 1;
    setIsPaused(true);
    setEstimatedTimeLeft(null);
  };

  const resumeUpload = () => {
    if (!pausedRef.current) return;

    addMonitoringBreadcrumb("Upload resumed", {
      uploadedBytes: totalUploadedRef.current,
      totalBytes: totalBytesRef.current,
      pauseCount: telemetryRef.current.pauseCount,
    }, "upload");
    if (pauseStartedAtRef.current) {
      pausedDurationRef.current += Date.now() - pauseStartedAtRef.current;
      pauseStartedAtRef.current = null;
    }

    pausedRef.current = false;
    setIsPaused(false);
    pauseResolversRef.current.splice(0).forEach((resolve) => resolve());
  };

  function fetchPresignBatch(
    uploadId: string,
    key: string,
    batchStart: number,
    totalParts?: number,
  ): Promise<Record<string, string>> {
    const batchKey = `${uploadId}:${key}:${batchStart}`;
    const existing = presignedUrlBatchesRef.current.get(batchKey);
    if (existing) return existing;

    const maxPart = totalParts
      ? Math.min(batchStart + PRESIGN_BATCH_SIZE - 1, totalParts)
      : batchStart + PRESIGN_BATCH_SIZE - 1;
    const count = Math.max(0, maxPart - batchStart + 1);
    if (count === 0) return Promise.resolve({});

    const partNumbers = Array.from({ length: count }, (_, index) => batchStart + index);
    const batchPromise = fetch("/api/uploads/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uploadId, key, partNumbers }),
    })
      .then(async (presignRes) => {
        const payload = await presignRes.json().catch(() => null);
        if (!presignRes.ok) {
          addMonitoringBreadcrumb("Upload part presign failed", {
            partNumber: batchStart,
            status: presignRes.status,
          }, "upload");
          throw new Error(payload?.message || payload?.error || `Failed to presign batch starting at ${batchStart}`);
        }

        const urls: Record<string, string> = payload?.urls ?? {};
        for (const [partNo, url] of Object.entries(urls)) {
          presignedUrlCacheRef.current.set(`${uploadId}:${key}:${partNo}`, url);
        }
        return urls;
      })
      .catch((err) => {
        presignedUrlBatchesRef.current.delete(batchKey);
        throw err;
      });

    presignedUrlBatchesRef.current.set(batchKey, batchPromise);
    return batchPromise;
  }

  async function getPresignedPartUrl(
    uploadId: string,
    key: string,
    partNumber: number,
    totalParts?: number,
  ): Promise<string> {
    const cacheKey = `${uploadId}:${key}:${partNumber}`;
    const cachedUrl = presignedUrlCacheRef.current.get(cacheKey);
    const batchStart = Math.floor((partNumber - 1) / PRESIGN_BATCH_SIZE) * PRESIGN_BATCH_SIZE + 1;

    // Proactive lookahead prefetch for the next batch when crossing 50% of current batch
    if (
      partNumber - batchStart >= Math.floor(PRESIGN_BATCH_SIZE / 2) &&
      (!totalParts || batchStart + PRESIGN_BATCH_SIZE <= totalParts)
    ) {
      void fetchPresignBatch(uploadId, key, batchStart + PRESIGN_BATCH_SIZE, totalParts).catch(() => {});
    }

    if (cachedUrl) return cachedUrl;

    const urls = await fetchPresignBatch(uploadId, key, batchStart, totalParts);
    const presignedUrl = urls[String(partNumber)] ?? presignedUrlCacheRef.current.get(cacheKey);
    if (!presignedUrl) {
      throw new Error(`Failed to presign part ${partNumber}`);
    }

    return presignedUrl;
  }

  async function uploadChunkToS3(
    chunk: Blob | Uint8Array,
    uploadId: string,
    key: string,
    partNumber: number,
    totalParts?: number,
  ): Promise<string> {
    let ETag: string = '';
    const MAX_RETRIES = 3;
    let retries = 0;
    const chunkByteLength = chunk instanceof Blob ? chunk.size : chunk.byteLength;
    const chunkKey = `${uploadId}:${partNumber}`;

    const rollbackPartialProgress = () => {
      const partial = chunkProgressRef.current[chunkKey] ?? 0;
      if (partial > 0) {
        totalUploadedRef.current = Math.max(0, totalUploadedRef.current - partial);
        delete chunkProgressRef.current[chunkKey];
        updateProgress();
      }
    };

    while (retries <= MAX_RETRIES) {
      await waitWhilePaused();
      if (abortRequestedRef.current) throw new Error("Upload canceled");

      try {
        const presignedUrl = await getPresignedPartUrl(uploadId, key, partNumber, totalParts);
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          activeXhrsRef.current.add(xhr);
          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", "application/octet-stream");
          xhr.upload.onprogress = (event) => {
            if (!event.lengthComputable) return;
            const prev = chunkProgressRef.current[chunkKey] ?? 0;
            const delta = Math.max(0, event.loaded - prev);
            if (delta > 0) {
              chunkProgressRef.current[chunkKey] = event.loaded;
              totalUploadedRef.current += delta;
              updateProgress();
            }
          };
          xhr.onload = () => {
            activeXhrsRef.current.delete(xhr);
            if (xhr.status >= 200 && xhr.status < 300) {
              const eTagHeader = xhr.getResponseHeader("ETag");
              if (eTagHeader) {
                ETag = eTagHeader;
              }
              const recorded = chunkProgressRef.current[chunkKey] ?? 0;
              if (chunkByteLength > recorded) {
                totalUploadedRef.current += chunkByteLength - recorded;
              }
              delete chunkProgressRef.current[chunkKey];
              updateProgress();
              resolve();
            } else {
              rollbackPartialProgress();
              reject(new Error(`Upload failed for part ${partNumber} with status ${xhr.status}`));
            }
          };
          xhr.onerror = () => {
            activeXhrsRef.current.delete(xhr);
            rollbackPartialProgress();
            reject(new Error("Network error during upload"));
          };
          xhr.onabort = () => {
            activeXhrsRef.current.delete(xhr);
            rollbackPartialProgress();
            reject(new Error("Upload canceled"));
          };
          if (abortRequestedRef.current) {
            xhr.abort();
            reject(new Error("Upload canceled"));
            return;
          }
          xhr.send(chunk);
        });
        break;
      } catch (error) {
        if (abortRequestedRef.current || isUploadCanceled(error)) {
          throw error;
        }
        console.warn(`Attempt ${retries + 1} for part ${partNumber} failed:`, error);
        addMonitoringBreadcrumb("Upload part retry", {
          partNumber,
          attempt: retries + 1,
          chunkBytes: chunkByteLength,
        }, "upload");
        retries++;
        telemetryRef.current.retryCount += 1;
        if (retries > MAX_RETRIES) {
          throw new Error(`Failed to upload part ${partNumber} after ${MAX_RETRIES} retries.`);
        }
        await new Promise(resolve => setTimeout(resolve, 2000 * retries));
      }
    }

    return ETag;
  }

  function updateProgress() {
    const uploaded = totalUploadedRef.current;
    const total = totalBytesRef.current;
    const progress = total > 0 ? (uploaded / total) * 100 : 0;
    setOverallProgress(Math.min(progress, 100));

    const pauseOffset = pausedDurationRef.current + (
      pauseStartedAtRef.current ? Date.now() - pauseStartedAtRef.current : 0
    );
    const elapsed = (Date.now() - uploadStartTimeRef.current! - pauseOffset) / 1000;

    if (elapsed >= 0.4 && uploaded > 0) {
      const speedBytesPerSec = uploaded / elapsed;
      setCurrentSpeedMBps(Number((speedBytesPerSec / (1024 * 1024)).toFixed(1)));
      const timeLeft = (total - uploaded) / speedBytesPerSec;
      setEstimatedTimeLeft(Math.max(0, Math.ceil(timeLeft)));
    } else {
      setCurrentSpeedMBps(null);
      setEstimatedTimeLeft(null);
    }
  }

  async function initiateMultipartUpload(
    fileName: string,
    contentType: string,
    fileSize: number,
  ): Promise<InitiatedUpload> {
    const partSize = getUploadPartSize(fileSize);
    const totalParts = Math.max(1, Math.ceil(fileSize / partSize));
    const initialPartCount = Math.min(totalParts, PRESIGN_BATCH_SIZE * 2);

    const initStart = performance.now();
    const initiateRes = await fetch("/api/uploads/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, contentType, fileSize, partCount: initialPartCount }),
    });
    const payload = await initiateRes.json().catch(() => null);
    telemetryRef.current.initMs += Math.round(performance.now() - initStart);

    if (!initiateRes.ok) {
      throw new Error(payload?.message || payload?.error || "Failed to initiate upload");
    }

    if (!payload?.uploadId || !payload?.key) {
      throw new Error("Failed to prepare upload");
    }

    if (payload.urls && typeof payload.urls === "object") {
      for (const [partNo, url] of Object.entries(payload.urls as Record<string, string>)) {
        presignedUrlCacheRef.current.set(`${payload.uploadId}:${payload.key}:${partNo}`, url);
      }
    }

    return { uploadId: payload.uploadId, key: payload.key, urls: payload.urls };
  }

  async function uploadDirectFile(file: File): Promise<UploadedFile> {
    const contentType = file.type || "application/octet-stream";
    const MAX_RETRIES = 3;
    let retries = 0;

    if (files.length === 1) {
      telemetryRef.current.transferMode = "direct_put";
      telemetryRef.current.partSize = file.size;
    }

    setUploadStatus("uploading");
    addMonitoringBreadcrumb("Direct file upload initiated", {
      fileName: file.name,
      fileSize: file.size,
      contentType,
    }, "upload");

    const initStart = performance.now();
    const presignRes = await fetch("/api/uploads/presignDirect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, contentType, fileSize: file.size }),
    });
    const payload = await presignRes.json().catch(() => null);
    telemetryRef.current.initMs += Math.round(performance.now() - initStart);

    if (!presignRes.ok) {
      throw new Error(payload?.message || payload?.error || `Failed to prepare upload for ${file.name}`);
    }

    const chunkKey = `direct:${ payload.key || file.name }`;
    const rollbackDirectProgress = () => {
      const partial = chunkProgressRef.current[chunkKey] ?? 0;
      if (partial > 0) {
        totalUploadedRef.current = Math.max(0, totalUploadedRef.current - partial);
        delete chunkProgressRef.current[chunkKey];
        updateProgress();
      }
    };

    const putStart = performance.now();
    while (retries <= MAX_RETRIES) {
      await waitWhilePaused();
      if (abortRequestedRef.current) throw new Error("Upload canceled");

      try {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          activeXhrsRef.current.add(xhr);
          xhr.open("PUT", payload.url);
          xhr.setRequestHeader("Content-Type", contentType);
          xhr.upload.onprogress = (event) => {
            if (!event.lengthComputable) return;
            const prev = chunkProgressRef.current[chunkKey] ?? 0;
            const delta = Math.max(0, event.loaded - prev);
            if (delta > 0) {
              chunkProgressRef.current[chunkKey] = event.loaded;
              totalUploadedRef.current += delta;
              updateProgress();
            }
          };
          xhr.onload = () => {
            activeXhrsRef.current.delete(xhr);
            if (xhr.status >= 200 && xhr.status < 300) {
              const recorded = chunkProgressRef.current[chunkKey] ?? 0;
              if (file.size > recorded) {
                totalUploadedRef.current += file.size - recorded;
              }
              delete chunkProgressRef.current[chunkKey];
              telemetryRef.current.completedParts += 1;
              updateProgress();
              resolve();
            } else {
              rollbackDirectProgress();
              reject(new Error(`Upload failed for ${file.name} with status ${xhr.status}`));
            }
          };
          xhr.onerror = () => {
            activeXhrsRef.current.delete(xhr);
            rollbackDirectProgress();
            reject(new Error("Network error during upload"));
          };
          xhr.onabort = () => {
            activeXhrsRef.current.delete(xhr);
            rollbackDirectProgress();
            reject(new Error("Upload canceled"));
          };
          if (abortRequestedRef.current) {
            xhr.abort();
            reject(new Error("Upload canceled"));
            return;
          }
          xhr.send(file);
        });
        break;
      } catch (error) {
        if (abortRequestedRef.current || isUploadCanceled(error)) {
          throw error;
        }
        retries++;
        telemetryRef.current.retryCount += 1;
        if (retries > MAX_RETRIES || abortRequestedRef.current) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000 * retries));
      }
    }
    telemetryRef.current.transferMs += Math.max(1, Math.round(performance.now() - putStart));

    return { key: payload.key, uploadedSize: file.size };
  }

  async function uploadReadableStream(
    readable: ReadableStream<Uint8Array>,
    fileName: string,
    contentType: string,
    fileSize: number,
    initiatedUpload?: InitiatedUpload,
  ): Promise<UploadedFile> {
    let uploadedSize = 0;
    const reader = readable.getReader();
    const partsList: { PartNumber: number; ETag: string }[] = [];
    const uploadPromises: Array<Promise<void>> = [];

    setUploadStatus("initiating");
    addMonitoringBreadcrumb("Multipart upload initiated", {
      fileName,
      fileSize,
      contentType,
    }, "upload");
    const { uploadId, key } = initiatedUpload ?? await initiateMultipartUpload(fileName, contentType, fileSize);
    const partSize = getUploadPartSize(fileSize);
    telemetryRef.current.partSize = partSize;
    activeSessionRef.current = {
      uploadId,
      key,
      fileName,
      fileSize,
      fileType: contentType,
      fileLastModified: 0,
      partSize,
      parts: [],
      createdAt: Date.now(),
    };
    const pendingChunks: Uint8Array[] = [];
    let pendingBytes = 0;

    const takeBytes = (size: number): Uint8Array => {
      const out = new Uint8Array(size);
      let offset = 0;
      while (offset < size && pendingChunks.length > 0) {
        const head = pendingChunks[0];
        const needed = size - offset;
        if (head.byteLength <= needed) {
          out.set(head, offset);
          offset += head.byteLength;
          pendingChunks.shift();
        } else {
          out.set(head.subarray(0, needed), offset);
          pendingChunks[0] = head.subarray(needed);
          offset += needed;
        }
      }
      pendingBytes -= size;
      return out;
    };

    while (true) {
      await waitWhilePaused();
      const { value, done } = await reader.read();
      if (abortRequestedRef.current) throw new Error("Upload canceled");
      if (done) break;
      if (!value || value.byteLength === 0) continue;

      pendingChunks.push(value);
      pendingBytes += value.byteLength;

      while (pendingBytes >= partSize) {
        const chunk = takeBytes(partSize);
        setUploadStatus("uploading");

        const currPart = partNumberRef.current++;
        const uploadPromise = limit(async () => {
          await waitWhilePaused();
          return uploadChunkToS3(chunk, uploadId, key, currPart).then((etag) => {
            partsList.push({ PartNumber: currPart, ETag: etag });
            telemetryRef.current.completedParts += 1;
            uploadedSize += chunk.byteLength;
          });
        }).catch(isUploadRejected);

        uploadPromises.push(uploadPromise);
        uploadPromise.finally(() => removeUploadPromise(uploadPromises, uploadPromise));
        await waitForUploadSlot(uploadPromises, UPLOAD_CONCURRENCY);
      }
    }

    await Promise.all(uploadPromises);

    if (pendingBytes > 0) {
      const finalChunk = takeBytes(pendingBytes);
      const currPart = partNumberRef.current++;
      const finalPromise = limit(async () => {
        await waitWhilePaused();
        return uploadChunkToS3(finalChunk, uploadId, key, currPart).then((etag) => {
          partsList.push({ PartNumber: currPart, ETag: etag });
          telemetryRef.current.completedParts += 1;
          uploadedSize += finalChunk.byteLength;
        });
      }).catch(isUploadRejected);
      uploadPromises.push(finalPromise);
      finalPromise.finally(() => removeUploadPromise(uploadPromises, finalPromise));
    }

    await Promise.all(uploadPromises);

    setUploadStatus("finalizing");
    const completeRes = await fetch("/api/uploads/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uploadId,
        key,
        parts: partsList.sort((a, b) => a.PartNumber - b.PartNumber),
      }),
    });
    if (!completeRes.ok) {
      throw new Error(`Failed to complete upload for ${fileName}`);
    }

    return { key, uploadedSize };
  }

  async function uploadSingleFile(
    file: File,
    session?: SavedUploadSession,
    options: UploadSingleFileOptions = {},
  ): Promise<UploadedFile> {
    const contentType = file.type || "application/octet-stream";
    const partSize = getUploadPartSize(file.size);
    const shouldPersistSession = options.persistSession ?? true;
    telemetryRef.current.partSize = partSize;
    const partsList: UploadedPart[] = [...(session?.parts ?? [])];
    const uploadedPartNumbers = new Set(partsList.map((part) => part.PartNumber));
    const uploadPromises: Array<Promise<void>> = [];
    let uploadedSize = partsList.reduce((sum, part) => sum + part.size, 0);

    if (!options.preserveProgress) {
      totalUploadedRef.current = uploadedSize;
      updateProgress();
    }

    setUploadStatus("initiating");
    addMonitoringBreadcrumb("Single file upload initiated", {
      fileName: file.name,
      fileSize: file.size,
      contentType,
      resumed: Boolean(session),
    }, "upload");
    let uploadId = session?.uploadId;
    let key = session?.key;

    if (!uploadId || !key) {
      const initiatedUpload = await initiateMultipartUpload(file.name, contentType, file.size);
      uploadId = initiatedUpload.uploadId;
      key = initiatedUpload.key;
    }
    if (!uploadId || !key) {
      throw new Error("Failed to prepare resumable upload");
    }

    const nextSession: SavedUploadSession = session ?? {
      uploadId,
      key,
      fileName: file.name,
      fileSize: file.size,
      fileType: contentType,
      fileLastModified: file.lastModified,
      partSize,
      parts: [],
      createdAt: Date.now(),
    };
    if (shouldPersistSession) {
      writeSavedSession(nextSession, true);
      activeSessionRef.current = nextSession;
    }

    const totalParts = Math.ceil(file.size / partSize);
    const transferPhaseStart = performance.now();
    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      if (uploadedPartNumbers.has(partNumber)) continue;

      await waitWhilePaused();
      if (abortRequestedRef.current) throw new Error("Upload canceled");
      setUploadStatus("uploading");
      await waitForUploadSlot(uploadPromises, getAdaptiveConcurrency(telemetryRef.current.retryCount));

      const start = (partNumber - 1) * partSize;
      const end = Math.min(start + partSize, file.size);
      const chunkBlob = file.slice(start, end);

      const uploadPromise = limit(async () => {
        await waitWhilePaused();
        return uploadChunkToS3(chunkBlob, uploadId, key, partNumber, totalParts).then((etag) => {
          const uploadedPart = { PartNumber: partNumber, ETag: etag, size: chunkBlob.size };
          partsList.push(uploadedPart);
          telemetryRef.current.completedParts += 1;
          uploadedSize += chunkBlob.size;
          if (shouldPersistSession) {
            nextSession.parts = partsList.sort((a, b) => a.PartNumber - b.PartNumber);
            writeSavedSession(nextSession, false);
          }
        });
      }).catch(isUploadRejected);

      uploadPromises.push(uploadPromise);
      uploadPromise.finally(() => removeUploadPromise(uploadPromises, uploadPromise));
    }

    await Promise.all(uploadPromises);
    telemetryRef.current.transferMs += Math.max(1, Math.round(performance.now() - transferPhaseStart));

    setUploadStatus("finalizing");
    const finalizeStart = performance.now();
    const completeRes = await fetch("/api/uploads/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uploadId,
        key,
        parts: partsList
          .sort((a, b) => a.PartNumber - b.PartNumber)
          .map(({ PartNumber, ETag }) => ({ PartNumber, ETag })),
      }),
    });
    telemetryRef.current.finalizeMs += Math.round(performance.now() - finalizeStart);
    if (!completeRes.ok) {
      const completePayload = await completeRes.json().catch(() => null);
      if (shouldPersistSession || completePayload?.resetSession) {
        clearSavedSession();
      }
      if (session) {
        return uploadSingleFile(file, undefined, options);
      }
      throw new Error(completePayload?.error || `Failed to complete upload for ${file.name}`);
    }

    if (shouldPersistSession) {
      clearSavedSession();
    }
    return { key, uploadedSize };
  }


  const onSubmit = async (data: UploadFormData) => {
    if (!files || files.length === 0) {
      showToast("Please select at least one file.");
      return;
    }

    if (usageLoading) {
      showToast("Checking your available storage. Please try again in a moment.");
      return;
    }

    if (Array.from(files).some((f) => f.size <= 0)) {
      showToast("Empty (0-byte) files cannot be transferred. Please remove empty files and try again.");
      return;
    }

    const selectedBytes = Array.from(files).reduce((sum, f) => sum + f.size, 0);

    // 1. Check if files exceed remaining storage / free limit
    if (selectedBytes > allowedLimit) {
      setUpgradeModalOpen(true);
      return;
    }

    if (deliveryMode === "email" && !data.receiverEmail) {
      showToast("Please enter a receiver email or choose Share link.");
      return;
    }

    if (deliveryMode === "email" && !auth && !data.senderEmail) {
      showToast("Please enter your email so the recipient knows who sent this.");
      return;
    }

    addMonitoringBreadcrumb("Transfer submitted", {
      fileCount: files.length,
      totalBytes: selectedBytes,
      deliveryMode,
      receiverDomain: deliveryMode === "email" ? data.receiverEmail?.split("@")[1] ?? "unknown" : "link-only",
    }, "upload");

    setUploading(true);
    abortRequestedRef.current = false;
    resetTelemetry();
    presignedUrlCacheRef.current.clear();
    presignedUrlBatchesRef.current.clear();
    setOverallProgress(0);
    setCurrentSpeedMBps(null);
    setIsPaused(false);
    pausedRef.current = false;
    pauseStartedAtRef.current = null;
    pausedDurationRef.current = 0;
    pauseResolversRef.current.splice(0).forEach((resolve) => resolve());
    uploadStartTimeRef.current = Date.now();
    startTimeRef.current = Date.now();


    // Initialize total bytes and progress trackers
    totalBytesRef.current = selectedBytes;
    if (totalBytesRef.current > allowedLimit) {
      setUpgradeModalOpen(true);
      setUploading(false);
      return;
    }

    totalUploadedRef.current = 0;
    chunkProgressRef.current = {};
    partNumberRef.current = 1;

    try {
      let uploadedFileKeys: string[] = [];
      let uploadedSize = 0;

      if (files.length === 1) {
        const file = files[0];
        const matchingSession = savedSession &&
          getFileFingerprint(file) === getSessionFingerprint(savedSession) &&
          savedSession.partSize === getUploadPartSize(file.size)
          ? savedSession
          : undefined;
        telemetryRef.current.resumedFromSavedSession = Boolean(matchingSession);
        const uploadedFile = !matchingSession && file.size <= DIRECT_PUT_FILE_SIZE_THRESHOLD
          ? await uploadDirectFile(file)
          : await uploadSingleFile(file, matchingSession);
        uploadedFileKeys = [uploadedFile.key];
        uploadedSize = uploadedFile.uploadedSize;
      } else if (shouldUploadFilesIndividually(files.length, totalBytesRef.current)) {
        clearSavedSession();
        setUploadStatus("uploading");
        telemetryRef.current.transferMode = "multipart_parallel_files";
        addMonitoringBreadcrumb("Large multi-file upload using direct file mode", {
          fileCount: files.length,
          totalBytes: totalBytesRef.current,
        }, "upload");

        const uploadedFiles: UploadedFile[] = [];
        const directFileLimit = pLimit(DIRECT_FILE_UPLOAD_CONCURRENCY);
        const uniquelyNamedFiles = renameDuplicates(files);

        await Promise.all(uniquelyNamedFiles.map((file) => directFileLimit(async () => {
          await waitWhilePaused();
          if (abortRequestedRef.current) throw new Error("Upload canceled");
          const uploadedFile = file.size <= DIRECT_PUT_FILE_SIZE_THRESHOLD
            ? await uploadDirectFile(file)
            : await uploadSingleFile(file, undefined, {
              persistSession: false,
              preserveProgress: true,
            });
          uploadedFiles.push(uploadedFile);
        })));

        uploadedFileKeys = uploadedFiles.map((file) => file.key);
        uploadedSize = uploadedFiles.reduce((sum, file) => sum + file.uploadedSize, 0);
      } else {
        clearSavedSession();
        setUploadStatus("initiating");
        telemetryRef.current.transferMode = "stream_zip";
        const initiatedUpload = await initiateMultipartUpload(
          "giga-sender.zip",
          "application/zip",
          totalBytesRef.current,
        );

        const { writable, readable } = new TransformStream<Uint8Array, Uint8Array>();
        const zipWriter = new ZipWriter(writable);
        const uploadStreamPromise = uploadReadableStream(
          readable,
          "giga-sender.zip",
          "application/zip",
          totalBytesRef.current,
          initiatedUpload,
        );

        const uniquelyNamedFiles = renameDuplicates(files);
        setUploadStatus("zipping");

        for (const file of uniquelyNamedFiles) {
          await waitWhilePaused();
          if (abortRequestedRef.current) throw new Error("Upload canceled");
          await zipWriter.add(file.name, file.stream(), {
            level: 0,
            bufferedWrite: false,
            useCompressionStream: false
          });
        }
        await zipWriter.close();
        const uploadedFile = await uploadStreamPromise;
        uploadedFileKeys = [uploadedFile.key];
        uploadedSize = uploadedFile.uploadedSize;
      }

      setOverallProgress(100);

      setUploadStatus("sending email");
      addMonitoringBreadcrumb("Upload completed, creating transfer", {
        fileCount: files.length,
        uploadedBytes: uploadedSize,
        deliveryMode,
        receiverDomain: deliveryMode === "email" ? data.receiverEmail?.split("@")[1] ?? "unknown" : "link-only",
      }, "upload");
      const shareStart = performance.now();
      const shareRes = await fetch(deliveryMode === "email" ? "/api/uploads/sendEmail" : "/api/uploads/createLink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(deliveryMode === "email" ? { receiverEmail: data.receiverEmail, senderEmail: data.senderEmail } : { senderEmail: data.senderEmail }),
          numberOfFiles: files.length,
          fileSize: uploadedSize,
          message: data.message,
          fileKeys: uploadedFileKeys,
        }),
      });
      const sharePayload = await shareRes.json().catch(() => null);
      telemetryRef.current.shareCreationMs = Math.round(performance.now() - shareStart);
      if (!shareRes.ok) {
        throw new Error(sharePayload?.message || sharePayload?.error || "Failed to create transfer.");
      }
      telemetryRef.current.shareId =
        sharePayload?.shareId ||
        (typeof sharePayload?.link === "string" && sharePayload.link.includes("/download/")
          ? sharePayload.link.split("/download/")[1]
          : null);
      sendTelemetry("completed");
      setFiles([]);
      const params = new URLSearchParams();
      if (sharePayload?.link) {
        params.set("link", sharePayload.link);
      }
      params.set("mode", deliveryMode);
      if (sharePayload?.expiryDays) {
        params.set("days", String(sharePayload.expiryDays));
      } else {
        params.set("days", String(expiryLimit));
      }
      if (sharePayload?.emailSent === false) {
        params.set("email", "failed");
      }
      const successQuery = params.toString() ? `?${params.toString()}` : "";
      router.push(`/success${successQuery}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      captureMonitoringException(err, {
        tags: {
          feature: "upload",
          canceled: abortRequestedRef.current,
          status: uploadStatus,
        },
        context: {
          fileCount: files.length,
          totalBytes: totalBytesRef.current,
          uploadedBytes: totalUploadedRef.current,
          completedParts: telemetryRef.current.completedParts,
          retryCount: telemetryRef.current.retryCount,
          pauseCount: telemetryRef.current.pauseCount,
          partSize: telemetryRef.current.partSize,
          resumedFromSavedSession: telemetryRef.current.resumedFromSavedSession,
        },
      });
      if (!abortRequestedRef.current) {
        sendTelemetry("failed", err.message ?? "Unexpected error");
      }
      showToast(err.message ?? "Unexpected error");
    } finally {
      resumeUpload();
      activeSessionRef.current = null;
      setUploading(false);
    }
  };

  const onInvalidSubmit = (formErrors: FieldErrors<UploadFormData>) => {
    if (deliveryMode === "link") {
      setValue("receiverEmail", "", { shouldDirty: false, shouldValidate: false });
      clearErrors();
      onSubmit({
        receiverEmail: "",
        message: "",
        files,
      });
      return;
    }

    showToast(formErrors.receiverEmail?.message?.toString() ?? "Please check the transfer details.");
  };

  useEffect(() => {
    setValue("files", files);

    if (files.length === 1) {
      const session = readSavedSession();
      const file = files[0];
      setSavedSession(
        session && getFileFingerprint(file) === getSessionFingerprint(session)
          ? session
          : null,
      );
    } else {
      setSavedSession(null);
    }
  }, [files, setValue]);

  useEffect(() => {
    (async function () {
      try {
        setUsageLoading(true);
        const res = await axios.get<ApiResponse<UsageData>>('/api/usage');
        const data = res.data.data!;
        setAllowedLimit(Math.max(0, data.allowedStorage - data.usedStorage));
        setExpiryLimit(data.expiryDays)
      } catch (error) {
        console.error('Error fetching usage limit:', error);
        captureMonitoringException(error, {
          tags: { feature: "usage", action: "fetch-limit" },
          context: { route: "/api/usage" },
        });
      } finally {
        setUsageLoading(false);
      }
    })()
  }, [])

  useEffect(() => {
    setExpiryDateText(
      new Date(Date.now() + expiryLimit * 24 * 60 * 60 * 1000).toDateString()
    );
  }, [expiryLimit]);

  return (
    <Card
      className="apple-glass"
      sx={{
        width: "100%",
        maxWidth: "820px",
        maxHeight: "86vh",
        overflowY: "auto",
        backgroundColor: "rgba(0, 47, 77, 0.88)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "28px",
        boxShadow: "0 24px 64px rgba(0, 15, 28, 0.75)",
        color: "#f8fafc",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <CardContent sx={{ flex: "column", p: 0, "&:last-child": { pb: 0 } }}>
          <Stack
            sx={{
              padding: "24px 28px 18px",
              justifyContent: "center",
              alignItems: "center",
            }}
            gap={0.5}
          >
            {brand.logoUrl ? (
              <Image src={brand.logoUrl} alt={brand.productName} width={168} height={36} />
            ) : (
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
              >
                {brand.productName}
              </Typography>
            )}
            <span className="label-caps text-gold-400 text-[10px]">
              Zero-Egress Edge Transfer • 335+ Anycast PoPs
            </span>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              padding: "24px 28px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            gap={3}
            alignItems="stretch"
          >
            <Stack gap={2} width={{ xs: "100%", md: "50%" }}>
              <Stack gap={0.5}>
                <Typography variant="body1" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                  {files.length} Selected File{files.length !== 1 ? "s" : ""}
                </Typography>
                <Typography variant="body2" sx={{ color: "#cbd5e1", fontSize: "0.82rem" }}>
                  {usageLoading
                    ? `${getSizeInReadableFormat(files)} selected. Checking available storage...`
                    : `${getSizeInReadableFormat(files)} selected of ${formatBytes(allowedLimit)} remaining`}
                </Typography>
                {savedSession && (
                  <Typography variant="body2" sx={{ color: "#ffddb4", fontWeight: 600, fontSize: "0.8rem" }}>
                    Resumable upload found: {formatBytes(savedSession.parts.reduce((sum, part) => sum + part.size, 0))} saved
                  </Typography>
                )}
              </Stack>
              <Stack gap={2}>
                <FileUploader />
                <FileList />
              </Stack>
            </Stack>

            <Stack gap={2} width={{ xs: "100%", md: "50%" }}>
              <Stack
                direction="row"
                gap={1}
                sx={{
                  backgroundColor: "rgba(0, 29, 50, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "14px",
                  padding: "5px",
                }}
              >
                <Button
                  type="button"
                  onClick={() => setDeliveryMode("email")}
                  variant={deliveryMode === "email" ? "contained" : "text"}
                  sx={{
                    flex: 1,
                    textTransform: "none",
                    borderRadius: "10px",
                    fontWeight: 700,
                    py: 1,
                    ...(deliveryMode === "email"
                      ? {
                          backgroundColor: "#f7bc6a",
                          color: "#001d32",
                          boxShadow: "0 4px 12px rgba(247, 188, 106, 0.25)",
                          "&:hover": { backgroundColor: "#ffddb4" },
                        }
                      : {
                          color: "#cbd5e1",
                          "&:hover": { color: "#FFFFFF", backgroundColor: "rgba(255, 255, 255, 0.05)" },
                        }),
                  }}
                >
                  Email recipient
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setDeliveryMode("link");
                    setValue("receiverEmail", "", { shouldDirty: false, shouldValidate: false });
                    clearErrors("receiverEmail");
                  }}
                  variant={deliveryMode === "link" ? "contained" : "text"}
                  sx={{
                    flex: 1,
                    textTransform: "none",
                    borderRadius: "10px",
                    fontWeight: 700,
                    py: 1,
                    ...(deliveryMode === "link"
                      ? {
                          backgroundColor: "#f7bc6a",
                          color: "#001d32",
                          boxShadow: "0 4px 12px rgba(247, 188, 106, 0.25)",
                          "&:hover": { backgroundColor: "#ffddb4" },
                        }
                      : {
                          color: "#cbd5e1",
                          "&:hover": { color: "#FFFFFF", backgroundColor: "rgba(255, 255, 255, 0.05)" },
                        }),
                  }}
                >
                  Share link
                </Button>
              </Stack>
              <Stack gap={0.5}>
                <Typography variant="body1" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                  {deliveryMode === "email" ? "Email Delivery" : "Shareable Edge Link"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#cbd5e1", fontSize: "0.82rem" }}>
                  {deliveryMode === "email"
                    ? "We will notify you when your files get downloaded"
                    : "Upload now and copy an expiring line-rate download link after transfer"}
                </Typography>
              </Stack>
              <Stack
                borderRadius={"18px"}
                padding={2.5}
                sx={{
                  backgroundColor: "rgba(0, 29, 50, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                flex={1}
                gap={2}
              >
                {deliveryMode === "email" ? (
                  <>
                    <FormControl fullWidth variant="outlined">
                      <FormLabel sx={{ color: "#cbd5e1", fontSize: "0.8rem", fontWeight: 600, mb: 0.75, "&.Mui-focused": { color: "#ffddb4" } }}>
                        Receiver&apos;s email
                      </FormLabel>
                      <TextField
                        placeholder="e.g., client@studio.com"
                        {...register("receiverEmail")}
                        error={!!errors.receiverEmail}
                        helperText={
                          errors.receiverEmail ? errors.receiverEmail.message : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "rgba(0, 29, 50, 0.95)",
                            color: "#FFFFFF",
                            borderRadius: "12px",
                            "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                            "&:hover fieldset": { borderColor: "rgba(247, 188, 106, 0.5)" },
                            "&.Mui-focused fieldset": { borderColor: "#f7bc6a" },
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "#64748b",
                            opacity: 1,
                          },
                        }}
                      />
                    </FormControl>
                    {!auth && (
                      <FormControl fullWidth variant="outlined">
                        <FormLabel sx={{ color: "#cbd5e1", fontSize: "0.8rem", fontWeight: 600, mb: 0.75, "&.Mui-focused": { color: "#ffddb4" } }}>
                          Your email (sender)
                        </FormLabel>
                        <TextField
                          placeholder="e.g., you@studio.com"
                          {...register("senderEmail")}
                          error={!!errors.senderEmail}
                          helperText={
                            errors.senderEmail
                              ? errors.senderEmail.message
                              : "Recipient will see this sender email"
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "rgba(0, 29, 50, 0.95)",
                              color: "#FFFFFF",
                              borderRadius: "12px",
                              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                              "&:hover fieldset": { borderColor: "rgba(247, 188, 106, 0.5)" },
                              "&.Mui-focused fieldset": { borderColor: "#f7bc6a" },
                            },
                            "& .MuiFormHelperText-root": {
                              color: "#94a3b8",
                            },
                            "& .MuiInputBase-input::placeholder": {
                              color: "#64748b",
                              opacity: 1,
                            },
                          }}
                        />
                      </FormControl>
                    )}
                    <FormControl fullWidth variant="outlined">
                      <FormLabel sx={{ color: "#cbd5e1", fontSize: "0.8rem", fontWeight: 600, mb: 0.75, "&.Mui-focused": { color: "#ffddb4" } }}>
                        Your message
                      </FormLabel>
                      <TextField
                        placeholder="Add an optional delivery note..."
                        multiline
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "rgba(0, 29, 50, 0.95)",
                            color: "#FFFFFF",
                            borderRadius: "12px",
                            height: "84px",
                            padding: 0,
                            "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                            "&:hover fieldset": { borderColor: "rgba(247, 188, 106, 0.5)" },
                            "&.Mui-focused fieldset": { borderColor: "#f7bc6a" },
                            "& textarea": {
                              height: "100% !important",
                              overflowY: "auto",
                              padding: "10px 12px",
                              boxSizing: "border-box",
                              color: "#FFFFFF",
                            },
                          },
                        }}
                        {...register("message")}
                      />
                    </FormControl>
                  </>
                ) : (
                  <Stack
                    gap={1.25}
                    sx={{
                      border: "1px solid rgba(247, 188, 106, 0.25)",
                      borderRadius: "14px",
                      backgroundColor: "rgba(0, 29, 50, 0.9)",
                      padding: 2.25,
                    }}
                  >
                    <Typography variant="body2" fontWeight={700} sx={{ color: "#ffddb4" }}>
                      ⚡ Instant Zero-Egress Link Sharing
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#cbd5e1", lineHeight: 1.6, fontSize: "0.85rem" }}>
                      Your files stream directly to the nearest Cloudflare edge node at line speed. Once finished, {brand.productName} gives you a 1-click secure link you can send anywhere—no recipient account required.
                    </Typography>
                  </Stack>
                )}

                {/* <AdvancedParams /> */}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            sx={{
              padding: "18px 28px 22px",
              position: "sticky",
              bottom: 0,
              zIndex: 2,
              backgroundColor: "rgba(0, 29, 50, 0.95)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 -12px 28px rgba(0, 15, 28, 0.45)",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Stack>
                <Typography variant="subtitle1" suppressHydrationWarning sx={{ color: "#ffddb4", fontWeight: 700, fontSize: "0.9rem" }}>
                  {expiryDateText ? `Expires on ${expiryDateText}` : `Expires in ${expiryLimit} days`}
                </Typography>
                <TermsConditions sx={{ fontSize: "12px", color: "#94a3b8" }} />
              </Stack>

              <Stack direction={{ xs: "column-reverse", sm: "row" }} gap={2} width={{ xs: "100%", sm: "auto" }}>
                <Button
                  onClick={() => router.replace('/')}
                  variant="outlined"
                  type="button"
                  sx={{
                    minHeight: 48,
                    minWidth: { sm: 112 },
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: "#cbd5e1",
                    "&:hover": {
                      borderColor: "#f7bc6a",
                      color: "#FFFFFF",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type={deliveryMode === "link" ? "button" : "submit"}
                  disabled={isSubmitting || uploading}
                  onClick={deliveryMode === "link" ? () => {
                    clearErrors();
                    onSubmit({
                      receiverEmail: "",
                      message: "",
                      files,
                    });
                  } : undefined}
                  sx={{
                    minHeight: 52,
                    minWidth: { sm: 220 },
                    px: 4,
                    fontSize: 15,
                    fontWeight: 800,
                    borderRadius: "14px",
                    textTransform: "none",
                    color: "#001d32",
                    backgroundColor: "#f7bc6a",
                    boxShadow: "0 12px 24px rgba(247, 188, 106, 0.28)",
                    "&:hover": {
                      backgroundColor: "#ffddb4",
                      boxShadow: "0 14px 28px rgba(247, 188, 106, 0.38)",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "rgba(247, 188, 106, 0.3)",
                      color: "rgba(0, 29, 50, 0.6)",
                    },
                  }}
                >
                  {deliveryMode === "link" ? "Upload and create link" : "Transfer"} {files.length > 1 ? `${files.length} files` : "file"}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </form>

      {uploading && (
        <Stack
          gap={2}
          justifyContent="center"
          alignItems="center"
          position="fixed"
          width="100vw"
          top={0}
          left={0}
          height="100vh"
          sx={{
            backgroundColor: "rgba(0, 29, 50, 0.92)",
            backdropFilter: "blur(20px)",
            zIndex: 9999,
          }}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={150}
              thickness={3.5}
              sx={{
                color: "rgba(255, 255, 255, 0.12)",
                position: "absolute",
              }}
            />

            {/* Foreground Progress */}
            <CircularProgress
              variant="determinate"
              value={overallProgress}
              size={150}
              thickness={3.5}
              sx={{
                color: "#f7bc6a",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                fontSize={22}
                fontWeight={800}
                sx={{
                  color: "#ffddb4",
                  fontFamily: "monospace",
                }}
              >
                {`${Math.round(overallProgress)}%`}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ color: "#FFFFFF", fontWeight: 700 }} mt={1}>
            {uploadStatus === "sending email"
              ? deliveryMode === "email"
                ? "Verifying files & sending your transfer email..."
                : "Verifying files & creating your shareable link..."
              : uploadStatus === "finalizing"
                ? "Assembling your transfer at the edge..."
                : "Streaming to nearest Cloudflare Edge server..."}
          </Typography>
          {uploadStatus && (
            <Typography sx={{ color: "#cbd5e1", fontFamily: "monospace" }} variant="body2">
              {isPaused
                ? "Transfer paused — click Resume to continue"
                : uploadStatus === "sending email"
                  ? deliveryMode === "email"
                    ? "Step 3 of 3: Dispatching download link email"
                    : "Step 3 of 3: Generating instant download link"
                  : uploadStatus === "finalizing"
                    ? "Step 3 of 3: Verifying all uploaded pieces"
                    : overallProgress > 0
                      ? `Step 2 of 3: Uploading${currentSpeedMBps ? ` at ${currentSpeedMBps} MB/s` : ""}`
                      : "Step 1 of 3: Preparing secure edge channels"}
            </Typography>
          )}
          <Stack direction="row" gap={1.5} mt={1}>
            <Button
              variant="contained"
              type="button"
              onClick={isPaused ? resumeUpload : pauseUpload}
              sx={{
                minWidth: 120,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                backgroundColor: "#f7bc6a",
                color: "#001d32",
                "&:hover": { backgroundColor: "#ffddb4" },
              }}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button
              variant="outlined"
              type="button"
              onClick={cancelUpload}
              sx={{
                minWidth: 120,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "#f8fafc",
                "&:hover": {
                  borderColor: "#fb7185",
                  color: "#fb7185",
                  backgroundColor: "rgba(244, 63, 94, 0.1)",
                },
              }}
            >
              Cancel
            </Button>
          </Stack>
          <Stack alignItems="center" gap={0.5} mt={1} sx={{ minHeight: 68 }}>
            <Typography sx={{ color: "#ffddb4", fontFamily: "monospace" }} variant="body2">
              {estimatedTimeLeft !== null
                ? `Time remaining: ${formatSeconds(estimatedTimeLeft)}${currentSpeedMBps ? ` • ${currentSpeedMBps} MB/s` : ""}`
                : "Calculating transfer speed..."}
            </Typography>
            <Typography sx={{ color: "#cbd5e1", fontFamily: "monospace" }} variant="body2">
              Uploaded: {formatBytes(totalUploadedRef.current)} of {formatBytes(totalBytesRef.current)}
            </Typography>
          </Stack>
        </Stack>
      )}

      {/* Upgrade Paywall Modal for transfers exceeding limits */}
      <Dialog
        open={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 1,
            backgroundColor: "#002f4d",
            color: "#f8fafc",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 24px 64px rgba(0, 15, 28, 0.85)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.35rem", pb: 1, color: "#FFFFFF" }}>
          Upgrade Required for Large Transfer
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: "#cbd5e1", lineHeight: 1.6 }}>
            Your selected transfer is <strong style={{ color: "#ffddb4" }}>{getSizeInReadableFormat(files)}</strong>, which exceeds your available storage ({formatBytes(allowedLimit)}).
            Choose a high-speed plan to transfer your file immediately with zero compression and line-rate edge speeds.
          </Typography>

          <Stack gap={1.5} sx={{ mt: 2 }}>
            <Box
              sx={{
                p: 2.25,
                border: "2px solid #f7bc6a",
                borderRadius: "16px",
                bgcolor: "rgba(0, 29, 50, 0.85)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <div>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#FFFFFF" }}>
                  Starter Plan — $10/mo
                </Typography>
                <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                  Send up to 30 GB files • 30-day link retention
                </Typography>
              </div>
              <Button
                variant="contained"
                onClick={() => router.push("/checkout/starter")}
                sx={{
                  bgcolor: "#f7bc6a",
                  color: "#001d32",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#ffddb4" },
                }}
              >
                Choose Starter
              </Button>
            </Box>

            <Box
              sx={{
                p: 2.25,
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                bgcolor: "rgba(0, 29, 50, 0.6)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <div>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#FFFFFF" }}>
                  Pro Plan — $20/mo
                </Typography>
                <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                  Send up to 80 GB files • 30-day link retention
                </Typography>
              </div>
              <Button
                variant="outlined"
                onClick={() => router.push("/checkout/pro")}
                sx={{
                  borderColor: "rgba(247, 188, 106, 0.5)",
                  color: "#ffddb4",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { borderColor: "#f7bc6a", bgcolor: "rgba(247, 188, 106, 0.12)" },
                }}
              >
                Choose Pro
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", pt: 1 }}>
              <Button
                variant="text"
                size="small"
                onClick={() => router.push("/plans")}
                sx={{ textTransform: "none", color: "#ffddb4", fontWeight: 600 }}
              >
                Need Pay-As-You-Go or 200 GB+ Studio plans? View all plans →
              </Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setUpgradeModalOpen(false)} sx={{ textTransform: "none", color: "#cbd5e1" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Auth Modal for guest users sending within free limits */}
      <Dialog
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 1,
            backgroundColor: "#002f4d",
            color: "#f8fafc",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 24px 64px rgba(0, 15, 28, 0.85)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.25rem", pb: 1, color: "#FFFFFF" }}>
          Deliver Your Transfer
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: "#cbd5e1", lineHeight: 1.6 }}>
            Your <strong style={{ color: "#ffddb4" }}>{getSizeInReadableFormat(files)}</strong> transfer is ready. Sign in or create a quick free account so we can generate your download link and track delivery receipts.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: "column", gap: 1, px: 3, pb: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push("/signup?next=/transfer")}
            sx={{
              bgcolor: "#f7bc6a",
              color: "#001d32",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              py: 1.1,
              "&:hover": { bgcolor: "#ffddb4" },
            }}
          >
            Create Free Account
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => router.push("/signin?next=/transfer")}
            sx={{
              borderColor: "rgba(247, 188, 106, 0.5)",
              color: "#ffddb4",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              py: 1.1,
              "&:hover": { borderColor: "#f7bc6a", bgcolor: "rgba(247, 188, 106, 0.12)" },
            }}
          >
            Sign In
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => setAuthModalOpen(false)}
            sx={{ textTransform: "none", color: "#94a3b8" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Card>
  );
};


function getSizeInReadableFormat(files: File[]): string {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

  return formatBytes(totalBytes)
}

const formatSeconds = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 || hrs > 0 ? `${mins}m ` : ""}${secs}s`;
};
