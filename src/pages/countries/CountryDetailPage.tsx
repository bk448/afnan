import { useParams } from 'react-router-dom'
import { Container, Section } from '@/components/ui/Container'
import { PageHeader } from '@/components/marketing/PageHeader'
import { CTABand } from '@/components/marketing/CTABand'
import { RelatedRail } from '@/components/marketing/RelatedRail'
import { Seo, breadcrumbJsonLd } from '@/components/seo/Seo'
import { getCountry, resolveServices } from '@/lib/content'
import { NotFoundPage } from '@/pages/NotFoundPage'

/** Fixed section order, shared by all 16 country pages. */
function TopicSection({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="border-t border-rule py-9 first:border-t-0 first:pt-0">
      <div className="grid gap-3 lg:grid-cols-[14rem_1fr] lg:gap-10">
        <h2 className="font-display text-xl text-ink-900">{heading}</h2>
        <p className="max-w-[62ch] leading-relaxed text-ink-700">{body}</p>
      </div>
    </section>
  )
}

export function CountryDetailPage() {
  const { slug = '' } = useParams()
  const country = getCountry(slug)

  if (!country) return <NotFoundPage />

  const path = `/countries/${country.slug}/`
  const related = resolveServices(country.relatedServices)

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Countries', href: '/countries/' },
    { label: country.title },
  ]

  return (
    <>
      <Seo
        title={country.seoTitle}
        description={country.seoDescription}
        path={path}
        jsonLd={breadcrumbJsonLd(crumbs)}
      />

      <PageHeader
        eyebrow="Country guide"
        title={country.title}
        summary={country.summary}
        crumbs={crumbs}
      />

      <Section>
        <Container>
          <TopicSection heading="Treaty position" body={country.treaty} />
          <TopicSection
            heading={`Pensions in ${country.countryName}`}
            body={country.pensions}
          />
          <TopicSection heading="Filing deadlines" body={country.deadlines} />
          <TopicSection heading="Common PFIC traps" body={country.pficTraps} />
          {country.localNotes?.map((note) => (
            <TopicSection key={note.heading} heading={note.heading} body={note.body} />
          ))}
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="surface" bordered>
          <Container>
            <RelatedRail
              heading={`Services most used by Americans in ${country.countryName}`}
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

      <CTABand
        heading={`Living in ${country.countryName}?`}
        body="A consultation covers your specific position — the treaty, your pension, and what you actually need to file."
      />
    </>
  )
}
