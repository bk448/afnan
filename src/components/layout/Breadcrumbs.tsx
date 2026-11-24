import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

export interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
  className?: string
}

/**
 * Visitors land on deep pages from search and must know where they are.
 * Required on every page except home.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-400">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  to={item.href}
                  className="hover:text-accent underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(last && 'text-ink-600')} aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-rule-strong">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
