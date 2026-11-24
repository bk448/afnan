# Architecture

**Layer 2 — Planning**
**Date:** 2026-11-24

How the system is put together, and why. Derives from `docs/00-brief/build-brief.md`
and the Layer 1 analysis.

---

## 1. Shape of the system

This is a **static, prerendered marketing site with one serverless endpoint.** There is
no application server and no database.

```
                  build time                          request time
  ┌──────────────────────────────────────┐    ┌──────────────────────────┐
  │  src/content/*.ts   (typed data)     │    │  Browser                 │
  │          │                           │    │    │                     │
  │          ▼                           │    │    ▼                     │
  │  4 templates + 16 bespoke pages      │    │  static HTML (91 routes) │
  │          │                           │    │    │                     │
  │          ▼                           │    │    ▼ hydrate             │
  │  vite build  ──►  prerender 91 HTML  │───►│  React SPA takes over    │
  │          │                           │    │    │                     │
  │          ├──► sitemap.xml            │    │    ▼ on form submit      │
  │          └──► robots.txt             │    │  POST /api/enquiry ──────┼──► email
  └──────────────────────────────────────┘    └──────────────────────────┘
```

**Why static.** 88 of 91 routes are informational content that changes rarely. Serving
them as prerendered HTML gives the SEO the business case depends on, removes a whole
class of runtime failure, and costs nothing to host.

**Why one endpoint.** Booking and quote submissions are the only writes on the site.
They need server-side validation and an email send, which cannot happen in the browser.
One function handles both.

**Why no database.** The firm's secure client system already exists — the sitemap lists
**Client Portal as an external outbound link**, not a route we build. Document exchange
and client records belong there. Keeping tax documents, SSN/ITIN or income figures out
of this site is a deliberate scope boundary (see §7).

---

## 2. Rendering strategy

The brief specifies a Vite SPA. A plain SPA ships an empty `<div id="root">`, which is
fatal for a site whose entire strategy is organic search. Resolution:

| Stage | What happens |
|---|---|
| Build | Vite produces the SPA bundle |
| Prerender | A headless pass renders all 91 routes to real HTML files, each with its own `<title>`, meta, canonical, OG and JSON-LD already in the markup |
| Serve | The crawler and the first paint both get complete HTML |
| Hydrate | React attaches; navigation after that is client-side and instant |

**The single most likely technical own-goal** (flagged in Layer 1) is meta tags that
exist in React but never reach the served HTML. Layer 4 verifies this by parsing the
built HTML files, not by inspecting the running app.

Route-level code splitting keeps the shared bundle small; the booking flow and its
validation schema load only on `/contact/book/`.

---

## 3. Directory structure

```
src/
  app/                 Wiring only — no business logic, no copy
    router.tsx           Route table (all 91 routes)
    providers.tsx        HelmetProvider, QueryClient, error boundary
    RootLayout.tsx       Header + <Outlet/> + Footer + skip link

  components/
    ui/                Generic, content-agnostic primitives
                         Button, Link, Card, Accordion, Tag, Field, Input,
                         Select, Checkbox, Radio, Stepper, Disclosure, Table
    layout/            Site chrome
                         Header, MegaMenu, MobileDrawer, Footer,
                         Breadcrumbs, Container, Section
    seo/               Seo.tsx (meta), JsonLd.tsx (structured data)
    marketing/         Composed content blocks used by templates
                         Hero, AtAGlance, CTABand, FAQSection, RelatedRail,
                         Disclaimer, PageHeader, ProseBlock

  content/             THE SOURCE OF TRUTH FOR ALL PAGE COPY
    services.ts          23 entries
    forms.ts             30 entries
    countries.ts         16 entries
    divisions.ts          6 entries
    navigation.ts        Derived menu structure
    figures.ts           Registry of reviewed tax figures (see §6)
    __tests__/           Content integrity tests

  features/
    booking/           Multi-step consultation flow
      schema.ts          Zod schema (shared with the API function)
      steps/             One component per step
      BookingFlow.tsx
    quote/             Quote request flow

  hooks/               useMediaQuery, useFocusTrap, useScrollLock, ...
  lib/                 Pure utilities, zero React imports
                         cn.ts, slug.ts, seo.ts, analytics.ts
  pages/               Route components — thin
    HomePage.tsx, AboutPage.tsx, ...
    services/ServicesIndexPage.tsx, services/ServiceDetailPage.tsx
    forms/, countries/, divisions/, legal/
  styles/
    index.css            Tailwind v4 @theme tokens — the design system
  test/                Setup + factories
  types/               Shared type declarations

api/
  enquiry.ts           Single serverless function: validate, anti-spam, email

scripts/
  prerender.mjs        Build-time HTML generation
  sitemap.mjs          sitemap.xml from the route manifest
  check-figures.mjs    Fails the build on unapproved {{FIGURE:*}} tokens
```

### Layer rules

| Layer | May import from | May **not** |
|---|---|---|
| `lib/` | nothing internal | import React or components |
| `content/` | `types/`, `lib/` | import components |
| `components/ui/` | `lib/`, `hooks/` | import `content/` or `pages/` |
| `components/marketing/` | `ui/`, `lib/`, `types/` | import `content/` directly |
| `pages/` | everything | contain hardcoded page copy |
| `app/` | `pages/`, `layout/` | contain business logic |

`components/marketing/` taking data as props rather than reading `content/` directly is
what keeps those blocks testable in isolation and reusable across all four templates.

---

## 4. Data flow

```
content/services.ts
        │  (typed, frozen at build)
        ▼
getServiceBySlug(slug)        lib/content accessors — the only read path
        │
        ▼
ServiceDetailPage             thin: resolve slug → entry, or 404
        │  props
        ▼
Hero · AtAGlance · ProseBlock · RelatedRail · FAQSection · CTABand
```

Content is imported statically, never fetched. It is part of the bundle and part of the
prerendered HTML. TanStack Query exists only for the enquiry submission, not for content.

**Unknown slug handling.** Every detail template resolves its slug through an accessor
that returns `undefined` for unknown values; the template then renders `<NotFoundPage>`.
A URL like `/services/nonexistent/` must never render an empty template shell.

---

## 5. The cross-link graph

The SEO mechanism of the whole site. Enforced at three levels:

1. **Type level.** `relatedForms: FormSlug[]` where `FormSlug` is a union of the 30 real
   slugs. A typo fails `tsc`.
2. **Test level.** `content/__tests__/integrity.test.ts` asserts every relation resolves,
   every Form↔Service pair is reciprocal, every form has ≥1 service, every division has
   ≥1 service, and no orphans exist.
3. **Data level.** `docs/01-analysis/crosslink-matrix.json` holds the verified relation
   set and seeds the content files.

Reciprocity is enforced in the test rather than derived automatically, because the two
directions carry different editorial weight: a service lists *the forms it files*, a form
lists *who handles it*. Deriving one from the other would lose that distinction.

---

## 6. Compliance enforcement in the build

Tax figures are the project's highest liability (risk R-1). Rather than relying on
editorial discipline, unreviewed figures are **greppable tokens**:

```
"You must report accounts exceeding {{FIGURE:fbar-threshold}}."
```

- `content/figures.ts` is the registry: token → value, source, reviewedBy, reviewedOn.
- `scripts/check-figures.mjs` scans `src/content/` and **fails the production build** on
  any token absent from the registry or marked unreviewed.
- `grep -rn "{{" src/content/` lists every unreviewed fact on the site in one command.

Development builds warn; production builds fail. The gate cannot be forgotten.

---

## 7. Scope boundary — what this site does not do

Out of scope, deliberately:

- Collecting SSN/ITIN, income figures, or tax documents
- File upload of any kind
- Client authentication or account areas

This keeps the project clear of IRS Pub 4557 and FTC Safeguards obligations. Secure
document exchange stays in the firm's existing portal.

### 7.1 Revision — consultation requests are now persisted (2026-11-24)

This section previously listed "storing submissions in a database" as out of scope. That
boundary has been **lifted by decision of the firm**: booking requests now persist to
Supabase (`booking_requests`), because a form that submits nowhere cannot serve the site's
single purpose.

The other three exclusions above still hold, and they are what keep this change
proportionate — the table contains no tax identifier, no income figure and no document.

What the change does introduce:

- **Personal data at rest.** Name, email, country of residence and a free-text note, plus
  situation flags that can imply a visitor is behind on US filing. That last point is the
  sensitive part and is why the table is write-only from the browser.
- **Data protection duties.** UK/EU GDPR now applies to stored records: a lawful basis, a
  stated retention period, and the ability to honour erasure requests. `/privacy/` must be
  updated to name Supabase as a processor and state where data is held.
- **Residency.** The Supabase project region determines where the data physically lives.
  Choose it before going live; it cannot be changed afterwards without a migration.

Security model, in full, in `supabase/migrations/20261124130000_booking_requests.sql`: RLS is on, the
anon role holds `INSERT` only, and no `SELECT` policy or privilege exists for it. The anon
key in the bundle is therefore write-only. Reading submissions requires the `service_role`
key, which must never reach the client.

Still outstanding: no spam/abuse control on the insert endpoint, and no notification — a
submitted request sits in the table until someone looks. See
`docs/03-implementation/progress.md`.

---

## 8. Build pipeline

```
npm run validate   = typecheck → lint → test:run
npm run build      = typecheck → check-figures → vite build → prerender → sitemap
```

The production build fails on: a type error, a lint error, an unapproved figure token, a
prerender failure, or a route in the manifest with no content.

---

## 9. Decisions and their reasons

| Decision | Reason | Cost accepted |
|---|---|---|
| SPA + prerender, not Next.js | Client chose Vite; prerender recovers the SEO | Extra build step to maintain |
| Content as TS modules, not CMS/MDX | Type-safe cross-links; a typo is a compile error | Non-technical editing needs a later CMS layer |
| No database | Secure portal already exists externally | Submissions are fire-and-forget to email |
| Four templates | 91 pages maintainable by one person | Entries must fit a shared shape |
| Figure tokens + build gate | Liability is too high for discipline alone | Slight authoring friction |
| No dark mode | Not requested; doubles design/QA surface | — |

---

## 10. Open items carried into Layer 3

| # | Item | Working assumption |
|---|---|---|
| 1 | Lead destination (CRM / email / Cal.com) | Email via the single function; adapter boundary so it can be swapped |
| 2 | Real brand assets for Jungle Tax | Placeholder tokens; all brand strings in one config |
| 3 | Hosting target | Host-agnostic static output + one function (Vercel-shaped) |
| 4 | Analytics vendor | None wired until consent mechanism is chosen |
