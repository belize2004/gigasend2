import type { APIRoute } from "astro";
import { getDb, type RuntimeLocals } from "@/lib/d1";
import { json } from "@/src/lib/api";
import { getFastSessionIdentity } from "@/src/lib/guestSession";
import {
  evaluateTransferExperience,
  recordTransferEvaluation,
  type EvaluateTransferInput,
} from "@/src/lib/transferEvaluator";

const allowedEvents = new Set([
  "completed",
  "canceled",
  "failed",
  "download_started",
  "download_resumed",
  "page_view",
]);

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const db = getDb(locals);
    const fastSession = getFastSessionIdentity(cookies, locals);
    const userId = fastSession?.userId ?? null;
    const isGuest = fastSession?.isGuest ?? true;

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || !allowedEvents.has(body.event)) {
      return json({ error: "Invalid telemetry event" }, 400);
    }

    const cf = (request as any).cf as
      | {
          colo?: string;
          city?: string;
          country?: string;
          clientTcpRtt?: number;
        }
      | undefined;

    const rayHeader = request.headers.get("cf-ray") || "";
    const fallbackColo = rayHeader.includes("-") ? rayHeader.split("-")[1] : null;

    const evalInput: EvaluateTransferInput = {
      shareId: typeof body.shareId === "string" ? body.shareId : null,
      userId,
      isGuest,
      direction: body.direction === "download" ? "download" : "upload",
      event: body.event,
      transferMode: typeof body.transferMode === "string" ? body.transferMode : null,
      deliveryMode: typeof body.deliveryMode === "string" ? body.deliveryMode : null,
      fileCount: Number(body.fileCount || 1),
      totalBytes: Number(body.totalBytes || 0),
      uploadedBytes: Number(body.uploadedBytes ?? body.totalBytes ?? 0),
      partSize: body.partSize != null ? Number(body.partSize) : null,
      concurrency: body.concurrency != null ? Number(body.concurrency) : null,
      completedParts: Number(body.completedParts || 0),
      retryCount: Number(body.retryCount || 0),
      pauseCount: Number(body.pauseCount || 0),
      resumedFromSavedSession: Boolean(body.resumedFromSavedSession),
      httpStatus: Number(body.httpStatus || 200),
      durationMs: Number(body.durationMs || 0),
      pausedMs: Number(body.pausedMs || 0),
      initMs: body.initMs != null ? Number(body.initMs) : null,
      transferMs: body.transferMs != null ? Number(body.transferMs) : null,
      finalizeMs: body.finalizeMs != null ? Number(body.finalizeMs) : null,
      shareCreationMs: body.shareCreationMs != null ? Number(body.shareCreationMs) : null,
      ttfbMs: body.ttfbMs != null ? Number(body.ttfbMs) : null,
      averageMbps: Number(body.averageMbps || 0),
      edgeColo: cf?.colo || fallbackColo || null,
      edgeCity: cf?.city || null,
      edgeCountry: cf?.country || request.headers.get("cf-ipcountry") || null,
      clientRttMs:
        body.clientRttMs != null
          ? Number(body.clientRttMs)
          : typeof cf?.clientTcpRtt === "number"
            ? cf.clientTcpRtt
            : null,
      clientConnectionType:
        typeof body.clientConnectionType === "string" ? body.clientConnectionType : null,
      clientDownlinkMbps:
        body.clientDownlinkMbps != null ? Number(body.clientDownlinkMbps) : null,
      errorMessage: typeof body.errorMessage === "string" ? body.errorMessage : null,
      canceled: Boolean(body.canceled),
    };

    const evaluation = evaluateTransferExperience(evalInput);

    console.log("transfer evaluation", {
      userId,
      isGuest,
      event: evalInput.event,
      grade: evaluation.gradeLabel,
      story: evaluation.story,
      stepSummaryLine: evaluation.stepSummaryLine,
      bottleneck: evaluation.bottleneckLabel,
    });

    const waitUntil = (locals as RuntimeLocals)?.runtime?.ctx?.waitUntil;
    const runtimeEnv = (locals as any)?.runtime?.env as Record<string, any> | undefined;
    const persistTask = recordTransferEvaluation(db, evalInput, runtimeEnv).catch((err) => {
      console.warn("[telemetry] Failed to persist transfer evaluation:", err);
    });

    if (typeof waitUntil === "function") {
      waitUntil.call((locals as RuntimeLocals).runtime!.ctx, persistTask);
    } else {
      await persistTask;
    }

    return json({
      success: true,
      evaluation,
    });
  } catch {
    return json({ success: false }, 200);
  }
};
