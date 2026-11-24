import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { BookingValues } from '@/features/booking/schema'

const h = vi.hoisted(() => ({
  insert: vi.fn<(row: unknown) => Promise<{ error: unknown }>>(),
  configured: { value: true },
  sdkLoadFails: { value: false },
}))

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: true,
  getSupabaseClient: async () => {
    if (h.sdkLoadFails.value) {
      throw new Error('Failed to fetch dynamically imported module')
    }
    return h.configured.value ? { from: () => ({ insert: h.insert }) } : null
  },
}))

const { submitBooking } = await import('@/features/booking/submitBooking')

/** Deliberately untidy input: padded, mixed-case, blank note. */
const base: BookingValues = {
  situations: ['behind'],
  country: 'uk',
  name: '  Dana Whitfield  ',
  email: '  Dana@Example.COM ',
  notes: '   ',
  foreignAccounts: true,
  consent: true,
}

function lastRow(): Record<string, unknown> {
  const call = h.insert.mock.calls.at(-1)
  return (call?.[0] ?? {}) as Record<string, unknown>
}

describe('submitBooking', () => {
  beforeEach(() => {
    h.insert.mockReset()
    h.insert.mockResolvedValue({ error: null })
    h.configured.value = true
    h.sdkLoadFails.value = false
  })

  it('normalises contact details before writing', async () => {
    const result = await submitBooking(base)

    expect(result.ok).toBe(true)
    expect(lastRow().name).toBe('Dana Whitfield')
    expect(lastRow().email).toBe('dana@example.com')
  })

  it('stores a whitespace-only note as null rather than blank text', async () => {
    await submitBooking(base)
    expect(lastRow().notes).toBeNull()
  })

  it('maps absent optional answers to null, never undefined', async () => {
    await submitBooking(base)
    const row = lastRow()

    expect(row.years_behind).toBeNull()
    expect(row.owns_business).toBeNull()
    expect(row.foreign_pension).toBeNull()
    expect(row.foreign_accounts).toBe(true)
  })

  it('records the suggested services so the firm can triage', async () => {
    await submitBooking(base)
    const suggested = lastRow().suggested_services as string[]

    expect(suggested).toContain('streamlined-filing')
    expect(suggested).toContain('fbar')
  })

  it('never asks for the row back, because anon holds INSERT only', async () => {
    await submitBooking(base)

    expect(h.insert).toHaveBeenCalledTimes(1)
    expect(lastRow()).not.toHaveProperty('id')
  })

  it('reports unconfigured when no credentials are present', async () => {
    h.configured.value = false
    const result = await submitBooking(base)

    expect(result).toEqual({ ok: false, reason: 'unconfigured' })
    expect(h.insert).not.toHaveBeenCalled()
  })

  it('reports rejected when row level security refuses the row', async () => {
    h.insert.mockResolvedValue({ error: { message: 'violates row-level security policy' } })
    const result = await submitBooking(base)

    expect(result).toEqual({ ok: false, reason: 'rejected' })
  })

  it('reports network when the insert throws', async () => {
    h.insert.mockRejectedValue(new Error('Failed to fetch'))
    const result = await submitBooking(base)

    expect(result).toEqual({ ok: false, reason: 'network' })
  })

  it('reports network when the lazily loaded SDK cannot be fetched', async () => {
    h.sdkLoadFails.value = true
    const result = await submitBooking(base)

    expect(result).toEqual({ ok: false, reason: 'network' })
    expect(h.insert).not.toHaveBeenCalled()
  })
})
