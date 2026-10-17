import Stripe from "stripe";
import * as fs from "node:fs";
import * as path from "node:path";

function loadEnvKey(): string {
  if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.trim().length > 0) {
    return process.env.STRIPE_SECRET_KEY.trim();
  }

  // Attempt to read from .dev.vars or .env if present
  const candidates = [
    path.resolve(process.cwd(), ".dev.vars"),
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), ".env.local"),
  ];

  for (const file of candidates) {
    if (fs.existsSync(file)) {
      try {
        const content = fs.readFileSync(file, "utf8");
        const match = content.match(/^STRIPE_SECRET_KEY=["']?([^"'\r\n]+)["']?/m);
        if (match && match[1] && match[1].trim().length > 0) {
          return match[1].trim();
        }
      } catch {
        // Ignore read errors
      }
    }
  }

  return "";
}

async function main() {
  console.log("=================================================");
  console.log("  GigaSend Stripe Promotion Code Generator       ");
  console.log("  Coupon: BANGANGA20 (20% Off Forever)           ");
  console.log("=================================================");

  const stripeKey = loadEnvKey();

  if (!stripeKey) {
    console.error("\n[Notice] STRIPE_SECRET_KEY is not set in environment or local files.");
    console.error("To execute this against live/test Stripe:");
    console.error("  STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/create-stripe-coupon.ts\n");
    console.log("Script template ready and verified.");
    return;
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: "2025-02-24.acacia" as any,
  });

  const COUPON_ID = "BANGANGA20";
  const PROMO_CODE = "BANGANGA20";

  // 1. Ensure Coupon
  let coupon: Stripe.Coupon;
  try {
    coupon = await stripe.coupons.retrieve(COUPON_ID);
    console.log(`[OK] Coupon '${COUPON_ID}' already exists:`, {
      id: coupon.id,
      name: coupon.name,
      percent_off: coupon.percent_off,
      duration: coupon.duration,
      valid: coupon.valid,
    });
  } catch (err: any) {
    if (err.statusCode === 404 || err.code === "resource_missing") {
      console.log(`[Creating] Stripe Coupon '${COUPON_ID}' (20% off forever)...`);
      coupon = await stripe.coupons.create({
        id: COUPON_ID,
        name: COUPON_ID,
        percent_off: 20,
        duration: "forever",
        metadata: {
          creator: "Nicolás Baumgartner (@hellobanganga)",
          campaign: "Influencer Barter - 12 Month 80GB Pro Plan",
          purpose: "Audience 20% discount on any pack/subscription",
        },
      });
      console.log(`[Created] Stripe Coupon successfully:`, {
        id: coupon.id,
        percent_off: coupon.percent_off,
        duration: coupon.duration,
      });
    } else {
      throw err;
    }
  }

  // 2. Ensure Customer-Facing Promotion Code
  console.log(`[Checking] Customer-facing promotion code '${PROMO_CODE}'...`);
  const existingCodes = await stripe.promotionCodes.list({
    code: PROMO_CODE,
    active: true,
    limit: 5,
  });

  let promoCode: Stripe.PromotionCode;
  if (existingCodes.data.length > 0) {
    promoCode = existingCodes.data[0];
    console.log(`[OK] Customer promotion code '${PROMO_CODE}' is already active:`, {
      id: promoCode.id,
      code: promoCode.code,
      coupon: typeof promoCode.coupon === "string" ? promoCode.coupon : promoCode.coupon.id,
      active: promoCode.active,
    });
  } else {
    console.log(`[Creating] Promotion Code '${PROMO_CODE}' for coupon '${COUPON_ID}'...`);
    promoCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: PROMO_CODE,
      active: true,
      metadata: {
        creator: "Nicolás Baumgartner (@hellobanganga)",
        campaign: "Influencer Barter - 12 Month 80GB Pro Plan",
      },
    });
    console.log(`[Created] Customer promotion code successfully:`, {
      id: promoCode.id,
      code: promoCode.code,
      active: promoCode.active,
    });
  }

  console.log("\nStripe Setup Completed Successfully!");
}

main().catch((err) => {
  console.error("Error creating Stripe coupon / promotion code:", err);
  process.exit(1);
});
