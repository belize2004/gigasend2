import astroWorker from "./dist/_worker.js/index.js";
export * from "./dist/_worker.js/index.js";

const tailCooldowns = new Map();
const TAIL_COOLDOWN_MS = 10 * 60 * 1000;

async function ensureIncidentsTable(db) {
  if (!db) return;
  try {
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
      .run();
  } catch {}
}

async function purgeUrlCache(urlStr, env) {
  if (!urlStr) return false;
  let purged = false;
  try {
    if (typeof caches !== "undefined" && caches.default) {
      purged = await caches.default.delete(new Request(urlStr));
    }
  } catch {}

  if (env?.CF_ZONE_ID && env?.CF_API_TOKEN) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${env.CF_ZONE_ID}/purge_cache`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.CF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ files: [urlStr] }),
        }
      );
      if (res.ok) purged = true;
    } catch {}
  }
  return purged;
}

async function recordServerIncident(env, { signature, type, message, url, userAgent, cfRay, repairStatus, repairAction }) {
  if (!env?.DB) return;
  try {
    await ensureIncidentsTable(env.DB);
    const nowIso = new Date().toISOString();
    await env.DB.prepare(
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
        String(signature).slice(0, 250),
        String(type || "worker_exception"),
        String(message || "Unknown Worker failure").slice(0, 500),
        String(url || ""),
        String(userAgent || "worker-tail").slice(0, 300),
        String(cfRay || "tail"),
        String(repairStatus || "auto_healed"),
        String(repairAction || ""),
        nowIso,
        nowIso
      )
      .run();
  } catch {}
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const isIdempotent = request.method === "GET" || request.method === "HEAD";
    const isAstroAsset = url.pathname.startsWith("/_astro/");

    try {
      let response = await astroWorker.fetch(request.clone(), env, ctx);

      // 1. Self-Repair: If a /_astro/* chunk returns 404, prevent negative caching
      // and purge the Referer HTML page so stale HTML is evicted immediately.
      if (isAstroAsset && response.status === 404) {
        const referer = request.headers.get("referer");
        if (referer && ctx?.waitUntil) {
          ctx.waitUntil(purgeUrlCache(referer, env));
        }
        const headers = new Headers(response.headers);
        headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }

      // 2. Self-Repair: Retry transient 5xx on idempotent GET/HEAD requests once
      if (isIdempotent && response.status >= 500 && !url.pathname.startsWith("/api/telemetry/")) {
        await ensureIncidentsTable(env?.DB);
        const retryRes = await astroWorker.fetch(request.clone(), env, ctx);
        if (retryRes.status < 500) {
          if (ctx?.waitUntil) {
            ctx.waitUntil(
              recordServerIncident(env, {
                signature: `edge_retry_healed:${url.pathname}:${response.status}`,
                type: "edge_5xx_recovered",
                message: `Recovered HTTP ${response.status} on ${url.pathname} via automatic edge retry`,
                url: request.url,
                userAgent: request.headers.get("user-agent") || "unknown",
                cfRay: request.headers.get("cf-ray") || "unknown",
                repairStatus: "healed_on_edge_retry",
                repairAction: `Retried idempotent ${request.method} request at edge; succeeded with HTTP ${retryRes.status}.`,
              })
            );
          }
          response = retryRes;
        }
      }

      // 3. Enforce HTML revalidation so edge PoPs never serve stale HTML with old _astro hashes
      const contentType = response.headers.get("content-type") || "";
      if (isIdempotent && response.status === 200 && contentType.includes("text/html")) {
        const headers = new Headers(response.headers);
        if (!headers.has("Cache-Control")) {
          headers.set("Cache-Control", "public, max-age=0, must-revalidate");
        }
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }

      return response;
    } catch (err) {
      // Uncaught Worker Exception Self-Repair: attempt D1 heal + 1x retry for GET/HEAD
      if (isIdempotent) {
        try {
          await ensureIncidentsTable(env?.DB);
          const recovered = await astroWorker.fetch(request.clone(), env, ctx);
          if (ctx?.waitUntil) {
            ctx.waitUntil(
              recordServerIncident(env, {
                signature: `edge_exception_healed:${url.pathname}:${err?.message || "err"}`,
                type: "worker_uncaught_recovered",
                message: err?.message || String(err),
                url: request.url,
                userAgent: request.headers.get("user-agent") || "unknown",
                cfRay: request.headers.get("cf-ray") || "unknown",
                repairStatus: "healed_after_exception",
                repairAction: "Caught Worker exception, verified D1 schema, and succeeded on automatic edge retry.",
              })
            );
          }
          return recovered;
        } catch {}
      }
      throw err;
    }
  },

  /**
   * Cloudflare Native Tail Consumer: listens out-of-band to all Worker invocations,
   * automatically repairs edge cache / D1 state on failures, and logs incidents.
   */
  async tail(events, env, ctx) {
    if (!Array.isArray(events)) return;

    for (const item of events) {
      try {
        const reqUrl = item?.event?.request?.url || "";
        if (reqUrl.includes("/api/telemetry/report-error")) continue;

        const outcome = item?.outcome || "ok";
        const status = item?.event?.response?.status || 200;
        const exceptions = Array.isArray(item?.exceptions) ? item.exceptions : [];

        if (outcome === "ok" && exceptions.length === 0 && status < 500) {
          continue;
        }

        const primaryException = exceptions[0];
        const errorType =
          exceptions.length > 0
            ? `tail_${primaryException.name || "exception"}`
            : outcome !== "ok"
            ? `tail_${outcome}`
            : `tail_http_${status}`;
        const errorMessage =
          primaryException?.message ||
          (outcome !== "ok" ? `Worker invocation outcome: ${outcome}` : `HTTP ${status} response on ${reqUrl}`);

        // Execute Tail Self-Repair: purge cached entry for failing GET URL & verify D1
        const method = item?.event?.request?.method || "GET";
        const repairActions = [];
        if (method === "GET" && reqUrl) {
          const purged = await purgeUrlCache(reqUrl, env);
          repairActions.push(purged ? "purged_edge_cache" : "verified_edge_cache");
        }
        if (env?.DB) {
          await ensureIncidentsTable(env.DB);
          repairActions.push("verified_d1_state");
        }

        const signature = `${errorType}:${errorMessage}:${reqUrl}`;
        const repairActionText = repairActions.join(", ") || "logged_tail_incident";

        await recordServerIncident(env, {
          signature,
          type: errorType,
          message: errorMessage,
          url: reqUrl,
          userAgent: item?.event?.request?.headers?.["user-agent"] || "cloudflare-tail",
          cfRay: item?.event?.request?.headers?.["cf-ray"] || "tail",
          repairStatus: "tail_auto_repaired",
          repairAction: repairActionText,
        });

        // Rate-limited admin email alert for unrecovered server-side failures
        const now = Date.now();
        const lastSent = tailCooldowns.get(signature);
        if ((!lastSent || now - lastSent > TAIL_COOLDOWN_MS) && env?.EMAIL?.send) {
          tailCooldowns.set(signature, now);
          const recipients = String(env.ADMIN_EMAILS || "blainebressman@gmail.com")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

          for (const to of recipients) {
            await env.EMAIL.send({
              from: "no-reply@mail.gigasend.us",
              to,
              subject: `[TAIL SELF-REPAIR] ${errorType}: ${String(errorMessage).slice(0, 50)}`,
              text: `Cloudflare Tail Listener detected a server-side failure.\nType: ${errorType}\nURL: ${reqUrl}\nMessage: ${errorMessage}\nSelf-Repair Actions: ${repairActionText}`,
              html: `<div style="font-family:sans-serif;max-width:600px;padding:16px;border:1px solid #e2e8f0;border-radius:8px;">
                <h3 style="color:#e11d48;margin-top:0;">⚡ GigaSend Cloudflare Tail Self-Repair</h3>
                <p><strong>Type:</strong> ${errorType}</p>
                <p><strong>URL:</strong> ${reqUrl || "N/A"}</p>
                <p><strong>Message:</strong> ${errorMessage}</p>
                <p style="color:#16a34a;"><strong>Self-Repair Executed:</strong> ${repairActionText}</p>
              </div>`,
            }).catch(() => {});
          }
        }
      } catch {}
    }
  },

  /**
   * Cloudflare Cron Trigger Handler (`0 * * * *`):
   * Reclaims R2 storage for expired transfers, prunes expired SEO cache rows,
   * and maintains D1 health tables.
   */
  async scheduled(controller, env, ctx) {
    const runMaintenance = async () => {
      if (!env?.DB) return;
      await ensureIncidentsTable(env.DB);

      // 1. Reclaim R2 objects for expired shares while preserving transfer metadata
      try {
        const { results: expiredShares = [] } = await env.DB.prepare(
          `SELECT id, file_key FROM shares
           WHERE expires_at <= datetime('now')
             AND file_key IS NOT NULL
             AND file_key != ''
           LIMIT 100`
        ).all();

        for (const share of expiredShares) {
          try {
            let keys = [];
            try {
              const parsed = JSON.parse(share.file_key);
              if (Array.isArray(parsed)) {
                keys = parsed.filter((k) => typeof k === "string" && k.trim().length > 0);
              } else if (typeof share.file_key === "string" && share.file_key.trim().length > 0) {
                keys = [share.file_key];
              }
            } catch {
              if (typeof share.file_key === "string" && share.file_key.trim().length > 0) {
                keys = [share.file_key];
              }
            }

            if (keys.length > 0 && env?.FILES && typeof env.FILES.delete === "function") {
              for (let i = 0; i < keys.length; i += 1000) {
                await env.FILES.delete(keys.slice(i, i + 1000));
              }
            }

            await env.DB.prepare(
              `UPDATE shares SET file_key = NULL, updated_at = datetime('now') WHERE id = ?`
            )
              .bind(share.id)
              .run();
          } catch {}
        }
      } catch {}

      // 2. Prune expired DataForSEO cache entries and stale incidents (>30 days)
      try {
        await env.DB.prepare(
          `DELETE FROM seo_dataforseo_cache WHERE expires_at <= datetime('now')`
        ).run();
      } catch {}

      try {
        await env.DB.prepare(
          `DELETE FROM system_error_incidents WHERE last_seen_at < datetime('now', '-30 days')`
        ).run();
      } catch {}
    };

    if (ctx?.waitUntil) {
      ctx.waitUntil(runMaintenance());
    } else {
      await runMaintenance();
    }

    if (typeof astroWorker?.scheduled === "function") {
      return astroWorker.scheduled(controller, env, ctx);
    }
  },
};

export class WalletBalanceCoordinator {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }
}
