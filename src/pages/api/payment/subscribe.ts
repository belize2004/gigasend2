import type { APIRoute } from "astro";
import type { StripeError } from "@stripe/stripe-js";
import type { SubscriptionRequestBody } from "@/types/app-data";
import {
  findStripePlanByName,
  findUserById,
  getDb,
  updateUserStripeCustomerId,
} from "@/lib/d1";
import { createCustomer, stripe } from "@/lib/stripe";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const userId = await getAuthenticatedUserId(cookies, locals);
    if (!userId) return unauthorized();

    const db = getDb(locals);
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return json({ success: false, message: "Please select a plan and enter your payment details to continue." }, 400);
    }
    const { paymentMethod, planName } = body as Partial<SubscriptionRequestBody>;
    if (!planName || typeof planName !== "string" || !paymentMethod?.id) {
      return json({ success: false, message: "Please select a plan and enter your payment details to continue." }, 400);
    }

    const user = await findUserById(db, userId);
    if (!user) return json({ success: false, message: "We couldn’t find your account. Please sign in again." }, 404);

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await createCustomer({ name: user.name, email: user.email });
      customerId = customer.id;
      await updateUserStripeCustomerId(db, user.id, customerId);
    }

    let subscriptions;
    try {
      subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        expand: ["data.items"],
      });
    } catch (err: any) {
      if (err?.code === "resource_missing" || String(err?.message || "").includes("No such customer")) {
        const customer = await createCustomer({ name: user.name, email: user.email });
        customerId = customer.id;
        await updateUserStripeCustomerId(db, user.id, customerId);
        subscriptions = { data: [] };
      } else {
        throw err;
      }
    }

    if (subscriptions.data.length > 0) {
      const activePlanName = subscriptions.data[0].items?.data?.[0]?.plan?.nickname || "Pro";
      return json(
        { success: false, message: `You’re already subscribed to the ${activePlanName} plan.` },
        400,
      );
    }

    await stripe.paymentMethods.attach(paymentMethod.id, { customer: customerId });
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethod.id },
    });

    const plan = await findStripePlanByName(db, planName.toLowerCase());

    if (!plan) return json({ success: false, message: "The selected plan wasn’t found." }, 404);
    if (plan.name === "free") {
      return json({ success: false, message: "The Free plan is already included with your account." }, 400);
    }

    await stripe.subscriptions.create({
      customer: customerId,
      items: [{ plan: plan.planId }],
    });

    return json({ success: true, message: `You’re now subscribed to the ${planName} plan.` });
  } catch (error) {
    const stripeError = (error as StripeError)?.message || "Something went wrong while processing your payment. Please try again.";
    return json({ success: false, message: stripeError }, 500);
  }
};
