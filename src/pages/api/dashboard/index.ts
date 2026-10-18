import type { APIRoute } from "astro";
import type { DashboardData } from "@/types/app-data";
import { PlanEnum, PLANS } from "@/lib/constant";
import { findUserById, getActiveShareUsage, getDb, listActiveShares } from "@/lib/d1";
import { stripe } from "@/lib/stripe";
import { getStorageLimitBytesForUser, getVipGrantForUser } from "@/lib/storageLimit";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";

export const GET: APIRoute = async ({ cookies, locals }) => {
  const userId = await getAuthenticatedUserId(cookies, locals);
  if (!userId) return unauthorized();

  const db = getDb(locals);
  const user = await findUserById(db, userId);
  if (!user) return json({ success: false, message: "User not found" }, 404);

  let allowedStorage = getStorageLimitBytesForUser(user);

  const vipGrant = getVipGrantForUser(user);
  if (vipGrant) {
    allowedStorage = getStorageLimitBytesForUser(user, vipGrant.plan);
  } else if (user.stripeCustomerId) {
    try {
      const subscription = await stripe.subscriptions.list({
        status: "active",
        customer: user.stripeCustomerId,
        expand: ["data.items"],
      });
      if (subscription.data.length > 0) {
        const rawPlanName =
          subscription.data[0].items?.data?.[0]?.plan?.nickname ||
          subscription.data[0].items?.data?.[0]?.price?.nickname ||
          "";
        const planName = rawPlanName.toLowerCase();
        const subscribedPlan = PLANS[planName as PlanEnum];
        if (subscribedPlan) {
          allowedStorage = getStorageLimitBytesForUser(user, planName as PlanEnum);
        }
      }
    } catch (err) {
      console.warn("[dashboard] Stripe subscription lookup failed, using default tier:", err);
    }
  }

  const shares = await listActiveShares(db, userId);
  const usedStorage = await getActiveShareUsage(db, userId);
  const data: DashboardData = { allowedStorage, usedStorage, shares };

  return json({ success: true, data, message: "Dashboard data retrieved" });
};
