import { cn } from '@/lib/utils'

const VARIANT = {
  'on-dark': {
    p: 'text-amber-light',
    x: 'text-cream',
    nexus: 'text-sage-light',
  },
  'on-light': {
    p: 'text-amber',
    x: 'text-forest-900',
    nexus: 'text-sage',
  },
} as const

export type PxNexusWordmarkVariant = keyof typeof VARIANT

interface Props {
  variant: PxNexusWordmarkVariant
  className?: string
  /** Navbar theme cross-fade */
  transition?: boolean
}

/**
 * Brand wordmark: **P** (amber), **x** (neutral), **Nexus** (sage).
 * Use `on-dark` on forest/zinc backgrounds, `on-light` on cream/white.
 */
export function PxNexusWordmark({ variant, className, transition }: Props) {
  const c = VARIANT[variant]
  const tw = transition ? 'transition-colors duration-300' : ''
  return (
    <span className={className}>
      <span className={cn(c.p, tw)}>P</span>
      <span className={cn(c.x, tw)}>x</span>
      <span className={cn(c.nexus, tw)}>Nexus</span>
    </span>
  )
}
