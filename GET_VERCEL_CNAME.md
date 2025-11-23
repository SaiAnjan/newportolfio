# How to Get CNAME Value from Vercel

## Step-by-Step Instructions

### Step 1: Go to Your Vercel Project
1. Open https://vercel.com
2. Log in to your account
3. Find your **`newportolfio`** project (or click on it if you've already deployed it)

### Step 2: Navigate to Domain Settings
1. Click on your project name: **`newportolfio`**
2. Go to the **"Settings"** tab (top navigation)
3. Click **"Domains"** in the left sidebar

### Step 3: Add Your Domain
1. Click the **"Add Domain"** button
2. In the input field, type: `www.saianjan.com`
3. Click **"Add"** or press Enter

### Step 4: Get the CNAME Value
After adding the domain, Vercel will show you one of two things:

**Option A: CNAME Record (Most Common)**
You'll see a message like:
```
To configure www.saianjan.com, add a CNAME record:
Name: www
Value: cname.vercel-dns.com
```
**Copy the "Value" part** - this is what you need for GoDaddy!

**Option B: A Record (Less Common)**
If Vercel shows an A record instead:
```
To configure www.saianjan.com, add an A record:
Name: www
Value: 76.76.21.21
```
Use this IP address in GoDaddy (but create an A record, not CNAME).

### Step 5: Copy the Value
- **If CNAME:** Copy the entire value (e.g., `cname.vercel-dns.com`)
- **If A Record:** Copy the IP address (e.g., `76.76.21.21`)

---

## Visual Guide

After clicking "Add Domain", you'll see something like this:

```
┌─────────────────────────────────────────┐
│  Configure www.saianjan.com             │
│                                         │
│  Add the following DNS record:         │
│                                         │
│  Type:  CNAME                           │
│  Name:  www                             │
│  Value: cname.vercel-dns.com  ← COPY THIS│
│                                         │
│  [Copy]                                 │
└─────────────────────────────────────────┘
```

---

## What to Do Next

1. **Copy the Value** from Vercel
2. **Go to GoDaddy** DNS settings
3. **Update the CNAME record** with the value you copied
4. **Save** in GoDaddy
5. **Wait** for DNS propagation (1-48 hours)

---

## Troubleshooting

### "Domain already in use"
- This means `www.saianjan.com` is still attached to your old project
- **Solution:** 
  1. Go to your old project (`saianjan-github-io-oska`)
  2. Settings → Domains
  3. Remove `www.saianjan.com` from there first
  4. Then add it to the new project

### "Invalid domain"
- Make sure you typed `www.saianjan.com` correctly
- Check for typos

### No CNAME value shown
- Wait a few seconds - Vercel sometimes takes a moment to generate it
- Refresh the page
- Try removing and re-adding the domain

---

## Quick Checklist

- [ ] Open Vercel project `newportolfio`
- [ ] Go to Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter `www.saianjan.com`
- [ ] Copy the CNAME Value shown
- [ ] Use that value in GoDaddy DNS settings

---

**Note:** If you haven't deployed the project yet, you can still add the domain. Vercel will show the DNS configuration even before deployment.


