import type { APIRoute } from "astro";
import { getAdminEmails } from "@/lib/serverEnv";
import { createSuggestion, findUserById, getDb } from "@/lib/d1";
import { captureMonitoringException } from "@/lib/monitoring";
import { getAuthenticatedUserId, json } from "@/src/lib/api";
import { brand } from "@/lib/brand";
import { sendEmailViaCloudflare } from "@/lib/email";

const DEFAULT_SUGGESTION_RECIPIENT = "info@gigasend.us";
const MAX_SUGGESTION_LENGTH = 1500;

interface SuggestionBody {
  message?: string;
  pageUrl?: string;
}

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSuggestionRecipients(runtimeEnv?: Record<string, any>) {
  const recipients = getAdminEmails(runtimeEnv);
  return recipients.length > 0 ? recipients : [DEFAULT_SUGGESTION_RECIPIENT];
}

function createSuggestionEmailTemplate(input: {
  message: string;
  pageUrl?: string | null;
  userEmail?: string | null;
}) {
  return `
    <h1>New ${brand.productName} Suggestion</h1>
    <p><strong>From:</strong> ${escapeHtml(input.userEmail ?? "Anonymous visitor")}</p>
    <p><strong>Page:</strong> ${escapeHtml(input.pageUrl ?? "Unknown")}</p>
    <p><strong>Suggestion:</strong></p>
    <p>${escapeHtml(input.message).replaceAll("\n", "<br />")}</p>
  `;
}

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: SuggestionBody = {};

  try {
    const raw = await request.json().catch(() => ({}));
    body = (raw && typeof raw === "object" ? raw : {}) as SuggestionBody;
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return json({ success: false, message: "Please enter your feedback before submitting." }, 400);
    }

    if (message.length > MAX_SUGGESTION_LENGTH) {
      return json({ success: false, message: `Keep your feedback under ${MAX_SUGGESTION_LENGTH.toLocaleString()} characters.` }, 400);
    }

    const db = getDb(locals);
    userId = await getAuthenticatedUserId(cookies, locals).catch(() => null);
    const user = userId ? await findUserById(db, userId) : null;
    const userAgent = request.headers.get("user-agent");
    const pageUrl = body.pageUrl?.slice(0, 500) ?? null;

    const suggestion = await createSuggestion(db, {
      message,
      pageUrl,
      userAgent,
      userId,
    });

    const emailBinding = (locals as any)?.runtime?.env?.EMAIL;
    await sendEmailViaCloudflare(emailBinding, {
      from: brand.emailFrom,
      to: getSuggestionRecipients((locals as any)?.runtime?.env),
      replyTo: user?.email,
      subject: `New ${brand.productName} suggestion`,
      html: createSuggestionEmailTemplate({
        message,
        pageUrl,
        userEmail: user?.email,
      }),
      text: [
        `New ${brand.productName} Suggestion`,
        `From: ${user?.email ?? "Anonymous visitor"}`,
        `Page: ${pageUrl ?? "Unknown"}`,
        "",
        message,
      ].join("\n"),
      headers: {
        "X-Entity-Ref-ID": suggestion.id,
      },
    });

    return json({ success: true, message: "Thank you for your feedback." });
  } catch (error) {
    console.error("Suggestion submission failed:", error);
    captureMonitoringException(error, {
      user: { id: userId },
      tags: { feature: "suggestions", route: "suggestions" },
      context: {
        hasMessage: Boolean(body.message),
        pageUrl: body.pageUrl,
      },
    });
    return json({ success: false, message: "Couldn’t send your feedback. Please check your connection and try again." }, 500);
  }
};
