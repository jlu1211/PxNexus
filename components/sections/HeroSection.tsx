'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n-context'

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 38)
    return () => clearInterval(interval)
  }, [started, text])

  return (
    <>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-0.5 h-[0.85em] bg-amber align-middle ml-1 animate-pulse" />
      )}
    </>
  )
}

export default function HeroSection() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let rafId = 0

    // Parallax orbs on scroll
    const onScroll = () => {
      const y = window.scrollY
      const orb1 = el.querySelector<HTMLElement>('.orb-1')
      const orb2 = el.querySelector<HTMLElement>('.orb-2')
      if (orb1) orb1.style.transform = `translateY(${y * 0.12}px)`
      if (orb2) orb2.style.transform = `translateY(${y * -0.08}px)`
    }

    // Mouse-tracking torch glow
    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (!glowRef.current || !el) return
        const rect = el.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        glowRef.current.style.background =
          `radial-gradient(600px circle at ${x}% ${y}%, rgba(200,151,90,0.07) 0%, rgba(92,143,114,0.04) 40%, transparent 70%)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('scroll', onScroll)
      el.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forest-950"
    >
      {/* ─── Mouse-tracking torch glow ─── */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-none z-0"
        style={{ background: 'radial-gradient(600px circle at 50% 40%, rgba(200,151,90,0.04) 0%, transparent 70%)' }}
      />

      {/* ─── Ambient orbs ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 blob-animate absolute -left-40 top-16 w-[560px] h-[560px] opacity-[0.18]"
          style={{ background: 'radial-gradient(circle, rgba(92,143,114,0.5) 0%, transparent 70%)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
        <div className="orb-2 blob-animate absolute -right-32 bottom-16 w-[480px] h-[480px] opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, rgba(200,151,90,0.5) 0%, transparent 70%)', borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%', animationDelay: '-4s' }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(92,143,114,0.8) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      {/* ─── Nexus SVG ─── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 700 560" className="w-full h-full max-w-4xl opacity-[0.22]" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="hero-line-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5c8f72" stopOpacity="0" />
              <stop offset="40%" stopColor="#5c8f72" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#a0c8b2" stopOpacity="1" />
              <stop offset="100%" stopColor="#5c8f72" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-line-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c8975a" stopOpacity="0" />
              <stop offset="40%" stopColor="#c8975a" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#eecf94" stopOpacity="1" />
              <stop offset="100%" stopColor="#c8975a" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="hero-center" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#eecf94" stopOpacity="1" />
              <stop offset="50%" stopColor="#c8975a" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c8975a" stopOpacity="0" />
            </radialGradient>
            <filter id="hero-glow"><feGaussianBlur stdDeviation="6" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
          </defs>
          <line className="nexus-line" x1="80" y1="50" x2="620" y2="510" stroke="url(#hero-line-1)" strokeWidth="1.5" strokeLinecap="round" />
          <line className="nexus-line" x1="80" y1="50" x2="620" y2="510" stroke="url(#hero-line-1)" strokeWidth="5" strokeLinecap="round" filter="url(#hero-glow)" opacity="0.25" />
          <line className="nexus-line nexus-line-delay" x1="620" y1="50" x2="80" y2="510" stroke="url(#hero-line-2)" strokeWidth="1.5" strokeLinecap="round" />
          <line className="nexus-line nexus-line-delay" x1="620" y1="50" x2="80" y2="510" stroke="url(#hero-line-2)" strokeWidth="5" strokeLinecap="round" filter="url(#hero-glow)" opacity="0.25" />
          <circle className="nexus-dot" cx="350" cy="280" r="10" fill="url(#hero-center)" />
          <circle cx="350" cy="280" r="24" fill="url(#hero-center)" opacity="0.2" filter="url(#hero-glow)" />
        </svg>
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center pt-20">
        {/* Company Name */}
        <div className="mb-6 opacity-0" style={{ animation: 'fadeUp 0.6s ease 0.1s forwards' }}>
          <span className="font-display text-2xl sm:text-3xl tracking-[0.4em] uppercase text-sage-muted/80">PxNexus</span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage/25 bg-sage/8 mb-10 opacity-0"
          style={{ animation: 'fadeUp 0.6s ease 0.3s forwards' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-sage-light animate-pulse" />
          <span className="font-body text-xs text-sage-light tracking-wide">{t.hero.eyebrow}</span>
        </div>

        {/* Headline — typewriter on line 2 */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-cream leading-[1.08] tracking-tight mb-6 opacity-0"
          style={{ animation: 'fadeUp 0.85s ease 0.5s forwards' }}>
          {t.hero.headline1}
          <br />
          <span className="italic font-normal text-amber-gradient">
            <TypewriterText text={t.hero.headline2} delay={1200} />
          </span>
        </h1>

        {/* Sub */}
        <p className="font-body text-base sm:text-lg text-cream/55 max-w-xl mx-auto mb-4 leading-relaxed opacity-0"
          style={{ animation: 'fadeUp 0.8s ease 0.7s forwards' }}>
          {t.hero.sub}
        </p>
        <p className="font-display text-lg sm:text-xl italic text-cream/35 mb-12 opacity-0"
          style={{ animation: 'fadeUp 0.8s ease 0.85s forwards' }}>
          {t.hero.body}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 opacity-0"
          style={{ animation: 'fadeUp 0.7s ease 1.0s forwards' }}>
          <a href="#platform"
            className="btn-shimmer group inline-flex items-center gap-2 font-body text-sm font-medium px-7 py-3.5 rounded-xl bg-sage text-forest-900 hover:bg-sage-light transition-all duration-300 shadow-lg shadow-sage/20 hover:shadow-sage/30 hover:scale-[1.02]">
            {t.hero.cta1}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#framework"
            className="inline-flex items-center gap-2 font-body text-sm font-medium px-7 py-3.5 rounded-xl border border-cream/15 text-cream/70 hover:border-cream/35 hover:text-cream hover:bg-white/4 transition-all duration-300">
            {t.hero.cta2}
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-0"
          style={{ animation: 'fadeIn 1s ease 1.5s forwards' }}>
          <div className="w-px h-10 bg-gradient-to-b from-sage/40 to-transparent animate-float" />
          <span className="font-body text-[10px] tracking-widest uppercase text-cream/20">{t.hero.scroll}</span>
        </div>
      </div>

      {/* ─── Trust chips ─── */}
      <div className="absolute bottom-10 left-6 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800/60 backdrop-blur-sm border border-sage/12 opacity-0 hover:border-sage/25 transition-colors cursor-default"
        style={{ animation: 'fadeIn 0.8s ease 1.8s forwards' }}>
        <div className="flex -space-x-1.5">
          {['#2d5a45', '#336540', '#5c8f72'].map((c, i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-forest-800 flex items-center justify-center" style={{ background: c }}>
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                <circle cx="6" cy="5" r="2" fill="rgba(255,255,255,0.7)" />
                <path d="M2 10c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </div>
        <span className="font-body text-xs text-cream/60">1,200+ teams hiring with PxNexus</span>
      </div>

      <div className="absolute bottom-10 right-6 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800/60 backdrop-blur-sm border border-sage/12 opacity-0 hover:border-sage/25 transition-colors cursor-default"
        style={{ animation: 'fadeIn 0.8s ease 2s forwards' }}>
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-amber">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.1 5.2l4-.6L8 1z" fill="currentColor" />
        </svg>
        <span className="font-body text-xs text-cream/60">Rated 4.9 / 5 by HR teams</span>
      </div>
    </section>
  )
}
