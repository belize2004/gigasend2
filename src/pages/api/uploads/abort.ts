import type { APIRoute } from "astro";
import { AbortMultipartUploadCommand } from "@aws-sdk/client-s3";
import { r2BucketName, r2Client } from "@/lib/r2Client";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const userId = await getAuthenticatedUserId(cookies);
    if (!userId) return unauthorized();

    const { uploadId, key } = await request.json();
    if (!uploadId || !key) {
      return json({ error: "Missing uploadId or key" }, 400);
    }

    const command = new AbortMultipartUploadCommand({
      Bucket: r2BucketName,
      Key: key,
      UploadId: uploadId,
    });
    await r2Client.send(command);

    return json({ message: "Upload aborted" });
  } catch (error) {
    console.error("Error aborting multipart upload:", error);
    return json({ error: "Failed to abort upload" }, 500);
  }
};

