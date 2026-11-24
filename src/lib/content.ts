import { services } from '@/content/services'
import { forms } from '@/content/forms'
import { countries } from '@/content/countries'
import { divisions } from '@/content/divisions'
import type {
  Country,
  CountrySlug,
  Division,
  DivisionSlug,
  FormGroup,
  FormSlug,
  Service,
  ServiceGroup,
  ServiceSlug,
  TaxForm,
} from '@/types/content'

/* -------------------------------------------------------------------------- */
/* Accessors — the only read path into content                                 */
/* -------------------------------------------------------------------------- */

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug)

export const getForm = (slug: string): TaxForm | undefined => forms.find((f) => f.slug === slug)

export const getCountry = (slug: string): Country | undefined =>
  countries.find((c) => c.slug === slug)

export const getDivision = (slug: string): Division | undefined =>
  divisions.find((d) => d.slug === slug)

/* Resolve lists of slugs to entries, dropping anything unresolvable. */
export const resolveServices = (slugs: readonly ServiceSlug[]): Service[] =>
  slugs.map(getService).filter((s): s is Service => Boolean(s))

export const resolveForms = (slugs: readonly FormSlug[]): TaxForm[] =>
  slugs.map(getForm).filter((f): f is TaxForm => Boolean(f))

export const resolveDivisions = (slugs: readonly DivisionSlug[]): Division[] =>
  slugs.map(getDivision).filter((d): d is Division => Boolean(d))

export const resolveCountries = (slugs: readonly CountrySlug[]): Country[] =>
  slugs.map(getCountry).filter((c): c is Country => Boolean(c))

/* -------------------------------------------------------------------------- */
/* Grouping — drives mega-menu columns and index-page sections                 */
/* -------------------------------------------------------------------------- */

export const SERVICE_GROUP_ORDER: ServiceGroup[] = [
  'Annual Compliance',
  'Catch-Up & Amnesty',
  'Avoiding Double Taxation',
  'Foreign Income & Assets',
  'Business & Entities',
  'Family, Trusts & Estates',
  'Life Changes & Advisory',
]

export const FORM_GROUP_ORDER: FormGroup[] = [
  'Core Return & Filing',
  'Foreign Income & Credits',
  'Foreign Accounts & Assets',
  'Foreign Entities',
  'Trusts, Gifts & Estates',
  'Compliance Programs & Expatriation',
]

export const servicesByGroup = (): { group: ServiceGroup; items: Service[] }[] =>
  SERVICE_GROUP_ORDER.map((group) => ({
    group,
    items: services.filter((s) => s.group === group),
  })).filter((g) => g.items.length > 0)

export const formsByGroup = (): { group: FormGroup; items: TaxForm[] }[] =>
  FORM_GROUP_ORDER.map((group) => ({
    group,
    items: forms.filter((f) => f.group === group),
  })).filter((g) => g.items.length > 0)

export { services, forms, countries, divisions }
