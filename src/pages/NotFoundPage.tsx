import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Seo } from '@/components/seo/Seo'

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you were looking for could not be found."
        path="/404/"
      />
      <Section>
        <Container width="prose">
          <p className="eyebrow mb-4">404</p>
          <h1 className="text-3xl sm:text-4xl">We could not find that page</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">
            The page may have moved, or the address may be slightly off. The sections below cover
            everything on this site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/services/">Browse services</Button>
            <Button to="/forms/" variant="secondary">
              Browse forms
            </Button>
            <Button to="/countries/" variant="secondary">
              Browse countries
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
