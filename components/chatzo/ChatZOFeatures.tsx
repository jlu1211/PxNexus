'use client'

import { useEffect, useRef } from 'react'
import { chatzoTranslations, ChatZOLocale } from '@/lib/i18n-chatzo'

const icons: Record<string, React.ReactNode> = {
  ocr: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 7h3M5 10h10M5 13h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 6l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>
  ),
  review: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <path d="M4 10.5L8 14.5L16 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  rules: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <path d="M3 5h14M3 10h10M3 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 12l2 2-2 2M15 16l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <path d="M3 15l4-5 3 3 3-6 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  integration: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
      <circle cx="5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.2 6.2L12.8 6.2M6.5 7L10 13M13.5 7L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

interface Props { locale: ChatZOLocale }

export default function ChatZOFeatures({ locale }: Props) {
  const t = chatzoTranslations[locale]
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.07 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef}
      className="relative bg-zinc-900 py-24 lg:py-36 overflow-hidden">

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.3) 30%, rgba(45,212,191,0.5) 50%, rgba(45,212,191,0.3) 70%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="reveal text-center mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 mb-5">
            <span className="font-body text-xs text-teal-400/80 tracking-widest uppercase">{t.features.eyebrow}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
            {t.features.headline}
          </h2>
          <p className="font-body text-base text-white/40 max-w-xl mx-auto leading-relaxed">{t.features.sub}</p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {t.features.cards.map((card, i) => (
            <div key={card.title}
              className="reveal group p-6 rounded-xl border border-white/6 hover:border-teal-500/25 hover:bg-teal-500/4 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 group-hover:bg-teal-500/15 transition-colors">
                {icons[card.icon]}
              </div>
              <h3 className="font-body text-base font-semibold text-white mb-2">{card.title}</h3>
              <p className="font-body text-sm text-white/40 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="reveal">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/3 mb-4">
              <span className="font-body text-xs text-white/40 tracking-widest uppercase">{t.compare.eyebrow}</span>
            </div>
            <h3 className="font-display text-3xl lg:text-4xl font-light text-white">{t.compare.headline}</h3>
          </div>

          <div className="rounded-2xl border border-white/8 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-white/4">
              <div className="px-5 py-3.5 font-body text-xs font-semibold text-white/40 tracking-widest uppercase border-r border-white/6">
                {locale === 'ja' ? '項目' : 'Area'}
              </div>
              <div className="px-5 py-3.5 font-body text-xs font-semibold text-red-400/60 tracking-widest uppercase border-r border-white/6">
                {locale === 'ja' ? '従来の方法' : 'Before ChatZO'}
              </div>
              <div className="px-5 py-3.5 font-body text-xs font-semibold text-teal-400/80 tracking-widest uppercase">
                {locale === 'ja' ? 'ChatZO導入後' : 'With ChatZO'}
              </div>
            </div>
            {t.compare.rows.map((row, i) => (
              <div key={row.aspect}
                className={`grid grid-cols-3 border-t border-white/5 hover:bg-white/2 transition-colors ${i % 2 === 0 ? 'bg-white/1' : ''}`}>
                <div className="px-5 py-4 font-body text-sm font-medium text-white/70 border-r border-white/5">
                  {row.aspect}
                </div>
                <div className="px-5 py-4 font-body text-sm text-white/35 border-r border-white/5 flex items-start gap-2">
                  <span className="text-red-400/50 mt-0.5 flex-shrink-0">✗</span>
                  {row.before}
                </div>
                <div className="px-5 py-4 font-body text-sm text-teal-300/70 flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5 flex-shrink-0">✓</span>
                  {row.after}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
