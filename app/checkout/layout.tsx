"use client";
import React, { useEffect, useState } from "react";
import ProtectedPage from "@/components/ProtectedPage";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/constant";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    if (STRIPE_PUBLISHABLE_KEY) {
      setStripePromise(loadStripe(STRIPE_PUBLISHABLE_KEY));
    }
  }, []);

  if (!stripePromise) {
    return <div className="p-6 text-center text-gray-600">Loading payment system...</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <ProtectedPage>{children}</ProtectedPage>
    </Elements>
  );
}
