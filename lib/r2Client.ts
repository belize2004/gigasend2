import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
export const r2BucketName = process.env.R2_BUCKET_NAME || "gigasend-files";

export const MAX_PRESIGN_BATCH_SIZE = 100;

export async function presignPart(
  key: string,
  uploadId: string,
  partNumber: number,
  expiresIn = 3600,
): Promise<string> {
  const command = new UploadPartCommand({
    Bucket: r2BucketName,
    Key: key,
    UploadId: uploadId,
    PartNumber: partNumber,
  });
  return getSignedUrl(r2Client, command, { expiresIn });
}

export async function presignParts(
  key: string,
  uploadId: string,
  partNumbers: number[],
  expiresIn = 3600,
): Promise<Record<string, string>> {
  const entries = await Promise.all(
    partNumbers.map(async (partNo) => {
      const url = await presignPart(key, uploadId, partNo, expiresIn);
      return [String(partNo), url] as const;
    }),
  );
  return Object.fromEntries(entries);
}

export async function presignPutObject(
  key: string,
  contentType: string,
  contentLength?: number,
  expiresIn = 3600,
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: r2BucketName,
    Key: key,
    ContentType: contentType,
    ...(typeof contentLength === "number" ? { ContentLength: contentLength } : {}),
  });
  return getSignedUrl(r2Client, command, { expiresIn });
}

export function hasS3Credentials(runtimeEnv?: Record<string, unknown>): boolean {
  const acc = (runtimeEnv?.R2_ACCOUNT_ID as string) || accountId;
  const key = (runtimeEnv?.R2_ACCESS_KEY_ID as string) || accessKeyId;
  const sec = (runtimeEnv?.R2_SECRET_ACCESS_KEY as string) || secretKey;
  return Boolean(acc && key && sec && key !== "missing-r2-access-key" && sec !== "missing-r2-secret-key");
}

export function getR2Client(runtimeEnv?: Record<string, unknown>): S3Client {
  const envAccountId = (runtimeEnv?.R2_ACCOUNT_ID as string) || accountId;
  const envAccessKeyId = (runtimeEnv?.R2_ACCESS_KEY_ID as string) || accessKeyId;
  const envSecretKey = (runtimeEnv?.R2_SECRET_ACCESS_KEY as string) || secretKey;

  if (
    envAccountId === accountId &&
    envAccessKeyId === accessKeyId &&
    envSecretKey === secretKey
  ) {
    return r2Client;
  }

  return new S3Client({
    region: "auto",
    endpoint: envAccountId
      ? `https://${envAccountId}.r2.cloudflarestorage.com`
      : endpoint,
    credentials: {
      accessKeyId: envAccessKeyId || "missing-r2-access-key",
      secretAccessKey: envSecretKey || "missing-r2-secret-key",
    },
    forcePathStyle: true,
  });
}

export async function createPresignedDownloadUrl(input: {
  fileKey: string;
  contentDisposition: string;
  expiresIn?: number;
  runtimeEnv?: Record<string, unknown>;
}): Promise<string | null> {
  if (!hasS3Credentials(input.runtimeEnv)) {
    return null;
  }

  const client = getR2Client(input.runtimeEnv);
  const bucket = (input.runtimeEnv?.R2_BUCKET_NAME as string) || r2BucketName;
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: input.fileKey,
    ResponseContentDisposition: input.contentDisposition,
    ResponseContentType: "application/octet-stream",
  });

  return getSignedUrl(client, command, { expiresIn: input.expiresIn ?? 3600 });
}
