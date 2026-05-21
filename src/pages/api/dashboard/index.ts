import type { APIRoute } from "astro";
import type { DashboardData } from "@/types/app-data";
import { PlanEnum, PLANS } from "@/lib/constant";
import { findUserById, getActiveShareUsage, getDb, listActiveShares } from "@/lib/d1";
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
  if (user.stripeCustomerId) {
    const subscription = await stripe.subscriptions.list({
      status: "active",
      customer: user.stripeCustomerId,
      expand: ["data.items"],
    });
    if (subscription.data.length > 0) {
      const planName = subscription.data[0].items.data[0].plan.nickname!.toLowerCase();
      const subscribedPlan = PLANS[planName as PlanEnum];
      if (!subscribedPlan) {
        return json({ success: false, message: "Subscribed plan not found" }, 404);
      }
      allowedStorage = getStorageLimitBytesForUser(user, planName as PlanEnum);
    }
  }

  const shares = await listActiveShares(db, userId);
  const usedStorage = await getActiveShareUsage(db, userId);
  const data: DashboardData = { allowedStorage, usedStorage, shares };

  return json({ success: true, data, message: "Dashboard data retrieved" });
};
