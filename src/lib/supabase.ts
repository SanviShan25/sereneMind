import { createClient } from '@supabase/supabase-js'

// These will be provided by Lovable's Supabase integration
const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserRegistration {
  id?: string
  full_name: string
  email: string
  registration_date: string
  created_at?: string
}