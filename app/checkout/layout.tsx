"use client";
import React, { useEffect, useState } from "react";
import ProtectedPage from "@/components/ProtectedPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch("/api/payment/init", { method: "POST" })
      .then((response) => {
        if (!response.ok) return null;
        return response.json();
      })
      .then((response: ApiResponse<{ publishableKey: string }> | null) => {
        const publishableKey = response?.data?.publishableKey;
        if (publishableKey && publishableKey !== "stripe_publishable_key") {
          if (mounted) setStripePromise(loadStripe(publishableKey));
        }
        if (mounted) setIsReady(true);
      })
      .catch(() => {
        if (mounted) setIsReady(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-ocean-950 flex items-center justify-center p-6 text-center text-slate-300 font-body text-sm">
        <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl px-8 py-6 shadow-2xl">
          Preparing checkout…
        </div>
      </div>
    );
  }

  if (stripePromise) {
    return (
      <Elements stripe={stripePromise}>
        <ProtectedPage>{children}</ProtectedPage>
      </Elements>
    );
  }

  return <ProtectedPage>{children}</ProtectedPage>;
}
