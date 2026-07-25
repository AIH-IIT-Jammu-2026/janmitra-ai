import { createClient } from '@supabase/supabase-js'

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

export const isSupabaseConfigured =
  Boolean(rawUrl) &&
  Boolean(rawKey) &&
  !rawUrl.includes('placeholder') &&
  !rawUrl.includes('demo.supabase.co') &&
  rawUrl.startsWith('https://')

// Only pass valid URL to createClient, avoid demo.supabase.co
const supabaseUrl = isSupabaseConfigured ? rawUrl : 'https://xyzcompany.supabase.co'
const supabaseAnonKey = isSupabaseConfigured ? rawKey : 'dummy-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
