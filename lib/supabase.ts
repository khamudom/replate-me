import { createClient } from "@supabase/supabase-js";

// Use environment variables if available, otherwise fallback to hardcoded values
const supabaseUrl = "https://kqdvutqrylnxwotwmlhg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZHZ1dHFyeWxueHdvdHdtbGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MzQ1MTUsImV4cCI6MjA1NjUxMDUxNX0.B5xZpiE1trN8qHgy_XCIw0EsI4y2AGO4Oho-JWxz9nQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "recipe-collection-auth",
  },
});
