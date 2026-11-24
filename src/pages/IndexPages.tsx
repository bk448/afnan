import { Link } from 'react-router-dom'
import { Container, Section } from '@/components/ui/Container'
import { PageHeader } from '@/components/marketing/PageHeader'
import { CTABand } from '@/components/marketing/CTABand'
import { Seo, breadcrumbJsonLd } from '@/components/seo/Seo'
import { countries, divisions, formsByGroup, servicesByGroup } from '@/lib/content'

/* -------------------------------------------------------------------------- */
/* Shared grouped-listing layout                                               */
/* -------------------------------------------------------------------------- */

interface ListItem {
  slug: string
  title: string
  summary: string
  monoLabel?: string
}

function GroupedList({
  groups,
  base,
}: {
  groups: { group: string; items: ListItem[] }[]
  base: string
}) {
  return (
    <div className="space-y-14">
      {groups.map((g) => (
        <section key={g.group}>
          <h2 className="border-b border-rule pb-3 font-display text-xl text-ink-900">
            {g.group}
          </h2>
          <ul className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {g.items.map((item) => (
              <li key={item.slug}>
                <Link to={`${base}${item.slug}/`} className="group block">
                  <span className="font-display text-[1.0625rem] font-semibold text-ink-900 underline-offset-4 group-hover:text-accent group-hover:underline">
                    {item.monoLabel && (
                      <span className="form-number mr-2 text-accent">{item.monoLabel}</span>
                    )}
                    {item.title}
                  </span>
                  <span className="mt-1.5 block max-w-[48ch] text-sm leading-relaxed text-ink-600">
                    {item.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------- Services */

export function ServicesIndexPage() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Services' }]
  const groups = servicesByGroup().map((g) => ({
    group: g.group,
    items: g.items.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary })),
  }))

  return (
    <>
      <Seo
        title="US Expat Tax Services"
        description="Annual compliance, catch-up procedures, double-taxation relief, foreign assets, business reporting and cross-border advisory for Americans abroad."
        path="/services/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="What we do"
        title="Services"
        summary="Grouped by what you need. If you would rather browse by your situation, start with Divisions; if you arrived looking for a specific form, go to Forms."
        crumbs={crumbs}
      />
      <Section>
        <Container>
          <GroupedList groups={groups} base="/services/" />
        </Container>
      </Section>
      <CTABand />
    </>
  )
}

/* ----------------------------------------------------------------------- Forms */

export function FormsIndexPage() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Forms' }]
  const groups = formsByGroup().map((g) => ({
    group: g.group,
    items: g.items.map((f) => ({
      slug: f.slug,
      title: f.officialName,
      summary: f.summary,
      monoLabel: f.formNumber,
    })),
  }))

  return (
    <>
      <Seo
        title="US Tax Forms for Expats"
        description="Plain-English explanations of the US tax forms Americans abroad encounter, from Form 1040 and the FBAR to Forms 5471, 3520 and 8854."
        path="/forms/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="Reference"
        title="Forms"
        summary="What each form is, who has to file it, and which of our services handles it. Explained without jargon."
        crumbs={crumbs}
      />
      <Section>
        <Container>
          <GroupedList groups={groups} base="/forms/" />
        </Container>
      </Section>
      <CTABand />
    </>
  )
}

/* ------------------------------------------------------------------- Countries */

export function CountriesIndexPage() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Countries' }]

  return (
    <>
      <Seo
        title="US Taxes by Country"
        description="Country guides for Americans abroad: treaty position, local pension treatment, filing deadlines and common PFIC traps."
        path="/countries/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="Where you live"
        title="Countries"
        summary="Each guide covers the treaty position, how local pensions are treated for US purposes, local versus US deadlines, and the investment products that cause trouble."
        crumbs={crumbs}
      />
      <Section>
        <Container>
          <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link to={`/countries/${c.slug}/`} className="group block">
                  <span className="font-display text-[1.0625rem] font-semibold text-ink-900 underline-offset-4 group-hover:text-accent group-hover:underline">
                    {c.title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-ink-600">
                    {c.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CTABand />
    </>
  )
}

/* ------------------------------------------------------------------- Divisions */

export function DivisionsIndexPage() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Divisions' }]

  return (
    <>
      <Seo
        title="Who We Help"
        description="US expat tax help grouped by situation: individuals and families, business owners, catch-up filers, relocations, green card holders and private clients."
        path="/divisions/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="Who we help"
        title="Divisions"
        summary="Grouped by situation rather than by service. Start with whichever sounds most like you — each lists the services relevant to it."
        crumbs={crumbs}
      />
      <Section>
        <Container>
          <ul className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2">
            {divisions.map((d) => (
              <li key={d.slug} className="bg-paper">
                <Link
                  to={`/divisions/${d.slug}/`}
                  className="flex h-full flex-col p-6 transition-colors duration-150 hover:bg-surface"
                >
                  <span className="font-display text-lg font-semibold text-ink-900">
                    {d.title}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-ink-600">{d.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CTABand />
    </>
  )
}
