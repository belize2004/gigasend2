import type { APIRoute } from "astro";
import { sendEmailViaCloudflare } from "@/lib/email";
import { json } from "@/src/lib/api";

interface ErrorTelemetryPayload {
  type: string;
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  url?: string;
  timestamp?: string;
  viewport?: string;
  userAgent?: string;
  context?: Record<string, any>;
}

// In-memory alert cooldown per isolate to prevent email flooding (10 minutes)
const alertCooldowns = new Map<string, number>();
const ALERT_COOLDOWN_MS = 10 * 60 * 1000;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env || {};

  try {
    const payload: ErrorTelemetryPayload = await request.json().catch(() => ({
      type: "unknown_parse_error",
      message: "Could not parse error JSON payload",
    }));

    const clientIp =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const cfRay = request.headers.get("cf-ray") || "unknown";
    const country = request.headers.get("cf-ipcountry") || "unknown";

    // Structured server log for Cloudflare realtime streaming / tail logs
    console.error("[WEBSITE_FAILURE_LISTENER]", JSON.stringify({
      ...payload,
      cfRay,
      clientIp,
      country,
      receivedAt: new Date().toISOString(),
    }));

    // Check if email alerts are configured
    const adminEmails = env.ADMIN_EMAILS || "blainebressman@gmail.com";
    const emailBinding = env.EMAIL;

    // Rate-limited email dispatch for significant errors
    const errorKey = `${payload.type}:${payload.message || ""}`;
    const now = Date.now();
    const lastAlert = alertCooldowns.get(errorKey);

    if ((!lastAlert || now - lastAlert > ALERT_COOLDOWN_MS) && adminEmails) {
      alertCooldowns.set(errorKey, now);

      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #e11d48; margin-top: 0;">🚨 GigaSend Website Failure Detected</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 120px;"><strong>Failure Type:</strong></td><td style="color: #0f172a;">${payload.type || "unknown"}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Page URL:</strong></td><td style="color: #0f172a;"><a href="${payload.url || "#"}">${payload.url || "N/A"}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>CF-Ray ID:</strong></td><td style="color: #0f172a; font-family: monospace;">${cfRay}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Location:</strong></td><td style="color: #0f172a;">${country} (${clientIp})</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Viewport:</strong></td><td style="color: #0f172a;">${payload.viewport || "N/A"}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;"><strong>Timestamp:</strong></td><td style="color: #0f172a;">${payload.timestamp || new Date().toISOString()}</td></tr>
          </table>
          <div style="background: #f8fafc; border-left: 4px solid #e11d48; padding: 12px; margin-bottom: 16px; border-radius: 4px;">
            <p style="margin: 0; font-weight: 600; color: #0f172a; font-size: 14px;">${payload.message || "No error message provided"}</p>
          </div>
          ${
            payload.stack
              ? `<pre style="background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 6px; font-size: 12px; overflow-x: auto; white-space: pre-wrap;">${payload.stack}</pre>`
              : ""
          }
          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
            Sent automatically by GigaSend Website Failure Listener. Cooldown: 10 minutes per unique signature.
          </p>
        </div>
      `;

      // Non-blocking dispatch
      sendEmailViaCloudflare(emailBinding, {
        to: adminEmails.split(",").map((e: string) => e.trim()),
        subject: `[FAILURE ALERT] ${payload.type}: ${String(payload.message || "").slice(0, 60)}`,
        html: emailHtml,
        text: `GigaSend Website Failure: ${payload.type} at ${payload.url || "N/A"}\nMessage: ${payload.message}\nStack: ${payload.stack || "N/A"}`,
      }).catch((err) => {
        console.warn("[TELEMETRY] Failed to dispatch failure email alert:", err);
      });
    }

    return json({ success: true, logged: true });
  } catch (error: any) {
    console.error("[TELEMETRY_ENDPOINT_ERROR]", error);
    return json({ success: false, message: error?.message || "Internal error" }, 500);
  }
};
