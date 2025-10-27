# Quick Deploy to Vercel (5 Minutes)

The fastest way to get Quanqua online.

## Step 1: Push to GitHub (2 minutes)

```bash
# In your terminal
git add .
git commit -m "Production ready Quanqua"
git push origin main
```

(If you don't have GitHub repo yet, create one at github.com first)

## Step 2: Deploy to Vercel (2 minutes)

1. Go to **vercel.com**
2. Sign up with GitHub
3. Click **"Add New Project"**
4. Select your `quanqua` repository
5. Click **"Deploy"**

**Done!** Your site is live at a vercel.app URL.

## Step 3: Add Environment Variable (30 seconds)

In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add: `GOOGLE_CLOUD_API_KEY` = your_key
3. Click **Save**

## Step 4: Connect Your Domain (1 minute)

1. In Vercel → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `quanqua.com`
4. Follow DNS instructions shown
5. Update DNS in GoDaddy as instructed

## Done! 🎉

Your site is now live at quanqua.com

