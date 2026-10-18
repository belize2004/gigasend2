import type { APIRoute } from "astro";
import { getDb } from "@/lib/d1";
import { json } from "@/src/lib/api";
import { getAuthenticatedAdmin } from "@/src/lib/admin";
import { getTransferExperienceOverview } from "@/src/lib/transferEvaluator";

export const GET: APIRoute = async ({ cookies, locals, url }) => {
  const db = getDb(locals);
  const isDev = import.meta.env.DEV;

  if (!isDev) {
    const auth = await getAuthenticatedAdmin(cookies, db, locals);
    if (auth.response) return auth.response;
  }

  try {
    const limit = Number(url.searchParams.get("limit") || 25);
    const direction = url.searchParams.get("direction") || "all";
    const report = await getTransferExperienceOverview(db, { limit, direction });
    return json({
      success: true,
      data: report,
      message: "Plain-English transfer experience report retrieved",
    });
  } catch (error) {
    console.error("[transfer-report] Error loading report:", error);
    return json({ success: false, message: "Failed to load transfer experience report" }, 500);
  }
};
