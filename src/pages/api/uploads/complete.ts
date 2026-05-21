import type { APIRoute } from "astro";
import { CompleteMultipartUploadCommand, type CompletedPart } from "@aws-sdk/client-s3";
import { r2BucketName, r2Client } from "@/lib/r2Client";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";

export const POST: APIRoute = async ({ request, cookies }) => {
  let userId: string | null = null;
  let body: { uploadId?: string; key?: string; parts?: CompletedPart[] } = {};

  try {
    userId = await getAuthenticatedUserId(cookies);
    if (!userId) return unauthorized();

    body = await request.json();
    const { uploadId, key, parts } = body;
    if (!uploadId || !key || !parts) {
      return json({ error: "Missing uploadId, key, or parts" }, 400);
    }

    const command = new CompleteMultipartUploadCommand({
      Bucket: r2BucketName,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    });
    await r2Client.send(command);

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
