import type { APIRoute } from "astro";
import type { UsageData } from "@/types/app-data";
import { PlanEnum, PLANS } from "@/lib/constant";
import { findUserById, getActiveShareUsage, getDb } from "@/lib/d1";
import { stripe } from "@/lib/stripe";
import { getStorageLimitBytesForUser } from "@/lib/storageLimit";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";

export const GET: APIRoute = async ({ cookies, locals }) => {
  const userId = await getAuthenticatedUserId(cookies);
  if (!userId) return unauthorized();

  const db = getDb(locals);
  const user = await findUserById(db, userId);
  if (!user) return json({ success: false, message: "User not found" }, 404);

  let allowedStorage = getStorageLimitBytesForUser(user);
  let expiryDays = 3;

  if (user.stripeCustomerId) {
    const subscription = await stripe.subscriptions.list({
      status: "active",
      customer: user.stripeCustomerId,
      expand: ["data.items"],
    });
    if (subscription.data.length > 0) {
      const planName = subscription.data[0].items.data[0].plan.nickname!.toLowerCase();
      const subscribedPlan = PLANS[planName as PlanEnum] || PLANS.free;
      allowedStorage = getStorageLimitBytesForUser(user, planName as PlanEnum);
      expiryDays = subscribedPlan.name !== "Free" ? 30 : expiryDays;
    }
  }

  const usedStorage = await getActiveShareUsage(db, userId);
  const data: UsageData = { allowedStorage, usedStorage, expiryDays };

  return json({ success: true, data, message: "Usage data retrieved" });
};
