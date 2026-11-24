import { useParams } from 'react-router-dom'
import { Container, Section } from '@/components/ui/Container'
import { PageHeader } from '@/components/marketing/PageHeader'
import {
  AtAGlance,
  Disclaimer,
  FAQSection,
  ProseBlock,
} from '@/components/marketing/ContentBlocks'
import { RelatedRail } from '@/components/marketing/RelatedRail'
import { CTABand } from '@/components/marketing/CTABand'
import { Seo, breadcrumbJsonLd, faqJsonLd, SITE_URL } from '@/components/seo/Seo'
import { getService, resolveDivisions, resolveForms, resolveServices } from '@/lib/content'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const service = getService(slug)

  // An unknown slug must 404, never render an empty template shell.
  if (!service) return <NotFoundPage />

  const path = `/services/${service.slug}/`
  const forms = resolveForms(service.relatedForms)
  const related = resolveServices(service.relatedServices)
  const divisions = resolveDivisions(service.relatedDivisions)

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: service.title },
  ]

  return (
    <>
      <Seo
        title={service.seoTitle}
        description={service.seoDescription}
        path={path}
        jsonLd={[
          breadcrumbJsonLd(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.seoDescription,
            serviceType: service.group,
            url: `${SITE_URL}${path}`,
            provider: { '@type': 'ProfessionalService', name: 'Jungle Tax' },
          },
          ...(service.faqs.length ? [faqJsonLd(service.faqs)] : []),
        ]}
      />

      <PageHeader
        eyebrow={service.group}
        title={service.title}
        summary={service.summary}
        crumbs={crumbs}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
            <div>
              <AtAGlance
                rows={[
                  { label: 'Who this is for', value: service.whoItIsFor },
                  { label: 'The risk', value: service.theRisk, tone: 'alert' },
                  { label: 'How we help', value: service.howWeHelp },
                ]}
              />

              <div className="mt-10">
                <ProseBlock overview={service.overview} details={service.details} />
              </div>

              {service.requiresDisclaimer && (
                <div className="mt-10 max-w-[44rem]">
                  <Disclaimer />
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-md border border-rule p-5">
                <p className="eyebrow mb-3">Forms involved</p>
                <ul className="space-y-2.5">
                  {forms.map((f) => (
                    <li key={f.slug}>
                      <a
                        href={`/forms/${f.slug}/`}
                        className="group flex items-baseline gap-2 text-sm"
                      >
                        <span className="form-number text-ink-800 group-hover:text-accent">
                          {f.formNumber}
                        </span>
                        <span className="text-ink-600 underline-offset-4 group-hover:text-accent group-hover:underline">
                          {f.officialName}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {divisions.length > 0 && (
                <div className="mt-5 rounded-md border border-rule p-5">
                  <p className="eyebrow mb-3">Relevant to</p>
                  <ul className="space-y-2">
                    {divisions.map((d) => (
                      <li key={d.slug}>
                        <a
                          href={`/divisions/${d.slug}/`}
                          className="text-sm text-ink-600 underline-offset-4 hover:text-accent hover:underline"
                        >
                          {d.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </Section>

      {service.faqs.length > 0 && (
        <Section tone="surface" bordered>
          <Container width="prose">
            <FAQSection faqs={service.faqs} />
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section bordered>
          <Container>
            <RelatedRail
              heading="Related services"
              base="/services/"
              items={related.map((s) => ({
                slug: s.slug,
                title: s.title,
                summary: s.summary,
              }))}
            />
          </Container>
        </Section>
      )}

      <CTABand />
    </>
  )
}
