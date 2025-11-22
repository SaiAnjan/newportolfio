# Quick Steps to Deploy Your New Portfolio

## You Already Have Vercel! ✅

I can see you have Vercel set up with existing projects. Here's what to do:

## Step 1: Add New Project
1. Click the **"Add New..."** button (top right in your Vercel dashboard)
2. Select **"Project"** from the dropdown
3. You'll see a list of your GitHub repositories
4. Find and click on **`SaiAnjan/newportolfio`**
5. Click **"Import"**

## Step 2: Configure Project Settings
Vercel will auto-detect Next.js, but you need to add environment variables:

1. Before clicking "Deploy", click **"Environment Variables"** (or do it after deployment in Settings)
2. Add these two variables:

   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://cumcqopaghufhzaswgut.supabase.co`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1bWNxb3BhZ2h1Zmh6YXN3Z3V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4Mjc5NTAsImV4cCI6MjA3OTQwMzk1MH0.05okXnTz_N6UyeOTTYeKMe9byq9HW2vIKWOgTtyJ954`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

## Step 3: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for the build
3. Your site will be live at: `https://newportolfio.vercel.app` (or similar)

## Step 4: Configure Domain (Optional)
If you want to use `www.saianjan.com` for this new project:

1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `www.saianjan.com`
4. **Note:** You already have `www.saianjan.com` pointing to `saianjan-github-io-oska`
   - You'll need to either:
     - Remove it from the old project first, OR
     - Use a different subdomain like `portfolio.saianjan.com` or `new.saianjan.com`

## Quick Checklist
- [ ] Import `newportolfio` repository
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` environment variable
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variable
- [ ] Deploy
- [ ] Verify site loads
- [ ] (Optional) Configure domain

## After Deployment
Once deployed, you can:
- View your site at the Vercel URL
- Check deployment logs if there are any issues
- Update domain settings if needed

