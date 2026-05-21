import { S3Client } from "@aws-sdk/client-s3";

// Ensure required env vars are present
const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretKey = process.env.R2_SECRET_ACCESS_KEY;
const endpoint = accountId
  ? `https://${accountId}.r2.cloudflarestorage.com`
  : "https://example.r2.cloudflarestorage.com";

// Create an S3 client configured for Cloudflare R2
export const r2Client = new S3Client({
  region: "auto", // Cloudflare R2 uses "auto" region
  endpoint: endpoint, // R2 endpoint including account ID
  credentials: {
    accessKeyId: accessKeyId || "missing-r2-access-key",
    secretAccessKey: secretKey || "missing-r2-secret-key",
  },
  forcePathStyle: true, // Use path-style URLs (required for R2)
});

// Export the bucket name for reuse
export const r2BucketName = process.env.R2_BUCKET_NAME || "";
