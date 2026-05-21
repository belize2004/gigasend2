import type { APIRoute } from "astro";
import type { BillingData, PaidPlan } from "@/types/app-data";
import { PlanEnum, PLANS } from "@/lib/constant";
import { findUserById, getDb } from "@/lib/d1";
import { stripe } from "@/lib/stripe";
import { getStorageLimitBytesForUser } from "@/lib/storageLimit";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";
import type Stripe from "stripe";

export const GET: APIRoute = async ({ cookies, locals }) => {
  const userId = await getAuthenticatedUserId(cookies);
  if (!userId) return unauthorized();

  const db = getDb(locals);
  const user = await findUserById(db, userId);
  if (!user) return json({ success: false, message: "User not found" }, 404);

  let allowedStorage = getStorageLimitBytesForUser(user);

  if (user.stripeCustomerId) {
    const subscriptions = await stripe.subscriptions.list({
      status: "active",
      customer: user.stripeCustomerId,
    });

    const subscription: Stripe.Subscription | undefined = subscriptions.data[0];
    if (subscription) {
      const planName = subscription.items.data[0].plan.nickname!.toLowerCase();
      const subscribedPlan = PLANS[planName as PlanEnum];
      if (!subscribedPlan) {
        return json({ success: false, message: "Subscribed plan not found" }, 404);
      }

      allowedStorage = getStorageLimitBytesForUser(user, planName as PlanEnum);
      const defaultPaymentMethodId = subscription.default_payment_method;
      let last4 = "";
      let exp_month = "";
      let exp_year = "";

      if (defaultPaymentMethodId && typeof defaultPaymentMethodId === "string") {
        const paymentMethod = await stripe.paymentMethods.retrieve(defaultPaymentMethodId);
        if (paymentMethod.type === "card" && paymentMethod.card) {
          last4 = paymentMethod.card.last4;
          exp_month = String(paymentMethod.card.exp_month);
          exp_year = String(paymentMethod.card.exp_year);
        }
      }

      const invoices = await stripe.invoices.list({ subscription: subscription.id, limit: 1 });
      const latestInvoice = invoices.data[0];
      const lastPaymentDate =
        latestInvoice && latestInvoice.status === "paid" && latestInvoice.created
          ? new Date(latestInvoice.created * 1000)
          : new Date(subscription.start_date * 1000);

      const nextBillingDate = new Date(lastPaymentDate);
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

      const data: PaidPlan = {
        isFree: false,
        planName: planName as PlanEnum,
        planFeatures: subscribedPlan.features,
        subscriptionStartDate: new Date(subscription.start_date * 1000).toISOString(),
        nextBillingDate: nextBillingDate.toISOString(),
        nextBillingAmount: subscription.items.data[0].price.unit_amount! / 100,
        last4,
        exp_month,
        exp_year,
      };

      return json({ success: true, data, allowedStorage, message: "Billing data retrieved" });
    }
  }

  const data: BillingData = { isFree: true };
  return json({ success: true, data, allowedStorage, message: "Billing data retrieved" });
};
