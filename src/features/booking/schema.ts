import { z } from 'zod'
import type { CountrySlug, DivisionSlug, ServiceSlug } from '@/types/content'

/** Visitor self-descriptions, not division labels. Overlap is the norm. */
export const SITUATIONS = [
  { id: 'behind', label: 'I am behind on US tax filing', division: 'catch-up' },
  { id: 'never-filed', label: 'I did not know I had to file at all', division: 'catch-up' },
  { id: 'routine', label: 'I file each year and want it handled properly', division: 'individuals-families' },
  { id: 'business', label: 'I own or run a business outside the US', division: 'business' },
  { id: 'moving', label: 'I am moving abroad or returning to the US', division: 'relocation' },
  { id: 'green-card', label: 'I hold a green card but live abroad', division: 'green-card-holders' },
  { id: 'private', label: 'I have trusts, an inheritance or substantial assets', division: 'private-client' },
  { id: 'unsure', label: 'I am not sure which of these fits', division: 'individuals-families' },
] as const satisfies readonly { id: string; label: string; division: DivisionSlug }[]

export type SituationId = (typeof SITUATIONS)[number]['id']

/** Step 3 is only appropriate for some situations. A private client must never
 *  be asked how many years they failed to file. */
export const SITUATIONS_WITH_COMPLIANCE_STEP: SituationId[] = [
  'behind',
  'never-filed',
  'business',
  'green-card',
  'unsure',
]

export const bookingSchema = z.object({
  situations: z.array(z.string()).min(1, 'Select at least one option so we can prepare properly'),
  country: z.string().min(1, 'Select where you currently live'),
  yearsBehind: z.string().optional(),
  ownsBusiness: z.boolean().optional(),
  foreignAccounts: z.boolean().optional(),
  foreignPension: z.boolean().optional(),
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email address'),
  preferredTime: z.string().optional(),
  notes: z.string().max(2000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm before submitting' }),
  }),
})

export type BookingValues = z.infer<typeof bookingSchema>

/** Suggests likely-relevant services. Informational only — never an eligibility verdict. */
export function suggestServices(values: Partial<BookingValues>): ServiceSlug[] {
  const out = new Set<ServiceSlug>()
  const s = values.situations ?? []

  if (s.includes('behind') || s.includes('never-filed')) {
    out.add('streamlined-filing')
    out.add('delinquent-submissions')
  }
  if (s.includes('routine') || s.includes('unsure')) out.add('expat-tax-returns')
  if (s.includes('business')) {
    out.add('foreign-entities')
    out.add('gilti')
  }
  if (s.includes('moving')) {
    out.add('relocation')
    out.add('state-tax')
  }
  if (s.includes('green-card')) out.add('expatriation')
  if (s.includes('private')) {
    out.add('foreign-trusts-gifts')
    out.add('gift-estate-tax')
  }
  if (values.foreignAccounts) {
    out.add('fbar')
    out.add('fatca')
  }
  if (values.foreignPension) out.add('foreign-pensions')

  if (out.size === 0) out.add('expat-tax-returns')
  return [...out].slice(0, 6)
}

export const COUNTRY_OPTIONS: { value: CountrySlug | 'other'; label: string }[] = [
  { value: 'uk', label: 'United Kingdom' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'germany', label: 'Germany' },
  { value: 'france', label: 'France' },
  { value: 'spain', label: 'Spain' },
  { value: 'italy', label: 'Italy' },
  { value: 'portugal', label: 'Portugal' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'switzerland', label: 'Switzerland' },
  { value: 'israel', label: 'Israel' },
  { value: 'japan', label: 'Japan' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'uae', label: 'United Arab Emirates' },
  { value: 'mexico', label: 'Mexico' },
  { value: 'other', label: 'Somewhere else' },
]
