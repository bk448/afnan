import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, TriangleAlert } from 'lucide-react'
import type { DetailBlock, Faq } from '@/types/content'
import { cn } from '@/lib/cn'

/* -------------------------------------------------------- At a glance ----- */

interface GlanceRow {
  label: string
  value: string | string[]
  tone?: 'default' | 'alert'
}

/**
 * The scannable summary that opens every detail page — who it applies to,
 * the timing, the headline risk — before the long-form explanation.
 */
export function AtAGlance({ rows }: { rows: GlanceRow[] }) {
  return (
    <dl className="divide-y divide-rule border-y border-rule">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
          <dt className="text-sm font-medium text-ink-400">{row.label}</dt>
          <dd
            className={cn(
              'text-[0.975rem] leading-relaxed',
              row.tone === 'alert' ? 'text-alert' : 'text-ink-800',
            )}
          >
            {Array.isArray(row.value) ? (
              <ul className="space-y-1.5">
                {row.value.map((v) => (
                  <li key={v} className="relative pl-4">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.72em] h-px w-2.5 bg-rule-strong"
                    />
                    {v}
                  </li>
                ))}
              </ul>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/* ------------------------------------------------------------- Prose ------ */

export function ProseBlock({ overview, details }: { overview: string; details?: DetailBlock[] }) {
  return (
    <div className="prose-editorial">
      <p className="text-lg leading-relaxed text-ink-700">{overview}</p>

      {details?.map((d) => (
        <section key={d.heading} className="mt-9">
          <h2 className="text-xl sm:text-2xl">{d.heading}</h2>
          <p className="mt-3">{d.body}</p>
        </section>
      ))}
    </div>
  )
}

/* -------------------------------------------------------- Disclaimer ------ */

/** Required on amnesty pages. Reassurance, not a threat. */
export function Disclaimer({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="rounded-md border border-rule bg-surface p-5" role="note">
      <div className="flex gap-3.5">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-alert" aria-hidden="true" />
        <div className="text-sm leading-relaxed text-ink-600">
          {children ?? (
            <p>
              Eligibility for these procedures depends on a certification about your own conduct,
              made under penalty of perjury, and on facts specific to you. Nothing on this page
              states or implies that any particular procedure is available to you. Please take
              advice on your own circumstances before filing anything.
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}

/* --------------------------------------------------------------- FAQs ----- */

export function FAQSection({ faqs, heading = 'Common questions' }: { faqs: Faq[]; heading?: string }) {
  if (faqs.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl">{heading}</h2>
      <Accordion.Root type="single" collapsible className="mt-6 border-t border-rule">
        {faqs.map((faq, i) => (
          <Accordion.Item key={faq.q} value={`item-${i}`} className="border-b border-rule">
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-4 text-left text-[1.0625rem] text-ink-800 transition-colors duration-150 hover:text-accent">
                <span>{faq.q}</span>
                <ChevronDown
                  className="mt-1 size-4 shrink-0 text-ink-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
              <p className="max-w-[62ch] pb-5 pr-10 text-[0.975rem] leading-relaxed text-ink-600">
                {faq.a}
              </p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}
