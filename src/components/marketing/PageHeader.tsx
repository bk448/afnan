import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs, type Crumb } from '@/components/layout/Breadcrumbs'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  /** Rendered in mono before the title — form numbers are typographic objects. */
  monoLabel?: string
  summary?: string
  crumbs: Crumb[]
  /** Small artwork shown above the title, e.g. a country flag. */
  visual?: ReactNode
  children?: ReactNode
}

export function PageHeader({
  eyebrow,
  title,
  monoLabel,
  summary,
  crumbs,
  visual,
  children,
}: PageHeaderProps) {
  return (
    <div className="paper-grain hero-wash relative overflow-hidden border-b border-rule bg-surface">
      <Container className="relative py-10 sm:py-14">
        <Breadcrumbs items={crumbs} className="enter d-1 mb-8" />

        {eyebrow && (
          <p className="enter d-2 eyebrow mb-3 flex items-center gap-3">
            <span className="inline-block h-px w-5 bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
        )}

        {monoLabel && (
          <p className="enter d-2 form-number mb-2 text-2xl text-accent sm:text-3xl">
            {monoLabel}
          </p>
        )}

        {visual && <div className="enter d-2 mb-5">{visual}</div>}

        <h1 className="enter d-3 max-w-[20ch] text-3xl tracking-[-0.018em] sm:text-4xl">
          {title}
        </h1>

        {summary && (
          <p className="enter d-4 mt-5 max-w-[60ch] text-lg leading-[1.68] text-ink-600">
            {summary}
          </p>
        )}

        {children && <div className="enter d-5 mt-7">{children}</div>}
      </Container>

      <span
        aria-hidden="true"
        className="enter-rule d-5 absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-accent/40 via-rule to-transparent"
      />
    </div>
  )
}
