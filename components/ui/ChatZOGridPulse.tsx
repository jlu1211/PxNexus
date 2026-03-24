'use client'

import { useEffect, useRef } from 'react'

const GRID_SPACING = 52
const DOT_RADIUS = 1.5
const CYCLE_DURATION = 3000 // ms per wave cycle

export default function ChatZOGridPulse({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let rafId = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }

    resize()

    const buildDots = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const maxDist = Math.hypot(w / 2, h / 2)
      const dots: Array<{ cx: number; cy: number; normalizedDist: number }> = []
      for (let x = GRID_SPACING / 2; x < w; x += GRID_SPACING) {
        for (let y = GRID_SPACING / 2; y < h; y += GRID_SPACING) {
          const dist = Math.hypot(x - w / 2, y - h / 2)
          dots.push({ cx: x, cy: y, normalizedDist: dist / maxDist })
        }
      }
      return dots
    }

    let dots = buildDots()

    const drawStatic = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      dots.forEach(({ cx, cy }) => {
        ctx.beginPath()
        ctx.arc(cx, cy, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(45,212,191,0.04)'
        ctx.fill()
      })
    }

    const tick = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const t = performance.now() / CYCLE_DURATION
      ctx.clearRect(0, 0, w, h)

      dots.forEach(({ cx, cy, normalizedDist }) => {
        const wavePhase = ((t - normalizedDist) % 1.0 + 1.0) % 1.0
        const opacity = Math.pow(1 - wavePhase, 2) * 0.35 + 0.04
        ctx.beginPath()
        ctx.arc(cx, cy, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(45,212,191,${opacity})`
        ctx.fill()
      })

      rafId = requestAnimationFrame(tick)
    }

    if (reduced) {
      drawStatic()
    } else {
      rafId = requestAnimationFrame(tick)
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      dots = buildDots()
      if (reduced) drawStatic()
    })
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className ?? 'absolute inset-0 w-full h-full pointer-events-none'}
      aria-hidden="true"
    />
  )
}
