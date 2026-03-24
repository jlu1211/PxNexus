'use client'

import { useEffect, useRef } from 'react'

export function useMagneticButton<T extends HTMLElement>(
  strength = 0.3,
  radius = 60
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId = 0

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy)
        if (dist < radius) {
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
        }
        const pct = ((e.clientX - rect.left) / rect.width) * 100
        el.style.setProperty('--shimmer-x', `${pct}%`)
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(rafId)
      el.style.transform = ''
    }

    document.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [strength, radius])

  return ref
}
