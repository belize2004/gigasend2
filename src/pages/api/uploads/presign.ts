import type { APIRoute } from "astro";
import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2BucketName, r2Client } from "@/lib/r2Client";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";

export const POST: APIRoute = async ({ request, cookies }) => {
  let userId: string | null = null;
  let body: { uploadId?: string; key?: string; partNumber?: number } = {};

  try {
    userId = await getAuthenticatedUserId(cookies);
    if (!userId) return unauthorized();

    body = await request.json();
    const { uploadId, key, partNumber } = body;
    if (!uploadId || !key || partNumber == null) {
      return json({ error: "Missing uploadId, key, or partNumber" }, 400);
    }

    const partNo = Number(partNumber);
    if (Number.isNaN(partNo)) {
      return json({ error: "Invalid partNumber" }, 400);
    }

    const command = new UploadPartCommand({
      Bucket: r2BucketName,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNo,
    });
    const presignedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });

    return json({ url: presignedUrl });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    captureMonitoringException(error, {
      user: { id: userId },
      tags: { feature: "upload", route: "presign" },
      context: {
        keyPrefix: body.key?.split("/")[0],
        partNumber: body.partNumber,
      },
    });
    return json({ error: "Failed to generate presigned URL" }, 500);
  }
};
