import type { APIRoute } from "astro";
import { AbortMultipartUploadCommand } from "@aws-sdk/client-s3";
import { r2BucketName, r2Client } from "@/lib/r2Client";
import { getFastSessionIdentity } from "@/src/lib/guestSession";
import { json } from "@/src/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: { uploadId?: string; key?: string } = {};

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
    const { uploadId, key } = body;
    if (!uploadId || !key) {
      return json({ error: "Missing uploadId or key" }, 400);
    }

    try {
      const command = new AbortMultipartUploadCommand({
        Bucket: r2BucketName,
        Key: key,
        UploadId: uploadId,
      });
      await r2Client.send(command);
    } catch (abortErr: any) {
      const errName = String(abortErr?.name || abortErr?.Code || "");
      if (errName === "NoSuchUpload" || String(abortErr?.message || "").includes("NoSuchUpload")) {
        return json({ message: "Upload already aborted or closed" });
      }
      const filesBinding = (locals as any)?.runtime?.env?.FILES;
      if (filesBinding && typeof filesBinding.resumeMultipartUpload === "function") {
        try {
          await filesBinding.resumeMultipartUpload(key, uploadId).abort();
          return json({ message: "Upload aborted" });
        } catch {
          return json({ message: "Upload already aborted or closed" });
        }
      }
      throw abortErr;
    }

    return json({ message: "Upload aborted" });
  } catch (error) {
    console.error("Error aborting multipart upload:", error);
    captureMonitoringException(error, {
      user: { id: userId },
      tags: { feature: "upload", route: "abort" },
      context: {
        uploadId: body.uploadId,
        key: body.key,
      },
    });
    return json({ error: "Failed to abort upload" }, 500);
  }
};


