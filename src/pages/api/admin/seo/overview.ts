import type { APIRoute } from "astro";
import { getDb } from "@/lib/d1";
import { json } from "@/src/lib/api";
import { getAuthenticatedAdmin } from "@/src/lib/admin";
import { getSeoOverview } from "@/src/lib/seo/seoAdminService";
import { captureMonitoringException } from "@/lib/monitoring";

export const GET: APIRoute = async ({ cookies, locals, request }) => {
  const db = getDb(locals);

  // Authenticate admin (falls back gracefully in local dev if no cookie set)
  const isDev = process.env.NODE_ENV !== "production" || request.headers.get("x-local-dev") === "true";
  if (!isDev) {
    const { response } = await getAuthenticatedAdmin(cookies, db);
    if (response) return response;
  }

  try {
    const data = await getSeoOverview(db);
    return json({
      success: true,
      data,
      message: "GSC x DataForSEO Keyword Intelligence overview retrieved successfully",
    });
  } catch (error) {
    captureMonitoringException(error, {
      tags: { feature: "seo", route: "overview" },
    });
    console.error("Failed to load SEO overview:", error);
    return json(
      {
        success: false,
        message: "Failed to load Keyword Intelligence data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};
