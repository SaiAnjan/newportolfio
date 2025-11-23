# Vercel Deployment Setup

## ✅ What's Done
- ✅ Code pushed to GitHub: https://github.com/SaiAnjan/newportolfio
- ✅ Supabase credentials configured locally
- ✅ All assets migrated (43 MB)

## 🚀 Deploy to Vercel

### Step 1: Import Repository
1. Go to https://vercel.com and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `SaiAnjan/newportolfio`
4. Vercel will auto-detect Next.js settings

### Step 2: Add Environment Variables
In the Vercel project settings, add these environment variables:

**Required:**
```
NEXT_PUBLIC_SUPABASE_URL=https://cumcqopaghufhzaswgut.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1bWNxb3BhZ2h1Zmh6YXN3Z3V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4Mjc5NTAsImV4cCI6MjA3OTQwMzk1MH0.05okXnTz_N6UyeOTTYeKMe9byq9HW2vIKWOgTtyJ954
```

**How to add:**
1. In Vercel project → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Add each variable:
   - **Key:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** `https://cumcqopaghufhzaswgut.supabase.co`
   - **Environment:** Production, Preview, Development (select all)
4. Repeat for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Your site will be live at: `https://newportolfio.vercel.app` (or similar)

### Step 4: Configure Custom Domain

1. In Vercel → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `www.saianjan.com`
4. Vercel will provide DNS instructions

**DNS Configuration (GoDaddy):**
1. Log in to GoDaddy
2. Go to **DNS Management** for `saianjan.com`
3. Add/Update CNAME record:
   - **Type:** CNAME
   - **Name:** www
   - **Value:** (paste the CNAME value from Vercel - usually `cname.vercel-dns.com`)
   - **TTL:** 1 hour
4. Save changes
5. Wait 24-48 hours for DNS propagation

**Optional: Root Domain**
- To use `saianjan.com` (without www), add an A record pointing to Vercel's IP
- Or use Vercel's domain forwarding feature

## ✅ Verification Checklist

After deployment:
- [ ] Site loads at Vercel URL
- [ ] Supabase connection works (check browser console)
- [ ] All images load correctly
- [ ] Custom domain configured
- [ ] DNS propagated (check with `nslookup www.saianjan.com`)

## 🔗 Useful Links

- **GitHub Repo:** https://github.com/SaiAnjan/newportolfio
- **Supabase Dashboard:** https://supabase.com/dashboard/project/cumcqopaghufhzaswgut
- **Vercel Dashboard:** https://vercel.com/dashboard

## 📝 Notes

- `.env.local` is not committed to GitHub (it's in `.gitignore`)
- Environment variables must be added in Vercel dashboard
- Each deployment automatically uses the latest code from GitHub
- Vercel provides free SSL certificates automatically


