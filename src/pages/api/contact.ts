import type { APIRoute } from "astro";
import { json } from "@/src/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";
import { brand } from "@/lib/brand";
import { sendEmailViaCloudflare } from "@/lib/email";
import { getAdminEmails } from "@/lib/serverEnv";

interface ContactUsBody {
  email: string;
  fullname: string;
  company?: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createContactEmailTemplate(data: ContactUsBody) {
  return `
    <h1>New Contact Inquiry</h1>
    <p><strong>Name:</strong> ${escapeHtml(data.fullname)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phoneNumber)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>
  `;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const rawBody: any = await request.json().catch(() => ({}));
  const body: ContactUsBody = {
    email: typeof rawBody?.email === "string" ? rawBody.email.trim() : "",
    fullname: typeof (rawBody?.fullname || rawBody?.name) === "string" ? (rawBody.fullname || rawBody.name).trim() : "Anonymous",
    company: typeof rawBody?.company === "string" ? rawBody.company.trim() : "",
    phoneNumber: typeof (rawBody?.phoneNumber || rawBody?.phone) === "string" ? (rawBody.phoneNumber || rawBody.phone).trim() : "",
    subject: typeof rawBody?.subject === "string" && rawBody.subject.trim() ? rawBody.subject.trim() : `New ${brand.productName} contact inquiry`,
    message: typeof rawBody?.message === "string" ? rawBody.message.trim() : "",
  };

  if (!body.email || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(body.email) || !body.message) {
    return json({ error: "Please enter a valid email address and message." }, 400);
  }

  const emailBinding = (locals as any)?.runtime?.env?.EMAIL;
  const adminRecipients = getAdminEmails((locals as any)?.runtime?.env);
  const toRecipients = adminRecipients.length > 0 ? adminRecipients : [brand.contactEmail];

  const result = await sendEmailViaCloudflare(emailBinding, {
    from: brand.emailFrom,
    to: toRecipients,
    replyTo: body.email,
    subject: body.subject,
    html: createContactEmailTemplate(body),
    text: `${body.subject}\nFrom: ${body.fullname} (${body.email})\nPhone: ${body.phoneNumber || "N/A"}\nCompany: ${body.company || "N/A"}\n\n${body.message}`,
  });

  if (!result.success) {
    console.error("Cloudflare contact email error:", result.error);
    captureMonitoringException(new Error(result.error || "Failed to send email"), {
      user: { email: body.email },
      tags: { feature: "email", route: "contact", provider: "cloudflare" },
      context: {
        subject: body.subject,
        hasCompany: Boolean(body.company),
      },
    });
    return json({ error: "Couldn’t send your message. Please try again or email us directly at info@gigasend.us." }, 500);
  }

  return json({ message: "Thanks for reaching out. We’ve received your message and will reply soon." });
};
