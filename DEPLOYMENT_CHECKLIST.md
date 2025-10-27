# Pre-Deployment Checklist for Quanqua

## Before Deploying to Production

### ✅ Code Quality
- [ ] Remove all console.log statements (except errors)
- [ ] Test all features in development mode
- [ ] Run `npm run lint` and fix any errors
- [ ] Run `npm run build` to check for build errors
- [ ] Test translation functionality with real API key

### ✅ Security
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Create production API key in Google Cloud Console
- [ ] Add domain restrictions to production API key
- [ ] Review API key restrictions (IP, domain, API limits)
- [ ] Remove any hardcoded secrets or API keys

### ✅ Performance
- [ ] Optimize images (if any custom images are added)
- [ ] Test page load speed
- [ ] Check mobile responsiveness
- [ ] Test on different browsers (Chrome, Safari, Firefox)

### ✅ Functionality Testing
- [ ] Test translation in all language pairs
- [ ] Test voice input/output
- [ ] Test copy to clipboard feature
- [ ] Test translation history
- [ ] Test swap language button
- [ ] Test mobile menu (if applicable)
- [ ] Test navigation to About and Privacy pages

### ✅ SEO & Analytics
- [ ] Verify all metadata is correct in `app/layout.tsx`
- [ ] Test robots.txt is accessible
- [ ] Verify sitemap.xml is generated
- [ ] Check structured data with Google's Rich Results Test

### ✅ Content
- [ ] Review About page content
- [ ] Review Privacy Policy content
- [ ] Check all links are working
- [ ] Verify placeholder ad sizes are correct

## Build Instructions

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Test production build locally
npm start

# 4. If successful, deploy
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy

### Option 2: GoDaddy cPanel
1. Follow instructions in `GODADDY_DEPLOY.md`
2. Upload build files via FTP
3. Configure Node.js in cPanel
4. Start the application

## Post-Deployment Verification

- [ ] Test homepage loads correctly
- [ ] Test translation works
- [ ] Verify SSL certificate is active
- [ ] Test on mobile devices
- [ ] Check Google Search Console (if set up)
- [ ] Monitor error logs for first 24 hours

## Rollback Plan

If issues occur:
1. Revert to previous Git commit
2. Re-deploy stable version
3. Check error logs
4. Fix issues in development
5. Re-deploy

## Environment Variables to Set

In production, ensure these are set:
- `GOOGLE_CLOUD_API_KEY` - Your production API key
- `NODE_ENV` - Set to "production"
- `NEXT_PUBLIC_SITE_URL` - Your domain URL (optional)

## Important Notes

1. **Never commit `.env.local`** to Git
2. **Use separate API keys** for development and production
3. **Enable API billing alerts** in Google Cloud Console
4. **Monitor API usage** to avoid unexpected costs

