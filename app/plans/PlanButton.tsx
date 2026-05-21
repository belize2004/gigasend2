
"use client"
import { useRouter } from '@/components/compat/navigation'
import React from 'react'

interface Props {
  buttonStyle: string
  planName: string
  buttonText: string
  contactSales?: boolean
}

export default function PlanButton({ buttonStyle, buttonText, planName, contactSales }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (contactSales) {
          router.push('/#contact');
          return;
        }

        router.push(planName == "Free" ? '/transfer' : `/checkout/${planName.toLowerCase()}`)
      }}
      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${buttonStyle}`}
    >
      {buttonText}
    </button>
  )
}
