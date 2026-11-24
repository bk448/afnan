-- Consultation requests from /contact/book/.
--
-- SECURITY MODEL
-- The anon key is embedded in the public JS bundle, so it is not a secret.
-- Row Level Security is the only real boundary. The anon role may INSERT and
-- nothing else: it cannot SELECT, UPDATE or DELETE. Submitted personal data is
-- therefore write-only from the browser and readable only via the service_role
-- key (Supabase dashboard / server-side), which bypasses RLS.
--
-- SCOPE
-- No SSN/ITIN, no income figures, no documents, no uploads. See
-- docs/02-planning/architecture.md section 7.

create extension if not exists pgcrypto;

create table if not exists public.booking_requests (
  id                 uuid        primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),

  -- Situation (steps 1-3)
  situations         text[]      not null,
  country            text        not null,
  years_behind       text,
  owns_business      boolean,
  foreign_accounts   boolean,
  foreign_pension    boolean,

  -- Contact (step 4)
  name               text        not null,
  email              text        not null,
  preferred_time     text,
  notes              text,
  consent            boolean     not null,

  -- Derived client-side from the answers; stored to speed up triage.
  suggested_services text[]      not null default '{}',

  -- Firm-side triage. Only service_role can change it; see the insert policy.
  status             text        not null default 'new',

  constraint booking_requests_consent_required
    check (consent = true),
  constraint booking_requests_situations_present
    check (array_length(situations, 1) between 1 and 8),
  constraint booking_requests_name_len
    check (char_length(name) between 2 and 120),
  constraint booking_requests_email_shape
    check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  constraint booking_requests_email_len
    check (char_length(email) <= 254),
  constraint booking_requests_country_len
    check (char_length(country) between 2 and 60),
  constraint booking_requests_years_behind_len
    check (years_behind is null or char_length(years_behind) <= 40),
  constraint booking_requests_preferred_time_len
    check (preferred_time is null or char_length(preferred_time) <= 120),
  constraint booking_requests_notes_len
    check (notes is null or char_length(notes) <= 2000),
  constraint booking_requests_status_allowed
    check (status in ('new', 'contacted', 'booked', 'closed'))
);

comment on table public.booking_requests is
  'Consultation requests. Browser-writable, never browser-readable. No tax identifiers by design.';

create index if not exists booking_requests_created_at_idx
  on public.booking_requests (created_at desc);

create index if not exists booking_requests_new_idx
  on public.booking_requests (created_at desc) where status = 'new';

-- ---------------------------------------------------------------- privileges --
-- Belt and braces: even if a SELECT policy were added by mistake, the anon role
-- has no SELECT privilege to use it.

alter table public.booking_requests enable row level security;

revoke all on public.booking_requests from anon, authenticated;
grant insert on public.booking_requests to anon, authenticated;

-- ------------------------------------------------------------------ policies --

drop policy if exists "anon may submit a consultation request" on public.booking_requests;

create policy "anon may submit a consultation request"
  on public.booking_requests
  for insert
  to anon, authenticated
  with check (
    -- Consent cannot be forged away, and a submission cannot arrive pre-triaged.
    consent = true
    and status = 'new'
  );

-- No SELECT, UPDATE or DELETE policy exists. That is deliberate.
