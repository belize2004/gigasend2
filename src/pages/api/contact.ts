import type { APIRoute } from "astro";
import { json } from "@/src/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";
import { brand } from "@/lib/brand";
import { sendEmailViaCloudflare } from "@/lib/email";

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
    email: rawBody.email || "",
    fullname: rawBody.fullname || rawBody.name || "Anonymous",
    company: rawBody.company || "",
    phoneNumber: rawBody.phoneNumber || rawBody.phone || "",
    subject: rawBody.subject || `New ${brand.productName} contact inquiry`,
    message: rawBody.message || "",
  };

  const emailBinding = (locals as any)?.runtime?.env?.EMAIL;
  const result = await sendEmailViaCloudflare(emailBinding, {
    from: brand.emailFrom,
    to: brand.contactEmail,
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
    return json({ error: "Failed to send email" }, 500);
  }

  return json({ message: "Inquiry Sent" });
};
