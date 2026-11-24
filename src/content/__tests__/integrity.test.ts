import { describe, expect, it } from 'vitest'
import { countries, divisions, forms, services } from '@/lib/content'

/**
 * Content-integrity tests.
 *
 * This architecture's main exposure is a broken link graph as content grows.
 * Typed slug unions catch typos at compile time; these tests catch the things
 * types cannot — orphans, one-way relations and missing required links.
 */

const serviceSlugs = new Set(services.map((s) => s.slug))
const formSlugs = new Set(forms.map((f) => f.slug))
const divisionSlugs = new Set(divisions.map((d) => d.slug))

describe('slugs', () => {
  it('are unique within each collection', () => {
    expect(serviceSlugs.size).toBe(services.length)
    expect(formSlugs.size).toBe(forms.length)
    expect(divisionSlugs.size).toBe(divisions.length)
    expect(new Set(countries.map((c) => c.slug)).size).toBe(countries.length)
  })

  it('match the expected collection sizes', () => {
    expect(services).toHaveLength(23)
    expect(forms).toHaveLength(30)
    expect(countries).toHaveLength(16)
    expect(divisions).toHaveLength(6)
  })

  it('are URL-safe', () => {
    const all = [...serviceSlugs, ...formSlugs, ...divisionSlugs, ...countries.map((c) => c.slug)]
    const bad = all.filter((s) => !/^[a-z0-9-]+$/.test(s))
    expect(bad).toEqual([])
  })
})

describe('cross-links resolve', () => {
  it('service → form links all resolve', () => {
    const broken: string[] = []
    for (const s of services) {
      for (const f of s.relatedForms) if (!formSlugs.has(f)) broken.push(`${s.slug} → ${f}`)
    }
    expect(broken).toEqual([])
  })

  it('service → service links all resolve and are not self-referential', () => {
    const broken: string[] = []
    for (const s of services) {
      for (const r of s.relatedServices) {
        if (!serviceSlugs.has(r)) broken.push(`${s.slug} → ${r}`)
        if (r === s.slug) broken.push(`${s.slug} links to itself`)
      }
    }
    expect(broken).toEqual([])
  })

  it('service → division links all resolve', () => {
    const broken: string[] = []
    for (const s of services) {
      for (const d of s.relatedDivisions) if (!divisionSlugs.has(d)) broken.push(`${s.slug} → ${d}`)
    }
    expect(broken).toEqual([])
  })

  it('form → service links all resolve', () => {
    const broken: string[] = []
    for (const f of forms) {
      for (const s of f.relatedServices) if (!serviceSlugs.has(s)) broken.push(`${f.slug} → ${s}`)
    }
    expect(broken).toEqual([])
  })

  it('form → form links all resolve and are not self-referential', () => {
    const broken: string[] = []
    for (const f of forms) {
      for (const r of f.relatedForms ?? []) {
        if (!formSlugs.has(r)) broken.push(`${f.slug} → ${r}`)
        if (r === f.slug) broken.push(`${f.slug} links to itself`)
      }
    }
    expect(broken).toEqual([])
  })

  it('division and country links all resolve', () => {
    const broken: string[] = []
    for (const d of divisions) {
      for (const s of d.relatedServices) if (!serviceSlugs.has(s)) broken.push(`${d.slug} → ${s}`)
      for (const f of d.relatedForms ?? []) if (!formSlugs.has(f)) broken.push(`${d.slug} → ${f}`)
    }
    for (const c of countries) {
      for (const s of c.relatedServices) if (!serviceSlugs.has(s)) broken.push(`${c.slug} → ${s}`)
    }
    expect(broken).toEqual([])
  })
})

describe('reciprocity', () => {
  it('every form listed by a service lists that service back', () => {
    const violations: string[] = []
    for (const service of services) {
      for (const formSlug of service.relatedForms) {
        const form = forms.find((f) => f.slug === formSlug)
        if (form && !form.relatedServices.includes(service.slug)) {
          violations.push(`${service.slug} lists ${formSlug}, but ${formSlug} does not link back`)
        }
      }
    }
    expect(violations).toEqual([])
  })
})

describe('no dead ends', () => {
  it('every form routes onward to at least one service', () => {
    const orphans = forms.filter((f) => f.relatedServices.length === 0).map((f) => f.slug)
    expect(orphans).toEqual([])
  })

  it('every division lists at least one service', () => {
    const orphans = divisions.filter((d) => d.relatedServices.length === 0).map((d) => d.slug)
    expect(orphans).toEqual([])
  })

  it('every country lists at least one service', () => {
    const orphans = countries.filter((c) => c.relatedServices.length === 0).map((c) => c.slug)
    expect(orphans).toEqual([])
  })

  it('every form is reachable from at least one service', () => {
    const linked = new Set(services.flatMap((s) => s.relatedForms))
    const unreachable = forms.filter((f) => !linked.has(f.slug)).map((f) => f.slug)
    expect(unreachable).toEqual([])
  })

  it('every service is reachable from at least one division or country', () => {
    const linked = new Set([
      ...divisions.flatMap((d) => d.relatedServices),
      ...countries.flatMap((c) => c.relatedServices),
    ])
    const unreachable = services.filter((s) => !linked.has(s.slug)).map((s) => s.slug)
    expect(unreachable).toEqual([])
  })
})

describe('compliance guardrails', () => {
  /** Figures change annually; a wrong one on a tax firm's site is a liability. */
  const CURRENCY = /(?:\$|USD\s?|£|€)\s?\d/
  const PERCENT = /\b\d+(?:\.\d+)?\s?%/

  const textOf = (o: unknown): string =>
    typeof o === 'string'
      ? o
      : Array.isArray(o)
        ? o.map(textOf).join(' ')
        : o && typeof o === 'object'
          ? Object.values(o).map(textOf).join(' ')
          : ''

  const collections = [
    ['service', services],
    ['form', forms],
    ['country', countries],
    ['division', divisions],
  ] as const

  it('no copy states a specific monetary figure', () => {
    const offenders: string[] = []
    for (const [kind, items] of collections) {
      for (const item of items) {
        if (CURRENCY.test(textOf(item))) offenders.push(`${kind}/${item.slug}`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('no copy states a specific tax rate', () => {
    const offenders: string[] = []
    for (const [kind, items] of collections) {
      for (const item of items) {
        if (PERCENT.test(textOf(item))) offenders.push(`${kind}/${item.slug}`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('amnesty services carry the required disclaimer flag', () => {
    const amnesty = services.filter((s) => s.group === 'Catch-Up & Amnesty')
    const missing = amnesty
      .filter((s) => s.slug !== 'amended-returns' && !s.requiresDisclaimer)
      .map((s) => s.slug)
    expect(missing).toEqual([])
  })

  it('all generated copy is still marked draft, pending professional review', () => {
    const reviewed = [...services, ...forms, ...countries, ...divisions].filter(
      (e) => e.reviewStatus !== 'draft',
    )
    expect(reviewed.map((e) => e.slug)).toEqual([])
  })
})
