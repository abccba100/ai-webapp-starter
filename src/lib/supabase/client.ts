import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let cached: SupabaseClient<Database> | null | undefined = undefined;

export function createSupabaseClient(): SupabaseClient<Database> | null {
  if (cached !== undefined) return cached;
  if (!supabaseUrl || !supabaseAnonKey) {
    cached = null;
    return null;
  }
  cached = createClient<Database>(supabaseUrl, supabaseAnonKey);
  return cached;
}
