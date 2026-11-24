import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  /** `prose` caps the measure at ~70 characters for long-form reading. */
  width?: 'site' | 'prose'
}

export function Container({ children, className, width = 'site' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        width === 'site' ? 'max-w-[75rem]' : 'max-w-[44rem]',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface SectionProps {
  children: ReactNode
  className?: string
  /** Alternating warm-grey band. */
  tone?: 'paper' | 'surface'
  bordered?: boolean
}

export function Section({ children, className, tone = 'paper', bordered }: SectionProps) {
  return (
    <section
      className={cn(
        'py-14 sm:py-18 lg:py-24',
        tone === 'surface' && 'bg-surface',
        bordered && 'border-t border-rule',
        className,
      )}
    >
      {children}
    </section>
  )
}
