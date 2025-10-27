# Deployment Alternatives for GoDaddy

If your GoDaddy cPanel doesn't have Node.js support, here are your options:

---

## 🚀 Option 1: Deploy to Vercel (RECOMMENDED - EASIEST)

This is the fastest and easiest way to deploy your Next.js app with GoDaddy domain.

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Production ready Quanqua app"

# Create repository on GitHub.com and push
git remote add origin https://github.com/yourusername/quanqua.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to **https://vercel.com**
2. Sign up or log in with GitHub
3. Click **"Add New Project"**
4. Import your `quanqua` repository
5. Click **"Deploy"** button
6. Wait 2 minutes - your site is live!

### Step 3: Connect Your GoDaddy Domain

1. In Vercel dashboard → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `quanqua.com`
4. Vercel will show you DNS instructions

### Step 4: Update DNS in GoDaddy

1. Log into **godaddy.com**
2. Go to **My Products** → **DNS**
3. Update your DNS records:

   **Option A: Point Root Domain (quanqua.com)**
   ```
   Type: A
   Name: @
   Value: [Get IP from Vercel dashboard]
   TTL: 600
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 600
   ```

   **Option B: Use CNAME** (if GoDaddy supports it)
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   TTL: 600
   ```

4. Wait 24-48 hours for DNS propagation
5. SSL certificate will be automatically provisioned

### Step 5: Add Environment Variables in Vercel

1. In Vercel dashboard → **Settings** → **Environment Variables**
2. Add:
   - **Name**: `GOOGLE_CLOUD_API_KEY`
   - **Value**: Your API key
   - **Environment**: Production
3. Click Save

---

## 🔧 Option 2: Use GoDaddy's Web Hosting with Custom Setup

If you must use GoDaddy hosting:

### Check Your Hosting Type

1. Log into GoDaddy
2. Check what type of hosting you have:
   - **Shared Hosting**: Only supports PHP/static files
   - **Managed WordPress**: Only WordPress
   - **cPanel**: May support PHP only
   - **VPS/Dedicated**: Can install Node.js yourself

### If You Have Shared Hosting

You have two choices:

#### A. Export as Static Site

Build a static export and upload HTML files:

```bash
# Add to next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

# Build
npm run build

# This creates an 'out' folder
# Upload the 'out' folder contents to public_html
```

**Note**: This won't work for translation API calls (API routes)

#### B. Use Vercel + Point Domain (Best Option)

Go with Option 1 above - it's much easier!

---

## 🌐 Option 3: Use Netlify (Alternative to Vercel)

Similar to Vercel but different provider:

1. Push code to GitHub
2. Go to **netlify.com**
3. Import repository
4. Add environment variables
5. Deploy
6. Point your domain to Netlify

---

## 💡 Option 4: Upgrade GoDaddy Hosting

If you want to use GoDaddy with Node.js:

1. **Upgrade to VPS or Dedicated Server**
2. **Contact GoDaddy Support** to enable Node.js
3. **Ask them** if they can enable Node.js on your current plan

---

## ✅ What I Recommend

**Use Option 1 (Vercel) because:**
- ✅ Free (unless you exceed free tier)
- ✅ Automatic HTTPS/SSL
- ✅ Fast global CDN
- ✅ Easy environment variables
- ✅ Automatic deployments from GitHub
- ✅ Easy to update (just push to GitHub)
- ✅ Perfect for Next.js
- ✅ Works with your GoDaddy domain

**Steps:**
1. Push code to GitHub
2. Deploy to Vercel (2 minutes)
3. Point your GoDaddy domain to Vercel
4. Done!

---

## 📋 Quick Checklist

### Before You Start:
- [ ] Code is pushed to GitHub
- [ ] Google Cloud API key is ready
- [ ] Domain name is ready (quanqua.com)
- [ ] GitHub account created (github.com)

### During Deployment:
- [ ] Connect GitHub to Vercel
- [ ] Add environment variables
- [ ] Deploy to Vercel
- [ ] Add custom domain in Vercel
- [ ] Update DNS in GoDaddy

### After Deployment:
- [ ] Test website works
- [ ] Verify SSL certificate
- [ ] Test translation features
- [ ] Check mobile responsiveness
- [ ] Monitor API usage

---

## 🆘 Need Help?

- **Vercel doesn't work**: Try Netlify (Option 3)
- **Can't use GitHub**: Use drag-and-drop upload on Vercel
- **DNS issues**: Wait 48 hours, then contact support
- **API not working**: Check environment variables in Vercel
- **Still stuck**: Contact me with your GoDaddy hosting type

---

## 🎯 My Recommendation

**Go with Vercel** - it's designed for Next.js and makes deployment trivial. You keep your GoDaddy domain and just point it to Vercel's servers.

