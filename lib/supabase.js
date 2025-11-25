// lib/supabase.js - Supabase client configuration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set environment variables.')
}

export const supabase = createClient(
  supabaseUrl || 'https://your-project.supabase.co',
  supabaseAnonKey || 'your-anon-key'
)

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error)
  return {
    error: true,
    message: error.message || 'Database operation failed',
    code: error.code
  }
}

// Helper to get user from session
export const getUserFromRequest = async (request) => {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return { user: null, error: 'No authorization token' }
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  if (error) {
    return { user: null, error: error.message }
  }

  return { user, error: null }
}
