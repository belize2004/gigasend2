import type { APIRoute } from "astro";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";

const allowedEvents = new Set(["completed", "canceled", "failed"]);

export const POST: APIRoute = async ({ request, cookies }) => {
  const userId = await getAuthenticatedUserId(cookies);
  if (!userId) return unauthorized();

  const body = await request.json();
  if (!allowedEvents.has(body.event)) {
    return json({ error: "Invalid telemetry event" }, 400);
  }

  console.log("upload telemetry", {
    userId,
    event: body.event,
    fileCount: body.fileCount,
    totalBytes: body.totalBytes,
    uploadedBytes: body.uploadedBytes,
    partSize: body.partSize,
    concurrency: body.concurrency,
    completedParts: body.completedParts,
    retryCount: body.retryCount,
    pauseCount: body.pauseCount,
    resumedFromSavedSession: body.resumedFromSavedSession,
    durationMs: body.durationMs,
    pausedMs: body.pausedMs,
    averageMbps: body.averageMbps,
    errorMessage: body.errorMessage,
    canceled: body.canceled,
  });

  return json({ success: true });
};

