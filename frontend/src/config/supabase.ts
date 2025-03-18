// This file initializes the connection to our Supabase instance

import { createClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl: string | undefined = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("🚨 Missing Supabase environment variables!");
  throw new Error("Missing Supabase environment variables. Check your .env file.");
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("✅ Supabase client initialized successfully!");
