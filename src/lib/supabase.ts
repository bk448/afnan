import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Whether this bundle carries Supabase credentials. False during prerender and
 * in tests, where no network call should ever be attempted.
 */
export const isSupabaseConfigured = Boolean(url && anonKey)

let client: SupabaseClient | null = null

/**
 * Lazily created singleton, returning null when unconfigured so that merely
 * importing this module can never throw — the prerenderer imports the whole app
 * in Node, where these variables may legitimately be absent.
 *
 * Sessions are disabled: this site has no authentication and should not write
 * to localStorage.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!url || !anonKey) return null
  client ??= createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  return client
}
