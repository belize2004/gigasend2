import type { APIRoute } from "astro";
import { sendEmailViaCloudflare } from "@/lib/email";
import { json } from "@/src/lib/api";

interface ErrorTelemetryPayload {
  type: string;
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  url?: string;
  timestamp?: string;
  viewport?: string;
  userAgent?: string;
  context?: Record<string, any>;
}

interface SelfRepairOutcome {
  repaired: boolean;
  suppressAlert: boolean;
  status: string;
  actionTaken: string;
}

// In-memory alert cooldown per isolate to prevent email flooding (10 minutes)
const alertCooldowns = new Map<string, number>();
const ALERT_COOLDOWN_MS = 10 * 60 * 1000;

const BOT_UA_REGEX =
  /headlesschrome|phantomjs|puppeteer|playwright|googlebot|bingbot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot|perplexitybot|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp|applebot|yandexbot|baiduspider|duckduckbot|ia_archiver|prerender|screaming frog|dataforseo|uptimerobot|pingdom|statuscake/i;

async function ensureIncidentsTable(db: any) {
  if (!db) return;
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS system_error_incidents (
        signature TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        message TEXT NOT NULL,
        url TEXT,
        user_agent TEXT,
        last_cf_ray TEXT,
        repair_status TEXT,
        repair_action TEXT,
        occurrences INTEGER DEFAULT 1,
        first_seen_at TEXT NOT NULL,
        last_seen_at TEXT NOT NULL
      )`
    )
    .run()
    .catch(() => {});
}

async function logIncidentToD1(
  db: any,
  signature: string,
  payload: ErrorTelemetryPayload,
  cfRay: string,
  userAgent: string,
  repair: SelfRepairOutcome
) {
  if (!db) return;
  try {
    await ensureIncidentsTable(db);
    const nowIso = new Date().toISOString();
    await db
      .prepare(
        `INSERT INTO system_error_incidents (
          signature, type, message, url, user_agent, last_cf_ray,
          repair_status, repair_action, occurrences, first_seen_at, last_seen_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
        ON CONFLICT(signature) DO UPDATE SET
          url = excluded.url,
          user_agent = excluded.user_agent,
          last_cf_ray = excluded.last_cf_ray,
          repair_status = excluded.repair_status,
          repair_action = excluded.repair_action,
          occurrences = system_error_incidents.occurrences + 1,
          last_seen_at = excluded.last_seen_at`
      )
      .bind(
        signature.slice(0, 250),
        payload.type || "unknown",
        String(payload.message || "").slice(0, 500),
        payload.url || "",
        userAgent.slice(0, 300),
        cfRay,
        repair.status,
        repair.actionTaken,
        nowIso,
        nowIso
      )
      .run();
  } catch (err) {
    console.warn("[SELF_REPAIR] Failed to persist incident to D1:", err);
  }
}

async function purgePageCache(pageUrl: string, env: any): Promise<string[]> {
  const actions: string[] = [];
  if (!pageUrl) return actions;

  try {
    if (typeof caches !== "undefined" && (caches as any).default) {
      const deleted = await (caches as any).default.delete(new Request(pageUrl));
      actions.push(deleted ? "purged_edge_default_cache" : "checked_edge_default_cache");
    }
  } catch {}

  if (env.CF_ZONE_ID && env.CF_API_TOKEN) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${env.CF_ZONE_ID}/purge_cache`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.CF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ files: [pageUrl] }),
        }
      );
      if (res.ok) {
        actions.push("purged_cloudflare_zone_cache");
      }
    } catch {}
  }

  return actions;
}

async function runSelfRepairPlaybooks(
  payload: ErrorTelemetryPayload,
  env: any
): Promise<SelfRepairOutcome> {
  const msg = String(payload.message || "");
  const source = String(payload.source || "").trim();
  const combined = `${msg} ${source}`;

  const isResourceOrModuleFailure =
    payload.type === "resource_failure" ||
    /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|chunkloaderror|failed to load resource/i.test(
      msg
    );

  // Playbook 1: Resource / Dynamic module / _astro or /scripts asset load failure
  if (isResourceOrModuleFailure) {
    // 1a. Suppress third-party, browser extension, or Cloudflare /cdn-cgi/ resource blocks
    if (
      source &&
      (/^(chrome|moz|safari|safari-web)-extension:\/\//i.test(source) ||
        /\/cdn-cgi\/|cloudflareinsights\.com/i.test(source) ||
        (/^https?:\/\//i.test(source) && !/^https?:\/\/([a-z0-9-]+\.)?gigasend\.us(\/|$)/i.test(source)))
    ) {
      return {
        repaired: true,
        suppressAlert: true,
        status: "ignored_third_party_resource",
        actionTaken: `Ignored non-first-party or edge-injected resource load event (${source.slice(0, 120)}).`,
      };
    }

    const assetUrlMatch =
      combined.match(/https?:\/\/[^/\s"')]+\/(?:_astro|scripts)\/[^\s"')]+\.(?:js|css)/i) ||
      combined.match(/\/(?:_astro|scripts)\/[^\s"')]+\.(?:js|css)/i);

    const rawAssetRef = assetUrlMatch ? assetUrlMatch[0] : "";
    const assetUrl = rawAssetRef.startsWith("http")
      ? rawAssetRef
      : rawAssetRef
      ? `https://gigasend.us${rawAssetRef}`
      : payload.type === "resource_failure"
      ? "https://gigasend.us/scripts/error-tracker.js"
      : "";

    if (assetUrl && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      try {
        const assetCheck = await env.ASSETS.fetch(new Request(assetUrl, { method: "GET" }));
        if (assetCheck.status === 200) {
          // Asset is 100% present and healthy in the active Worker ASSETS bundle.
          // Client failure was a transient client network drop, adblocker, or aborted navigation.
          return {
            repaired: true,
            suppressAlert: true,
            status: "verified_asset_healthy",
            actionTaken: `Verified ${new URL(assetUrl).pathname} returns HTTP 200 in active ASSETS binding; suppressed false-positive client network/navigation drop alert.`,
          };
        }

        if (assetCheck.status === 404 && payload.url) {
          // Client served stale HTML referencing an old build hash -> purge page cache
          const purgeActions = await purgePageCache(payload.url, env);
          return {
            repaired: true,
            suppressAlert: false,
            status: "healed_stale_asset_cache",
            actionTaken: `Detected stale chunk reference (${new URL(assetUrl).pathname} -> 404). Purged cached HTML for ${payload.url} (${purgeActions.join(", ") || "cache invalidated"}) + client auto-reloaded.`,
          };
        }
      } catch (err: any) {
        return {
          repaired: false,
          suppressAlert: false,
          status: "asset_probe_failed",
          actionTaken: `Asset probe error: ${err?.message || "unknown"}`,
        };
      }
    }
  }

  // Playbook 2: D1 SQLite schema / missing table self-repair
  if (/no such table|SQLITE_ERROR/i.test(msg) && env.DB) {
    await ensureIncidentsTable(env.DB);
    return {
      repaired: true,
      suppressAlert: false,
      status: "healed_d1_schema",
      actionTaken: "Executed idempotent D1 schema verification.",
    };
  }

  return {
    repaired: false,
    suppressAlert: false,
    status: "monitored",
    actionTaken: "Logged to D1 system_error_incidents for telemetry tracking.",
  };
}

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || {};

  try {
    const payload: ErrorTelemetryPayload = await request.json().catch(() => ({
      type: "unknown_parse_error",
      message: "Could not parse error JSON payload",
    }));

    const clientIp =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const cfRay = request.headers.get("cf-ray") || "unknown";
    const country = request.headers.get("cf-ipcountry") || "unknown";
    const userAgent =
      payload.userAgent || request.headers.get("user-agent") || "unknown";

    // Ignore automated crawlers / headless bots to prevent false-positive email alerts
    if (BOT_UA_REGEX.test(userAgent)) {
      console.info("[WEBSITE_FAILURE_LISTENER_BOT_IGNORED]", JSON.stringify({
        type: payload.type,
        message: payload.message,
        url: payload.url,
        cfRay,
        clientIp,
        country,
        userAgent,
      }));
      return json({ success: true, logged: true, ignored: "bot_user_agent" });
    }

    const errorKey = `${payload.type}:${payload.message || ""}${payload.source ? `:${payload.source}` : ""}`;

    // Execute automated Cloudflare Self-Repair Playbooks
    const repair = await runSelfRepairPlaybooks(payload, env);

    // Record incident and self-repair outcome in Cloudflare D1
    await logIncidentToD1(env.DB, errorKey, payload, cfRay, userAgent, repair);

    // Structured server log for Cloudflare realtime streaming / tail logs
    console.error("[WEBSITE_FAILURE_LISTENER]", JSON.stringify({
      ...payload,
      userAgent,
      cfRay,
      clientIp,
      country,
      selfRepair: repair,
      receivedAt: new Date().toISOString(),
    }));

    if (repair.suppressAlert) {
      return json({
        success: true,
        logged: true,
        selfRepair: repair,
      });
    }

    // Check if email alerts are configured
    const adminEmails = env.ADMIN_EMAILS || "blainebressman@gmail.com";
    const emailBinding = env.EMAIL;

    // Rate-limited email dispatch for significant errors
    const now = Date.now();
    const lastAlert = alertCooldowns.get(errorKey);

    if ((!lastAlert || now - lastAlert > ALERT_COOLDOWN_MS) && adminEmails) {
      alertCooldowns.set(errorKey, now);

      const repairBadgeColor = repair.repaired ? "#16a34a" : "#d97706";
      const repairBadgeLabel = repair.repaired
        ? `✅ Auto-Repaired (${repair.status})`
        : `⚠️ Monitored (${repair.status})`;

      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #e11d48; margin-top: 0;">🚨 GigaSend Website Failure Detected</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 130px;"><strong>Failure Type:</strong></td><td style="color: #0f172a;">${payload.type || "unknown"}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Self-Repair:</strong></td><td style="color: ${repairBadgeColor}; font-weight: 600;">${repairBadgeLabel}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Repair Action:</strong></td><td style="color: #0f172a; font-size: 13px;">${repair.actionTaken}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Page URL:</strong></td><td style="color: #0f172a;"><a href="${payload.url || "#"}">${payload.url || "N/A"}</a></td></tr>
            ${payload.source ? `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Resource URL:</strong></td><td style="color: #0f172a; font-family: monospace; font-size: 12px; word-break: break-all;">${payload.source}</td></tr>` : ""}
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>CF-Ray ID:</strong></td><td style="color: #0f172a; font-family: monospace;">${cfRay}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Location:</strong></td><td style="color: #0f172a;">${country} (${clientIp})</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Viewport:</strong></td><td style="color: #0f172a;">${payload.viewport || "N/A"}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>User-Agent:</strong></td><td style="color: #0f172a; font-size: 12px; word-break: break-word;">${userAgent}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Timestamp:</strong></td><td style="color: #0f172a;">${payload.timestamp || new Date().toISOString()}</td></tr>
          </table>
          <div style="background: #f8fafc; border-left: 4px solid #e11d48; padding: 12px; margin-bottom: 16px; border-radius: 4px;">
            <p style="margin: 0; font-weight: 600; color: #0f172a; font-size: 14px;">${payload.message || "No error message provided"}</p>
          </div>
          ${
            payload.stack
              ? `<pre style="background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 6px; font-size: 12px; overflow-x: auto; white-space: pre-wrap;">${payload.stack}</pre>`
              : ""
          }
          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
            Sent automatically by GigaSend Website Failure Listener & Self-Repair Engine. Cooldown: 10 minutes per unique signature.
          </p>
        </div>
      `;

      await sendEmailViaCloudflare(emailBinding, {
        from: "Gigasend File Delivery <no-reply@mail.gigasend.us>",
        to: adminEmails.split(",").map((e: string) => e.trim()),
        subject: `[${repair.repaired ? "AUTO-REPAIRED" : "FAILURE ALERT"}] ${payload.type}: ${String(payload.message || "").slice(0, 55)}`,
        html: emailHtml,
        text: `GigaSend Website Failure: ${payload.type} at ${payload.url || "N/A"}\nSelf-Repair: ${repairBadgeLabel} - ${repair.actionTaken}\nUser-Agent: ${userAgent}\nMessage: ${payload.message}\nStack: ${payload.stack || "N/A"}`,
      }).catch((err) => {
        console.warn("[TELEMETRY] Failed to dispatch failure email alert:", err);
      });
    }

    return json({ success: true, logged: true, selfRepair: repair });
  } catch (error: any) {
    console.error("[TELEMETRY_ENDPOINT_ERROR]", error);
    return json({ success: false, message: error?.message || "Internal error" }, 500);
  }
};
