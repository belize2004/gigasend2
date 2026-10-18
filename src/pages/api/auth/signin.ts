import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { getJwtSecret } from "@/lib/serverEnv";
import { findUserByEmail, getDb } from "@/lib/d1";
import { json, setAuthCookie } from "@/src/lib/api";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return json({ success: false, message: "Invalid JSON body" }, 400);
    }
    const { email, password } = body as Record<string, unknown>;

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return json({ success: false, message: "Missing fields" }, 400);
    }

    const db = getDb(locals);

    const user = await findUserByEmail(db, email);
    if (!user) {
      return json({ success: false, message: "Invalid email or password" }, 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return json({ success: false, message: "Invalid email or password" }, 401);
    }

    const secretKey = getJwtSecret((locals as any)?.runtime?.env);
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secretKey));
    setAuthCookie(cookies, token);

    return json({
      success: true,
      data: { _id: user.id, email: user.email },
      message: "Login successful",
    });
  } catch (err: any) {
    console.error("Sign-in error:", err);
    return json({ success: false, message: "Failed to sign in. Please try again." }, 500);
  }
};
