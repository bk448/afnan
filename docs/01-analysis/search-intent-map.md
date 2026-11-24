# Search-Intent Map

**Date:** 2026-11-24

The site's traffic strategy rests on a split: some pages **earn the click** (high-volume,
specific searches) and others **earn the booking** (lower volume, high intent). Knowing
which is which decides where content effort and internal links are concentrated.

## The two page economies

| | Traffic magnets | Conversion pages |
|---|---|---|
| **Sections** | Forms, Countries | Services, Divisions |
| **Query style** | "what is form 8938", "us taxes in portugal" | "expat tax service", "streamlined filing help" |
| **Volume** | High, specific, informational | Lower, commercial |
| **Visitor intent** | Understand a thing | Hire someone |
| **Job of the page** | Explain, then route onward | Reassure, then convert |
| **Primary internal link** | → the selling service | → book a consultation |

The Forms and Countries sections exist largely to **capture informational search** and
funnel it into the commercial Services pages. This is why bidirectional Form↔Service
linking is a hard requirement, not a nicety — it is the mechanism that turns a search for
"form 8621" into a PFIC engagement.

---

## Services — commercial intent

| URL | Likely query | Intent | Target keyword |
|---|---|---|---|
| `/services/expat-tax-returns/` | "us expat tax return preparation" | commercial | expat tax return preparation |
| `/services/fbar/` | "fbar filing service", "do i need to file fbar" | mixed | FBAR filing |
| `/services/fatca/` | "fatca reporting", "what is fatca" | mixed | FATCA reporting |
| `/services/state-tax/` | "exit california residency tax" | commercial | state residency exit |
| `/services/streamlined-filing/` | "streamlined filing procedure help", "sfop" | high commercial | streamlined filing |
| `/services/delinquent-submissions/` | "delinquent fbar", "missed fbar what to do" | high commercial | delinquent FBAR submission |
| `/services/amended-returns/` | "amend prior year expat return" | commercial | amended expat return |
| `/services/feie-ftc/` | "feie vs foreign tax credit" | mixed | FEIE and foreign tax credit |
| `/services/tax-treaties/` | "us tax treaty analysis" | commercial | tax treaty analysis |
| `/services/totalization/` | "self employment totalization agreement" | commercial | totalization agreement |
| `/services/foreign-pensions/` | "us tax on foreign pension" | mixed | foreign pension US tax |
| `/services/pfic/` | "pfic reporting service", "foreign fund us tax" | high commercial | PFIC reporting |
| `/services/foreign-property/` | "us tax foreign rental property" | mixed | foreign rental property tax |
| `/services/equity-compensation/` | "rsu tax expat", "stock options abroad tax" | commercial | expat equity compensation |
| `/services/foreign-entities/` | "form 5471 help", "foreign company us reporting" | high commercial | foreign company reporting |
| `/services/gilti/` | "gilti planning", "gilti small business" | commercial | GILTI planning |
| `/services/non-us-spouse/` | "filing with non us spouse" | commercial | non-US spouse filing |
| `/services/foreign-trusts-gifts/` | "foreign inheritance us tax", "form 3520 help" | high commercial | foreign trust and gift reporting |
| `/services/gift-estate-tax/` | "us gift tax expat", "cross border estate tax" | commercial | US gift and estate tax |
| `/services/relocation/` | "dual status tax return help" | commercial | dual-status return |
| `/services/expatriation/` | "renounce us citizenship tax", "exit tax" | high commercial | expatriation tax |
| `/services/tax-planning/` | "expat tax planning consultation" | commercial | expat tax planning |
| `/services/irs-representation/` | "irs notice help expat" | high commercial | IRS representation |

## Forms — informational magnets, high volume

Every form is a "what is / how do I / do I need to file" query. These rank for people who
do not yet know they need a service. Each must route to its selling service.

| URL | Likely query | Routes to service |
|---|---|---|
| `/forms/1040/` | "form 1040 expat" | expat-tax-returns |
| `/forms/schedule-b/` | "schedule b foreign accounts" | expat-tax-returns |
| `/forms/schedule-c-se/` | "schedule c self employment abroad" | totalization |
| `/forms/schedule-e/` | "schedule e foreign rental" | foreign-property |
| `/forms/1040-x/` | "amend expat tax return" | amended-returns |
| `/forms/1040-nr/` | "dual status 1040nr" | relocation |
| `/forms/1040-es/` | "estimated tax expat" | expat-tax-returns |
| `/forms/4868/` | "tax extension expat" | expat-tax-returns |
| `/forms/2350/` | "form 2350 feie extension" | feie-ftc |
| `/forms/2555/` | "form 2555 feie", "foreign earned income exclusion form" | feie-ftc |
| `/forms/1116/` | "form 1116 foreign tax credit" | feie-ftc |
| `/forms/8833/` | "form 8833 treaty position" | tax-treaties |
| `/forms/schedule-8812/` | "child tax credit expat" | expat-tax-returns |
| `/forms/8960/` | "net investment income tax expat" | expat-tax-returns |
| `/forms/8606/` | "form 8606 ira basis" | expat-tax-returns |
| `/forms/fbar/` | "fincen 114", "fbar form", "report foreign bank account" | fbar |
| `/forms/8938/` | "form 8938", "do i need to file 8938" | fatca |
| `/forms/8621/` | "form 8621 pfic" | pfic |
| `/forms/5471/` | "form 5471", "foreign corporation reporting" | foreign-entities |
| `/forms/8865/` | "form 8865 foreign partnership" | foreign-entities |
| `/forms/8858/` | "form 8858 disregarded entity" | foreign-entities |
| `/forms/8992/` | "form 8992 gilti" | gilti |
| `/forms/926/` | "form 926 transfer foreign corporation" | foreign-entities |
| `/forms/3520/` | "form 3520 foreign gift", "foreign inheritance reporting" | foreign-trusts-gifts |
| `/forms/3520-a/` | "form 3520-a foreign trust" | foreign-trusts-gifts |
| `/forms/709/` | "form 709 gift tax" | gift-estate-tax |
| `/forms/706/` | "form 706 estate tax" | gift-estate-tax |
| `/forms/14653/` | "form 14653 streamlined certification" | streamlined-filing |
| `/forms/14654/` | "form 14654 streamlined domestic" | streamlined-filing |
| `/forms/8854/` | "form 8854 expatriation" | expatriation |

## Countries — geo-informational magnets

High-intent local searches. These rank for "us taxes in [country]" and signal genuine
specialism. For a UK-based firm, `uk` is the flagship.

| URL | Likely query | Local hook (per sitemap notes) |
|---|---|---|
| `/countries/uk/` | "us taxes living in uk", "us tax uk expat" | SIPP treatment, UK/US treaty, UK vs US deadlines |
| `/countries/canada/` | "us taxes in canada" | RRSP/TFSA treatment, treaty |
| `/countries/australia/` | "us taxes in australia" | superannuation treatment |
| `/countries/germany/` | "us taxes in germany" | treaty, pension pillars |
| `/countries/france/` | "us taxes in france" | treaty, social charges |
| `/countries/portugal/` | "us taxes in portugal" | NHR regime interaction |
| `/countries/uae/` | "us taxes in uae", "us tax dubai" | no local income tax → FEIE focus |
| `/countries/singapore/` | "us taxes in singapore" | territorial system interaction |
| *(remaining 8)* | "us taxes in [country]" | treaty + pension + deadlines + PFIC traps |

Every country page follows the shared template: treaty position · local pension treatment
· local vs US deadlines · common PFIC traps · book CTA.

## Divisions — persona-intent, mid-funnel

Divisions rank less for search and more for on-site navigation ("I'm a business owner —
which of your services apply to me?"). Lower SEO priority; higher internal-linking value.

## SEO structural rules (carried into Layer 2)

1. **No cannibalisation.** Divisions and Services overlap by design; they must target
   different intents (persona vs. need) and cross-link rather than compete for the same
   keyword. Each division canonicalises to itself and links *out* to services; it does
   not duplicate service copy.
2. **Bidirectional Form↔Service links** are the core SEO mechanism and are enforced in
   the content model as typed relations.
3. **Unique title + meta description per route.** Enforced by test.
4. **Trailing-slash canonical URLs**, matching the sitemap exactly.
5. **JSON-LD** per page type: `ProfessionalService` / `Organization` sitewide,
   `Service` on service pages, `FAQPage` where FAQs exist, `BreadcrumbList` everywhere.
