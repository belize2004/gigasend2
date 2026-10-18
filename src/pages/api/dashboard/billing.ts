import type { APIRoute } from "astro";
import type { BillingData, PaidPlan } from "@/types/app-data";
import { PlanEnum, PLANS } from "@/lib/constant";
import { findUserById, getDb } from "@/lib/d1";
import { stripe } from "@/lib/stripe";
import { getStorageLimitBytesForUser, getVipGrantForUser } from "@/lib/storageLimit";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";
import type Stripe from "stripe";

export const GET: APIRoute = async ({ cookies, locals }) => {
  const userId = await getAuthenticatedUserId(cookies, locals);
  if (!userId) return unauthorized();

  const db = getDb(locals);
  const user = await findUserById(db, userId);
  if (!user) return json({ success: false, message: "User not found" }, 404);

  let allowedStorage = getStorageLimitBytesForUser(user);

  // Check VIP / Partner granted plan
  const vipGrant = getVipGrantForUser(user);
  if (vipGrant) {
    const planName = vipGrant.plan;
    const planDef = PLANS[planName] || PLANS.pro;

    const data: PaidPlan = {
      isFree: false,
      isVipPartner: true,
      partnerNotes: vipGrant.notes,
      planName: planName,
      planFeatures: [
        `${vipGrant.storageGB} GB storage`,
        ...planDef.features.filter((f) => !f.toLowerCase().includes("storage")),
      ],
      subscriptionStartDate: "2026-10-18T00:00:00Z",
      nextBillingDate: vipGrant.expiresAt,
      nextBillingAmount: 0,
      last4: "VIP",
      exp_month: "10",
      exp_year: "2027",
    };

    return json({ success: true, data, allowedStorage, message: "VIP Partner billing data retrieved" });
  }

  if (user.stripeCustomerId) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        status: "active",
        customer: user.stripeCustomerId,
      });

      const subscription: Stripe.Subscription | undefined = subscriptions.data[0];
      if (subscription) {
        const firstItem = subscription.items?.data?.[0];
        const rawPlanName = firstItem?.plan?.nickname || firstItem?.price?.nickname || "pro";
        const planName = rawPlanName.toLowerCase();
        const subscribedPlan = PLANS[planName as PlanEnum] || PLANS.pro;
        const resolvedPlanKey = (PLANS[planName as PlanEnum] ? planName : "pro") as PlanEnum;

        allowedStorage = getStorageLimitBytesForUser(user, resolvedPlanKey);
        const defaultPaymentMethodId = subscription.default_payment_method;
        let last4 = "";
        let exp_month = "";
        let exp_year = "";

        if (defaultPaymentMethodId && typeof defaultPaymentMethodId === "string") {
          try {
            const paymentMethod = await stripe.paymentMethods.retrieve(defaultPaymentMethodId);
            if (paymentMethod.type === "card" && paymentMethod.card) {
              last4 = paymentMethod.card.last4;
              exp_month = String(paymentMethod.card.exp_month);
              exp_year = String(paymentMethod.card.exp_year);
            }
          } catch (pmErr) {
            console.warn("[billing] Stripe paymentMethod lookup failed:", pmErr);
          }
        }

        let lastPaymentDate = new Date(subscription.start_date * 1000);
        try {
          const invoices = await stripe.invoices.list({ subscription: subscription.id, limit: 1 });
          const latestInvoice = invoices.data[0];
          if (latestInvoice && latestInvoice.status === "paid" && latestInvoice.created) {
            lastPaymentDate = new Date(latestInvoice.created * 1000);
          }
        } catch (invErr) {
          console.warn("[billing] Stripe invoice lookup failed:", invErr);
        }

        const nextBillingDate = new Date(lastPaymentDate);
        nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

        const unitAmount = firstItem?.price?.unit_amount ?? firstItem?.plan?.amount ?? subscribedPlan.price * 100;

        const data: PaidPlan = {
          isFree: false,
          planName: resolvedPlanKey,
          planFeatures: subscribedPlan.features,
          subscriptionStartDate: new Date(subscription.start_date * 1000).toISOString(),
          nextBillingDate: nextBillingDate.toISOString(),
          nextBillingAmount: unitAmount / 100,
          last4,
          exp_month,
          exp_year,
        };

        return json({ success: true, data, allowedStorage, message: "Billing data retrieved" });
      }
    } catch (stripeErr) {
      console.warn("[billing] Stripe subscription lookup failed, falling back to free tier:", stripeErr);
    }
  }

  const data: BillingData = { isFree: true };
  return json({ success: true, data, allowedStorage, message: "Billing data retrieved" });
};
