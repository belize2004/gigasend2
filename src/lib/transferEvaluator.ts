import type { AppD1Database } from "@/lib/d1";
import { brand } from "@/lib/brand";
import { sendEmailViaCloudflare } from "@/lib/email";
import { formatBytes } from "@/lib/utils";
import type {
  AdaptiveSpeedTuning,
  ExperienceGradeCode,
  PlainEnglishTransferEvaluation,
  TransferExperienceOverview,
  TransferExperienceRecord,
  TransferStepBreakdownItem,
} from "@/types/app-data";

const COLO_CITY_MAP: Record<string, string> = {
  LAX: "Los Angeles, US",
  SJC: "San Jose, US",
  SFO: "San Francisco, US",
  SEA: "Seattle, US",
  PDX: "Portland, US",
  PHX: "Phoenix, US",
  DEN: "Denver, US",
  DFW: "Dallas, US",
  IAH: "Houston, US",
  AUS: "Austin, US",
  ORD: "Chicago, US",
  MSP: "Minneapolis, US",
  STL: "St. Louis, US",
  ATL: "Atlanta, US",
  MIA: "Miami, US",
  MCO: "Orlando, US",
  TPA: "Tampa, US",
  CLT: "Charlotte, US",
  IAD: "Ashburn / Washington DC, US",
  EWR: "Newark / New York, US",
  JFK: "New York, US",
  BOS: "Boston, US",
  PHL: "Philadelphia, US",
  DTW: "Detroit, US",
  YYZ: "Toronto, CA",
  YVR: "Vancouver, CA",
  YUL: "Montreal, CA",
  MEX: "Mexico City, MX",
  QRO: "Querétaro, MX",
  GRU: "São Paulo, BR",
  GIG: "Rio de Janeiro, BR",
  EZE: "Buenos Aires, AR",
  SCL: "Santiago, CL",
  BOG: "Bogotá, CO",
  LIM: "Lima, PE",
  LHR: "London, UK",
  MAN: "Manchester, UK",
  CDG: "Paris, FR",
  MRS: "Marseille, FR",
  FRA: "Frankfurt, DE",
  MUC: "Munich, DE",
  BER: "Berlin, DE",
  AMS: "Amsterdam, NL",
  MAD: "Madrid, ES",
  BCN: "Barcelona, ES",
  MXP: "Milan, IT",
  FCO: "Rome, IT",
  ZRH: "Zurich, CH",
  VIE: "Vienna, AT",
  WAW: "Warsaw, PL",
  ARN: "Stockholm, SE",
  DUB: "Dublin, IE",
  NRT: "Tokyo, JP",
  KIX: "Osaka, JP",
  ICN: "Seoul, KR",
  SIN: "Singapore, SG",
  HKG: "Hong Kong",
  TPE: "Taipei, TW",
  BOM: "Mumbai, IN",
  DEL: "New Delhi, IN",
  BLR: "Bangalore, IN",
  DXB: "Dubai, AE",
  SYD: "Sydney, AU",
  MEL: "Melbourne, AU",
  AKL: "Auckland, NZ",
  JNB: "Johannesburg, ZA",
};

export interface EvaluateTransferInput {
  shareId?: string | null;
  userId?: string | null;
  isGuest?: boolean;
  direction?: "upload" | "download";
  event: "completed" | "canceled" | "failed" | "download_started" | "download_resumed" | "page_view";
  transferMode?: string | null;
  deliveryMode?: string | null;
  fileCount?: number;
  totalBytes?: number;
  uploadedBytes?: number;
  partSize?: number | null;
  concurrency?: number;
  completedParts?: number;
  retryCount?: number;
  pauseCount?: number;
  resumedFromSavedSession?: boolean;
  httpStatus?: number;
  durationMs?: number;
  pausedMs?: number;
  initMs?: number | null;
  transferMs?: number | null;
  finalizeMs?: number | null;
  shareCreationMs?: number | null;
  ttfbMs?: number | null;
  averageMbps?: number;
  edgeColo?: string | null;
  edgeCity?: string | null;
  edgeCountry?: string | null;
  clientRttMs?: number | null;
  clientConnectionType?: string | null;
  clientDownlinkMbps?: number | null;
  errorMessage?: string | null;
  canceled?: boolean;
}

let tableEnsured = false;

export function formatFriendlyDuration(ms: number): string {
  const safeMs = Math.max(0, Math.round(ms));
  if (safeMs < 1000) {
    return `${(safeMs / 1000).toFixed(1)}s`;
  }
  const seconds = safeMs / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }
  const mins = Math.floor(seconds / 60);
  const remSec = Math.round(seconds % 60);
  return remSec > 0 ? `${mins}m ${remSec}s` : `${mins}m`;
}

export function resolveEdgeLocationLabel(
  edgeColo?: string | null,
  edgeCity?: string | null,
  edgeCountry?: string | null,
): string {
  const cleanColo = edgeColo?.trim().toUpperCase() || null;
  const cleanCity = edgeCity?.trim() || null;
  const cleanCountry = edgeCountry?.trim().toUpperCase() || null;

  if (cleanCity && cleanCountry && cleanColo) {
    return `${cleanCity}, ${cleanCountry} (${cleanColo})`;
  }
  if (cleanColo && COLO_CITY_MAP[cleanColo]) {
    return `${COLO_CITY_MAP[cleanColo]} (${cleanColo})`;
  }
  if (cleanCity && cleanCountry) {
    return `${cleanCity}, ${cleanCountry}`;
  }
  if (cleanColo) {
    return `Cloudflare Edge (${cleanColo})`;
  }
  return "Nearest Cloudflare Edge Server";
}

function describeSpeedInPlainEnglish(mbps: number, totalBytes: number, durationMs: number): string {
  if (totalBytes < 5 * 1024 * 1024 && durationMs <= 1200) {
    return "instant edge transfer (completed in under a second)";
  }
  if (mbps >= 250) {
    return `ultra-fast fiber speed (${mbps.toFixed(0)} Mbps — about ${(mbps / 8).toFixed(0)} MB per second)`;
  }
  if (mbps >= 80) {
    return `fast broadband speed (${mbps.toFixed(0)} Mbps — about ${(mbps / 8).toFixed(1)} MB per second)`;
  }
  if (mbps >= 25) {
    return `healthy Wi-Fi speed (${mbps.toFixed(1)} Mbps — about ${(mbps / 8).toFixed(1)} MB per second)`;
  }
  if (mbps >= 8) {
    return `standard home or mobile connection (${mbps.toFixed(1)} Mbps — about ${(mbps / 8).toFixed(1)} MB per second)`;
  }
  if (mbps > 0) {
    return `slow internet connection (${mbps.toFixed(1)} Mbps)`;
  }
  return "instant local response";
}

export function evaluateTransferExperience(
  input: EvaluateTransferInput,
): PlainEnglishTransferEvaluation {
  const direction = input.direction === "download" ? "download" : "upload";
  const fileCount = Math.max(1, Number(input.fileCount || 1));
  const totalBytes = Math.max(0, Number(input.totalBytes || 0));
  const transferredBytes = Math.max(0, Number(input.uploadedBytes ?? totalBytes));
  const durationMs = Math.max(1, Number(input.durationMs || input.ttfbMs || 1));
  const retryCount = Math.max(0, Number(input.retryCount || 0));
  const pauseCount = Math.max(0, Number(input.pauseCount || 0));
  const resumedSession = Boolean(input.resumedFromSavedSession);
  const httpStatus = Number(input.httpStatus || 200);
  const edgeLocationLabel = resolveEdgeLocationLabel(input.edgeColo, input.edgeCity, input.edgeCountry);
  const sizeText = formatBytes(totalBytes || transferredBytes);
  const fileNoun = fileCount === 1 ? "1 file" : `${fileCount} files`;

  // Download transaction evaluation
  if (direction === "download") {
    const ttfbMs = Math.max(1, Number(input.ttfbMs ?? durationMs));
    const isRange206 = httpStatus === 206 || input.event === "download_resumed";
    const isZip = input.transferMode === "zip_full" || input.transferMode === "zip_batch" || input.transferMode === "stream_zip";
    const isPageView = input.event === "page_view" || input.transferMode === "landing_page";

    let grade: ExperienceGradeCode = "A";
    let gradeLabel = "Excellent (A)";
    let gradeColor: PlainEnglishTransferEvaluation["gradeColor"] = "emerald";

    if (ttfbMs <= 350) {
      grade = "A";
      gradeLabel = "Excellent (A)";
      gradeColor = "emerald";
    } else if (ttfbMs <= 900) {
      grade = "B";
      gradeLabel = "Good (B)";
      gradeColor = "blue";
    } else {
      grade = "C";
      gradeLabel = "Moderate Wait (C)";
      gradeColor = "amber";
    }

    const steps: TransferStepBreakdownItem[] = isPageView
      ? [
          {
            stepNumber: 1,
            phaseName: "Opening download page",
            durationMs: ttfbMs,
            durationText: formatFriendlyDuration(ttfbMs),
            label: `1. Opening download page: ${formatFriendlyDuration(ttfbMs)}`,
            percentOfTotal: 100,
            plainExplanation: "Verified that the transfer link is active and loaded the download screen.",
          },
        ]
      : [
          {
            stepNumber: 1,
            phaseName: "Locating files at edge",
            durationMs: Math.max(1, Math.round(ttfbMs * 0.35)),
            durationText: formatFriendlyDuration(Math.max(1, Math.round(ttfbMs * 0.35))),
            label: `1. Locating files: ${formatFriendlyDuration(Math.max(1, Math.round(ttfbMs * 0.35)))}`,
            percentOfTotal: 35,
            plainExplanation: "Checked link expiration and connected to the nearest Cloudflare storage node.",
          },
          {
            stepNumber: 2,
            phaseName: isZip ? "Bundling & starting ZIP stream" : isRange206 ? "Resuming smart byte stream" : "Starting direct file stream",
            durationMs: Math.max(1, ttfbMs - Math.round(ttfbMs * 0.35)),
            durationText: formatFriendlyDuration(Math.max(1, ttfbMs - Math.round(ttfbMs * 0.35))),
            label: `2. Starting download: ${formatFriendlyDuration(Math.max(1, ttfbMs - Math.round(ttfbMs * 0.35)))}`,
            percentOfTotal: 65,
            plainExplanation: isZip
              ? "Opened a live ZIP stream with 1-file lookahead prefetching so the recipient didn't have to wait."
              : isRange206
                ? "Served an exact byte slice (HTTP 206) so the browser could pause/resume smoothly."
                : "Began streaming the file directly from Cloudflare R2 edge storage.",
          },
        ];

    const story = isPageView
      ? `Recipient opened the download page for ${fileNoun} (${sizeText}) in ${formatFriendlyDuration(ttfbMs)} via ${edgeLocationLabel}.`
      : isZip
        ? `Recipient started downloading ${fileNoun} (${sizeText}) as a live streaming ZIP in ${formatFriendlyDuration(ttfbMs)} via ${edgeLocationLabel}.`
        : isRange206
          ? `Recipient streamed or resumed ${fileNoun} (${sizeText}) using resumable smart chunks (HTTP 206) in ${formatFriendlyDuration(ttfbMs)} via ${edgeLocationLabel}.`
          : `Recipient started downloading ${fileNoun} (${sizeText}) in ${formatFriendlyDuration(ttfbMs)} via ${edgeLocationLabel} with zero delay.`;

    const recommendations: string[] = [];
    if (ttfbMs <= 400) {
      recommendations.push("Download started almost instantly from the nearest Cloudflare server — no changes needed.");
    } else if (isZip) {
      recommendations.push("Multi-file ZIP streaming started on the fly; 1-file lookahead prefetching is active to keep files flowing without pauses.");
    } else {
      recommendations.push("First-download email notifications now run in the background so recipients never wait on email delivery before their download begins.");
    }
    if (isRange206) {
      recommendations.push("Smart resumable download (HTTP 206) was used, protecting the recipient if their Wi-Fi briefly drops.");
    }

    return {
      grade,
      gradeLabel,
      gradeColor,
      headline: isPageView ? "Recipient viewed download page" : "Fast edge download delivery",
      story,
      speedComparison: `Download started in ${formatFriendlyDuration(ttfbMs)}`,
      edgeLocationLabel,
      steps,
      stepSummaryLine: steps.map((s) => s.label).join(" · "),
      recommendations,
      bottleneck: "none",
      bottleneckLabel: "Instant edge delivery",
    };
  }

  // Upload transaction evaluation
  const rawInitMs = Math.max(0, Number(input.initMs || 0));
  const rawFinalizeMs = Math.max(0, Number(input.finalizeMs || 0));
  const rawShareMs = Math.max(0, Number(input.shareCreationMs || 0));
  const hasPhaseBreakdown = rawInitMs > 0 || rawFinalizeMs > 0 || rawShareMs > 0 || Number(input.transferMs || 0) > 0;

  const initMs = hasPhaseBreakdown ? Math.max(20, rawInitMs) : Math.min(350, Math.max(40, Math.round(durationMs * 0.08)));
  const postUploadMs = hasPhaseBreakdown
    ? Math.max(20, rawFinalizeMs + rawShareMs)
    : Math.min(500, Math.max(50, Math.round(durationMs * 0.1)));
  const transferMs = hasPhaseBreakdown && Number(input.transferMs || 0) > 0
    ? Math.max(20, Number(input.transferMs))
    : Math.max(20, durationMs - initMs - postUploadMs);

  const effectiveMbps = Number(
    (
      input.averageMbps && input.averageMbps > 0
        ? input.averageMbps
        : transferredBytes > 0
          ? (transferredBytes * 8) / (Math.max(1, transferMs) / 1000) / 1_000_000
          : 0
    ).toFixed(2),
  );

  const totalStepMs = Math.max(1, initMs + transferMs + postUploadMs);
  const steps: TransferStepBreakdownItem[] = [
    {
      stepNumber: 1,
      phaseName: "Starting up",
      durationMs: initMs,
      durationText: formatFriendlyDuration(initMs),
      label: `1. Starting up: ${formatFriendlyDuration(initMs)}`,
      percentOfTotal: Math.max(1, Math.round((initMs / totalStepMs) * 100)),
      plainExplanation: "Checked available storage and prepared pre-signed cloud upload channels.",
    },
    {
      stepNumber: 2,
      phaseName: fileCount > 1 ? `Sending ${fileCount} files` : "Sending file",
      durationMs: transferMs,
      durationText: formatFriendlyDuration(transferMs),
      label: `2. Sending ${fileCount > 1 ? "files" : "file"}: ${formatFriendlyDuration(transferMs)}`,
      percentOfTotal: Math.max(1, Math.round((transferMs / totalStepMs) * 100)),
      plainExplanation: "Uploaded data directly to the closest Cloudflare edge storage server in parallel streams.",
    },
    {
      stepNumber: 3,
      phaseName: input.deliveryMode === "email" ? "Verifying & emailing link" : "Creating share link",
      durationMs: postUploadMs,
      durationText: formatFriendlyDuration(postUploadMs),
      label: `3. ${input.deliveryMode === "email" ? "Emailing link" : "Creating share link"}: ${formatFriendlyDuration(postUploadMs)}`,
      percentOfTotal: Math.max(1, Math.round((postUploadMs / totalStepMs) * 100)),
      plainExplanation: "Verified that every piece arrived intact and generated the recipient's download link.",
    },
  ];

  const speedComparison = describeSpeedInPlainEnglish(effectiveMbps, totalBytes, durationMs);

  // Failed or canceled uploads
  if (input.event === "failed") {
    const cleanErr = input.errorMessage?.trim() || "a connection interruption";
    return {
      grade: "F",
      gradeLabel: "Transfer Interrupted (F)",
      gradeColor: "red",
      headline: "Upload stopped before completion",
      story: `Attempted to upload ${fileNoun} (${sizeText}) via ${edgeLocationLabel}, but the transfer stopped after ${formatFriendlyDuration(durationMs)} due to: ${cleanErr}.`,
      speedComparison,
      edgeLocationLabel,
      steps,
      stepSummaryLine: steps.map((s) => s.label).join(" · "),
      recommendations: [
        "If the sender selects the same file again, Gigasend's automatic crash recovery will resume from the pieces that already finished.",
        retryCount > 0
          ? `The sender's network dropped ${retryCount} times before failing — switching to a stable Wi-Fi or wired connection will prevent interruptions.`
          : "Verify that the file is not empty (0 bytes) and that the sender has enough storage space remaining.",
      ],
      bottleneck: "failed_transfer",
      bottleneckLabel: "Interrupted before completion",
    };
  }

  if (input.event === "canceled" || input.canceled) {
    return {
      grade: "C",
      gradeLabel: "Canceled by Sender (C)",
      gradeColor: "amber",
      headline: "Sender canceled the upload",
      story: `Sender canceled the upload of ${fileNoun} (${sizeText}) after ${formatFriendlyDuration(durationMs)} (${formatBytes(transferredBytes)} sent).`,
      speedComparison,
      edgeLocationLabel,
      steps,
      stepSummaryLine: steps.map((s) => s.label).join(" · "),
      recommendations: [
        "No server error occurred — the sender clicked Cancel.",
        "Live upload speed (MB/s) and clear progress feedback are displayed so senders know their transfer is actively moving.",
      ],
      bottleneck: "user_paused",
      bottleneckLabel: "Canceled by user",
    };
  }

  // Completed uploads
  const isSmallFastFile = totalBytes < 10 * 1024 * 1024 && durationMs <= 3000;
  let grade: ExperienceGradeCode = "A";
  let gradeLabel = "Excellent (A)";
  let gradeColor: PlainEnglishTransferEvaluation["gradeColor"] = "emerald";

  if (retryCount === 0 && (effectiveMbps >= 45 || isSmallFastFile || durationMs <= 4500)) {
    grade = "A";
    gradeLabel = "Excellent (A)";
    gradeColor = "emerald";
  } else if (retryCount <= 2 && (effectiveMbps >= 15 || durationMs <= 15000)) {
    grade = "B";
    gradeLabel = "Good (B)";
    gradeColor = "blue";
  } else if (retryCount > 3) {
    grade = "D";
    gradeLabel = "Unstable Wi-Fi (D)";
    gradeColor = "orange";
  } else {
    grade = "C";
    gradeLabel = "Slow Internet Connection (C)";
    gradeColor = "amber";
  }

  let bottleneck: PlainEnglishTransferEvaluation["bottleneck"] = "none";
  let bottleneckLabel = "Smooth end-to-end transfer";
  const recommendations: string[] = [];

  if (retryCount > 0) {
    bottleneck = "network_instability";
    bottleneckLabel = `Sender Wi-Fi blinked (${retryCount} auto-healed ${retryCount === 1 ? "retry" : "retries"})`;
    recommendations.push(
      `The sender's internet connection blinked ${retryCount} time${retryCount === 1 ? "" : "s"}, but Gigasend automatically re-sent only the affected chunk so the upload finished without starting over.`,
    );
  }

  if (postUploadMs > 1800 && postUploadMs > transferMs * 0.35) {
    if (bottleneck === "none") {
      bottleneck = "server_finalize";
      bottleneckLabel = "Final link & email confirmation step";
    }
    recommendations.push(
      `Creating the final link and sending the email took ${formatFriendlyDuration(postUploadMs)}. Parallel file verification is active to keep this final step as brief as possible.`,
    );
  } else if (effectiveMbps < 15 && !isSmallFastFile && durationMs > 8000) {
    if (bottleneck === "none") {
      bottleneck = "client_internet";
      bottleneckLabel = "Sender's internet upload bandwidth";
    }
    recommendations.push(
      `Cloudflare's edge server responded immediately (${formatFriendlyDuration(initMs)} startup), so total time was limited by the sender's own internet upload speed (${effectiveMbps.toFixed(1)} Mbps${input.clientConnectionType ? ` on ${input.clientConnectionType.toUpperCase()}` : ""}). Moving closer to the Wi-Fi router or pausing background cloud backups will speed up large uploads.`,
    );
  }

  if (resumedSession) {
    recommendations.push(
      "Automatic crash recovery worked as designed: this transfer picked up right where a previous session left off without re-uploading completed chunks.",
    );
  }

  let recommendedTuning: AdaptiveSpeedTuning;
  if (retryCount >= 2 || (effectiveMbps > 0 && effectiveMbps < 15 && !isSmallFastFile)) {
    recommendedTuning = {
      profile: "stabilized_wifi",
      label: "Stabilized Wi-Fi Mode (4 Lanes • Smaller 8 MB Pieces)",
      concurrency: 4,
      chunkSizeMultiplier: 0.5,
      presignBatchSize: 24,
      plainExplanation:
        "Auto-Tuner switched this device to 4 focused upload lanes and smaller 8 MB pieces so future transfers finish faster without Wi-Fi congestion or re-uploads.",
    };
  } else if (retryCount === 0 && effectiveMbps >= 120) {
    recommendedTuning = {
      profile: "turbo_fiber",
      label: "Turbo Fiber Mode (12 Parallel Lanes • Larger Pieces)",
      concurrency: 12,
      chunkSizeMultiplier: 2,
      presignBatchSize: 64,
      plainExplanation:
        "Auto-Tuner unlocked 12 parallel upload lanes and larger piece sizes for this device to use 100% of its high-speed fiber connection on the next transfer.",
    };
  } else {
    recommendedTuning = {
      profile: "balanced_edge",
      label: "Balanced Edge Mode (8 Parallel Lanes)",
      concurrency: 8,
      chunkSizeMultiplier: 1,
      presignBatchSize: 32,
      plainExplanation:
        "Auto-Tuner kept 8 parallel upload lanes and adaptive piece sizing active for optimal speed and stability.",
    };
  }

  if (recommendations.length === 0) {
    recommendations.push(
      `Everything ran at peak speed with zero interruptions — ${recommendedTuning.plainExplanation}`,
    );
  } else {
    recommendations.push(recommendedTuning.plainExplanation);
  }

  const interruptionPhrase =
    retryCount === 0
      ? "with zero interruptions"
      : `and automatically healed ${retryCount} brief network hiccup${retryCount === 1 ? "" : "s"} without losing progress`;

  const story = `Uploaded ${fileNoun} (${sizeText}) in ${formatFriendlyDuration(durationMs)} at ${speedComparison} through ${edgeLocationLabel} ${interruptionPhrase}.`;

  return {
    grade,
    gradeLabel,
    gradeColor,
    headline:
      grade === "A"
        ? "Fast, effortless transfer"
        : grade === "B"
          ? "Smooth transfer completed"
          : "Completed despite slow or spotty sender connection",
    story,
    speedComparison,
    edgeLocationLabel,
    steps,
    stepSummaryLine: steps.map((s) => s.label).join(" · "),
    recommendations,
    recommendedTuning,
    bottleneck,
    bottleneckLabel,
  };
}

export async function ensureTransferTelemetryTable(db: AppD1Database): Promise<void> {
  if (tableEnsured) return;
  await db
    .prepare(
      `
      CREATE TABLE IF NOT EXISTS upload_telemetry (
        id TEXT PRIMARY KEY,
        share_id TEXT,
        user_id TEXT,
        is_guest INTEGER DEFAULT 1,
        direction TEXT NOT NULL DEFAULT 'upload',
        event TEXT NOT NULL,
        transfer_mode TEXT,
        delivery_mode TEXT,
        file_count INTEGER DEFAULT 1,
        total_bytes INTEGER DEFAULT 0,
        transferred_bytes INTEGER DEFAULT 0,
        part_size INTEGER,
        concurrency INTEGER,
        completed_parts INTEGER DEFAULT 0,
        retry_count INTEGER DEFAULT 0,
        pause_count INTEGER DEFAULT 0,
        resumed_session INTEGER DEFAULT 0,
        http_status INTEGER DEFAULT 200,
        duration_ms INTEGER DEFAULT 0,
        paused_ms INTEGER DEFAULT 0,
        init_ms INTEGER,
        transfer_ms INTEGER,
        finalize_ms INTEGER,
        share_creation_ms INTEGER,
        ttfb_ms INTEGER,
        average_mbps REAL DEFAULT 0,
        edge_colo TEXT,
        edge_city TEXT,
        edge_country TEXT,
        client_rtt_ms INTEGER,
        error_message TEXT,
        grade TEXT NOT NULL,
        grade_label TEXT NOT NULL,
        story TEXT NOT NULL,
        steps_json TEXT NOT NULL,
        recommendations_json TEXT NOT NULL,
        bottleneck TEXT NOT NULL,
        bottleneck_label TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
      `,
    )
    .run();
  tableEnsured = true;
}

function escapeEmailHtml(value = ""): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendTransferEvaluationEmail(
  runtimeEnv: Record<string, any> | undefined,
  input: EvaluateTransferInput,
  evaluation: PlainEnglishTransferEvaluation,
): Promise<void> {
  const emailBinding = runtimeEnv?.EMAIL;
  if (!emailBinding || typeof emailBinding.send !== "function") return;

  const direction = input.direction === "download" ? "download" : "upload";
  // Send email for every upload transfer (completed, failed, canceled) and every initial download_started
  const shouldEmail =
    direction === "upload" ||
    (direction === "download" && input.event === "download_started");

  if (!shouldEmail) return;

  const recipients = String(
    runtimeEnv?.ADMIN_EMAILS || "blainebressman@gmail.com,info@gigasend.us",
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (recipients.length === 0) return;

  const totalBytes = Math.max(0, Number(input.totalBytes || 0));
  const sizeText = formatBytes(totalBytes);
  const fileCount = Math.max(1, Number(input.fileCount || 1));
  const fileNoun = fileCount === 1 ? "1 file" : `${fileCount} files`;
  const directionLabel = direction === "download" ? "Download" : "Upload";
  const badgeEmoji =
    evaluation.grade === "A" || evaluation.grade === "B"
      ? direction === "download"
        ? "📥"
        : "✅"
      : evaluation.grade === "F"
        ? "⚠️"
        : "📊";

  const badgeBg =
    evaluation.gradeColor === "emerald"
      ? "#059669"
      : evaluation.gradeColor === "blue"
        ? "#2563eb"
        : evaluation.gradeColor === "amber" || evaluation.gradeColor === "orange"
          ? "#d97706"
          : "#dc2626";

  const subject = `${badgeEmoji} [Gigasend ${evaluation.gradeLabel}] ${directionLabel} Report • ${sizeText} (${evaluation.edgeLocationLabel})`;

  const stepsHtml = evaluation.steps
    .map(
      (step) => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0f172a; font-size: 13px; white-space: nowrap;">
          ${escapeEmailHtml(step.label)}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 13px;">
          ${escapeEmailHtml(step.plainExplanation)}
        </td>
      </tr>`,
    )
    .join("");

  const tuningHtml = evaluation.recommendedTuning
    ? `
    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px 16px; margin-bottom: 18px;">
      <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #166534; margin-bottom: 4px;">
        ⚡ Automatic Speed Tuner (Applied for Next Transfer)
      </div>
      <div style="font-size: 14px; font-weight: 700; color: #14532d; margin-bottom: 4px;">
        ${escapeEmailHtml(evaluation.recommendedTuning.label)}
      </div>
      <div style="font-size: 13px; color: #166534; line-height: 1.5;">
        ${escapeEmailHtml(evaluation.recommendedTuning.plainExplanation)}
      </div>
    </div>`
    : "";

  const recommendationsHtml = evaluation.recommendations
    .map(
      (rec) =>
        `<li style="margin-bottom: 6px; color: #334155; font-size: 13px; line-height: 1.5;">${escapeEmailHtml(rec)}</li>`,
    )
    .join("");

  const shareLinkHtml = input.shareId
    ? `<a href="${brand.siteUrl}/download/${encodeURIComponent(input.shareId)}" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 16px; border-radius: 8px; margin-right: 10px;">View Transfer Link &rarr;</a>`
    : "";

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeEmailHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);">
    <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 20px 24px; color: #ffffff;">
      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 700; margin-bottom: 6px;">
        Gigasend Live Transfer Experience Report
      </div>
      <div style="font-size: 20px; font-weight: 800; margin-bottom: 10px;">
        ${escapeEmailHtml(evaluation.headline)}
      </div>
      <span style="display: inline-block; background: ${badgeBg}; color: #ffffff; font-weight: 800; font-size: 12px; padding: 5px 12px; border-radius: 999px;">
        Grade: ${escapeEmailHtml(evaluation.gradeLabel)}
      </span>
      <span style="display: inline-block; background: rgba(255,255,255,0.12); color: #e2e8f0; font-weight: 600; font-size: 12px; padding: 5px 12px; border-radius: 999px; margin-left: 6px;">
        ${escapeEmailHtml(directionLabel)} • ${escapeEmailHtml(fileNoun)} (${escapeEmailHtml(sizeText)})
      </span>
    </div>

    <div style="padding: 24px;">
      <div style="background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 8px; padding: 14px 16px; margin-bottom: 18px;">
        <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">
          What Happened (In Plain English)
        </div>
        <div style="font-size: 15px; line-height: 1.55; color: #0f172a; font-weight: 600;">
          ${escapeEmailHtml(evaluation.story)}
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px; background: #f8fafc; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0;">
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 700;">Speed Summary</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a; font-weight: 700;">${escapeEmailHtml(evaluation.speedComparison)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 700;">Nearest Cloudflare Edge</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a; font-weight: 600;">${escapeEmailHtml(evaluation.edgeLocationLabel)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 14px; font-size: 12px; color: #64748b; font-weight: 700;">Primary Speed Factor</td>
          <td style="padding: 10px 14px; font-size: 13px; color: #0f172a; font-weight: 600;">${escapeEmailHtml(evaluation.bottleneckLabel)}</td>
        </tr>
      </table>

      <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #475569; margin-bottom: 8px;">
        Step-by-Step Time Breakdown
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        ${stepsHtml}
      </table>

      ${tuningHtml}

      <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #475569; margin-bottom: 8px;">
        Plain-English Takeaways
      </div>
      <ul style="margin: 0 0 20px 0; padding-left: 20px;">
        ${recommendationsHtml}
      </ul>

      <div style="padding-top: 14px; border-top: 1px solid #e2e8f0;">
        ${shareLinkHtml}
        <a href="${brand.siteUrl}/admin" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 16px; border-radius: 8px;">Open Admin Transfer Report &rarr;</a>
      </div>
    </div>
  </div>
</body>
</html>`;

  const text = [
    `Gigasend Live Transfer Experience Report`,
    `Grade: ${evaluation.gradeLabel}`,
    `Type: ${directionLabel} (${fileNoun}, ${sizeText})`,
    `Edge Location: ${evaluation.edgeLocationLabel}`,
    ``,
    `What Happened:`,
    evaluation.story,
    ``,
    `Step-by-Step Breakdown:`,
    ...evaluation.steps.map((s) => `- ${s.label} (${s.plainExplanation})`),
    ...(evaluation.recommendedTuning
      ? [
          ``,
          `Automatic Speed Tuner:`,
          `${evaluation.recommendedTuning.label} — ${evaluation.recommendedTuning.plainExplanation}`,
        ]
      : []),
    ``,
    `Takeaways:`,
    ...evaluation.recommendations.map((r) => `* ${r}`),
    ...(input.shareId ? [``, `Transfer Link: ${brand.siteUrl}/download/${input.shareId}`] : []),
    `Admin Report: ${brand.siteUrl}/admin`,
  ].join("\n");

  await sendEmailViaCloudflare(emailBinding, {
    to: recipients,
    subject,
    html,
    text,
  }).catch((err) => {
    console.warn("[transfer-evaluator] Failed to send transfer report email:", err);
  });
}

export async function recordTransferEvaluation(
  db: AppD1Database,
  input: EvaluateTransferInput,
  runtimeEnv?: Record<string, any>,
): Promise<{ id: string; evaluation: PlainEnglishTransferEvaluation }> {
  const evaluation = evaluateTransferExperience(input);
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await ensureTransferTelemetryTable(db);

  await db
    .prepare(
      `
      INSERT INTO upload_telemetry (
        id, share_id, user_id, is_guest, direction, event, transfer_mode, delivery_mode,
        file_count, total_bytes, transferred_bytes, part_size, concurrency, completed_parts,
        retry_count, pause_count, resumed_session, http_status, duration_ms, paused_ms,
        init_ms, transfer_ms, finalize_ms, share_creation_ms, ttfb_ms, average_mbps,
        edge_colo, edge_city, edge_country, client_rtt_ms, error_message,
        grade, grade_label, story, steps_json, recommendations_json, bottleneck, bottleneck_label, created_at
      ) VALUES (
        ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8,
        ?9, ?10, ?11, ?12, ?13, ?14,
        ?15, ?16, ?17, ?18, ?19, ?20,
        ?21, ?22, ?23, ?24, ?25, ?26,
        ?27, ?28, ?29, ?30, ?31,
        ?32, ?33, ?34, ?35, ?36, ?37, ?38, ?39
      )
      `,
    )
    .bind(
      id,
      input.shareId ?? null,
      input.userId ?? null,
      input.isGuest ? 1 : 0,
      input.direction === "download" ? "download" : "upload",
      input.event,
      input.transferMode ?? null,
      input.deliveryMode ?? null,
      Math.max(1, Number(input.fileCount || 1)),
      Math.max(0, Number(input.totalBytes || 0)),
      Math.max(0, Number(input.uploadedBytes ?? input.totalBytes ?? 0)),
      input.partSize != null ? Number(input.partSize) : null,
      input.concurrency != null ? Number(input.concurrency) : null,
      Math.max(0, Number(input.completedParts || 0)),
      Math.max(0, Number(input.retryCount || 0)),
      Math.max(0, Number(input.pauseCount || 0)),
      input.resumedFromSavedSession ? 1 : 0,
      Number(input.httpStatus || 200),
      Math.max(0, Number(input.durationMs || input.ttfbMs || 0)),
      Math.max(0, Number(input.pausedMs || 0)),
      input.initMs != null ? Number(input.initMs) : null,
      input.transferMs != null ? Number(input.transferMs) : null,
      input.finalizeMs != null ? Number(input.finalizeMs) : null,
      input.shareCreationMs != null ? Number(input.shareCreationMs) : null,
      input.ttfbMs != null ? Number(input.ttfbMs) : null,
      Number(input.averageMbps || 0),
      input.edgeColo ?? null,
      input.edgeCity ?? null,
      input.edgeCountry ?? null,
      input.clientRttMs != null ? Number(input.clientRttMs) : null,
      input.errorMessage ?? null,
      evaluation.grade,
      evaluation.gradeLabel,
      evaluation.story,
      JSON.stringify(evaluation.steps),
      JSON.stringify(evaluation.recommendations),
      evaluation.bottleneck,
      evaluation.bottleneckLabel,
      now,
    )
    .run();

  if (runtimeEnv) {
    await sendTransferEvaluationEmail(runtimeEnv, input, evaluation);
  }

  return { id, evaluation };
}

interface TelemetryRow {
  id: string;
  share_id: string | null;
  user_id: string | null;
  is_guest: number;
  direction: "upload" | "download";
  event: string;
  transfer_mode: string | null;
  delivery_mode: string | null;
  file_count: number;
  total_bytes: number;
  transferred_bytes: number;
  part_size: number | null;
  concurrency: number | null;
  completed_parts: number;
  retry_count: number;
  pause_count: number;
  resumed_session: number;
  http_status: number;
  duration_ms: number;
  paused_ms: number;
  init_ms: number | null;
  transfer_ms: number | null;
  finalize_ms: number | null;
  share_creation_ms: number | null;
  ttfb_ms: number | null;
  average_mbps: number;
  edge_colo: string | null;
  edge_city: string | null;
  edge_country: string | null;
  client_rtt_ms: number | null;
  error_message: string | null;
  grade: ExperienceGradeCode;
  grade_label: string;
  story: string;
  steps_json: string;
  recommendations_json: string;
  bottleneck: string;
  bottleneck_label: string;
  created_at: string;
}

export async function getTransferExperienceOverview(
  db: AppD1Database,
  options: { limit?: number; direction?: string } = {},
): Promise<TransferExperienceOverview> {
  await ensureTransferTelemetryTable(db);
  const limit = Math.min(100, Math.max(5, options.limit ?? 20));

  const { results: rows = [] } = await db
    .prepare(
      `
      SELECT *
      FROM upload_telemetry
      WHERE (?1 IS NULL OR direction = ?1)
      ORDER BY datetime(created_at) DESC
      LIMIT ?2
      `,
    )
    .bind(
      options.direction && options.direction !== "all" ? options.direction : null,
      limit,
    )
    .all<TelemetryRow>();

  const transfers: TransferExperienceRecord[] = rows.map((row) => {
    let steps: TransferStepBreakdownItem[] = [];
    let recommendations: string[] = [];
    try {
      steps = JSON.parse(row.steps_json || "[]");
    } catch {
      steps = [];
    }
    try {
      recommendations = JSON.parse(row.recommendations_json || "[]");
    } catch {
      recommendations = [];
    }

    return {
      id: row.id,
      shareId: row.share_id,
      direction: row.direction,
      event: row.event,
      transferMode: row.transfer_mode,
      deliveryMode: row.delivery_mode,
      fileCount: Number(row.file_count || 1),
      totalBytes: Number(row.total_bytes || 0),
      durationMs: Number(row.duration_ms || 0),
      averageMbps: Number(row.average_mbps || 0),
      retryCount: Number(row.retry_count || 0),
      httpStatus: Number(row.http_status || 200),
      edgeLocationLabel: resolveEdgeLocationLabel(row.edge_colo, row.edge_city, row.edge_country),
      grade: row.grade || "A",
      gradeLabel: row.grade_label || "Excellent (A)",
      story: row.story,
      stepSummaryLine: steps.map((s) => s.label).join(" · "),
      steps,
      recommendations,
      bottleneck: row.bottleneck,
      bottleneckLabel: row.bottleneck_label || "Smooth transfer",
      createdAt: row.created_at,
    };
  });

  const gradeDistribution: Record<ExperienceGradeCode, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };

  let completedUploads = 0;
  let totalUploadMbps = 0;
  let totalDownloads = 0;
  let totalDownloadTtfbMs = 0;
  let autoHealedRetries = 0;
  let interruptionFreeCount = 0;

  for (const item of transfers) {
    if (gradeDistribution[item.grade] !== undefined) {
      gradeDistribution[item.grade] += 1;
    }
    autoHealedRetries += item.retryCount;
    if (item.event !== "failed") {
      interruptionFreeCount += 1;
    }
    if (item.direction === "upload" && item.event === "completed") {
      completedUploads += 1;
      totalUploadMbps += item.averageMbps;
    } else if (item.direction === "download") {
      totalDownloads += 1;
      totalDownloadTtfbMs += item.durationMs;
    }
  }

  const avgUploadMbps = completedUploads > 0 ? Number((totalUploadMbps / completedUploads).toFixed(1)) : 0;
  const avgDownloadTtfbMs = totalDownloads > 0 ? Math.round(totalDownloadTtfbMs / totalDownloads) : 0;
  const successRatePercent = transfers.length > 0 ? Math.round((interruptionFreeCount / transfers.length) * 100) : 100;

  const overallGradeLabel =
    gradeDistribution.A + gradeDistribution.B >= Math.ceil(transfers.length * 0.7)
      ? "Excellent (A)"
      : successRatePercent >= 90
        ? "Good (B)"
        : "Needs Review (C)";

  const plainEnglishHeadline =
    transfers.length === 0
      ? "Transfer listener is active and ready to evaluate every new file upload and download in plain English."
      : `${successRatePercent}% of evaluated transfers succeeded smoothly${
          completedUploads > 0 ? ` at an average upload speed of ${avgUploadMbps} Mbps` : ""
        }${totalDownloads > 0 ? ` and an average download start time of ${formatFriendlyDuration(avgDownloadTtfbMs)}` : ""}.`;

  const topActionableInsights: string[] = [
    "Pre-signed edge batching is active: the first 100 file chunks are signed during upload startup with zero database lookups between chunks.",
    "Instant download start is active: sender notification emails run in the background so recipients never wait on email delivery before their download begins.",
    "Smart resumable downloads (HTTP 206) and live multi-file speed indicators protect non-technical clients on slower or spotty Wi-Fi connections.",
  ];

  return {
    overallGradeLabel,
    plainEnglishHeadline,
    totalEvaluated: transfers.length,
    completedUploads,
    totalDownloads,
    autoHealedRetries,
    successRatePercent,
    averageUploadMbps: avgUploadMbps,
    averageDownloadStartMs: avgDownloadTtfbMs,
    gradeDistribution,
    topActionableInsights,
    recentEvaluations: transfers,
  };
}
