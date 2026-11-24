import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { countries, divisions, services } from '@/lib/content'

const utility = [
  { to: '/pricing/', label: 'Pricing' },
  { to: '/faqs/', label: 'FAQs' },
  { to: '/resources/', label: 'Resources' },
  { to: '/resources/deadlines/', label: 'Deadlines Calendar' },
  { to: '/about/', label: 'About Us' },
  { to: '/contact/', label: 'Contact' },
]

const legal = [
  { to: '/privacy/', label: 'Privacy Policy' },
  { to: '/terms/', label: 'Terms of Engagement' },
  { to: '/cookies/', label: 'Cookie Policy' },
]

function Column({
  heading,
  items,
}: {
  heading: string
  items: { to: string; label: string }[]
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
        {heading}
      </p>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="text-sm text-white/75 underline-offset-4 transition-colors duration-150 hover:text-white hover:underline"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const featuredServices = services
    .filter((s) =>
      ['expat-tax-returns', 'streamlined-filing', 'fbar', 'fatca', 'pfic', 'foreign-entities'].includes(
        s.slug,
      ),
    )
    .map((s) => ({ to: `/services/${s.slug}/`, label: s.title }))

  const featuredCountries = countries
    .filter((c) => ['uk', 'canada', 'australia', 'germany', 'france', 'uae'].includes(c.slug))
    .map((c) => ({ to: `/countries/${c.slug}/`, label: c.title }))

  const divisionLinks = divisions.map((d) => ({
    to: `/divisions/${d.slug}/`,
    label: d.title,
  }))

  return (
    <footer className="mt-auto bg-ink-800 text-white">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="font-display text-lg font-semibold">Jungle Tax</p>
            <p className="mt-2 max-w-[22rem] text-sm leading-relaxed text-white/65">
              US tax services for American expatriates — annual filing, catch-up procedures and
              cross-border advice.
            </p>
          </div>

          <Column heading="Who we help" items={divisionLinks} />
          <Column heading="Services" items={featuredServices} />
          <Column heading="Countries" items={featuredCountries} />
          <Column heading="Firm" items={utility} />
        </div>

        <div className="mt-12 border-t border-white/15 pt-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-3xl text-xs leading-relaxed text-white/50">
              The information on this site is general in nature and does not constitute tax, legal
              or financial advice, nor does using this site create a client relationship. Tax rules
              change and depend on individual circumstances. Please take advice before acting.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-xs text-white/60 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-xs text-white/60 hover:text-white"
                  rel="noopener noreferrer"
                >
                  Client Portal
                </a>
              </li>
            </ul>
          </div>
          <p className="mt-6 text-xs text-white/40">
            &copy; {new Date().getFullYear()} Jungle Tax. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
