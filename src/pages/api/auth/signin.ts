import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { JWT_SECRET } from "@/lib/serverEnv";
import { findUserByEmail, getDb } from "@/lib/d1";
import { json, setAuthCookie } from "@/src/lib/api";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return json({ success: false, message: "Missing fields" }, 400);
  }

  const db = getDb(locals);

  const user = await findUserByEmail(db, email);
  if (!user) {
    return json({ success: false, message: "User not found" }, 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return json({ success: false, message: "Invalid credentials" }, 401);
  }

  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(JWT_SECRET));
  setAuthCookie(cookies, token);

  return json({
    success: true,
    data: { _id: user.id, email: user.email },
    message: "Login successful",
  });
};
