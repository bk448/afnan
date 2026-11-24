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
  children?: ReactNode
}

export function PageHeader({
  eyebrow,
  title,
  monoLabel,
  summary,
  crumbs,
  children,
}: PageHeaderProps) {
  return (
    <div className="border-b border-rule bg-surface">
      <Container className="py-8 sm:py-10">
        <Breadcrumbs items={crumbs} className="mb-7" />

        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}

        {monoLabel && (
          <p className="form-number mb-2 text-2xl text-accent sm:text-3xl">{monoLabel}</p>
        )}

        <h1 className="max-w-[20ch] text-3xl sm:text-4xl">{title}</h1>

        {summary && (
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-600">{summary}</p>
        )}

        {children && <div className="mt-7">{children}</div>}
      </Container>
    </div>
  )
}
