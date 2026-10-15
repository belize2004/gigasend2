import type { APIRoute } from "astro";
import { sendEmailViaCloudflare } from "@/lib/email";
import { json } from "@/src/lib/api";

const ADMIN_SECRET = "gigasend_outreach_2026_dispatch";

interface OutreachRecipient {
  name: string;
  email: string;
}

const RECIPIENTS: OutreachRecipient[] = [
  { name: "Vukajermelinda", email: "vukajermelinda@gmail.com" },
  { name: "Antony", email: "antonymemos@gmail.com" },
  { name: "Jon", email: "jon.shehu100@gmail.com" },
];

function generateEmailHtml(name: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quick update on your Gigasend account</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; padding: 36px 28px; color: #1f2937;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #2563eb, #a855f7); color: #fff; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: 6px; font-weight: 900; font-size: 16px;">↑</span>
      <span style="font-weight: 800; font-size: 22px; color: #111827;">Gigasend</span>
    </div>
    
    <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 18px 0; line-height: 1.3;">
      Quick update on your Gigasend account — file transfers are ready
    </h1>
    
    <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
      Hi ${name},
    </p>
    
    <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
      Thank you for signing up for Gigasend!
    </p>
    
    <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 24px 0;">
      You might have encountered an empty screen or an upload error right after signing up—we were in the middle of completing a major infrastructure upgrade to our edge delivery network. That issue is now 100% resolved, fully tested, and transfers are active.
    </p>
    
    <div style="margin: 28px 0; text-align: center;">
      <a href="https://gigasend.us/transfer" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #a855f7); color: #ffffff; padding: 14px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 15px;">
        Start a Transfer on Gigasend &rarr;
      </a>
    </div>
    
    <p style="font-size: 14px; line-height: 1.5; color: #6b7280; margin: 0 0 24px 0;">
      If you have any questions, feedback, or need help with a large file delivery, feel free to reply directly to this email (<a href="mailto:info@gigasend.us" style="color: #2563eb; text-decoration: none;">info@gigasend.us</a>).
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

Thank you for signing up for Gigasend!

You might have encountered an empty screen or an upload error right after signing up—we were in the middle of completing a major infrastructure upgrade to our edge delivery network. That issue is now 100% resolved, fully tested, and transfers are active.

You can jump straight in to send your files here:
https://gigasend.us/transfer

If you have any questions, feedback, or need help with a large file delivery, feel free to reply directly to this email (info@gigasend.us).

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
        subject: "Quick update on your Gigasend account — file transfers are ready",
        html: generateEmailHtml(recipient.name),
        text: generateEmailText(recipient.name),
        headers: {
          "X-Entity-Ref-ID": `outreach-welcome-${recipient.email}`,
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

  return json({
    success: results.every((r) => r.success),
    dryRun: isDryRun,
    results,
  });
};
