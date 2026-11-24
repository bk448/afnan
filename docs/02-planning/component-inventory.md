# Component Inventory

**Date:** 2026-11-24 · 55 components across four directories.

Rules for every row: variants are CVA `variants` objects with declared `defaultVariants`,
never conditional class strings; props are a named `interface XProps`; focus styling is one
shared `focus-visible` ring token, not per-component.

**Phase** column reads *built / first consumed* against the Layer 3 phases (3.1 primitives,
3.2 shell, 3.4 templates, 3.6 flows). `components/seo` (`Seo`, `JsonLd`) is specified in the
SEO plan and excluded from these counts.

---

## A. `components/ui` — generic, content-agnostic

| Component | Props | CVA variants | States | Radix | Phase |
|---|---|---|---|---|---|
| `Button` | `{variant, size, asChild?, ...button}` | `variant: primary\|secondary\|tertiary`, `size: sm\|md\|lg` | hover, focus-visible, active, disabled, `aria-busy` | `Slot` | 3.1 / 3.2 |
| `Link` | `{to, variant?, external?, children}` | `variant: inline\|standalone\|nav\|quiet` | hover, focus-visible, visited (inline only), current (`aria-current`) | `Slot` | 3.1 / 3.2 |
| `Card` | `{as?, interactive?, children}` | `tone: paper\|surface`, `interactive: true\|false` | hover + focus-within when interactive | — | 3.1 / 3.4 |
| `Accordion` | `{items, type, defaultValue?}` | `tone: rule\|panel` | open, closed, focus-visible, reduced-motion | `Accordion` | 3.1 / 3.4 |
| `Tabs` | `{items, defaultValue, orientation?}` | `variant: underline\|rail` | selected, hover, focus-visible, disabled | `Tabs` | 3.1 / 3.4 |
| `Badge` | `{children, tone?}` | `tone: neutral\|accent\|alert`, `size: sm\|md` | static | — | 3.1 / 3.4 |
| `Input` | `{name, label, hint?, error?, type?, inputMode?}` | `size: md\|lg`, `invalid: true\|false` | default, focus, filled, invalid, disabled, readonly | `Label` | 3.1 / 3.6 |
| `Select` | `{name, label, options, placeholder?, error?}` | `size: md\|lg`, `invalid` | closed, open, selected, invalid, disabled | `Select` | 3.1 / 3.6 |
| `Checkbox` | `{name, label, description?, error?}` | `density: compact\|card` | unchecked, checked, indeterminate, focus, invalid, disabled | `Checkbox` | 3.1 / 3.6 |
| `Radio` | `{name, label, options, error?}` | `density: compact\|card` | selected, focus, invalid, disabled | `RadioGroup` | 3.1 / 3.6 |
| `Textarea` | `{name, label, rows?, maxLength?, error?}` | `size: md\|lg`, `invalid` | as `Input` + counter near limit | `Label` | 3.1 / 3.6 |
| `Table` | `{caption, columns, rows, dense?}` | `variant: rules\|striped`, `density: default\|dense` | zebra on `Surface`, scroll-shadowless overflow at 375px | — | 3.1 / 3.4 |
| `Callout` | `{tone, title?, children}` | `tone: note\|accent\|alert` | static; `alert` reserved for penalty/deadline framing | — | 3.1 / 3.4 |
| `Disclaimer` | `{scope, children?}` | `scope: amnesty\|general` | static; renders `<aside role="note">` | — | 3.1 / 3.4 |
| `Breadcrumb` | `{items}` (primitive: `<nav><ol>`) | `variant: default\|compact` | last item `aria-current="page"`, not a link | — | 3.1 / 3.2 |
| `Skeleton` | `{width?, height?, lines?}` | `shape: text\|block` | animated, static under `prefers-reduced-motion` | — | 3.1 / 3.6 |
| `VisuallyHidden` | `{children, asChild?}` | none | none | `VisuallyHidden` | 3.1 / 3.2 |
| `SkipLink` | `{targetId, children}` | none | hidden until focus, then pinned top-left | — | 3.1 / 3.2 |

`Disclaimer scope="amnesty"` is **required** on `/services/streamlined-filing/` and
`/services/delinquent-submissions/`, driven by `requiresDisclaimer` and asserted by a
content-integrity test, not by template authoring discipline.

## B. `components/layout`

| Component | Props | CVA variants | Notes | Radix | Phase |
|---|---|---|---|---|---|
| `Header` | `{}` (reads nav config) | `position: static\|sticky` | Landmark `<header>`; houses `SkipLink` target boundary, logo, `MegaMenu`, persistent Book CTA | — | 3.2 / 3.2 |
| `MegaMenu` | `{sections}` | `panel: services\|forms\|divisions\|countries` | Columns are the sitemap theme groups. Highest accessibility risk in the project — contract below | `NavigationMenu` + custom focus layer | 3.2 / 3.2 |
| `MobileDrawer` | `{sections, open, onOpenChange}` | `level: root\|section` | Layered, breadcrumb-style back navigation; never a 91-item scroll | `Dialog` (modal) | 3.2 / 3.2 |
| `Footer` | `{}` | `tone: ink` | Sitemap-shaped columns, legal links, **Client Portal as an external outbound link** (`rel="noopener"`, not a route) | — | 3.2 / 3.2 |
| `Breadcrumbs` | `{segments?}` | — (delegates to `ui/Breadcrumb`) | Derives from route + content `group`; emits BreadcrumbList JSON-LD. Required on all 90 non-home routes | — | 3.2 / 3.2 |
| `Container` | `{width, children}` | `width: content(1200)\|prose(720)\|full` | 16px gutter floor at 375px | — | 3.2 / 3.2 |
| `Section` | `{tone, spacing, children}` | `tone: paper\|surface\|ink`, `spacing: sm\|md\|lg`, `rule: none\|top` | Hairline rules, no shadows | — | 3.2 / 3.4 |
| `Prose` | `{children}` | `measure: 68ch\|72ch` | Typographic reset for `overview`/`details` markdown-lite; caps measure, left-aligned | — | 3.2 / 3.4 |

### `MegaMenu` keyboard contract

- **Trigger:** `Enter`/`Space` opens and moves focus to the first link; `ArrowDown` opens
  without stealing focus until the second press; `ArrowLeft`/`ArrowRight` move between
  top-level triggers whether open or closed.
- **Inside the panel:** `ArrowDown`/`ArrowUp` move within a column; `ArrowRight`/`ArrowLeft`
  move across columns at the same index; `Home`/`End` jump to first/last link in the panel;
  `Tab` moves forward through panel links only — focus is contained while open and does not
  escape into page content.
- **Close:** `Escape` closes from anywhere in the panel and **returns focus to the trigger
  that opened it**; `Tab` past the last link closes and advances to the next header control;
  outside pointer-down and route change close it. Only one panel is open at a time.
- **Semantics:** trigger carries `aria-expanded` + `aria-controls`; panel is labelled by its
  trigger; column headings are real headings, not styled divs; hover opens only on pointer
  devices with a 150ms intent delay, never on focus alone.
- **Reduced motion:** disclosure transition drops to opacity-only.

## C. `components/marketing`

| Component | Props | CVA variants | Keyboard / notes | Phase |
|---|---|---|---|---|
| `Hero` | `{eyebrow?, title, summary, primary?, secondary?}` | `align: left\|center`, `tone: paper\|ink` | `center` only for short home/section statements. Max two CTAs | 3.4 / 3.4 |
| `CTABand` | `{heading, body?, primary, secondary?}` | `tone: ink\|surface`, `density: sm\|md` | Book primary, Quote secondary. Buttons only — no nested links | 3.4 / 3.4 |
| `FAQSection` | `{faqs, headingLevel?}` | `layout: stacked\|two-col` | Delegates to `ui/Accordion`; emits FAQPage JSON-LD from the same data | 3.4 / 3.4 |
| `AtAGlance` | `{variant, items}` | `variant: service\|form\|country` | `<dl>` structured summary above long-form body: service (who/risk/how), form (quick facts), country (treaty/pensions/deadlines). Qualitative only, no figures | 3.4 / 3.4 |
| `CrossLinkRail` | `{kind, items, heading}` | `kind: handledBy\|forms\|services\|countries\|divisions`, `emphasis: lead\|aside` | `handledBy` is the form page's primary onward link and renders `emphasis="lead"`. An empty rail is a failed integrity test, not a render state | 3.4 / 3.4 |
| `ServiceGrid` | `{services, groupBy?}` | `columns: 2\|3`, `group: flat\|grouped` | Grouped by `ServiceGroup`; asymmetric, not equal-weight card walls | 3.4 / 3.4 |
| `FormNumber` | `{value, as?, size?}` | `size: nav\|heading\|inline`, `tone: ink\|accent` | Renders `8938` / `3520-A` as a mono typographic object with tabular figures and no-break hyphenation. Used in **mega-menu columns, page headings and body prose** — one component, three sizes, so the vocabulary never renders incidentally | 3.1 / 3.2 |
| `CountryCard` | `{country}` | `variant: grid\|rail` | Optional restrained region marker from `flagRegion`; whole card is one link target | 3.4 / 3.4 |
| `DivisionCard` | `{division}` | `variant: grid\|rail` | Persona-voice summary, not a division label | 3.4 / 3.4 |
| `ProcessSteps` | `{steps, ordered?}` | `orientation: vertical\|horizontal`, `numbering: numeric\|none` | Semantic `<ol>`; numerals mono. No motion | 3.4 / 3.4 |

## D. `features/` — booking and quote

Booking **branches on step 1**: the complexity questions are correct for catch-up, business
and green-card paths and actively harmful for relocation and private client, who are never
asked how many years they failed to file.

| Component | Props / role | Variants | Phase |
|---|---|---|---|
| `booking/BookingFlow` | Orchestrator; owns the step machine, branch resolution, URL step param, submit | — | 3.6 |
| `booking/StepShell` | Per-step frame: `<h2>`, `<form>`, error summary slot, Back/Continue | `width: prose` | 3.6 |
| `booking/StepProgress` | `{current, total, labels}` — `aria-current="step"`, total recalculated after branching | `style: rail\|count` | 3.6 |
| `booking/StepIdentity` | Step 1. Visitor self-descriptions, multi-select, with "I'm not sure". Selects the branch | — | 3.6 |
| `booking/StepCountry` | Step 2. Country of residence, from `content/countries.ts` + "somewhere else" | — | 3.6 |
| `booking/StepFilingHistory` | Branch 3a — catch-up, green-card. Years behind, asked generically | — | 3.6 |
| `booking/StepBusinessReporting` | Branch 3b — business. Entities, ownership, payroll | — | 3.6 |
| `booking/StepRelocationTiming` | Branch 3c — relocation. Direction and approximate timing | — | 3.6 |
| `booking/StepPrivateClientBrief` | Branch 3d — private client. Free-text brief, discreet, no compliance interrogation | — | 3.6 |
| `booking/StepSituation` | Branch 3e — "I'm not sure". Neutral free-text plus optional prompts | — | 3.6 |
| `booking/StepContact` | Step 4. Name, email, preferred time window, timezone | — | 3.6 |
| `booking/BookingSummary` | Review + likely-relevant services. Suggests, never asserts eligibility | — | 3.6 |
| `booking/SubmissionResult` | Success / failure / retry after the serverless POST | `state: success\|error` | 3.6 |
| `quote/QuoteForm` | Single-screen quote request, same Zod schema family | — | 3.6 |
| `quote/QuoteScopeFields` | Scope checkboxes derived from `ServiceGroup` | — | 3.6 |
| `forms/FormField` | Shared label + control + hint + inline error. Validates **on blur**, errors beside the field in plain language, never a toast | `layout: stacked\|inline` | 3.6 |
| `forms/FormErrorSummary` | `role="alert"`, focused on failed submit, each entry links to its field | — | 3.6 |
| `forms/ChoiceCardGroup` | Card-styled multi/single select over `ui/Checkbox` / `ui/Radio`; roving arrow keys within the group, `Space` toggles | `select: single\|multi` | 3.6 |
| `forms/AntiSpamField` | Hidden honeypot + token field read by the serverless function | — | 3.6 |

Hooks, excluded from the count: `useStepMachine` (branch graph), `useDraftPersistence`
(session-storage guard against accidental loss), `useSubmitLead` (TanStack Query mutation).
Zod schemas are shared with the serverless function.

**Flow keyboard contract.** Step change moves focus to the step `<h2>`, never to the first
input. `Enter` in any field submits the current step only. Back preserves entered values.
Browser Back maps to the previous step, not a route exit. No step traps focus — the flow is
page content, not a modal.

---

## Counts

| Group | Components | Needed before 3.4 can ship |
|---|---|---|
| `components/ui` | 18 | 12 (the five form controls and `Skeleton` wait for 3.6) |
| `components/layout` | 8 | 8 |
| `components/marketing` | 10 | 10 |
| `features/` | 19 | 0 |
| **Total** | **55** | **30** |

30 of 55 components must exist and be keyboard-verified before 3.4 puts 77 pages live.
