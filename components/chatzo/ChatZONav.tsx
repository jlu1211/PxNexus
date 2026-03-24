'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { chatzoTranslations, ChatZOLocale } from '@/lib/i18n-chatzo'

interface Props {
  locale: ChatZOLocale
  setLocale: (l: ChatZOLocale) => void
}

export default function ChatZONav({ locale, setLocale }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const t = chatzoTranslations[locale].nav

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: t.howItWorks, href: '#workflow' },
    { label: t.features, href: '#features' },
    { label: t.vision, href: '#vision' },
  ]

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
      'pt-[env(safe-area-inset-top,0px)]',
      scrolled ? 'bg-zinc-950/95 backdrop-blur-md border-b border-teal-500/12 py-3' : 'bg-transparent py-5'
    )}>
      <nav
        className={cn(
          'max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3',
          'pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))]',
          'lg:px-12',
        )}
      >
        {/* Logo — shrink-0 keeps “ChatZO” visible when the row is tight (mobile) */}
        <a href="/chatzo" className="flex shrink-0 items-center gap-2 sm:gap-2.5 min-w-0 group">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              {/* Z shape */}
              <path d="M4 5h12L4 15h12" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-baseline gap-0.5 whitespace-nowrap">
            <span className="font-body text-base sm:text-lg font-semibold text-white tracking-tight">Chat</span>
            <span className="font-body text-base sm:text-lg font-bold text-teal-400 tracking-tight">ZO</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="font-body text-sm text-white/50 hover:text-white transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a href="/" className="font-body text-sm text-white/30 hover:text-white/60 transition-colors">
              ← PxNexus
            </a>
          </li>
        </ul>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Lang toggle */}
          <div className="flex items-center gap-0.5 border border-teal-500/20 rounded-full px-1 py-1">
            {(['en', 'ja'] as ChatZOLocale[]).map((l) => (
              <button key={l} onClick={() => setLocale(l)}
                className={cn('font-body text-xs px-2.5 py-1 rounded-full transition-all duration-200',
                  locale === l ? 'bg-teal-500 text-zinc-900 font-semibold' : 'text-white/45 hover:text-white'
                )}>
                {l === 'en' ? 'EN' : '日本語'}
              </button>
            ))}
          </div>
          <a href="#cta"
            className="btn-shimmer font-body text-sm font-medium px-5 py-2.5 rounded-lg bg-teal-500 text-zinc-900 hover:bg-teal-400 transition-colors">
            {t.getStarted}
          </a>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-0.5 border border-teal-500/20 rounded-full px-1 py-0.5">
            {(['en', 'ja'] as ChatZOLocale[]).map((l) => (
              <button key={l} onClick={() => setLocale(l)}
                className={cn('font-body text-xs px-2 py-0.5 rounded-full transition-all',
                  locale === l ? 'bg-teal-500 text-zinc-900' : 'text-white/40'
                )}>
                {l === 'en' ? 'EN' : 'JP'}
              </button>
            ))}
          </div>
          <button onClick={() => setOpen(!open)} className="flex flex-col gap-1.5 p-2">
            <span className={cn('w-5 h-px bg-white transition-all', open && 'rotate-45 translate-y-2')} />
            <span className={cn('w-5 h-px bg-white transition-all', open && 'opacity-0')} />
            <span className={cn('w-5 h-px bg-white transition-all', open && '-rotate-45 -translate-y-2')} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn('lg:hidden overflow-hidden transition-all duration-300', open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0')}>
        <div
          className={cn(
            'bg-zinc-900/98 border-t border-teal-500/10 py-5 flex flex-col gap-3',
            'pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))]',
          )}
        >
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="font-body text-sm text-white/60 hover:text-white py-1.5">{l.label}</a>
          ))}
          <div className="pt-3 border-t border-teal-500/10">
            <a href="#cta" onClick={() => setOpen(false)}
              className="block w-full text-center font-body text-sm font-medium px-5 py-3 rounded-lg bg-teal-500 text-zinc-900">
              {t.getStarted}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
