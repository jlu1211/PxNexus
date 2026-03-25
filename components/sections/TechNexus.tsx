'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n-context'
import { PxNexusWordmark } from '@/components/branding/PxNexusWordmark'

/* ─── Node icons ─── */
function CompanyIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
      <rect x="6" y="14" width="36" height="28" rx="3"
        stroke={active ? '#7db090' : 'rgba(92,143,114,0.5)'} strokeWidth="1.5"
        fill={active ? 'rgba(92,143,114,0.12)' : 'rgba(92,143,114,0.06)'}
        style={{ transition: 'all 0.4s ease' }} />
      <rect x="18" y="6" width="12" height="10" rx="2"
        stroke={active ? '#7db090' : 'rgba(92,143,114,0.4)'} strokeWidth="1.5"
        fill={active ? 'rgba(92,143,114,0.1)' : 'transparent'}
        style={{ transition: 'all 0.4s ease' }} />
      <rect x="14" y="24" width="6" height="6" rx="1"
        fill={active ? 'rgba(92,143,114,0.5)' : 'rgba(92,143,114,0.25)'}
        style={{ transition: 'all 0.4s ease' }} />
      <rect x="28" y="24" width="6" height="6" rx="1"
        fill={active ? 'rgba(92,143,114,0.5)' : 'rgba(92,143,114,0.25)'}
        style={{ transition: 'all 0.4s ease' }} />
      <rect x="19" y="34" width="10" height="8" rx="1"
        fill={active ? 'rgba(92,143,114,0.4)' : 'rgba(92,143,114,0.2)'}
        style={{ transition: 'all 0.4s ease' }} />
    </svg>
  )
}

function TalentIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
      <circle cx="24" cy="16" r="8"
        stroke={active ? '#ddb07a' : 'rgba(200,151,90,0.5)'} strokeWidth="1.5"
        fill={active ? 'rgba(200,151,90,0.12)' : 'rgba(200,151,90,0.06)'}
        style={{ transition: 'all 0.4s ease' }} />
      <path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16"
        stroke={active ? '#ddb07a' : 'rgba(200,151,90,0.5)'} strokeWidth="1.5"
        strokeLinecap="round"
        fill={active ? 'rgba(200,151,90,0.08)' : 'transparent'}
        style={{ transition: 'all 0.4s ease' }} />
      <circle cx="38" cy="14" r="5"
        stroke={active ? 'rgba(200,151,90,0.7)' : 'rgba(200,151,90,0.3)'} strokeWidth="1"
        fill={active ? 'rgba(200,151,90,0.15)' : 'transparent'}
        style={{ transition: 'all 0.4s ease' }} />
      <path d="M36 14h4M38 12v4"
        stroke={active ? '#ddb07a' : 'rgba(200,151,90,0.4)'} strokeWidth="1"
        strokeLinecap="round" style={{ transition: 'all 0.4s ease' }} />
    </svg>
  )
}

function NexusIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
      <circle cx="24" cy="24" r="18"
        stroke={active ? 'rgba(238,207,148,0.6)' : 'rgba(238,207,148,0.25)'} strokeWidth="1"
        fill="transparent" style={{ transition: 'all 0.4s ease' }} />
      <circle cx="24" cy="24" r="11"
        stroke={active ? 'rgba(92,143,114,0.8)' : 'rgba(92,143,114,0.35)'} strokeWidth="1.5"
        fill={active ? 'rgba(92,143,114,0.1)' : 'transparent'}
        style={{ transition: 'all 0.4s ease' }} />
      <line x1="10" y1="10" x2="38" y2="38"
        stroke={active ? '#eecf94' : 'rgba(238,207,148,0.4)'} strokeWidth="2"
        strokeLinecap="round" style={{ transition: 'all 0.4s ease' }} />
      <line x1="38" y1="10" x2="10" y2="38"
        stroke={active ? '#eecf94' : 'rgba(238,207,148,0.4)'} strokeWidth="2"
        strokeLinecap="round" style={{ transition: 'all 0.4s ease' }} />
      <circle cx="24" cy="24" r="4"
        fill={active ? '#eecf94' : 'rgba(238,207,148,0.6)'}
        style={{ transition: 'all 0.4s ease' }} />
    </svg>
  )
}

/* ─── Animated data-flow arrow (horizontal) ─── */
function DataFlowArrow({ active, reverse }: { active: boolean; reverse?: boolean }) {
  const dur = active ? '1.2s' : '2.4s'
  const halfDur = active ? '0.6s' : '1.2s'
  const pathId = reverse ? 'flowPath-r' : 'flowPath-f'
  return (
    <div className={cn('flex items-center w-full', reverse && 'flex-row-reverse')}>
      <svg viewBox="0 0 80 8" preserveAspectRatio="none" className="w-full h-8" overflow="visible" aria-hidden="true">
        <defs>
          <path id={pathId} d="M 0 4 L 80 4" />
        </defs>
        {/* Static line */}
        <line x1="0" y1="4" x2="80" y2="4"
          stroke={active ? 'rgba(92,143,114,0.5)' : 'rgba(92,143,114,0.18)'}
          strokeWidth="0.75"
          style={{ transition: 'stroke 0.4s ease' }}
        />
        {/* Packet 1 */}
        <circle r="2" fill={active ? '#7db090' : 'rgba(92,143,114,0.3)'}
          style={{ filter: active ? 'drop-shadow(0 0 3px rgba(92,143,114,0.8))' : 'none', transition: 'fill 0.4s ease' }}>
          <animateMotion dur={dur} repeatCount="indefinite" begin="0s">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
        {/* Packet 2 — staggered */}
        <circle r="1.5" fill={active ? 'rgba(92,143,114,0.6)' : 'rgba(92,143,114,0.15)'}
          style={{ transition: 'fill 0.4s ease' }}>
          <animateMotion dur={dur} repeatCount="indefinite" begin={halfDur}>
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
        {/* Arrowhead */}
        <path d={reverse ? 'M 5 2 L 0 4 L 5 6' : 'M 75 2 L 80 4 L 75 6'}
          stroke={active ? '#7db090' : 'rgba(92,143,114,0.3)'}
          strokeWidth="0.75" fill="none" strokeLinecap="round"
          style={{ transition: 'stroke 0.4s ease' }}
        />
      </svg>
    </div>
  )
}

/* ─── Feature pill / tab ─── */
const featureIcons = [
  // Smart match
  <svg key="1" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Culture
  <svg key="2" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
    <path d="M10 18s-7-5.4-7-10a7 7 0 0114 0c0 4.6-7 10-7 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="10" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  // Retention
  <svg key="3" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
    <path d="M3 14l3.5-5 3 3.5L13 7l4 7H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
  </svg>,
  // Integrations
  <svg key="4" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
    <rect x="2" y="5" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 10h8M10 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
]

// Which node each feature highlights: 'company' | 'talent' | 'nexus'
const featureNode = ['nexus', 'company', 'talent', 'nexus'] as const

export default function TechNexus() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const [activeNode, setActiveNode] = useState<'company' | 'talent' | 'nexus' | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          setInView(true)
        }
      }),
      { threshold: 0.07 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleFeatureEnter = (i: number) => {
    setActiveFeature(i)
    setActiveNode(featureNode[i])
  }
  const handleFeatureLeave = () => {
    setActiveFeature(null)
    setActiveNode(null)
  }

  const isCompanyActive = activeNode === 'company' || activeNode === 'nexus'
  const isTalentActive  = activeNode === 'talent'  || activeNode === 'nexus'
  const isNexusActive   = activeNode !== null

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="relative bg-forest-900 py-24 lg:py-36 overflow-hidden"
    >
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(92,143,114,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(92,143,114,0.8) 1px, transparent 1px)', backgroundSize: '56px 56px' }} />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(92,143,114,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,151,90,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ─── Header ─── */}
        <div className="reveal text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/10 border border-sage/20 mb-6">
            <span className="font-body text-xs text-sage-muted tracking-widest uppercase">{t.tech.eyebrow}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-cream leading-tight mb-4">
            {t.tech.headline}
          </h2>
          <p className="font-body text-base sm:text-lg text-cream/45 max-w-xl mx-auto leading-relaxed">
            {t.tech.sub}
          </p>
        </div>

        {/* ─── 3-Node visual ─── */}
        <div className="reveal mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 lg:gap-0 items-center">

            {/* COMPANY node */}
            <div
              className={cn(
                'group relative rounded-2xl border p-7 transition-all duration-400 cursor-default',
                isCompanyActive
                  ? 'border-sage/50 bg-forest-800/80 shadow-xl shadow-sage/10'
                  : 'border-sage/15 bg-forest-800/30 hover:border-sage/30 hover:bg-forest-800/50'
              )}
              onMouseEnter={() => setActiveNode('company')}
              onMouseLeave={() => activeFeature === null && setActiveNode(null)}
            >
              {/* Top accent bar */}
              <div className={cn('absolute top-0 left-6 right-6 h-px transition-all duration-400',
                isCompanyActive ? 'bg-gradient-to-r from-transparent via-sage to-transparent' : 'bg-transparent')} />

              <div className="flex items-start gap-4 mb-5">
                <CompanyIcon active={isCompanyActive} />
                <div>
                  <div className="font-body text-xs text-sage/60 tracking-widest uppercase mb-1">企業 / Company</div>
                  <h3 className={cn('font-display text-2xl font-medium transition-colors duration-300',
                    isCompanyActive ? 'text-cream' : 'text-cream/75')}>
                    What Companies Bring
                  </h3>
                </div>
              </div>

              <ul className="space-y-2.5">
                {[
                  { icon: '🏢', label: 'Company culture & values' },
                  { icon: '🎯', label: 'Role requirements & goals' },
                  { icon: '📈', label: 'Team dynamics & growth plans' },
                  { icon: '🤝', label: 'Leadership style & environment' },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-2.5">
                    <span className="text-sm">{item.icon}</span>
                    <span className={cn('font-body text-sm transition-colors duration-300',
                      isCompanyActive ? 'text-cream/70' : 'text-cream/40')}>{item.label}</span>
                  </li>
                ))}
              </ul>

              {isCompanyActive && (
                <div className="mt-5 pt-4 border-t border-sage/15">
                  <div className="font-body text-xs text-sage-muted/70">
                    140+ data points collected from your company profile
                  </div>
                </div>
              )}
            </div>

            {/* Arrow: Company → Nexus */}
            <div className="hidden lg:flex items-center px-3 w-20">
              <DataFlowArrow active={isCompanyActive} />
            </div>
            {/* Mobile arrow (vertical) */}
            <div className="flex lg:hidden justify-center py-1">
              <svg viewBox="0 0 10 20" fill="none" className="w-4 h-8">
                <path d="M5 2v12M2 11l3 4 3-4" stroke={isCompanyActive ? '#7db090' : 'rgba(92,143,114,0.3)'}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'stroke 0.4s ease' }} />
              </svg>
            </div>

            {/* PXNEXUS center node */}
            <div
              className={cn(
                'group relative rounded-2xl border p-7 transition-all duration-400 cursor-default',
                isNexusActive
                  ? 'border-amber/50 bg-forest-800/90 shadow-2xl shadow-amber/10 scale-[1.02]'
                  : 'border-amber/20 bg-forest-800/50 hover:border-amber/35 hover:bg-forest-800/70'
              )}
              onMouseEnter={() => setActiveNode('nexus')}
              onMouseLeave={() => activeFeature === null && setActiveNode(null)}
            >
              <div className={cn('absolute top-0 left-6 right-6 h-px transition-all duration-400',
                isNexusActive ? 'bg-gradient-to-r from-transparent via-amber to-transparent' : 'bg-transparent')} />

              {/* Center badge */}
              <div className="flex justify-center mb-5">
                <div className={cn('relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-400 overflow-hidden',
                  isNexusActive ? 'bg-amber/15 ring-2 ring-amber/30' : 'bg-amber/8 ring-1 ring-amber/15')}>
                  <NexusIcon active={isNexusActive} />
                  {/* Scan line — always present, very subtle */}
                  <div className="scan-overlay opacity-40" aria-hidden="true" style={{ animationDuration: '4s' }} />
                  {isNexusActive && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                      style={{ background: 'radial-gradient(circle, rgba(238,207,148,0.3), transparent)' }} />
                  )}
                </div>
              </div>

              <div className="text-center mb-5">
                <div className="font-body text-xs text-amber/60 tracking-widest uppercase mb-1">AI Engine</div>
                <h3 className={cn('font-display text-2xl font-medium transition-colors duration-300',
                  isNexusActive ? 'text-cream' : 'text-cream/75')}>
                  <PxNexusWordmark variant="on-dark" className="inline" />
                  {' '}Matches
                </h3>
                <p className={cn('font-body text-sm mt-2 transition-colors duration-300',
                  isNexusActive ? 'text-cream/55' : 'text-cream/30')}>
                  Analyzes 140+ signals to find aligned pairs
                </p>
              </div>

              {/* Match score visual */}
              <div className={cn('rounded-xl border p-4 transition-all duration-400',
                isNexusActive ? 'border-amber/25 bg-amber/8' : 'border-amber/10 bg-amber/4')}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs text-cream/45">Match Score</span>
                  <span className={cn('font-display text-xl font-medium transition-colors duration-300',
                    isNexusActive ? 'text-amber' : 'text-amber/50')}>94%</span>
                </div>
                <div className="h-1.5 rounded-full bg-forest-900/50 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: inView ? '94%' : '0%',
                      background: 'linear-gradient(90deg, #c8975a, #eecf94)',
                      transitionDelay: '0.3s',
                    }}
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    { label: 'Culture Fit', pct: '97%' },
                    { label: 'Skills Match', pct: '91%' },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <div className={cn('font-display text-base font-medium transition-colors duration-300',
                        isNexusActive ? 'text-amber-light' : 'text-amber/40')}>{m.pct}</div>
                      <div className="font-body text-[10px] text-cream/30">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow: Nexus ← Talent */}
            <div className="hidden lg:flex items-center px-3 w-20">
              <DataFlowArrow active={isTalentActive} reverse />
            </div>
            {/* Mobile arrow (vertical) */}
            <div className="flex lg:hidden justify-center py-1">
              <svg viewBox="0 0 10 20" fill="none" className="w-4 h-8">
                <path d="M5 2v12M2 11l3 4 3-4" stroke={isTalentActive ? '#ddb07a' : 'rgba(200,151,90,0.3)'}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'stroke 0.4s ease' }} />
              </svg>
            </div>

            {/* TALENT node */}
            <div
              className={cn(
                'group relative rounded-2xl border p-7 transition-all duration-400 cursor-default',
                isTalentActive
                  ? 'border-amber/50 bg-forest-800/80 shadow-xl shadow-amber/10'
                  : 'border-amber/15 bg-forest-800/30 hover:border-amber/30 hover:bg-forest-800/50'
              )}
              onMouseEnter={() => setActiveNode('talent')}
              onMouseLeave={() => activeFeature === null && setActiveNode(null)}
            >
              <div className={cn('absolute top-0 left-6 right-6 h-px transition-all duration-400',
                isTalentActive ? 'bg-gradient-to-r from-transparent via-amber to-transparent' : 'bg-transparent')} />

              <div className="flex items-start gap-4 mb-5">
                <TalentIcon active={isTalentActive} />
                <div>
                  <div className="font-body text-xs text-amber/60 tracking-widest uppercase mb-1">人材 / Talent</div>
                  <h3 className={cn('font-display text-2xl font-medium transition-colors duration-300',
                    isTalentActive ? 'text-cream' : 'text-cream/75')}>
                    What Talent Brings
                  </h3>
                </div>
              </div>

              <ul className="space-y-2.5">
                {[
                  { icon: '💡', label: 'Skills & expertise profile' },
                  { icon: '❤️', label: 'Personal values & beliefs' },
                  { icon: '🚀', label: 'Career aspirations & goals' },
                  { icon: '⚡', label: 'Working style & preferences' },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-2.5">
                    <span className="text-sm">{item.icon}</span>
                    <span className={cn('font-body text-sm transition-colors duration-300',
                      isTalentActive ? 'text-cream/70' : 'text-cream/40')}>{item.label}</span>
                  </li>
                ))}
              </ul>

              {isTalentActive && (
                <div className="mt-5 pt-4 border-t border-amber/15">
                  <div className="font-body text-xs text-amber-light/60">
                    Candidate profile built from behavior, not just CVs
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Output arrow + badge */}
          <div className="flex flex-col items-center mt-6 gap-2">
            <div className="w-px h-8"
              style={{ background: 'linear-gradient(180deg, rgba(92,143,114,0.4), rgba(92,143,114,0.1))' }} />
            <div className={cn(
              'inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
              'border-sage/25 bg-forest-800/60'
            )} style={{ transitionDelay: '0.6s' }}>
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-sage">
                <path d="M8 2l1.5 4.5H14l-3.6 2.6 1.4 4.4L8 11 4.2 13.5l1.4-4.4L2 6.5h4.5z"
                  fill="currentColor" fillOpacity="0.7" />
              </svg>
              <span className="font-body text-sm text-cream/70">Successful placement + continued engagement</span>
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-sage">
                <path d="M8 2l1.5 4.5H14l-3.6 2.6 1.4 4.4L8 11 4.2 13.5l1.4-4.4L2 6.5h4.5z"
                  fill="currentColor" fillOpacity="0.7" />
              </svg>
            </div>
          </div>
        </div>

        {/* ─── Stats bar ─── */}
        <div className="reveal mb-16">
          <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-sage/10">
            {t.tech.stats.map((s, i) => (
              <div key={s.label}
                className={cn('relative px-6 py-6 text-center transition-colors duration-300',
                  i === 1 ? 'bg-forest-800/60' : 'bg-forest-800/30',
                  'hover:bg-forest-800/70 group'
                )}>
                {/* Dividers */}
                {i > 0 && <div className="absolute left-0 top-4 bottom-4 w-px bg-sage/10" />}
                <div className={cn('font-display text-3xl lg:text-4xl font-medium mb-1 transition-colors duration-300',
                  i === 1 ? 'text-amber' : 'text-sage')}>
                  {s.value}
                </div>
                <div className="font-body text-xs text-cream/35 group-hover:text-cream/55 transition-colors duration-300">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Feature list (hover to highlight nodes) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {t.tech.features.map((feature, i) => (
            <div
              key={feature.title}
              className={cn(
                'reveal group flex gap-4 p-5 rounded-xl border transition-all duration-300 cursor-default',
                activeFeature === i
                  ? 'border-sage/40 bg-forest-800/60 shadow-lg shadow-sage/5'
                  : 'border-sage/10 hover:border-sage/25 hover:bg-forest-800/40'
              )}
              style={{ transitionDelay: `${i * 0.08}s` }}
              onMouseEnter={() => handleFeatureEnter(i)}
              onMouseLeave={handleFeatureLeave}
            >
              <div className={cn(
                'flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300',
                activeFeature === i ? 'bg-sage/25 text-sage-light scale-110' : 'bg-sage/10 text-sage'
              )}>
                {featureIcons[i]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className={cn('font-body text-sm font-semibold transition-colors',
                    activeFeature === i ? 'text-cream' : 'text-cream/80')}>
                    {feature.title}
                  </h4>
                  {/* Node tag */}
                  <span className={cn(
                    'font-body text-[9px] px-1.5 py-0.5 rounded-full border uppercase tracking-wider transition-all duration-300',
                    activeFeature === i
                      ? featureNode[i] === 'nexus'
                        ? 'bg-amber/10 text-amber border-amber/25'
                        : featureNode[i] === 'company'
                          ? 'bg-sage/10 text-sage border-sage/25'
                          : 'bg-amber/10 text-amber-light border-amber/25'
                      : 'bg-transparent text-cream/20 border-cream/10'
                  )}>
                    {featureNode[i] === 'nexus' ? 'AI Core' : featureNode[i] === 'company' ? 'Company' : 'Talent'}
                  </span>
                </div>
                <p className="font-body text-sm text-cream/42 leading-relaxed">{feature.description}</p>
              </div>
              {activeFeature === i && (
                <div className="flex-shrink-0 ml-auto self-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-10 flex justify-center">
          <a href="#contact"
            className="btn-shimmer inline-flex items-center gap-2.5 font-body text-sm font-medium px-7 py-3.5 rounded-xl bg-sage/10 border border-sage/25 text-sage hover:bg-sage hover:text-forest-900 transition-all duration-300">
            {t.tech.cta}
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
