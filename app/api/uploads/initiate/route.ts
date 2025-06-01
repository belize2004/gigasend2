import { NextRequest, NextResponse } from "next/server";
import { r2Client, r2BucketName } from "@/lib/r2Client";
import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
import { connectToDB } from "@/lib/db";
import { verifyToken } from "@/lib/verifyJwt";
import User from "@/models/User";
import { stripe } from "@/lib/stripe";
import { PlanEnum, PLANS } from "@/lib/constant";
import Share from "@/models/Share";
import { gbToBytes } from "@/lib/utils";

export interface InitiateUploadBody {
  fileName: string;
  contentType: string;
  fileSize: number
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const { fileName, contentType, fileSize }: InitiateUploadBody = await request.json();

    let planPrefix = "free"; // free | paid
    let userPlan = PLANS.free;
    const token = request.cookies.get("token")!.value!;

    const payload = await verifyToken(token);
    const userId = payload?.userId!;

    const user = await User.findById<User>(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    if (user.stripeCustomerId) {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: "active",
        expand: ["data.items"],
      });

      if (subscriptions.data.length > 0) {
        const planName = subscriptions.data[0].items.data[0].plan.nickname;
        const subscribedPlan = PLANS[planName as PlanEnum] || PLANS.free

        if (!subscribedPlan) {
          return NextResponse.json(
            { error: "Subscribed plan not found" },
            { status: 404 },
          );
        }

        userPlan = subscribedPlan;
        planPrefix = 'paid'
      }

    }

    const usedShares = await Share.find({
      userId,
      expiresAt: { $gt: new Date() } // Only non-expired shares
    });

    const usedLimit = usedShares.reduce((acc, share) => acc + share.size, 0)
    const totalLimit = gbToBytes(userPlan.storageBytes);

    if (usedLimit + fileSize > totalLimit) {
      return NextResponse.json({
        success: false,
        message: "Storage limit exceeded",
      }, { status: 403 });
    }

    // Generate a unique object key for the file (to avoid collisions in bucket)
    const extIndex = fileName.lastIndexOf(".");
    const baseName = extIndex >= 0 ? fileName.substring(0, extIndex) : fileName;
    const extension = extIndex >= 0 ? fileName.substring(extIndex) : "";
    const uniqueKey = `${baseName}-${Date.now()}-${Math.floor(Math.random() * 1e6)}${extension}`;

    // Initiate multipart upload via AWS SDK
    const command = new CreateMultipartUploadCommand({
      Bucket: r2BucketName,
      Key: planPrefix + "/" + uniqueKey,
      ContentType: contentType,
    });
    const createResponse = await r2Client.send(command);

    // Respond with UploadId and the generated file key
    return NextResponse.json({
      uploadId: createResponse.UploadId,
      key: planPrefix + "/" + uniqueKey,
    });
  } catch (error) {
    console.error("Error initiating multipart upload:", error);
    return NextResponse.json(
      { error: "Failed to initiate upload" },
      { status: 500 },
    );
  }
}
