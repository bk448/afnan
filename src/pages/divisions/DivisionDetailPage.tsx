import { useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Container, Section } from '@/components/ui/Container'
import { PageHeader } from '@/components/marketing/PageHeader'
import { RelatedRail } from '@/components/marketing/RelatedRail'
import { CTABand } from '@/components/marketing/CTABand'
import { Seo, breadcrumbJsonLd } from '@/components/seo/Seo'
import { getDivision, resolveForms, resolveServices } from '@/lib/content'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function DivisionDetailPage() {
  const { slug = '' } = useParams()
  const division = getDivision(slug)

  if (!division) return <NotFoundPage />

  const path = `/divisions/${division.slug}/`
  const services = resolveServices(division.relatedServices)
  const forms = resolveForms(division.relatedForms ?? [])

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Divisions', href: '/divisions/' },
    { label: division.title },
  ]

  return (
    <>
      <Seo
        title={division.seoTitle}
        description={division.seoDescription}
        path={path}
        jsonLd={breadcrumbJsonLd(crumbs)}
      />

      <PageHeader
        eyebrow="Who we help"
        title={division.title}
        summary={division.summary}
        crumbs={crumbs}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
            <div className="prose-editorial">
              <p className="text-lg leading-relaxed text-ink-700">{division.overview}</p>
              <p className="mt-6 border-l-2 border-accent/50 pl-5 text-ink-600 italic">
                {division.reassurance}
              </p>
            </div>

            <aside>
              <div className="rounded-md border border-rule bg-surface p-6">
                <p className="eyebrow mb-4">Is this you?</p>
                <ul className="space-y-3">
                  {division.isThisYou.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                      <Check className="mt-1 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <RelatedRail
            heading="Services for this situation"
            intro="The work most often needed by people in this position."
            base="/services/"
            items={services.map((s) => ({
              slug: s.slug,
              title: s.title,
              summary: s.summary,
            }))}
          />
        </Container>
      </Section>

      {forms.length > 0 && (
        <Section bordered>
          <Container>
            <RelatedRail
              heading="Forms you may encounter"
              base="/forms/"
              variant="chips"
              items={forms.map((f) => ({
                slug: f.slug,
                title: f.officialName,
                monoLabel: f.formNumber,
              }))}
            />
          </Container>
        </Section>
      )}

      <CTABand />
    </>
  )
}
