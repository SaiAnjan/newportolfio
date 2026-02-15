# Resolutions 2026 – shared list

Resolutions are stored in Supabase so **anyone with the link sees the same list** on all devices.

## One-time setup (required for cloud sync)

**1. Environment variables**

In **Vercel** (and in `.env.local` for local dev), set:

- `NEXT_PUBLIC_SUPABASE_URL` = your project URL (e.g. `https://xxxx.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your project’s anon/public key

(Supabase Dashboard → Project Settings → API.)

**2. Create the table in Supabase**

Until this is done, the Save button will fail and resolutions will not sync across devices.

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**.
2. Click **New query**.
3. Paste the **entire** contents of `create_resolutions_2026_table.sql`.
4. Run the query. You should see “Success. No rows returned.”

**3. Redeploy**

Redeploy your app on Vercel (or restart `npm run dev` locally) so the API uses the new table.

## If Save still fails

The app will show the error under the Save button. Common cases:

- **“Database table missing”** → Run step 2 above (the SQL migration).
- **“Supabase not configured”** → Set the two env vars in step 1 and redeploy.

## Behavior

- **Load**: The page calls `GET /api/resolutions`. If that fails (e.g. table missing or env not set), it falls back to localStorage and shows the Save button so you can push your list to the cloud once the backend is fixed.
- **Add / Edit / Delete**: When the backend is working, all changes go to Supabase and sync to every device. When it’s not, changes stay in localStorage on that device only.
