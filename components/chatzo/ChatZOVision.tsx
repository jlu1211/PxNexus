'use client'

import { useEffect, useRef } from 'react'
import { chatzoTranslations, ChatZOLocale } from '@/lib/i18n-chatzo'
import { cn } from '@/lib/utils'

const statusStyles: Record<string, string> = {
  live: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  building: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  roadmap: 'bg-zinc-700/50 text-zinc-400 border-zinc-600/30',
}

const statusLabel: Record<string, Record<string, string>> = {
  live: { en: 'Live', ja: '稼働中' },
  building: { en: 'Building Now', ja: '開発中' },
  roadmap: { en: 'Roadmap', ja: 'ロードマップ' },
}

interface Props { locale: ChatZOLocale }

export default function ChatZOVision({ locale }: Props) {
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
    <section id="vision" ref={sectionRef}
      className="relative bg-zinc-950 py-24 lg:py-36 overflow-hidden">

      {/* Background: faint Z */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.025]">
        <svg viewBox="0 0 400 300" fill="none" className="w-full max-w-3xl">
          <path d="M60 60 L340 60 L60 240 L340 240"
            stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="reveal text-center mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 mb-5">
            <span className="font-body text-xs text-teal-400/80 tracking-widest uppercase">{t.vision.eyebrow}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
            {t.vision.headline}
          </h2>
          <p className="font-body text-base text-white/40 max-w-xl mx-auto leading-relaxed">{t.vision.sub}</p>
        </div>

        {/* Roadmap phases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {t.vision.phases.map((phase, i) => (
            <div key={phase.phase}
              className={`reveal group relative rounded-2xl border p-6 transition-all duration-400 hover:-translate-y-2 ${
                phase.status === 'live'
                  ? 'border-emerald-500/25 bg-emerald-500/5 hover:shadow-lg hover:shadow-emerald-500/10'
                  : phase.status === 'building'
                  ? 'border-blue-500/20 bg-blue-500/4 hover:shadow-lg hover:shadow-blue-500/8'
                  : 'border-white/8 bg-white/2 hover:border-white/12'
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}>
              {/* Phase label */}
              <div className="mb-4">
                <span className={cn('font-body text-[10px] font-semibold px-2.5 py-1 rounded-full border tracking-widest uppercase', statusStyles[phase.status])}>
                  {statusLabel[phase.status][locale]}
                </span>
              </div>
              {/* Phase number watermark */}
              <div className="absolute top-4 right-5 font-display text-5xl font-light text-white/[0.04] select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-body text-xs text-white/35 mb-2 tracking-wide">{phase.phase}</div>
              <h3 className="font-body text-base font-semibold text-white mb-3">{phase.title}</h3>
              <p className="font-body text-sm text-white/40 leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="reveal">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/3 mb-4">
              <span className="font-body text-xs text-white/40 tracking-widest uppercase">{t.stack.eyebrow}</span>
            </div>
            <h3 className="font-display text-3xl lg:text-4xl font-light text-white">{t.stack.headline}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {t.stack.items.map((item, i) => (
              <div key={item.layer}
                className="reveal flex items-start gap-4 p-5 rounded-xl border border-white/6 hover:border-teal-500/20 transition-colors group"
                style={{ transitionDelay: `${i * 0.06}s` }}>
                <div className="flex-shrink-0 w-1 h-10 rounded-full bg-teal-500/30 group-hover:bg-teal-500/60 transition-colors" />
                <div>
                  <div className="font-body text-xs font-semibold text-teal-400/70 tracking-widest uppercase mb-1">{item.layer}</div>
                  <div className="font-body text-sm font-semibold text-white mb-0.5">{item.tech}</div>
                  <div className="font-body text-xs text-white/35">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
