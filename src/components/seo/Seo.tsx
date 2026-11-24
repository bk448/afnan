export const SITE_NAME = 'Jungle Tax'
export const SITE_URL = 'https://www.example.com' // TODO: replace with the real domain
export const SITE_LOCALE = 'en_GB'
export const OG_IMAGE = `${SITE_URL}/og-default.png`

interface SeoProps {
  title: string
  description: string
  /** Canonical path, always with a trailing slash. */
  path: string
  /** JSON-LD structured data for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  /** Set for pages that should not be indexed (none at present). */
  noindex?: boolean
  /** Overrides the default social card image. */
  image?: string
}

/**
 * Per-page document metadata.
 *
 * React 19 hoists <title>, <meta> and <link> into <head> natively, so no helmet
 * library is needed. The prerender step lifts these into the served HTML so
 * crawlers see complete metadata without executing JavaScript.
 */
export function Seo({
  title,
  description,
  path,
  jsonLd,
  noindex = false,
  image = OG_IMAGE,
}: SeoProps) {
  const fullTitle = title === SITE_NAME ? `${SITE_NAME} — US Expat Tax Services` : `${title} | ${SITE_NAME}`
  const canonical = `${SITE_URL}${path}`
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Structured data must be serialised as raw JSON in the document.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Structured-data builders                                                    */
/* -------------------------------------------------------------------------- */

/** Sitewide organisation identity. Rendered once, on the home page. */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'US tax services for American expatriates, including annual filing, foreign account reporting, catch-up procedures and cross-border advice.',
  areaServed: 'Worldwide',
  knowsAbout: [
    'US expatriate taxation',
    'Foreign Bank Account Report (FBAR)',
    'FATCA reporting',
    'Streamlined Filing Compliance Procedures',
    'Foreign Earned Income Exclusion',
    'Foreign Tax Credit',
    'Passive Foreign Investment Companies',
    'Expatriation tax',
  ],
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-GB',
}

/** BreadcrumbList structured data from a trail of crumbs. */
export function breadcrumbJsonLd(crumbs: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  }
}

/** FAQPage structured data. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Collection pages (index listings). */
export function collectionJsonLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }
}
