'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { chatzoTranslations, ChatZOLocale } from '@/lib/i18n-chatzo'

interface Props { locale: ChatZOLocale }

const STEP_DURATION = 3500

// ─── Demo data (structured extraction aligned with sample.jpg pipeline) ───────

/** Output shape from OCR → LLM structuring (representative of production JSON). */
const DEMO_EXTRACTION = {
  document_info: {
    title_ja: '令和5年分 給与所得者の保険料控除申告書',
    title_en: "Reiwa 5 Year Wage Earner's Declaration of Insurance Premium Deduction",
    year: 'Reiwa 5 (2023)',
  },
  applicant_info: {
    name_ja: '田中 太郎',
    name_en: 'TANAKA Taro',
    address_ja: '東京都新宿区西新宿1-1-1',
    address_en: '1-1-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo',
  },
  insurance_deductions: {
    life_insurance: {
      policies: [
        {
          company_ja: '第一生命',
          type_ja: '一般生命保険 (新)',
          amount_paid_jpy: 80000,
          deduction_amount_jpy: 40000,
        },
        {
          company_ja: '日本生命',
          type_ja: '個人年金保険 (旧)',
          amount_paid_jpy: 120000,
          deduction_amount_jpy: 50000,
        },
      ],
      total_deduction_amount_jpy: 120000,
    },
    earthquake_insurance: {
      policies: [
        {
          company_ja: '東京海上日動',
          type_ja: '地震保険',
          amount_paid_jpy: 150000,
          deduction_amount_jpy: 15000,
        },
      ],
      total_deduction_amount_jpy: 15000,
    },
    social_insurance: {
      breakdown: [
        { type_ja: '国民健康保険', amount_paid_jpy: 120000 },
        { type_ja: '厚生年金保険', amount_paid_jpy: 380000 },
      ],
      total_deduction_amount_jpy: 500000,
    },
    small_enterprise_mutual_aid: {
      breakdown: [{ type_ja: 'iDeCo', amount_paid_jpy: 24000 }],
      total_deduction_amount_jpy: 24000,
    },
  },
  summary: {
    total_claimed_deduction_amount_jpy: 209000,
  },
} as const

const OCR_LINES = [
  { n: 1,  text: 'PxNexus Insurance 株式会社' },
  { n: 2,  text: '令和5年分 給与所得者の保険料控除申告書' },
  { n: 3,  text: '' },
  { n: 4,  text: '氏名　田中 太郎' },
  { n: 5,  text: '住所　東京都新宿区西新宿1-1-1' },
  { n: 6,  text: '' },
  { n: 7,  text: '【生命保険料】 第一生命 一般生命保険(新) 保険料 80,000 控除額 40,000' },
  { n: 8,  text: '日本生命 個人年金保険(旧) 保険料 120,000 控除額 50,000' },
  { n: 9,  text: '' },
  { n: 10, text: '【地震保険】 東京海上日動 地震保険 150,000 控除 15,000' },
  { n: 11, text: '' },
  { n: 12, text: '【社会保険料】 国民健康保険 120,000 / 厚生年金保険 380,000' },
  { n: 13, text: '' },
  { n: 14, text: '【小規模企業共済等】 iDeCo 24,000' },
  { n: 15, text: '' },
  { n: 16, text: '控除合計（申告） 209,000' },
  { n: 17, text: '' },
  { n: 18, text: '令和5年12月10日　田中 太郎' },
]

const VALIDATED_FIELDS: Array<{
  key: string; value: string; status: 'ok' | 'rule' | 'match'; note?: string
}> = [
  { key: 'document_info.title_ja', value: '"令和5年分 給与所得者の…"', status: 'ok' },
  { key: 'applicant_info.name_ja', value: '"田中 太郎"', status: 'ok' },
  { key: 'applicant_info.address_ja', value: '"東京都新宿区西新宿1-1-1"', status: 'ok' },
  { key: 'life_insurance.policies', value: '2 contracts', status: 'ok' },
  { key: 'life_insurance.totals', value: '¥120,000 category cap', status: 'rule', note: 'life insurance deduction ceiling' },
  { key: 'earthquake_insurance', value: '1 policy · ¥15,000', status: 'ok' },
  { key: 'social_insurance.breakdown', value: '2 lines', status: 'ok' },
  { key: 'small_enterprise_mutual_aid', value: 'iDeCo ¥24,000', status: 'ok' },
  { key: 'summary.total_claimed', value: '209000', status: 'ok' },
  { key: '→ status', value: '"MATCH"', status: 'match' },
]

const CSV_HEADERS = [
  'employee_name',
  'deduction_category',
  'insurer_or_type',
  'detail_ja',
  'amount_paid_jpy',
  'deduction_jpy',
  'doc_year',
  'validation',
] as const

const CSV_ROWS: string[][] = [
  ['田中 太郎', 'life_insurance', '第一生命', '一般生命保険 (新)', '80000', '40000', '令和5', 'MATCH'],
  ['田中 太郎', 'life_insurance', '日本生命', '個人年金保険 (旧)', '120000', '50000', '令和5', 'MATCH'],
  ['田中 太郎', 'earthquake_insurance', '東京海上日動', '地震保険', '150000', '15000', '令和5', 'MATCH'],
  ['田中 太郎', 'social_insurance', '—', '国民健康保険', '120000', '—', '令和5', 'MATCH'],
  ['田中 太郎', 'social_insurance', '—', '厚生年金保険', '380000', '—', '令和5', 'MATCH'],
  ['田中 太郎', 'small_enterprise_mutual_aid', '—', 'iDeCo', '24000', '24000', '令和5', 'MATCH'],
]

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: '01', key: 'OCR'      as const, color: '#60a5fa' },
  { id: '02', key: 'JSON'     as const, color: '#a78bfa' },
  { id: '03', key: 'Validate' as const, color: '#2dd4bf' },
  { id: '04', key: 'CSV'      as const, color: '#34d399' },
]

const STEP_LABELS = {
  en: {
    OCR:      { label: 'OCR Extract',    desc: 'Raw text from scanned certificate'  },
    JSON:     { label: 'AI Structure',   desc: 'GPT-4o extracts structured fields'  },
    Validate: { label: 'Validate',       desc: 'Rules engine checks every field'    },
    CSV:      { label: 'CSV Export',     desc: 'Ready for MoneyForward / Freee'     },
  },
  ja: {
    OCR:      { label: 'OCR抽出',         desc: 'スキャン書類からテキスト抽出'         },
    JSON:     { label: 'AI構造化',        desc: 'GPT-4oが構造化フィールドを抽出'       },
    Validate: { label: '検証・照合',       desc: 'ルールエンジンが全フィールドを検証'    },
    CSV:      { label: 'CSVエクスポート',  desc: 'マネーフォワード／freee対応'          },
  },
} as const

// ─── JSON tree (mirrors production nested extraction) ─────────────────────────

function JsonNode({ value, indent = 0 }: { value: unknown; indent?: number }): ReactNode {
  const px = indent * 12

  if (value === null) return <span className="text-white/40">null</span>
  if (typeof value === 'boolean') return <span className="text-sky-300/80">{String(value)}</span>
  if (typeof value === 'number') return <span className="text-orange-300/75">{value}</span>
  if (typeof value === 'string') {
    return <span className="text-emerald-300/75">&quot;{value}&quot;</span>
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-white/35">[]</span>
    return (
      <span className="block">
        <span className="text-white/35">[</span>
        {value.map((item, i) => (
          <div key={i} className="block" style={{ paddingLeft: px + 12 }}>
            <JsonNode value={item} indent={indent + 1} />
            {i < value.length - 1 && <span className="text-white/25">,</span>}
          </div>
        ))}
        <span className="text-white/35" style={{ paddingLeft: px }}>]</span>
      </span>
    )
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    if (entries.length === 0) return <span className="text-white/35">{'{}'}</span>
    return (
      <span className="block">
        <span className="text-white/35">{'{'}</span>
        {entries.map(([k, v], i) => {
          const complex = v !== null && typeof v === 'object'
          return (
            <div key={k} className="block" style={{ paddingLeft: px + 12 }}>
              <span className="text-violet-300/80">&quot;{k}&quot;</span>
              <span className="text-white/25">: </span>
              {complex ? (
                <JsonNode value={v} indent={indent + 1} />
              ) : (
                <JsonNode value={v} indent={indent} />
              )}
              {i < entries.length - 1 && <span className="text-white/25">,</span>}
            </div>
          )
        })}
        <span className="text-white/35" style={{ paddingLeft: px }}>{'}'}</span>
      </span>
    )
  }

  return null
}

// ─── Panels ───────────────────────────────────────────────────────────────────

function OCRPanel() {
  return (
    <div className="h-full overflow-auto font-mono text-xs">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-500/15">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
        <span className="text-blue-400/60 text-[10px] tracking-widest uppercase">
          Google Cloud Vision · DOCUMENT_TEXT_DETECTION
        </span>
      </div>
      <div className="space-y-0.5">
        {OCR_LINES.map((line) =>
          line.text === '' ? (
            <div key={line.n} className="h-2" />
          ) : (
            <div key={line.n} className="flex gap-3 text-white/55 hover:text-white/85 transition-colors duration-150">
              <span className="text-white/15 select-none w-5 text-right flex-shrink-0">{line.n}</span>
              <span>{line.text}</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

function JSONPanel() {
  return (
    <div className="h-full overflow-auto font-mono text-[11px] leading-relaxed">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-violet-500/15">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse flex-shrink-0" />
        <span className="text-violet-400/60 text-[10px] tracking-widest uppercase">
          GPT-4o · JSON Schema Extraction
        </span>
      </div>
      <JsonNode value={DEMO_EXTRACTION} indent={0} />
    </div>
  )
}

function ValidatePanel() {
  return (
    <div className="h-full overflow-auto font-mono text-xs">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-teal-500/15">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse flex-shrink-0" />
        <span className="text-teal-400/60 text-[10px] tracking-widest uppercase">
          Rules Engine · Post-validation
        </span>
      </div>
      <div className="space-y-1">
        {VALIDATED_FIELDS.map((f) => (
          <div key={f.key} className="flex items-start gap-2">
            <div className="mt-0.5 flex-shrink-0 w-3">
              {f.status === 'ok' && (
                <svg viewBox="0 0 10 10" className="w-3 h-3 text-emerald-400">
                  <circle cx="5" cy="5" r="4.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M3 5l1.5 1.5L7 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
                </svg>
              )}
              {f.status === 'rule' && (
                <svg viewBox="0 0 10 10" className="w-3 h-3 text-amber-400">
                  <circle cx="5" cy="5" r="4.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M5 3v2.5M5 7v.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              )}
              {f.status === 'match' && (
                <svg viewBox="0 0 10 10" className="w-3 h-3 text-teal-400">
                  <circle cx="5" cy="5" r="4.5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M2.5 5l2 2L7.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className={
                f.status === 'match' ? 'text-teal-300 font-semibold' :
                f.status === 'rule'  ? 'text-amber-300/80' :
                'text-white/50'
              }>&quot;{f.key}&quot;</span>
              <span className="text-white/20">: </span>
              <span className={
                f.status === 'match' ? 'text-teal-300 font-bold' :
                f.status === 'rule'  ? 'text-amber-300/75' :
                'text-emerald-300/70'
              }>{f.value}</span>
              {f.note && (
                <span className="ml-2 text-amber-400/40 text-[10px] italic">// {f.note}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CSVPanel() {
  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-500/15">
        <svg viewBox="0 0 10 10" className="w-3 h-3 text-emerald-400 flex-shrink-0">
          <rect x="0.5" y="0.5" width="9" height="9" rx="1.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0.5 3.5h9M3.5 0.5v9" stroke="currentColor" strokeWidth="0.6" />
        </svg>
        <span className="font-mono text-emerald-400/60 text-[10px] tracking-widest uppercase">
          CSV Export · MoneyForward / Freee ready
        </span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-emerald-500/10">
        <table className="w-full font-mono text-[10px] border-collapse">
          <thead>
            <tr className="bg-emerald-500/5">
              {CSV_HEADERS.map((h) => (
                <th key={h} className="text-left text-emerald-400/70 px-2.5 py-2 border-b border-emerald-500/10 whitespace-nowrap font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CSV_ROWS.map((row, ri) => (
              <tr key={ri} className="hover:bg-white/[0.02] transition-colors">
                {row.map((v, i) => (
                  <td
                    key={i}
                    className={`px-2.5 py-2 border-t border-white/[0.04] whitespace-nowrap ${
                      CSV_HEADERS[i] === 'validation' ? 'text-emerald-300 font-bold' : 'text-white/55'
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 font-mono text-[10px]">
        <div className="text-white/30 mb-1 text-[9px] uppercase tracking-wider">raw output</div>
        <div className="text-white/25">{CSV_HEADERS.join(',')}</div>
        {CSV_ROWS.map((row, i) => (
          <div key={i} className="text-emerald-300/60 mt-0.5">{row.join(',')}</div>
        ))}
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ChatZODemo({ locale }: Props) {
  const t = chatzoTranslations[locale].demo
  const labels = STEP_LABELS[locale]

  const [step, setStep]               = useState(0)
  const [paused, setPaused]           = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.07 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setTimeout(() => {
      setStep((s) => (s + 1) % STEPS.length)
      setProgressKey((k) => k + 1)
    }, STEP_DURATION)
    return () => clearTimeout(timer)
  }, [step, paused, progressKey])

  const goTo = (i: number) => {
    setStep(i)
    setProgressKey((k) => k + 1)
  }

  const current = STEPS[step]
  const label   = labels[current.key]

  return (
    <section id="demo" ref={sectionRef}
      className="relative bg-zinc-950 py-24 lg:py-36 overflow-hidden">

      <div className="absolute right-0 top-1/4 bottom-1/4 w-px opacity-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #2dd4bf, transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-body text-xs text-teal-400/80 tracking-widest uppercase">{t.eyebrow}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
            {t.headline}
          </h2>
          <p className="font-body text-base text-white/40 max-w-xl mx-auto leading-relaxed">{t.sub}</p>
        </div>

        {/* Two-column layout */}
        <div className="reveal grid lg:grid-cols-[5fr_7fr] gap-6 lg:gap-10 items-start"
          style={{ transitionDelay: '0.1s' }}>

          {/* Left — document image */}
          <div className="lg:sticky lg:top-24">
            <div
              className="relative rounded-2xl overflow-hidden border bg-zinc-900 shadow-2xl shadow-black/40"
              style={{
                borderColor: `${current.color}22`,
                transition: 'border-color 0.5s ease',
              }}
            >
              {/* Filename badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-white/10 backdrop-blur-sm">
                <svg viewBox="0 0 12 12" className="w-3 h-3 text-white/35">
                  <rect x="1" y="1" width="10" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="0.9" />
                  <path d="M3 4.5h6M3 6.5h4" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
                </svg>
                <span className="font-mono text-[10px] text-white/35">sample.jpg</span>
              </div>

              {/* Scan line — OCR step only */}
              {step === 0 && (
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
                  <div
                    className="absolute left-0 right-0 h-0.5 bg-blue-400/50"
                    style={{
                      boxShadow: '0 0 14px 4px rgba(96,165,250,0.35)',
                      animation: 'scanLine 2s linear infinite',
                    }}
                  />
                </div>
              )}

              {/* Active step colour ring */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-500"
                style={{ boxShadow: `inset 0 0 40px 0 ${current.color}12` }}
              />

              <Image
                src="/assets/sample.jpg"
                alt="Sample insurance certificate — 保険料控除証明書"
                width={600}
                height={800}
                className="w-full h-auto block"
                priority
              />
            </div>

            {/* Dot indicators */}
            <div className="mt-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                {STEPS.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => goTo(i)}
                    aria-label={`Go to step ${i + 1}`}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: i === step ? s.color : 'rgba(255,255,255,0.15)',
                      transform:  i === step ? 'scale(1.5)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-white/25">{step + 1} / {STEPS.length}</span>
            </div>
          </div>

          {/* Right — pipeline panel */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Step tabs */}
            <div className="flex gap-1 mb-3 p-1 rounded-xl border border-white/[0.07] bg-white/[0.02]">
              {STEPS.map((s, i) => {
                const lbl = labels[s.key]
                const isActive = i === step
                return (
                  <button
                    key={s.key}
                    onClick={() => goTo(i)}
                    className="flex-1 flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg transition-all duration-300"
                    style={
                      isActive
                        ? { background: 'rgba(255,255,255,0.06)', boxShadow: `0 0 0 1px ${s.color}30` }
                        : { background: 'transparent' }
                    }
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-mono text-[9px] font-bold transition-colors duration-300"
                        style={{ color: isActive ? s.color : 'rgba(255,255,255,0.2)' }}
                      >
                        {s.id}
                      </span>
                      <span
                        className="font-body text-[10px] font-semibold hidden sm:block transition-colors duration-300"
                        style={{ color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)' }}
                      >
                        {lbl.label}
                      </span>
                    </div>
                    {isActive && (
                      <div className="w-1 h-1 rounded-full" style={{ background: s.color }} />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Content panel */}
            <div
              className="relative rounded-xl border bg-zinc-900/60 overflow-hidden h-80"
              style={{ borderColor: `${current.color}20`, transition: 'border-color 0.5s ease' }}
            >
              {/* Step label bar */}
              <div
                className="flex items-center justify-between px-4 py-2.5 border-b"
                style={{ borderColor: `${current.color}15` }}
              >
                <span
                  className="font-mono text-[10px] font-semibold transition-colors duration-300"
                  style={{ color: current.color }}
                >
                  {label.label}
                </span>
                <span className="font-mono text-[10px] text-white/25">{label.desc}</span>
              </div>

              {/* Panel body */}
              <div className="h-[calc(100%-2.5rem)] p-4">
                {step === 0 && <OCRPanel />}
                {step === 1 && <JSONPanel />}
                {step === 2 && <ValidatePanel />}
                {step === 3 && <CSVPanel />}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-2 h-0.5 rounded-full bg-white/[0.05] overflow-hidden">
              {!paused && (
                <div
                  key={progressKey}
                  className="h-full rounded-full"
                  style={{
                    background: current.color,
                    animation: `progressFill ${STEP_DURATION}ms linear forwards`,
                  }}
                />
              )}
            </div>

            {paused && (
              <div className="mt-1.5 flex items-center gap-1.5 justify-end">
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span className="font-mono text-[9px] text-white/25 uppercase tracking-wider">paused</span>
              </div>
            )}

            {/* Legend */}
            <div className="mt-5 flex flex-wrap gap-3 justify-end">
              {([
                { color: '#34d399', label: locale === 'ja' ? '検証済み'   : 'Validated'    },
                { color: '#fbbf24', label: locale === 'ja' ? 'ルール適用' : 'Rule applied' },
                { color: '#2dd4bf', label: 'MATCH' },
              ] as const).map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full opacity-70" style={{ background: item.color }} />
                  <span className="font-body text-[10px] text-white/35">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
