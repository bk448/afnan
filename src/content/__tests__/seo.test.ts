import { describe, expect, it } from 'vitest'
import { countries, divisions, forms, services } from '@/lib/content'
import { allRoutes } from '@/lib/routes'

/**
 * Automated SEO audit.
 *
 * Every rule here is one a manual audit would check. Running them as tests
 * means a regression fails the build rather than being discovered in Search
 * Console three months later.
 */

type SeoEntry = {
  kind: string
  slug: string
  seoTitle: string
  seoDescription: string
  summary: string
}

const allEntries: SeoEntry[] = [
  ...services.map((s) => ({ kind: 'service', ...s })),
  ...forms.map((f) => ({ kind: 'form', ...f })),
  ...countries.map((c) => ({ kind: 'country', ...c })),
  ...divisions.map((d) => ({ kind: 'division', ...d })),
]

/** Google truncates around 60 characters; the suffix " | Jungle Tax" adds 13. */
const TITLE_MAX = 60
const DESCRIPTION_MIN = 70
const DESCRIPTION_MAX = 165

describe('SEO: titles', () => {
  it('every entry has a non-empty seoTitle', () => {
    const missing = allEntries.filter((e) => !e.seoTitle?.trim())
    expect(missing.map((m) => `${m.kind}/${m.slug}`)).toEqual([])
  })

  it('no seoTitle exceeds the display limit', () => {
    const tooLong = allEntries
      .filter((e) => e.seoTitle.length > TITLE_MAX)
      .map((e) => `${e.kind}/${e.slug} (${e.seoTitle.length})`)
    expect(tooLong).toEqual([])
  })

  it('seoTitles are unique across the whole site', () => {
    const seen = new Map<string, string>()
    const duplicates: string[] = []
    for (const e of allEntries) {
      const key = e.seoTitle.toLowerCase()
      const previous = seen.get(key)
      if (previous) duplicates.push(`${e.kind}/${e.slug} duplicates ${previous}`)
      else seen.set(key, `${e.kind}/${e.slug}`)
    }
    expect(duplicates).toEqual([])
  })
})

describe('SEO: meta descriptions', () => {
  it('every entry has a description within the displayable range', () => {
    const offenders = allEntries
      .filter(
        (e) =>
          !e.seoDescription ||
          e.seoDescription.length < DESCRIPTION_MIN ||
          e.seoDescription.length > DESCRIPTION_MAX,
      )
      .map((e) => `${e.kind}/${e.slug} (${e.seoDescription?.length ?? 0})`)
    expect(offenders).toEqual([])
  })

  it('descriptions are unique across the whole site', () => {
    const seen = new Set<string>()
    const duplicates: string[] = []
    for (const e of allEntries) {
      const key = e.seoDescription.toLowerCase()
      if (seen.has(key)) duplicates.push(`${e.kind}/${e.slug}`)
      seen.add(key)
    }
    expect(duplicates).toEqual([])
  })
})

describe('SEO: route manifest', () => {
  const routes = allRoutes()

  it('contains exactly 91 canonical routes', () => {
    expect(routes).toHaveLength(91)
  })

  it('every route path is trailing-slashed', () => {
    const bad = routes.filter((r) => !r.path.endsWith('/')).map((r) => r.path)
    expect(bad).toEqual([])
  })

  it('every route path is lowercase and free of spaces', () => {
    const bad = routes.filter((r) => r.path !== r.path.toLowerCase() || /\s/.test(r.path))
    expect(bad.map((r) => r.path)).toEqual([])
  })

  it('no duplicate routes', () => {
    const paths = routes.map((r) => r.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('every content entry appears in the manifest', () => {
    const paths = new Set(routes.map((r) => r.path))
    const missing: string[] = []
    for (const s of services) if (!paths.has(`/services/${s.slug}/`)) missing.push(s.slug)
    for (const f of forms) if (!paths.has(`/forms/${f.slug}/`)) missing.push(f.slug)
    for (const c of countries) if (!paths.has(`/countries/${c.slug}/`)) missing.push(c.slug)
    for (const d of divisions) if (!paths.has(`/divisions/${d.slug}/`)) missing.push(d.slug)
    expect(missing).toEqual([])
  })

  it('priorities are within the valid sitemap range', () => {
    const bad = routes.filter((r) => r.priority < 0 || r.priority > 1)
    expect(bad.map((r) => r.path)).toEqual([])
  })
})

describe('SEO: content quality signals', () => {
  it('every service has substantive body copy', () => {
    const thin = services
      .filter((s) => s.overview.length < 300 || s.details.length === 0)
      .map((s) => s.slug)
    expect(thin).toEqual([])
  })

  it('every form has substantive body copy', () => {
    const thin = forms
      .filter((f) => f.overview.length < 250 || f.details.length === 0)
      .map((f) => f.slug)
    expect(thin).toEqual([])
  })

  it('every country page fills all required template sections', () => {
    const incomplete = countries
      .filter((c) => !c.treaty || !c.pensions || !c.deadlines || !c.pficTraps)
      .map((c) => c.slug)
    expect(incomplete).toEqual([])
  })
})
