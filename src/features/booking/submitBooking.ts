import { getSupabaseClient } from '@/lib/supabase'
import { suggestServices, type BookingValues } from './schema'

export type SubmitFailureReason = 'unconfigured' | 'rejected' | 'network'

export type SubmitResult = { ok: true } | { ok: false; reason: SubmitFailureReason }

/**
 * One visitor-facing message for every failure. The underlying cause is useful
 * to us and meaningless to a stressed expat, so it is never surfaced.
 */
export const SUBMIT_FAILURE_MESSAGE =
  'We could not send your request just now. Please try again, or email us directly and we will pick it up from there.'

/** Maps the form shape onto the booking_requests columns. */
function toRow(values: BookingValues) {
  return {
    situations: values.situations,
    country: values.country,
    years_behind: values.yearsBehind ?? null,
    owns_business: values.ownsBusiness ?? null,
    foreign_accounts: values.foreignAccounts ?? null,
    foreign_pension: values.foreignPension ?? null,
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    preferred_time: values.preferredTime ?? null,
    notes: values.notes?.trim() ? values.notes.trim() : null,
    consent: values.consent,
    suggested_services: suggestServices(values),
  }
}

/**
 * Writes one consultation request.
 *
 * Deliberately does not chain `.select()`: the anon role holds INSERT only, so
 * asking for the row back would be refused by row level security.
 */
export async function submitBooking(values: BookingValues): Promise<SubmitResult> {
  try {
    // Loading the SDK is itself a network fetch and can fail on a bad connection.
    const supabase = await getSupabaseClient()
    if (!supabase) return { ok: false, reason: 'unconfigured' }

    const { error } = await supabase.from('booking_requests').insert(toRow(values))
    if (error) return { ok: false, reason: 'rejected' }
    return { ok: true }
  } catch {
    return { ok: false, reason: 'network' }
  }
}
