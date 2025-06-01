import { NextRequest, NextResponse } from "next/server";
import { r2Client, r2BucketName } from "@/lib/r2Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Resend } from "resend";
import { generateEmailTemplate } from "@/lib/email";
import { connectToDB } from "@/lib/db";
import { NEXT_PUBLIC_RESEND_API_KEY } from "@/lib/constant";
import Share from "@/models/Share";
import User from "@/models/User";
import { verifyToken } from "@/lib/verifyJwt";
import { stripe } from "@/lib/stripe";

export interface SendEmailBody {
  receiverEmail: string,
  numberOfFiles: number,
  fileSize: number,
  message?: string,
  fileKeys: Array<string>,
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    
    const token = request.cookies.get("token")!.value!;
    const payload = await verifyToken(token);
    const userId = payload?.userId!;

    const { receiverEmail, message, fileKeys, numberOfFiles, fileSize }: SendEmailBody =
      await request.json();
    if (!receiverEmail || !fileKeys || !Array.isArray(fileKeys)) {
      return NextResponse.json(
        { error: "Missing email or fileKeys" },
        { status: 400 },
      );
    }
    // 1. Generate a 24-hour presigned download URL for each uploaded file
    const downloadLinks: string[] = [];
    for (const key of fileKeys) {
      const getCommand = new GetObjectCommand({
        Bucket: r2BucketName,
        Key: key,
      });
      // Each link will expire in 24 hours (86400 seconds)
      const url = await getSignedUrl(r2Client, getCommand, {
        expiresIn: 86400 * 3,
      });
      downloadLinks.push(url);
    }

    const user = await User.findById<User>(userId);
    let isFreePlan = true

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    if (user.stripeCustomerId) {
      const subscribedPlan = await stripe.subscriptions.list({
        status: "active",
        customer: user.stripeCustomerId,
        expand: ["data.items"],
      })

      if (subscribedPlan.data.length > 0) {
        isFreePlan = false
      }
    }

    // 3 days form free plan 30 days for any subscription
    const expiresAt: Date = new Date(Date.now() + (isFreePlan ? 3 : 30) * 24 * 60 * 60 * 1000);

    await Share.create<Share>({
      userId,
      email: receiverEmail,
      size: fileSize,
      expiresAt,
      link: downloadLinks[0],
    })

    const htmlContent = generateEmailTemplate({
      fileSize,
      link: downloadLinks[0],
      message,
      numberOfFiles,
      senderEmail: user.email,
    })

    const resend = new Resend(NEXT_PUBLIC_RESEND_API_KEY);
    const emailData = {
      from: "GigaSend <no-reply@transfer.gigasend.us>",
      to: receiverEmail,
      subject: "Your files are ready for download",
      html: htmlContent,
    };

    // 3. Send the email via Resend API
    const { error } = await resend.emails.send(emailData);
    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }
    return NextResponse.json({ message: "Download links sent to email" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send download links email" },
      { status: 500 },
    );
  }
}