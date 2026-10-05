import type { APIRoute } from "astro";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/constant";
import { json } from "@/src/lib/api";

export const POST: APIRoute = async ({ locals }) => {
  const env = (locals as any)?.runtime?.env || {};
  const publishableKey =
    env.STRIPE_PUBLISHABLE_KEY ||
    env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    process.env.STRIPE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    STRIPE_PUBLISHABLE_KEY;

  return json({
    success: true,
    data: {
      publishableKey,
    },
    message: "Stripe payment configuration loaded",
  });
};
