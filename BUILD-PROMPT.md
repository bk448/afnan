# BUILD PROMPT — US Expat Tax Website

> Paste everything below the line into Claude Code (or any capable coding agent).
> It is self-contained: it carries the business context, the full sitemap, the design
> direction and the four-layer process. The agent does not need the original PDF.

---

## ROLE

You are a senior product engineer and design-systems lead. You are building a
production marketing and consultation-booking website for a **US expatriate tax
firm**. You are responsible for the full lifecycle: research, architecture, design,
implementation and verification.

Work in four sequential layers: **Analysis → Planning → Implementation → Testing.**
Do not begin a layer until the previous layer's deliverables exist and I have
approved them. Stop and present at the end of each layer.

---

## BUSINESS CONTEXT — read this first, it drives every decision

The United States taxes its citizens on **worldwide income based on citizenship, not
residence**. Roughly 5 million Americans living abroad must therefore file a US tax
return every year — even if they have not lived in the US for decades, even if they
already pay full tax where they live, and even if they ultimately owe nothing.

Most of them do not know this. Many discover it only when a foreign bank contacts
them under FATCA reporting rules. The emotional state of the typical visitor is
**anxiety, confusion, and fear of penalties.**

The site must do three things, in order:

1. **Get found** by someone searching at 11pm for "am I in trouble for not filing US taxes"
2. **Reassure** them that a known, legal, routine path exists
3. **Convert** them into a booked consultation

Every one of the 91 pages funnels to a single action: **Book a Consultation.**

### Primary audiences

| Audience | Emotional state | Commercial value |
|---|---|---|
| Accidental Americans / years-behind filers | Panic, urgency | Highest — ready to pay today |
| Individuals & families abroad | Routine, price-sensitive | Recurring annual revenue |
| Business owners abroad | Overwhelmed by reporting | High |
| People moving abroad / returning | Planning ahead | Medium |
| Green card holders abroad | Unaware of obligation | Medium |
| High-net-worth / trusts & estates | Discreet, advisor-led | Highest fee per engagement |

### Three search-intent entry paths — the IA must serve all three

- **"Who I am"** → Divisions (`/divisions/catch-up/`)
- **"What I need"** → Services (`/services/streamlined-filing/`)
- **"Where I live"** → Countries (`/countries/germany/`)
- Plus **"What is this form?"** → Forms (`/forms/8621/`) — the single largest
  organic-traffic surface. People search form numbers, not service names.

---

## THE SITEMAP — 91 routes, authoritative

```
/                                           Home
/about/                                     About Us

/divisions/                                 Divisions index
  /divisions/individuals-families/          Individuals & Families
  /divisions/business/                      Business Owners & Entrepreneurs
  /divisions/catch-up/                      Accidental Americans & Catch-Up Filers
  /divisions/relocation/                    Moving Abroad & Returning to the US
  /divisions/green-card-holders/            Green Card Holders Abroad
  /divisions/private-client/                High-Net-Worth, Trusts & Estates

/services/                                  Services index
  — Annual Compliance —
  /services/expat-tax-returns/              US Expat Tax Return Preparation
  /services/fbar/                           FBAR Filing
  /services/fatca/                          FATCA Reporting
  /services/state-tax/                      State Tax & Residency Exit
  — Catch-Up & Amnesty —
  /services/streamlined-filing/             Streamlined Filing (SFOP / SDOP)
  /services/delinquent-submissions/         Delinquent FBAR & Information Returns
  /services/amended-returns/                Prior-Year & Amended Returns
  — Avoiding Double Taxation —
  /services/feie-ftc/                       FEIE & Foreign Tax Credit
  /services/tax-treaties/                   Tax Treaty Analysis
  /services/totalization/                   Self-Employment Tax & Totalization
  — Foreign Income & Assets —
  /services/foreign-pensions/               Foreign Pensions & Retirement Accounts
  /services/pfic/                           PFIC Reporting (Foreign Funds)
  /services/foreign-property/               Foreign Rental Property & Home Sales
  /services/equity-compensation/            Equity Compensation (RSUs, Options)
  — Business & Entities —
  /services/foreign-entities/               Foreign Company Reporting (5471/8865/8858)
  /services/gilti/                          GILTI & Subpart F Planning
  — Family, Trusts & Estates —
  /services/non-us-spouse/                  Non-US Spouse & Family Filing
  /services/foreign-trusts-gifts/           Foreign Trusts, Gifts & Inheritances
  /services/gift-estate-tax/                US Gift & Estate Tax
  — Life Changes & Advisory —
  /services/relocation/                     Moving Abroad / Returning (Dual-Status)
  /services/expatriation/                   Renunciation & Expatriation Tax
  /services/tax-planning/                   Tax Planning & Consultations
  /services/irs-representation/             IRS Notices & Representation

/forms/                                     Forms index
  — Core Return & Filing —
  /forms/1040/          /forms/schedule-b/    /forms/schedule-c-se/
  /forms/schedule-e/    /forms/1040-x/        /forms/1040-nr/
  /forms/1040-es/       /forms/4868/          /forms/2350/
  — Foreign Income & Credits —
  /forms/2555/          /forms/1116/          /forms/8833/
  /forms/schedule-8812/ /forms/8960/          /forms/8606/
  — Foreign Accounts & Assets —
  /forms/fbar/          /forms/8938/          /forms/8621/
  — Foreign Entities —
  /forms/5471/          /forms/8865/          /forms/8858/
  /forms/8992/          /forms/926/
  — Trusts, Gifts & Estates —
  /forms/3520/          /forms/3520-a/        /forms/709/        /forms/706/
  — Compliance Programs & Expatriation —
  /forms/14653/         /forms/14654/         /forms/8854/

/countries/                                 Countries index
  canada · mexico · uk · germany · france · australia · israel · japan
  spain · italy · netherlands · switzerland · ireland · portugal · uae · singapore

/contact/                                   Contact
  /contact/book/                            Book a Consultation  ← primary conversion
  /contact/quote/                           Request a Quote

/pricing/   /faqs/   /resources/   /resources/deadlines/
/privacy/   /terms/   /cookies/
```

**Counts:** 6 divisions · 23 services · 30 forms · 16 countries · 91 total routes.

### Structural rules from the sitemap

- **Country pages share one template:** treaty position, treatment of local pensions
  (UK SIPPs, Australian super, Canadian RRSPs), local vs US filing deadlines, common
  PFIC traps, booking CTA.
- **Form pages link to their service and back again** (Form 8621 ↔ PFIC Reporting).
  This bidirectional linking is a hard requirement, not a nicety.
- **Services and Forms are grouped by theme.** Those group headings become the
  dropdown sections in the main navigation.
- **Divisions and Services overlap deliberately.** Divisions serve people browsing by
  *who they are*; Services by *what they need*. Each division page lists its services.

---

## ARCHITECTURAL NON-NEGOTIABLE — content is data, pages are templates

You will **not** create 91 page components.

Four typed content files drive four templates:

```
content/services.ts   (23 entries)  →  ServiceDetailPage     →  23 URLs
content/forms.ts      (30 entries)  →  FormDetailPage        →  30 URLs
content/countries.ts  (16 entries)  →  CountryDetailPage     →  16 URLs
content/divisions.ts  ( 6 entries)  →  DivisionDetailPage    →   6 URLs
```

Target: **91 URLs from roughly 19 page components.**

- Adding a page = adding a data entry. Never a new route, never a new component.
- Page copy lives in content files, never hardcoded inside components.
- Cross-link fields are typed slug unions, so a bad reference is a **compile error**,
  not a runtime 404.
- If one entry needs something the others don't, add an **optional** field to the
  shared type. Never fork the template.

---

## DESIGN DIRECTION — this section is as important as the code

The visual language is **institutional editorial**: the considered restraint of a
private bank, a barristers' chambers, or a serious financial publication. Authority
through typography and whitespace, not through decoration.

Think: Stripe's documentation discipline · The Economist's typographic hierarchy ·
a Swiss annual report. **Not** a SaaS landing page.

### Explicitly forbidden — the generic AI-generated look

Do not produce any of the following. They are the hallmarks of default AI output and
will be rejected:

- Purple / violet / indigo gradients, or Tailwind's default `blue-500` / `indigo-600`
- Gradient-filled text headings
- Glassmorphism, `backdrop-blur` surfaces, neon glow effects
- Large pill-shaped buttons with gradient fills
- Heavy drop shadows on floating cards; `rounded-2xl` / `rounded-3xl` everywhere
- Emoji used as iconography or inside headings
- A centered hero over a blurred gradient blob
- Three identical feature cards with coloured circle icons
- Invented social proof ("Trusted by 10,000+ clients", fake star ratings, fake logos)
- A dark-mode toggle (not requested; adds surface area for no gain)
- Animated gradient borders, marquee strips, confetti, decorative motion
- Vague filler copy: "Empowering your financial future", "Your journey starts here"
- Inter as the display face — it is the default-AI signature typeface

### Required visual system

**Typography — the primary design tool.**

| Role | Face | Use |
|---|---|---|
| Display / headings | A serif — Source Serif 4, Newsreader or Spectral | Authority, editorial weight |
| Body / UI | A neutral grotesque — IBM Plex Sans, Public Sans or Geist | Clarity |
| Numeric / technical | A mono — IBM Plex Mono | Form numbers, deadlines, figures |

Treat form numbers (`8938`, `3520-A`) as **typographic objects** set in mono. They are
the vocabulary of this domain and should look deliberate, not incidental.

Set a real modular type scale. Body copy at 17–18px with ~1.65 line-height. Measure
capped at 68–72 characters. Headings tight-tracked, never all-caps except small labels.

**Colour — restrained, three families only.**

```
Ink      #0E2238   deep navy-black   — text, headers, footers
Paper    #FAF8F5   warm off-white    — page background (never pure #FFFFFF)
Surface  #F1EEE9   warm grey         — alternating sections, table rows
Rule     #DDD7CE   hairline borders
Accent   #9A6B3F   restrained brass  — links, CTAs, active states (used sparingly)
Alert    #8A2B2B   deep red          — penalty warnings, deadlines ONLY
```

Accent appears on **under 5% of any screen**. If a page looks colourful, it is wrong.

Every value is a design token in one place. Swapping to real brand colours must be a
single-file change.

**Surface and depth.**

- Separate content with **1px hairline rules**, not shadows.
- Border radius: `4px` for inputs and buttons, `6px` for panels. Nothing larger.
- Shadows only where elevation is literal — an open dropdown, a modal. Never on a card.
- Buttons are rectangular with a 4px radius: solid ink (primary), hairline outline
  (secondary), underlined text (tertiary).

**Layout.**

- 12-column grid, 1200px max content width, 720px max for prose.
- Left-aligned text. Centre only short hero statements and nothing else.
- Generous asymmetric whitespace. Dense blocks of equal-weight cards are forbidden.
- Mobile-first; verify at 375 / 768 / 1280 / 1920.

**Motion.**

- 150–200ms ease-out on hover, focus and disclosure only.
- No scroll-triggered reveals, parallax, or entrance animation.
- Respect `prefers-reduced-motion`.

### UX requirements

**Navigation.** A mega-menu is mandatory — 23 services and 30 forms cannot live in a
flat dropdown. Columns follow the sitemap's theme groups. Must be fully keyboard
operable: arrow keys, Escape to close, focus trapped and returned. Mobile uses a
layered drawer with breadcrumb-style back navigation, never a 91-item scroll.

**Orientation.** Breadcrumbs on every page except home. Visitors land from Google on
deep pages and must instantly know where they are.

**Cross-navigation.** Every form page shows "Handled by →" linking its service. Every
service page shows "Forms involved" linking back. Every country page lists relevant
services. Dead ends are bugs.

**Reassurance before salesmanship.** The person arriving is frightened. Lead with
plain language and a clear path. No urgency manipulation, no countdown timers, no
scarcity messaging. Confidence, not pressure.

**Scanability.** Each detail page opens with a short structured summary — who it
applies to, the deadline, the headline risk — before the long-form explanation.

**Conversion.** One persistent primary action: Book a Consultation. A secondary
Request a Quote. Never more than two competing CTAs on a screen.

**Booking flow.** Multi-step, progressively disclosed, with progress indication and a
saved-state guard against accidental loss:

```
1. Which best describes you?        → maps to a Division
2. Which country do you live in?    → maps to a Country
3. Years unfiled? Business owner? Foreign accounts?  → complexity flags
4. Contact details and preferred time
   → Summary screen suggesting likely relevant services
```

Validate on blur, never on keystroke. Errors appear beside their field in plain
language ("Enter the year you last filed"), never as a toast.

**Accessibility — WCAG 2.2 AA, non-negotiable.** Semantic landmarks, visible focus
rings, 4.5:1 contrast minimum, labelled inputs, logical heading order, skip link,
keyboard-complete flows.

---

## COMPLIANCE GUARDRAILS — a regulated domain

- **Never invent specific tax figures.** No thresholds, exclusion amounts, penalty
  sums, deadlines or treaty rates. Use a clearly flagged placeholder or describe the
  figure generically ("the annual exclusion amount"). A wrong number on a tax firm's
  website is a liability.
- **Never tell a visitor they qualify** for a procedure. Streamlined eligibility turns
  on a non-willfulness certification. Describe what a procedure *is*; never assert it
  applies to the reader.
- Amnesty pages (`/services/streamlined-filing/`, `/services/delinquent-submissions/`)
  must carry a visible disclaimer component.
- Nothing may imply a client relationship is created by using the site.
- Mark all generated copy `reviewStatus: 'draft'`. It is **structural placeholder
  content requiring sign-off by a qualified tax professional before publication.**

---

# THE FOUR LAYERS

Complete each layer, present the deliverables, and wait for approval before advancing.

## LAYER 1 — ANALYSIS

**Goal:** understand the problem completely before proposing a solution. No code.

Produce in `docs/01-analysis/`:

1. **`sitemap-inventory.md`** — all 91 routes as a table: URL, title, page type, parent,
   template, priority, change frequency. This becomes the source of truth.
2. **`personas.md`** — the six audiences: trigger event that brings them to the site,
   emotional state, questions they need answered, objections, what converts them.
3. **`search-intent-map.md`** — for every page, the real query someone types, the intent
   behind it, and the target keyword. Identify which pages are traffic magnets (forms,
   countries) versus conversion pages (services, divisions).
4. **`content-requirements.md`** — the required content shape of each page type. What
   must every form page contain? Every country page? This becomes the TypeScript schema.
5. **`technical-requirements.md`** — functional and non-functional requirements:
   performance budgets, SEO requirements, accessibility target, browser support.
6. **`risk-register.md`** — compliance exposure, content-accuracy risk, SEO
   cannibalisation between overlapping Divisions and Services, maintenance burden.

**Gate:** I can read these and fully understand the site without seeing any code.

## LAYER 2 — PLANNING

**Goal:** decide the architecture and the design language. Still no production code —
design tokens and type definitions only.

Produce in `docs/02-planning/`:

1. **`architecture.md`** — folder structure with the responsibility of each directory,
   data flow, rendering and SEO strategy, build pipeline.
2. **`tech-stack.md`** — every dependency with a one-line justification. No package
   without a reason.
3. **`content-model.md`** — the complete TypeScript schema for services, forms,
   countries and divisions, including the typed slug unions that enforce cross-links.
4. **`routing-plan.md`** — route table mapping all 91 URLs to templates and data keys.
5. **`design-system.md`** — the full specification: type scale with exact sizes,
   colour tokens with contrast ratios, spacing scale, radii, elevation rules,
   component anatomy. Include the forbidden-patterns list above.
6. **`component-inventory.md`** — every component to be built, grouped as primitives,
   layout, marketing blocks and feature components, with props and states.
7. **`roadmap.md`** — phased delivery plan with what is demonstrable at each phase.

**Gate:** design tokens are defined and the content schema compiles. Present the
design system as a rendered style-tile page before building any product UI.

## LAYER 3 — IMPLEMENTATION

**Goal:** build it. Follow the phases; present a working result at each one.

| Phase | Deliverable | Demonstrable outcome |
|---|---|---|
| 3.0 | Toolchain, config, folder structure, CI | Dev server boots clean |
| 3.1 | Design tokens + UI primitives + style tile | Every primitive in all states |
| 3.2 | Header, mega-menu, footer, breadcrumbs, shell | All 91 links navigable |
| 3.3 | Content models + the four data files | Typed, cross-linked, integrity-tested |
| 3.4 | The four templates + four index pages | 77 of 91 pages live |
| 3.5 | Home, About, Pricing, FAQs, Resources, Deadlines, legal | All 91 pages live |
| 3.6 | Booking and Quote flows | Multi-step forms validating end to end |
| 3.7 | SEO: per-page meta, sitemap.xml, robots.txt, JSON-LD, prerender | Static HTML per route |

Rules while implementing:

- Typed strict mode throughout. No `any`, no non-null assertions to silence errors.
- No copy hardcoded in components. No raw colour values. No relative-path imports.
- Components are small, named-exported, one per file, with a declared props interface.
- Commit at the end of each phase with a clear message.
- Update a running progress document in `docs/03-implementation/progress.md`.

## LAYER 4 — TESTING

**Goal:** prove it works. Tests are deliverables, not an afterthought.

Produce in `docs/04-testing/` plus the suites themselves:

1. **`test-strategy.md`** — what is tested at which level and why.
2. **`acceptance-criteria.md`** — per page type, the conditions for "done".
3. **Content integrity tests** — every cross-link resolves; every service↔form link is
   reciprocal; every slug is unique; every entry has required SEO fields; every route
   in the sitemap has content. *These catch the failure mode this architecture is most
   exposed to.*
4. **Component tests** — primitives in every state; mega-menu keyboard operation;
   breadcrumb generation; form validation rules.
5. **Integration tests** — each of the four templates renders a representative entry
   correctly, including cross-links and CTA.
6. **End-to-end tests** — the three entry paths (who/what/where) each reaching a
   completed booking; mobile navigation drawer; quote request.
7. **Accessibility audit** — automated axe pass on every page type, plus a documented
   manual keyboard walkthrough of the mega-menu and the booking flow.
8. **SEO verification** — every route has a unique title and description; every route
   appears in sitemap.xml; canonical URLs carry trailing slashes; JSON-LD validates.
9. **Performance** — Lighthouse ≥ 95 on performance, accessibility, best practices and
   SEO for a representative page of each type. Report the numbers.

**Gate:** a single `npm run validate` runs typecheck, lint and the full suite and
passes. Report real results. If something fails, say so and show the output.

---

## DEFINITION OF DONE

- [ ] All 91 routes render, each with unique SEO metadata, each in `sitemap.xml`
- [ ] 91 URLs served by roughly 19 page components — no duplicated templates
- [ ] Every service↔form cross-link resolves in both directions, verified by test
- [ ] Mega-menu and booking flow fully keyboard operable; WCAG 2.2 AA met
- [ ] Zero forbidden design patterns from the list above
- [ ] Lighthouse ≥ 95 across all four categories
- [ ] `npm run validate` passes
- [ ] All generated copy marked `reviewStatus: 'draft'` and listed for professional review
- [ ] Documentation complete across all four `docs/` layers

---

## HOW TO BEGIN

Start with **Layer 1 only**. Do not write application code. Do not install packages.

Present the six analysis documents, then stop and wait for my approval before moving
to Layer 2.

If anything above is ambiguous, ask before assuming. State any assumption you do make.
