import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container, Section } from '@/components/ui/Container'
import { PageHeader } from '@/components/marketing/PageHeader'
import { AtAGlance, ProseBlock } from '@/components/marketing/ContentBlocks'
import { RelatedRail } from '@/components/marketing/RelatedRail'
import { CTABand } from '@/components/marketing/CTABand'
import { Seo, breadcrumbJsonLd } from '@/components/seo/Seo'
import { getForm, resolveForms, resolveServices } from '@/lib/content'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function FormDetailPage() {
  const { slug = '' } = useParams()
  const form = getForm(slug)

  if (!form) return <NotFoundPage />

  const path = `/forms/${form.slug}/`
  const handledBy = resolveServices(form.relatedServices)
  const relatedForms = resolveForms(form.relatedForms ?? [])

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Forms', href: '/forms/' },
    { label: form.formNumber },
  ]

  // The single most important element on a form page: the onward service link.
  const primary = handledBy[0]

  return (
    <>
      <Seo
        title={form.seoTitle}
        description={form.seoDescription}
        path={path}
        jsonLd={breadcrumbJsonLd(crumbs)}
      />

      <PageHeader
        eyebrow={form.group}
        monoLabel={form.formNumber}
        title={form.officialName}
        summary={form.summary}
        crumbs={crumbs}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
            <div>
              <AtAGlance
                rows={[
                  { label: 'Who files it', value: form.whoFilesIt },
                  { label: 'What it reports', value: form.whatItReports },
                  { label: 'When it is due', value: form.whenDue },
                  { label: 'Penalty risk', value: form.penaltyRisk, tone: 'alert' },
                ]}
              />

              <div className="mt-10">
                <ProseBlock overview={form.overview} details={form.details} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              {primary && (
                <div className="rounded-md border border-accent/35 bg-accent-100/50 p-5">
                  <p className="eyebrow mb-2">Handled by</p>
                  <Link
                    to={`/services/${primary.slug}/`}
                    className="group inline-flex items-baseline gap-1.5 font-display text-lg font-semibold text-ink-900 hover:text-accent"
                  >
                    {primary.title}
                    <ArrowRight
                      className="size-4 self-center transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{primary.summary}</p>
                </div>
              )}

              {handledBy.length > 1 && (
                <div className="mt-5 rounded-md border border-rule p-5">
                  <p className="eyebrow mb-3">Also relevant</p>
                  <ul className="space-y-2">
                    {handledBy.slice(1, 7).map((s) => (
                      <li key={s.slug}>
                        <Link
                          to={`/services/${s.slug}/`}
                          className="text-sm text-ink-600 underline-offset-4 hover:text-accent hover:underline"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </Section>

      {relatedForms.length > 0 && (
        <Section tone="surface" bordered>
          <Container>
            <RelatedRail
              heading="Related forms"
              base="/forms/"
              variant="chips"
              items={relatedForms.map((f) => ({
                slug: f.slug,
                title: f.officialName,
                monoLabel: f.formNumber,
              }))}
            />
          </Container>
        </Section>
      )}

      <CTABand
        heading={`Do you need to file ${form.formNumber}?`}
        body="Whether this form applies depends on your specific circumstances. A consultation will establish what you actually need to file."
      />
    </>
  )
}
