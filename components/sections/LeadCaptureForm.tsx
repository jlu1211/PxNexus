'use client'

import { useState, useEffect, useRef } from 'react'
import { useI18n } from '@/lib/i18n-context'
import { cn } from '@/lib/utils'
import { useMagneticButton } from '@/lib/hooks/useMagneticButton'

export default function LeadCaptureForm() {
  const { t } = useI18n()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedIntents, setSelectedIntents] = useState<string[]>([])
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [messageValue, setMessageValue] = useState('')
  const sectionRef  = useRef<HTMLElement>(null)
  const magneticRef = useMagneticButton<HTMLButtonElement>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.07 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const toggleIntent = (intent: string) => {
    setSelectedIntents((prev) =>
      prev.includes(intent) ? prev.filter((i) => i !== intent) : [...prev, intent]
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  const f = t.form

  // Shared field wrapper — lifts slightly on focus
  const FieldWrap = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <div className={cn('transition-transform duration-200', focusedField === id && '-translate-y-0.5')}>
      {children}
    </div>
  )

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-cream py-24 lg:py-36 overflow-hidden"
    >
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #173020 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Copy */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-700/8 border border-forest-700/15 mb-6">
              <span className="font-body text-xs text-forest-700/60 tracking-widest uppercase">{f.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-forest-900 leading-[1.1] mb-5 whitespace-pre-line">
              {f.headline}
            </h2>
            <p className="font-body text-base text-forest-700/55 leading-relaxed mb-10 max-w-sm">{f.sub}</p>

            <div className="mb-8">
              <p className="font-body text-xs font-semibold tracking-widest-2 uppercase text-forest-700/35 mb-4">
                {f.stepsLabel}
              </p>
              <div className="space-y-3">
                {f.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3.5 group cursor-default">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sage/15 flex items-center justify-center transition-all duration-200 group-hover:bg-sage/28 group-hover:scale-110">
                      <span className="font-body text-[10px] font-semibold text-sage">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="font-body text-sm text-forest-700/60 leading-relaxed pt-0.5 group-hover:text-forest-700/80 transition-colors">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-forest-700/40">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 4.5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-body text-xs">{f.disclaimer}</span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-14 px-8 rounded-2xl border border-sage/20 bg-white/70 min-h-[440px]">
                <div className="w-14 h-14 rounded-full bg-sage/15 flex items-center justify-center mb-5 animate-[fadeUp_0.5s_ease_forwards]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-sage">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl font-light text-forest-900 mb-3">{f.successTitle}</h3>
                <p className="font-body text-sm text-forest-700/55 leading-relaxed max-w-xs">{f.successBody}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-7 lg:p-9 rounded-2xl bg-white/80 border border-sage/15 shadow-sm shadow-forest-900/5"
              >
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <FieldWrap id="firstName">
                    <label className={cn('font-body text-xs font-medium block mb-1.5 transition-colors', focusedField === 'firstName' ? 'text-sage' : 'text-forest-700/60')}>
                      {f.fields.firstName} *
                    </label>
                    <input required type="text" placeholder="Jane"
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                      className="form-input w-full rounded-lg px-3.5 py-2.5 font-body text-sm" />
                  </FieldWrap>
                  <FieldWrap id="lastName">
                    <label className={cn('font-body text-xs font-medium block mb-1.5 transition-colors', focusedField === 'lastName' ? 'text-sage' : 'text-forest-700/60')}>
                      {f.fields.lastName} *
                    </label>
                    <input required type="text" placeholder="Smith"
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                      className="form-input w-full rounded-lg px-3.5 py-2.5 font-body text-sm" />
                  </FieldWrap>
                </div>

                <FieldWrap id="email">
                  <div className="mb-3">
                    <label className={cn('font-body text-xs font-medium block mb-1.5 transition-colors', focusedField === 'email' ? 'text-sage' : 'text-forest-700/60')}>
                      {f.fields.email} *
                    </label>
                    <input required type="email" placeholder="jane@company.com"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="form-input w-full rounded-lg px-3.5 py-2.5 font-body text-sm" />
                  </div>
                </FieldWrap>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <FieldWrap id="company">
                    <label className={cn('font-body text-xs font-medium block mb-1.5 transition-colors', focusedField === 'company' ? 'text-sage' : 'text-forest-700/60')}>
                      {f.fields.company} *
                    </label>
                    <input required type="text" placeholder="Acme Inc."
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className="form-input w-full rounded-lg px-3.5 py-2.5 font-body text-sm" />
                  </FieldWrap>
                  <div>
                    <label className="font-body text-xs font-medium text-forest-700/60 block mb-1.5">
                      {f.fields.size}
                    </label>
                    <select className="form-input w-full rounded-lg px-3.5 py-2.5 font-body text-sm appearance-none cursor-pointer">
                      <option value="">{f.fields.sizeDefault}</option>
                      {f.fields.sizeOptions.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                {/* Intent chips */}
                <div className="mb-4">
                  <label className="font-body text-xs font-medium text-forest-700/60 block mb-2">{f.fields.intent}</label>
                  <div className="flex flex-wrap gap-2">
                    {f.fields.intents.map((intent) => {
                      const active = selectedIntents.includes(intent)
                      return (
                        <button type="button" key={intent} onClick={() => toggleIntent(intent)}
                          className={cn(
                            'font-body text-xs px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-[1.03]',
                            active
                              ? 'bg-sage text-forest-900 border-sage font-medium shadow-sm shadow-sage/20'
                              : 'border-forest-700/15 text-forest-700/55 hover:border-sage/40 hover:text-forest-700/80'
                          )}>
                          {active && <span className="mr-1">✓</span>}
                          {intent}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Message with char counter */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={cn('font-body text-xs font-medium transition-colors', focusedField === 'message' ? 'text-sage' : 'text-forest-700/60')}>
                      {f.fields.message}
                    </label>
                    <span className={cn('font-body text-[10px] tabular-nums transition-colors',
                      messageValue.length > 450 ? 'text-amber-warm' : 'text-forest-700/30')}>
                      {messageValue.length}/500
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={500}
                    placeholder={f.fields.messagePlaceholder}
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="form-input w-full rounded-lg px-3.5 py-2.5 font-body text-sm resize-none"
                  />
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading} ref={magneticRef}
                  className="btn-shimmer w-full font-body text-sm font-semibold px-6 py-3.5 rounded-xl bg-forest-800 text-cream hover:bg-forest-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60 shadow-sm shadow-forest-900/20">
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeDasharray="50" strokeDashoffset="12" />
                      </svg>
                      {f.submitting}
                    </>
                  ) : (
                    <>
                      {f.submit}
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="font-body text-xs text-forest-700/30 text-center mt-3">{f.disclaimer}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
