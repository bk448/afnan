import { Link } from 'react-router-dom'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/marketing/PageHeader'
import { CTABand } from '@/components/marketing/CTABand'
import { FAQSection } from '@/components/marketing/ContentBlocks'
import { Seo, breadcrumbJsonLd, faqJsonLd } from '@/components/seo/Seo'

const home = { label: 'Home', href: '/' }

/* ----------------------------------------------------------------- About --- */

export function AboutPage() {
  const crumbs = [home, { label: 'About Us' }]
  return (
    <>
      <Seo
        title="About Jungle Tax"
        description="Jungle Tax provides US tax services to American expatriates — annual compliance, catch-up procedures and cross-border advisory work."
        path="/about/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="The firm"
        title="About us"
        summary="We work with Americans whose tax position spans two countries, and who have found that neither a US generalist nor a local accountant can see the whole picture."
        crumbs={crumbs}
      />
      <Section>
        <Container width="prose">
          <div className="prose-editorial text-ink-700">
            <p className="text-lg">
              Expatriate tax sits in a gap. A US accountant knows the code but not how a UK SIPP,
              an Australian superannuation fund or a Canadian TFSA actually works. A local
              accountant knows those intimately but has no reason to know that the US treats them
              as something else entirely. Clients fall into the space between.
            </p>
            <p>
              Our work is closing that gap: handling the US side properly, coordinating with the
              advisers you already use rather than displacing them, and being direct about what is
              routine and what genuinely needs attention.
            </p>
            <h2 className="mt-10 text-xl">How we work</h2>
            <ul>
              <li>Remotely, across time zones, as standard.</li>
              <li>Nothing is filed without your review and approval.</li>
              <li>We tell you when something is simpler than you feared — which is often.</li>
              <li>Where a question is outside our scope, we say so rather than improvise.</li>
            </ul>

            <div className="mt-10 rounded-md border border-rule bg-surface p-5 not-italic">
              <p className="text-sm text-ink-600">
                <strong className="font-semibold text-ink-800">Placeholder section.</strong> Team
                biographies, professional credentials, registration details and firm history are to
                be supplied by the firm. No credentials or statistics have been invented here.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <CTABand />
    </>
  )
}

/* --------------------------------------------------------------- Pricing --- */

export function PricingPage() {
  const crumbs = [home, { label: 'Pricing' }]
  const tiers = [
    {
      name: 'Annual Compliance',
      who: 'Employed or self-employed abroad, up to date or nearly so.',
      includes: [
        'Federal return with required schedules',
        'Foreign account reporting where thresholds are met',
        'Exclusion versus credit modelled on your figures',
        'Review of the prior year where available',
      ],
    },
    {
      name: 'Catch-Up & Amnesty',
      who: 'Several years behind, or newly aware of the obligation.',
      includes: [
        'Assessment of which procedure fits your facts',
        'Prior-year returns and foreign account reports',
        'Certification narrative drafted from your circumstances',
        'Submission managed end to end',
      ],
    },
    {
      name: 'Advisory & Private Client',
      who: 'Business owners, trusts and estates, and pre-move planning.',
      includes: [
        'Entity and GILTI analysis',
        'Trust, gift and inheritance reporting',
        'Relocation and expatriation planning',
        'Coordination with your existing advisers',
      ],
    },
  ]

  return (
    <>
      <Seo
        title="Pricing"
        description="How engagements are priced at Jungle Tax: fixed-fee annual compliance, catch-up projects and advisory work."
        path="/pricing/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="Fees"
        title="Pricing"
        summary="Fees are quoted in advance, in writing, before any work begins. Complexity drives cost, so a quote follows a short look at your actual situation rather than a generic list."
        crumbs={crumbs}
      />
      <Section>
        <Container>
          <ul className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule lg:grid-cols-3">
            {tiers.map((t) => (
              <li key={t.name} className="flex flex-col bg-paper p-7">
                <h2 className="font-display text-xl text-ink-900">{t.name}</h2>
                <p className="mt-2 text-sm text-ink-400">{t.who}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {t.includes.map((i) => (
                    <li key={i} className="relative pl-4 text-sm leading-relaxed text-ink-600">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.72em] h-px w-2.5 bg-rule-strong"
                      />
                      {i}
                    </li>
                  ))}
                </ul>
                <Button to="/contact/quote/" variant="secondary" className="mt-7 w-full">
                  Request a quote
                </Button>
              </li>
            ))}
          </ul>

          <div className="mt-10 max-w-[44rem] rounded-md border border-rule bg-surface p-5">
            <p className="text-sm leading-relaxed text-ink-600">
              <strong className="font-semibold text-ink-800">Figures to be confirmed.</strong> No
              fee amounts are published here pending confirmation by the firm. Deliberately, no
              illustrative or placeholder prices have been invented.
            </p>
          </div>
        </Container>
      </Section>
      <CTABand />
    </>
  )
}

/* ------------------------------------------------------------------ FAQs --- */

const SITE_FAQS = [
  {
    q: 'I have lived abroad for years and never filed. How much trouble am I in?',
    a: 'Far less than most people fear. Established procedures exist specifically for taxpayers whose failure to file was not wilful, and in most cases little or no tax is ultimately owed. The first step is establishing your facts, not filing in a hurry.',
  },
  {
    q: 'I pay full tax where I live. Why does the US still tax me?',
    a: 'The US taxes on the basis of citizenship rather than residence, which is almost unique. Mechanisms exist to prevent the same income being taxed twice, but the return itself is still required.',
  },
  {
    q: 'I owe nothing. Do I still have to file?',
    a: 'Yes, if your income exceeds the filing threshold for your status. The requirement is based on income level, not on whether tax is due.',
  },
  {
    q: 'My bank asked me to confirm I am a US person. Should I be worried?',
    a: 'These letters are routine under international reporting rules and are not an accusation. They do mean account information is being reported, so it is a sensible prompt to confirm your filing position.',
  },
  {
    q: 'Do you work with people who already have a local accountant?',
    a: 'Routinely. We handle the US side and coordinate with your local adviser rather than replacing them.',
  },
  {
    q: 'Is everything handled remotely?',
    a: 'Yes. Documents are exchanged securely and consultations are held by video or phone across time zones.',
  },
  {
    q: 'Can I book a consultation without becoming a filing client?',
    a: 'Yes. Advisory consultations are available on their own, and many people use one simply to confirm their current position is sound.',
  },
]

export function FaqsPage() {
  const crumbs = [home, { label: 'FAQs' }]
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Common questions from Americans abroad about US tax filing, catch-up procedures, double taxation and how we work."
        path="/faqs/"
        jsonLd={[breadcrumbJsonLd(crumbs), faqJsonLd(SITE_FAQS)]}
      />
      <PageHeader
        eyebrow="Answers"
        title="Frequently asked questions"
        summary="The questions we are asked most often, answered plainly."
        crumbs={crumbs}
      />
      <Section>
        <Container width="prose">
          <FAQSection faqs={SITE_FAQS} heading="General" />
        </Container>
      </Section>
      <CTABand />
    </>
  )
}

/* ------------------------------------------------------------- Resources --- */

export function ResourcesPage() {
  const crumbs = [home, { label: 'Resources' }]
  return (
    <>
      <Seo
        title="Resources"
        description="Guides and reference material on US tax for Americans living abroad."
        path="/resources/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="Reading"
        title="Resources"
        summary="Reference material and guides for Americans abroad."
        crumbs={crumbs}
      />
      <Section>
        <Container>
          <ul className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2">
            <li className="bg-paper">
              <Link
                to="/resources/deadlines/"
                className="flex h-full flex-col p-6 transition-colors duration-150 hover:bg-surface"
              >
                <span className="font-display text-lg font-semibold text-ink-900">
                  Expat Tax Deadlines Calendar
                </span>
                <span className="mt-2 text-sm leading-relaxed text-ink-600">
                  The filing and reporting dates that matter for Americans abroad, and how the
                  automatic extension works.
                </span>
              </Link>
            </li>
            <li className="bg-paper">
              <Link
                to="/forms/"
                className="flex h-full flex-col p-6 transition-colors duration-150 hover:bg-surface"
              >
                <span className="font-display text-lg font-semibold text-ink-900">
                  Form reference
                </span>
                <span className="mt-2 text-sm leading-relaxed text-ink-600">
                  Thirty US tax forms explained in plain English, with the service that handles
                  each.
                </span>
              </Link>
            </li>
          </ul>
          <p className="mt-8 text-sm text-ink-400">
            Article content to follow. No placeholder articles have been fabricated.
          </p>
        </Container>
      </Section>
      <CTABand />
    </>
  )
}

export function DeadlinesPage() {
  const crumbs = [home, { label: 'Resources', href: '/resources/' }, { label: 'Deadlines' }]
  const items = [
    {
      title: 'Standard filing deadline',
      body: 'The ordinary due date for the federal return for taxpayers inside the United States.',
    },
    {
      title: 'Automatic extension for taxpayers abroad',
      body: 'Taxpayers whose tax home is outside the US receive an automatic extension without filing anything. It extends the time to file, not the time to pay — interest runs on any balance from the original date.',
    },
    {
      title: 'Further extension',
      body: 'A longer extension can be requested where more time is needed, and a separate form exists for taxpayers waiting to satisfy a qualifying test for the foreign earned income exclusion.',
    },
    {
      title: 'Foreign account reporting',
      body: 'The FBAR has its own deadline, filed with FinCEN rather than the IRS, with an automatic extension applied.',
    },
    {
      title: 'Foreign trust reporting',
      body: 'The annual return of a foreign trust with a US owner falls earlier in the year than the related owner filing — a mismatch that is a common cause of missed deadlines.',
    },
    {
      title: 'Estimated tax',
      body: 'Where no US withholding applies, tax is paid in instalments during the year rather than in one amount at filing.',
    },
  ]

  return (
    <>
      <Seo
        title="Expat Tax Deadlines Calendar"
        description="US filing and reporting deadlines for Americans abroad, including the automatic extension and foreign account reporting dates."
        path="/resources/deadlines/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="Reference"
        title="Expat tax deadlines"
        summary="What falls due and when, and why the extension available to Americans abroad is less generous than it first appears."
        crumbs={crumbs}
      />
      <Section>
        <Container>
          <dl className="divide-y divide-rule border-y border-rule">
            {items.map((i) => (
              <div key={i.title} className="grid gap-2 py-6 lg:grid-cols-[18rem_1fr] lg:gap-10">
                <dt className="font-display text-[1.0625rem] font-semibold text-ink-900">
                  {i.title}
                </dt>
                <dd className="max-w-[62ch] leading-relaxed text-ink-600">{i.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 max-w-[44rem] rounded-md border border-rule bg-surface p-5">
            <p className="text-sm leading-relaxed text-ink-600">
              <strong className="font-semibold text-ink-800">Specific dates omitted.</strong>{' '}
              Deadlines shift with weekends, public holidays and occasional relief, so no calendar
              dates are published here pending confirmation. Please take advice on the dates that
              apply to your filing.
            </p>
          </div>
        </Container>
      </Section>
      <CTABand />
    </>
  )
}

/* ----------------------------------------------------------------- Legal --- */

interface LegalProps {
  title: string
  path: string
  description: string
  intro: string
}

export function LegalPage({ title, path, description, intro }: LegalProps) {
  const crumbs = [home, { label: title }]
  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader title={title} crumbs={crumbs} summary={intro} />
      <Section>
        <Container width="prose">
          <div className="rounded-md border border-rule bg-surface p-5">
            <p className="text-sm leading-relaxed text-ink-600">
              <strong className="font-semibold text-ink-800">Awaiting legal review.</strong> This
              page is a placeholder. Legal policy text must be drafted or approved by a qualified
              adviser for the firm&rsquo;s jurisdiction and regulatory position. No policy language
              has been invented here.
            </p>
          </div>
        </Container>
      </Section>
      <CTABand />
    </>
  )
}
