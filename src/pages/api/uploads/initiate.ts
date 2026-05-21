import type { APIRoute } from "astro";
import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
import { r2BucketName, r2Client } from "@/lib/r2Client";
import { findUserById, getActiveShareUsage, getDb } from "@/lib/d1";
import { PlanEnum, PLANS } from "@/lib/constant";
import { stripe } from "@/lib/stripe";
import { gbToBytes } from "@/lib/utils";
import { getStorageLimitBytesForUser } from "@/lib/storageLimit";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";
import { createUploadKey } from "@/src/lib/uploadKeys";

interface InitiateUploadBody {
  fileName: string;
  contentType: string;
  fileSize: number;
}

const MAX_SINGLE_FILE_UPLOAD_BYTES = gbToBytes(5120);

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: Partial<InitiateUploadBody> = {};

  try {
    userId = await getAuthenticatedUserId(cookies);
    if (!userId) return unauthorized();

    const db = getDb(locals);
    body = await request.json() as InitiateUploadBody;
    const { fileName, contentType, fileSize } = body;
    if (!fileName || !contentType || typeof fileSize !== "number") {
      return json({ error: "Missing fileName, contentType, or fileSize" }, 400);
    }

    if (fileSize > MAX_SINGLE_FILE_UPLOAD_BYTES) {
      return json({
        success: false,
        message: "Single file uploads are limited to 5 TB.",
      }, 413);
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

    return json({ uploadId: createResponse.UploadId, key });
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
    return json({ error: "Failed to initiate upload" }, 500);
  }
};
