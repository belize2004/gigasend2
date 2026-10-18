import type { APIRoute } from "astro";
import { MAX_PRESIGN_BATCH_SIZE, presignParts } from "@/lib/r2Client";
import { json } from "@/src/lib/api";
import { getFastSessionIdentity } from "@/src/lib/guestSession";
import { captureMonitoringException } from "@/lib/monitoring";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: { uploadId?: string; key?: string; partNumber?: number; partNumbers?: number[] } = {};

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
    const { uploadId, key, partNumber, partNumbers } = body;
    const requestedPartNumbers = Array.isArray(partNumbers) ? partNumbers : [partNumber];

    if (!uploadId || !key || requestedPartNumbers.length === 0 || requestedPartNumbers.some((value) => value == null)) {
      return json({ error: "Missing uploadId, key, or partNumber" }, 400);
    }

    if (requestedPartNumbers.length > MAX_PRESIGN_BATCH_SIZE) {
      return json({ error: `Too many part numbers requested (max ${MAX_PRESIGN_BATCH_SIZE})` }, 400);
    }

    const partNos = requestedPartNumbers.map((value) => Number(value));
    if (partNos.some((partNo) => !Number.isInteger(partNo) || partNo < 1 || partNo > 10_000)) {
      return json({ error: "Invalid partNumber" }, 400);
    }

    const urlMap = await presignParts(key, uploadId, partNos);
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
