import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Providers from './providers'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'PxNexus — Redesigning HR Operations with AI',
  description:
    'PxNexus combines consulting expertise and AI to deconstruct and redesign HR operations — creating autonomous, sustainable processes that run without depending on any one person.',
  keywords: 'HR operations AI, HR automation, process redesign, HR consulting Japan, autonomous operations',
  openGraph: {
    title: 'PxNexus — Redesigning HR Operations with AI',
    description: 'We deconstruct, redesign, and implement — combining consulting and AI to build HR that runs autonomously.',
    type: 'website',
    siteName: 'PxNexus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PxNexus — Redesigning HR Operations with AI',
    description: 'HR operations redesigned from the ground up. Consulting + AI + Implementation.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
