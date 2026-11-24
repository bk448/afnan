import { Link } from 'react-router-dom'
import { Container, Section } from '@/components/ui/Container'
import { PageHeader } from '@/components/marketing/PageHeader'
import { Seo, breadcrumbJsonLd } from '@/components/seo/Seo'
import { BookingFlow } from '@/features/booking/BookingFlow'

const home = { label: 'Home', href: '/' }

export function ContactPage() {
  const crumbs = [home, { label: 'Contact' }]
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Jungle Tax about US tax for Americans abroad — book a consultation or request a quote."
        path="/contact/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        summary="Two ways to start, depending on whether you want advice or a price."
        crumbs={crumbs}
      />
      <Section>
        <Container>
          <ul className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2">
            <li className="bg-paper">
              <Link to="/contact/book/" className="flex h-full flex-col p-7 hover:bg-surface">
                <span className="font-display text-xl text-ink-900">Book a consultation</span>
                <span className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  A structured conversation about your position and the options actually open to
                  you. The right starting point if you are unsure where you stand.
                </span>
              </Link>
            </li>
            <li className="bg-paper">
              <Link to="/contact/quote/" className="flex h-full flex-col p-7 hover:bg-surface">
                <span className="font-display text-xl text-ink-900">Request a quote</span>
                <span className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  If you already know what you need done, tell us the scope and we will quote in
                  writing before any work begins.
                </span>
              </Link>
            </li>
          </ul>

          <div className="mt-8 max-w-[44rem] rounded-md border border-rule bg-surface p-5">
            <p className="text-sm leading-relaxed text-ink-600">
              <strong className="font-semibold text-ink-800">Contact details to follow.</strong>{' '}
              Telephone, email and office details are to be supplied by the firm.
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}

export function BookConsultationPage() {
  const crumbs = [home, { label: 'Contact', href: '/contact/' }, { label: 'Book a Consultation' }]
  return (
    <>
      <Seo
        title="Book a Consultation"
        description="Request a consultation about your US tax position as an American abroad. A few questions so we can prepare properly."
        path="/contact/book/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="Consultation"
        title="Book a consultation"
        summary="Four short steps. Nothing here is a tax return, and none of it commits you to anything."
        crumbs={crumbs}
      />
      <Section>
        <Container>
          <BookingFlow />
        </Container>
      </Section>
    </>
  )
}

export function RequestQuotePage() {
  const crumbs = [home, { label: 'Contact', href: '/contact/' }, { label: 'Request a Quote' }]
  return (
    <>
      <Seo
        title="Request a Quote"
        description="Request a written fee quote for US expat tax work. Scope confirmed in advance, before any work begins."
        path="/contact/quote/"
        jsonLd={breadcrumbJsonLd(crumbs)}
      />
      <PageHeader
        eyebrow="Fees"
        title="Request a quote"
        summary="Tell us roughly what you need and we will come back with a written fee before any work starts."
        crumbs={crumbs}
      />
      <Section>
        <Container>
          <BookingFlow />
        </Container>
      </Section>
    </>
  )
}
