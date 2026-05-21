import type { APIRoute } from "astro";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2BucketName, r2Client } from "@/lib/r2Client";
import { findUserById, getActiveShareUsage, getDb } from "@/lib/d1";
import { PlanEnum, PLANS } from "@/lib/constant";
import { stripe } from "@/lib/stripe";
import { gbToBytes } from "@/lib/utils";
import { captureMonitoringException } from "@/lib/monitoring";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";
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
    userId = await getAuthenticatedUserId(cookies);
    if (!userId) return unauthorized();

    const db = getDb(locals);
    body = await request.json() as PresignDirectBody;
    const { fileName, contentType, fileSize } = body;

    if (!fileName || !contentType || typeof fileSize !== "number") {
      return json({ error: "Missing fileName, contentType, or fileSize" }, 400);
    }

    if (fileSize > MAX_DIRECT_UPLOAD_BYTES) {
      return json({ error: "Direct uploads are limited to 100 MB" }, 413);
    }

    let planPrefix = "free";
    let userPlan = PLANS.free;

    const user = await findUserById(db, userId);
    if (!user) return json({ error: "User not found" }, 404);

    if (user.stripeCustomerId) {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: "active",
        expand: ["data.items"],
      });

      if (subscriptions.data.length > 0) {
        const planName = subscriptions.data[0].items.data[0].plan.nickname;
        userPlan = PLANS[planName as PlanEnum] || PLANS.free;
        planPrefix = "paid";
      }
    }

    const usedLimit = await getActiveShareUsage(db, userId);
    const totalLimit = gbToBytes(userPlan.storageBytes);
    const remainingLimit = Math.max(0, totalLimit - usedLimit);

    if (usedLimit + fileSize > totalLimit) {
      return json({
        success: false,
        message: `This file is larger than your remaining storage (${Math.round(remainingLimit / 1024 / 1024 / 1024 * 100) / 100} GB).`,
      }, 403);
    }

    const key = createUploadKey(fileName, planPrefix);
    const command = new PutObjectCommand({
      Bucket: r2BucketName,
      Key: key,
      ContentType: contentType,
      ContentLength: fileSize,
    });
    const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 });

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
