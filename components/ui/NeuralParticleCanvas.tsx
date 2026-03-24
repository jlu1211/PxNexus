'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface Props {
  mouseRef: React.RefObject<{ x: number; y: number }>
}

export default function NeuralParticleCanvas({ mouseRef }: Props) {
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

    const REPULSION_RADIUS = 120
    const CONNECT_DIST = 100
    const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80

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

    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 1.2 + Math.random() * 0.8,
    }))

    const drawStatic = () => {
      const cw = canvas.offsetWidth
      const ch = canvas.offsetHeight
      ctx.clearRect(0, 0, cw, ch)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(200,151,90,0.3)'
        ctx.fill()
      })
    }

    const tick = () => {
      const cw = canvas.offsetWidth
      const ch = canvas.offsetHeight
      const mx = mouseRef.current?.x ?? -9999
      const my = mouseRef.current?.y ?? -9999
      ctx.clearRect(0, 0, cw, ch)

      particles.forEach((p) => {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.hypot(dx, dy)
        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS
          p.vx += (dx / dist) * force * 0.04
          p.vy += (dy / dist) * force * 0.04
        }

        p.vx *= 0.98
        p.vy *= 0.98
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0)  { p.x = 0;  p.vx = Math.abs(p.vx) }
        if (p.x > cw) { p.x = cw; p.vx = -Math.abs(p.vx) }
        if (p.y < 0)  { p.y = 0;  p.vy = Math.abs(p.vy) }
        if (p.y > ch) { p.y = ch; p.vy = -Math.abs(p.vy) }
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.25
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(92,143,114,${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw dots
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(200,151,90,0.45)'
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
      if (reduced) drawStatic()
    })
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
    }
  }, [mouseRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
