'use client'

import { useState, useRef, useEffect } from 'react'
import { chatzoTranslations, ChatZOLocale } from '@/lib/i18n-chatzo'
import { PxNexusWordmark } from '@/components/branding/PxNexusWordmark'

interface Props { locale: ChatZOLocale }

export default function ChatZOCTA({ locale }: Props) {
  const t = chatzoTranslations[locale].cta
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  return (
    <section id="cta" ref={sectionRef}
      className="relative bg-zinc-900 py-24 lg:py-32 overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, #2dd4bf 0%, transparent 70%)' }} />
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.4) 30%, rgba(45,212,191,0.6) 50%, rgba(45,212,191,0.4) 70%, transparent)' }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="reveal text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-5">
            {t.headline}
          </h2>
          <p className="font-body text-base sm:text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
            {t.sub}
          </p>
        </div>

        <div className="reveal max-w-lg mx-auto">
          {submitted ? (
            <div className="text-center py-14 px-8 rounded-2xl border border-teal-500/20 bg-teal-500/5">
              <div className="w-14 h-14 rounded-full bg-teal-500/15 flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-teal-400">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-light text-white mb-2">
                {locale === 'ja' ? 'ありがとうございます！' : 'Got it — thanks!'}
              </h3>
              <p className="font-body text-sm text-white/45">
                {locale === 'ja' ? '1営業日以内にご連絡いたします。' : "We'll be in touch within one business day."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}
              className="p-7 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="font-body text-xs text-white/40 block mb-1.5">
                    {locale === 'ja' ? 'お名前' : 'Name'} *
                  </label>
                  <input required type="text"
                    placeholder={locale === 'ja' ? '山田 太郎' : 'Jane Smith'}
                    className="w-full rounded-lg px-3.5 py-2.5 font-body text-sm bg-white/6 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all" />
                </div>
                <div>
                  <label className="font-body text-xs text-white/40 block mb-1.5">
                    {locale === 'ja' ? '会社名' : 'Company'} *
                  </label>
                  <input required type="text"
                    placeholder={locale === 'ja' ? '株式会社○○' : 'Acme Inc.'}
                    className="w-full rounded-lg px-3.5 py-2.5 font-body text-sm bg-white/6 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all" />
                </div>
              </div>
              <div className="mb-3">
                <label className="font-body text-xs text-white/40 block mb-1.5">
                  {locale === 'ja' ? 'メールアドレス' : 'Work Email'} *
                </label>
                <input required type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-lg px-3.5 py-2.5 font-body text-sm bg-white/6 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all" />
              </div>
              <div className="mb-5">
                <label className="font-body text-xs text-white/40 block mb-1.5">
                  {locale === 'ja' ? '従業員数' : 'Employee Count'}
                </label>
                <select className="w-full rounded-lg px-3.5 py-2.5 font-body text-sm bg-white/6 border border-white/10 text-white/70 focus:outline-none focus:border-teal-500/50 transition-all appearance-none cursor-pointer">
                  <option value="" className="bg-zinc-900">
                    {locale === 'ja' ? '選択してください' : 'Select range'}
                  </option>
                  {(locale === 'ja'
                    ? ['〜50名', '51〜300名', '301〜1,000名', '1,000名以上']
                    : ['1–50', '51–300', '301–1,000', '1,000+']
                  ).map((o) => <option key={o} className="bg-zinc-900">{o}</option>)}
                </select>
              </div>
              <button type="submit" disabled={loading}
                className="w-full font-body text-sm font-semibold px-6 py-3.5 rounded-xl bg-teal-500 text-zinc-900 hover:bg-teal-400 transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60">
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeDasharray="50" strokeDashoffset="12" />
                    </svg>
                    {locale === 'ja' ? '送信中...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    {t.primary}
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
              <p className="font-body text-xs text-white/25 text-center mt-3">
                {locale === 'ja' ? 'スパムはしません。いつでも登録解除可能。' : 'No spam. Unsubscribe anytime.'}
              </p>
            </form>
          )}
        </div>

        {/* Back to PxNexus */}
        <div className="reveal mt-12 text-center">
          <a href="/" className="inline-flex items-center gap-2 font-body text-sm text-white/25 hover:text-white/50 transition-colors">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {locale === 'ja' ? (
              <>
                <PxNexusWordmark variant="on-dark" className="font-display text-sm font-semibold" />
                <span>トップへ戻る</span>
              </>
            ) : (
              <>
                <span>Back to</span>
                <PxNexusWordmark variant="on-dark" className="font-display text-sm font-semibold" />
              </>
            )}
          </a>
        </div>
      </div>
    </section>
  )
}
