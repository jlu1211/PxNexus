'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n-context'

const SECTION_IDS = ['solutions', 'framework', 'platform', 'about', 'contact']

// Sections with a light (cream) background — navbar must flip to dark text over these
const LIGHT_SECTIONS = new Set(['solutions', 'framework', 'contact'])

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 76
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Navbar() {
  const { locale, t, setLocale } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)

      // Scroll progress bar
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min((y / total) * 100, 100) : 0)

      // Which section is the navbar currently sitting on top of?
      // Use the pixel just below the navbar (y + 80) to decide the bg colour.
      const navBottom = y + 80
      let overLight = false
      let found = ''

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const elTop = el.getBoundingClientRect().top + y
        const elBottom = elTop + el.offsetHeight

        // navbar-over detection
        if (navBottom >= elTop && navBottom < elBottom) {
          overLight = LIGHT_SECTIONS.has(id)
        }

        // active-section detection (viewport 35% down)
        const viewportMid = y + window.innerHeight * 0.35
        if (viewportMid >= elTop && viewportMid < elBottom) {
          found = id
        }
      }

      setIsLight(overLight)
      setActiveSection(found)
    }

    // Run once on mount so initial state is correct
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: t.nav.solutions, id: 'solutions' },
    { label: t.nav.framework, id: 'framework' },
    { label: t.nav.platform, id: 'platform' },
    { label: t.nav.about, id: 'about' },
  ]

  // ─── Theme tokens derived from isLight ───────────────────────
  const headerBg = scrolled
    ? isLight
      ? 'bg-white/95 backdrop-blur-md border-b border-forest-700/12'
      : 'bg-forest-950/96 backdrop-blur-md border-b border-sage/15'
    : isLight
      ? 'bg-white/80 backdrop-blur-sm'
      : 'bg-transparent'

  const textMuted  = isLight ? 'text-forest-700/60' : 'text-cream/50'
  const textStrong = isLight ? 'text-forest-900'    : 'text-cream'
  const underline  = isLight ? 'bg-sage'             : 'bg-sage'
  const logoP      = isLight ? 'text-forest-900'     : 'text-cream'
  const logoN      = isLight ? 'text-sage'            : 'text-sage-light'
  const langBorder = isLight ? 'border-forest-700/20' : 'border-sage/20'
  const langActive = isLight ? 'bg-sage text-white'   : 'bg-sage text-forest-900'
  const langInactive= isLight ? 'text-forest-700/50 hover:text-forest-900' : 'text-cream/50 hover:text-cream'
  const signInText = isLight ? 'text-forest-700/55 hover:text-forest-900' : 'text-cream/50 hover:text-cream'
  const burgerLine = isLight ? 'bg-forest-900' : 'bg-cream'
  const mobileBg   = isLight
    ? 'bg-white/98 border-t border-forest-700/10'
    : 'bg-forest-900/98 border-t border-sage/10'
  const mobileLinkActive   = isLight ? 'text-forest-900 border-sage' : 'text-cream border-sage'
  const mobileLinkInactive = isLight
    ? 'text-forest-700/55 border-transparent hover:text-forest-900 hover:border-sage/40'
    : 'text-cream/55 border-transparent hover:text-cream hover:border-sage/40'
  const mobileDemoBg = isLight ? 'bg-sage text-white' : 'bg-sage text-forest-900'
  const mobileChatZO = isLight
    ? 'text-teal-800 border-teal-600/45 hover:text-teal-950 hover:border-teal-600'
    : 'text-teal-400 border-teal-500/40 hover:text-teal-300 hover:border-teal-400/55'

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', headerBg)}>
      {/* ─── Scroll progress bar ─── */}
      {scrolled && (
        <div className={cn('absolute bottom-0 left-0 right-0 h-[1.5px]', isLight ? 'bg-forest-700/10' : 'bg-forest-800/60')}>
          <div
            className="h-full bg-gradient-to-r from-sage via-sage-light to-amber"
            style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
          />
        </div>
      )}

      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* ─── Logo ─── */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8">
            <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
              <circle cx="16" cy="16" r="14" stroke="#5c8f72" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="6" y1="6" x2="26" y2="26" stroke="#c8975a" strokeWidth="2" strokeLinecap="round"
                className="transition-opacity group-hover:opacity-60" />
              <line x1="26" y1="6" x2="6" y2="26" stroke="#c8975a" strokeWidth="2" strokeLinecap="round"
                className="transition-opacity group-hover:opacity-60" />
              <circle cx="16" cy="16" r="3" fill="#c8975a" />
            </svg>
          </div>
          <span className="font-display text-xl font-semibold tracking-wide">
            <span className={cn('transition-colors duration-300', logoP)}>Px</span>
            <span className={cn('transition-colors duration-300', logoN)}>Nexus</span>
          </span>
        </a>

        {/* ─── Desktop nav ─── */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={cn(
                    'font-body text-sm transition-colors duration-200 relative group',
                    isActive ? textStrong : cn(textMuted, `hover:${textStrong}`)
                  )}
                >
                  {link.label}
                  <span className={cn(
                    'absolute -bottom-1 left-0 h-px transition-all duration-300',
                    underline,
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  )} />
                </button>
              </li>
            )
          })}
          {/* ChatZO */}
          <li>
            <a href="/chatzo" className={cn('flex items-center gap-1.5 font-body text-sm transition-colors', textMuted, `hover:${textStrong}`)}>
              {t.nav.chatzo}
              <span className="font-body text-[9px] px-1.5 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/25 font-semibold">AI</span>
            </a>
          </li>
        </ul>

        {/* ─── Right actions ─── */}
        <div className="hidden lg:flex items-center gap-3">
          <div className={cn('flex items-center gap-1 border rounded-full px-1 py-1', langBorder)}>
            {(['en', 'ja'] as const).map((l) => (
              <button key={l} onClick={() => setLocale(l)}
                className={cn(
                  'font-body text-xs px-2.5 py-1 rounded-full transition-all duration-200',
                  locale === l ? langActive : langInactive
                )}>
                {l === 'en' ? 'EN' : '日本語'}
              </button>
            ))}
          </div>
          <a href="#contact" className={cn('font-body text-sm transition-colors', signInText)}>
            {t.nav.signIn}
          </a>
          <a href="#contact"
            className="btn-shimmer font-body text-sm font-medium px-5 py-2.5 rounded-lg bg-sage text-forest-900 hover:bg-sage-light transition-colors duration-200">
            {t.nav.requestDemo}
          </a>
        </div>

        {/* ─── Mobile hamburger ─── */}
        <div className="lg:hidden flex items-center gap-3">
          <div className={cn('flex items-center gap-0.5 border rounded-full px-1 py-1', langBorder)}>
            {(['en', 'ja'] as const).map((l) => (
              <button key={l} onClick={() => setLocale(l)}
                className={cn(
                  'font-body text-xs px-2 py-0.5 rounded-full transition-all',
                  locale === l ? langActive : langInactive
                )}>
                {l === 'en' ? 'EN' : 'JP'}
              </button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
            <span className={cn('w-5 h-px transition-all duration-300', burgerLine, menuOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('w-5 h-px transition-all duration-300', burgerLine, menuOpen && 'opacity-0')} />
            <span className={cn('w-5 h-px transition-all duration-300', burgerLine, menuOpen && '-rotate-45 -translate-y-2')} />
          </button>
        </div>
      </nav>

      {/* ─── Mobile menu ─── */}
      <div className={cn('lg:hidden overflow-hidden transition-all duration-300', menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0')}>
        <div className={cn('backdrop-blur-md px-6 py-5 flex flex-col gap-1', mobileBg)}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <button key={link.id}
                onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
                className={cn(
                  'font-body text-sm py-2.5 flex items-center gap-2.5 transition-colors border-l-2 pl-3 w-full text-left',
                  isActive ? mobileLinkActive : mobileLinkInactive
                )}>
                {link.label}
              </button>
            )
          })}
          <a
            href="/chatzo"
            onClick={() => setMenuOpen(false)}
            className={cn(
              'font-body text-sm py-2.5 flex flex-col gap-0.5 transition-colors border-l-2 pl-3 w-full text-left',
              mobileChatZO,
            )}
          >
            <span className="flex items-center gap-2">
              <span className="font-semibold">{t.nav.chatzo}</span>
              <span className="font-body text-[9px] px-1.5 py-0.5 rounded-full bg-teal-500/15 text-teal-500 border border-teal-500/30 font-semibold">
                AI
              </span>
            </span>
            <span className={cn('text-xs font-normal', isLight ? 'text-forest-700/55' : 'text-cream/45')}>
              {t.nav.chatzoCaption}
            </span>
          </a>
          <div className="pt-3 mt-1 border-t border-sage/10">
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className={cn('block w-full text-center font-body text-sm font-medium px-5 py-3 rounded-lg', mobileDemoBg)}>
              {t.nav.requestDemo}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
