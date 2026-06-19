'use client'

import type React from 'react'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <Navbar />
        <main className="min-h-screen pt-16 px-4 py-8">
          {children}
        </main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
