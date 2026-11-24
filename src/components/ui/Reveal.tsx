import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useReveal } from '@/hooks/useReveal'

interface RevealProps {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Stagger in milliseconds. Keep increments small — 60–90ms reads as one gesture. */
  delay?: number
  /** `rise` is the default; `fade` for large blocks where travel would feel heavy. */
  variant?: 'rise' | 'fade' | 'rule'
}

/**
 * Scroll-triggered entrance. Restrained by design: short travel, long easing,
 * once only. Fully inert when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  variant = 'rise',
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        'motion-safe:transition-all motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]',
        variant === 'rise' && !revealed && 'motion-safe:translate-y-5 motion-safe:opacity-0',
        variant === 'fade' && !revealed && 'motion-safe:opacity-0',
        variant === 'rule' && !revealed && 'motion-safe:scale-x-0',
        variant === 'rule' && 'origin-left',
        revealed && 'translate-y-0 scale-x-100 opacity-100',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/**
 * Staggers a list of children without each caller computing delays.
 */
export function RevealGroup({
  children,
  className,
  step = 70,
  as: Tag = 'div',
}: {
  children: ReactNode[]
  className?: string
  step?: number
  as?: ElementType
}) {
  return (
    <Tag className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step}>
          {child}
        </Reveal>
      ))}
    </Tag>
  )
}
