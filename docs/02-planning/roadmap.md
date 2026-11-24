# Roadmap — Layer 3

Phase numbering is fixed by the brief. Exit criteria are gates: `npm run validate` green
plus the listed condition, or the phase is not done.

## Phases

| Phase | Deliverable | Demonstrable outcome | Exit criteria |
|---|---|---|---|
| 3.0 | Toolchain, Vite/TS/Tailwind config, folder structure, ESLint + Prettier, Vitest and Playwright harnesses, CI | Dev server boots clean; the empty suite passes | `npm run validate` runs end to end against a trivial component; CI runs it on push; the `@/` alias resolves |
| 3.1 | `@theme` tokens, UI primitives (Button, Card, Accordion, Table, Input, Badge, Disclaimer), rendered style tile | Every primitive in every state on one page | Style tile approved by the user. No raw hex in any component; type scale, 4px/6px radii and hairline rules applied; forbidden-pattern list clean; AA contrast checked on every token pair in use |
| 3.2 | Header, mega-menu, footer, breadcrumbs, Container, skip link, app shell | All 91 links navigable from the shell | Keyboard: arrow keys, Escape, focus trapped and returned, mobile drawer with back navigation. Axe clean on the shell. Client Portal present as an external footer link, not a route |
| 3.3 | Content types plus `services.ts`, `forms.ts`, `countries.ts`, `divisions.ts` — every entry present, one fully written per collection | Typed, cross-linked, integrity-tested | Integrity test green: all 91 routes accounted for, every relation resolves, service↔form pairs reciprocal, no orphan forms, slug unions compile. Relations seeded from `crosslink-matrix.json`, not invented |
| 3.4 | The four templates plus the four index pages | Each template renders its whole collection from data; indexes list entries by theme group | Each template renders both its reference entry and its thinnest entry without layout collapse; structured summary block sits above the long-form body; no copy inside any component |
| 3.5 | Home, About, Pricing, FAQs, Resources, Deadlines, and one `LegalPage` serving privacy/terms/cookies | All 91 pages live | Every route reachable from header or footer; breadcrumbs on every page but home; a route to `/contact/book/` on every page |
| 3.6 | Booking and Quote flows plus the single Vercel function | Multi-step forms validating end to end, branching on the step-1 answer | Keyboard-complete; validate on blur; errors beside their field; saved-state guard; one shared Zod schema both sides; anti-spam token verified server-side; no SSN/ITIN, income or document field anywhere |
| 3.7 | Per-page meta, `sitemap.xml`, `robots.txt`, JSON-LD, prerender | Static HTML per route | Prerendered HTML for all 91 routes carries a unique title and description and a trailing-slash canonical in the *served* markup, asserted by test — never by inspecting the dev server |

## The critical path is the copy, not the code

Roughly 84,000 words across 91 routes. The code is a known quantity; the content is the
schedule.

Mitigation, already settled: **build each template against one fully written reference
entry before drafting the other 71.** Writing 75 entries against a schema that has never
rendered is the most expensive available mistake — one late field change rewrites every
entry. Reference entries, in this order:

| Collection | Reference entry | Why this one |
|---|---|---|
| Services | `/services/pfic/` | The brief's own exemplar cross-link pair |
| Forms | `/forms/8621/` | Its reciprocal half |
| Countries | `/countries/uk/` | Flagship; exercises treaty, pension, deadline and PFIC-trap slots |
| Divisions | `/divisions/catch-up/` | Highest-urgency persona; links out to services without duplicating them |

Write `/services/streamlined-filing/` immediately after: it adds the disclaimer component
and the flagged-figure placeholders, stressing the schema's compliance fields before
anything scales.

## Thin but honest

Deep copy first, in search-intent order. Everything else is structurally complete and
marked `reviewStatus: 'draft'` — sanctioned by the brief, which holds all generated copy
to professional review before publication. Structurally complete means the summary block,
cross-links, FAQs and metadata are real; only the long-form body is short.

| Tier | Entries | Treatment |
|---|---|---|
| A | Services `pfic`, `streamlined-filing`, `delinquent-submissions`, `foreign-entities`, `foreign-trusts-gifts`, `expatriation`, `irs-representation`, `expat-tax-returns` · Forms `fbar`, `8938`, `8621`, `5471`, `3520`, `2555`, `1116`, `14653` · Countries `uk`, `canada`, `australia`, `germany` · Divisions `catch-up`, `business` | Full depth |
| B | The remaining 71 entries | Structural, short body, draft |

Thin output across one entire collection is an indexing risk, so tier B still
differentiates: each form gets its own filing context and its routed service, never
boilerplate with the number swapped.

## Risks that can stall a phase

| Phase | Risk | Ref |
|---|---|---|
| 3.0 | Node and toolchain unverified, so nothing can be validated | R-10 |
| 3.1 | Design reads as generic AI output. The brief gates all product UI on tile approval, so a rejected tile blocks 3.2 through 3.6 | R-6 |
| 3.2 | Mega-menu keyboard and focus behaviour — the highest-risk WCAG 2.2 AA component | — |
| 3.3 | Slug drift breaking the cross-link graph; schema churn after drafting starts | R-5, R-4 |
| 3.4 | Division and service copy converging; 30 near-identical form pages reading as doorway pages | R-3 |
| 3.5 | A figure stated as fact, or copy implying a reader qualifies for a procedure | R-1, R-2 |
| 3.6 | Lead PII handling and consent; submission destination still undecided | R-9 |
| 3.7 | Prerendered meta not reaching served HTML — silent, and it fails the entire SEO case | R-7 |

## Out of scope

Payment at booking · real-time calendar availability · document upload · client portal
(external link) · CMS or admin UI · dark mode · blog and article content · any intake of
SSN/ITIN, income figures or tax documents. The last keeps the backend at one function and
the firm clear of Pub 4557 and FTC Safeguards territory.

## If time runs short

Cut in this order:

1. Tier-B long-form bodies, down to the summary block. Pages still render, cross-link and
   carry metadata.
2. The Quote flow. Booking is the single conversion; Quote degrades to a contact route.
3. Resources and Deadlines bodies, down to stubs.
4. Country depth, down to the eight named in `search-intent-map.md`; the other eight stay
   structural.

Never cut: prerender and per-page meta (3.7), mega-menu keyboard operability, the content
integrity test, the amnesty disclaimer.

Stopped after step 1, the build still proves the whole architectural claim: 91 routes from
18 components, a typed cross-link graph verified by test rather than asserted, an approved
design system applied consistently, prerendered static HTML with unique metadata per
route, and one booking path working end to end. What it does not prove is launch-ready
copy — and that was never this build's to sign off.
