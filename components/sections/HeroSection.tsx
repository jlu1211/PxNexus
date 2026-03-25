'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n-context'
import { PxNexusWordmark } from '@/components/branding/PxNexusWordmark'
import { cn } from '@/lib/utils'

/* ─── Typewriter ─── */
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

/* ─── Canvas particle types ─── */
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  isAmber: boolean
  brightness: number
}

/* ─── AI Terminal steps ─── */
type TerminalStep = {
  prefix: string
  text: string
  delay: number
  isSuccess?: boolean
}

const TERMINAL_STEPS: Record<string, TerminalStep[]> = {
  en: [
    { prefix: '> ', text: 'Scanning: 承認フロー',       delay: 500 },
    { prefix: '> ', text: 'Manual steps found: 7',     delay: 900 },
    { prefix: '> ', text: 'Automatable: 5 / 7 (71%)',  delay: 700 },
    { prefix: '> ', text: 'Estimated reduction: -62%', delay: 800 },
    { prefix: '✓ ', text: 'Redesign plan ready',       delay: 500, isSuccess: true },
  ],
  ja: [
    { prefix: '> ', text: 'スキャン中: 承認フロー',      delay: 500 },
    { prefix: '> ', text: '手動ステップ検出: 7件',       delay: 900 },
    { prefix: '> ', text: '自動化可能: 5 / 7 (71%)',    delay: 700 },
    { prefix: '> ', text: '削減予測: -62% 工数',        delay: 800 },
    { prefix: '✓ ', text: '再設計プランを生成しました',   delay: 500, isSuccess: true },
  ],
}

/* ─── Canvas neural network helpers ─── */
function initParticles(w: number, h: number): Particle[] {
  const count = w < 768 ? 30 : 60
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: 1.5 + Math.random() * 2.5,
    isAmber: Math.random() < 0.12,
    brightness: 0,
  }))
}

/* ─── HeroSection ─── */
export default function HeroSection() {
  const { t, locale } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosRef = useRef({ x: -9999, y: -9999 })

  // Terminal state
  const [terminalLines, setTerminalLines] = useState<TerminalStep[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'resetting'>('typing')
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  /* ─── Mouse glow + parallax ─── */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let rafId = 0

    const onScroll = () => {
      const y = window.scrollY
      const orb1 = el.querySelector<HTMLElement>('.orb-1')
      const orb2 = el.querySelector<HTMLElement>('.orb-2')
      if (orb1) orb1.style.transform = `translateY(${y * 0.12}px)`
      if (orb2) orb2.style.transform = `translateY(${y * -0.08}px)`
    }

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (!glowRef.current || !el) return
        const rect = el.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        glowRef.current.style.background =
          `radial-gradient(600px circle at ${x}% ${y}%, rgba(200,151,90,0.07) 0%, rgba(92,143,114,0.04) 40%, transparent 70%)`
        mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
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

  /* ─── Canvas neural network ─── */
  useEffect(() => {
    const canvas = canvasRef.current
    const el = sectionRef.current
    if (!canvas || !el) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const CONNECTION_DIST = 120
    let animId = 0
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = el.offsetWidth
      canvas.height = el.offsetHeight
      particles = initParticles(canvas.width, canvas.height)
    }
    resize()

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mousePosRef.current

      for (const p of particles) {
        if (!prefersReduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > canvas.width)  { p.vx *= -0.98; p.x = Math.max(0, Math.min(canvas.width,  p.x)) }
          if (p.y < 0 || p.y > canvas.height) { p.vy *= -0.98; p.y = Math.max(0, Math.min(canvas.height, p.y)) }

          const dx = mx - p.x
          const dy = my - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            p.brightness = Math.min(1, p.brightness + 0.05)
            p.vx += (dx / dist) * 0.015
            p.vy += (dy / dist) * 0.015
          } else {
            p.brightness = Math.max(0, p.brightness - 0.02)
          }
          // Clamp velocity
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
          if (speed > 0.6) { p.vx = (p.vx / speed) * 0.6; p.vy = (p.vy / speed) * 0.6 }
        }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.35
            const isAmberLine = a.isAmber && b.isAmber
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = isAmberLine
              ? `rgba(200,151,90,${opacity})`
              : `rgba(92,143,114,${opacity})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const p of particles) {
        const alpha = 0.3 + p.brightness * 0.5
        const glowColor = p.isAmber ? `rgba(200,151,90,${alpha})` : `rgba(92,143,114,${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = glowColor
        if (p.brightness > 0.5) {
          ctx.shadowBlur = 8
          ctx.shadowColor = p.isAmber ? 'rgba(200,151,90,0.6)' : 'rgba(92,143,114,0.6)'
        } else {
          ctx.shadowBlur = 0
        }
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    if (prefersReduced) {
      drawFrame()
    } else {
      const loop = () => {
        drawFrame()
        animId = requestAnimationFrame(loop)
      }
      animId = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize, { passive: true })
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ─── Terminal state machine ─── */
  useEffect(() => {
    const steps = TERMINAL_STEPS[locale] ?? TERMINAL_STEPS['en']

    // Clear all pending timeouts on re-run
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setTerminalLines([])
    setCurrentLine(0)
    setTypedText('')
    setPhase('typing')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTerminalLines(steps)
      return
    }

    let lineIdx = 0
    let charIdx = 0
    let currentTyped = ''
    let cancelled = false

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => { if (!cancelled) fn() }, ms)
      timeoutsRef.current.push(id)
    }

    const typeNextChar = () => {
      const step = steps[lineIdx]
      if (charIdx < step.text.length) {
        charIdx++
        currentTyped = step.text.slice(0, charIdx)
        setTypedText(currentTyped)
        schedule(typeNextChar, 45)
      } else {
        // Line complete — push to completed lines
        const completedStep = step
        setTerminalLines(prev => [...prev, completedStep])
        setTypedText('')
        charIdx = 0
        currentTyped = ''
        lineIdx++
        setCurrentLine(lineIdx)

        if (lineIdx < steps.length) {
          schedule(startNextLine, steps[lineIdx].delay)
        } else {
          // All lines done — pause then reset
          schedule(() => {
            setPhase('pausing')
            schedule(() => {
              setPhase('resetting')
              schedule(() => {
                lineIdx = 0
                charIdx = 0
                currentTyped = ''
                setTerminalLines([])
                setCurrentLine(0)
                setTypedText('')
                setPhase('typing')
                schedule(startNextLine, steps[0].delay)
              }, 300)
            }, 2500)
          }, 0)
        }
      }
    }

    const startNextLine = () => {
      schedule(typeNextChar, 0)
    }

    schedule(startNextLine, steps[0].delay)

    return () => {
      cancelled = true
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [locale])

  const steps = TERMINAL_STEPS[locale] ?? TERMINAL_STEPS['en']

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

      {/* ─── Canvas neural network ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ─── Nexus SVG ─── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 700 560" className="w-[min(96vw,72rem)] h-auto max-h-[85vh] sm:w-[min(94vw,80rem)] opacity-[0.26]" fill="none" preserveAspectRatio="xMidYMid meet">
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
        <div className="mb-8 opacity-0" style={{ animation: 'fadeUp 0.6s ease 0.1s forwards' }}>
          <PxNexusWordmark
            variant="on-dark"
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight"
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage/25 bg-sage/8 mb-10 opacity-0"
          style={{ animation: 'fadeUp 0.6s ease 0.3s forwards' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-sage-light animate-pulse" />
          <span className="font-body text-xs text-sage-light tracking-wide">{t.hero.eyebrow}</span>
        </div>

        {/* Headline */}
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

      {/* ─── AI Terminal Demo Card (desktop only) ─── */}
      <div className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 z-20 w-72 xl:w-80 opacity-0"
        style={{ animation: 'fadeIn 0.8s ease 2.2s forwards' }}>
        <div className="relative rounded-xl border border-sage/30 bg-forest-800/85 backdrop-blur-md p-4 ai-glow font-mono text-xs overflow-hidden">
          {/* Scan line */}
          <div className="scan-overlay" aria-hidden="true" />

          {/* Top bar */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-sage/15">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400/50" />
              <div className="w-2 h-2 rounded-full bg-amber/40" />
              <div className="w-2 h-2 rounded-full bg-sage/40" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-sage/15 border border-sage/25 text-sage-light text-[9px] tracking-wider uppercase">
              AI Analysis
            </span>
          </div>

          {/* Command line */}
          <div className="text-sage/50 mb-3 leading-relaxed">
            <span className="text-sage-light">$</span>{' '}
            <span className="text-cream/40">pxnexus analyze --target hr-ops</span>
          </div>

          {/* Completed lines */}
          {terminalLines.map((line, i) => (
            <div key={i} className={cn(
              'mb-1 leading-relaxed',
              line.isSuccess ? 'text-sage-light' : 'text-cream/60'
            )}>
              <span className={line.isSuccess ? 'text-sage font-bold' : 'text-amber/70'}>
                {line.prefix}
              </span>
              {line.text}
            </div>
          ))}

          {/* Currently typing line */}
          {phase !== 'resetting' && currentLine < steps.length && (
            <div className="mb-1 leading-relaxed text-cream/60">
              <span className="text-amber/70">{steps[currentLine].prefix}</span>
              {typedText}
              <span className="terminal-cursor" />
            </div>
          )}

          {/* Progress bar */}
          {phase !== 'resetting' && (
            <div className="mt-3 pt-2 border-t border-sage/10">
              <div className="h-0.5 rounded-full bg-forest-900/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sage to-sage-light transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, ((terminalLines.length) / steps.length) * 100)}%` }}
                />
              </div>
            </div>
          )}
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
        <span className="font-body text-xs text-cream/60 inline-flex items-center gap-1 flex-wrap justify-center">
          <span>100+ companies redesigned with</span>
          <PxNexusWordmark variant="on-dark" className="font-display text-xs font-semibold" />
        </span>
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
