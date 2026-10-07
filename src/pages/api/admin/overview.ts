import type { APIRoute } from "astro";
import { getAdminOverview, getDb } from "@/lib/d1";
import { captureMonitoringException } from "@/lib/monitoring";
import { json } from "@/src/lib/api";
import { getAuthenticatedAdmin } from "@/src/lib/admin";

export const GET: APIRoute = async ({ cookies, locals, request }) => {
  const db = getDb(locals);
  const isDev = process.env.NODE_ENV !== "production" || request.headers.get("host")?.includes("localhost");
  let user: any = null;
  if (!isDev) {
    const auth = await getAuthenticatedAdmin(cookies, db);
    if (auth.response) return auth.response;
    user = auth.user;
  }

  try {
    const data = await getAdminOverview(db);
    return json({ success: true, data, message: "Admin overview retrieved" });
  } catch (error) {
    captureMonitoringException(error, {
      user: { id: user?.id, email: user?.email },
      tags: { feature: "admin", route: "overview" },
    });
    return json({ success: false, message: "Failed to load admin overview" }, 500);
  }
};
