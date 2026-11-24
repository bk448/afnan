import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

interface CTABandProps {
  heading?: string
  body?: string
}

/**
 * Every page funnels here. One primary action, one secondary — never more.
 * Confidence, not pressure: no countdowns, no scarcity.
 */
export function CTABand({
  heading = 'Not sure where you stand?',
  body = 'A consultation establishes your position and the options actually available to you — before anything is filed.',
}: CTABandProps) {
  return (
    <section className="paper-grain relative overflow-hidden border-t border-rule bg-ink-800 text-white">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_28rem_at_82%_-20%,rgba(154,107,63,0.22),transparent_62%)]"
      />
      <Container className="relative py-16 sm:py-20">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[40rem]">
            <h2 className="font-display text-2xl tracking-[-0.015em] text-white sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.68] text-white/70">{body}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button to="/contact/book/" variant="accent">
              Book a Consultation
            </Button>
            <Button
              to="/contact/quote/"
              variant="secondary"
              className="border-white/40 text-white hover:bg-white hover:text-ink-800"
            >
              Request a Quote
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
