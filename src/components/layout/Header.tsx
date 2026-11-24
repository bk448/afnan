import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { countries, divisions, formsByGroup, servicesByGroup } from '@/lib/content'

/* -------------------------------------------------------------------------- */

function Wordmark() {
  return (
    <Link to="/" className="group flex items-baseline gap-2" aria-label="Jungle Tax, home">
      <span className="font-display text-xl font-semibold tracking-tight text-ink-900">
        Jungle Tax
      </span>
      <span className="hidden text-xs tracking-wide text-ink-400 sm:inline">US Expat Tax</span>
    </Link>
  )
}

const triggerClass =
  'inline-flex items-center gap-1 px-3 py-2 text-[0.95rem] text-ink-800 transition-colors duration-150 hover:text-accent data-[state=open]:text-accent'

const panelClass =
  'absolute left-0 top-full z-50 w-full border-t border-rule bg-paper shadow-[0_12px_28px_-12px_rgb(14_34_56/0.22)]'

function GroupColumn({
  heading,
  items,
  base,
  mono,
}: {
  heading: string
  items: { slug: string; title: string; formNumber?: string }[]
  base: string
  mono?: boolean
}) {
  return (
    <div className="break-inside-avoid">
      <p className="eyebrow mb-2.5">{heading}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.slug}>
            <NavigationMenu.Link asChild>
              <Link
                to={`${base}${item.slug}/`}
                className="block text-sm leading-snug text-ink-600 underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline"
              >
                {mono && item.formNumber ? (
                  <>
                    <span className="form-number text-ink-800">{item.formNumber}</span>
                    <span className="text-ink-400"> · </span>
                    <span>{item.title.replace(/^(Form|Schedule|FinCEN)\s[\w-]+\s?/, '')}</span>
                  </>
                ) : (
                  item.title
                )}
              </Link>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const serviceGroups = servicesByGroup()
  const formGroups = formsByGroup()

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-[2px]">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Wordmark />

          {/* ------------------------------ desktop ------------------------ */}
          <NavigationMenu.Root className="relative hidden lg:block" delayDuration={120}>
            <NavigationMenu.List className="flex items-center">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerClass}>
                  Divisions
                  <ChevronDown className="size-3.5" aria-hidden="true" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={panelClass}>
                  <Container className="py-8">
                    <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                      <GroupColumn
                        heading="Browse by who you are"
                        items={divisions}
                        base="/divisions/"
                      />
                      <div className="col-span-2 border-l border-rule pl-10">
                        <p className="prose-editorial text-sm text-ink-600">
                          Divisions group our work by situation rather than by service. If you are
                          not sure which applies, start with the one that sounds most like you —
                          each lists the services relevant to it.
                        </p>
                        <Link
                          to="/divisions/"
                          className="mt-4 inline-block text-sm text-accent underline underline-offset-4"
                        >
                          See all divisions
                        </Link>
                      </div>
                    </div>
                  </Container>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerClass}>
                  Services
                  <ChevronDown className="size-3.5" aria-hidden="true" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={panelClass}>
                  <Container className="py-8">
                    <div className="grid grid-cols-4 gap-x-8 gap-y-7">
                      {serviceGroups.map((g) => (
                        <GroupColumn
                          key={g.group}
                          heading={g.group}
                          items={g.items}
                          base="/services/"
                        />
                      ))}
                    </div>
                  </Container>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerClass}>
                  Forms
                  <ChevronDown className="size-3.5" aria-hidden="true" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={panelClass}>
                  <Container className="py-8">
                    <div className="grid grid-cols-4 gap-x-8 gap-y-7">
                      {formGroups.map((g) => (
                        <GroupColumn
                          key={g.group}
                          heading={g.group}
                          items={g.items}
                          base="/forms/"
                          mono
                        />
                      ))}
                    </div>
                  </Container>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerClass}>
                  Countries
                  <ChevronDown className="size-3.5" aria-hidden="true" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={panelClass}>
                  <Container className="py-8">
                    <p className="eyebrow mb-3">Browse by where you live</p>
                    <ul className="grid grid-cols-4 gap-x-8 gap-y-2">
                      {countries.map((c) => (
                        <li key={c.slug}>
                          <NavigationMenu.Link asChild>
                            <Link
                              to={`/countries/${c.slug}/`}
                              className="block text-sm text-ink-600 underline-offset-4 hover:text-accent hover:underline"
                            >
                              {c.title}
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </Container>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <NavLink to="/pricing/" className={triggerClass}>
                    Pricing
                  </NavLink>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>

          <div className="hidden items-center gap-3 lg:flex">
            <Button to="/contact/book/" size="sm">
              Book a Consultation
            </Button>
          </div>

          {/* ------------------------------ mobile toggle ------------------ */}
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-sm text-ink-800 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {mobileOpen && <MobileNav />}
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/* Mobile: layered drawer, never a 91-item scroll                              */
/* -------------------------------------------------------------------------- */

type Panel = 'root' | 'divisions' | 'services' | 'forms' | 'countries'

function MobileNav() {
  const [panel, setPanel] = useState<Panel>('root')

  const rootItems: { label: string; panel: Panel }[] = [
    { label: 'Divisions', panel: 'divisions' },
    { label: 'Services', panel: 'services' },
    { label: 'Forms', panel: 'forms' },
    { label: 'Countries', panel: 'countries' },
  ]

  return (
    <div
      id="mobile-nav"
      className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-rule bg-paper lg:hidden"
    >
      <Container className="py-5">
        {panel !== 'root' && (
          <button
            type="button"
            onClick={() => setPanel('root')}
            className="mb-4 text-sm text-accent underline underline-offset-4"
          >
            &larr; Back
          </button>
        )}

        {panel === 'root' && (
          <ul className="divide-y divide-rule">
            {rootItems.map((item) => (
              <li key={item.panel}>
                <button
                  type="button"
                  onClick={() => setPanel(item.panel)}
                  className="flex w-full items-center justify-between py-3.5 text-left text-ink-800"
                >
                  {item.label}
                  <ChevronDown className="size-4 -rotate-90" aria-hidden="true" />
                </button>
              </li>
            ))}
            <li>
              <Link to="/pricing/" className="block py-3.5 text-ink-800">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/faqs/" className="block py-3.5 text-ink-800">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/contact/" className="block py-3.5 text-ink-800">
                Contact
              </Link>
            </li>
          </ul>
        )}

        {panel === 'divisions' && (
          <MobileList base="/divisions/" items={divisions} heading="Divisions" />
        )}
        {panel === 'countries' && (
          <MobileList base="/countries/" items={countries} heading="Countries" />
        )}
        {panel === 'services' &&
          servicesByGroup().map((g) => (
            <MobileList key={g.group} base="/services/" items={g.items} heading={g.group} />
          ))}
        {panel === 'forms' &&
          formsByGroup().map((g) => (
            <MobileList key={g.group} base="/forms/" items={g.items} heading={g.group} />
          ))}

        <div className="mt-6">
          <Button to="/contact/book/" className="w-full">
            Book a Consultation
          </Button>
        </div>
      </Container>
    </div>
  )
}

function MobileList({
  base,
  items,
  heading,
}: {
  base: string
  items: { slug: string; title: string }[]
  heading: string
}) {
  return (
    <div className="mb-6">
      <p className="eyebrow mb-2">{heading}</p>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.slug}>
            <Link to={`${base}${i.slug}/`} className="block text-sm text-ink-600">
              {i.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
