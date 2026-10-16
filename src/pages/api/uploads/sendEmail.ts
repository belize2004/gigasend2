import type { APIRoute } from "astro";
import {
  generateEmailTemplate,
  generateEmailText,
  generateUploadConfirmationEmail,
  generateUploadConfirmationText,
  sendEmailViaCloudflare,
} from "@/lib/email";
import { createShare, findUserById, getDb } from "@/lib/d1";
import { stripe } from "@/lib/stripe";
import { getOrCreateUserSession } from "@/src/lib/guestSession";
import { json } from "@/src/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;

interface SendEmailBody {
  receiverEmail: string;
  senderEmail?: string;
  numberOfFiles: number;
  fileSize: number;
  message?: string;
  fileKeys: string[];
}

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: Partial<SendEmailBody> = {};

  try {
    const db = getDb(locals);
    const session = await getOrCreateUserSession(cookies, db);
    userId = session.userId;
    const user = session.user;

    body = await request.json() as SendEmailBody;
    const { receiverEmail, senderEmail, message, fileKeys, numberOfFiles, fileSize } = body;

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

    // Verify all files exist in R2 storage and verify actual byte count
    const bucket = (locals as any)?.runtime?.env?.FILES;
    let verifiedTotalSize = 0;
    if (bucket) {
      for (const key of cleanFileKeys) {
        const head = await bucket.head(key);
        if (!head) {
          return json({ error: `File not found in storage: ${key}. Please retry upload.` }, 400);
        }
        verifiedTotalSize += head.size;
      }
    }
    const effectiveFileSize = verifiedTotalSize > 0 ? verifiedTotalSize : fileSize;

    // Enforce guest transfer size limit (10 GB max)
    const MAX_GUEST_BYTES = 10 * 1024 * 1024 * 1024;
    if (session.isGuest && effectiveFileSize > MAX_GUEST_BYTES) {
      return json({ error: "Free guest transfers are limited to 10 GB. Please create an account or upgrade to send larger files." }, 413);
    }

    const isGuest = session.isGuest;
    const userEmail = !isGuest && user?.email ? user.email : null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validGuestReplyTo = isGuest && senderEmail && emailRegex.test(senderEmail) ? senderEmail : undefined;

    const effectiveReplyTo = userEmail || validGuestReplyTo || brand.contactEmail;
    const senderDisplayName = userEmail || (validGuestReplyTo ? `${validGuestReplyTo} (via ${brand.productName})` : `A guest visitor (via ${brand.productName})`);

    let isFreePlan = true;
    if (!session.isGuest && user.stripeCustomerId) {
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
      size: effectiveFileSize,
      expiresAt,
      fileKey: cleanFileKeys.length === 1 ? cleanFileKeys[0] : JSON.stringify(cleanFileKeys),
      numberOfFiles,
      getLink: (shareId) => `${SITE_URL.replace(/\/$/, "")}/download/${shareId}`,
    });

    const htmlContent = generateEmailTemplate({
      fileSize: effectiveFileSize,
      link: share.link,
      message,
      numberOfFiles,
      senderEmail: senderDisplayName,
    });
    const textContent = generateEmailText({
      fileSize: effectiveFileSize,
      link: share.link,
      message,
      numberOfFiles,
      senderEmail: senderDisplayName,
    });

    // Cloudflare email dispatch binding
    const emailBinding = (locals as any)?.runtime?.env?.EMAIL;

    const dispatchResult = await sendEmailViaCloudflare(emailBinding, {
      from: brand.emailFrom,
      to: receiverEmail,
      replyTo: effectiveReplyTo,
      subject: `${senderDisplayName} sent you files with ${brand.productName}`,
      html: htmlContent,
      text: textContent,
      headers: {
        "X-Entity-Ref-ID": share.id,
      },
    });

    // NEVER send unsolicited confirmation emails to unverified guest-entered emails
    // Only send confirmation to logged-in, authenticated accounts
    const targetConfirmationEmail = userEmail;

    if (!dispatchResult.success) {
      console.warn("[sendEmail] Cloudflare email dispatch notice:", dispatchResult.error);
      captureMonitoringException(new Error(dispatchResult.error || "Email delivery failed"), {
        user: { id: userId, email: userEmail || "guest" },
        tags: { feature: "email", route: "sendEmail", provider: "cloudflare" },
        context: {
          receiverDomain: receiverEmail.split("@")[1],
          numberOfFiles,
          fileSize: effectiveFileSize,
          shareId: share.id,
        },
      });

      // Still return the created share link so upload is never lost
      return json({
        success: true,
        emailSent: false,
        link: share.link,
        message: "Transfer created! (Direct email notification could not be delivered, please share the link manually).",
      });
    }

    if (targetConfirmationEmail) {
      await sendEmailViaCloudflare(emailBinding, {
        from: brand.emailFrom,
        to: targetConfirmationEmail,
        subject: `Your ${brand.productName} transfer is ready`,
        html: generateUploadConfirmationEmail({
          deliveryLabel: `Sent to ${receiverEmail}`,
          fileSize,
          link: share.link,
          numberOfFiles,
        }),
        text: generateUploadConfirmationText({
          deliveryLabel: `Sent to ${receiverEmail}`,
          fileSize,
          link: share.link,
          numberOfFiles,
        }),
        headers: {
          "X-Entity-Ref-ID": `${share.id}-sender-confirmation`,
        },
      });
    }

    return json({
      success: true,
      emailSent: true,
      link: share.link,
      message: "Download links sent to email",
    });
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
