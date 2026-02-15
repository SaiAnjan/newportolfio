import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client for API routes (Route Handlers). Uses only URL + anon key,
 * no cookies — reliable in serverless and avoids SSR cookie issues.
 */
export function createApiClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)"
    );
  }

  return createClient(url, key);
}
