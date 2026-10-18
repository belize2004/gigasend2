import type { APIRoute } from "astro";
import { getDb } from "@/lib/d1";
import { json } from "@/src/lib/api";
import { getOrCreateUserSession } from "@/src/lib/guestSession";

const allowedEvents = new Set(["completed", "canceled", "failed"]);

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const db = getDb(locals);
    const session = await getOrCreateUserSession(cookies, db);
    const userId = session.userId;

    const body = await request.json();
    if (!allowedEvents.has(body.event)) {
      return json({ error: "Invalid telemetry event" }, 400);
    }

    console.log("upload telemetry", {
      userId,
      isGuest: session.isGuest,
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
  } catch {
    return json({ success: false }, 200);
  }
};


