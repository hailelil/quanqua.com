# Deploy via GoDaddy File Manager (Static HTML Only)

## ⚠️ Important Limitation

If you upload via File Manager to basic GoDaddy hosting, the **translation API will NOT work** because:
- Basic hosting only supports static HTML/PHP files
- Your app needs Node.js to run the translation API
- The API routes (`/api/translate`) require a server

## Option 1: Static Export (HTML Only - Translation Won't Work)

If you still want to try this approach:

### Step 1: Create Static Export

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // This creates static HTML files
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Then run:
```bash
npm run build
```

This creates an `out` folder with static HTML files.

### Step 2: Upload via File Manager

1. Log into GoDaddy cPanel
2. Click **"File Manager"**
3. Navigate to `public_html` folder
4. Delete any existing files in `public_html`
5. Upload all contents from the `out` folder
6. Done!

**Problem**: Translation won't work because there's no backend server.

---

## ✅ RECOMMENDED: Use Vercel Instead

Since File Manager won't work for your translation app, here's the easiest alternative:

### Why Vercel is Better:

- ✅ **Works with your translation API**
- ✅ **Free hosting**
- ✅ **Takes 5 minutes to set up**
- ✅ **You keep your GoDaddy domain**
- ✅ **Automatic HTTPS**
- ✅ **Easy updates**

### Quick Vercel Setup:

#### 1. Push to GitHub (if you haven't)

Open terminal:

```bash
cd /Users/mardaa/senai/quanqua-com

# Check if git is initialized
git status

# If not initialized, run:
git init
git add .
git commit -m "Production ready Quanqua app"

# Create repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/quanqua.git
git push -u origin main
```

#### 2. Deploy on Vercel

1. Go to **https://vercel.com**
2. Sign up with GitHub
3. Click **"Add New Project"**
4. Select your `quanqua` repository
5. Click **"Deploy"**
6. Wait 2 minutes

**Your site is now live!** (at a vercel.app URL)

#### 3. Add Your API Key in Vercel

1. In Vercel dashboard → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Add:
   - Name: `GOOGLE_CLOUD_API_KEY`
   - Value: Your Google Cloud API key
4. Click **Save**

#### 4. Connect Your GoDaddy Domain

1. In Vercel → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `quanqua.com`
4. Vercel will show you DNS configuration

#### 5. Update DNS in GoDaddy

1. Log into GoDaddy
2. Go to **My Products** → **DNS**
3. Update your DNS records as Vercel instructs:
   - Add an A record pointing to Vercel's IP
   - Or add a CNAME record
4. Wait 24-48 hours for DNS to update

**Done!** Your site will work at quanqua.com with translation features!

---

## 📋 Quick Comparison

### File Manager Upload:
- ❌ Translation won't work (needs Node.js server)
- ✅ Easy to upload
- ✅ Free with your existing hosting

### Vercel Deploy:
- ✅ Everything works
- ✅ Free
- ✅ Easy to update
- ✅ 5 minutes setup
- ✅ You keep your domain

---

## 🎯 My Recommendation

**Use Vercel** - You spent all this time building a translation app with API features. Don't limit yourself to static HTML. Vercel is the best option and it's free!

**Time to deploy**: 5 minutes

See `QUICK_VERCEL_DEPLOY.md` for the detailed step-by-step guide.

