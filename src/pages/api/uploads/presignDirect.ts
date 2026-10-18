import type { APIRoute } from "astro";
import { presignPutObject } from "@/lib/r2Client";
import { getDb } from "@/lib/d1";
import { PlanEnum, PLANS } from "@/lib/constant";
import { stripe } from "@/lib/stripe";
import { getStorageLimitBytesForUser, getVipGrantForUser } from "@/lib/storageLimit";
import { captureMonitoringException } from "@/lib/monitoring";
import { json } from "@/src/lib/api";
import { getOrCreateUserSessionWithUsage } from "@/src/lib/guestSession";
import { createUploadKey } from "@/src/lib/uploadKeys";

interface PresignDirectBody {
  fileName: string;
  contentType: string;
  fileSize: number;
}

const MAX_DIRECT_UPLOAD_BYTES = 100 * 1024 * 1024;

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: Partial<PresignDirectBody> = {};

  try {
    const rawBody = await request.json().catch(() => null);
    if (!rawBody || typeof rawBody !== "object") {
      return json({ error: "Invalid JSON body" }, 400);
    }
    body = rawBody as PresignDirectBody;
    const { fileName, contentType, fileSize } = body;

    if (
      !fileName ||
      !contentType ||
      typeof fileSize !== "number" ||
      !Number.isFinite(fileSize) ||
      fileSize < 0
    ) {
      return json({ error: "Missing or invalid fileName, contentType, or fileSize" }, 400);
    }

    if (fileSize > MAX_DIRECT_UPLOAD_BYTES) {
      return json({ error: "Direct uploads are limited to 100 MB" }, 413);
    }

    const db = getDb(locals);
    const session = await getOrCreateUserSessionWithUsage(cookies, db, locals);
    userId = session.userId;
    const { user, usedLimit } = session;
    const isGuestUser = session.isGuest || user.email.endsWith("@guest.gigasend.us");

    let planPrefix = "free";
    let userPlan = PLANS.free;

    const vipGrant = !isGuestUser ? getVipGrantForUser(user) : null;
    if (vipGrant) {
      userPlan = PLANS[vipGrant.plan] || PLANS.pro;
      planPrefix = "paid";
    } else if (!isGuestUser && user.stripeCustomerId) {
      try {
        const subscriptions = await stripe.subscriptions.list({
          customer: user.stripeCustomerId,
          status: "active",
          expand: ["data.items"],
        });

        if (subscriptions.data.length > 0) {
          const rawNickname = subscriptions.data[0]?.items?.data[0]?.plan?.nickname;
          const planName = (rawNickname ? rawNickname.toLowerCase() : "pro") as PlanEnum;
          userPlan = PLANS[planName] || PLANS.free;
          planPrefix = "paid";
        }
      } catch (stripeErr) {
        console.warn("[presignDirect] Stripe subscription lookup fallback:", stripeErr);
      }
    }

    const totalLimit = getStorageLimitBytesForUser(user, userPlan.name.toLowerCase() as PlanEnum);
    const remainingLimit = Math.max(0, totalLimit - usedLimit);

    if (usedLimit + fileSize > totalLimit) {
      return json({
        success: false,
        message: `This file is larger than your remaining storage (${Math.round(remainingLimit / 1024 / 1024 / 1024 * 100) / 100} GB).`,
      }, 403);
    }

    const key = createUploadKey(fileName, planPrefix);
    const url = await presignPutObject(key, contentType, fileSize, 3600);

    return json({ url, key });
  } catch (error) {
    console.error("Error generating direct upload URL:", error);
    captureMonitoringException(error, {
      user: { id: userId },
      tags: { feature: "upload", route: "presign-direct" },
      context: {
        fileName: body.fileName,
        contentType: body.contentType,
        fileSize: body.fileSize,
      },
    });
    return json({ error: "Failed to prepare direct upload" }, 500);
  }
};

