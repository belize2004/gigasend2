import type { APIRoute } from "astro";
import { findStripePlanByName, findUserById, getDb, updateUserStripeCustomerId } from "@/lib/d1";
import { createCustomer, stripe } from "@/lib/stripe";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";
import { brand } from "@/lib/brand";
import { PAYG_PACKS } from "@/lib/constant";

export const POST: APIRoute = async ({ request, cookies, locals, site }) => {
  try {
    const { planName, packId, locale } = await request.json().catch(() => ({}));
    if (!planName && !packId) return json({ success: false, message: "Plan or Pack is required" }, 400);

    const userId = await getAuthenticatedUserId(cookies);
    const db = getDb(locals);

    // If subscription and not logged in, require auth
    const isPaygRequest = Boolean(
      packId ||
      Object.keys(PAYG_PACKS).some((key) => PAYG_PACKS[key].id === planName || key === (planName || "").toLowerCase())
    );

    if (!isPaygRequest && !userId) {
      return unauthorized();
    }

    let customerId: string | undefined = undefined;
    if (userId) {
      const user = await findUserById(db, userId);
      if (user) {
        if (!user.stripeCustomerId) {
          const customer = await createCustomer({ name: user.name, email: user.email });
          customerId = customer.id;
          await updateUserStripeCustomerId(db, user.id, customerId);
        } else {
          customerId = user.stripeCustomerId;
        }
      }
    }

    const origin = (site?.origin ?? brand.siteUrl).replace(/\/$/, "");

    // Detect Spanish or Brazilian Portuguese locale from request body, Referer header, or page URL
    const referer = request.headers.get("referer") || "";
    const isPortuguese =
      locale === "pt" ||
      locale === "pt-BR" ||
      referer.includes("/pt/") ||
      referer.includes("/pt?") ||
      referer.endsWith("/pt");
    const isSpanish =
      locale === "es" ||
      locale === "es-419" ||
      referer.includes("/es/") ||
      referer.includes("/es?") ||
      referer.endsWith("/es");
    const stripeLocale = isPortuguese ? "pt-BR" : isSpanish ? "es" : "auto";

    // Handle Pay-As-You-Go One-Time Packs
    const selectedPaygKey = Object.keys(PAYG_PACKS).find(
      (key) => PAYG_PACKS[key].id === packId || PAYG_PACKS[key].id === planName || key === (planName || "").toLowerCase()
    );

    if (selectedPaygKey) {
      const pack = PAYG_PACKS[selectedPaygKey];
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: customerId || undefined,
        customer_creation: customerId ? undefined : "always",
        allow_promotion_codes: true,
        locale: stripeLocale,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Gigasend — ${pack.name} (${pack.storage})`,
                description: `Prepaid ${pack.storage} delivery credits valid for 12 months. No monthly subscriptions.`,
              },
              unit_amount: pack.price * 100,
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId: userId || "guest",
          packId: pack.id,
          storage: pack.storage,
          type: "payg_credits",
        },
        success_url: `${origin}/dashboard/billing?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/plans`,
      });

      return json({ success: true, url: session.url });
    }

    // Handle Monthly Subscriptions
    const plan = await findStripePlanByName(db, planName.toLowerCase());
    if (!plan) return json({ success: false, message: `Plan ${planName} not found` }, 404);
    if (plan.name === "free") return json({ success: false, message: "Cannot purchase free plan" }, 400);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      allow_promotion_codes: true,
      locale: stripeLocale,
      payment_method_collection: "always",
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
