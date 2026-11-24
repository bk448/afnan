/**
 * Content model.
 *
 * Slugs are string-literal unions, so a bad cross-reference is a COMPILE ERROR,
 * not a runtime 404. This is the mechanism that keeps the site's internal link
 * graph intact as content grows.
 */

/* -------------------------------------------------------------------------- */
/* Slugs                                                                       */
/* -------------------------------------------------------------------------- */

export type DivisionSlug =
  | 'individuals-families'
  | 'business'
  | 'catch-up'
  | 'relocation'
  | 'green-card-holders'
  | 'private-client'

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
  | 'irs-representation'

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
  | '8854'

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
  | 'singapore'

/* -------------------------------------------------------------------------- */
/* Grouping — drives mega-menu columns and index-page sections                  */
/* -------------------------------------------------------------------------- */

export type ServiceGroup =
  | 'Annual Compliance'
  | 'Catch-Up & Amnesty'
  | 'Avoiding Double Taxation'
  | 'Foreign Income & Assets'
  | 'Business & Entities'
  | 'Family, Trusts & Estates'
  | 'Life Changes & Advisory'

export type FormGroup =
  | 'Core Return & Filing'
  | 'Foreign Income & Credits'
  | 'Foreign Accounts & Assets'
  | 'Foreign Entities'
  | 'Trusts, Gifts & Estates'
  | 'Compliance Programs & Expatriation'

/* -------------------------------------------------------------------------- */
/* Shared pieces                                                               */
/* -------------------------------------------------------------------------- */

/** All generated copy ships as 'draft' until a tax professional signs it off. */
export type ReviewStatus = 'draft' | 'reviewed'

export interface Faq {
  q: string
  a: string
}

export interface DetailBlock {
  heading: string
  body: string
}

interface BaseContent {
  title: string
  seoTitle: string
  seoDescription: string
  summary: string
  reviewStatus: ReviewStatus
}

/* -------------------------------------------------------------------------- */
/* Collections                                                                 */
/* -------------------------------------------------------------------------- */

export interface Division extends BaseContent {
  slug: DivisionSlug
  /** Recognition checklist — the visitor should see themselves here. */
  isThisYou: string[]
  overview: string
  /** Persona-specific calming message. Reassurance before salesmanship. */
  reassurance: string
  relatedServices: ServiceSlug[]
  relatedForms?: FormSlug[]
}

export interface Service extends BaseContent {
  slug: ServiceSlug
  group: ServiceGroup
  whoItIsFor: string[]
  /** One line: what happens if this is ignored. Qualitative, never a figure. */
  theRisk: string
  howWeHelp: string
  overview: string
  details: DetailBlock[]
  relatedDivisions: DivisionSlug[]
  relatedForms: FormSlug[]
  relatedServices: ServiceSlug[]
  faqs: Faq[]
  /** Amnesty pages must carry the disclaimer component. */
  requiresDisclaimer?: boolean
}

export interface TaxForm extends BaseContent {
  slug: FormSlug
  /** Rendered in mono — form numbers are typographic objects. */
  formNumber: string
  officialName: string
  group: FormGroup
  whoFilesIt: string
  whatItReports: string
  /** Generic framing only, e.g. "with your federal return". Never a date. */
  whenDue: string
  /** Qualitative only, e.g. "significant automatic penalties". Never a sum. */
  penaltyRisk: string
  overview: string
  details: DetailBlock[]
  /** At least one — a form page with no onward service link is a dead end. */
  relatedServices: ServiceSlug[]
  relatedForms?: FormSlug[]
}

export interface Country extends BaseContent {
  slug: CountrySlug
  countryName: string
  treaty: string
  pensions: string
  deadlines: string
  pficTraps: string
  localNotes?: DetailBlock[]
  relatedServices: ServiceSlug[]
}
