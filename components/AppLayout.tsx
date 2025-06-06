"use client"
import { FileProvider } from '@/context/FileContext'
import store from '@/lib/store'
import React from 'react'
import { Provider } from 'react-redux'
import Navbar from './Navbar'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <FileProvider>
        <Navbar />
        {children}
      </FileProvider>
    </Provider>
  )
}
