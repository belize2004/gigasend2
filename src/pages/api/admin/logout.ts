import type { APIRoute } from "astro";
import { clearAdminSession } from "@/src/lib/admin";
import { json } from "@/src/lib/api";

export const POST: APIRoute = async ({ cookies }) => {
  clearAdminSession(cookies);
  return json({ success: true, message: "Admin session locked" });
};
