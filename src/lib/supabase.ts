import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Item = {
  id: string
  title: string
  category: string
  condition: string
  description: string
  pickup_available: boolean
  image_url: string | null
  created_at: string
}

export type Message = {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}
