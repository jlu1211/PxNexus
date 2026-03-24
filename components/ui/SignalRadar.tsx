'use client'

import { useEffect, useRef, useState } from 'react'

const AXES = [
  { label: 'Culture Fit',       value: 0.97 },
  { label: 'Skills Match',      value: 0.91 },
  { label: 'Growth Potential',  value: 0.88 },
  { label: 'Values Alignment',  value: 0.94 },
  { label: 'Retention',         value: 0.90 },
  { label: 'Speed to Hire',     value: 0.85 },
]

const CX = 130
const CY = 130
const R  = 95

function polarToCart(angle: number, radius: number) {
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  }
}

function axisAngle(i: number) {
  return (Math.PI * 2 * i) / AXES.length - Math.PI / 2
}

interface Props {
  inView: boolean
  isLight?: boolean
}

export default function SignalRadar({ inView, isLight = false }: Props) {
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!inView) return
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setProgress(1); return }

    const duration = 1600
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(eased)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView])

  const polygonPoints = AXES.map((ax, i) => {
    const angle = axisAngle(i)
    const p = polarToCart(angle, R * progress * ax.value)
    return `${p.x},${p.y}`
  }).join(' ')

  const rings = [0.25, 0.5, 0.75, 1.0]
  const spokeColor = isLight ? 'rgba(92,143,114,0.12)' : 'rgba(92,143,114,0.12)'
  const labelColor = isLight ? 'text-forest-700/60' : 'text-cream/45'
  const labelHighlight = isLight ? 'text-sage' : 'text-sage-light'

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="font-body text-xs tracking-widest uppercase text-sage/50 mb-1">
        Signal Coverage
      </div>
      <div className="relative">
        <svg viewBox="0 0 260 260" width="260" height="260" aria-label="Signal radar chart">
          {/* Concentric rings */}
          {rings.map((r) => (
            <polygon
              key={r}
              points={AXES.map((_, i) => {
                const p = polarToCart(axisAngle(i), R * r)
                return `${p.x},${p.y}`
              }).join(' ')}
              fill="none"
              stroke={spokeColor}
              strokeWidth="1"
            />
          ))}

          {/* Spokes */}
          {AXES.map((_, i) => {
            const outer = polarToCart(axisAngle(i), R)
            return (
              <line key={i} x1={CX} y1={CY} x2={outer.x} y2={outer.y}
                stroke={spokeColor} strokeWidth="1" />
            )
          })}

          {/* Filled polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(92,143,114,0.12)"
            stroke="#c8975a"
            strokeWidth={hovered !== null ? '1.5' : '1'}
            strokeOpacity="0.6"
            style={{ transition: 'stroke-width 0.2s ease' }}
          />

          {/* Vertex dots */}
          {AXES.map((ax, i) => {
            const angle = axisAngle(i)
            const p = polarToCart(angle, R * progress * ax.value)
            const isHov = hovered === i
            return (
              <circle key={i} cx={p.x} cy={p.y}
                r={isHov ? 4.5 : 3}
                fill={isHov ? '#c8975a' : 'rgba(200,151,90,0.7)'}
                style={{ transition: 'r 0.2s ease, fill 0.2s ease' }}
              />
            )
          })}
        </svg>

        {/* Axis labels — positioned around the SVG */}
        {AXES.map((ax, i) => {
          const angle = axisAngle(i)
          const labelR = R + 22
          const pos = polarToCart(angle, labelR)
          // Offset to center labels; adjust x anchor based on left/right
          const xPct = ((pos.x) / 260) * 100
          const yPct = ((pos.y) / 260) * 100
          const isHov = hovered === i

          return (
            <button
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`absolute font-body text-[10px] whitespace-nowrap transition-colors duration-200 cursor-default ${isHov ? labelHighlight : labelColor}`}
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {ax.label}
              {isHov && (
                <span className="ml-1 text-amber/70">{Math.round(ax.value * 100)}%</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
