'use client'

import { useI18n } from '@/lib/i18n-context'
import { PxNexusWordmark } from '@/components/branding/PxNexusWordmark'

export default function Footer() {
  const { t } = useI18n()
  const f = t.footer

  return (
    <footer className="bg-forest-950 border-t border-sage/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ─── Brand ─── */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                <circle cx="16" cy="16" r="14" stroke="#5c8f72" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="6" y1="6" x2="26" y2="26" stroke="#c8975a" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="26" y1="6" x2="6" y2="26" stroke="#c8975a" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="16" cy="16" r="2.5" fill="#c8975a" />
              </svg>
              <PxNexusWordmark variant="on-dark" className="font-display text-lg font-semibold" />
            </div>

            <p className="font-body text-sm text-cream/40 leading-relaxed max-w-xs mb-5">
              {f.tagline}
            </p>

            <div className="flex items-center gap-4">
              {f.social.map((s) => (
                <a key={s} href="#" className="font-body text-xs text-cream/30 hover:text-sage-light transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* ─── Link groups ─── */}
          {Object.entries(f.categories).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="font-body text-xs font-semibold tracking-widest-2 uppercase text-sage/50 mb-4">
                {cat}
              </h4>
              <ul className="space-y-2">
                {(links as readonly string[]).map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-cream/35 hover:text-cream/70 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Bottom ─── */}
        <div className="mt-12 pt-7 border-t border-sage/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/25">{f.copyright}</p>
          <p className="font-display text-xs italic text-sage/30">{f.missionLine}</p>
        </div>
      </div>
    </footer>
  )
}
