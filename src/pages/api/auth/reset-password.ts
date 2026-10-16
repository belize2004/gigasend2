import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { getJwtSecret } from "@/lib/serverEnv";
import { findUserById, getDb, updateUserPassword } from "@/lib/d1";
import { json, setAuthCookie } from "@/src/lib/api";

interface ResetPasswordPayload {
  userId: string;
  email: string;
  scope: string;
}

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const { token, password } = await request.json();

    if (!token || typeof token !== "string") {
      return json({ success: false, message: "Valid reset token is required" }, 400);
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return json({ success: false, message: "Password must be at least 8 characters" }, 400);
    }

    const secretKey = getJwtSecret((locals as any)?.runtime?.env);
    const secret = new TextEncoder().encode(secretKey);

    let payload: ResetPasswordPayload;
    try {
      const verified = await jwtVerify<ResetPasswordPayload>(token, secret);
      payload = verified.payload;
    } catch {
      return json({ success: false, message: "Invalid or expired reset link. Please request a new one." }, 400);
    }

    if (payload.scope !== "password_reset" || !payload.userId) {
      return json({ success: false, message: "Invalid reset token scope" }, 400);
    }

    const db = getDb(locals);
    const user = await findUserById(db, payload.userId);
    if (!user) {
      return json({ success: false, message: "User account not found" }, 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUserPassword(db, user.id, hashedPassword);

    // Auto-login: Issue session cookie
    const sessionToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);
    setAuthCookie(cookies, sessionToken);

    return json({
      success: true,
      message: "Password updated successfully! Redirecting...",
      data: { userId: user.id, email: user.email },
    });
  } catch (err: any) {
    console.error("Reset password error:", err);
    return json({ success: false, message: "Failed to reset password. Please try again." }, 500);
  }
};
