import type { APIRoute } from "astro";
import { sendEmailViaCloudflare } from "@/lib/email";
import { json } from "@/src/lib/api";
import { getAdminEmails } from "@/lib/serverEnv";

const ADMIN_SECRET = "gigasend_outreach_2026_dispatch";

interface OutreachRecipient {
  name: string;
  email: string;
}

const RECIPIENTS: OutreachRecipient[] = [
  { name: "Ermelinda", email: "vukajermelinda@gmail.com" },
  { name: "Antony", email: "antonymemos@gmail.com" },
  { name: "Jon", email: "jon.shehu100@gmail.com" },
];

function generateEmailHtml(name: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Gigasend</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; padding: 36px 28px; color: #1f2937;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #2563eb, #a855f7); color: #fff; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: 6px; font-weight: 900; font-size: 16px;">↑</span>
      <span style="font-weight: 800; font-size: 22px; color: #111827;">Gigasend</span>
    </div>
    
    <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 18px 0; line-height: 1.3;">
      Welcome to Gigasend — Your high-speed file transfer workspace is live
    </h1>
    
    <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
      Hi ${name},
    </p>
    
    <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
      Welcome to Gigasend!
    </p>
    
    <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 20px 0;">
      We recently completed a major upgrade to our file delivery pipeline across 335+ edge locations. If you experienced any friction right after registering, we appreciate your patience—the platform is now fully optimized and ready for your files.
    </p>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
      <p style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">
        What you can do with your account:
      </p>
      <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 14px; line-height: 1.6;">
        <li style="margin-bottom: 8px;"><strong>Deliver Large Files Quickly:</strong> Transfer multi-gigabyte videos, photos, archives, and project files with zero bandwidth throttling up to 25 GB.</li>
        <li style="margin-bottom: 8px;"><strong>Share Anywhere:</strong> Send download links straight to clients' inboxes or generate a secure direct link.</li>
        <li><strong>Manage Transfers:</strong> Track and organize your active transfers right from your <a href="https://gigasend.us/dashboard" style="color: #2563eb; text-decoration: none;">Dashboard</a>.</li>
      </ul>
    </div>
    
    <div style="margin: 28px 0; text-align: center;">
      <a href="https://gigasend.us/transfer" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #a855f7); color: #ffffff; padding: 14px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 15px;">
        Send Your First Transfer &rarr;
      </a>
    </div>
    
    <p style="font-size: 14px; line-height: 1.5; color: #6b7280; margin: 0 0 24px 0;">
      Have feedback or need assistance? Visit our <a href="https://gigasend.us/contact" style="color: #2563eb; text-decoration: none;">Contact Page</a> or reply directly to <a href="mailto:info@gigasend.us" style="color: #2563eb; text-decoration: none;">info@gigasend.us</a>.
    </p>
    
    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 24px; font-size: 13px; color: #9ca3af;">
      <p style="margin: 0;">The Gigasend Team &bull; <a href="https://gigasend.us" style="color: #6b7280; text-decoration: none;">gigasend.us</a></p>
    </div>
  </div>
</body>
</html>`;
}

function generateEmailText(name: string) {
  return `Hi ${name},

Welcome to Gigasend!

We recently completed a major upgrade to our file delivery pipeline across 335+ edge locations. If you experienced any friction right after registering, we appreciate your patience—the platform is now fully optimized and ready for your files.

What you can do with your account:
1. Deliver Large Files Quickly: Transfer multi-gigabyte videos, photos, archives, and project files with zero bandwidth throttling up to 25 GB.
2. Share Anywhere: Send download links straight to clients' inboxes or generate a secure direct link.
3. Manage Transfers: Track and organize your active transfers right from your Dashboard (https://gigasend.us/dashboard).

Send Your First Transfer:
https://gigasend.us/transfer

Have feedback or need assistance? Visit our Contact Page (https://gigasend.us/contact) or reply directly to info@gigasend.us.

Best regards,
The Gigasend Team
https://gigasend.us
`;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const authHeader = request.headers.get("x-admin-key");
  if (authHeader !== ADMIN_SECRET) {
    return json({ error: "Unauthorized" }, 401);
  }

  const body = await request.json().catch(() => ({}));
  const isDryRun = body.dryRun === true;
  const customRecipients: OutreachRecipient[] = Array.isArray(body.recipients) && body.recipients.length > 0
    ? body.recipients
    : RECIPIENTS;

  const emailBinding = (locals as any)?.runtime?.env?.EMAIL;

  const results: Array<{ email: string; success: boolean; error?: string }> = [];

  for (const recipient of customRecipients) {
    if (isDryRun) {
      results.push({ email: recipient.email, success: true, error: "DRY_RUN" });
      continue;
    }

    try {
      const dispatchResult = await sendEmailViaCloudflare(emailBinding, {
        from: "Gigasend <no-reply@mail.gigasend.us>",
        replyTo: "info@gigasend.us",
        to: recipient.email,
        subject: "Welcome to Gigasend — Your high-speed file transfer workspace is live",
        html: generateEmailHtml(recipient.name),
        text: generateEmailText(recipient.name),
        headers: {
          "X-Entity-Ref-ID": `welcome-v2-${recipient.email}`,
        },
      });

      results.push({
        email: recipient.email,
        success: dispatchResult.success,
        error: dispatchResult.error,
      });
    } catch (err: any) {
      results.push({
        email: recipient.email,
        success: false,
        error: err?.message || String(err),
      });
    }
  }

  if (!isDryRun && results.length > 0) {
    const adminRecipients = getAdminEmails((locals as any)?.runtime?.env);
    if (adminRecipients.length > 0) {
      const summaryList = results.map((r) => `<li>${r.email}: <strong>${r.success ? "Sent" : `Failed (${r.error})`}</strong></li>`).join("");
      sendEmailViaCloudflare(emailBinding, {
        from: "Gigasend <no-reply@mail.gigasend.us>",
        to: adminRecipients,
        subject: `[Admin Alert] Outreach Batch Dispatched (${results.filter(r => r.success).length}/${results.length} successful)`,
        html: `<h3>Outreach Batch Dispatch Summary</h3><ul>${summaryList}</ul><p>Timestamp: ${new Date().toISOString()}</p>`,
        text: `Outreach Batch Dispatch Summary:\n${results.map((r) => `${r.email}: ${r.success ? "Sent" : `Failed (${r.error})`}`).join("\n")}`,
      }).catch((e) => console.warn("Admin outreach notification error:", e));
    }
  }

  return json({
    success: results.every((r) => r.success),
    dryRun: isDryRun,
    results,
  });
};
