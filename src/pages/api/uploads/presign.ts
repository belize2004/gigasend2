import type { APIRoute } from "astro";
import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2BucketName, r2Client } from "@/lib/r2Client";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";

export const POST: APIRoute = async ({ request, cookies }) => {
  let userId: string | null = null;
  let body: { uploadId?: string; key?: string; partNumber?: number; partNumbers?: number[] } = {};

  try {
    userId = await getAuthenticatedUserId(cookies);
    if (!userId) return unauthorized();

    body = await request.json();
    const { uploadId, key, partNumber, partNumbers } = body;
    const requestedPartNumbers = Array.isArray(partNumbers) ? partNumbers : [partNumber];

    if (!uploadId || !key || requestedPartNumbers.some((value) => value == null)) {
      return json({ error: "Missing uploadId, key, or partNumber" }, 400);
    }

    if (requestedPartNumbers.length > 16) {
      return json({ error: "Too many part numbers requested" }, 400);
    }

    const partNos = requestedPartNumbers.map((value) => Number(value));
    if (partNos.some((partNo) => Number.isNaN(partNo) || partNo < 1 || partNo > 10_000)) {
      return json({ error: "Invalid partNumber" }, 400);
    }

    const urls = await Promise.all(partNos.map(async (partNo) => {
      const command = new UploadPartCommand({
        Bucket: r2BucketName,
        Key: key,
        UploadId: uploadId,
        PartNumber: partNo,
      });
      const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
      return [String(partNo), url] as const;
    }));

    const urlMap = Object.fromEntries(urls);
    return json({
      url: urlMap[String(partNos[0])],
      urls: urlMap,
    });
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
