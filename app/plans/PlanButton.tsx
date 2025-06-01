
"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  buttonStyle: string
  planName: string
  buttonText: string
}

export default function PlanButton({ buttonStyle, buttonText, planName }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(planName == "Free" ? '/transfer' : `/checkout/${planName.toLowerCase()}`)
      }}
      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${buttonStyle}`}
    >
      {buttonText}
    </button>
  )
}
