import type { APIRoute } from "astro";
import { Resend } from "resend";
import { RESEND_API_KEY } from "@/lib/serverEnv";
import { json } from "@/src/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";
import { brand } from "@/lib/brand";

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

export const POST: APIRoute = async ({ request }) => {
  const body: ContactUsBody = await request.json();

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: brand.emailFrom,
    to: brand.contactEmail,
    subject: body.subject || `New ${brand.productName} contact inquiry`,
    html: createContactEmailTemplate(body),
  });

  if (error) {
    console.error("Resend API error:", error);
    captureMonitoringException(error, {
      user: { email: body.email },
      tags: { feature: "email", route: "contact", provider: "resend" },
      context: {
        subject: body.subject,
        hasCompany: Boolean(body.company),
      },
    });
    return json({ error: "Failed to send email" }, 500);
  }

  return json({ message: "Inquiry Sent" });
};
