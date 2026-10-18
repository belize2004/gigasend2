import type { APIRoute } from "astro";
import type { UsageData } from "@/types/app-data";
import { PlanEnum, PLANS } from "@/lib/constant";
import { getActiveShareUsage, getDb } from "@/lib/d1";
import { stripe } from "@/lib/stripe";
import { getStorageLimitBytesForUser, getVipGrantForUser } from "@/lib/storageLimit";
import { json } from "@/src/lib/api";
import { getOrCreateUserSession } from "@/src/lib/guestSession";

export const GET: APIRoute = async ({ cookies, locals }) => {
  try {
    const db = getDb(locals);
    const session = await getOrCreateUserSession(cookies, db, locals);
    const { userId, user, isGuest } = session;

    let allowedStorage = getStorageLimitBytesForUser(user);
    let expiryDays = 3;

    const vipGrant = !isGuest ? getVipGrantForUser(user) : null;
    if (vipGrant) {
      allowedStorage = getStorageLimitBytesForUser(user, vipGrant.plan);
      expiryDays = 30;
    } else if (!isGuest && user.stripeCustomerId) {
      try {
        const subscription = await stripe.subscriptions.list({
          status: "active",
          customer: user.stripeCustomerId,
          expand: ["data.items"],
        });
        if (subscription.data.length > 0) {
          const rawNickname = subscription.data[0]?.items?.data[0]?.plan?.nickname;
          const planName = (rawNickname ? rawNickname.toLowerCase() : "pro") as PlanEnum;
          const subscribedPlan = PLANS[planName] || PLANS.free;
          allowedStorage = getStorageLimitBytesForUser(user, planName);
          expiryDays = subscribedPlan.name !== "Free" ? 30 : expiryDays;
        }
      } catch (stripeErr) {
        console.warn("[usage] Stripe subscription lookup fallback:", stripeErr);
      }
    }

    const usedStorage = await getActiveShareUsage(db, userId);
    const data: UsageData = { allowedStorage, usedStorage, expiryDays };

    return json({ success: true, data, message: "Usage data retrieved" });
  } catch (err) {
    console.error("[usage] Error retrieving usage:", err);
    const fallbackData: UsageData = {
      allowedStorage: PLANS.free.storageBytes * 1024 * 1024 * 1024,
      usedStorage: 0,
      expiryDays: 3,
    };
    return json({ success: true, data: fallbackData, message: "Default usage data retrieved" });
  }
};

