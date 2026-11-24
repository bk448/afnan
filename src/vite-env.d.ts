/// <reference types="vite/client" />

/**
 * Typed build-time environment. Both are optional: the prerenderer and the test
 * runner import the app without them, and the booking form degrades gracefully.
 */
interface ImportMetaEnv {
  /** Supabase project URL, e.g. https://abcdefgh.supabase.co */
  readonly VITE_SUPABASE_URL?: string
  /** Supabase anon key. Ships in the bundle by design; RLS is the real guard. */
  readonly VITE_SUPABASE_ANON_KEY?: string
}
