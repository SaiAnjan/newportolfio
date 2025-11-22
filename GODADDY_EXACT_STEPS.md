# Exact GoDaddy Steps with Your Values

## ✅ Your Vercel DNS Values

From your Vercel dashboard, you need to configure:

**For `www.saianjan.com`:**
- **Type:** CNAME
- **Name:** www
- **Value:** `ae5446899773a32e.vercel-dns-017.com.`

**For `saianjan.com` (root domain - optional):**
- **Type:** A
- **Name:** @ (or leave blank)
- **Value:** `216.198.79.1`

---

## 📋 GoDaddy Steps

### Step 1: Log in to GoDaddy
1. Go to https://www.godaddy.com
2. Sign in to your account

### Step 2: Open DNS Management
1. Click **"My Products"** (top menu)
2. Find **`saianjan.com`** in your domains list
3. Click the **"DNS"** button (or **"Manage DNS"**)

### Step 3: Update www CNAME Record

**Find the existing `www` CNAME record:**
- Look for a record with Type: CNAME and Name: www

**Update it:**
1. Click the **pencil/edit icon** (✏️) next to the `www` CNAME record
2. In the **"Points to"** or **"Value"** field, replace the current value with:
   ```
   ae5446899773a32e.vercel-dns-017.com.
   ```
   (Make sure to include the trailing dot `.` at the end)
3. Click **"Save"**

**OR if there's no `www` CNAME record:**
1. Click **"Add"** button
2. Select **"CNAME"** from the Type dropdown
3. **Name/Host:** `www`
4. **Value/Points to:** `ae5446899773a32e.vercel-dns-017.com.`
5. **TTL:** 1 hour (or default)
6. Click **"Save"**

### Step 4: Update Root Domain (Optional - for saianjan.com without www)

**Find the existing `@` A record:**
- Look for a record with Type: A and Name: @ (or blank)

**Update it:**
1. Click the **pencil/edit icon** (✏️) next to the `@` A record
2. In the **"Points to"** or **"Value"** field, replace with:
   ```
   216.198.79.1
   ```
3. Click **"Save"**

**OR if there's no `@` A record:**
1. Click **"Add"** button
2. Select **"A"** from the Type dropdown
3. **Name/Host:** `@` (or leave blank for root domain)
4. **Value/Points to:** `216.198.79.1`
5. **TTL:** 1 hour (or default)
6. Click **"Save"**

---

## ⏱️ After Updating

1. **Save** all changes in GoDaddy
2. **Wait 5-10 minutes**, then go back to Vercel
3. In Vercel → Settings → Domains, click **"Refresh"** button
4. The status should change from **"Invalid Configuration"** to **"Valid Configuration"** ✅

**Note:** Full DNS propagation can take 1-48 hours, but usually works within 1-2 hours.

---

## 🔍 How to Verify

### In GoDaddy:
- After saving, the DNS records should show:
  - CNAME: `www` → `ae5446899773a32e.vercel-dns-017.com.`
  - A: `@` → `216.198.79.1`

### In Vercel:
- Go back to Settings → Domains
- Click **"Refresh"** button
- Status should change to **"Valid Configuration"** (green checkmark)

### Command Line:
```bash
nslookup www.saianjan.com
```
Should show the Vercel CNAME value.

---

## ❓ Why "Invalid Configuration"?

The error appears because:
- Vercel is checking if your GoDaddy DNS matches what it expects
- Currently, GoDaddy has old/different values
- Once you update GoDaddy with the correct values, Vercel will detect it and show "Valid Configuration"

This is normal and will be fixed once you update the DNS records!

