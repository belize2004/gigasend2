import type { APIRoute } from "astro";
import { createShare, findUserById, getDb } from "@/lib/d1";
import { stripe } from "@/lib/stripe";
import { captureMonitoringException } from "@/lib/monitoring";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.gigasend.us";
const LINK_ONLY_SHARE_EMAIL = "__share_link__";

interface CreateLinkBody {
  numberOfFiles: number;
  fileSize: number;
  fileKeys: string[];
}

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let userId: string | null = null;
  let body: Partial<CreateLinkBody> = {};

  try {
    userId = await getAuthenticatedUserId(cookies);
    if (!userId) return unauthorized();

    const db = getDb(locals);
    body = await request.json() as CreateLinkBody;
    const { fileKeys, numberOfFiles, fileSize } = body;

    if (
      !fileKeys ||
      !Array.isArray(fileKeys) ||
      typeof numberOfFiles !== "number" ||
      typeof fileSize !== "number"
    ) {
      return json({ error: "Missing file metadata or fileKeys" }, 400);
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
      email: LINK_ONLY_SHARE_EMAIL,
      size: fileSize,
      expiresAt,
      fileKey: cleanFileKeys.length === 1 ? cleanFileKeys[0] : JSON.stringify(cleanFileKeys),
      numberOfFiles,
      getLink: (shareId) => `${SITE_URL.replace(/\/$/, "")}/download/${shareId}`,
    });

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
