# BUILD BRIEF — US Expat Tax Website

Authoritative source brief. All four documentation layers derive from this file.
If this file and a later doc disagree, this file wins.

---

## 1. Business context

The United States taxes its citizens on **worldwide income based on citizenship, not
residence**. Roughly 5 million Americans living abroad must therefore file a US tax
return every year — even if they have not lived in the US for decades, even if they
already pay full tax where they live, and even if they ultimately owe nothing.

Most of them do not know this. Many discover it only when a foreign bank contacts them
under FATCA reporting rules. The emotional state of the typical visitor is **anxiety,
confusion, and fear of penalties.**

The site must do three things, in order:

1. **Get found** by someone searching at 11pm for "am I in trouble for not filing US taxes"
2. **Reassure** them that a known, legal, routine path exists
3. **Convert** them into a booked consultation

Every one of the 91 pages funnels to a single action: **Book a Consultation.**

### Revenue model

| Type | Examples |
| --- | --- |
| One-off | Paid initial consultation, IRS catch-up filing, tax planning, PFIC assessment, foreign pension advice |
| Recurring | Annual return preparation, FBAR filing, FATCA reporting, ongoing compliance |

Recurring revenue is the strategic prize; catch-up filers are the highest-urgency
entry point and convert fastest.

### Primary audiences

| Audience | Emotional state | Commercial value |
| --- | --- | --- |
| Accidental Americans / years-behind filers | Panic, urgency | Highest — ready to pay today |
| Individuals & families abroad | Routine, price-sensitive | Recurring annual revenue |
| Business owners abroad | Overwhelmed by reporting | High |
| People moving abroad / returning | Planning ahead | Medium |
| Green card holders abroad | Unaware of obligation | Medium |
| High-net-worth / trusts & estates | Discreet, advisor-led | Highest fee per engagement |

### Four search-intent entry paths — the IA must serve all four

| Intent | Section | Example |
| --- | --- | --- |
| "Who I am" | Divisions | `/divisions/catch-up/` |
| "What I need" | Services | `/services/streamlined-filing/` |
| "Where I live" | Countries | `/countries/germany/` |
| "What is this form?" | Forms | `/forms/8621/` |

Forms are the single largest organic-traffic surface. **People search form numbers, not
service names.**

### What each section is for

| Section | Purpose | Example |
| --- | --- | --- |
| Divisions | Identifies the customer | Business Owners |
| Services | Explains what the firm sells | US Tax Return Preparation |
| Forms | Attracts Google traffic | Form 8938 |
| Countries | Targets country-specific searches | US Taxes for Americans in the UK |

Divisions and Services overlap **deliberately**: Divisions serve people browsing by who
they are, Services by what they need. Each division page lists its services.

---

## 2. The sitemap — 91 routes, authoritative

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

**Counts:** 6 divisions · 23 services · 30 forms · 16 countries · **91 total routes.**

### Structural rules

- **Country pages share one template:** treaty position, treatment of local pensions
  (UK SIPPs, Australian super, Canadian RRSPs), local vs US filing deadlines, common
  PFIC traps, booking CTA.
- **Form pages link to their service and back again** (Form 8621 ↔ PFIC Reporting).
  Bidirectional linking is a hard requirement, not a nicety.
- **Services and Forms are grouped by theme.** Those group headings become the dropdown
  sections in the main navigation.
- **Trailing slashes:** every canonical URL ends in `/`.

---

## 3. Architectural non-negotiable — content is data, pages are templates

You will **not** create 91 page components.

```
content/services.ts   (23 entries)  →  ServiceDetailPage   →  23 URLs
content/forms.ts      (30 entries)  →  FormDetailPage      →  30 URLs
content/countries.ts  (16 entries)  →  CountryDetailPage   →  16 URLs
content/divisions.ts  ( 6 entries)  →  DivisionDetailPage  →   6 URLs
```

Target: **91 URLs from roughly 19 page components.**

- Adding a page = adding a data entry. Never a new route, never a new component.
- Page copy lives in content files, never hardcoded inside components.
- Cross-link fields are typed slug unions, so a bad reference is a **compile error**,
  not a runtime 404.
- If one entry needs something the others don't, add an **optional** field to the shared
  type. Never fork the template.

---

## 4. Design direction

The visual language is **institutional editorial**: the considered restraint of a
private bank, a barristers' chambers, or a serious financial publication. Authority
through typography and whitespace, not decoration.

Reference points: Stripe's documentation discipline · The Economist's typographic
hierarchy · a Swiss annual report. **Not** a SaaS landing page.

### Explicitly forbidden — the generic AI-generated look

These are hallmarks of default AI output and will be rejected:

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
| --- | --- | --- |
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
Every value is a design token in one place; swapping to real brand colours must be a
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

- **Navigation.** A mega-menu is mandatory — 23 services and 30 forms cannot live in a
  flat dropdown. Columns follow the sitemap's theme groups. Fully keyboard operable:
  arrow keys, Escape to close, focus trapped and returned. Mobile uses a layered drawer
  with breadcrumb-style back navigation, never a 91-item scroll.
- **Orientation.** Breadcrumbs on every page except home. Visitors land from Google on
  deep pages and must instantly know where they are.
- **Cross-navigation.** Every form page shows "Handled by →" linking its service. Every
  service page shows "Forms involved" linking back. Every country page lists relevant
  services. **Dead ends are bugs.**
- **Reassurance before salesmanship.** The person arriving is frightened. Lead with
  plain language and a clear path. No urgency manipulation, no countdown timers, no
  scarcity messaging. Confidence, not pressure.
- **Scanability.** Each detail page opens with a short structured summary — who it
  applies to, the deadline, the headline risk — before the long-form explanation.
- **Conversion.** One persistent primary action: Book a Consultation. A secondary
  Request a Quote. Never more than two competing CTAs on a screen.
- **Accessibility — WCAG 2.2 AA, non-negotiable.** Semantic landmarks, visible focus
  rings, 4.5:1 contrast minimum, labelled inputs, logical heading order, skip link,
  keyboard-complete flows.

### Booking flow

Multi-step, progressively disclosed, with progress indication and a saved-state guard
against accidental loss:

```
1. Which best describes you?        → maps to a Division
2. Which country do you live in?    → maps to a Country
3. Years unfiled? Business owner? Foreign accounts?  → complexity flags
4. Contact details and preferred time
   → Summary screen suggesting likely relevant services
```

Validate on blur, never on keystroke. Errors appear beside their field in plain
language ("Enter the year you last filed"), never as a toast.

---

## 5. Compliance guardrails — a regulated domain

- **Never invent specific tax figures.** No thresholds, exclusion amounts, penalty sums,
  deadlines or treaty rates. Use a clearly flagged placeholder or describe the figure
  generically ("the annual exclusion amount"). A wrong number on a tax firm's website is
  a liability.
- **Never tell a visitor they qualify** for a procedure. Streamlined eligibility turns on
  a non-willfulness certification. Describe what a procedure *is*; never assert it
  applies to the reader.
- Amnesty pages (`/services/streamlined-filing/`, `/services/delinquent-submissions/`)
  must carry a visible disclaimer component.
- Nothing may imply a client relationship is created by using the site.
- Mark all generated copy `reviewStatus: 'draft'`. It is **structural placeholder content
  requiring sign-off by a qualified tax professional before publication.**

---

## 6. The four layers

Complete each layer, present deliverables, wait for approval before advancing.

| Layer | Folder | Purpose |
| --- | --- | --- |
| 1. Analysis | `docs/01-analysis/` | Understand the problem completely. No code. |
| 2. Planning | `docs/02-planning/` | Architecture + design language. Tokens and types only. |
| 3. Implementation | `docs/03-implementation/` | Build it in phases 3.0 → 3.7 |
| 4. Testing | `docs/04-testing/` | Prove it works. Tests are deliverables. |

### Layer 1 deliverables

1. `sitemap-inventory.md` — all 91 routes as a table: URL, title, page type, parent,
   template, priority, change frequency. Source of truth.
2. `personas.md` — the six audiences: trigger event, emotional state, questions,
   objections, what converts them.
3. `search-intent-map.md` — per page: the real query typed, the intent, the target
   keyword. Identify traffic magnets vs conversion pages.
4. `content-requirements.md` — required content shape of each page type. Becomes the
   TypeScript schema.
5. `technical-requirements.md` — functional and non-functional: performance budgets,
   SEO, accessibility target, browser support.
6. `risk-register.md` — compliance exposure, content-accuracy risk, SEO cannibalisation
   between overlapping Divisions and Services, maintenance burden.

**Gate:** these can be read and fully understood without seeing any code.

### Layer 3 phases

| Phase | Deliverable | Demonstrable outcome |
| --- | --- | --- |
| 3.0 | Toolchain, config, folder structure, CI | Dev server boots clean |
| 3.1 | Design tokens + UI primitives + style tile | Every primitive in all states |
| 3.2 | Header, mega-menu, footer, breadcrumbs, shell | All 91 links navigable |
| 3.3 | Content models + the four data files | Typed, cross-linked, integrity-tested |
| 3.4 | The four templates + four index pages | 77 of 91 pages live |
| 3.5 | Home, About, Pricing, FAQs, Resources, Deadlines, legal | All 91 pages live |
| 3.6 | Booking and Quote flows | Multi-step forms validating end to end |
| 3.7 | SEO: per-page meta, sitemap.xml, robots.txt, JSON-LD, prerender | Static HTML per route |

---

## 7. Definition of done

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

## 8. Open questions

| # | Question | Status | Working assumption |
| --- | --- | --- | --- |
| 1 | Is this for JungleTax, Tranzesta, or a new standalone brand? | **Unresolved** | Build brand-neutral. All brand strings live in one config file so a name change is a single-file edit. Does not block Layer 1. |
| 2 | Is booking real-time calendar availability, or request-a-time confirmed by email? | **Unresolved** | Request-a-time. Avoids a scheduling backend; swappable for a Cal.com embed later. |
| 3 | Are consultations paid at booking? | **Unresolved** | No payment at booking. Business context implies a paid consultation, but no payment provider was specified. |
| 4 | Target jurisdiction for privacy copy (GDPR/UK GDPR/CCPA)? | **Unresolved** | Draft to GDPR + UK GDPR, since the audience is US persons resident in EU/UK countries. |
