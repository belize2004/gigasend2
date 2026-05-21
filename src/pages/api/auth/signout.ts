import type { APIRoute } from "astro";
import { clearAuthCookie, json } from "@/src/lib/api";
import { clearAdminSession } from "@/src/lib/admin";

export const POST: APIRoute = async ({ cookies }) => {
  clearAuthCookie(cookies);
  clearAdminSession(cookies);
  return json({ success: true, message: "SignOut successful" });
};
