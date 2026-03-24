'use client'

import { useState } from 'react'
import { ChatZOLocale } from '@/lib/i18n-chatzo'
import ChatZONav from '@/components/chatzo/ChatZONav'
import ChatZOHero from '@/components/chatzo/ChatZOHero'
import ChatZOWorkflow from '@/components/chatzo/ChatZOWorkflow'
import ChatZODemo from '@/components/chatzo/ChatZODemo'
import ChatZOFeatures from '@/components/chatzo/ChatZOFeatures'
import ChatZOVision from '@/components/chatzo/ChatZOVision'
import ChatZOCTA from '@/components/chatzo/ChatZOCTA'

export default function ChatZOPage() {
  const [locale, setLocale] = useState<ChatZOLocale>('ja')

  return (
    <>
      {/* Nav outside overflow-x-hidden main — fixed headers can be clipped on mobile Safari otherwise */}
      <ChatZONav locale={locale} setLocale={setLocale} />
      <main className="relative overflow-x-hidden bg-zinc-950">
        <ChatZOHero locale={locale} />
        <ChatZOWorkflow locale={locale} />
        <ChatZODemo locale={locale} />
        <ChatZOFeatures locale={locale} />
        <ChatZOVision locale={locale} />
        <ChatZOCTA locale={locale} />

        {/* Footer */}
        <footer className="bg-zinc-950 border-t border-white/5 py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-teal-500/15 border border-teal-500/20 flex items-center justify-center">
                <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
                  <path d="M2 3h10L2 11h10" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-body text-sm font-semibold text-white">
                Chat<span className="text-teal-400">ZO</span>
              </span>
            </div>
            <p className="font-body text-xs text-white/25">© 2026 ChatZO / PxNexus. All rights reserved.</p>
            <p className="font-display text-xs italic text-teal-500/25">
              {locale === 'ja' ? '年末調整を、もっとスマートに。' : 'HR automation, built for Japan.'}
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
