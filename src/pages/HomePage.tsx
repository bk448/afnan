import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { CTABand } from '@/components/marketing/CTABand'
import { Seo, SITE_URL } from '@/components/seo/Seo'
import { divisions, getService } from '@/lib/content'

const ENTRY_PATHS = [
  {
    eyebrow: 'Who you are',
    title: 'Browse by situation',
    body: 'Behind on filing, running a business abroad, moving country, or holding a green card outside the US. Each division lists the work it usually involves.',
    to: '/divisions/',
    cta: 'See who we help',
  },
  {
    eyebrow: 'What you need',
    title: 'Browse by service',
    body: 'Annual returns, FBAR and FATCA, catch-up procedures, double-taxation relief, foreign pensions, entity reporting and cross-border advice.',
    to: '/services/',
    cta: 'See all services',
  },
  {
    eyebrow: 'Where you live',
    title: 'Browse by country',
    body: 'Sixteen country guides covering the treaty position, how local pensions are treated, filing deadlines and the investment products that cause problems.',
    to: '/countries/',
    cta: 'See country guides',
  },
]

const FEATURED = ['streamlined-filing', 'expat-tax-returns', 'fbar', 'pfic', 'foreign-entities', 'expatriation'] as const

export function HomePage() {
  const featured = FEATURED.map(getService).filter((s) => s !== undefined)

  return (
    <>
      <Seo
        title="Jungle Tax"
        description="US tax services for American expatriates. Annual filing, FBAR and FATCA, streamlined catch-up procedures, and cross-border advice from specialists."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Jungle Tax',
          description:
            'US tax services for American expatriates, including annual filing, foreign account reporting and catch-up procedures.',
          url: SITE_URL,
          areaServed: 'Worldwide',
          serviceType: 'US expatriate tax services',
        }}
      />

      {/* ------------------------------------------------------------ hero */}
      <section className="border-b border-rule bg-surface">
        <Container className="py-16 sm:py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <div>
              <p className="eyebrow mb-5">US tax for Americans abroad</p>
              <h1 className="max-w-[16ch] text-4xl leading-[1.08] sm:text-5xl">
                The US taxes you wherever you live.
              </h1>
              <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-ink-600">
                American citizens and green card holders must file a US return every year, even
                after decades abroad, even while paying full tax where they live, and even when
                nothing ends up owing. Most people discover this late. It is almost always
                fixable.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button to="/contact/book/" size="lg">
                  Book a Consultation
                </Button>
                <Button to="/divisions/catch-up/" variant="secondary" size="lg">
                  I am behind on filing
                </Button>
              </div>
            </div>

            <div className="lg:pt-14">
              <div className="border-l-2 border-accent/40 pl-6">
                <p className="font-display text-xl leading-snug text-ink-800">
                  &ldquo;We have identified you as a US person and need your tax number.&rdquo;
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">
                  A letter from a bank is how most people find out. It is a routine consequence of
                  international reporting rules — not an accusation, and not the start of an
                  investigation. It does mean the information is being shared, which makes it the
                  right moment to establish where you stand.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- three entry paths */}
      <Section>
        <Container>
          <h2 className="sr-only">Ways to find what you need</h2>
          <div className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule lg:grid-cols-3">
            {ENTRY_PATHS.map((p) => (
              <div key={p.to} className="flex flex-col bg-paper p-7">
                <p className="eyebrow mb-3">{p.eyebrow}</p>
                <h3 className="font-display text-xl text-ink-900">{p.title}</h3>
                <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-ink-600">
                  {p.body}
                </p>
                <Link
                  to={p.to}
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm text-accent underline-offset-4 hover:underline"
                >
                  {p.cta}
                  <ArrowRight
                    className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- divisions */}
      <Section tone="surface" bordered>
        <Container>
          <div className="max-w-[46rem]">
            <h2 className="text-2xl sm:text-3xl">Who we work with</h2>
            <p className="mt-3.5 leading-relaxed text-ink-600">
              Six groups, each arriving with a different problem. Most people recognise themselves
              in one of them immediately.
            </p>
          </div>

          <ul className="mt-9 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map((d) => (
              <li key={d.slug}>
                <Link to={`/divisions/${d.slug}/`} className="group block">
                  <span className="font-display text-[1.0625rem] font-semibold text-ink-900 underline-offset-4 group-hover:text-accent group-hover:underline">
                    {d.title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-ink-600">
                    {d.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ services */}
      <Section bordered>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-[44rem]">
              <h2 className="text-2xl sm:text-3xl">Where we are asked most often</h2>
              <p className="mt-3.5 leading-relaxed text-ink-600">
                A selection of the work that brings people here. The full list runs to
                twenty-three services.
              </p>
            </div>
            <Link
              to="/services/"
              className="text-sm text-accent underline underline-offset-4 hover:text-accent-700"
            >
              All services
            </Link>
          </div>

          <ul className="mt-9 grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <li key={s.slug} className="bg-paper">
                <Link
                  to={`/services/${s.slug}/`}
                  className="flex h-full flex-col p-6 transition-colors duration-150 hover:bg-surface"
                >
                  <span className="eyebrow mb-2.5">{s.group}</span>
                  <span className="font-display text-[1.0625rem] font-semibold text-ink-900">
                    {s.title}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-ink-600">{s.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* --------------------------------------------------------- reassurance */}
      <Section tone="surface" bordered>
        <Container width="prose">
          <h2 className="text-2xl sm:text-3xl">If you are years behind</h2>
          <div className="prose-editorial mt-5 text-ink-700">
            <p>
              This is the most common reason people contact us, and it is far more widespread than
              anyone realises from the inside. Large numbers of Americans abroad simply never knew
              the obligation existed — including people born in the United States who left as
              infants and have never lived there since.
            </p>
            <p>
              Established procedures exist specifically for taxpayers whose failure to file was not
              wilful. They have defined requirements and, in the right circumstances, reduced or
              eliminated penalties. The sensible first step is an assessment of your actual facts,
              not a rushed filing.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button to="/services/streamlined-filing/" variant="secondary">
              About streamlined filing
            </Button>
            <Button to="/divisions/catch-up/" variant="link" size="none">
              Catch-up filers &rarr;
            </Button>
          </div>
        </Container>
      </Section>

      <CTABand />
    </>
  )
}
