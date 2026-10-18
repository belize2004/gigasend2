import type { APIRoute } from "astro";
import { createShare, findUserById, getDb } from "@/lib/d1";
import {
  generateUploadConfirmationEmail,
  generateUploadConfirmationText,
  sendEmailViaCloudflare,
} from "@/lib/email";
import { stripe } from "@/lib/stripe";
import { getVipGrantForUser } from "@/lib/storageLimit";
import { captureMonitoringException } from "@/lib/monitoring";
import { getOrCreateUserSession } from "@/src/lib/guestSession";
import { json } from "@/src/lib/api";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const LINK_ONLY_SHARE_EMAIL = "__share_link__";

interface CreateLinkBody {
  numberOfFiles: number;
  fileSize: number;
  fileKeys: string[];
  senderEmail?: string;
}

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: Partial<CreateLinkBody> = {};

  try {
    const db = getDb(locals);
    const session = await getOrCreateUserSession(cookies, db, locals);
    userId = session.userId;
    const user = session.user;

    const rawBody = await request.json().catch(() => null);
    if (!rawBody || typeof rawBody !== "object") {
      return json({ error: "Invalid JSON body" }, 400);
    }
    body = rawBody as CreateLinkBody;
    const { fileKeys, numberOfFiles, fileSize } = body;

    if (
      !fileKeys ||
      !Array.isArray(fileKeys) ||
      typeof numberOfFiles !== "number" ||
      !Number.isFinite(numberOfFiles) ||
      typeof fileSize !== "number" ||
      !Number.isFinite(fileSize) ||
      fileSize < 0
    ) {
      return json({ error: "Missing file metadata or fileKeys" }, 400);
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

    let isFreePlan = true;
    const vipGrant = !session.isGuest ? getVipGrantForUser(user) : null;
    if (vipGrant) {
      isFreePlan = false;
    } else if (!session.isGuest && user.stripeCustomerId) {
      try {
        const subscribedPlan = await stripe.subscriptions.list({
          status: "active",
          customer: user.stripeCustomerId,
          expand: ["data.items"],
        });
        isFreePlan = subscribedPlan.data.length === 0;
      } catch (stripeErr) {
        console.warn("[createLink] Stripe subscription lookup fallback:", stripeErr);
      }
    }

    const expiryDays = isFreePlan ? 3 : 30;
    const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

    const share = await createShare(db, {
      userId,
      email: LINK_ONLY_SHARE_EMAIL,
      size: effectiveFileSize,
      expiresAt,
      fileKey: cleanFileKeys.length === 1 ? cleanFileKeys[0] : JSON.stringify(cleanFileKeys),
      numberOfFiles,
      getLink: (shareId) => `${SITE_URL.replace(/\/$/, "")}/download/${shareId}`,
    });

    // Only send confirmation to authenticated accounts with verified emails
    const targetEmail = !session.isGuest && user?.email && !user.email.endsWith("@guest.gigasend.us") ? user.email : null;
    if (targetEmail) {
      try {
        const emailBinding = (locals as any)?.runtime?.env?.EMAIL;
        await sendEmailViaCloudflare(emailBinding, {
          from: brand.emailFrom,
          to: targetEmail,
          subject: `Your ${brand.productName} transfer link is ready`,
          html: generateUploadConfirmationEmail({
            deliveryLabel: "Link created",
            fileSize: effectiveFileSize,
            link: share.link,
            numberOfFiles,
          }),
          text: generateUploadConfirmationText({
            deliveryLabel: "Link created",
            fileSize: effectiveFileSize,
            link: share.link,
            numberOfFiles,
          }),
          headers: {
            "X-Entity-Ref-ID": `${share.id}-sender-confirmation`,
          },
        });
      } catch (emailErr) {
        console.warn("[createLink] Confirmation email notice:", emailErr);
      }
    }

    return json({ success: true, message: "Shareable link created", link: share.link });
  } catch (error) {
    console.error("Error creating shareable link:", error);
    captureMonitoringException(error, {
      user: { id: userId },
      tags: { feature: "upload", route: "createLink" },
      context: {
        numberOfFiles: body.numberOfFiles,
        fileSize: body.fileSize,
        hasFileKeys: Boolean(body.fileKeys?.length),
      },
    });
    return json({ error: "Failed to create shareable link" }, 500);
  }
};

