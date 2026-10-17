"use client"
import { FileProvider } from '@/context/FileContext'
import store from '@/lib/store'
import React from 'react'
import { Provider } from 'react-redux'
import Navbar from './Navbar'
import Footer from './Footer'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <FileProvider>
        <div className="min-h-screen bg-ocean-950 text-slate-100 flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </FileProvider>
    </Provider>
  )
}
