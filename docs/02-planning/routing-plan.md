# Routing Plan

91 URLs, 18 page components, one catch-all. React Router 7, SPA, prerendered at build.
Routes carry structure only; labels come from `src/content/`.

---

## 1. Route tree

```tsx
// src/app/routes.tsx
import type { ComponentType } from 'react';
import type { LoaderFunction, RouteObject } from 'react-router';
import { RootLayout } from '@/app/RootLayout';
import { divisionLoader, serviceLoader, formLoader, countryLoader } from '@/app/loaders';
// Plus the 18 page components of §2 and `NotFoundPage`, one per file under @/pages/.

/** Fixed crumb label; every route needs one — §5. */
const crumb = (label: string) => ({ crumb: () => ({ label }) });

/** One shape for all four collections: index + :slug leaf. */
const collection = (
  path: string,
  label: string,
  Index: ComponentType,
  Detail: ComponentType,
  loader: LoaderFunction,
): RouteObject => ({
  path,
  handle: crumb(label),
  children: [
    { index: true, element: <Index /> },
    {
      path: ':slug',
      element: <Detail />,
      loader, // resolves the slug or throws 404 — see §4
      handle: { crumb: (d?: { navLabel: string }) => d && { label: d.navLabel } },
    },
  ],
});

// Paths are authored WITHOUT trailing slashes — see §3.
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />, // skip link, Header, Breadcrumbs, Outlet, Footer, CTABand
    handle: crumb('Home'),
    // Pathless boundary, not the root: a 404 replaces the Outlet, not the layout.
    children: [
      {
        errorElement: <NotFoundPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'about', element: <AboutPage />, handle: crumb('About') },

          collection('divisions', 'Divisions', DivisionsIndexPage, DivisionDetailPage, divisionLoader),
          collection('services', 'Services', ServicesIndexPage, ServiceDetailPage, serviceLoader),
          collection('forms', 'Forms', FormsIndexPage, FormDetailPage, formLoader),
          collection('countries', 'Countries', CountriesIndexPage, CountryDetailPage, countryLoader),

          {
            path: 'contact',
            handle: crumb('Contact'),
            children: [
              { index: true, element: <ContactPage /> },
              { path: 'book', element: <BookConsultationPage />, handle: crumb('Book') },
              { path: 'quote', element: <RequestQuotePage />, handle: crumb('Quote') },
            ],
          },

          { path: 'pricing', element: <PricingPage />, handle: crumb('Pricing') },
          { path: 'faqs', element: <FaqsPage />, handle: crumb('FAQs') },
          {
            path: 'resources',
            handle: crumb('Resources'),
            children: [
              { index: true, element: <ResourcesPage /> },
              { path: 'deadlines', element: <DeadlinesPage />, handle: crumb('Deadlines') },
            ],
          },

          // Three URLs, one component. `doc` selects the body from content/legal.ts.
          { path: 'privacy', element: <LegalPage doc="privacy" />, handle: crumb('Privacy') },
          { path: 'terms', element: <LegalPage doc="terms" />, handle: crumb('Terms') },
          { path: 'cookies', element: <LegalPage doc="cookies" />, handle: crumb('Cookies') },

          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
];
```

Code splitting: the two `contact` form routes use `lazy` in place of `element` — they
pull React Hook Form and Zod. The rest ship eagerly.

## 2. Route table

| Path pattern | Component | Data source | URLs |
| --- | --- | --- | ---: |
| `/` | `HomePage` | `content/home.ts` | 1 |
| `/about/` | `AboutPage` | `content/about.ts` | 1 |
| `/divisions/` | `DivisionsIndexPage` | `content/divisions.ts` | 1 |
| `/divisions/:slug/` | `DivisionDetailPage` | `content/divisions.ts` | 6 |
| `/services/` | `ServicesIndexPage` | `content/services.ts`, by group | 1 |
| `/services/:slug/` | `ServiceDetailPage` | `content/services.ts` | 23 |
| `/forms/` | `FormsIndexPage` | `content/forms.ts`, by group | 1 |
| `/forms/:slug/` | `FormDetailPage` | `content/forms.ts` | 30 |
| `/countries/` | `CountriesIndexPage` | `content/countries.ts` | 1 |
| `/countries/:slug/` | `CountryDetailPage` | `content/countries.ts` | 16 |
| `/contact/` | `ContactPage` | `content/contact.ts` | 1 |
| `/contact/book/` | `BookConsultationPage` | `features/booking` | 1 |
| `/contact/quote/` | `RequestQuotePage` | `features/quote` | 1 |
| `/pricing/` | `PricingPage` | `content/pricing.ts` | 1 |
| `/faqs/` | `FaqsPage` | `content/faqs.ts` | 1 |
| `/resources/` | `ResourcesPage` | `content/resources.ts` | 1 |
| `/resources/deadlines/` | `DeadlinesPage` | `content/deadlines.ts` | 1 |
| `/privacy/` `/terms/` `/cookies/` | `LegalPage` | `content/legal.ts` | 3 |
| **Total — 18 components** | | | **91** |

`1+1+1+6+1+23+1+30+1+16+1+1+1+1+1+1+1+3 = 91.` `NotFoundPage` is the 19th and owns no
canonical URL.

## 3. Trailing-slash policy

Every canonical URL ends in `/`. React Router normalises trailing slashes when matching,
so a nested `'services'` + `':slug'` answers both forms and the tree cannot enforce the
policy. Three places do:

1. **Route definitions and links.** Paths are authored bare, once. Internal hrefs and
   `<Seo>` canonicals both come from `canonicalPath()` in `@/lib/routes`, so they cannot
   disagree. A `no-restricted-syntax` ESLint rule rejects a `<Link to="…">` literal not
   ending in `/`.
2. **Prerender output paths.** Directory-index files only: `/services/pfic/` →
   `dist/services/pfic/index.html`, `/` → `dist/index.html`. Never
   `dist/services/pfic.html`, also served slash-less, which duplicates the page.
3. **`vercel.json`.** `"trailingSlash": true` 308-redirects the slash-less form to the
   canonical one; `"cleanUrls": false` prevents the reverse.

**Ordering trap.** §4 ships no SPA fallback; if one is ever added it must run *after*
filesystem resolution. Vercel's `rewrites` do; the legacy `routes` array does not, and a
catch-all there without a preceding `{ "handle": "filesystem" }` marker shadows every
prerendered file — all 91 URLs then serve the bare shell, no meta tags, no copy. The SPA
hydrates and looks correct, so CI asserts on served bytes: fetch `/forms/8621/` and grep
for its `<title>`.

## 4. Slug resolution and 404s

Each `:slug` loader resolves the slug against its content map, or throws:

```ts
const entry = forms[params.slug as FormSlug];
if (!entry) throw new Response(null, { status: 404, statusText: 'Not Found' });
return entry;
```

The thrown `Response` is caught by the pathless `errorElement`, so `NotFoundPage` renders
inside `RootLayout`, nav intact, and `FormDetailPage` never receives `undefined` — its
prop type stays non-nullable.

**The 404 must not be soft.** On static hosting any served file returns 200, so:

- **Ship no SPA fallback.** All 91 canonical routes are prerendered, so a direct hit
  always resolves to a real file; its only remaining effect would be turning genuine
  404s into 200s.
- Prerender `dist/404.html`; the platform serves it with a 404 status for unmatched paths.
- `NotFoundPage` emits `<meta name="robots" content="noindex">` and no canonical link.
- **Never redirect an unknown slug to its section index.** That returns 200 or 301 and
  validates the bad URL to crawlers.

The prerenderer iterates the content maps, so it cannot emit a page for a slug with no
entry. A test asserts prerendered paths, `sitemap.xml` URLs and the 91 routes are one set.

## 5. Breadcrumb derivation

**Rule.** From the matched route chain, never hand-authored per page.
`useMatches()` → for each match with `handle.crumb`, call `crumb(match.data)` →
drop any that returns nothing → `label` from the return, `to` from
`canonicalPath(match.pathname)`. **Every route in §1 carries a `handle`**; one without it
drops its own crumb and promotes its parent to last. An errored `:slug` returns no label,
so a 404 trail stops at the section. A `:slug` label comes from the loader entry's
`navLabel`, so content owns the wording. The last crumb is the current page: text, not a
link, with `aria-current="page"`. The same array feeds the `BreadcrumbList` JSON-LD, so
trail and markup cannot drift.

**Worked example — `/forms/8621/`.** Matches: root `/`, `forms`, `:slug`.

| Match | Crumb source | Label | Link |
| --- | --- | --- | --- |
| `/` | root `handle.crumb` | Home | `/` |
| `forms` | section `handle.crumb` | Forms | `/forms/` |
| `:slug` | `formLoader` → `navLabel` | Form 8621 | none (current) |

Rendered: `Home / Forms / Form 8621`, number in mono.

## 6. The two duplicated slugs

`fbar` and `relocation` each exist in two collections.

| Slug | URLs |
| --- | --- |
| `fbar` | `/services/fbar/` and `/forms/fbar/` |
| `relocation` | `/services/relocation/` and `/divisions/relocation/` |

**No route collision.** The section segment disambiguates before `:slug` is read, so no
path matches two patterns. The field type picks the collection: `relatedForms: ['fbar']`
resolves only inside `forms.ts`.

**The hole in the typed-slug guard.** `'fbar'` is in both `ServiceSlug` and `FormSlug`,
`'relocation'` in both `ServiceSlug` and `DivisionSlug`, so the wrong field compiles and
resolves to the wrong page. Only an integrity-test assertion catches it.

The other risk is cannibalisation, resolved by giving each query intent one owner:

| Query intent | Canonical owner |
| --- | --- |
| What the report is, who files it, how it differs from Form 8938 | `/forms/fbar/` |
| Having the filing done, including late or unfiled years | `/services/fbar/` |
| Browsing as someone moving abroad or home | `/divisions/relocation/` |
| The dual-status transition year as work | `/services/relocation/` |

Each pair cross-links explicitly, with distinct titles and H1s; neither canonicalises to
the other, because they are different pages.
