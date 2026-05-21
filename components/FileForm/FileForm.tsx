"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
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
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from '@/components/compat/navigation';
import { ZipWriter } from "@zip.js/zip.js";
import { formatBytes, renameDuplicates } from "@/lib/utils";
import axios from "axios";
import type { UsageData } from '@/types/app-data';
import { PLANS } from "@/lib/constant";
import pLimit from "p-limit";
import { addMonitoringBreadcrumb, captureMonitoringException } from "@/lib/monitoring";

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
};
type InitiatedUpload = { uploadId: string; key: string };
type UploadedFile = { key: string; uploadedSize: number };
type UploadSingleFileOptions = {
  persistSession?: boolean;
  preserveProgress?: boolean;
};
type DeliveryMode = "email" | "link";

const UPLOAD_CONCURRENCY = 6;
const DIRECT_FILE_UPLOAD_CONCURRENCY = 8;
const PACKAGE_MULTI_FILE_UPLOADS_AS_ZIP = true;
const MULTI_FILE_DIRECT_UPLOAD_COUNT_THRESHOLD = 100;
const MULTI_FILE_DIRECT_UPLOAD_SIZE_THRESHOLD = 2 * 1024 * 1024 * 1024;
const DIRECT_PUT_FILE_SIZE_THRESHOLD = 100 * 1024 * 1024;
const MIN_PART_SIZE = 16 * 1024 * 1024;
const LARGE_FILE_PART_SIZE = 64 * 1024 * 1024;
const LARGE_FILE_THRESHOLD = 1024 * 1024 * 1024;
const MAX_MULTIPART_PARTS = 10_000;
const MAX_MULTIPART_PART_SIZE = 5 * 1024 * 1024 * 1024;
const PART_SIZE_ALIGNMENT = 1024 * 1024;
const SAVED_UPLOAD_SESSION_KEY = "gigasend:upload-session:v1";
const limit = pLimit(UPLOAD_CONCURRENCY);

function getUploadPartSize(fileSize: number) {
  const basePartSize = fileSize >= LARGE_FILE_THRESHOLD ? LARGE_FILE_PART_SIZE : MIN_PART_SIZE;
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
  const activeSessionRef = useRef<SavedUploadSession | null>(null);
  const abortRequestedRef = useRef(false);
  const telemetryRef = useRef<UploadTelemetry>({
    retryCount: 0,
    completedParts: 0,
    pauseCount: 0,
    partSize: null,
    resumedFromSavedSession: false,
    canceled: false,
  });
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState<number | null>(null);
  const [savedSession, setSavedSession] = useState<SavedUploadSession | null>(null);
  const [allowedLimit, setAllowedLimit] = useState(PLANS.free.storageBytes * (1024 ** 3));
  const [usageLoading, setUsageLoading] = useState(true);
  const [expiryLimit, setExpiryLimit] = useState(3); // in days
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(null)
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("email");
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({
    open: false,
    msg: "",
  });
  const router = useRouter();
  const startTimeRef = useRef<null | number>(null)
  const partNumberRef = useRef(1);

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
    };
  };

  const sendTelemetry = (event: TelemetryEvent, errorMessage?: string) => {
    if (!uploadStartTimeRef.current) return;

    const activeMs = Date.now() - uploadStartTimeRef.current - pausedDurationRef.current;
    const averageMbps = activeMs > 0
      ? (totalUploadedRef.current * 8) / (activeMs / 1000) / 1_000_000
      : 0;
    const payload = {
      event,
      fileCount: files.length,
      totalBytes: totalBytesRef.current,
      uploadedBytes: totalUploadedRef.current,
      partSize: telemetryRef.current.partSize,
      concurrency: UPLOAD_CONCURRENCY,
      completedParts: telemetryRef.current.completedParts,
      retryCount: telemetryRef.current.retryCount,
      pauseCount: telemetryRef.current.pauseCount,
      resumedFromSavedSession: telemetryRef.current.resumedFromSavedSession,
      durationMs: Math.max(0, activeMs),
      pausedMs: pausedDurationRef.current,
      averageMbps: Number(averageMbps.toFixed(2)),
      errorMessage,
      canceled: telemetryRef.current.canceled,
    };

    fetch("/api/uploads/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((error) => console.warn("Failed to send upload telemetry:", error));
  };

  const getFileFingerprint = (file: File) =>
    `${file.name}:${file.size}:${file.type || "application/octet-stream"}:${file.lastModified}`;

  const getSessionFingerprint = (session: SavedUploadSession) =>
    `${session.fileName}:${session.fileSize}:${session.fileType}:${session.fileLastModified}`;

  const readSavedSession = (): SavedUploadSession | null => {
    if (typeof window === "undefined") return null;

    try {
      const raw = window.localStorage.getItem(SAVED_UPLOAD_SESSION_KEY);
      return raw ? JSON.parse(raw) as SavedUploadSession : null;
    } catch {
      window.localStorage.removeItem(SAVED_UPLOAD_SESSION_KEY);
      return null;
    }
  };

  const writeSavedSession = (session: SavedUploadSession) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SAVED_UPLOAD_SESSION_KEY, JSON.stringify(session));
    setSavedSession(session);
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

  async function uploadChunkToS3(chunk: Uint8Array, uploadId: string, key: string, partNumber: number): Promise<string> {
    let ETag: string = '';
    const MAX_RETRIES = 3;
    let retries = 0;

    await waitWhilePaused();
    if (abortRequestedRef.current) throw new Error("Upload canceled");

    // Request presigned URL for this chunk (this part doesn't need retries as it's a separate API call)
    const presignRes = await fetch("/api/uploads/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uploadId, key, partNumber }),
    });
    if (!presignRes.ok) {
      addMonitoringBreadcrumb("Upload part presign failed", {
        partNumber,
        status: presignRes.status,
      }, "upload");
      throw new Error(`Failed to presign part ${partNumber}`);
    }
    const { url: presignedUrl } = await presignRes.json();

    while (retries <= MAX_RETRIES) {
      try {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          activeXhrsRef.current.add(xhr);
          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", "application/octet-stream");
          xhr.onload = () => {
            activeXhrsRef.current.delete(xhr);
            if (xhr.status >= 200 && xhr.status < 300) {
              const eTagHeader = xhr.getResponseHeader("ETag");
              if (eTagHeader) {
                ETag = eTagHeader;
              }
              if (totalUploadedRef && totalUploadedRef.current !== undefined) { // Check if exists
                totalUploadedRef.current += chunk.length;
              }
              updateProgress();
              resolve();
            } else {
              reject(new Error(`Upload failed for part ${partNumber} with status ${xhr.status}`));
            }
          };
          xhr.onerror = () => {
            activeXhrsRef.current.delete(xhr);
            reject(new Error("Network error during upload"));
          };
          xhr.onabort = () => {
            activeXhrsRef.current.delete(xhr);
            reject(new Error("Upload canceled"));
          };
          if (abortRequestedRef.current) {
            xhr.abort();
            reject(new Error("Upload canceled"));
            return;
          }
          xhr.send(chunk);
        });
        // If the promise resolves, the upload was successful, break out of the retry loop
        break;
      } catch (error) {
        console.warn(`Attempt ${retries + 1} for part ${partNumber} failed:`, error);
        addMonitoringBreadcrumb("Upload part retry", {
          partNumber,
          attempt: retries + 1,
          chunkBytes: chunk.length,
        }, "upload");
        retries++;
        telemetryRef.current.retryCount += 1;
        if (retries > MAX_RETRIES) {
          throw new Error(`Failed to upload part ${partNumber} after ${MAX_RETRIES} retries.`);
        }
        // Optional: Add a delay before retrying
        await new Promise(resolve => setTimeout(resolve, 2000 * retries)); // Exponential backoff for delay
      }
    }

    return ETag;
  }

  function updateProgress() {
    const uploaded = totalUploadedRef.current;
    const total = totalBytesRef.current;
    const progress = (uploaded / total) * 100;
    setOverallProgress(Math.min(progress, 100));

    const pauseOffset = pausedDurationRef.current + (
      pauseStartedAtRef.current ? Date.now() - pauseStartedAtRef.current : 0
    );
    const elapsed = (Date.now() - uploadStartTimeRef.current! - pauseOffset) / 1000;

    if (elapsed >= 5 && uploaded > 0) {
      const speed = uploaded / elapsed;
      const timeLeft = (total - uploaded) / speed;
      setEstimatedTimeLeft(Math.max(0, Math.ceil(timeLeft)));
    } else {
      setEstimatedTimeLeft(null);
    }
  }

  async function initiateMultipartUpload(
    fileName: string,
    contentType: string,
    fileSize: number,
  ): Promise<InitiatedUpload> {
    const initiateRes = await fetch("/api/uploads/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, contentType, fileSize }),
    });
    const payload = await initiateRes.json().catch(() => null);

    if (!initiateRes.ok) {
      throw new Error(payload?.message || payload?.error || "Failed to initiate upload");
    }

    if (!payload?.uploadId || !payload?.key) {
      throw new Error("Failed to prepare upload");
    }

    return { uploadId: payload.uploadId, key: payload.key };
  }

  async function uploadDirectFile(file: File): Promise<UploadedFile> {
    const contentType = file.type || "application/octet-stream";
    const MAX_RETRIES = 3;
    let retries = 0;

    setUploadStatus("uploading");
    addMonitoringBreadcrumb("Direct file upload initiated", {
      fileName: file.name,
      fileSize: file.size,
      contentType,
    }, "upload");

    const presignRes = await fetch("/api/uploads/presignDirect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, contentType, fileSize: file.size }),
    });
    const payload = await presignRes.json().catch(() => null);

    if (!presignRes.ok) {
      throw new Error(payload?.message || payload?.error || `Failed to prepare upload for ${file.name}`);
    }

    while (retries <= MAX_RETRIES) {
      await waitWhilePaused();
      if (abortRequestedRef.current) throw new Error("Upload canceled");

      try {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          activeXhrsRef.current.add(xhr);
          xhr.open("PUT", payload.url);
          xhr.setRequestHeader("Content-Type", contentType);
          xhr.onload = () => {
            activeXhrsRef.current.delete(xhr);
            if (xhr.status >= 200 && xhr.status < 300) {
              totalUploadedRef.current += file.size;
              updateProgress();
              resolve();
            } else {
              reject(new Error(`Upload failed for ${file.name} with status ${xhr.status}`));
            }
          };
          xhr.onerror = () => {
            activeXhrsRef.current.delete(xhr);
            reject(new Error("Network error during upload"));
          };
          xhr.onabort = () => {
            activeXhrsRef.current.delete(xhr);
            reject(new Error("Upload canceled"));
          };
          xhr.send(file);
        });
        break;
      } catch (error) {
        retries++;
        telemetryRef.current.retryCount += 1;
        if (retries > MAX_RETRIES || abortRequestedRef.current) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000 * retries));
      }
    }

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
    let buffer = new Uint8Array(0);

    while (true) {
      await waitWhilePaused();
      const { value, done } = await reader.read();
      if (abortRequestedRef.current) throw new Error("Upload canceled");
      if (done) break;
      if (!value) continue;

      const newBuffer = new Uint8Array(buffer.length + value.length);
      newBuffer.set(buffer);
      newBuffer.set(value, buffer.length);
      buffer = newBuffer;

      while (buffer.length >= partSize) {
        const chunk = buffer.slice(0, partSize);
        buffer = buffer.slice(partSize);
        setUploadStatus("uploading");

        const currPart = partNumberRef.current++;
        const uploadPromise = limit(async () => {
          await waitWhilePaused();
          return uploadChunkToS3(chunk, uploadId, key, currPart).then((etag) => {
            partsList.push({ PartNumber: currPart, ETag: etag });
            telemetryRef.current.completedParts += 1;
            uploadedSize += chunk.length;
          });
        }).catch(isUploadRejected);

        uploadPromises.push(uploadPromise);
        uploadPromise.finally(() => removeUploadPromise(uploadPromises, uploadPromise));
        await waitForUploadSlot(uploadPromises, UPLOAD_CONCURRENCY);
      }
    }

    await Promise.all(uploadPromises);

    if (buffer.length > 0) {
      const finalChunk = buffer;
      const currPart = partNumberRef.current++;
      const finalPromise = limit(async () => {
        await waitWhilePaused();
        return uploadChunkToS3(finalChunk, uploadId, key, currPart).then((etag) => {
          partsList.push({ PartNumber: currPart, ETag: etag });
          telemetryRef.current.completedParts += 1;
          uploadedSize += finalChunk.length;
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
      writeSavedSession(nextSession);
      activeSessionRef.current = nextSession;
    }

    const totalParts = Math.ceil(file.size / partSize);
    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      if (uploadedPartNumbers.has(partNumber)) continue;

      await waitWhilePaused();
      if (abortRequestedRef.current) throw new Error("Upload canceled");
      setUploadStatus("uploading");
      await waitForUploadSlot(uploadPromises, UPLOAD_CONCURRENCY);

      const start = (partNumber - 1) * partSize;
      const end = Math.min(start + partSize, file.size);
      const chunk = new Uint8Array(await file.slice(start, end).arrayBuffer());

      const uploadPromise = limit(async () => {
        await waitWhilePaused();
        return uploadChunkToS3(chunk, uploadId, key, partNumber).then((etag) => {
          const uploadedPart = { PartNumber: partNumber, ETag: etag, size: chunk.length };
          partsList.push(uploadedPart);
          telemetryRef.current.completedParts += 1;
          uploadedSize += chunk.length;
          if (shouldPersistSession) {
            nextSession.parts = partsList.sort((a, b) => a.PartNumber - b.PartNumber);
            writeSavedSession(nextSession);
          }
        });
      }).catch(isUploadRejected);

      uploadPromises.push(uploadPromise);
      uploadPromise.finally(() => removeUploadPromise(uploadPromises, uploadPromise));
    }

    await Promise.all(uploadPromises);

    setUploadStatus("finalizing");
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
    if (!completeRes.ok) {
      throw new Error(`Failed to complete upload for ${file.name}`);
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

    const selectedBytes = Array.from(files).reduce((sum, f) => sum + f.size, 0);
    if (deliveryMode === "email" && !data.receiverEmail) {
      showToast("Please enter a receiver email or choose Create link.");
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
    setOverallProgress(0);
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
      showToast(`This transfer is larger than your remaining storage (${formatBytes(allowedLimit)}). Please remove files, clear old transfers, or upgrade your plan.`);
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
        const uploadedFile = await uploadSingleFile(file, matchingSession);
        uploadedFileKeys = [uploadedFile.key];
        uploadedSize = uploadedFile.uploadedSize;
      } else if (shouldUploadFilesIndividually(files.length, totalBytesRef.current)) {
        clearSavedSession();
        setUploadStatus("uploading");
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
            bufferedWrite: true,
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
      const shareRes = await fetch(deliveryMode === "email" ? "/api/uploads/sendEmail" : "/api/uploads/createLink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(deliveryMode === "email" ? { receiverEmail: data.receiverEmail } : {}),
          numberOfFiles: files.length,
          fileSize: uploadedSize,
          message: data.message,
          fileKeys: uploadedFileKeys,
        }),
      });
      const sharePayload = await shareRes.json().catch(() => null);
      if (!shareRes.ok) {
        throw new Error(sharePayload?.message || sharePayload?.error || "Failed to create transfer.");
      }
      sendTelemetry("completed");
      setFiles([]);
      setTimeout(() => {
        const linkQuery = deliveryMode === "link" && sharePayload?.link
          ? `?link=${encodeURIComponent(sharePayload.link)}`
          : "";
        router.push(`/success${linkQuery}`);
      }, 1000);
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

  return (
    <Card sx={{ maxWidth: "768px", maxHeight: '84vh', overflowY: 'auto' }}>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <CardContent sx={{ flex: "column" }}>
          <Stack
            sx={{
              padding: "24px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src="/logo.png" alt="logo" width={168} height={36} />
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              padding: "24px",
              borderTop: "1px solid #D5D7DA",
              borderBottom: "1px solid #D5D7DA",
            }}
            gap={2}
            alignItems="stretch"
          >
            <Stack gap={2} width={{ xs: "100%", md: "50%" }}>
              <Stack>
                <Typography variant="body1">
                  {files.length} Selected File{files.length > 1 ? 's' : ''}
                </Typography>
                <Typography variant="body2">
                  {usageLoading
                    ? `${getSizeInReadableFormat(files)} selected. Checking available storage...`
                    : `${getSizeInReadableFormat(files)} selected of ${formatBytes(allowedLimit)} remaining`}
                </Typography>
                {savedSession && (
                  <Typography variant="body2" color="primary">
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
              <Stack direction="row" gap={1} sx={{ backgroundColor: "#EEF2F7", borderRadius: 2, padding: "4px" }}>
                <Button
                  type="button"
                  onClick={() => setDeliveryMode("email")}
                  variant={deliveryMode === "email" ? "contained" : "text"}
                  sx={{ flex: 1, textTransform: "none" }}
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
                  sx={{ flex: 1, textTransform: "none" }}
                >
                  Share link
                </Button>
              </Stack>
              <Stack>
                <Typography variant="body1">{deliveryMode === "email" ? "Email" : "Shareable Link"}</Typography>
                <Typography variant="body2">
                  {deliveryMode === "email"
                    ? "We will let you know when your files get downloaded"
                    : "Upload now and copy an expiring download link after transfer"}
                </Typography>
              </Stack>
              <Stack
                borderRadius={2}
                padding={2}
                sx={{ backgroundColor: "#F6F8FB" }}
                flex={1}
                gap={2}
              >
                {deliveryMode === "email" ? (
                  <>
                    <FormControl fullWidth variant="outlined">
                      <FormLabel>Receiver&apos;s email</FormLabel>
                      <TextField
                        placeholder="e.g., receiver@example.com"
                        {...register("receiverEmail")}
                        error={!!errors.receiverEmail}
                        helperText={
                          errors.receiverEmail ? errors.receiverEmail.message : ""
                        }
                      />
                    </FormControl>
                    <FormControl fullWidth variant="outlined">
                      <FormLabel>Your message</FormLabel>
                      <TextField
                        placeholder="e.g., hi this is the file."
                        multiline
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "80px",
                            padding: 0,
                            "& textarea": {
                              height: "100% !important",
                              overflowY: "auto",
                              padding: "10px",
                              boxSizing: "border-box",
                            },
                          },
                        }}
                        {...register("message")}
                      />
                    </FormControl>
                  </>
                ) : (
                  <Stack
                    gap={1}
                    sx={{
                      border: "1px solid #D5D7DA",
                      borderRadius: 2,
                      backgroundColor: "#FFF",
                      padding: 2,
                    }}
                  >
                    <Typography variant="body2" fontWeight={700}>
                      Signed-in link sharing
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your files will upload first, then GigaSend will create a secure download link you can copy and share anywhere. Click the purple button below to start.
                    </Typography>
                  </Stack>
                )}

                {/* <AdvancedParams /> */}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            sx={{
              padding: "18px 24px 22px",
              position: "sticky",
              bottom: 0,
              zIndex: 2,
              backgroundColor: "#FFF",
              borderTop: "1px solid #D5D7DA",
              boxShadow: "0 -12px 28px rgba(15, 23, 42, 0.16)",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Stack>
                <Typography variant="subtitle1">
                  Expires on {new Date(Date.now() + expiryLimit * 24 * 60 * 60 * 1000).toDateString()}
                </Typography>
                <TermsConditions sx={{ fontSize: "12px" }} />
              </Stack>

              <Stack direction={{ xs: "column-reverse", sm: "row" }} gap={2} width={{ xs: "100%", sm: "auto" }}>
                <Button
                  onClick={() => router.replace('/')}
                  variant="outlined"
                  type="button"
                  sx={{
                    minHeight: 48,
                    minWidth: { sm: 112 },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
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
                    minHeight: 56,
                    minWidth: { sm: 220 },
                    px: 4,
                    fontSize: 16,
                    fontWeight: 800,
                    textTransform: "none",
                    boxShadow: "0 12px 24px rgba(37, 99, 235, 0.32)",
                    background: "linear-gradient(135deg, #2563eb 0%, #a855f7 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1d4ed8 0%, #9333ea 100%)",
                      boxShadow: "0 14px 28px rgba(37, 99, 235, 0.38)",
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
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 9999 }}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={150}
              thickness={3}
              sx={{
                color: "rgba(255, 255, 255, 0.2)",
                filter: "blur(1px)",
                position: "absolute",
              }}
            />

            {/* Foreground Progress */}
            <CircularProgress
              variant="determinate"
              value={overallProgress}
              size={150}
              thickness={3}
              sx={{
                color: "#198CD2",
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
                color="text.secondary"
                fontSize={18}
                sx={{
                  color: "#FFF",
                }}
              >
                {`${Math.round(overallProgress)}%`}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="#FFF" mt={1}>
            {uploadStatus === "sending email" ? "Sending your transfer email..." : "Uploading your files..."}
          </Typography>
          {uploadStatus &&
            <Typography color="white" variant="body2">
              Status: {isPaused ? "paused" : uploadStatus === "initiating" && overallProgress > 0 ? "uploading" : uploadStatus}
            </Typography>
          }
          <Button
            variant="contained"
            color={isPaused ? "primary" : "inherit"}
            type="button"
            onClick={isPaused ? resumeUpload : pauseUpload}
            sx={{ minWidth: 120 }}
          >
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            type="button"
            onClick={cancelUpload}
            sx={{ minWidth: 120, borderColor: "#FFF", color: "#FFF" }}
          >
            Cancel
          </Button>
          {estimatedTimeLeft !== null && (
            <>-
              <Typography color="white" variant="body2">
                Time remaining: {formatSeconds(estimatedTimeLeft)}
              </Typography>
              <Typography color="white" variant="body2">
                Uploaded: {formatBytes(totalUploadedRef.current)} of {formatBytes(totalBytesRef.current)}
              </Typography>
              <Typography color="white" variant="body2">
                Start time: {new Date(startTimeRef.current ?? 0).toLocaleTimeString()}
              </Typography>
            </>
          )}
        </Stack>
      )}

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
