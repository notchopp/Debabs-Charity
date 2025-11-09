import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create client with empty strings if env vars are missing (for build time)
// Will be properly initialized at runtime when env vars are available
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export type Item = {
  id: string
  title: string
  description: string
  image_url: string | null
  pickup_available: boolean
  created_at: string
}

