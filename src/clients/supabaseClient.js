import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL || ''
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured =
  Boolean(rawUrl) &&
  Boolean(rawKey) &&
  !rawUrl.includes('placeholder') &&
  !rawKey.includes('placeholder')

const supabaseUrl = isSupabaseConfigured ? rawUrl : 'https://demo.supabase.co'
const supabaseAnonKey = isSupabaseConfigured ? rawKey : 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
