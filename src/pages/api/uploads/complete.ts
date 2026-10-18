import type { APIRoute } from "astro";
import {
  CompleteMultipartUploadCommand,
  HeadObjectCommand,
  ListPartsCommand,
  type CompletedPart,
} from "@aws-sdk/client-s3";
import { r2BucketName, r2Client } from "@/lib/r2Client";
import { json } from "@/src/lib/api";
import { getFastSessionIdentity } from "@/src/lib/guestSession";
import { captureMonitoringException } from "@/lib/monitoring";

async function listUploadedPartsFromR2(key: string, uploadId: string): Promise<{ parts: Map<number, string>; noSuchUpload: boolean }> {
  const r2Parts = new Map<number, string>();
  let partNumberMarker: string | undefined = undefined;

  try {
    for (let page = 0; page < 15; page++) {
      const listRes = await r2Client.send(
        new ListPartsCommand({
          Bucket: r2BucketName,
          Key: key,
          UploadId: uploadId,
          PartNumberMarker: partNumberMarker,
        })
      );

      for (const p of listRes.Parts || []) {
        if (typeof p.PartNumber === "number" && p.ETag) {
          r2Parts.set(p.PartNumber, p.ETag);
        }
      }

      if (!listRes.IsTruncated || !listRes.NextPartNumberMarker) {
        break;
      }
      partNumberMarker = String(listRes.NextPartNumberMarker);
    }
    return { parts: r2Parts, noSuchUpload: false };
  } catch (err: any) {
    const errName = String(err?.name || err?.Code || "");
    const isNoSuchUpload = errName === "NoSuchUpload" || String(err?.message || "").includes("NoSuchUpload");
    return { parts: r2Parts, noSuchUpload: isNoSuchUpload };
  }
}

async function checkObjectAlreadyExistsInR2(key: string, filesBinding: any): Promise<boolean> {
  try {
    if (filesBinding && typeof filesBinding.head === "function") {
      const existing = await filesBinding.head(key);
      if (existing) return true;
    }
  } catch {}

  try {
    await r2Client.send(new HeadObjectCommand({ Bucket: r2BucketName, Key: key }));
    return true;
  } catch {
    return false;
  }
}

const CLIENT_UPLOAD_STATE_ERRORS = new Set([
  "NoSuchUpload",
  "InvalidPart",
  "InvalidPartOrder",
  "EntityTooSmall",
  "NoSuchKey",
]);

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: { uploadId?: string; key?: string; parts?: CompletedPart[] } = {};

  try {
    const [session, rawBody] = await Promise.all([
      getFastSessionIdentity(cookies, locals),
      request.json().catch(() => null),
    ]);
    userId = session.userId;

    if (!rawBody || typeof rawBody !== "object") {
      return json({ error: "Invalid JSON body" }, 400);
    }
    body = rawBody;
    const { uploadId, key, parts } = body;
    if (!uploadId || !key || !Array.isArray(parts) || parts.length === 0) {
      return json({ error: "Missing uploadId, key, or parts" }, 400);
    }

    const filesBinding = (locals as any)?.runtime?.env?.FILES;

    // Deduplicate parts by PartNumber and detect if any ETag was stripped/missing
    const partMap = new Map<number, string>();
    let needsEtagBackfill = false;

    for (const part of parts) {
      const partNo = Number((part as any)?.PartNumber ?? (part as any)?.partNumber);
      const rawEtag = String((part as any)?.ETag ?? (part as any)?.etag ?? "").trim();
      if (!Number.isFinite(partNo) || partNo < 1) continue;
      if (!rawEtag) {
        needsEtagBackfill = true;
        partMap.set(partNo, "");
      } else {
        partMap.set(partNo, rawEtag);
      }
    }

    let backfillEncounteredNoSuchUpload = false;
    if (needsEtagBackfill || partMap.size === 0) {
      const { parts: r2Parts, noSuchUpload } = await listUploadedPartsFromR2(key, uploadId);
      backfillEncounteredNoSuchUpload = noSuchUpload;
      if (partMap.size === 0) {
        for (const [partNo, etag] of r2Parts.entries()) {
          partMap.set(partNo, etag);
        }
      } else {
        for (const [partNo, etag] of partMap.entries()) {
          if (!etag && r2Parts.has(partNo)) {
            partMap.set(partNo, r2Parts.get(partNo)!);
          }
        }
      }
    }

    const normalizedParts: CompletedPart[] = Array.from(partMap.entries())
      .filter(([, etag]) => Boolean(etag))
      .sort((a, b) => a[0] - b[0])
      .map(([PartNumber, ETag]) => ({ PartNumber, ETag }));

    if (normalizedParts.length === 0) {
      // Check if the upload was already finalized on an earlier request or edge retry
      if (await checkObjectAlreadyExistsInR2(key, filesBinding)) {
        return json({ message: "Upload complete", key, alreadyCompleted: true });
      }
      if (backfillEncounteredNoSuchUpload) {
        return json(
          {
            error: "Upload session expired or already closed. Please retry the upload.",
            code: "NoSuchUpload",
            resetSession: true,
          },
          404
        );
      }
      return json(
        {
          error: "No valid uploaded parts found for this upload session",
          code: "InvalidPart",
          resetSession: true,
        },
        400
      );
    }

    try {
      const command = new CompleteMultipartUploadCommand({
        Bucket: r2BucketName,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: { Parts: normalizedParts },
      });
      await r2Client.send(command);
    } catch (completeErr: any) {
      const errName = String(completeErr?.name || completeErr?.Code || "");

      // Fallback 1: If S3 CompleteMultipartUpload failed due to stale client ETags, refresh from R2 ListParts and retry once
      if (!needsEtagBackfill && errName !== "NoSuchUpload") {
        const { parts: freshParts } = await listUploadedPartsFromR2(key, uploadId);
        if (freshParts.size > 0) {
          try {
            const refreshedParts: CompletedPart[] = Array.from(freshParts.entries())
              .sort((a, b) => a[0] - b[0])
              .map(([PartNumber, ETag]) => ({ PartNumber, ETag }));
            await r2Client.send(
              new CompleteMultipartUploadCommand({
                Bucket: r2BucketName,
                Key: key,
                UploadId: uploadId,
                MultipartUpload: { Parts: refreshedParts },
              })
            );
            return json({ message: "Upload complete", key, recoveredViaListParts: true });
          } catch {}
        }
      }

      // Fallback 2: Native Cloudflare R2 binding resumeMultipartUpload
      if (filesBinding && typeof filesBinding.resumeMultipartUpload === "function" && errName !== "NoSuchUpload") {
        try {
          const upload = filesBinding.resumeMultipartUpload(key, uploadId);
          await upload.complete(
            normalizedParts.map((p) => ({
              partNumber: Number(p.PartNumber),
              etag: String(p.ETag || "").replace(/^"|"$/g, ""),
            }))
          );
          return json({ message: "Upload complete", key, recoveredViaBinding: true });
        } catch {
          try {
            const upload = filesBinding.resumeMultipartUpload(key, uploadId);
            await upload.complete(
              normalizedParts.map((p) => ({
                partNumber: Number(p.PartNumber),
                etag: String(p.ETag || ""),
              }))
            );
            return json({ message: "Upload complete", key, recoveredViaBinding: true });
          } catch {}
        }
      }

      // Fallback 3: Idempotent check — if upload was already finalized on a prior request, verify object exists in R2
      if (await checkObjectAlreadyExistsInR2(key, filesBinding)) {
        return json({ message: "Upload complete", key, alreadyCompleted: true });
      }

      // If R2 reports a client-side multipart state error (expired uploadId, missing/small parts), return 4xx with resetSession
      if (CLIENT_UPLOAD_STATE_ERRORS.has(errName)) {
        const status = errName === "NoSuchUpload" || errName === "NoSuchKey" ? 404 : 400;
        return json(
          {
            error: `Upload session could not be finalized (${errName}). Please retry the upload.`,
            code: errName,
            resetSession: true,
          },
          status
        );
      }

      throw completeErr;
    }

    return json({ message: "Upload complete", key });
  } catch (error) {
    console.error("Error completing multipart upload:", error);
    captureMonitoringException(error, {
      user: { id: userId },
      tags: { feature: "upload", route: "complete" },
      context: {
        keyPrefix: body.key?.split("/")[0],
        partCount: Array.isArray(body.parts) ? body.parts.length : undefined,
      },
    });
    return json({ error: "Failed to complete upload" }, 500);
  }
};


