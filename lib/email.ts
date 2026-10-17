import { formatBytes } from "./utils";
import { brand } from "./brand";

function escapeHtml(value = "") {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export function generateEmailTemplate({
    senderEmail,
    numberOfFiles,
    link,
    message,
    fileSize
}: {
    senderEmail: string;
    numberOfFiles: number;
    link: string;
    message?: string;
    fileSize: number
}) {
    const safeSenderEmail = escapeHtml(senderEmail);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    return `
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Files Shared via ${brand.productName}</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
              color: #333333;
          }
          .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
              background-color: #f8f8f8;
              text-align: center;
              padding: 20px;
              border-bottom: 1px solid #eeeeee;
          }
          .logo {
              width: 180px;
              height: auto;
          }
          .email-content {
              padding: 30px;
          }
          .email-footer {
              background-color: #f8f8f8;
              text-align: center;
              padding: 15px;
              font-size: 12px;
              color: #777777;
              border-top: 1px solid #eeeeee;
          }
          h1 {
              color: #333333;
              font-size: 22px;
              margin-top: 0;
              font-weight: 600;
          }
          .sender-info {
              background-color: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
              border-left: 4px solid #0d6efd;
          }
          .file-count {
              font-weight: 600;
              margin-bottom: 20px;
              color: #333333;
          }
          .files-container {
              margin-bottom: 25px;
          }
          .file-item {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              padding: 12px 20px;
              background-color: #f8f9fa;
              border-radius: 8px;
              transition: all 0.2s ease;
          }
          .file-item:hover {
              background-color: #f1f3f5;
          }
          .file-icon {
              margin-right: 15px;
              color: #0d6efd;
          }
          .file-size {
              font-size: 14px;
              color: #777777;
              margin-right: auto;
          }
          .download-button {
              background-color: #0d6efd;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 6px;
              font-weight: 600;
              cursor: pointer;
              text-decoration: none;
              font-size: 14px;
              transition: background-color 0.2s ease;
              white-space: nowrap;
          }
          .download-button:hover {
              background-color: #0b5ed7;
          }
          .expiry-notice {
              font-size: 13px;
              background-color: #fff8e6;
              padding: 12px;
              border-radius: 8px;
              border-left: 4px solid #ffc107;
              margin-top: 25px;
          }
          .message-section {
              margin-top: 20px;
          }
          .message-section h4 {
              margin-bottom: 10px;
              color: #333333;
          }
          @media only screen and (max-width: 620px) {
              .email-container {
                  width: 100%;
                  border-radius: 0;
              }
              .email-content {
                  padding: 20px;
              }
              .file-item {
                  flex-wrap: wrap;
                  gap: 10px;
              }
              .file-size {
                  margin-right: 0;
                  flex-basis: 100%;
                  margin-left: 35px;
                  margin-top: -5px;
              }
              .download-button {
                  margin-left: auto;
                  margin-top: 10px;
              }
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              ${brand.logoUrl
            ? `<img src="${brand.logoUrl}" alt="${brand.productName}" class="logo">`
            : `<strong style="font-size:24px;color:#111827;">${brand.productName}</strong>`}
          </div>
          
          <div class="email-content">
              <h1>Files Shared with You</h1>
              
              <div class="sender-info">
                  <strong>From:</strong> ${safeSenderEmail}
              </div>
              
              <div class="file-count">
                  <span>${numberOfFiles} files shared</span>
              </div>
              
              <div class="files-container">
                  <div class="file-item">
                      <div class="file-icon">
                          <img src="https://res.cloudinary.com/dj3vgnj0u/image/upload/v1747313102/yfhlce4k1h0qkjfph3xk.png" alt="file" />
                      </div>
                      <div class="file-size">${formatBytes(fileSize)}</div>
                      <a href="${link}" class="download-button" style="color:white;" target="_blank">Download</a>
                  </div>
              </div>
              
              ${message ?
            `<div class="message-section">
                        <h4>Message</h4>
                        <p>${safeMessage}</p>
                    </div>`:
            ''
        }
              
              <div class="expiry-notice">
                  <strong>Note:</strong> These download links will expire in 3 days. Please download your files before then.
              </div>
          </div>
          
          <div class="email-footer">
              <p>${brand.footerText}</p>
              <p>&copy; 2026 ${brand.name}. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  
  `
}

export function generateEmailText({
    senderEmail,
    numberOfFiles,
    link,
    message,
    fileSize
}: {
    senderEmail: string;
    numberOfFiles: number;
    link: string;
    message?: string;
    fileSize: number;
}) {
    return [
        `${senderEmail} sent you ${numberOfFiles} file${numberOfFiles === 1 ? "" : "s"} with ${brand.productName}.`,
        `Size: ${formatBytes(fileSize)}`,
        "",
        "Download:",
        link,
        message ? "" : undefined,
        message ? "Message:" : undefined,
        message || undefined,
        "",
        "This download link expires in 3 days.",
        brand.footerText,
    ].filter((line): line is string => line !== undefined).join("\n");
}

export function generateUploadConfirmationEmail({
    deliveryLabel,
    fileSize,
    link,
    numberOfFiles,
}: {
    deliveryLabel: string;
    fileSize: number;
    link: string;
    numberOfFiles: number;
}) {
    const safeDeliveryLabel = escapeHtml(deliveryLabel);

    return `
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your ${brand.productName} transfer is ready</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fb;color:#1f2937;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="padding:24px 28px;border-bottom:1px solid #eef2f7;background:#f8fafc;">
              <h1 style="margin:0;font-size:22px;color:#111827;">Your transfer is ready</h1>
          </div>
          <div style="padding:28px;">
              <p style="margin:0 0 18px;line-height:1.6;">${brand.productName} finished creating your transfer.</p>
              <div style="background:#f8fafc;border-left:4px solid #2563eb;border-radius:8px;padding:16px;margin-bottom:22px;">
                  <p style="margin:0 0 8px;"><strong>Delivery:</strong> ${safeDeliveryLabel}</p>
                  <p style="margin:0 0 8px;"><strong>Files:</strong> ${numberOfFiles}</p>
                  <p style="margin:0;"><strong>Size:</strong> ${formatBytes(fileSize)}</p>
              </div>
              <p style="margin:0 0 22px;line-height:1.6;">You can use the transfer link below to verify or share it.</p>
              <a href="${link}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:700;border-radius:8px;padding:12px 18px;">Open transfer</a>
          </div>
          <div style="padding:16px 28px;border-top:1px solid #eef2f7;background:#f8fafc;font-size:12px;color:#64748b;">
              ${brand.footerText}
          </div>
      </div>
  </body>
  </html>
  `;
}

export function generateUploadConfirmationText({
    deliveryLabel,
    fileSize,
    link,
    numberOfFiles,
}: {
    deliveryLabel: string;
    fileSize: number;
    link: string;
    numberOfFiles: number;
}) {
    return [
        `Your ${brand.productName} transfer is ready.`,
        `Delivery: ${deliveryLabel}`,
        `Files: ${numberOfFiles}`,
        `Size: ${formatBytes(fileSize)}`,
        "",
        "Transfer link:",
        link,
        "",
        brand.footerText,
    ].join("\n");
}

export function generateDownloadNotificationEmail({
    deliveryLabel,
    fileSize,
    link,
    numberOfFiles,
}: {
    deliveryLabel: string;
    fileSize: number;
    link: string;
    numberOfFiles: number;
}) {
    const safeDeliveryLabel = escapeHtml(deliveryLabel);

    return `
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your ${brand.productName} transfer was downloaded</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fb;color:#1f2937;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="padding:24px 28px;border-bottom:1px solid #eef2f7;background:#f8fafc;">
              <h1 style="margin:0;font-size:22px;color:#111827;">Your transfer was downloaded</h1>
          </div>
          <div style="padding:28px;">
              <p style="margin:0 0 18px;line-height:1.6;">Someone opened the download for your ${brand.productName} transfer.</p>
              <div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:8px;padding:16px;margin-bottom:22px;">
                  <p style="margin:0 0 8px;"><strong>Delivery:</strong> ${safeDeliveryLabel}</p>
                  <p style="margin:0 0 8px;"><strong>Files:</strong> ${numberOfFiles}</p>
                  <p style="margin:0;"><strong>Size:</strong> ${formatBytes(fileSize)}</p>
              </div>
              <p style="margin:0 0 22px;line-height:1.6;">This notification is sent once per transfer.</p>
              <a href="${link}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:700;border-radius:8px;padding:12px 18px;">Open transfer</a>
          </div>
          <div style="padding:16px 28px;border-top:1px solid #eef2f7;background:#f8fafc;font-size:12px;color:#64748b;">
              ${brand.footerText}
          </div>
      </div>
  </body>
  </html>
  `;
}

export function generateDownloadNotificationText({
    deliveryLabel,
    fileSize,
    link,
    numberOfFiles,
}: {
    deliveryLabel: string;
    fileSize: number;
    link: string;
    numberOfFiles: number;
}) {
    return [
        `Your ${brand.productName} transfer was downloaded.`,
        `Delivery: ${deliveryLabel}`,
        `Files: ${numberOfFiles}`,
        `Size: ${formatBytes(fileSize)}`,
        "",
        "Transfer link:",
        link,
        "",
        "This notification is sent once per transfer.",
        brand.footerText,
    ].join("\n");
}

export interface EmailAddress {
    email: string;
    name?: string;
}

export function parseEmailAddress(input?: string | EmailAddress | null): EmailAddress | null {
    if (!input) return null;
    if (typeof input === "object" && input.email) {
        return {
            email: input.email.trim(),
            name: input.name?.trim() || undefined,
        };
    }
    if (typeof input !== "string") return null;
    const str = input.trim();
    if (!str) return null;
    const match = str.match(/^(?:([^<]+)<)?([^<>@]+@[^<>@]+)>?$/);
    if (match) {
        const name = match[1]?.trim().replace(/^["']|["']$/g, "") || undefined;
        const email = match[2]?.trim();
        if (email) {
            return { email, name };
        }
    }
    return { email: str };
}

const ALLOWED_STANDARD_HEADERS = new Set([
    "in-reply-to",
    "references",
    "thread-index",
    "thread-topic",
    "list-unsubscribe",
    "list-unsubscribe-post",
    "auto-submitted",
    "feedback-id",
]);

const FORBIDDEN_HEADER_NAMES = new Set([
    "from",
    "to",
    "cc",
    "bcc",
    "subject",
    "reply-to",
    "date",
    "message-id",
    "return-path",
    "received",
    "dkim-signature",
    "require-recipient-valid-since",
    "expires",
    "reply-by",
    "archived-at",
]);

function sanitizeEmailHeaders(headers?: Record<string, string>): {
    cleanHeaders: Record<string, string>;
    extractedReplyTo?: string;
} {
    const cleanHeaders: Record<string, string> = {};
    let extractedReplyTo: string | undefined;

    if (!headers || typeof headers !== "object") {
        return { cleanHeaders };
    }

    for (const [rawKey, rawValue] of Object.entries(headers)) {
        if (!rawKey || !rawValue) continue;
        const keyLower = rawKey.trim().toLowerCase();
        const valueTrimmed = String(rawValue).trim();

        if (keyLower === "reply-to") {
            extractedReplyTo = valueTrimmed;
            continue;
        }

        if (FORBIDDEN_HEADER_NAMES.has(keyLower)) {
            continue;
        }

        // X-* custom headers: max name 100 chars, value max 2048 bytes
        if (/^x-[a-z0-9_-]+$/i.test(rawKey.trim()) && rawKey.trim().length <= 100) {
            cleanHeaders[rawKey.trim()] = valueTrimmed.slice(0, 2048);
            continue;
        }

        // Allowlisted standard RFC headers
        if (ALLOWED_STANDARD_HEADERS.has(keyLower)) {
            cleanHeaders[rawKey.trim()] = valueTrimmed.slice(0, 2048);
        }
    }

    return { cleanHeaders, extractedReplyTo };
}

function extractRecipientEmails(to: string | string[] | EmailAddress | EmailAddress[]): string[] {
    const list = Array.isArray(to) ? to : [to];
    const results: string[] = [];

    for (const item of list) {
        if (!item) continue;
        if (typeof item === "string") {
            const split = item.split(",").map((s) => s.trim()).filter(Boolean);
            for (const piece of split) {
                const parsed = parseEmailAddress(piece);
                if (parsed?.email && parsed.email.includes("@")) {
                    results.push(parsed.email);
                }
            }
        } else if (typeof item === "object" && item.email && item.email.includes("@")) {
            results.push(item.email.trim());
        }
    }

    return Array.from(new Set(results));
}

export interface SendCloudflareEmailOptions {
    to: string | string[] | EmailAddress | EmailAddress[];
    subject: string;
    html: string;
    text?: string;
    from?: string | EmailAddress;
    replyTo?: string | EmailAddress;
    headers?: Record<string, string>;
}

export interface SendCloudflareEmailResult {
    success: boolean;
    error?: string;
}

/**
 * Dispatches email natively using Cloudflare's Worker send_email binding (env.EMAIL).
 * Hardened to strictly comply with Cloudflare native email restrictions:
 * - Proper `from` and `replyTo` formatting (RFC 5322 EmailAddress / string)
 * - Strict header allowlisting (X-* custom headers and approved standard headers only)
 * - Safe handling of multiple recipients and input cleansing
 * - Seamless fallback to MailChannels transactional API if native send_email is unavailable or fails
 * - Never throws uncaught exceptions so calling routes can handle status gracefully.
 */
export async function sendEmailViaCloudflare(
    emailBinding: any,
    options: SendCloudflareEmailOptions
): Promise<SendCloudflareEmailResult> {
    const toRecipients = extractRecipientEmails(options.to);
    if (toRecipients.length === 0) {
        console.warn("[CF_EMAIL] Send aborted: No valid recipient address provided.");
        return { success: false, error: "No valid recipient email address provided." };
    }

    const { cleanHeaders, extractedReplyTo } = sanitizeEmailHeaders(options.headers);

    const parsedFrom = parseEmailAddress(options.from || brand.emailFrom) || {
        email: "no-reply@mail.gigasend.us",
        name: brand.productName,
    };
    const nativeFrom = parsedFrom.name
        ? { email: parsedFrom.email, name: parsedFrom.name }
        : parsedFrom.email;

    const parsedReplyTo = parseEmailAddress(options.replyTo || extractedReplyTo);
    const nativeReplyTo = parsedReplyTo?.name
        ? { email: parsedReplyTo.email, name: parsedReplyTo.name }
        : parsedReplyTo?.email;

    const failedRecipients: string[] = [];

    // 1. Primary Dispatch: Cloudflare Native Workers send_email Binding
    if (emailBinding && typeof emailBinding.send === "function") {
        for (const recipient of toRecipients) {
            const messagePayload: any = {
                from: nativeFrom,
                to: recipient,
                subject: options.subject,
                html: options.html,
                text: options.text || options.subject,
            };

            if (nativeReplyTo) {
                messagePayload.replyTo = nativeReplyTo;
            }

            if (Object.keys(cleanHeaders).length > 0) {
                messagePayload.headers = cleanHeaders;
            }

            try {
                const res = await emailBinding.send(messagePayload);
                console.log(
                    `[CF_EMAIL] Native send_email dispatched successfully to ${recipient}`,
                    res?.messageId ? `(id: ${res.messageId})` : ""
                );
            } catch (err: any) {
                // If Cloudflare engine rejected object-shaped `from`, retry with raw email address string
                if (typeof messagePayload.from === "object" && messagePayload.from?.email) {
                    try {
                        messagePayload.from = messagePayload.from.email;
                        if (typeof messagePayload.replyTo === "object" && messagePayload.replyTo?.email) {
                            messagePayload.replyTo = messagePayload.replyTo.email;
                        }
                        const retryRes = await emailBinding.send(messagePayload);
                        console.log(
                            `[CF_EMAIL] Native send_email fallback dispatched successfully to ${recipient}`,
                            retryRes?.messageId ? `(id: ${retryRes.messageId})` : ""
                        );
                        continue;
                    } catch (retryErr: any) {
                        console.warn(
                            `[CF_EMAIL] Native send_email failed for ${recipient}:`,
                            retryErr?.code || err?.code,
                            retryErr?.message || err?.message
                        );
                    }
                } else {
                    console.warn(`[CF_EMAIL] Native send_email failed for ${recipient}:`, err?.code, err?.message || err);
                }

                failedRecipients.push(recipient);
            }
        }

        if (failedRecipients.length === 0) {
            return { success: true };
        }
        console.warn(
            `[CF_EMAIL] ${failedRecipients.length} recipient(s) failed Cloudflare native delivery; attempting MailChannels fallback...`
        );
    } else {
        // Native binding not present (e.g. running in test or unconfigured local preview)
        failedRecipients.push(...toRecipients);
    }

    // 2. Secondary Dispatch: MailChannels Transactional API Fallback
    try {
        for (const recipient of failedRecipients) {
            const mcRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    personalizations: [{ to: [{ email: recipient }] }],
                    from: {
                        email: parsedFrom.email,
                        name: parsedFrom.name || brand.productName,
                    },
                    reply_to: parsedReplyTo
                        ? { email: parsedReplyTo.email, name: parsedReplyTo.name }
                        : undefined,
                    subject: options.subject,
                    content: [
                        { type: "text/plain", value: options.text || options.subject },
                        { type: "text/html", value: options.html },
                    ],
                    headers: Object.keys(cleanHeaders).length > 0 ? cleanHeaders : undefined,
                }),
            });

            if (!mcRes.ok && mcRes.status !== 202) {
                const errText = await mcRes.text().catch(() => "");
                console.warn(`[EMAIL] MailChannels HTTP ${mcRes.status}: ${errText}`);
                return { success: false, error: `Delivery failed (HTTP ${mcRes.status}): ${errText}` };
            } else {
                console.log(`[EMAIL] Dispatched email via MailChannels fallback to ${recipient}`);
            }
        }
        return { success: true };
    } catch (mcErr: any) {
        console.warn("[EMAIL] MailChannels fallback failed:", mcErr?.message || mcErr);
        return { success: false, error: mcErr?.message || String(mcErr) };
    }
}
