# Technical Requirements

**Date:** 2026-11-24

Functional and non-functional requirements. These are the constraints Layer 2 designs
against and Layer 4 verifies.

---

## Functional requirements

### FR-1 Routing
- All 91 canonical URLs resolve, each ending in a trailing slash.
- 75 leaf pages are rendered by 4 data-driven templates via dynamic segments
  (`/services/:slug/`, `/forms/:slug/`, `/countries/:slug/`, `/divisions/:slug/`).
- An unknown slug (e.g. `/services/nonexistent/`) renders a proper 404, not a blank
  template.
- Legacy/no-trailing-slash variants redirect to the canonical trailing-slash URL.

### FR-2 Navigation
- Mega-menu exposes Services and Forms grouped by theme, plus Divisions and Countries.
- Fully keyboard operable (arrow keys, Enter, Escape, Tab) with correct ARIA roles.
- Mobile presents a layered drawer, never a 91-item flat list.
- Footer exposes utility pages and the external Client Portal link.

### FR-3 Content cross-linking
- Service ↔ Form links are bidirectional and resolve on both ends.
- Every form links to >= 1 service; every division lists >= 1 service.
- Broken cross-links are a build/type error or a failing test, never a runtime 404.

### FR-4 Booking flow (`/contact/book/`)
- Multi-step, progressively disclosed: persona → country → complexity flags → contact.
- Client-side validation on blur with inline, plain-language errors.
- Progress indicator; guard against accidental data loss on back/refresh.
- Summary step suggests likely-relevant services from the answers.
- Submit target is a stub/adapter (no backend assumed yet) — see open question OQ-1.

### FR-5 Quote flow (`/contact/quote/`)
- Structured quote request form with validation. Submit via the same adapter as booking.

### FR-6 SEO surfaces
- Unique `<title>` and meta description per route.
- `sitemap.xml` generated from the content/route manifest (all 91 URLs).
- `robots.txt` present and correct.
- JSON-LD structured data per page type.
- Open Graph / Twitter card tags per page.
- Canonical link tag per page.

### FR-7 Content review workflow
- Every content entry carries `reviewStatus`. A build-time report lists all `draft`
  entries so a professional can review before launch.

---

## Non-functional requirements

### NFR-1 Performance
- Lighthouse >= 95 (Performance, Accessibility, Best Practices, SEO) on a representative
  page of each type, mobile profile.
- Static HTML delivered per route (prerender) so content is in the initial payload, not
  injected by JS — essential given the SPA choice and the SEO-driven strategy.
- Route-level code splitting; lazy-load the booking flow and other heavy features.
- Largest Contentful Paint < 2.5s on a mid-tier mobile over 4G (budget).
- No layout shift from web fonts (font-display strategy + size-adjust).

### NFR-2 Accessibility — WCAG 2.2 AA
- Semantic landmarks, logical heading order, skip-to-content link.
- Visible focus indicators; keyboard-complete mega-menu and forms.
- Colour contrast >= 4.5:1 for text, >= 3:1 for UI/graphics.
- Respects `prefers-reduced-motion`.
- Automated axe pass per page type + documented manual keyboard audit.

### NFR-3 SEO
- Prerendered static HTML, semantic markup, structured data, clean canonical URLs.
- No cannibalisation between Divisions and Services (distinct intents, cross-links).

### NFR-4 Browser & device support
- Evergreen Chrome, Edge, Firefox, Safari (last 2 versions).
- Verified at 375 / 768 / 1280 / 1920 widths.
- No IE. Graceful baseline without JS for core content (prerendered HTML is readable).

### NFR-5 Maintainability
- TypeScript strict; no `any`, no error-silencing assertions.
- Content as typed data; adding a page = adding a data row.
- `@/` path alias; no deep relative imports.
- One component per file, named exports, declared props interface.
- Design tokens centralised; no raw hex or magic numbers in components.
- `npm run validate` (typecheck + lint + tests) is the single quality gate.

### NFR-6 Privacy & compliance
- No analytics/tracking without a cookie-consent mechanism (cookie policy page exists).
- No PII committed to the repo; `.env` and secrets gitignored.
- Lead data (booking/quote) handled via an adapter so the storage/CRM target is a
  deliberate, reviewable choice — not hardcoded.

### NFR-7 Security
- No secrets in source or in the git remote URL.
- Dependencies pinned; `npm audit` clean at build.
- Form inputs validated and sanitised; submission adapter guards against injection.
- External links use `rel="noopener noreferrer"`.

---

## Performance budgets (targets, refined in Layer 2)

| Metric | Budget |
|---|---|
| Initial JS (gzipped, shared) | < 160 KB |
| LCP (mobile 4G) | < 2.5 s |
| CLS | < 0.1 |
| Lighthouse (all four) | >= 95 |
| Fonts | <= 3 families, subset, `font-display: swap` |

---

## Open questions (to resolve before or during Layer 2)

| ID | Question | Needed for | Default if unanswered |
|---|---|---|---|
| OQ-1 | Where do booking/quote leads go — CRM, email, Calendly, Apollo? | Booking submit | Stub adapter that logs + shows success; swap later |
| OQ-2 | Firm name, logo, brand colours — is it "Jungle Tax"? | Design tokens, header | Use "Jungle Tax" wordmark + specified navy/brass palette as placeholder |
| OQ-3 | Real pricing figures and packages? | `/pricing/` | Placeholder tiers, flagged `draft` |
| OQ-4 | Client Portal external URL? | Footer link | `#` placeholder until provided |
| OQ-5 | Hosting target (Vercel, Netlify, static host)? | Build output, redirects | Static build + SPA fallback, host-agnostic |
| OQ-6 | Analytics/consent vendor? | Cookie banner | Consent-gated, no vendor wired until chosen |

None of these block Layer 1 or the start of Layer 2. OQ-1 and OQ-2 are worth answering
before Layer 3 implementation of the header and the booking feature.
