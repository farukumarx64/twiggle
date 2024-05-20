import { createClient as createClientPrimitive } from '@supabase/supabase-js'

export function createClient() {
  const supabase = createClientPrimitive(
    process.env.NEXT_PUBLIC_SUPABASE_DB_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  )

  return supabase
}