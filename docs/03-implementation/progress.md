# Implementation progress

Live status. An item is only complete when `npm run validate` passes.

Last updated: 2026-11-24

---

## Gate status

| Gate | Command | State |
| ---- | ------- | ----- |
| Typecheck | `npm run typecheck` | passing |
| Lint | `npm run lint` | passing |
| Tests | `npm run test:run` | passing — 42 tests, 3 files |
| Production build | `npm run build` | passing — 91/91 routes prerendered, 91 sitemap URLs |

---

## Complete

### Content (75 entries, all four templates)

| Set | Entries | File |
| --- | ------- | ---- |
| Services | 23 | `src/content/services.ts` |
| Forms | 30 | `src/content/forms.ts` |
| Countries | 16 | `src/content/countries.ts` |
| Divisions | 6 | `src/content/divisions.ts` |

Cross-linking is enforced at type level and asserted reciprocal in
`src/content/__tests__/integrity.test.ts`.

### Routing and rendering

- 91 canonical routes, all prerendered to static HTML with metadata lifted into `<head>`.
- `dist/sitemap.xml` generated from the route manifest.
- SEO meta uniqueness asserted in `src/content/__tests__/seo.test.ts`.

### Booking submission — wired to Supabase (2026-11-24)

The consultation form previously validated and then discarded the submission. It now
persists to Supabase.

- `supabase/migrations/0001_booking_requests.sql` — table, constraints, RLS.
- `src/lib/supabase.ts` — lazily loaded client, returns null when unconfigured.
- `src/features/booking/submitBooking.ts` — submission adapter.
- `src/features/booking/BookingFlow.tsx` — sending state, failure message, answers
  preserved on failure so nothing is retyped.
- 9 tests in `src/features/booking/__tests__/submitBooking.test.ts`.

Security: RLS on, anon granted `INSERT` only, with no `SELECT` policy or privilege.
Submissions are write-only from the browser; reading requires the `service_role` key.
This reverses a documented scope boundary — see `docs/02-planning/architecture.md` §7.1.

Performance: the SDK is ~59 kB gzipped and is imported dynamically, in its own
`supabase` chunk, so it stays off the critical path of all 91 pages. Verified: the chunk
is not in any page's `modulepreload` set.

---

## Outstanding

### Blocking launch

| # | Item | Notes |
| - | ---- | ----- |
| 1 | **All 77 content entries are `reviewStatus: 'draft'`** | No tax professional has reviewed any page copy. Highest-liability item on the project. |
| 2 | **Supabase project not yet created** | Needs a project, the migration run, and `.env.local` populated from `.env.example`. Until then the form shows its failure message. |
| 3 | **No notification on submission** | A request sits in the table until someone looks. Needs an email trigger or a webhook. |
| 4 | **`/privacy/` does not mention Supabase** | Required now that personal data is stored. Must name the processor, the region, a lawful basis and a retention period. |
| 5 | **No spam or abuse control on the insert** | The endpoint is public by design. Consider Turnstile or a Supabase Edge Function in front of the insert. |

### Not yet started

| # | Item | Notes |
| - | ---- | ----- |
| 6 | Playwright e2e | Specified in `CLAUDE.md`; no config, no dependency, no `e2e` script. |
| 7 | `docs/04-testing/` | Layer 4 docs referenced by `CLAUDE.md` do not exist. |
| 8 | `scripts/check-figures.mjs` | `docs/02-planning/architecture.md` §6 describes it as a build gate; it is not implemented and not in the `build` script. |
| 9 | `src/features/quote/` | Quote flow in the directory map; not built. |
| 10 | Deploy target and CI | No host config, no pipeline. Nothing pushed to `origin` yet. |
| 11 | `npm audit` | 4 advisories (1 moderate, 1 high, 2 critical) in the dependency tree, pre-existing. |

---

## Decisions worth remembering

- **Storing submissions was originally out of scope** on compliance grounds. That boundary
  was lifted deliberately; the three other exclusions (no tax identifiers, no uploads, no
  client accounts) still hold and are what keep the stored data proportionate.
- **The anon key is not a secret.** It ships in the bundle. Anyone treating it as a
  credential to protect has misread the model; RLS is the boundary.
