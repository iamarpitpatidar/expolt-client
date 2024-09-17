import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
