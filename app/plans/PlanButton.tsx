"use client"
import { useRouter } from '@/components/compat/navigation'
import React from 'react'

interface Props {
  buttonStyle: string
  planName: string
  buttonText: string
  contactSales?: boolean
  popular?: boolean
}

export default function PlanButton({ buttonStyle, buttonText, planName, contactSales, popular }: Props) {
  const router = useRouter();
  const isGoldPrimary = popular || buttonStyle.includes('btn-gold') || buttonStyle.includes('purple');

  return (
    <button
      onClick={() => {
        if (contactSales) {
          router.push('/#contact');
          return;
        }

        router.push(planName == "Free" ? '/transfer' : `/checkout/${planName.toLowerCase()}`)
      }}
      className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer tap-tactile ${
        isGoldPrimary
          ? 'btn-gold shadow-lg shadow-gold-500/20'
          : 'btn-outline-gold'
      }`}
    >
      {buttonText}
    </button>
  )
}

