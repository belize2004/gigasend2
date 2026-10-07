import type { APIRoute } from "astro";
import { getDb } from "@/lib/d1";
import { json } from "@/src/lib/api";
import { getAuthenticatedAdmin } from "@/src/lib/admin";

export const GET: APIRoute = async ({ cookies, locals }) => {
  const db = getDb(locals);

  const isDev = !import.meta.env.PROD;
  if (!isDev) {
    const { response } = await getAuthenticatedAdmin(cookies, db);
    if (response) return response;
  }

  try {
    const { results = [] } = await db
      .prepare("SELECT key, value, updated_at FROM seo_config")
      .all<{ key: string; value: string; updated_at: string }>();

    const configMap: Record<string, string> = {};
    for (const r of results) {
      configMap[r.key] = r.value;
    }

    return json({
      success: true,
      data: {
        config: configMap,
        hasEnvLogin: Boolean(process.env.DATAFORSEO_LOGIN),
        hasEnvPassword: Boolean(process.env.DATAFORSEO_PASSWORD),
      },
      message: "SEO configuration loaded",
    });
  } catch (error) {
    return json({ success: false, message: "Failed to load config" }, 500);
  }
};

export const POST: APIRoute = async ({ cookies, locals, request }) => {
  const db = getDb(locals);

  const isDev = !import.meta.env.PROD;
  if (!isDev) {
    const { response } = await getAuthenticatedAdmin(cookies, db);
    if (response) return response;
  }

  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, string>;

    for (const [key, val] of Object.entries(body)) {
      if (typeof val === "string") {
        await db
          .prepare(
            "INSERT INTO seo_config (key, value, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')"
          )
          .bind(key, val)
          .run();
      }
    }

    return json({ success: true, message: "SEO configuration updated successfully" });
  } catch (error) {
    return json({ success: false, message: "Failed to update configuration" }, 500);
  }
};
