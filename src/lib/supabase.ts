import type { SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Whether this bundle carries Supabase credentials. False during prerender and
 * in tests, where no network call should ever be attempted.
 */
export const isSupabaseConfigured = Boolean(url && anonKey)

let client: SupabaseClient | null = null
let loading: Promise<SupabaseClient> | null = null

/**
 * Lazily loads the SDK and returns a singleton client, or null when the project
 * is unconfigured — so that importing this module can never throw. The
 * prerenderer imports the whole app in Node, where these variables are absent.
 *
 * The import is dynamic on purpose: the SDK is roughly 60 kB gzipped and is
 * needed by exactly one form, so it must not sit in the chunk that all 91 pages
 * preload. `import type` above is erased at compile time and adds no dependency.
 *
 * Sessions are disabled: this site has no authentication and should not write to
 * localStorage.
 */
export async function getSupabaseClient(): Promise<SupabaseClient | null> {
  if (!url || !anonKey) return null
  if (client) return client

  // Concurrent submits share one in-flight load.
  loading ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    }),
  )

  client = await loading
  return client
}
