# Next.js Portfolio Setup Instructions

## ✅ Completed Steps

1. ✅ Created Next.js app with Supabase example
2. ✅ Git repository initialized
3. ✅ Initial commit made

## 📋 Next Steps

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `my-portfolio` (or your preferred name)
3. Description: "Portfolio website built with Next.js, Vercel, and Supabase"
4. Choose Public or Private
5. **DO NOT** check "Add a README file", "Add .gitignore", or "Choose a license" (we already have these)
6. Click "Create repository"

### Step 2: Connect to GitHub

After creating the repository, run these commands (replace `<your-github-repo-url>` with your actual repo URL):

```bash
cd /Users/saianjan/Documents/GitHub/my-portfolio
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/SaiAnjan/my-portfolio.git
git push -u origin main
```

### Step 3: Set Up Vercel

1. Go to https://vercel.com and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository (`my-portfolio`)
4. Vercel will auto-detect Next.js settings
5. Add environment variables if needed (Supabase keys)
6. Click "Deploy"

### Step 4: Configure Domain

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add your domain: `www.saianjan.com`
3. Vercel will provide DNS records (CNAME)
4. Copy the CNAME record value

### Step 5: Update GoDaddy DNS

1. Log in to GoDaddy
2. Go to DNS Management for `saianjan.com`
3. Add/Update CNAME record:
   - **Type:** CNAME
   - **Name:** www
   - **Value:** (paste the CNAME value from Vercel)
   - **TTL:** 1 hour (or default)
4. Save changes
5. Wait 24-48 hours for DNS propagation

### Step 6: Set Up Supabase

1. Go to https://supabase.com and create an account
2. Create a new project
3. Copy your project URL and anon key
4. In Vercel, add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Update `.env.local` in your local project with the same values

## 🎯 Project Structure

```
my-portfolio/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utilities and Supabase client
├── public/          # Static assets (will add your backup files here)
└── ...
```

## 📦 Next: Migrate Your Assets

After setting up the basic infrastructure, we'll:
1. Copy assets from `backup/` directory
2. Convert HTML pages to Next.js pages
3. Set up your portfolio content

