'use client'

import { useEffect, useRef } from 'react'
import { chatzoTranslations, ChatZOLocale } from '@/lib/i18n-chatzo'

const stepColors = [
  'border-blue-500/30 bg-blue-500/5 text-blue-400',
  'border-violet-500/30 bg-violet-500/5 text-violet-400',
  'border-orange-400/30 bg-orange-400/5 text-orange-300',
  'border-teal-400/30 bg-teal-400/5 text-teal-300',
  'border-yellow-400/30 bg-yellow-400/5 text-yellow-300',
  'border-emerald-400/30 bg-emerald-400/5 text-emerald-300',
  'border-teal-500/40 bg-teal-500/10 text-teal-300',
]

const stepDots = ['#60a5fa', '#a78bfa', '#fb923c', '#2dd4bf', '#facc15', '#34d399', '#2dd4bf']

interface Props { locale: ChatZOLocale }

export default function ChatZOWorkflow({ locale }: Props) {
  const t = chatzoTranslations[locale].workflow
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
    <section id="workflow" ref={sectionRef}
      className="relative bg-zinc-950 py-24 lg:py-36 overflow-hidden">

      {/* Subtle left border glow */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-px opacity-30"
        style={{ background: 'linear-gradient(to bottom, transparent, #2dd4bf, transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="reveal text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 mb-5">
            <span className="font-body text-xs text-teal-400/80 tracking-widest uppercase">{t.eyebrow}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
            {t.headline}
          </h2>
          <p className="font-body text-base text-white/40 max-w-xl mx-auto leading-relaxed">{t.sub}</p>
        </div>

        {/* Pipeline: vertical on mobile, visual flow on desktop */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(45,212,191,0.2) 5%, rgba(45,212,191,0.2) 95%, transparent 100%)' }} />

          <div className="space-y-4 lg:space-y-0">
            {t.steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={step.id}
                  className={`reveal relative flex items-start gap-4 lg:gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  style={{ transitionDelay: `${i * 0.08}s` }}>

                  {/* Card — takes half width on desktop */}
                  <div className={`w-full lg:w-[calc(50%-2rem)] ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className={`group rounded-xl border p-5 lg:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${stepColors[i]}`}
                      style={{ borderColor: `${stepDots[i]}22`, background: `${stepDots[i]}07` }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-body text-xs font-bold tracking-widest" style={{ color: stepDots[i] }}>
                            {step.id}
                          </span>
                          <span className="font-body text-[10px] px-2 py-0.5 rounded-full border"
                            style={{ borderColor: `${stepDots[i]}30`, color: stepDots[i], background: `${stepDots[i]}10` }}>
                            {step.tag}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-body text-base font-semibold text-white mb-0.5">{step.titleJa}</h3>
                      <p className="font-body text-xs text-white/35 mb-3">{step.title}</p>
                      <p className="font-body text-sm text-white/50 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot — desktop only */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 border-zinc-950 items-center justify-center z-10"
                    style={{ background: stepDots[i] }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block w-[calc(50%-2rem)]" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Pipeline summary */}
        <div className="reveal mt-16 flex flex-wrap items-center justify-center gap-2 text-center">
          {['PDF', 'Image', 'OCR', 'Text', 'LLM', 'JSON', 'Validate', 'UI', 'CSV'].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="font-body text-xs px-3 py-1.5 rounded-lg border border-teal-500/15 text-teal-400/70 bg-teal-500/5">
                {step}
              </span>
              {i < arr.length - 1 && (
                <svg viewBox="0 0 12 8" fill="none" className="w-3 h-3 text-teal-500/30">
                  <path d="M1 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
