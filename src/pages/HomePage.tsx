import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { CTABand } from '@/components/marketing/CTABand'
import { GlobeMark } from '@/components/marketing/GlobeMark'
import { Seo, organizationJsonLd, websiteJsonLd } from '@/components/seo/Seo'
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

/* Factual anchors about the US system — not firm statistics, nothing invented. */
const ANCHORS = [
  {
    label: 'Taxed by citizenship',
    body: 'The US taxes its citizens wherever they live. Almost no other country does.',
  },
  {
    label: 'Filing is separate from paying',
    body: 'A return is required even in years when nothing is ultimately owed.',
  },
  {
    label: 'There are defined routes back',
    body: 'Formal procedures exist for taxpayers whose failure to file was not wilful.',
  },
]

const FEATURED = [
  'streamlined-filing',
  'expat-tax-returns',
  'fbar',
  'pfic',
  'foreign-entities',
  'expatriation',
] as const

export function HomePage() {
  const featured = FEATURED.map(getService).filter((s) => s !== undefined)

  return (
    <>
      <Seo
        title="Jungle Tax"
        description="US tax services for American expatriates. Annual filing, FBAR and FATCA, streamlined catch-up procedures, and cross-border advice from specialists."
        path="/"
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />

      {/* ═════════════════════════════════════════════════════════════ hero */}
      <section className="paper-grain hero-wash relative overflow-hidden border-b border-rule">
        <Container className="relative py-20 sm:py-24 lg:py-32">
          <div className="grid items-start gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24">
            {/* ------------------------------------------------ left column */}
            <div>
              <p className="enter d-1 eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-7 bg-accent" aria-hidden="true" />
                US tax for Americans abroad
              </p>

              <h1 className="enter d-2 mt-6 max-w-[15ch] text-[clamp(2.05rem,7.2vw,4rem)] leading-[1.08] tracking-[-0.022em] sm:mt-7">
                The US taxes you <span className="italic text-accent">wherever</span> you live.
              </h1>

              <p className="enter d-3 mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-ink-600 sm:mt-8 sm:text-lg">
                American citizens and green card holders must file a US return every year — after
                decades abroad, while paying full tax where they live, and even when nothing ends
                up owing. Most people find out late. It is almost always fixable.
              </p>

              <div className="enter d-4 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                <Button to="/contact/book/" size="lg" className="w-full sm:w-auto">
                  Book a Consultation
                </Button>
                <Button
                  to="/divisions/catch-up/"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  I am behind on filing
                </Button>
              </div>

              <p className="enter d-5 mt-7 text-sm text-ink-400">
                Consultations are confidential and carry no obligation.
              </p>
            </div>

            {/* ----------------------------------------------- right column */}
            <div className="lg:pt-2">
              <div className="enter-fade d-3 relative mx-auto mb-10 max-w-[22rem] lg:mb-12 lg:max-w-none">
                <GlobeMark />
              </div>

              <figure className="enter-fade d-5 relative">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-accent via-accent/35 to-transparent"
                />
                <blockquote className="pl-7">
                  <p className="font-display text-[1.45rem] leading-[1.42] tracking-[-0.012em] text-ink-800 sm:text-[1.6rem]">
                    &ldquo;We have identified you as a US person and require your tax
                    identification number.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-5 pl-7 text-sm leading-[1.7] text-ink-600">
                  <span className="eyebrow mb-2 block">How most people find out</span>
                  A letter from a bank. It is a routine consequence of international reporting
                  rules — not an accusation, and not the start of an investigation. It does mean
                  your account information is being shared, which makes it the right moment to
                  establish exactly where you stand.
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>

        <span
          aria-hidden="true"
          className="enter-rule d-6 absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-accent/45 via-rule to-transparent"
        />
      </section>

      {/* ══════════════════════════════════════════════════ factual anchors */}
      <section className="border-b border-rule bg-paper">
        <Container>
          <dl className="grid divide-y divide-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {ANCHORS.map((a, i) => (
              <Reveal key={a.label} delay={i * 90}>
                <div className="py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                  <dt className="font-display text-[1.0625rem] font-semibold text-ink-900">
                    {a.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-600">{a.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════ three entry paths */}
      <Section>
        <Container>
          <h2 className="sr-only">Ways to find what you need</h2>
          <div className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule lg:grid-cols-3">
            {ENTRY_PATHS.map((p, i) => (
              <Reveal key={p.to} delay={i * 80} className="bg-paper">
                <div className="flex h-full flex-col p-7 transition-colors duration-300 hover:bg-surface">
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
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════════════════════════ divisions */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <h2 className="text-2xl sm:text-3xl">Who we work with</h2>
            <p className="mt-3.5 leading-relaxed text-ink-600">
              Six groups, each arriving with a different problem. Most people recognise themselves
              in one of them immediately.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map((d, i) => (
              <Reveal as="li" key={d.slug} delay={(i % 3) * 80}>
                <Link to={`/divisions/${d.slug}/`} className="group block">
                  <span className="font-display text-[1.0625rem] font-semibold text-ink-900 transition-colors duration-300 group-hover:text-accent">
                    {d.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-2 block h-px w-10 origin-left bg-rule-strong transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20 group-hover:bg-accent"
                  />
                  <span className="mt-2.5 block text-sm leading-relaxed text-ink-600">
                    {d.summary}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ services */}
      <Section bordered>
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-5">
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
          </Reveal>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 80} className="bg-paper">
                <Link
                  to={`/services/${s.slug}/`}
                  className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-surface"
                >
                  <span className="eyebrow mb-2.5">{s.group}</span>
                  <span className="font-display text-[1.0625rem] font-semibold text-ink-900 transition-colors duration-300 group-hover:text-accent">
                    {s.title}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-ink-600">{s.summary}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ════════════════════════════════════════════════════════ reassurance */}
      <Section tone="surface" bordered>
        <Container width="prose">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">If you are years behind</h2>
            <div className="prose-editorial mt-5 text-ink-700">
              <p>
                This is the most common reason people contact us, and it is far more widespread
                than anyone realises from the inside. Large numbers of Americans abroad simply
                never knew the obligation existed — including people born in the United States who
                left as infants and have never lived there since.
              </p>
              <p>
                Established procedures exist specifically for taxpayers whose failure to file was
                not wilful. They have defined requirements and, in the right circumstances,
                reduced or eliminated penalties. The sensible first step is an assessment of your
                actual facts, not a rushed filing.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button to="/services/streamlined-filing/" variant="secondary">
                About streamlined filing
              </Button>
              <Link
                to="/divisions/catch-up/"
                className="group inline-flex items-center gap-1.5 text-sm text-accent underline-offset-4 hover:underline"
              >
                Catch-up filers
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABand />
    </>
  )
}
