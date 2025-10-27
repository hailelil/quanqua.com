# Deployment Guide for Quanqua.com

This guide provides step-by-step instructions for deploying Quanqua.com to Vercel and connecting your GoDaddy domain.

## Prerequisites

- ✅ Quanqua.com domain registered via GoDaddy
- ✅ Google Cloud Platform account with Translation API enabled
- ✅ API key for Google Cloud Translation
- ✅ GitHub account

## Step-by-Step Deployment

### 1. Push Code to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit - Quanqua.com"
git branch -M main
git remote add origin https://github.com/yourusername/quanqua-com.git
git push -u origin main
```

### 2. Deploy to Vercel

1. **Sign up / Log in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up using your GitHub account (recommended)

2. **Import Your Project**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In the "Environment Variables" section, add:
     - Key: `GOOGLE_TRANSLATE_API_KEY`
     - Value: Your Google Cloud Translation API key
   - Click "Add"

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - You'll get a temporary URL like `quanqua-com.vercel.app`

### 3. Connect Your Domain (GoDaddy)

1. **In Vercel Dashboard**
   - Go to your project → Settings → Domains
   - Click "Add Domain"
   - Enter: `quanqua.com`
   - Click "Add"

2. **Get DNS Instructions**
   - Vercel will provide DNS configuration
   - Note the IP address (typically starts with 76.xx.xx.xx)

3. **Configure DNS in GoDaddy**
   
   Login to GoDaddy and navigate to:
   - Products → Domain Management → Quanqua.com → DNS
   
   Add or modify the following records:
   
   **A Record (Root Domain)**:
   ```
   Type: A
   Name: @
   Value: [IP from Vercel - usually 76.76.19.61]
   TTL: 600 seconds
   ```
   
   **CNAME Record (www subdomain)**:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 600 seconds
   ```
   
   If you have existing records conflicting, temporarily disable or delete them.

4. **Wait for DNS Propagation**
   - DNS changes can take 15 minutes to 48 hours
   - Use [dnschecker.org](https://dnschecker.org) to verify propagation
   - Vercel will automatically detect when DNS is configured

5. **Automatic SSL Certificate**
   - Vercel will automatically provision an SSL certificate
   - HTTPS will be enabled automatically
   - This may take a few minutes after DNS propagation

### 4. Verify Deployment

1. **Check if site is accessible**
   - Visit `https://quanqua.com` (with www)
   - Visit `https://www.quanqua.com` (without www)
   - Both should redirect and work properly

2. **Test Translation**
   - Try translating sample text
   - Verify the API is working

3. **Check SSL**
   - Ensure you see the lock icon in browser
   - URL should be `https://`

## Security Checklist

### ✅ Secure Your API Key

1. **In Google Cloud Console:**
   - Go to APIs & Services → Credentials
   - Click on your API key
   - Under "Application restrictions":
     - Add HTTP referrer: `https://quanqua.com`
     - Add another: `https://www.quanqua.com`
   - Under "API restrictions":
     - Select "Restrict key"
     - Choose "Cloud Translation API"
   - Save

### ✅ Rate Limiting (Optional)

Consider implementing rate limiting for your API:

```typescript
// In next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'max-age=3600' },
        ],
      },
    ];
  },
};
```

## Monitoring & Maintenance

### View Logs
- In Vercel dashboard: Deployments → Select deployment → View logs

### Redeploy
```bash
git push origin main
# Vercel will automatically redeploy
```

### Rollback
- In Vercel dashboard: Deployments → Previous deployment → "Promote to Production"

## Troubleshooting

### Domain not working
- Verify DNS records in GoDaddy match Vercel's instructions
- Check DNS propagation: [dnschecker.org](https://dnschecker.org)
- Ensure SSL certificate is issued (check Vercel dashboard)

### Translation API errors
- Verify API key is correct in Vercel environment variables
- Check API key restrictions in Google Cloud Console
- Verify API is enabled and billing is set up
- Check Vercel logs for specific error messages

### Build failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify TypeScript compilation (run `npm run build` locally)

## Alternative Deployment Options

### Netlify
Follow similar steps but use Netlify's DNS records:
```bash
npm install -g netlify-cli
netlify deploy
# Follow prompts
```

### Other Hosting Providers
- Same environment variables required
- Same DNS configuration concept
- Ensure server supports Next.js

## Cost Estimation

**Vercel:**
- Hobby plan: Free for personal projects
- Pro plan: $20/month (if needed for higher traffic)

**Google Cloud Translation API:**
- Free: 500,000 characters/month
- Paid: $20 per 1 million characters

For typical usage, this should be free or very low cost.

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Google Cloud Console API usage
3. Verify DNS configuration
4. Test API locally first

---

**Your site should now be live at https://quanqua.com!** 🎉


