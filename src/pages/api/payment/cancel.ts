import type { APIRoute } from "astro";
import type { StripeError } from "@stripe/stripe-js";
import { findUserById, getDb } from "@/lib/d1";
import { stripe } from "@/lib/stripe";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";

export const POST: APIRoute = async ({ cookies, locals }) => {
  try {
    const userId = await getAuthenticatedUserId(cookies);
    if (!userId) return unauthorized();

    const db = getDb(locals);
    const user = await findUserById(db, userId);
    if (!user) return json({ success: false, message: "User not found" }, 404);
    if (!user.stripeCustomerId) {
      return json({ success: false, message: "No Stripe customer ID found" }, 400);
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return json({ success: false, message: "No active subscriptions to cancel" }, 400);
    }

    const canceled = await stripe.subscriptions.cancel(subscriptions.data[0].id);
    return json({
      success: true,
      message: "Subscription cancelled successfully",
      subscription: canceled,
    });
  } catch (error) {
    const stripeError = (error as StripeError)?.message || "Something went wrong";
    return json({ success: false, message: stripeError }, 500);
  }
};
