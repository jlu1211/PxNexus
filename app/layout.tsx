import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'PxNexus — Find People Who Fit, Stay, and Grow',
  description:
    'PxNexus helps HR teams hire based on skills, values, and team culture — not just résumés. People, Philosophy, Passion.',
  keywords: 'HR technology, talent acquisition, culture fit, employee engagement, hiring platform',
  openGraph: {
    title: 'PxNexus — Hiring that actually feels right',
    description: 'Match candidates based on skills, values, and culture. Built for thoughtful HR teams.',
    type: 'website',
    siteName: 'PxNexus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PxNexus — Find People Who Fit, Stay, and Grow',
    description: 'Thoughtful hiring powered by skills, values, and culture matching.',
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
