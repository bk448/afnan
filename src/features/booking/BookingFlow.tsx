import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'
import { resolveServices } from '@/lib/content'
import {
  COUNTRY_OPTIONS,
  SITUATIONS,
  SITUATIONS_WITH_COMPLIANCE_STEP,
  bookingSchema,
  suggestServices,
  type BookingValues,
  type SituationId,
} from './schema'
import { SUBMIT_FAILURE_MESSAGE, submitBooking } from './submitBooking'

type Errors = Partial<Record<keyof BookingValues, string>>

const STEP_LABELS = ['Your situation', 'Where you live', 'A few details', 'Contact']

export function BookingFlow() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [values, setValues] = useState<Partial<BookingValues>>({
    situations: [],
    consent: undefined,
  })

  const set = <K extends keyof BookingValues>(key: K, value: BookingValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  /** Step 3 is skipped for situations where those questions would be inappropriate. */
  const showComplianceStep = useMemo(() => {
    const s = (values.situations ?? []) as SituationId[]
    return s.some((id) => SITUATIONS_WITH_COMPLIANCE_STEP.includes(id))
  }, [values.situations])

  const steps = showComplianceStep ? [0, 1, 2, 3] : [0, 1, 3]
  const position = steps.indexOf(step)

  const goNext = () => {
    if (step === 0 && (values.situations ?? []).length === 0) {
      setErrors({ situations: 'Select at least one option so we can prepare properly' })
      return
    }
    if (step === 1 && !values.country) {
      setErrors({ country: 'Select where you currently live' })
      return
    }
    const next = steps[position + 1]
    if (next !== undefined) setStep(next)
  }

  const goBack = () => {
    const prev = steps[position - 1]
    if (prev !== undefined) setStep(prev)
  }

  const submit = async () => {
    const result = bookingSchema.safeParse(values)
    if (!result.success) {
      const next: Errors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof BookingValues
        if (!next[key]) next[key] = issue.message
      }
      setErrors(next)
      return
    }

    setSubmitError(null)
    setSubmitting(true)
    const outcome = await submitBooking(result.data)
    setSubmitting(false)

    // The answers stay on screen on failure, so nothing has to be retyped.
    if (!outcome.ok) {
      setSubmitError(SUBMIT_FAILURE_MESSAGE)
      return
    }
    setSubmitted(true)
  }

  if (submitted) return <Confirmation values={values} />

  return (
    <div className="mx-auto max-w-[42rem]">
      <ol className="mb-9 flex flex-wrap gap-x-6 gap-y-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li
            key={s}
            className={cn(
              'flex items-center gap-2 text-sm',
              i === position ? 'text-ink-800' : 'text-ink-400',
            )}
            aria-current={i === position ? 'step' : undefined}
          >
            <span
              className={cn(
                'flex size-5 items-center justify-center rounded-full border text-xs',
                i < position && 'border-accent bg-accent text-white',
                i === position && 'border-ink-800 text-ink-800',
                i > position && 'border-rule-strong',
              )}
            >
              {i < position ? <Check className="size-3" aria-hidden="true" /> : i + 1}
            </span>
            {STEP_LABELS[s]}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <Fieldset
          legend="Which of these sound like you?"
          hint="Select as many as apply. Overlap is normal."
          error={errors.situations}
        >
          <div className="space-y-2">
            {SITUATIONS.map((s) => {
              const checked = (values.situations ?? []).includes(s.id)
              return (
                <label
                  key={s.id}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-sm border p-3.5 transition-colors duration-150',
                    checked ? 'border-accent bg-accent-100/40' : 'border-rule hover:bg-surface',
                  )}
                >
                  <input
                    type="checkbox"
                    className="mt-1 accent-[var(--color-accent)]"
                    checked={checked}
                    onChange={(e) => {
                      const current = values.situations ?? []
                      set(
                        'situations',
                        e.target.checked
                          ? [...current, s.id]
                          : current.filter((x) => x !== s.id),
                      )
                    }}
                  />
                  <span className="text-[0.975rem] leading-snug text-ink-800">{s.label}</span>
                </label>
              )
            })}
          </div>
        </Fieldset>
      )}

      {step === 1 && (
        <Fieldset legend="Where do you currently live?" error={errors.country}>
          <select
            className="h-11 w-full rounded-sm border border-rule bg-paper px-3 text-ink-800"
            value={values.country ?? ''}
            onChange={(e) => set('country', e.target.value)}
          >
            <option value="">Select a country</option>
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Fieldset>
      )}

      {step === 2 && (
        <Fieldset
          legend="A few details"
          hint="Approximate answers are fine — this only helps us prepare."
        >
          <label className="block">
            <span className="mb-1.5 block text-sm text-ink-600">
              Roughly how many years are unfiled?
            </span>
            <select
              className="h-11 w-full rounded-sm border border-rule bg-paper px-3 text-ink-800"
              value={values.yearsBehind ?? ''}
              onChange={(e) => set('yearsBehind', e.target.value)}
            >
              <option value="">Prefer not to say</option>
              <option value="0">None — I am up to date</option>
              <option value="1-2">One or two</option>
              <option value="3-5">Three to five</option>
              <option value="6+">Six or more</option>
              <option value="never">I have never filed</option>
            </select>
          </label>

          <div className="mt-5 space-y-2.5">
            <Toggle
              label="I own or control a company outside the US"
              checked={values.ownsBusiness ?? false}
              onChange={(v) => set('ownsBusiness', v)}
            />
            <Toggle
              label="I hold bank or investment accounts outside the US"
              checked={values.foreignAccounts ?? false}
              onChange={(v) => set('foreignAccounts', v)}
            />
            <Toggle
              label="I have a pension or retirement account outside the US"
              checked={values.foreignPension ?? false}
              onChange={(v) => set('foreignPension', v)}
            />
          </div>
        </Fieldset>
      )}

      {step === 3 && (
        <Fieldset legend="How can we reach you?">
          <div className="space-y-4">
            <Field label="Your name" error={errors.name}>
              <input
                className="h-11 w-full rounded-sm border border-rule bg-paper px-3"
                value={values.name ?? ''}
                onChange={(e) => set('name', e.target.value)}
              />
            </Field>
            <Field label="Email address" error={errors.email}>
              <input
                type="email"
                className="h-11 w-full rounded-sm border border-rule bg-paper px-3"
                value={values.email ?? ''}
                onChange={(e) => set('email', e.target.value)}
              />
            </Field>
            <Field label="Preferred time to talk (optional)">
              <input
                className="h-11 w-full rounded-sm border border-rule bg-paper px-3"
                placeholder="e.g. weekday mornings, UK time"
                value={values.preferredTime ?? ''}
                onChange={(e) => set('preferredTime', e.target.value)}
              />
            </Field>
            <Field label="Anything else we should know? (optional)">
              <textarea
                rows={4}
                className="w-full rounded-sm border border-rule bg-paper p-3"
                value={values.notes ?? ''}
                onChange={(e) => set('notes', e.target.value)}
              />
            </Field>

            <div>
              <label className="flex items-start gap-3 text-sm text-ink-600">
                <input
                  type="checkbox"
                  className="mt-1 accent-[var(--color-accent)]"
                  checked={values.consent === true}
                  onChange={(e) => set('consent', e.target.checked as true)}
                />
                <span>
                  I understand that submitting this form does not create a client relationship and
                  that nothing here constitutes tax advice.
                </span>
              </label>
              {errors.consent && <p className="mt-1.5 text-sm text-alert">{errors.consent}</p>}
            </div>
          </div>
        </Fieldset>
      )}

      {submitError && (
        <p
          role="alert"
          className="mt-8 rounded-sm border border-alert bg-alert-100 p-4 text-sm leading-relaxed text-alert-700"
        >
          {submitError}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-rule pt-6">
        {position > 0 ? (
          <Button variant="ghost" onClick={goBack} disabled={submitting}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step === 3 ? (
          <Button onClick={() => void submit()} disabled={submitting}>
            {submitting ? 'Sending…' : 'Request consultation'}
          </Button>
        ) : (
          <Button onClick={goNext}>Continue</Button>
        )}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------- confirmation -- */

function Confirmation({ values }: { values: Partial<BookingValues> }) {
  const suggested = resolveServices(suggestServices(values))

  return (
    <div className="mx-auto max-w-[42rem]">
      <p className="eyebrow mb-3">Request received</p>
      <h2 className="text-2xl sm:text-3xl">Thank you — we will be in touch</h2>
      <p className="mt-4 leading-relaxed text-ink-600">
        We will reply by email to arrange a time. In the meantime, these pages are the ones most
        likely to be relevant to what you have described.
      </p>

      <ul className="mt-7 grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2">
        {suggested.map((s) => (
          <li key={s.slug} className="bg-paper">
            <Link
              to={`/services/${s.slug}/`}
              className="flex h-full flex-col p-5 hover:bg-surface"
            >
              <span className="font-display font-semibold text-ink-900">{s.title}</span>
              <span className="mt-1.5 text-sm leading-relaxed text-ink-600">{s.summary}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm leading-relaxed text-ink-400">
        These suggestions are informational. They are based only on what you selected and do not
        indicate that any procedure is available to you.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------- primitives -- */

function Fieldset({
  legend,
  hint,
  error,
  children,
}: {
  legend: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <fieldset>
      <legend className="font-display text-xl text-ink-900">{legend}</legend>
      {hint && <p className="mt-1.5 text-sm text-ink-400">{hint}</p>}
      {error && <p className="mt-2 text-sm text-alert">{error}</p>}
      <div className="mt-5">{children}</div>
    </fieldset>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-ink-600">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-alert">{error}</span>}
    </label>
  )
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-rule p-3 text-[0.975rem] text-ink-800 hover:bg-surface">
      <input
        type="checkbox"
        className="mt-1 accent-[var(--color-accent)]"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  )
}
