import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface RailItem {
  slug: string
  title: string
  summary?: string
  monoLabel?: string
}

interface RelatedRailProps {
  heading: string
  intro?: string
  base: string
  items: RailItem[]
  /** Compact chip layout for long lists; cards otherwise. */
  variant?: 'cards' | 'chips'
}

/**
 * Cross-navigation. Dead ends are bugs — every detail page routes onward.
 * Hairline borders, no shadows, no floating cards.
 */
export function RelatedRail({
  heading,
  intro,
  base,
  items,
  variant = 'cards',
}: RelatedRailProps) {
  if (items.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl">{heading}</h2>
      {intro && <p className="mt-2.5 max-w-[60ch] text-ink-600">{intro}</p>}

      {variant === 'chips' ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                to={`${base}${item.slug}/`}
                className="inline-flex items-baseline gap-2 rounded-sm border border-rule bg-paper px-3 py-1.5 text-sm text-ink-700 transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                {item.monoLabel && (
                  <span className="form-number text-ink-800">{item.monoLabel}</span>
                )}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-6 grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.slug} className="bg-paper">
              <Link
                to={`${base}${item.slug}/`}
                className="group flex h-full flex-col p-5 transition-colors duration-150 hover:bg-surface"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display text-[1.0625rem] font-semibold text-ink-900">
                    {item.monoLabel && (
                      <span className="form-number mr-2 text-accent">{item.monoLabel}</span>
                    )}
                    {item.title}
                  </span>
                  <ArrowRight
                    className="mt-1 size-4 shrink-0 text-ink-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </span>
                {item.summary && (
                  <span className="mt-2 text-sm leading-relaxed text-ink-600">{item.summary}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
