# Tech Stack

Every dependency, with the alternative it beat. The backend is one serverless function,
so anything implying a server or database is absent by design.

## Build & language

| Package | Role | Why this and not the alternative |
|---|---|---|
| `vite` 7, `vite-tsconfig-paths` | Dev server, bundler, build; `@/` read from tsconfig | Native-ESM dev and a Rollup build with no config, with one alias definition not two; webpack and CRA need work to match. |
| `typescript` (strict) | Types; slug unions make a bad cross-link a compile error | JSDoc-checked JS cannot express the union, and the union is the point. |
| `@vitejs/plugin-react` | React transform, Fast Refresh | Stable Babel path; `-swc` saves little here and adds a native binary. |

## UI & routing

| Package | Role | Why this and not the alternative |
|---|---|---|
| `react` 19 | UI runtime | The brief's baseline; nothing needs a lighter runtime or Preact compat. |
| `react-dom` 19 | DOM renderer; `react-dom/server` prerenders at build | One install covers both, so prerendering costs no new dependency. |
| `react-router` 7 | 91 routes, nested layouts, `:slug` params | v7 is one package (`react-router-dom` is now a shim); declarative/data mode, since framework mode adds a server. |

## Styling

| Package | Role | Why this and not the alternative |
|---|---|---|
| `tailwindcss` 4 | Utilities; `@theme` holds the design tokens | CSS-first tokens keep colour in one file; v3's JS config and hand-rolled vars scatter it. |
| `@tailwindcss/vite` | First-party integration | Replaces the PostCSS and Autoprefixer chain outright in v4. |
| `clsx`, `tailwind-merge` | The two halves of `cn()`: compose classes, then let a `className` prop beat template classes | Without merge, caller overrides silently lose; without clsx, conditionals become string soup. |

## Components & icons

| Package | Role | Why this and not the alternative |
|---|---|---|
| `@radix-ui/react-*` (`navigation-menu`, `accordion`, `dialog`, `radio-group`, `label`, `slot`) | Unstyled accessible primitives | `navigation-menu` already implements the mega-menu keyboard contract (arrows, Escape, focus return), the component least likely to be hand-rolled correctly. |
| `class-variance-authority` | Typed variants for Button, Card, Badge | A bad variant name fails typecheck; clsx conditional soup fails silently. |
| `lucide-react` | Icons | Per-icon ESM that tree-shakes; `react-icons` pulls whole packs. |

## Forms & validation

| Package | Role | Why this and not the alternative |
|---|---|---|
| `react-hook-form` | The branching booking flow, the quote form | Re-renders one field, not the form; `mode: 'onBlur'` is the required validate-on-blur rule natively. Formik re-renders everything. |
| `zod` | One schema for the browser and the function | Types inferred from the schema; Yup's are bolted on and drift. |
| `@hookform/resolvers` | Zod into React Hook Form | The official adapter; hand-rolling it duplicates error mapping. |

## Data & meta

| Package | Role | Why this and not the alternative |
|---|---|---|
| `@tanstack/react-query` | **One mutation**: POST booking/quote to the function | Flagged honestly: nothing to cache, 89 of 91 routes being static. It earns its place only for `useMutation`'s pending, error and retry states, otherwise hand-written `useState` triplets in two forms. If 3.6 needs no retry semantics, drop it. |
| `react-helmet-async` | Per-route title, description, canonical | One provider the prerender pass can read head tags from, rather than trusting implicit hoisting, Layer 1's likeliest own-goal. |
| `react-dom/server` + in-repo script | Static HTML per route, plus `sitemap.xml` | No new dependency; crawl-based prerenderers boot a headless browser per route and are largely unmaintained. |

## Testing

| Package | Role | Why this and not the alternative |
|---|---|---|
| `vitest`, `@vitest/coverage-v8` | Unit and component tests, coverage | Reuses the Vite transform; Jest needs a parallel Babel/TS setup. V8 coverage needs no instrumentation step. |
| `@testing-library/react`, `user-event`, `jest-dom` | Render, query by role, interact, assert | Role-based queries turn accessibility regressions into test failures, `fireEvent` cannot show the mega-menu is keyboard operable, and `toHaveAccessibleName` beats bare booleans. |
| `jsdom` | DOM environment | `happy-dom` is faster but weaker on focus management, most of what we assert. |
| `@playwright/test`, `@axe-core/playwright` | E2E: routes navigable, both flows end to end, WCAG checks | Several engines and real focus behaviour, where Cypress runs one per pass; axe catches mechanical 2.2 AA failures so review spends its time on judgment. |

## Tooling

| Package | Role | Why this and not the alternative |
|---|---|---|
| `eslint` 9, `typescript-eslint` | Flat-config, type-aware linting | Flat config is the supported path; `.eslintrc` is legacy. |
| `eslint-plugin-jsx-a11y` | Accessibility rules in JSX | Cheapest enforcement of a non-negotiable, and it runs before tests. |
| `eslint-plugin-react-hooks` | Hook correctness | Official; no alternative worth naming. |
| `prettier`, `eslint-config-prettier`, `prettier-plugin-tailwindcss` | Formatting, conflict-free lint rules, canonical class order | A separate pass beats stylistic ESLint rules, and sorted classes keep order churn out of diffs. |
| `@vercel/node` | Types for the one handler | Matches the deploy target; Express types imply a server we do not run. |

## Deliberately not included

- **CSS-in-JS** (styled-components, Emotion) — a second styling system beside Tailwind, paid for at runtime.
- **State library** (Redux, Zustand, Jotai) — route params plus one form's local state is the whole state surface.
- **UI kit** (MUI, Chakra) — the design direction rejects a recognisable kit; Radix plus CVA is the half we need.
- **CMS** (Sanity, Contentful) — typed content is what makes cross-links compile-checked; a CMS returns them to runtime strings.
- **ORM or database client** — there is no database.
- **Auth library** — no accounts here; the client portal is an external link.
- **Animation library** (Framer Motion) — motion is hover, focus and disclosure only, which CSS handles.

## Candidates not yet chosen

Two providers stay unnamed: the anti-spam token service the function verifies, and the
transactional email service it sends through. Both sit behind one adapter module and an
environment variable, so each is a single-file swap and neither blocks Layer 2. Decide
at **phase 3.0**, once the Vercel project exists and the sending domain, DNS control and
mailbox arrangements are known. Criteria, not a winner: a cookieless posture consistent
with privacy copy drafted to GDPR and UK GDPR; domain-verified sending; a free tier
sufficient for this build; no vendor SDK in the browser bundle. Until then the function
validates with the shared Zod schema plus a honeypot and timing check: the floor, not
the plan.
