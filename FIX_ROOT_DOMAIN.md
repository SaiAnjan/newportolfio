# Fix Root Domain (saianjan.com) - Exact Steps

## ✅ Current Status
- ✅ `www.saianjan.com` is working! (SSL generating)
- ❌ `saianjan.com` (root domain) still needs fixing

## 🔍 The Problem
You have **4 old A records** in GoDaddy:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Vercel needs **1 A record** with:
- `216.198.79.1`

## 📋 Steps to Fix

### Step 1: Delete All Old A Records
1. In GoDaddy DNS page, find all 4 A records with Name "@"
2. For each one:
   - Click the **trash can icon** (Delete)
   - Confirm deletion
3. Delete all 4 of them

### Step 2: Create New A Record
1. Click **"Add"** button
2. Select **"A"** from Type dropdown
3. Fill in:
   - **Name/Host:** `@` (or leave blank)
   - **Value/Points to:** `216.198.79.1`
   - **TTL:** 600 seconds (or default)
4. Click **"Save"**

### Step 3: Verify
After saving, you should have:
- **Only 1 A record** with Name "@" and Value `216.198.79.1`
- All 4 old A records deleted

### Step 4: Wait and Refresh
1. Wait 5-10 minutes
2. Go back to Vercel → Settings → Domains
3. Click **"Refresh"** button next to `saianjan.com`
4. Status should change to **"Valid Configuration"** ✅

## 🎯 Final Result
After this, you'll have:
- ✅ `www.saianjan.com` - Working (CNAME)
- ✅ `saianjan.com` - Working (A record)
- Both pointing to your Vercel project!

## ⚠️ Important Notes
- **Delete ALL 4 old A records** - don't keep any of them
- **Create only 1 new A record** with Vercel's value
- The old IPs (185.199.xxx.xxx) are from your old setup
- Vercel needs the new IP: `216.198.79.1`

