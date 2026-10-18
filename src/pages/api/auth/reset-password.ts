import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { getAdminEmails, getJwtSecret } from "@/lib/serverEnv";
import { findUserById, getDb, updateUserPassword } from "@/lib/d1";
import { json, setAuthCookie } from "@/src/lib/api";
import { brand } from "@/lib/brand";
import { sendEmailViaCloudflare } from "@/lib/email";

interface ResetPasswordPayload {
  userId: string;
  email: string;
  scope: string;
}

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { token, password } = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

    if (!token || typeof token !== "string") {
      return json({ success: false, message: "This password reset link is invalid or has expired. Please request a new link." }, 400);
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return json({ success: false, message: "Password must be at least 8 characters long." }, 400);
    }

    const secretKey = getJwtSecret((locals as any)?.runtime?.env);
    const secret = new TextEncoder().encode(secretKey);

    let payload: ResetPasswordPayload;
    try {
      const verified = await jwtVerify<ResetPasswordPayload>(token, secret);
      payload = verified.payload;
    } catch {
      return json({ success: false, message: "This password reset link is invalid or has expired. Please request a new link." }, 400);
    }

    if (payload.scope !== "password_reset" || !payload.userId) {
      return json({ success: false, message: "This password reset link is invalid or has expired. Please request a new link." }, 400);
    }

    const db = getDb(locals);
    const user = await findUserById(db, payload.userId);
    if (!user) {
      return json({ success: false, message: "We couldn’t find an account for this reset link." }, 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUserPassword(db, user.id, hashedPassword);

    // Notify admin on successful password reset
    const runtimeEnv = (locals as any)?.runtime?.env;
    const emailBinding = runtimeEnv?.EMAIL;
    const adminRecipients = getAdminEmails(runtimeEnv);
    if (adminRecipients.length > 0) {
      await sendEmailViaCloudflare(emailBinding, {
        from: brand.emailFrom,
        to: adminRecipients,
        subject: `[Admin Alert] Password Reset Successfully Completed: ${user.email}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111827; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="color: #16a34a; margin-top: 0;">Password Reset Completed</h2>
            <p>The user has successfully set a new password and logged into their account.</p>
            <div style="background: #f9fafb; padding: 16px; border-radius: 6px; margin: 16px 0; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px;"><strong>User Email:</strong> ${user.email}</p>
              <p style="margin: 0 0 8px;"><strong>User Name:</strong> ${user.name || "N/A"}</p>
              <p style="margin: 0;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            </div>
          </div>
        `,
        text: `[Admin Alert] Password Reset Successfully Completed\n\nUser: ${user.email} (${user.name || "N/A"})\nTimestamp: ${new Date().toISOString()}`,
        headers: {
          "X-Entity-Ref-ID": `pwd-reset-success-${user.id}`,
        },
      }).catch((e) => console.warn("Admin reset notification failed:", e));
    }

    // Auto-login: Issue session cookie
    const sessionToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);
    setAuthCookie(cookies, sessionToken);

    return json({
      success: true,
      message: "Password updated. Redirecting you now…",
      data: { userId: user.id, email: user.email },
    });
  } catch (err: any) {
    console.error("Reset password error:", err);
    return json({ success: false, message: "Couldn’t update your password. Please try again." }, 500);
  }
};
