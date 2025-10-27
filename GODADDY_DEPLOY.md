# Deploying Quanqua to GoDaddy

## Pre-Deployment Checklist

### 1. Environment Variables
Make sure you have your Google Cloud Translation API key ready:
- Copy `.env.local.example` to `.env.local`
- Add your `GOOGLE_CLOUD_API_KEY`

## Option 1: Deploy via cPanel (Recommended for GoDaddy)

### Step 1: Build the Production Version

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates an optimized production build in the `.next` folder.

### Step 2: Upload to GoDaddy

1. **Log into your GoDaddy account** and access cPanel
2. **Navigate to File Manager** or use FTP
3. **Go to your domain directory** (usually `public_html` or `yourdomain.com`)
4. **Upload the following files/folders:**
   - `.next/` (production build)
   - `app/` (application files)
   - `public/` (static assets)
   - `package.json` and `package-lock.json`
   - `next.config.ts`
   - `.env.local` (your environment variables - keep this secure!)

### Step 3: Install Node.js (if not available)

1. In cPanel, look for "Node.js Selector" or "Setup Node.js App"
2. Create a new Node.js application
3. Select your domain or subdomain
4. Choose Node.js version 20 or higher
5. Enable npm and start the application

### Step 4: Configure Environment Variables

1. In your cPanel Node.js application settings
2. Add your `GOOGLE_CLOUD_API_KEY` as an environment variable
3. Set `NODE_ENV=production`

### Step 5: Start the Application

```bash
npm start
```

## Option 2: Deploy to Vercel (Easier Alternative)

If GoDaddy hosting becomes complex, consider deploying to Vercel and pointing your domain there:

1. **Push your code to GitHub**
2. **Go to vercel.com** and import your repository
3. **Add environment variables** in Vercel dashboard:
   - `GOOGLE_CLOUD_API_KEY`: Your Google Cloud API key
4. **Deploy** - Vercel handles everything automatically
5. **Update DNS** to point your GoDaddy domain to Vercel

## Important Notes

### Security Checklist
- ✅ Never commit `.env.local` to git
- ✅ Ensure your API key is kept secure
- ✅ Remove any console.log statements in production
- ✅ Test your build locally before deploying

### Performance Optimization
- The app uses Next.js 16 with automatic optimization
- Static assets are automatically optimized
- Images should be optimized before adding

### Troubleshooting

If you encounter issues:

1. **Check Node.js version**: Requires Node.js 20+
2. **Verify API key**: Test the translation API with Postman
3. **Check logs**: Look at server logs in cPanel for errors
4. **Permissions**: Ensure files have correct permissions (644 for files, 755 for directories)

## Post-Deployment

### 1. Test All Features
- Translation functionality
- Audio playback
- Copy to clipboard
- History feature
- Mobile responsiveness

### 2. Update DNS (if using Vercel)
Point your domain to Vercel's servers:
- Go to GoDaddy DNS management
- Update A/CNAME records to Vercel's IPs

### 3. Set Up SSL Certificate
- Most hosts (including Vercel) provide free SSL
- Ensure HTTPS is enabled

## Support

If you need help:
- Check `TROUBLESHOOTING.md` for common issues
- Review `API_SETUP_CHECK.md` for API setup
- Contact support with server logs

