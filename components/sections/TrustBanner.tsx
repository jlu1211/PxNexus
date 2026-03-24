'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n-context'

// ─── Animated counter ───────────────────────────────────────────
function parseStatValue(raw: string) {
  const m = raw.match(/^([^0-9]*)(\d[\d,.]*)(.*)$/)
  if (!m) return null
  const num = parseFloat(m[2].replace(/,/g, ''))
  if (isNaN(num)) return null
  return { num, prefix: m[1], suffix: m[3], hasComma: m[2].includes(','), isDecimal: m[2].includes('.') }
}

function AnimatedStat({ value, inView }: { value: string; inView: boolean }) {
  const parsed = parseStatValue(value)
  const [display, setDisplay] = useState(() => {
    if (!parsed) return value
    return `${parsed.prefix}0${parsed.isDecimal ? '.0' : ''}${parsed.suffix}`
  })

  useEffect(() => {
    if (!inView || !parsed) return
    const { num, prefix, suffix, hasComma, isDecimal } = parsed
    const duration = 1800
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
      const current = eased * num

      let formatted: string
      if (isDecimal) {
        formatted = current.toFixed(1)
      } else {
        const rounded = Math.round(current)
        formatted = hasComma ? rounded.toLocaleString() : String(rounded)
      }

      setDisplay(`${prefix}${formatted}${suffix}`)
      if (t < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return <>{display}</>
}

export default function TrustBanner() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsInView, setStatsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    // Separate observer for counter trigger
    const statsObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true) },
      { threshold: 0.4 }
    )
    if (statsRef.current) statsObserver.observe(statsRef.current)

    return () => { observer.disconnect(); statsObserver.disconnect() }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-forest-950 py-24 lg:py-36 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse, #5c8f72 0%, transparent 70%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(92,143,114,0.4) 20%, rgba(92,143,114,0.6) 50%, rgba(92,143,114,0.4) 80%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Eyebrow */}
        <div className="reveal text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/10 border border-sage/20">
            <span className="font-body text-xs text-sage-muted tracking-widest uppercase">{t.trust.eyebrow}</span>
          </div>
        </div>

        {/* Quote */}
        <div className="reveal text-center mb-16 lg:mb-20">
          <div className="font-display text-[96px] leading-none text-sage/10 select-none mb-[-2rem]">"</div>
          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-cream/85 leading-[1.3] max-w-3xl mx-auto mb-7 italic">
            {t.trust.quote}
          </blockquote>
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-px bg-sage/30" />
            <span className="font-body text-sm text-cream/35">{t.trust.attribution}</span>
            <div className="w-6 h-px bg-sage/30" />
          </div>
        </div>

        {/* ─── Animated stats grid ─── */}
        <div ref={statsRef} className="reveal grid grid-cols-2 lg:grid-cols-4 gap-px bg-forest-700/20 rounded-2xl overflow-hidden mb-16">
          {t.trust.stats.map((stat, i) => (
            <div key={stat.label}
              className="group bg-forest-900 hover:bg-forest-800 transition-colors duration-300 p-8 lg:p-10 text-center cursor-default">
              <div
                className="font-display text-4xl lg:text-5xl font-light text-sage-light mb-2 transition-transform duration-300 origin-bottom"
                style={{
                  opacity: statsInView ? 1 : 0,
                  transform: statsInView ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
                }}
              >
                <AnimatedStat value={stat.value} inView={statsInView} />
              </div>
              <div className="font-body text-sm font-medium text-cream/70 mb-1">{stat.label}</div>
              <div className="font-body text-xs text-cream/30">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {t.trust.testimonials.map((item, i) => (
            <div key={i}
              className="reveal group p-7 lg:p-8 rounded-2xl border border-sage/10 hover:border-sage/25 hover:bg-forest-900/60 transition-all duration-300 cursor-default"
              style={{ transitionDelay: `${i * 0.12}s` }}>

              {/* Star ripple on hover */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} viewBox="0 0 12 12" fill="none"
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-125"
                    style={{ transitionDelay: `${s * 40}ms` }}>
                    <path d="M6 1l1.2 2.6 2.8.4-2 2 .5 2.8L6 7.5 3.5 8.8l.5-2.8-2-2 2.8-.4L6 1z" fill="#c8975a" />
                  </svg>
                ))}
              </div>

              <p className="font-display text-xl lg:text-2xl font-light italic text-cream/75 leading-relaxed mb-6">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sage/15 border border-sage/20 flex items-center justify-center transition-all duration-300 group-hover:bg-sage/28 group-hover:border-sage/40">
                  <span className="font-body text-xs font-semibold text-sage-light">{item.author.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-body text-sm font-medium text-cream/70">{item.author}</div>
                  <div className="font-body text-xs text-cream/35">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust logos */}
        <div className="reveal mt-16 text-center">
          <p className="font-body text-xs text-cream/25 tracking-widest uppercase mb-7">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
            {['Brightloop', 'Meridian Co.', 'Tanaka Group', 'Foresta Inc.', 'Openfield HR'].map((name, i) => (
              <span key={name}
                className="font-display text-lg font-light text-cream/25 hover:text-cream/50 transition-colors duration-300 cursor-default"
                style={{ transitionDelay: `${i * 60}ms` }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
