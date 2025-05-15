import { NextRequest, NextResponse } from "next/server";
import { r2Client, r2BucketName } from "@/lib/r2Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Resend } from "resend";
import { generateEmailTemplate } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { senderEmail, receiverEmail, message, fileKeys, numberOfFiles, fileSize } =
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

    const htmlContent = generateEmailTemplate({
      fileSize,
      link: downloadLinks[0],
      message,
      numberOfFiles,
      senderEmail
    })

    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || "");
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