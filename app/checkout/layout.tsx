"use client";
import React, { useEffect, useState } from "react";
import ProtectedPage from "@/components/ProtectedPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch("/api/payment/init", { method: "POST" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load payment settings");
        return response.json();
      })
      .then((response: ApiResponse<{ publishableKey: string }>) => {
        const publishableKey = response.data?.publishableKey;
        if (!publishableKey || publishableKey === "stripe_publishable_key") {
          throw new Error("Stripe publishable key is not configured");
        }
        if (mounted) setStripePromise(loadStripe(publishableKey));
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : "Unable to load payment settings");
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  if (!stripePromise) {
    return <div className="p-6 text-center text-gray-600">Loading payment system...</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <ProtectedPage>{children}</ProtectedPage>
    </Elements>
  );
}
