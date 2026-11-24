# Content Model

**Date:** 2026-11-24

This is the schema behind 75 of 91 routes. It becomes `src/types/content.ts` plus the four
`src/content/*.ts` data files in phase 3.3. Field shapes come from
`docs/01-analysis/content-requirements.md`; relations come from
`docs/01-analysis/crosslink-matrix.json`. Nothing here is re-derived.

---

## 1. Slug unions

These exist for one reason: a bad cross-reference must be a **compile error**, not a 404.

```ts
export type ServiceSlug =
  | 'expat-tax-returns'
  | 'fbar'
  | 'fatca'
  | 'state-tax'
  | 'streamlined-filing'
  | 'delinquent-submissions'
  | 'amended-returns'
  | 'feie-ftc'
  | 'tax-treaties'
  | 'totalization'
  | 'foreign-pensions'
  | 'pfic'
  | 'foreign-property'
  | 'equity-compensation'
  | 'foreign-entities'
  | 'gilti'
  | 'non-us-spouse'
  | 'foreign-trusts-gifts'
  | 'gift-estate-tax'
  | 'relocation'
  | 'expatriation'
  | 'tax-planning'
  | 'irs-representation'; // 23

export type FormSlug =
  | '1040'
  | 'schedule-b'
  | 'schedule-c-se'
  | 'schedule-e'
  | '1040-x'
  | '1040-nr'
  | '1040-es'
  | '4868'
  | '2350'
  | '2555'
  | '1116'
  | '8833'
  | 'schedule-8812'
  | '8960'
  | '8606'
  | 'fbar'
  | '8938'
  | '8621'
  | '5471'
  | '8865'
  | '8858'
  | '8992'
  | '926'
  | '3520'
  | '3520-a'
  | '709'
  | '706'
  | '14653'
  | '14654'
  | '8854'; // 30

export type CountrySlug =
  | 'canada'
  | 'mexico'
  | 'uk'
  | 'germany'
  | 'france'
  | 'australia'
  | 'israel'
  | 'japan'
  | 'spain'
  | 'italy'
  | 'netherlands'
  | 'switzerland'
  | 'ireland'
  | 'portugal'
  | 'uae'
  | 'singapore'; // 16

export type DivisionSlug =
  | 'individuals-families'
  | 'business'
  | 'catch-up'
  | 'relocation'
  | 'green-card-holders'
  | 'private-client'; // 6
```

**Known limit of the unions.** `'fbar'` is in both `ServiceSlug` and `FormSlug`;
`'relocation'` is in both `ServiceSlug` and `DivisionSlug`. For those two literals only,
assigning to the wrong field still type-checks. The integrity test closes the gap.

---

## 2. Supporting types

```ts
export type ReviewStatus = 'draft' | 'reviewed';

export type ChangeFreq = 'weekly' | 'monthly' | 'yearly';

export interface Faq {
  q: string;
  a: string;
}

/** Service "At a glance" panel: three fixed slots, rendered above the body. */
export interface AtAGlance {
  whoItIsFor: string[];
  theRisk: string;
  howWeHelp: string;
}

/** Form "Quick facts" panel. Four labelled facts, not a bullet list. */
export interface QuickFacts {
  whoFilesIt: string;
  whatItReports: string;
  /** Generic framing only: "with your federal return". Never a date. */
  whenDue: string;
  /** Qualitative only. Never a sum. */
  penaltyRisk: string;
}

/** Repeatable body content. Discriminated on `kind`. */
export type ContentBlock =
  | { kind: 'prose'; heading: string; body: string }
  | { kind: 'list'; heading: string; items: string[] }
  | { kind: 'steps'; heading: string; steps: string[] }
  | { kind: 'callout'; tone: 'note' | 'alert'; body: string };

export interface SeoMeta {
  /** <= 60 chars. */
  title: string;
  /** <= 155 chars, unique site-wide. */
  description: string;
  /** Collection default unless overridden (e.g. /countries/uk/ at 0.9). */
  priority?: number;
  changeFreq?: ChangeFreq;
}
```

Simplified from `content-requirements.md`: `seoTitle` / `seoDescription` are nested in
`SeoMeta` rather than sitting flat on every entry, and `canonical` is derived from section
+ slug (always trailing-slashed) rather than authored 75 times.

---

## 3. ContentBase

```ts
export interface ContentBase {
  slug: string;
  /** <h1> and the base for <title>. */
  title: string;
  /** One sentence, plain language. Used in cards, meta and rails. */
  summary: string;
  seo: SeoMeta;
  /** 2-3 paragraphs, markdown-lite. */
  overview: string;
  details?: ContentBlock[];
  faqs?: Faq[];
  reviewStatus: ReviewStatus;
}
```

---

## 4. The four entry types

```ts
export type ServiceGroup =
  | 'Annual Compliance'
  | 'Catch-Up & Amnesty'
  | 'Avoiding Double Taxation'
  | 'Foreign Income & Assets'
  | 'Business & Entities'
  | 'Family, Trusts & Estates'
  | 'Life Changes & Advisory';

export type FormGroup =
  | 'Core Return & Filing'
  | 'Foreign Income & Credits'
  | 'Foreign Accounts & Assets'
  | 'Foreign Entities'
  | 'Trusts, Gifts & Estates'
  | 'Compliance Programs';

export interface ServiceContent extends ContentBase {
  slug: ServiceSlug;
  group: ServiceGroup;
  atAGlance: AtAGlance;
  /** Expanded "Who this is for" prose, below the panel. */
  whoThisIsFor?: string;
  relatedDivisions: DivisionSlug[];
  relatedForms: FormSlug[];
  relatedServices: ServiceSlug[];
  /** Sparse by design: most services are citizenship-based, not country-specific. */
  relatedCountries?: CountrySlug[];
  /** Amnesty pages only. Absent means false. */
  requiresDisclaimer?: boolean;
}

export interface FormContent extends ContentBase {
  slug: FormSlug;
  /** Rendered mono: "8938", "3520-A", "Schedule B". */
  formNumber: string;
  officialName: string;
  group: FormGroup;
  quickFacts: QuickFacts;
  /** >= 1 enforced by test. A form with no onward service link is a dead end. */
  relatedServices: ServiceSlug[];
  relatedForms?: FormSlug[];
}

export interface CountryContent extends ContentBase {
  slug: CountrySlug;
  /** Display form with article: "the UK", "Germany". */
  countryName: string;
  flagRegion: string;
  /** Whether a treaty exists and what it bears on. Never a rate. */
  treaty: string;
  pensions: string;
  /** Local-vs-US framing only. Never a date; `/resources/deadlines/` owns the calendar. */
  deadlines: string;
  pficTraps: string;
  localNotes?: ContentBlock[];
  relatedServices: ServiceSlug[];
}

export interface DivisionContent extends ContentBase {
  slug: DivisionSlug;
  /** Recognition checklist. The visitor should see themselves. */
  isThisYou: string[];
  reassurance: string;
  /** >= 1 enforced by test. Listing services is the page's whole job. */
  relatedServices: ServiceSlug[];
  relatedForms?: FormSlug[];
}
```

---

## 5. Collections

```ts
/** Every slug present, and each entry's own slug equal to its key. */
type EntryMap<S extends string, T extends { slug: S }> = {
  [K in S]: T & { slug: K };
};

export type ServiceCollection = EntryMap<ServiceSlug, ServiceContent>;
export type FormCollection = EntryMap<FormSlug, FormContent>;
export type CountryCollection = EntryMap<CountrySlug, CountryContent>;
export type DivisionCollection = EntryMap<DivisionSlug, DivisionContent>;
```

Each data file is declared `export const services: ServiceCollection = { ... }`. A missing
entry, an unknown key, and a key that disagrees with its own `slug` are all compile errors.

---

## 6. Required vs optional

| Type | Required | Optional, and why |
| --- | --- | --- |
| all | `slug` `title` `summary` `seo` `overview` `reviewStatus` | `details` — short entries need no body blocks. `faqs` — only pages with real questions should emit `FAQPage` JSON-LD; an empty array would ship empty markup. `seo.priority` / `seo.changeFreq` — collection defaults, overridden per route. |
| Service | `group` `atAGlance` `relatedDivisions` `relatedForms` `relatedServices` | `whoThisIsFor` — the panel already covers it for simple services. `relatedCountries` — sparse by design; 8 countries are referenced by no service. `requiresDisclaimer` — true on 2 of 23; absent means false rather than 21 `false` literals. |
| Form | `formNumber` `officialName` `group` `quickFacts` `relatedServices` | `relatedForms` — many forms have no sibling; `3520` ↔ `3520-A` do. |
| Country | `countryName` `flagRegion` `treaty` `pensions` `deadlines` `pficTraps` `relatedServices` | `localNotes` — per-country extras (fideicomiso, super, RESP) that most countries lack. |
| Division | `isThisYou` `reassurance` `relatedServices` | `relatedForms` — a division leads with services; forms are secondary. |

The four `pficTraps` / `treaty` / `pensions` / `deadlines` fields stay required even where
thin: a country page silently missing its treaty section is worse than a short one.

---

## 7. Reciprocity

Service↔form linking is bidirectional and enforced. As a testable assertion, the
service→form edge set must equal the transpose of the form→service edge set:

```ts
// src/content/__tests__/integrity.test.ts
// serviceSlugs etc. are Object.keys(collection), typed as the slug union.
for (const s of serviceSlugs)
  for (const f of services[s].relatedForms)
    expect(forms[f].relatedServices).toContain(s);

for (const f of formSlugs)
  for (const s of forms[f].relatedServices)
    expect(services[s].relatedForms).toContain(f);

for (const f of formSlugs) expect(forms[f].relatedServices.length).toBeGreaterThan(0);
for (const d of divisionSlugs) expect(divisions[d].relatedServices.length).toBeGreaterThan(0);

// requiresDisclaimer is optional, so omitting it on an amnesty page compiles clean.
for (const s of ['streamlined-filing', 'delinquent-submissions'] as const)
  expect(services[s].requiresDisclaimer).toBe(true);
```

Both loops are needed — one alone proves containment, not equality. Also asserted: no
duplicate slugs within a relation array, and no entry lists itself **in its own
collection** (`relatedServices` on a service, `relatedForms` on a form). That scoping is
load-bearing. An unscoped string check fails on three correct links, because of §1's
collisions: `services.fbar.relatedForms` holds `'fbar'` (the FinCEN 114 page),
`forms.fbar.relatedServices` holds `'fbar'` (the service), and
`services.relocation.relatedDivisions` holds `'relocation'` (the division).

**Not asserted, deliberately.** Service→service and form→form need not be symmetric.
Division→service and country→service are one-directional: `relatedCountries` is sparse on
purpose, and a test demanding symmetry there would force 16-item country rails onto
country-neutral services.

---

## 8. Figure tokens

No unreviewed number ships. Where a figure is unavoidable, copy carries a token, never a
digit.

**Shape:** `{{FIGURE:kebab-case-id}}` — e.g. `{{FIGURE:pfic-filing-threshold}}`.
Match with `/\{\{FIGURE:[a-z0-9-]+\}\}/g`.

**Registry:** `src/content/figures.ts`, keyed by id, each with `label` (the generic phrase
rendered while unapproved, e.g. "the annual exclusion amount"), `value: string | null`,
`source`, `approvedBy: string | null`, `approvedOn: string | null`.

**Gates.** Unit test: every token in `src/content/` resolves to a registry entry, and no
raw currency or percent literal appears in any content string. Build: fails if an entry
with `reviewStatus: 'reviewed'` contains a token whose `approvedBy` is null. Runtime: an
unapproved token renders as its `label`, so a leak degrades to generic prose, never to a
wrong number.

**The one command:**

```bash
grep -rn "{{" src/content/
```

That lists every unreviewed fact on the site.

---

## 9. Worked example — `pfic` ↔ `8621`

Relations below are from `crosslink-matrix.json`. Service→service links are author-chosen;
the matrix does not define that axis. Copy is draft, figure-free, and not reviewed.

```ts
// src/content/services.ts — shown unwrapped. In the file this is the `pfic:` member
// of the one `export const services: ServiceCollection` literal from §5.
import type { ServiceCollection } from '@/types/content';

const pfic: ServiceCollection['pfic'] = {
  slug: 'pfic',
  title: 'PFIC Reporting (Foreign Funds)',
  summary:
    'If you hold a non-US fund, ETF or investment trust, US rules may treat it as a PFIC and tax it far more harshly than an equivalent US fund.',
  seo: {
    title: 'PFIC Reporting for US Expats | Jungle Tax',
    description:
      'Non-US funds, ETFs and investment trusts can be PFICs for US tax purposes. We identify holdings, model the elections and prepare Form 8621.',
    priority: 0.8,
  },
  group: 'Foreign Income & Assets',
  atAGlance: {
    whoItIsFor: [
      'You hold funds, ETFs or investment trusts bought outside the US',
      'Your local adviser or bank built you a portfolio of local funds',
      'You have an ISA, TFSA, NISA or similar wrapper holding pooled funds',
    ],
    theRisk:
      'Left unreported, a PFIC falls into the default regime, which is designed to remove the benefit of deferral and adds an interest charge on top.',
    howWeHelp:
      'We identify which holdings are PFICs, model the available elections against the default treatment, and prepare the returns.',
  },
  overview:
    'A PFIC is a non-US pooled investment — most commonly a fund, ETF or investment trust. The rules were written to stop US investors deferring tax offshore, but they catch ordinary savers abroad who simply bought the funds their local bank offered.\n\nThe consequence is that a holding which looks unremarkable where you live can be taxed on an unfavourable basis for US purposes, with reporting due per holding rather than per account. Two elections can improve the outcome, but both are time-sensitive and are made holding by holding.\n\nWe start by establishing which of your holdings are in scope — often fewer than people fear — then model the options before anything is filed.',
  whoThisIsFor:
    'Most people who need this did nothing unusual: they moved abroad, opened a local investment account, and were sold local funds. Discovering the PFIC rules afterwards is the normal sequence, not a sign that something has gone wrong.',
  details: [
    {
      kind: 'prose',
      heading: 'Why a local fund is treated differently',
      body: 'A US-domiciled fund and a local fund holding the same shares are taxed on different bases for US purposes. The distinction turns on where the fund is organised, not on what it holds or how well it performs.',
    },
    {
      kind: 'list',
      heading: 'What we need to assess a portfolio',
      items: [
        'A holdings statement for each non-US investment account',
        'Acquisition dates and cost for each holding, where available',
        'Any prior Form 8621 filings and elections already made',
      ],
    },
    {
      kind: 'callout',
      tone: 'note',
      body: 'Reporting can be required per holding, and is subject to {{FIGURE:pfic-filing-threshold}}. Whether that reaches your holdings depends on what you hold and any prior elections.',
    },
  ],
  faqs: [
    {
      q: 'Does an ISA or TFSA protect me?',
      a: 'The wrapper is a local tax shelter and is not recognised as one for US purposes. What matters is what sits inside it.',
    },
    {
      q: 'Should I just sell everything?',
      a: 'Not before the position is modelled. Disposals have their own consequences, and the better route is sometimes to elect rather than exit.',
    },
  ],
  relatedDivisions: ['individuals-families', 'private-client', 'catch-up'],
  relatedForms: ['8621', '8938', '8960'],
  relatedServices: ['foreign-pensions', 'fatca', 'expat-tax-returns'],
  relatedCountries: ['uk', 'canada', 'japan'],
  reviewStatus: 'draft',
};
```

```ts
// src/content/forms.ts — likewise a member of `export const forms: FormCollection`.
import type { FormCollection } from '@/types/content';

const form8621: FormCollection['8621'] = {
  slug: '8621',
  title: 'Form 8621 (PFIC)',
  formNumber: '8621',
  officialName:
    'Information Return by a Shareholder of a Passive Foreign Investment Company or Qualified Electing Fund',
  summary:
    'Form 8621 reports a holding in a non-US pooled investment fund, and is where the QEF and mark-to-market elections are made.',
  seo: {
    title: 'Form 8621 Explained | PFIC Reporting | Jungle Tax',
    description:
      'What Form 8621 is, who may need to file it, what it reports and why the elections on it matter. Plain-language guide for Americans abroad.',
    priority: 0.7,
    changeFreq: 'yearly',
  },
  group: 'Foreign Accounts & Assets',
  quickFacts: {
    whoFilesIt:
      'US persons holding shares in a non-US pooled investment fund may have a filing obligation. Whether you do turns on your holdings, their value and any elections already made.',
    whatItReports:
      'One holding per form: the fund, its income and distributions, and the election being made for it.',
    whenDue: 'With your federal return for the year concerned.',
    penaltyRisk:
      'Significant. Beyond the reporting exposure, an unfiled form can leave the return open to later examination and forfeits the election that would have improved the outcome.',
  },
  overview:
    'Form 8621 is the return used to report a PFIC — in practice, almost always a fund, ETF or investment trust bought outside the US. It is filed per holding, not per account, so one local investment account can generate several forms.\n\nIts real significance is the elections. The form is where you choose between the default regime and one of two alternatives, and the choice is made separately for each holding. A form filed late can mean the election is no longer available on the terms it would have been.\n\nIf you are not sure whether a holding is a PFIC, that is the normal starting point. The statement from your provider will rarely say so.',
  details: [
    {
      kind: 'prose',
      heading: 'One form per holding',
      body: 'A portfolio of local funds does not produce one Form 8621. It produces one per PFIC held, which is why a modest account can involve substantial reporting.',
    },
    {
      kind: 'prose',
      heading: 'The elections',
      body: 'Two elections exist as alternatives to the default treatment. Each is made per holding, each has its own information requirements, and whether either is available depends on what the fund reports.',
    },
    {
      kind: 'callout',
      tone: 'alert',
      body: 'A value threshold and a de minimis exception both bear on whether a holding has to be reported. Both change, and neither is something this page can settle for your facts.',
    },
  ],
  relatedServices: ['pfic', 'fatca', 'foreign-trusts-gifts'],
  relatedForms: ['8938', '8960'],
  reviewStatus: 'draft',
};
```

The link resolves both ways: `pfic.relatedForms` contains `'8621'`, and
`form8621.relatedServices` contains `'pfic'`. Both of the other services on
`form8621.relatedServices` — `fatca` and `foreign-trusts-gifts` — list `'8621'` in the
matrix, so §7's assertion passes in both directions.
