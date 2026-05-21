import type { APIRoute } from "astro";
import { findUserById, getDb } from "@/lib/d1";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";

export const POST: APIRoute = async ({ cookies, locals }) => {
  const userId = await getAuthenticatedUserId(cookies);
  if (!userId) return unauthorized();

  const db = getDb(locals);
  const user = await findUserById(db, userId);
  if (!user) {
    return json({ success: false, message: "User not found" }, 404);
  }

  return json({
    success: true,
    message: "Authentication successful",
    data: { email: user.email, id: user.id },
  });
};
