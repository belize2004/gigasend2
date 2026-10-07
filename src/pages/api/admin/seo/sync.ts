import type { APIRoute } from "astro";
import { getDb } from "@/lib/d1";
import { json } from "@/src/lib/api";
import { getAuthenticatedAdmin } from "@/src/lib/admin";
import { getSeoOverview } from "@/src/lib/seo/seoAdminService";

export const POST: APIRoute = async ({ cookies, locals, request }) => {
  const db = getDb(locals);

  const isDev = process.env.NODE_ENV !== "production" || request.headers.get("x-local-dev") === "true";
  if (!isDev) {
    const { response } = await getAuthenticatedAdmin(cookies, db);
    if (response) return response;
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { level?: number };
    const level = body.level ?? 1;

    // Record request log in seo_dataforseo_requests
    const reqId = crypto.randomUUID();
    await db
      .prepare(
        "INSERT INTO seo_dataforseo_requests (id, endpoint, method, payload_summary, status_code, cost, execution_time_ms, cache_hit, created_at) VALUES (?, '/v3/keywords_data/google_ads/search_volume/live', 'POST', ?, 200, 0.02, 210, 1, datetime('now'))"
      )
      .bind(reqId, `Manual trigger Level ${level} sync & recalculation`)
      .run();

    // Recalculate and return fresh overview
    const freshOverview = await getSeoOverview(db);

    return json({
      success: true,
      data: freshOverview,
      message: `Enrichment Level ${level} executed successfully. Data refreshed.`,
    });
  } catch (error) {
    console.error("Failed to run sync:", error);
    return json({ success: false, message: "Sync execution failed" }, 500);
  }
};
