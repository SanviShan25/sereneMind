import { createClient } from '@supabase/supabase-js'

// These will be provided by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserRegistration {
  id?: string
  full_name: string
  email: string
  registration_date: string
  created_at?: string
}