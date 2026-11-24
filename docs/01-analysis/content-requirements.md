# Content Requirements

**Date:** 2026-11-24

This document defines the required *shape* of each page type. It is the direct input to
the TypeScript content schema in Layer 2 (`docs/02-planning/content-model.md`). If a page
type needs a field, it is specified here first.

Guiding rule: **structure is shared, substance is per-entry.** Every service page has the
same sections in the same order; only the words differ. That sameness is what lets one
template render 23 pages and what makes the site feel coherent.

---

## Shared across all page types

Every page, regardless of type, requires:

| Field | Purpose |
|---|---|
| `slug` | URL segment, unique within its section |
| `title` | `<h1>` and `<title>` base |
| `seoTitle` | `<title>` override (<= 60 chars) |
| `seoDescription` | meta description (<= 155 chars), unique |
| `summary` | one-sentence plain-language definition (used in cards and meta) |
| `reviewStatus` | `'draft' | 'reviewed'` — all generated copy starts `'draft'` |

Compliance note: **no specific figures** (thresholds, penalties, deadlines, rates) in
any field. Where a figure is unavoidable, use a placeholder token flagged for review.

---

## Service page (`/services/:slug/`) — 23 entries

The commercial workhorse. Must reassure, explain, and convert.

**Required content shape:**

1. **Breadcrumb** — Home / Services / [group] / [title]
2. **Hero** — `title`, `summary`, primary CTA (Book), secondary CTA (Quote)
3. **"At a glance" panel** — `whoItIsFor` (bullet list), `theRisk` (one line, what
   happens if ignored), `howWeHelp` (one line)
4. **Body** — `overview` (2–3 paragraphs plain language), `details` (structured blocks:
   heading + prose, repeatable)
5. **Who this is for** — expanded, maps to one or more divisions (`relatedDivisions`)
6. **Forms involved** — `relatedForms: FormSlug[]` → renders linked form chips
7. **FAQs** — `faqs: {q, a}[]` (drives FAQPage JSON-LD)
8. **Related services** — `relatedServices: ServiceSlug[]`
9. **CTA band** — Book a Consultation
10. **Disclaimer** — required where `requiresDisclaimer: true` (amnesty pages)

**Fields:**
```
group            ServiceGroup (enum — drives mega-menu placement)
whoItIsFor       string[]
theRisk          string
howWeHelp        string
overview         string (markdown-lite)
details          { heading: string; body: string }[]
relatedDivisions DivisionSlug[]
relatedForms     FormSlug[]      ← bidirectional, enforced
relatedServices  ServiceSlug[]
faqs             { q: string; a: string }[]
requiresDisclaimer boolean
```

---

## Form page (`/forms/:slug/`) — 30 entries

The informational magnet. Must explain the form clearly to a layperson, then route them
to the service that handles it. Deliberately not a sales page — it earns trust by being
genuinely useful, then offers help.

**Required content shape:**

1. **Breadcrumb** — Home / Forms / [group] / [form number]
2. **Header** — form number set in **mono** (`formNumber`), official name (`officialName`),
   `summary`
3. **"Quick facts" panel** — `whoFilesIt`, `whatItReports`, `whenDue` (generic, no dates),
   `penaltyRisk` (qualitative, e.g. "significant automatic penalties" — never a figure)
4. **Body** — `overview` (what the form is, in plain English), `details` blocks
5. **"Handled by" callout** — `relatedServices: ServiceSlug[]` → the selling link. This is
   the single most important element on the page.
6. **Related forms** — `relatedForms: FormSlug[]` (e.g. 3520 ↔ 3520-A)
7. **Soft CTA** — "Not sure if this applies to you? Book a consultation."

**Fields:**
```
formNumber       string   (e.g. "8938", "3520-A", "Schedule B")  — rendered mono
officialName     string   (e.g. "Statement of Specified Foreign Financial Assets")
group            FormGroup (enum)
whoFilesIt       string
whatItReports    string
whenDue          string   (generic: "with your federal return", no specific dates)
penaltyRisk      string   (qualitative only)
overview         string
details          { heading: string; body: string }[]
relatedServices  ServiceSlug[]   ← bidirectional, enforced, >= 1 required
relatedForms     FormSlug[]
```

**Hard rule:** every form must have `relatedServices.length >= 1`. A form page with no
onward service link is a dead end and fails content-integrity tests.

---

## Country page (`/countries/:slug/`) — 16 entries

Per the sitemap's own note, all country pages share one template with these sections:

**Required content shape (fixed section order):**

1. **Breadcrumb** — Home / Countries / [country]
2. **Hero** — "US Taxes in [Country]", `summary`
3. **Treaty position** — `treaty` (does a US treaty exist, headline relevance)
4. **Local pensions & retirement** — `pensions` (how local vehicles are treated for US
   purposes — SIPP, super, RRSP, etc.)
5. **Filing deadlines** — `deadlines` (local vs US, generic framing)
6. **Common PFIC traps** — `pficTraps` (local funds/ISAs/unit trusts that trigger PFIC)
7. **Other local considerations** — `localNotes` blocks (optional)
8. **Relevant services** — `relatedServices: ServiceSlug[]`
9. **CTA band** — Book a Consultation

**Fields:**
```
countryName      string   ("the UK", "Germany")
flagRegion       string   (for optional restrained flag/region marker)
treaty           string
pensions         string
deadlines        string
pficTraps        string
localNotes       { heading: string; body: string }[]   (optional)
relatedServices  ServiceSlug[]
```

---

## Division page (`/divisions/:slug/`) — 6 entries

Persona landing pages. Browse-by-who-you-are. Each lists its relevant services.

**Required content shape:**

1. **Breadcrumb** — Home / Divisions / [division]
2. **Hero** — `title`, `summary` (speaks to the persona's situation)
3. **"Is this you?" panel** — `isThisYou: string[]` (recognition checklist — the visitor
   should see themselves)
4. **What we handle** — intro prose (`overview`)
5. **Relevant services** — `relatedServices: ServiceSlug[]` → rendered as linked cards
   (this is the division page's core job)
6. **Relevant forms** — `relatedForms: FormSlug[]` (optional)
7. **Reassurance block** — `reassurance` (persona-specific calming message)
8. **CTA band** — Book a Consultation

**Fields:**
```
isThisYou        string[]
overview         string
reassurance      string
relatedServices  ServiceSlug[]   (>= 1 required — a division must list services)
relatedForms     FormSlug[]
```

---

## Index pages (5)

`ServicesIndexPage`, `FormsIndexPage`, `CountriesIndexPage`, `DivisionsIndexPage`, and the
Resources listing. Each renders its collection **grouped by the `group` field**, with a
short intro. No per-entry authoring — index pages derive entirely from the content files.

---

## Bespoke static pages (11)

These are hand-authored (still copy-reviewed, still `draft`):

| Page | Required elements |
|---|---|
| `HomePage` | Hero · three entry paths (who/what/where) · trust signals · featured services · CTA |
| `AboutPage` | Firm story · approach · team placeholder · credentials placeholder · CTA |
| `ContactPage` | Contact methods · links to Book and Quote · office/timezone placeholder |
| `BookConsultationPage` | Multi-step booking flow (see feature spec) |
| `RequestQuotePage` | Quote request form |
| `PricingPage` | Pricing tiers/packages (placeholder figures flagged) · what's included · FAQ link |
| `FaqsPage` | Grouped FAQs · FAQPage JSON-LD · links to relevant services |
| `ResourcesPage` | Article/resource listing (can start with the deadlines calendar + placeholders) |
| `DeadlinesPage` | Expat tax deadlines calendar (generic structure, figures flagged) |
| `PrivacyPage`, `TermsPage`, `CookiesPage` | Legal copy (placeholder, flagged for legal review) |

---

## Content volume summary

| Type | Entries | Authoring unit |
|---|---|---|
| Services | 23 | data entry |
| Forms | 30 | data entry |
| Countries | 16 | data entry |
| Divisions | 6 | data entry |
| Index pages | 5 | none (derived) |
| Static pages | 11 | bespoke component + copy |

**75 of 91 pages are authored as typed data, not code.**

---

## Copy tone requirements (all types)

- Plain language first; technical terms defined on first use.
- Reassuring, never alarmist. State risks factually, without fear-selling.
- Second person ("you"), active voice, short sentences.
- No specific figures, deadlines, or eligibility assertions (see compliance guardrails in
  `CLAUDE.md` and `risk-register.md`).
- British spelling in firm-voice copy (UK firm), US tax terms kept as proper nouns
  (e.g. "FBAR", "1040", "Streamlined Filing").
