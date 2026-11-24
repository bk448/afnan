# Sitemap Inventory — Source of Truth

**Project:** US Expat Tax website (Jungle Tax)
**Date:** 2026-11-24
**Total routes:** 91

This table is authoritative. Every route here must have content, a unique title and
description, an entry in `sitemap.xml`, and be reachable from navigation. The
`Template` column maps each URL to the component that renders it — note how 75 of the
91 routes are served by just four data-driven templates.

## Legend

- **Type** — `index` (section landing), `detail` (data-driven leaf), `static` (bespoke page)
- **Template** — the React component that renders the route
- **Priority / Freq** — sitemap.xml `<priority>` and `<changefreq>` hints

---

## Top level

| URL | Title | Type | Template | Priority | Freq |
|---|---|---|---|---|---|
| `/` | Home | static | `HomePage` | 1.0 | weekly |
| `/about/` | About Us | static | `AboutPage` | 0.6 | monthly |

## Divisions — browse by *who you are* (7 routes)

| URL | Title | Type | Template | Priority | Freq |
|---|---|---|---|---|---|
| `/divisions/` | Divisions | index | `DivisionsIndexPage` | 0.7 | monthly |
| `/divisions/individuals-families/` | Individuals & Families | detail | `DivisionDetailPage` | 0.7 | monthly |
| `/divisions/business/` | Business Owners & Entrepreneurs | detail | `DivisionDetailPage` | 0.7 | monthly |
| `/divisions/catch-up/` | Accidental Americans & Catch-Up Filers | detail | `DivisionDetailPage` | 0.8 | monthly |
| `/divisions/relocation/` | Moving Abroad & Returning to the US | detail | `DivisionDetailPage` | 0.7 | monthly |
| `/divisions/green-card-holders/` | Green Card Holders Abroad | detail | `DivisionDetailPage` | 0.7 | monthly |
| `/divisions/private-client/` | High-Net-Worth, Trusts & Estates | detail | `DivisionDetailPage` | 0.7 | monthly |

## Services — browse by *what you need* (24 routes)

Group headings become mega-menu columns. `Group` drives navigation layout only.

| URL | Title | Group | Template | Priority | Freq |
|---|---|---|---|---|---|
| `/services/` | Services | — (index) | `ServicesIndexPage` | 0.8 | monthly |
| `/services/expat-tax-returns/` | US Expat Tax Return Preparation | Annual Compliance | `ServiceDetailPage` | 0.9 | monthly |
| `/services/fbar/` | FBAR Filing | Annual Compliance | `ServiceDetailPage` | 0.9 | monthly |
| `/services/fatca/` | FATCA Reporting | Annual Compliance | `ServiceDetailPage` | 0.8 | monthly |
| `/services/state-tax/` | State Tax & Residency Exit | Annual Compliance | `ServiceDetailPage` | 0.7 | monthly |
| `/services/streamlined-filing/` | Streamlined Filing (SFOP / SDOP) | Catch-Up & Amnesty | `ServiceDetailPage` | 0.9 | monthly |
| `/services/delinquent-submissions/` | Delinquent FBAR & Information Returns | Catch-Up & Amnesty | `ServiceDetailPage` | 0.8 | monthly |
| `/services/amended-returns/` | Prior-Year & Amended Returns | Catch-Up & Amnesty | `ServiceDetailPage` | 0.7 | monthly |
| `/services/feie-ftc/` | FEIE & Foreign Tax Credit | Avoiding Double Taxation | `ServiceDetailPage` | 0.9 | monthly |
| `/services/tax-treaties/` | Tax Treaty Analysis | Avoiding Double Taxation | `ServiceDetailPage` | 0.7 | monthly |
| `/services/totalization/` | Self-Employment Tax & Totalization | Avoiding Double Taxation | `ServiceDetailPage` | 0.7 | monthly |
| `/services/foreign-pensions/` | Foreign Pensions & Retirement Accounts | Foreign Income & Assets | `ServiceDetailPage` | 0.8 | monthly |
| `/services/pfic/` | PFIC Reporting (Foreign Funds) | Foreign Income & Assets | `ServiceDetailPage` | 0.8 | monthly |
| `/services/foreign-property/` | Foreign Rental Property & Home Sales | Foreign Income & Assets | `ServiceDetailPage` | 0.7 | monthly |
| `/services/equity-compensation/` | Equity Compensation (RSUs, Options) | Foreign Income & Assets | `ServiceDetailPage` | 0.7 | monthly |
| `/services/foreign-entities/` | Foreign Company Reporting (5471/8865/8858) | Business & Entities | `ServiceDetailPage` | 0.8 | monthly |
| `/services/gilti/` | GILTI & Subpart F Planning | Business & Entities | `ServiceDetailPage` | 0.7 | monthly |
| `/services/non-us-spouse/` | Non-US Spouse & Family Filing | Family, Trusts & Estates | `ServiceDetailPage` | 0.7 | monthly |
| `/services/foreign-trusts-gifts/` | Foreign Trusts, Gifts & Inheritances | Family, Trusts & Estates | `ServiceDetailPage` | 0.7 | monthly |
| `/services/gift-estate-tax/` | US Gift & Estate Tax | Family, Trusts & Estates | `ServiceDetailPage` | 0.7 | monthly |
| `/services/relocation/` | Moving Abroad / Returning (Dual-Status) | Life Changes & Advisory | `ServiceDetailPage` | 0.7 | monthly |
| `/services/expatriation/` | Renunciation & Expatriation Tax | Life Changes & Advisory | `ServiceDetailPage` | 0.7 | monthly |
| `/services/tax-planning/` | Tax Planning & Consultations | Life Changes & Advisory | `ServiceDetailPage` | 0.7 | monthly |
| `/services/irs-representation/` | IRS Notices & Representation | Life Changes & Advisory | `ServiceDetailPage` | 0.7 | monthly |

## Forms — organic-traffic magnets (31 routes)

People search the form number, land here, and get routed to the selling service.

| URL | Title | Group | Template | Priority | Freq |
|---|---|---|---|---|---|
| `/forms/` | Forms | — (index) | `FormsIndexPage` | 0.7 | monthly |
| `/forms/1040/` | Form 1040 (Individual Return) | Core Return & Filing | `FormDetailPage` | 0.7 | yearly |
| `/forms/schedule-b/` | Schedule B (Foreign Accounts & Interest) | Core Return & Filing | `FormDetailPage` | 0.6 | yearly |
| `/forms/schedule-c-se/` | Schedule C & SE (Self-Employment) | Core Return & Filing | `FormDetailPage` | 0.6 | yearly |
| `/forms/schedule-e/` | Schedule E (Rental Income) | Core Return & Filing | `FormDetailPage` | 0.6 | yearly |
| `/forms/1040-x/` | Form 1040-X (Amended Return) | Core Return & Filing | `FormDetailPage` | 0.6 | yearly |
| `/forms/1040-nr/` | Form 1040-NR (Dual-Status Statement) | Core Return & Filing | `FormDetailPage` | 0.6 | yearly |
| `/forms/1040-es/` | Form 1040-ES (Estimated Tax) | Core Return & Filing | `FormDetailPage` | 0.6 | yearly |
| `/forms/4868/` | Form 4868 (Extension) | Core Return & Filing | `FormDetailPage` | 0.6 | yearly |
| `/forms/2350/` | Form 2350 (Extension to Qualify for FEIE) | Core Return & Filing | `FormDetailPage` | 0.6 | yearly |
| `/forms/2555/` | Form 2555 (FEIE) | Foreign Income & Credits | `FormDetailPage` | 0.7 | yearly |
| `/forms/1116/` | Form 1116 (Foreign Tax Credit) | Foreign Income & Credits | `FormDetailPage` | 0.7 | yearly |
| `/forms/8833/` | Form 8833 (Treaty Position) | Foreign Income & Credits | `FormDetailPage` | 0.6 | yearly |
| `/forms/schedule-8812/` | Schedule 8812 (Child Tax Credit) | Foreign Income & Credits | `FormDetailPage` | 0.6 | yearly |
| `/forms/8960/` | Form 8960 (Net Investment Income Tax) | Foreign Income & Credits | `FormDetailPage` | 0.6 | yearly |
| `/forms/8606/` | Form 8606 (IRA / Roth Basis) | Foreign Income & Credits | `FormDetailPage` | 0.6 | yearly |
| `/forms/fbar/` | FinCEN 114 (FBAR) | Foreign Accounts & Assets | `FormDetailPage` | 0.8 | yearly |
| `/forms/8938/` | Form 8938 (FATCA) | Foreign Accounts & Assets | `FormDetailPage` | 0.8 | yearly |
| `/forms/8621/` | Form 8621 (PFIC) | Foreign Accounts & Assets | `FormDetailPage` | 0.7 | yearly |
| `/forms/5471/` | Form 5471 (Foreign Corporation) | Foreign Entities | `FormDetailPage` | 0.7 | yearly |
| `/forms/8865/` | Form 8865 (Foreign Partnership) | Foreign Entities | `FormDetailPage` | 0.6 | yearly |
| `/forms/8858/` | Form 8858 (Foreign Disregarded Entity) | Foreign Entities | `FormDetailPage` | 0.6 | yearly |
| `/forms/8992/` | Form 8992 (GILTI) | Foreign Entities | `FormDetailPage` | 0.6 | yearly |
| `/forms/926/` | Form 926 (Transfer to Foreign Corporation) | Foreign Entities | `FormDetailPage` | 0.6 | yearly |
| `/forms/3520/` | Form 3520 (Foreign Trusts & Gifts) | Trusts, Gifts & Estates | `FormDetailPage` | 0.7 | yearly |
| `/forms/3520-a/` | Form 3520-A (Foreign Trust Annual Return) | Trusts, Gifts & Estates | `FormDetailPage` | 0.6 | yearly |
| `/forms/709/` | Form 709 (Gift Tax) | Trusts, Gifts & Estates | `FormDetailPage` | 0.6 | yearly |
| `/forms/706/` | Form 706 (Estate Tax) | Trusts, Gifts & Estates | `FormDetailPage` | 0.6 | yearly |
| `/forms/14653/` | Form 14653 (Streamlined Foreign Certification) | Compliance Programs | `FormDetailPage` | 0.6 | yearly |
| `/forms/14654/` | Form 14654 (Streamlined Domestic Certification) | Compliance Programs | `FormDetailPage` | 0.6 | yearly |
| `/forms/8854/` | Form 8854 (Expatriation) | Compliance Programs | `FormDetailPage` | 0.6 | yearly |

## Countries — browse by *where you live* (17 routes)

One shared template. `uk` is the highest-value page for a UK-based firm.

| URL | Title | Template | Priority | Freq |
|---|---|---|---|---|
| `/countries/` | Countries | `CountriesIndexPage` | 0.7 | monthly |
| `/countries/canada/` | US Taxes in Canada | `CountryDetailPage` | 0.8 | monthly |
| `/countries/mexico/` | US Taxes in Mexico | `CountryDetailPage` | 0.7 | monthly |
| `/countries/uk/` | US Taxes in the UK | `CountryDetailPage` | 0.9 | monthly |
| `/countries/germany/` | US Taxes in Germany | `CountryDetailPage` | 0.8 | monthly |
| `/countries/france/` | US Taxes in France | `CountryDetailPage` | 0.8 | monthly |
| `/countries/australia/` | US Taxes in Australia | `CountryDetailPage` | 0.8 | monthly |
| `/countries/israel/` | US Taxes in Israel | `CountryDetailPage` | 0.7 | monthly |
| `/countries/japan/` | US Taxes in Japan | `CountryDetailPage` | 0.7 | monthly |
| `/countries/spain/` | US Taxes in Spain | `CountryDetailPage` | 0.7 | monthly |
| `/countries/italy/` | US Taxes in Italy | `CountryDetailPage` | 0.7 | monthly |
| `/countries/netherlands/` | US Taxes in the Netherlands | `CountryDetailPage` | 0.7 | monthly |
| `/countries/switzerland/` | US Taxes in Switzerland | `CountryDetailPage` | 0.7 | monthly |
| `/countries/ireland/` | US Taxes in Ireland | `CountryDetailPage` | 0.7 | monthly |
| `/countries/portugal/` | US Taxes in Portugal | `CountryDetailPage` | 0.8 | monthly |
| `/countries/uae/` | US Taxes in the UAE | `CountryDetailPage` | 0.8 | monthly |
| `/countries/singapore/` | US Taxes in Singapore | `CountryDetailPage` | 0.7 | monthly |

## Contact & conversion (3 routes)

| URL | Title | Type | Template | Priority | Freq |
|---|---|---|---|---|---|
| `/contact/` | Contact Us | static | `ContactPage` | 0.8 | yearly |
| `/contact/book/` | Book a Consultation | static | `BookConsultationPage` | 1.0 | yearly |
| `/contact/quote/` | Request a Quote | static | `RequestQuotePage` | 0.9 | yearly |

## Footer / utility (7 routes)

| URL | Title | Type | Template | Priority | Freq |
|---|---|---|---|---|---|
| `/pricing/` | Pricing | static | `PricingPage` | 0.8 | monthly |
| `/faqs/` | FAQs | static | `FaqsPage` | 0.7 | monthly |
| `/resources/` | Blog / Resources | static | `ResourcesPage` | 0.6 | weekly |
| `/resources/deadlines/` | Expat Tax Deadlines Calendar | static | `DeadlinesPage` | 0.7 | monthly |
| `/privacy/` | Privacy Policy | static | `PrivacyPage` | 0.3 | yearly |
| `/terms/` | Terms of Engagement | static | `TermsPage` | 0.3 | yearly |
| `/cookies/` | Cookie Policy | static | `CookiesPage` | 0.3 | yearly |

> **Client Portal** is an external link (client login system), not a route we build.
> It appears in the footer as an outbound link only.

---

## Count reconciliation

| Section | Index | Leaves | Subtotal |
|---|---|---|---|
| Top level (Home, About) | — | — | 2 |
| Divisions | 1 | 6 | 7 |
| Services | 1 | 23 | 24 |
| Forms | 1 | 30 | 31 |
| Countries | 1 | 16 | 17 |
| Contact | 1 | 2 | 3 |
| Utility | — | 7 | 7 |
| **Total** | | | **91** |

## Template economics

| Template | Routes served |
|---|---|
| `ServiceDetailPage` | 23 |
| `FormDetailPage` | 30 |
| `CountryDetailPage` | 16 |
| `DivisionDetailPage` | 6 |
| **Four templates** | **75 of 91 routes** |

The remaining 16 routes are index pages (5) and bespoke static pages (11). This is the
central architectural fact of the project: **adding a page means adding a data row, not
a component.**
