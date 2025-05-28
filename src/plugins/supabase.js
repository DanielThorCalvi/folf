import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hthehwnfqqtfpjaiiiex.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aGVod25mcXF0ZnBqYWlpaWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NTI1OTUsImV4cCI6MjA1OTUyODU5NX0.h6XAOuq7-G3e_OWyRYsYpXjZf5krerXoL_UB_KEItcg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)