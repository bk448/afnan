# Layer 1 — Analysis

**Read this page. The rest is appendix.**

Six analysis documents sit behind this summary. They exist because the detail is needed
to build Layer 2's content schema and Layer 4's tests — not because this page is
insufficient.

---

## Route accounting

| Section | Index | Detail | Total |
| --- | --- | --- | --- |
| Top-level & static | — | 2 | 2 |
| Divisions | 1 | 6 | 7 |
| Services | 1 | 23 | 24 |
| Forms | 1 | 30 | 31 |
| Countries | 1 | 16 | 17 |
| Contact & conversion | 1 | 2 | 3 |
| Commercial & utility | — | 4 | 4 |
| Legal | — | 3 | 3 |
| **Total** | **5** | **86** | **91** |

Verified: the route set in `sitemap-inventory.md` and `search-intent-map.md` is an exact
set match — 91 distinct routes each, every one trailing-slashed, zero missing, zero
extra, zero duplicates.

## The architecture that matters

**91 routes are served by 20 page components.** Four templates carry 75 of them:

```
content/services.ts   (23) -> ServiceDetailPage    -> 23 routes
content/forms.ts      (30) -> FormDetailPage       -> 30 routes
content/countries.ts  (16) -> CountryDetailPage    -> 16 routes
content/divisions.ts  ( 6) -> DivisionDetailPage   ->  6 routes
```

Adding a page is a data edit. Never a new route, never a new component.

The other 16 routes are bespoke components. Three of them — `PrivacyPage`, `TermsPage`,
`CookiesPage` — differ only in body copy and could collapse into one `LegalPage`,
bringing the total to 18. Worth doing: it is three fewer files for no loss.

## Cross-link matrix — built and verified

`crosslink-matrix.json` holds the verified service↔form↔division↔country relations,
generated from the sitemap inventory's primary-service column and then adversarially
reviewed. Results:

| Check | Result |
| --- | --- |
| Services mapped | 23 / 23 |
| Invalid slugs | 0 |
| Primary-link violations | 0 |
| Orphan form pages | 0 |
| Issues raised and corrected by adversarial review | 57 |
| Inbound service links per form | 1 to 9 |

Reciprocity, slug validity and orphan detection were computed deterministically in code,
not asserted by a model.

**Thinly-linked forms** — one inbound service link each, so they rely on nav and the
forms index for internal linking: `706`, `926`, `4868`, `8854`, `8858`, `8865`, `14653`,
`14654`, `schedule-c-se`, `schedule-8812`, `3520-a`.

**Service→country is deliberately sparse.** Eight countries are referenced by no
service: Israel, UAE, Spain, Portugal, Netherlands, Italy, Ireland, Singapore. This is
correct, not a gap — most services are citizenship-based and country-neutral, so
country→service is the load-bearing direction. A service forced to enumerate all 16
countries produces 16-item rails that dilute the links that matter.

## Key findings

1. **Content is the critical path, not code.** Roughly 84,000 words of page copy across
   91 routes. Build the four templates against *one fully-written reference entry per
   collection* before drafting the other 71 — writing 75 entries against a schema that
   has never rendered is the most expensive available mistake.
2. **Forms and countries are 46 of 91 routes (~50%) and carry the organic traffic.**
   People search form numbers, not service names. Services and divisions are the
   conversion surface.
3. **Only three routes carry transactional intent.** Nearly all demand is informational,
   so every booking must be converted from informational traffic rather than captured.
4. **The booking flow should branch on step 1, not run as one linear questionnaire.**
   The brief's step-3 complexity flags (years unfiled, business owner, foreign accounts)
   are right for catch-up, business and green-card personas and actively harmful for
   relocation and private-client. A private client must never be asked how many years
   they failed to file. *This is a deviation from the brief — see Open questions.*
5. **Step 1's options must be visitor self-descriptions, not division labels**, with
   "I'm not sure" and multi-select. Overlap is the norm: business owner *and* years
   behind; green card holder *and* catch-up filer.
6. **Compliance is enforced as a build failure, not editorial discipline.** Every
   unreviewed figure is a greppable `{{FIGURE:id}}` token against a registry; the
   production build fails on any unapproved token. `grep -rn "{{" src/content/` lists
   every unreviewed fact on the site.
7. **The required amnesty disclaimer is a conversion asset, not a tax.** For a
   frightened non-filer it is the clearest signal the firm is not selling a verdict.
8. **The content architecture is the social proof.** Invented proof is forbidden, so
   structural depth is the only evidence available — a thin `/forms/5471/` does not
   merely rank poorly, it disqualifies the business-owner audience outright.

## Highest-risk items

| Risk | Why it matters |
| --- | --- |
| A wrong or stale tax figure published | Direct liability for a tax firm. Mitigated by the token registry + build gate. |
| Copy implying a reader qualifies for Streamlined Filing | Eligibility turns on a non-willfulness certification. Enforced by a lint-testable voice rule. |
| Prerendered meta tags not reaching served HTML | Every page ships with no metadata and the SEO gate fails silently. The single most likely technical own-goal. |
| Cannibalisation between `/services/fbar/` and `/forms/fbar/` | `fbar` and `relocation` are the only slugs duplicated across sections. |
| Mega-menu keyboard compliance | Highest-risk component for WCAG 2.2 AA. |
| 30 near-identical form pages read as doorway pages | Thin template output across one collection is an indexing risk. |

## Open questions — unresolved, and they affect Layer 2

| # | Question | Working assumption |
| --- | --- | --- |
| 1 | ~~Brand identity?~~ **Resolved: Jungle Tax** | Still keep all brand strings in one config file. |
| 2 | Real-time calendar availability, or request-a-time? | Request-a-time; no scheduling backend. Swappable for a Cal.com embed. |
| 3 | Payment taken at booking? | No payment at booking. |
| 4 | Privacy jurisdiction? | GDPR + UK GDPR, since the audience is US persons resident in the EU and UK. |
| 5 | Follow the brief's linear booking flow, or branch it (finding 4)? | Branch it, and document why. |

## Backend position

No application server, no database. The site is a lead-generation funnel: 89 of 91 routes
are prerendered static HTML. One Vercel serverless function handles booking and quote
submissions — revalidating with the shared Zod schema, verifying an anti-spam token, and
sending email.

Collecting SSN/ITIN, income figures or tax documents through this site is **out of
scope**. That keeps the firm out of IRS Pub 4557 and FTC Safeguards territory, and it is
what keeps the backend at one function. Document exchange belongs in the firm's existing
secure portal.

This is corroborated by the sitemap itself: **Client Portal is an external outbound link
in the footer, not a route we build.** The secure client system already exists elsewhere,
which is precisely why this site needs no database.

## The appendix

| Document | Contents |
| --- | --- |
| `sitemap-inventory.md` | All 91 routes: title, type, parent, template, priority, changefreq. Source of truth for route structure. |
| `personas.md` | The six audiences: trigger event, emotional state, questions, objections, converting signal. |
| `search-intent-map.md` | Per-route real query, intent, target keyword, funnel stage, page role. Cannibalisation analysis. |
| `content-requirements.md` | Required content shape per page type. Becomes the Layer 2 TypeScript schema. |
| `technical-requirements.md` | Numbered `FR-n` / `NFR-n` requirements with verification method and traceability. |
| `risk-register.md` | Scored risk register with mitigations and owners. |
| `crosslink-matrix.json` | Verified relation data. Consumed directly by Layer 3. |

All generated page copy is `reviewStatus: 'draft'` — structural placeholder content
requiring sign-off by a qualified tax professional before publication.
