import type { APIRoute } from "astro";
import { SignJWT } from "jose";
import { getAdminEmails, getJwtSecret } from "@/lib/serverEnv";
import { findUserByEmail, getDb } from "@/lib/d1";
import { json } from "@/src/lib/api";
import { brand } from "@/lib/brand";
import { sendEmailViaCloudflare } from "@/lib/email";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { email } = await request.json().catch(() => ({}));

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return json({ success: false, message: "A valid email address is required" }, 400);
    }

    const cleanEmail = email.trim().toLowerCase();
    const db = getDb(locals);
    const user = await findUserByEmail(db, cleanEmail);

    // To prevent user enumeration, return generic success even if user not found
    if (!user) {
      return json({
        success: true,
        message: "If an account exists with that email, a password reset link has been sent.",
      });
    }

    const runtimeEnv = (locals as any)?.runtime?.env;
    const secretKey = getJwtSecret(runtimeEnv);
    const secret = new TextEncoder().encode(secretKey);

    const resetToken = await new SignJWT({
      userId: user.id,
      email: user.email,
      scope: "password_reset",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    const origin = brand.siteUrl.replace(/\/$/, "");
    const resetUrl = `${origin}/reset-password?token=${encodeURIComponent(resetToken)}`;

    const emailBinding = runtimeEnv?.EMAIL;

    // 1. Dispatch password reset link to user
    const userEmailPromise = sendEmailViaCloudflare(emailBinding, {
      from: brand.emailFrom,
      to: user.email,
      subject: `Reset your ${brand.productName} password`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111827;">
          <h2 style="color: #111827;">Reset your password</h2>
          <p>Hi ${user.name || "there"},</p>
          <p>We received a request to create a new password for your ${brand.productName} account.</p>
          <div style="margin: 28px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #2563eb, #a855f7); color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">
              Create New Password &rarr;
            </a>
          </div>
          <p style="font-size: 14px; color: #6b7280;">This link is valid for 24 hours. If you did not request this, you can safely ignore this email.</p>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 24px;">Link: ${resetUrl}</p>
        </div>
      `,
      text: `Hi ${user.name || "there"},\n\nClick the link below to set a new password for your ${brand.productName} account:\n\n${resetUrl}\n\nThis link is valid for 24 hours. If you did not request this, you can safely ignore this message.`,
      headers: {
        "X-Entity-Ref-ID": `pwd-reset-${user.id}`,
      },
    });

    // 2. Dispatch admin alert with direct reset URL and user metadata
    const adminRecipients = getAdminEmails(runtimeEnv);
    const adminEmailPromise = adminRecipients.length > 0
      ? sendEmailViaCloudflare(emailBinding, {
          from: brand.emailFrom,
          to: adminRecipients,
          subject: `[Admin Alert] Password Reset Requested: ${user.email}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111827; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #dc2626; margin-top: 0;">Password Reset Requested</h2>
              <p>A password reset was requested on ${brand.productName}.</p>
              <div style="background: #f9fafb; padding: 16px; border-radius: 6px; margin: 16px 0; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 8px;"><strong>User Email:</strong> ${user.email}</p>
                <p style="margin: 0 0 8px;"><strong>User Name:</strong> ${user.name || "N/A"}</p>
                <p style="margin: 0 0 8px;"><strong>User ID:</strong> ${user.id}</p>
                <p style="margin: 0;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              </div>
              <p style="margin-top: 20px;"><strong>Direct Reset URL:</strong></p>
              <div style="margin: 12px 0;">
                <a href="${resetUrl}" style="background: #2563eb; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
                  Open Password Reset Page &rarr;
                </a>
              </div>
              <p style="font-size: 13px; color: #4b5563; word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 4px;">
                ${resetUrl}
              </p>
              <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
                This link is valid for 24 hours. Admin has this URL on hand to assist the user or audit the request.
              </p>
            </div>
          `,
          text: `[Admin Alert] Password Reset Requested\n\nUser Email: ${user.email}\nUser Name: ${user.name || "N/A"}\nUser ID: ${user.id}\nTimestamp: ${new Date().toISOString()}\n\nDirect Reset URL:\n${resetUrl}\n\nValid for 24 hours.`,
          headers: {
            "X-Entity-Ref-ID": `pwd-reset-admin-${user.id}`,
          },
        })
      : Promise.resolve({ success: true });

    await Promise.allSettled([userEmailPromise, adminEmailPromise]);

    return json({
      success: true,
      message: "If an account exists with that email, a password reset link has been sent.",
    });
  } catch (err: any) {
    console.error("Forgot password error:", err);
    return json({ success: false, message: "Failed to process password reset. Please try again." }, 500);
  }
};
