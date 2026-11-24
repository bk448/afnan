import { countries, divisions, forms, services } from '@/lib/content'

export interface RouteEntry {
  /** Canonical path, always trailing-slashed. */
  path: string
  priority: number
  changefreq: 'weekly' | 'monthly' | 'yearly'
}

const STATIC_ROUTES: RouteEntry[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about/', priority: 0.6, changefreq: 'monthly' },
  { path: '/divisions/', priority: 0.7, changefreq: 'monthly' },
  { path: '/services/', priority: 0.8, changefreq: 'monthly' },
  { path: '/forms/', priority: 0.7, changefreq: 'monthly' },
  { path: '/countries/', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact/', priority: 0.8, changefreq: 'yearly' },
  { path: '/contact/book/', priority: 1.0, changefreq: 'yearly' },
  { path: '/contact/quote/', priority: 0.9, changefreq: 'yearly' },
  { path: '/pricing/', priority: 0.8, changefreq: 'monthly' },
  { path: '/faqs/', priority: 0.7, changefreq: 'monthly' },
  { path: '/resources/', priority: 0.6, changefreq: 'weekly' },
  { path: '/resources/deadlines/', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy/', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms/', priority: 0.3, changefreq: 'yearly' },
  { path: '/cookies/', priority: 0.3, changefreq: 'yearly' },
]

/** Country pages weighted for a UK-based firm. */
const COUNTRY_PRIORITY: Record<string, number> = {
  uk: 0.9,
  canada: 0.8,
  germany: 0.8,
  france: 0.8,
  australia: 0.8,
  portugal: 0.8,
  uae: 0.8,
}

/** All 91 canonical routes, derived from content so it cannot drift. */
export function allRoutes(): RouteEntry[] {
  return [
    ...STATIC_ROUTES,
    ...divisions.map((d) => ({
      path: `/divisions/${d.slug}/`,
      priority: d.slug === 'catch-up' ? 0.8 : 0.7,
      changefreq: 'monthly' as const,
    })),
    ...services.map((s) => ({
      path: `/services/${s.slug}/`,
      priority: ['expat-tax-returns', 'fbar', 'streamlined-filing', 'feie-ftc'].includes(s.slug)
        ? 0.9
        : 0.7,
      changefreq: 'monthly' as const,
    })),
    ...forms.map((f) => ({
      path: `/forms/${f.slug}/`,
      priority: ['fbar', '8938'].includes(f.slug) ? 0.8 : 0.6,
      changefreq: 'yearly' as const,
    })),
    ...countries.map((c) => ({
      path: `/countries/${c.slug}/`,
      priority: COUNTRY_PRIORITY[c.slug] ?? 0.7,
      changefreq: 'monthly' as const,
    })),
  ]
}
