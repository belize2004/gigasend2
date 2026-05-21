import type { APIRoute } from "astro";
import { Resend } from "resend";
import { ADMIN_EMAILS, RESEND_API_KEY } from "@/lib/serverEnv";
import { createSuggestion, findUserById, getDb } from "@/lib/d1";
import { captureMonitoringException } from "@/lib/monitoring";
import { getAuthenticatedUserId, json } from "@/src/lib/api";
import { brand } from "@/lib/brand";

const DEFAULT_SUGGESTION_RECIPIENT = "Blaine@flowwebdesigner.com";
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

function getSuggestionRecipients() {
  const adminEmails = ADMIN_EMAILS
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  return adminEmails.length > 0 ? adminEmails : [DEFAULT_SUGGESTION_RECIPIENT];
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
    body = await request.json() as SuggestionBody;
    const message = body.message?.trim();

    if (!message) {
      return json({ success: false, message: "Suggestion is required" }, 400);
    }

    if (message.length > MAX_SUGGESTION_LENGTH) {
      return json({ success: false, message: `Suggestion must be ${MAX_SUGGESTION_LENGTH} characters or less` }, 400);
    }

    const db = getDb(locals);
    userId = await getAuthenticatedUserId(cookies).catch(() => null);
    const user = userId ? await findUserById(db, userId) : null;
    const userAgent = request.headers.get("user-agent");
    const pageUrl = body.pageUrl?.slice(0, 500) ?? null;

    const suggestion = await createSuggestion(db, {
      message,
      pageUrl,
      userAgent,
      userId,
    });

    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: brand.emailFrom,
      to: getSuggestionRecipients(),
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

    if (error) {
      console.error("Resend suggestion email error:", error);
      captureMonitoringException(error, {
        user: { id: userId, email: user?.email },
        tags: { feature: "suggestions", route: "suggestions", provider: "resend" },
        context: { suggestionId: suggestion.id, pageUrl },
      });
      return json({ success: false, message: "Suggestion saved, but email notification failed" }, 500);
    }

    return json({ success: true, message: "Suggestion sent" });
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
    return json({ success: false, message: "Failed to send suggestion" }, 500);
  }
};
