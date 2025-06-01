"use client"
import ProtectedPage from '@/components/ProtectedPage'
import { STRIPE_PUBLISHABLE_KEY } from '@/lib/constant'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'

const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY)

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Elements stripe={stripe}>
      <ProtectedPage>
        {children}
      </ProtectedPage>
    </Elements>
  )
}
