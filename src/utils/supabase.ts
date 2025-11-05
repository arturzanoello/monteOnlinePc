import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://trgruijqkhbdpejrpzhd.supabase.co'
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZ3J1aWpxa2hiZHBlanJwemhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NDUzMTYsImV4cCI6MjA3NDMyMTMxNn0.96KKyrPewkeUBev1JUqrm4mHaSqMujI4ml8wPxv5iUU'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})