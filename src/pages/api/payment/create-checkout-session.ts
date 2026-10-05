import type { APIRoute } from "astro";
import { findStripePlanByName, findUserById, getDb, updateUserStripeCustomerId } from "@/lib/d1";
import { createCustomer, stripe } from "@/lib/stripe";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";
import { brand } from "@/lib/brand";

export const POST: APIRoute = async ({ request, cookies, locals, site }) => {
  try {
    const userId = await getAuthenticatedUserId(cookies);
    if (!userId) return unauthorized();

    const db = getDb(locals);
    const { planName } = await request.json();
    if (!planName) return json({ success: false, message: "Plan name is required" }, 400);

    const user = await findUserById(db, userId);
    if (!user) return json({ success: false, message: "User not found" }, 404);

    const plan = await findStripePlanByName(db, planName.toLowerCase());
    if (!plan) return json({ success: false, message: `Plan ${planName} not found` }, 404);
    if (plan.name === "free") return json({ success: false, message: "Cannot purchase free plan" }, 400);

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await createCustomer({ name: user.name, email: user.email });
      customerId = customer.id;
      await updateUserStripeCustomerId(db, user.id, customerId);
    }

    const origin = (site?.origin ?? brand.siteUrl).replace(/\/$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.planId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout/${planName.toLowerCase()}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/plans`,
    });

    return json({ success: true, url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return json({ success: false, message: error.message || "Failed to create checkout session" }, 500);
  }
};
