# GoDaddy Domain Setup for Vercel

## 🎯 Your Situation
- Domain: `saianjan.com` (registered in GoDaddy)
- Current: `www.saianjan.com` points to old project `saianjan-github-io-oska`
- New: Want to point to your new `newportolfio` project

## 📋 Option 1: Move Domain to New Project (Recommended)

### Step 1: Remove Domain from Old Project
1. In Vercel, go to your **old project** (`saianjan-github-io-oska`)
2. Go to **Settings** → **Domains**
3. Find `www.saianjan.com`
4. Click the **three dots (⋯)** next to it
5. Click **"Remove"** or **"Delete"**
6. Confirm removal

### Step 2: Add Domain to New Project
1. In Vercel, go to your **new project** (`newportolfio`)
2. Go to **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter: `www.saianjan.com`
5. Click **"Add"**

### Step 3: Get Vercel DNS Records
After adding the domain, Vercel will show you DNS configuration:
- **Type:** CNAME
- **Name:** www
- **Value:** Something like `cname.vercel-dns.com` or `76.76.21.21` (Vercel will show the exact value)

**Copy the Value** - you'll need it for GoDaddy.

### Step 4: Update GoDaddy DNS
1. Log in to **GoDaddy** (https://www.godaddy.com)
2. Go to **My Products** → **Domains**
3. Find `saianjan.com` and click **"DNS"** (or **"Manage DNS"**)
4. You'll see your DNS records

**Find the existing CNAME record for `www`:**
- Look for a record with:
  - **Type:** CNAME
  - **Name:** www
  - **Value:** (current value pointing to old project)

**Update it:**
1. Click the **pencil/edit icon** next to the `www` CNAME record
2. Change the **Value** to the CNAME value Vercel provided
3. Click **"Save"**

**OR if there's no CNAME record:**
1. Click **"Add"** to create a new record
2. **Type:** CNAME
3. **Name:** www
4. **Value:** (paste Vercel's CNAME value)
5. **TTL:** 1 hour (or default)
6. Click **"Save"**

### Step 5: Wait for DNS Propagation
- DNS changes take **24-48 hours** to fully propagate
- Usually works within **1-2 hours** for most users
- You can check status with: `nslookup www.saianjan.com`

---

## 📋 Option 2: Use Root Domain (saianjan.com without www)

If you want `saianjan.com` (without www) to work:

### In Vercel:
1. Add domain: `saianjan.com` (without www)
2. Vercel will provide an **A record** with an IP address

### In GoDaddy:
1. Find or create an **A record**:
   - **Type:** A
   - **Name:** @ (or leave blank for root domain)
   - **Value:** (IP address from Vercel - usually `76.76.21.21`)
   - **TTL:** 1 hour
2. Save

**Note:** You can have both `www` and root domain pointing to the same project.

---

## 📋 Option 3: Use a Subdomain (Keep Old Site)

If you want to keep the old site and use a subdomain for the new one:

### In Vercel:
1. Add domain: `portfolio.saianjan.com` (or any subdomain you prefer)

### In GoDaddy:
1. Add a new **CNAME record**:
   - **Type:** CNAME
   - **Name:** portfolio (or your chosen subdomain)
   - **Value:** (CNAME value from Vercel)
   - **TTL:** 1 hour
2. Save

---

## 🔍 How to Verify DNS is Working

### Method 1: Check in GoDaddy
- After saving, wait 5-10 minutes
- Refresh the DNS page in GoDaddy
- The record should show as active

### Method 2: Command Line
```bash
nslookup www.saianjan.com
```
Should show the Vercel CNAME value.

### Method 3: Online Tools
- https://dnschecker.org
- Enter `www.saianjan.com`
- Check if it resolves to Vercel

### Method 4: Vercel Dashboard
- In Vercel → Settings → Domains
- The domain status will show:
  - ⏳ **Pending** - DNS not configured yet
  - ✅ **Valid** - DNS configured correctly
  - ⚠️ **Invalid** - Check DNS settings

---

## ⚠️ Common Issues

### Issue 1: "Domain already in use"
- **Solution:** Remove it from the old project first (Option 1, Step 1)

### Issue 2: DNS not updating
- **Solution:** 
  - Clear browser cache
  - Wait longer (up to 48 hours)
  - Check TTL value (lower = faster updates)

### Issue 3: Both www and root domain
- **Solution:** Add both in Vercel and configure both in GoDaddy

### Issue 4: SSL Certificate
- **Solution:** Vercel automatically provides SSL certificates
- Wait 24-48 hours after DNS is configured
- Check in Vercel → Settings → Domains

---

## 📝 Quick Checklist

**For Option 1 (Move to New Project):**
- [ ] Remove `www.saianjan.com` from old Vercel project
- [ ] Add `www.saianjan.com` to new Vercel project
- [ ] Copy CNAME value from Vercel
- [ ] Update CNAME record in GoDaddy
- [ ] Wait for DNS propagation (1-48 hours)
- [ ] Verify domain works

---

## 🆘 Need Help?

If you get stuck:
1. Check Vercel's domain status page
2. Verify GoDaddy DNS records match Vercel's requirements
3. Wait at least 1 hour before troubleshooting
4. Check GoDaddy's DNS propagation status

---

## 📞 Support Links

- **Vercel Domain Docs:** https://vercel.com/docs/concepts/projects/domains
- **GoDaddy DNS Help:** https://www.godaddy.com/help/manage-dns-680
- **DNS Checker:** https://dnschecker.org


