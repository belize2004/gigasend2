import type { APIRoute } from "astro";
import { findUserById, getDb } from "@/lib/d1";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";

export const POST: APIRoute = async ({ cookies, locals }) => {
  const userId = await getAuthenticatedUserId(cookies, locals);
  if (!userId) {
    return json({ success: false, message: "Not authenticated", data: null }, 200);
  }

  const db = getDb(locals);
  const user = await findUserById(db, userId);
  if (!user) {
    return json({ success: false, message: "User not found", data: null }, 200);
  }

  return json({
    success: true,
    message: "Authentication successful",
    data: { email: user.email, id: user.id },
  });
};
