import type { APIRoute } from "astro";
import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
import { MAX_PRESIGN_BATCH_SIZE, presignParts, r2BucketName, r2Client } from "@/lib/r2Client";
import { getDb } from "@/lib/d1";
import { PlanEnum, PLANS } from "@/lib/constant";
import { stripe } from "@/lib/stripe";
import { gbToBytes } from "@/lib/utils";
import { getStorageLimitBytesForUser, getVipGrantForUser } from "@/lib/storageLimit";
import { json } from "@/src/lib/api";
import { getOrCreateUserSessionWithUsage } from "@/src/lib/guestSession";
import { captureMonitoringException } from "@/lib/monitoring";
import { createUploadKey } from "@/src/lib/uploadKeys";

interface InitiateUploadBody {
  fileName: string;
  contentType: string;
  fileSize: number;
  partCount?: number;
  partNumbers?: number[];
}

const MAX_SINGLE_FILE_UPLOAD_BYTES = gbToBytes(5120);

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: Partial<InitiateUploadBody> = {};

  try {
    const rawBody = await request.json().catch(() => null);
    if (!rawBody || typeof rawBody !== "object") {
      return json({ error: "Couldn’t start the upload. Please select a valid file and try again." }, 400);
    }
    body = rawBody as InitiateUploadBody;
    const { fileName, contentType, fileSize, partCount, partNumbers } = body;
    if (
      !fileName ||
      !contentType ||
      typeof fileSize !== "number" ||
      !Number.isFinite(fileSize) ||
      fileSize <= 0
    ) {
      return json({ error: "Please select a valid, non-empty file to upload." }, 400);
    }

    if (fileSize > MAX_SINGLE_FILE_UPLOAD_BYTES) {
      return json({
        success: false,
        message: "Single file uploads are limited to 5 TB.",
      }, 413);
    }

    const db = getDb(locals);
    const session = await getOrCreateUserSessionWithUsage(cookies, db, locals);
    userId = session.userId;
    const { user, usedLimit } = session;
    const isGuestUser = session.isGuest || user.email.endsWith("@guest.gigasend.us");

    if (isGuestUser && fileSize > PLANS.free.storageBytes * 1024 * 1024 * 1024) {
      return json({
        success: false,
        message: `Free guest transfers are limited to ${PLANS.free.storageBytes} GB. Upgrade to send larger files.`,
      }, 403);
    }

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
        console.warn("[initiate] Stripe subscription lookup fallback:", stripeErr);
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

    const command = new CreateMultipartUploadCommand({
      Bucket: r2BucketName,
      Key: key,
      ContentType: contentType,
    });
    const createResponse = await r2Client.send(command);
    const uploadId = createResponse.UploadId;

    let urls: Record<string, string> | undefined;
    if (uploadId) {
      let initialParts: number[] = [];
      if (Array.isArray(partNumbers) && partNumbers.length > 0) {
        initialParts = partNumbers
          .map((n) => Number(n))
          .filter((n) => Number.isInteger(n) && n >= 1 && n <= 10_000)
          .slice(0, MAX_PRESIGN_BATCH_SIZE);
      } else if (typeof partCount === "number" && Number.isFinite(partCount) && partCount > 0) {
        const count = Math.min(Math.floor(partCount), MAX_PRESIGN_BATCH_SIZE, 10_000);
        initialParts = Array.from({ length: count }, (_, i) => i + 1);
      }

      if (initialParts.length > 0) {
        urls = await presignParts(key, uploadId, initialParts);
      }
    }

    return json({ uploadId, key, ...(urls ? { urls } : {}) });
  } catch (error) {
    console.error("Error initiating multipart upload:", error);
    captureMonitoringException(error, {
      user: { id: userId },
      tags: { feature: "upload", route: "initiate" },
      context: {
        fileName: body.fileName,
        contentType: body.contentType,
        fileSize: body.fileSize,
      },
    });
    return json({ error: "Couldn’t start the upload. Please wait a moment and try again." }, 500);
  }
};

