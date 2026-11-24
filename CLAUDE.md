# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**US Expat Tax** — a marketing and consultation-booking website for a firm providing
US tax services to American expatriates. Built from the sitemap in
`docs/01-analysis/sitemap-inventory.md` (91 routes).

The site's job is to take a stressed, confused expat ("Do I still have to file?
What is an FBAR? Am I in trouble?") and move them to a booked consultation.
Every page is a funnel toward `/contact/book/`.

## Stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Build          | Vite 7                                   |
| UI             | React 19 + TypeScript (strict)           |
| Routing        | React Router 7 (declarative/data mode, SPA) |
| Styling        | Tailwind CSS v4 (CSS-first `@theme`)     |
| Components     | Radix UI primitives + CVA variants       |
| Icons          | lucide-react                             |
| Forms          | React Hook Form + Zod                    |
| Server state   | TanStack Query                           |
| Meta/SEO       | react-helmet-async + prerender at build  |
| Unit/component | Vitest + Testing Library                 |
| E2E            | Playwright                               |
| Lint/format    | ESLint 9 (flat config) + Prettier        |

## Commands

```bash
npm run dev          # Vite dev server on :5173
npm run build        # typecheck + production build + prerender + sitemap
npm run preview      # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run lint:fix     # ESLint with --fix
npm run format       # Prettier write
npm run test         # Vitest watch
npm run test:run     # Vitest once (CI)
npm run test:coverage
npm run e2e          # Playwright
npm run validate     # typecheck + lint + test:run  <- run before declaring done
```

## Architecture: content is data, pages are templates

This is the single most important rule in this repo.

**90% of this site's pages are the same four templates fed by typed data.** There are
23 service pages, 30 form pages, 16 country pages and 6 division pages. They are NOT
90 hand-written components. They are 4 templates + 4 data files.

```
src/content/services.ts    ->  src/pages/services/ServiceDetailPage.tsx
src/content/forms.ts       ->  src/pages/forms/FormDetailPage.tsx
src/content/countries.ts   ->  src/pages/countries/CountryDetailPage.tsx
src/content/divisions.ts   ->  src/pages/divisions/DivisionDetailPage.tsx
```

### To add a page

Add an entry to the relevant `src/content/*.ts` file. Do not create a route, do not
create a component. The route already exists (`/services/:slug`), the template already
renders it, the sitemap already picks it up, and the prerenderer already emits static
HTML for it.

### Never do this

- Do not create a one-off component for a single service/form/country page.
- Do not hardcode copy inside a template component. Copy lives in `src/content/`.
- Do not add a route to `src/app/routes.tsx` for content that fits an existing template.

If a page genuinely cannot fit its template, extend the template's type with an
**optional** field and render it conditionally. Extending the type for all 30 forms
because one form needs something is correct; forking the template is not.

## Cross-linking is a hard requirement

The sitemap specifies bidirectional linking between forms and services for SEO
(e.g. Form 8621 <-> PFIC Reporting). This is enforced, not suggested:

- `ServiceContent.relatedForms: FormSlug[]`
- `FormContent.relatedServices: ServiceSlug[]`

These are typed as slug unions, so a typo is a **compile error**, not a 404.
`src/content/__tests__/integrity.test.ts` additionally asserts every relation
resolves and that service<->form links are reciprocal. Keep both sides in sync.

## Directory map

```
src/
  app/            Router, providers, root layout. Wiring only, no business logic.
  components/
    ui/           Generic, reusable, content-agnostic (Button, Card, Accordion).
    layout/       Header, Footer, MegaMenu, Breadcrumbs, Container.
    seo/          Seo.tsx (meta tags), JsonLd.tsx (structured data).
    marketing/    Composed marketing blocks (Hero, CTABand, FAQSection).
  content/        TYPED CONTENT DATA. The source of truth for all page copy.
  features/
    booking/      Consultation booking flow (multi-step form).
    quote/        Quote request flow.
  hooks/
  lib/            Pure utilities. No React imports.
  pages/          Route components. Thin: fetch content, pass to blocks.
  styles/         index.css with Tailwind v4 @theme tokens.
  test/           Test setup + shared factories.
  types/
```

## Conventions

- **Imports** use the `@/` alias (`@/components/ui/Button`), never `../../../`.
- **Components** are named exports in PascalCase files. One component per file.
- **Props** are a named `interface XProps`, declared above the component.
- **Styling** is Tailwind utilities only. Use `cn()` from `@/lib/cn` to merge classes.
  No `.css` files besides `src/styles/index.css`. No inline `style` except for
  genuinely dynamic values.
- **Variants** use CVA (`class-variance-authority`), not conditional string soup.
- **Trailing slashes**: every canonical URL ends in `/`, matching the sitemap.
- **Colors / spacing / fonts**: use the `@theme` tokens in `src/styles/index.css`.
  Never introduce a raw hex value in a component.

## Every page must

1. Render `<Seo>` with a unique `title` and `description`.
2. Render `<Breadcrumbs>` unless it is the home page.
3. Include a `<CTABand>` or equivalent route to `/contact/book/`.
4. Be reachable from the header or footer navigation.
5. Appear in the generated `sitemap.xml`.

A page missing (1) or (5) will fail `npm run test:run`.

## Compliance guardrails — read before writing copy

This is a regulated professional-services domain. When generating or editing page copy:

- **Never invent specific tax figures** — thresholds, exclusion amounts, penalty
  numbers, filing deadlines or treaty rates. These change annually and a wrong number
  on a tax firm's website is a liability. Use a placeholder and flag it, or reference
  the figure generically ("the annual exclusion amount").
- **Never state that a specific procedure applies to a reader.** Streamlined
  eligibility, in particular, turns on a non-willfulness certification. Describe what
  a procedure *is*; do not tell a visitor they qualify.
- Pages describing amnesty programs (`/services/streamlined-filing/`,
  `/services/delinquent-submissions/`) must carry the disclaimer component.
- Do not present the site as creating a client relationship. `/terms/` governs.
- All page copy is **draft content for human review**. Content marked
  `reviewStatus: 'draft'` in `src/content/` has not been reviewed by a tax professional.

## Working process

This project is organised into four layers, documented in `docs/`:

| Layer             | Folder                  | Purpose                                 |
| ----------------- | ----------------------- | --------------------------------------- |
| 1. Analysis       | `docs/01-analysis/`     | What exists, what's required, from whom |
| 2. Planning       | `docs/02-planning/`     | Architecture, content model, roadmap    |
| 3. Implementation | `docs/03-implementation/` | Conventions, catalog, live progress   |
| 4. Testing        | `docs/04-testing/`      | Strategy, acceptance criteria           |

Before starting work, read the relevant layer doc. After finishing a unit of work,
update `docs/03-implementation/progress.md`. Do not mark an item complete there
until `npm run validate` passes.

## Definition of done

A task is done when all of the following are true:

- [ ] `npm run validate` passes (typecheck + lint + tests)
- [ ] New pages render, have unique SEO meta, and appear in `sitemap.xml`
- [ ] New content entries cross-link correctly in both directions
- [ ] `docs/03-implementation/progress.md` is updated
- [ ] No raw hex colors, no `../..` imports, no hardcoded copy in components
