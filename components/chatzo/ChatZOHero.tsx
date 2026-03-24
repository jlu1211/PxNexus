'use client'

import { chatzoTranslations, ChatZOLocale } from '@/lib/i18n-chatzo'

interface Props { locale: ChatZOLocale }

export default function ChatZOHero({ locale }: Props) {
  const t = chatzoTranslations[locale].hero

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-20">
      {/* ─── Background: grid + glow ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(rgba(45,212,191,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.6) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }} />
        {/* Center teal glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-[0.12]"
          style={{ background: 'radial-gradient(ellipse, #2dd4bf 0%, transparent 70%)' }} />
        {/* Corner glow */}
        <div className="absolute -top-20 -right-20 w-96 h-96 opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #2dd4bf 0%, transparent 65%)' }} />
      </div>

      {/* ─── Animated Z motif ─── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 600 400" className="w-full h-full max-w-4xl opacity-[0.06]" fill="none">
          <path d="M100 80 L500 80 L100 320 L500 320"
            stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="nexus-line" />
          <path d="M100 80 L500 80 L100 320 L500 320"
            stroke="#2dd4bf" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
            filter="url(#z-glow)" className="nexus-line"
            style={{ animationDelay: '0s' }} />
          <defs>
            <filter id="z-glow"><feGaussianBlur stdDeviation="8" /></filter>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/25 bg-teal-500/8 mb-10 opacity-0"
          style={{ animation: 'fadeUp 0.6s ease 0.2s forwards' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="font-body text-xs text-teal-300 tracking-wide font-medium">{t.badge}</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-light text-white leading-[1.05] tracking-tight mb-6 opacity-0"
          style={{ animation: 'fadeUp 0.85s ease 0.4s forwards' }}>
          {t.headline1}
          <br />
          <span className="font-normal italic" style={{
            background: 'linear-gradient(135deg, #2dd4bf 0%, #67e8f9 50%, #2dd4bf 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t.headline2}
          </span>
        </h1>

        {/* Sub */}
        <p className="font-body text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed opacity-0"
          style={{ animation: 'fadeUp 0.8s ease 0.65s forwards' }}>
          {t.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 opacity-0"
          style={{ animation: 'fadeUp 0.7s ease 0.85s forwards' }}>
          <a href="#workflow"
            className="btn-shimmer group inline-flex items-center gap-2 font-body text-sm font-medium px-7 py-3.5 rounded-xl bg-teal-500 text-zinc-900 hover:bg-teal-400 transition-all duration-300 shadow-lg shadow-teal-500/20">
            {t.cta1}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#cta"
            className="inline-flex items-center gap-2 font-body text-sm font-medium px-7 py-3.5 rounded-xl border border-white/15 text-white/65 hover:border-teal-500/40 hover:text-white transition-all duration-300">
            {t.cta2}
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto opacity-0"
          style={{ animation: 'fadeUp 0.7s ease 1.1s forwards' }}>
          {[t.stat1, t.stat2, t.stat3].map((s) => (
            <div key={s.label}
              className="py-4 px-3 rounded-xl border border-teal-500/15 bg-teal-500/5 text-center">
              <div className="font-body text-xl font-semibold text-teal-300 mb-1">{s.value}</div>
              <div className="font-body text-xs text-white/35 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #09090b)' }} />
    </section>
  )
}
