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
    return <div className="p-6 text-center text-gray-600">Loading payment system...</div>;
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
