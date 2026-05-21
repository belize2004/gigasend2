import type { APIRoute } from "astro";
import { getDb } from "@/lib/d1";
import { captureMonitoringException } from "@/lib/monitoring";
import { createAdminSession } from "@/src/lib/admin";
import { json } from "@/src/lib/api";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const { password } = await request.json();
    if (!password) return json({ success: false, message: "Admin password is required" }, 400);

    const db = getDb(locals);
    const { response, user } = await createAdminSession(cookies, db, password);
    if (response) return response;

    return json({
      success: true,
      data: { email: user?.email },
      message: "Admin session unlocked",
    });
  } catch (error) {
    captureMonitoringException(error, {
      tags: { feature: "admin", route: "login" },
    });
    return json({ success: false, message: "Unable to unlock admin session" }, 500);
  }
};
