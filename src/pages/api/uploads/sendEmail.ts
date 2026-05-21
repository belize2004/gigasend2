import type { APIRoute } from "astro";
import { Resend } from "resend";
import { RESEND_API_KEY } from "@/lib/serverEnv";
import { generateEmailTemplate, generateEmailText } from "@/lib/email";
import { createShare, findUserById, getDb } from "@/lib/d1";
import { stripe } from "@/lib/stripe";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.gigasend.us";

interface SendEmailBody {
  receiverEmail: string;
  numberOfFiles: number;
  fileSize: number;
  message?: string;
  fileKeys: string[];
}

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: Partial<SendEmailBody> = {};

  try {
    userId = await getAuthenticatedUserId(cookies);
    if (!userId) return unauthorized();

    const db = getDb(locals);
    body = await request.json() as SendEmailBody;
    const { receiverEmail, message, fileKeys, numberOfFiles, fileSize } = body;

    if (
      !receiverEmail ||
      !fileKeys ||
      !Array.isArray(fileKeys) ||
      typeof numberOfFiles !== "number" ||
      typeof fileSize !== "number"
    ) {
      return json({ error: "Missing email, file metadata, or fileKeys" }, 400);
    }

    const cleanFileKeys = fileKeys.filter((fileKey) => typeof fileKey === "string" && fileKey.trim().length > 0);
    if (cleanFileKeys.length === 0) return json({ error: "Missing file key" }, 400);

    const user = await findUserById(db, userId);
    if (!user) return json({ error: "User not found" }, 404);

    let isFreePlan = true;
    if (user.stripeCustomerId) {
      const subscribedPlan = await stripe.subscriptions.list({
        status: "active",
        customer: user.stripeCustomerId,
        expand: ["data.items"],
      });
      isFreePlan = subscribedPlan.data.length === 0;
    }

    const expiryDays = isFreePlan ? 3 : 30;
    const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

    const share = await createShare(db, {
      userId,
      email: receiverEmail,
      size: fileSize,
      expiresAt,
      fileKey: cleanFileKeys.length === 1 ? cleanFileKeys[0] : JSON.stringify(cleanFileKeys),
      numberOfFiles,
      getLink: (shareId) => `${SITE_URL.replace(/\/$/, "")}/download/${shareId}`,
    });

    const htmlContent = generateEmailTemplate({
      fileSize,
      link: share.link,
      message,
      numberOfFiles,
      senderEmail: user.email,
    });
    const textContent = generateEmailText({
      fileSize,
      link: share.link,
      message,
      numberOfFiles,
      senderEmail: user.email,
    });

    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "GigaSend Transfers <no-reply@transfer.gigasend.us>",
      to: receiverEmail,
      replyTo: user.email,
      subject: `${user.email} sent you files with GigaSend`,
      html: htmlContent,
      text: textContent,
      headers: {
        "X-Entity-Ref-ID": share.id,
      },
    });

    if (error) {
      console.error("Resend API error:", error);
      captureMonitoringException(error, {
        user: { id: userId, email: user.email },
        tags: { feature: "email", route: "sendEmail", provider: "resend" },
        context: {
          receiverDomain: receiverEmail.split("@")[1],
          numberOfFiles,
          fileSize,
          shareId: share.id,
        },
      });
      return json({ error: "Failed to send email" }, 500);
    }

    return json({ message: "Download links sent to email" });
  } catch (error) {
    console.error("Error sending email:", error);
    captureMonitoringException(error, {
      user: { id: userId },
      tags: { feature: "email", route: "sendEmail" },
      context: {
        receiverDomain: body.receiverEmail?.split("@")[1],
        numberOfFiles: body.numberOfFiles,
        fileSize: body.fileSize,
        hasFileKeys: Boolean(body.fileKeys?.length),
      },
    });
    return json({ error: "Failed to send download links email" }, 500);
  }
};
