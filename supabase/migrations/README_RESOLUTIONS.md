# Resolutions 2026 – shared list

Resolutions are stored in Supabase so **anyone with the link sees the same list** (no more localStorage-only, which was per-device).

## One-time setup

Run the migration in your Supabase project so the table and RLS exist:

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**.
2. Paste and run the contents of `create_resolutions_2026_table.sql`.

Your existing env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are used by the API route; no extra config needed.

## Behavior

- **Load**: Page fetches from `GET /api/resolutions` (Supabase). If the API fails, it falls back to localStorage.
- **First visit with local data**: If the API returns an empty list but you have items in localStorage, the page uploads them to Supabase once, then refetches so the list is shared.
- **Add / Edit / Delete**: Writes go to the API (Supabase); localStorage is still updated as a backup.

After the migration is applied, you and your friend will see the same list at `/resolutions`.
