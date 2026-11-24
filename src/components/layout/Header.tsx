import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { ArrowRight, ChevronDown, ChevronLeft, Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { countries, divisions, formsByGroup, servicesByGroup } from '@/lib/content'

/* ════════════════════════════════════════════════════════════════ wordmark */

function Wordmark() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 whitespace-nowrap"
      aria-label="Jungle Tax, home"
    >
      <span
        aria-hidden="true"
        className="h-6 w-px bg-accent transition-all duration-300 group-hover:h-7"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-semibold tracking-[-0.015em] text-ink-900">
          Jungle Tax
        </span>
        <span className="mt-0.5 text-[0.62rem] uppercase tracking-[0.16em] text-ink-400">
          US Expat Tax
        </span>
      </span>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════ desktop mega-menu */

const trigger =
  'group inline-flex items-center gap-1 px-3 py-2 text-[0.9rem] text-ink-700 transition-colors duration-200 hover:text-ink-900 data-[state=open]:text-accent'

/**
 * Positioned against the <header>, not the nav root, so it spans the full
 * header width. `w-screen` would include the scrollbar and cause horizontal
 * page scroll.
 */
const panel =
  'absolute inset-x-0 top-full z-50 max-h-[calc(100vh-4.25rem)] overflow-y-auto border-y border-rule bg-paper shadow-[0_18px_40px_-20px_rgb(14_34_56/0.28)] data-[state=open]:animate-[fade-in_180ms_ease-out]'

/** Left rail: orients the visitor before they scan a long list. */
function PanelIntro({
  title,
  body,
  to,
  cta,
}: {
  title: string
  body: string
  to: string
  cta: string
}) {
  return (
    <div className="shrink-0 border-r border-rule pr-8 lg:w-[14.5rem]">
      <p className="font-display text-lg font-semibold text-ink-900">{title}</p>
      <p className="mt-2.5 text-[0.8rem] leading-[1.6] text-ink-600">{body}</p>
      <NavigationMenu.Link asChild>
        <Link
          to={to}
          className="group mt-4 inline-flex items-center gap-1.5 text-[0.8rem] text-accent underline-offset-4 hover:underline"
        >
          {cta}
          <ArrowRight
            className="size-3 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </NavigationMenu.Link>
    </div>
  )
}

interface MenuEntry {
  slug: string
  label: string
  mono?: string
}

/** Groups flow into balanced columns; `break-inside-avoid` keeps each intact. */
function PanelGroups({
  groups,
  base,
  columns = 3,
}: {
  groups: { group: string; items: MenuEntry[] }[]
  base: string
  columns?: 2 | 3
}) {
  return (
    <div className={cn('min-w-0 flex-1', columns === 3 ? 'lg:columns-3' : 'lg:columns-2', 'gap-9')}>
      {groups.map((g) => (
        <div key={g.group} className="mb-6 break-inside-avoid">
          <p className="eyebrow mb-2.5 border-b border-rule pb-1.5">{g.group}</p>
          <ul className="space-y-1.5">
            {g.items.map((item) => (
              <li key={item.slug}>
                <NavigationMenu.Link asChild>
                  <Link
                    to={`${base}${item.slug}/`}
                    className="group flex items-baseline gap-1.5 text-[0.825rem] leading-snug text-ink-600 transition-colors duration-200 hover:text-accent"
                  >
                    {item.mono && (
                      <span className="form-number shrink-0 text-ink-800 transition-colors duration-200 group-hover:text-accent">
                        {item.mono}
                      </span>
                    )}
                    <span className="underline-offset-4 group-hover:underline">{item.label}</span>
                  </Link>
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** Shared bottom bar — keeps the booking action reachable from any panel. */
function PanelFooter({ note }: { note: string }) {
  return (
    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
      <p className="text-[0.8rem] text-ink-400">{note}</p>
      <NavigationMenu.Link asChild>
        <Link
          to="/contact/book/"
          className="group inline-flex items-center gap-1.5 text-[0.825rem] font-medium text-accent underline-offset-4 hover:underline"
        >
          Book a consultation
          <ArrowRight
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </NavigationMenu.Link>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════ header */

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const serviceGroups = servicesByGroup().map((g) => ({
    group: g.group,
    items: g.items.map((s) => ({ slug: s.slug, label: s.title })),
  }))

  const formGroups = formsByGroup().map((g) => ({
    group: g.group,
    items: g.items.map((f) => ({
      slug: f.slug,
      mono: f.formNumber,
      label: f.officialName,
    })),
  }))

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/92 backdrop-blur-[3px] [&_[data-radix-navigation-menu-viewport]]:hidden">
      <Container>
        <div className="flex h-[4.25rem] items-center justify-between gap-4">
          <Wordmark />

          {/* ─────────────────────────────────────────────── desktop nav */}
          <NavigationMenu.Root className="hidden xl:block" delayDuration={100}>
            <NavigationMenu.List className="flex items-center">
              {/* Divisions */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={trigger}>
                  Who we help
                  <ChevronDown
                    className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={panel}>
                  <Container className="py-9">
                    <div className="flex gap-9">
                      <PanelIntro
                        title="Who we help"
                        body="Grouped by situation rather than service. Start with whichever sounds most like you."
                        to="/divisions/"
                        cta="All divisions"
                      />
                      <ul className="grid min-w-0 flex-1 gap-x-9 gap-y-5 lg:grid-cols-3">
                        {divisions.map((d) => (
                          <li key={d.slug}>
                            <NavigationMenu.Link asChild>
                              <Link to={`/divisions/${d.slug}/`} className="group block">
                                <span className="font-display text-[0.95rem] font-semibold text-ink-900 transition-colors duration-200 group-hover:text-accent">
                                  {d.title}
                                </span>
                                <span className="mt-1 block text-[0.8rem] leading-[1.55] text-ink-600">
                                  {d.summary}
                                </span>
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <PanelFooter note="Not sure which fits? Most people overlap two or three." />
                  </Container>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* Services */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={trigger}>
                  Services
                  <ChevronDown
                    className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={panel}>
                  <Container className="py-9">
                    <div className="flex gap-9">
                      <PanelIntro
                        title="Services"
                        body="Twenty-three services across seven areas, from annual filing to catch-up procedures and cross-border planning."
                        to="/services/"
                        cta="All services"
                      />
                      <PanelGroups groups={serviceGroups} base="/services/" />
                    </div>
                    <PanelFooter note="Looking for a specific IRS form instead? See Forms." />
                  </Container>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* Forms */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={trigger}>
                  Forms
                  <ChevronDown
                    className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={panel}>
                  <Container className="py-9">
                    <div className="flex gap-9">
                      <PanelIntro
                        title="Forms"
                        body="Thirty US tax forms explained in plain English, each linked to the service that handles it."
                        to="/forms/"
                        cta="All forms"
                      />
                      <PanelGroups groups={formGroups} base="/forms/" />
                    </div>
                    <PanelFooter note="Every form page links back to the service that files it." />
                  </Container>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* Countries */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={trigger}>
                  Countries
                  <ChevronDown
                    className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={panel}>
                  <Container className="py-9">
                    <div className="flex gap-9">
                      <PanelIntro
                        title="Countries"
                        body="Treaty position, local pension treatment, filing deadlines and the investment products that cause trouble."
                        to="/countries/"
                        cta="All countries"
                      />
                      <ul className="grid min-w-0 flex-1 gap-x-9 gap-y-2 lg:grid-cols-4">
                        {countries.map((c) => (
                          <li key={c.slug}>
                            <NavigationMenu.Link asChild>
                              <Link
                                to={`/countries/${c.slug}/`}
                                className="block text-[0.825rem] text-ink-600 underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
                              >
                                {c.title}
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <PanelFooter note="Sixteen guides, each following the same structure." />
                  </Container>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <NavLink to="/pricing/" className={trigger}>
                    Pricing
                  </NavLink>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <NavLink to="/about/" className={trigger}>
                    About
                  </NavLink>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>

          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <Button to="/contact/book/" size="sm">
              Book a Consultation
            </Button>
          </div>

          {/* ───────────────────────────────────────────── mobile toggle */}
          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-ink-800 transition-colors duration-200 hover:bg-surface xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {mobileOpen && <MobileNav onNavigate={() => setMobileOpen(false)} />}
    </header>
  )
}

/* ═══════════════════════════════════════════ mobile: layered drawer ══════ */

type Panel = 'root' | 'divisions' | 'services' | 'forms' | 'countries'

const PANEL_TITLES: Record<Exclude<Panel, 'root'>, string> = {
  divisions: 'Who we help',
  services: 'Services',
  forms: 'Forms',
  countries: 'Countries',
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [panel, setPanel] = useState<Panel>('root')

  const rootItems: { label: string; panel: Exclude<Panel, 'root'>; count: number }[] = [
    { label: 'Who we help', panel: 'divisions', count: divisions.length },
    { label: 'Services', panel: 'services', count: 23 },
    { label: 'Forms', panel: 'forms', count: 30 },
    { label: 'Countries', panel: 'countries', count: countries.length },
  ]

  const directItems = [
    { to: '/pricing/', label: 'Pricing' },
    { to: '/faqs/', label: 'FAQs' },
    { to: '/resources/', label: 'Resources' },
    { to: '/about/', label: 'About' },
    { to: '/contact/', label: 'Contact' },
  ]

  return (
    <div
      id="mobile-nav"
      className="fixed inset-x-0 bottom-0 top-[4.25rem] z-40 overflow-y-auto overscroll-contain border-t border-rule bg-paper xl:hidden"
    >
      <Container className="py-5">
        {panel !== 'root' ? (
          <>
            <button
              type="button"
              onClick={() => setPanel('root')}
              className="-ml-1 mb-5 inline-flex items-center gap-1.5 py-1 text-sm text-accent"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              All sections
            </button>
            <p className="eyebrow mb-5">{PANEL_TITLES[panel]}</p>
          </>
        ) : null}

        {panel === 'root' && (
          <nav aria-label="Main">
            <ul className="divide-y divide-rule border-y border-rule">
              {rootItems.map((item) => (
                <li key={item.panel}>
                  <button
                    type="button"
                    onClick={() => setPanel(item.panel)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-[1.0625rem] text-ink-800"
                  >
                    <span>{item.label}</span>
                    <span className="flex items-center gap-2.5">
                      <span className="form-number text-xs text-ink-400">{item.count}</span>
                      <ChevronDown className="size-4 -rotate-90 text-ink-400" aria-hidden="true" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <ul className="mt-1 divide-y divide-rule border-b border-rule">
              {directItems.map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    onClick={onNavigate}
                    className="block py-4 text-[1.0625rem] text-ink-800"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {panel === 'divisions' && (
          <ul className="space-y-5">
            {divisions.map((d) => (
              <li key={d.slug}>
                <Link to={`/divisions/${d.slug}/`} onClick={onNavigate} className="block">
                  <span className="font-display font-semibold text-ink-900">{d.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-600">
                    {d.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {panel === 'countries' && (
          <ul className="grid grid-cols-2 gap-x-5 gap-y-3">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/countries/${c.slug}/`}
                  onClick={onNavigate}
                  className="block text-sm text-ink-700"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {panel === 'services' &&
          servicesByGroup().map((g) => (
            <section key={g.group} className="mb-7">
              <p className="mb-2.5 border-b border-rule pb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-400">
                {g.group}
              </p>
              <ul className="space-y-2.5">
                {g.items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}/`}
                      onClick={onNavigate}
                      className="block text-sm leading-snug text-ink-700"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

        {panel === 'forms' &&
          formsByGroup().map((g) => (
            <section key={g.group} className="mb-7">
              <p className="mb-2.5 border-b border-rule pb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-400">
                {g.group}
              </p>
              <ul className="space-y-2.5">
                {g.items.map((f) => (
                  <li key={f.slug}>
                    <Link
                      to={`/forms/${f.slug}/`}
                      onClick={onNavigate}
                      className="flex items-baseline gap-2 text-sm leading-snug"
                    >
                      <span className="form-number shrink-0 text-ink-900">{f.formNumber}</span>
                      <span className="text-ink-600">{f.officialName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

        <div className="sticky bottom-0 -mx-4 mt-8 border-t border-rule bg-paper px-4 py-4 sm:-mx-6 sm:px-6">
          <Button to="/contact/book/" className="w-full" size="lg">
            Book a Consultation
          </Button>
        </div>
      </Container>
    </div>
  )
}
