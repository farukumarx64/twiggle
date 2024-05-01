import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_DB_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  )

  return supabase
}