# Risk Register

**Date:** 2026-11-24

Risks ranked by exposure. Each has an owner-facing mitigation. The compliance and
content-accuracy risks (R-1, R-2) are the defining constraints of this project — a tax
firm's website carries professional liability that a typical marketing site does not.

Severity = Likelihood × Impact. **H / M / L.**

---

## R-1 — Inaccurate tax information published as fact · Severity: HIGH

**Risk.** Specific figures (thresholds, penalty amounts, exclusion limits, deadlines,
treaty rates) change annually and vary by situation. A wrong number on a tax firm's own
website is a professional-liability and reputational exposure, and can mislead a reader
into a costly mistake.

**Mitigation (enforced in the build):**
- Content model forbids specific figures; copy uses generic references ("the annual
  exclusion amount") or clearly flagged placeholder tokens.
- All generated copy ships as `reviewStatus: 'draft'`; a build report lists every draft
  entry for sign-off by a qualified tax professional before launch.
- `CLAUDE.md` encodes this as a hard rule for any future editing session.

**Residual.** Requires a human professional review gate before go-live. The build cannot
substitute for it and does not claim to.

---

## R-2 — Implying eligibility or a client relationship · Severity: HIGH

**Risk.** Telling a visitor they *qualify* for Streamlined Filing (which turns on a
non-willfulness certification) or presenting site use as creating an engagement, both
create legal exposure.

**Mitigation:**
- Copy describes what procedures *are*, never asserts a reader qualifies.
- Amnesty pages (`/services/streamlined-filing/`, `/services/delinquent-submissions/`)
  carry a visible disclaimer component (`requiresDisclaimer: true`).
- `/terms/` governs; footer and forms state no engagement is created until formalised.
- Booking flow gathers facts to *inform a consultation*, never outputs an eligibility
  verdict.

---

## R-3 — SEO cannibalisation between Divisions and Services · Severity: MEDIUM

**Risk.** Divisions and Services overlap by design. If both target the same keywords with
similar copy, they compete in search and dilute ranking.

**Mitigation:**
- Divisions target persona intent ("accidental american help"); Services target need
  intent ("streamlined filing"). Distinct keyword sets (see `search-intent-map.md`).
- Divisions link *out* to services rather than duplicating service copy.
- Self-canonicalising URLs; no duplicated body content across the two sections.

---

## R-4 — Maintenance burden from 91 pages · Severity: MEDIUM → LOW (by design)

**Risk.** 91 hand-built pages would be unmaintainable; a layout change would mean editing
dozens of files, and content would drift out of sync.

**Mitigation:**
- Four data-driven templates render 75 of 91 pages. A layout change is one file.
- Content lives in four typed data files, not scattered in components.
- Cross-links are typed relations verified by test, so the content graph cannot silently
  break as entries are added or renamed.

**Residual.** Reduced to low by the architecture; this is a primary design driver.

---

## R-5 — Broken internal links as content grows · Severity: MEDIUM → LOW

**Risk.** The SEO strategy depends on Form↔Service cross-links. A renamed slug or a typo
would create 404s that quietly bleed ranking and trust.

**Mitigation:**
- Cross-link fields are typed slug unions → a bad reference is a compile error.
- A content-integrity test asserts every relation resolves and Form↔Service pairs are
  reciprocal. Runs in `npm run validate`.

---

## R-6 — "Generic AI-generated" visual design undermines trust · Severity: MEDIUM

**Risk.** The private-client and HNW personas will not trust a firm whose site looks like
a templated SaaS funnel (purple gradients, glassmorphism, emoji, fake testimonials). For
this audience, visual credibility *is* commercial credibility.

**Mitigation:**
- Explicit forbidden-patterns list in `BUILD-PROMPT.md` and `design-system.md`.
- Institutional-editorial design language (serif display, restrained palette, hairline
  rules) specified before any UI is built.
- No fabricated social proof; trust signals are real or absent, never invented.

---

## R-7 — Poor SEO from SPA (empty HTML shell) · Severity: MEDIUM

**Risk.** A plain Vite SPA ships an empty `<div id="root">`; crawlers and AI answer
engines may index little. For a site whose entire strategy is organic search, this is a
direct threat to the business case.

**Mitigation:**
- Build-time prerender emits real static HTML for all 91 routes.
- Generated `sitemap.xml`, `robots.txt`, JSON-LD, canonical tags, OG tags.
- Verified in Layer 4 by inspecting prerendered output per page type.

**Note.** Flagged to the client that Next.js SSG would address this natively; the SPA +
prerender approach was chosen and this mitigation makes it viable.

---

## R-8 — Fabricated trust/credential signals · Severity: MEDIUM

**Risk.** Inventing client counts, star ratings, logos, or credentials is both an AI
failure mode and, for a regulated firm, a misrepresentation risk.

**Mitigation:**
- No invented statistics or testimonials anywhere.
- About/credentials/team are placeholders clearly marked for the firm to supply real
  details. Empty-but-honest beats impressive-but-false.

---

## R-9 — Lead data handling / privacy · Severity: MEDIUM

**Risk.** Booking and quote forms collect PII (name, email, tax situation). Mishandling —
insecure storage, no consent, PII in the repo — is a GDPR/UK-GDPR and trust problem.

**Mitigation:**
- Submission goes through an adapter; no storage target hardcoded (OQ-1).
- No PII in source control; secrets gitignored.
- Cookie consent mechanism; privacy and cookie policy pages exist.
- Resolve the lead-destination decision deliberately before launch.

---

## R-10 — Toolchain / environment setup friction · Severity: LOW

**Risk.** Node was not installed on the machine; the first install attempt was cancelled
at the UAC prompt. Build/test cannot run until the toolchain is in place.

**Mitigation:**
- Node LTS install retried; Git already installed.
- Until Node is confirmed, work proceeds on tooling-independent deliverables (docs,
  schema design, file scaffolding).

**Residual.** Clears once Node is verified (`node --version`).

---

## R-11 — Credentials exposure · Severity: HIGH (handling), LOW (if acted on)

**Risk.** Account credentials were shared in chat. Credentials embedded in a git remote
URL are stored in plaintext in `.git/config` and can leak via a public repo.

**Mitigation:**
- No credentials written to any file, config, or remote URL.
- Authentication will use Git Credential Manager (browser sign-in) or a scoped PAT at
  push time — never an in-URL password (which GitHub no longer accepts regardless).
- `.gitignore` blocks `.env`, `*.key`, `*.pem`, `credentials.json` before staging.
- Advised: rotate the shared password and enable 2FA.

**Residual.** Depends on the account owner rotating the exposed credential.

---

## Risk summary

| ID | Risk | Severity | Reduced to |
|---|---|---|---|
| R-1 | Inaccurate tax figures | HIGH | needs human review gate |
| R-2 | Eligibility / engagement implied | HIGH | design-enforced |
| R-3 | Division/Service cannibalisation | MED | LOW (intent split) |
| R-4 | 91-page maintenance | MED | LOW (templates) |
| R-5 | Broken cross-links | MED | LOW (typed + tested) |
| R-6 | Generic AI look | MED | design-enforced |
| R-7 | SPA SEO | MED | prerender |
| R-8 | Fabricated trust signals | MED | no invention policy |
| R-9 | Lead/PII handling | MED | adapter + consent |
| R-10 | Toolchain setup | LOW | in progress |
| R-11 | Credentials exposure | HIGH/LOW | no secrets persisted; rotate advised |
