'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { useI18n } from '@/lib/i18n-context'

const pillarIcons = [
  <svg key="p" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="ph" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M12 3L4.5 7.5v9L12 21l7.5-4.5v-9L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 3v18M4.5 7.5l7.5 4.5 7.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="pa" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M12 21C12 21 4 14.5 4 9a8 8 0 0116 0c0 5.5-8 12-8 12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
]

function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  let rafId = 0

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      const el = cardRef.current
      const sp = spotRef.current
      if (!el || !sp) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rotX = (y - 0.5) * -10
      const rotY = (x - 0.5) * 12
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.01)`
      sp.style.background = `radial-gradient(220px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.05), transparent 70%)`
    })
  }

  const handleLeave = () => {
    cancelAnimationFrame(rafId)
    const el = cardRef.current
    const sp = spotRef.current
    if (el) el.style.transform = ''
    if (sp) sp.style.background = 'transparent'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        willChange: 'transform',
        transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease',
        ...style,
      }}
      className={className}
    >
      {/* Spotlight layer */}
      <div ref={spotRef} className="absolute inset-0 pointer-events-none rounded-2xl z-10 transition-none" />
      {children}
    </div>
  )
}

export default function ThePxFramework() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '-30px' }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="framework"
      ref={sectionRef}
      className="relative bg-cream py-24 lg:py-36 overflow-hidden"
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.07] pointer-events-none">
        <svg viewBox="0 0 192 192" fill="none">
          <ellipse cx="160" cy="32" rx="80" ry="40" fill="#173020" transform="rotate(-30 160 32)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="reveal text-center mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-800/8 border border-forest-700/15 mb-6">
            <span className="font-body text-xs text-forest-700/70 tracking-widest uppercase">
              {t.framework.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-forest-900 leading-tight mb-4">
            {t.framework.headline}
          </h2>
          <p className="font-body text-base sm:text-lg text-forest-700/60 max-w-xl mx-auto leading-relaxed">
            {t.framework.sub}
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {t.framework.pillars.map((pillar, i) => {
            const featured = 'featured' in pillar && pillar.featured
            return (
              <TiltCard
                key={pillar.label}
                className={`reveal group relative rounded-2xl overflow-hidden ${
                  featured ? 'bg-forest-800' : 'bg-forest-700'
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {featured && (
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-sage/25 pointer-events-none z-20" />
                )}

                {/* Top color band */}
                <div className="h-1 w-full" style={{
                  background: featured
                    ? 'linear-gradient(90deg, #5c8f72, #a0c8b2, #5c8f72)'
                    : 'linear-gradient(90deg, #c8975a, #eecf94, #c8975a)',
                }} />

                <div className="p-8 lg:p-10 flex flex-col h-full relative z-0">
                  {/* Icon + badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                      featured ? 'bg-sage/15 text-sage-light' : 'bg-amber/12 text-amber-light'
                    }`}>
                      {pillarIcons[i]}
                    </div>
                    {featured && (
                      <span className="font-body text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-sage/15 text-sage-muted border border-sage/20">
                        Core
                      </span>
                    )}
                  </div>

                  {/* Watermark letter */}
                  <div className="absolute bottom-6 right-6 font-display text-9xl font-light leading-none select-none pointer-events-none"
                    style={{ color: featured ? 'rgba(92,143,114,0.06)' : 'rgba(200,151,90,0.06)' }}>
                    {pillar.letter}
                  </div>

                  <h3 className="font-display text-3xl lg:text-4xl font-medium text-cream mb-2 transition-colors">
                    {pillar.label}
                  </h3>
                  <p className={`font-display text-base italic mb-5 ${featured ? 'text-sage-muted' : 'text-amber-light'}`}>
                    {pillar.tagline}
                  </p>
                  <p className="font-body text-sm text-cream/50 leading-relaxed mb-7 flex-1">
                    {pillar.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2">
                    {pillar.features.map((f, fi) => (
                      <li key={f} className="flex items-center gap-2.5 opacity-0 group-[.tilt-visible]:opacity-100"
                        style={{ animation: 'none', transitionDelay: `${fi * 80}ms` }}>
                        <svg viewBox="0 0 12 12" fill="none" className={`w-3.5 h-3.5 flex-shrink-0 ${featured ? 'text-sage' : 'text-amber'}`}>
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-body text-xs text-cream/45">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom slide-in line */}
                  <div className="mt-8 h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
                    style={{ background: featured ? 'linear-gradient(90deg, #5c8f72, transparent)' : 'linear-gradient(90deg, #c8975a, transparent)' }} />
                </div>
              </TiltCard>
            )
          })}
        </div>

        {/* Footnote */}
        <div className="reveal mt-12 text-center">
          <p className="font-display text-lg italic text-forest-700/40">{t.framework.footnote}</p>
        </div>
      </div>
    </section>
  )
}
