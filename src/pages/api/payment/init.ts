import type { APIRoute } from "astro";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/constant";
import { json } from "@/src/lib/api";

export const POST: APIRoute = async () => {
  return json({
    success: true,
    data: {
      publishableKey: STRIPE_PUBLISHABLE_KEY,
    },
    message: "Stripe payment configuration loaded",
  });
};
