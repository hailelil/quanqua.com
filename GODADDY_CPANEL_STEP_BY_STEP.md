# Step-by-Step: Deploy Quanqua to GoDaddy cPanel

## Prerequisites Checklist

Before starting, make sure you have:
- [ ] GoDaddy hosting account with cPanel access
- [ ] Node.js support enabled in your hosting plan
- [ ] Google Cloud Translation API key ready
- [ ] FTP access credentials (or use cPanel File Manager)
- [ ] Terminal/command line access

---

## Step 1: Prepare Your Files

### 1.1 Build the Production Version

Open your terminal and run:

```bash
# Navigate to your project
cd /path/to/quanqua-com

# Install dependencies (if not done)
npm install

# Build for production
npm run build
```

**Expected Output**: You should see a success message and a `.next` folder created.

### 1.2 Create Environment File

Create a `.env.local` file in the root directory:

```bash
# Create environment file
cat > .env.local << EOF
GOOGLE_CLOUD_API_KEY=your_production_api_key_here
EOF
```

Replace `your_production_api_key_here` with your actual Google Cloud API key.

### 1.3 Verify Build Success

Check that the build completed successfully:
- Look for "Compiled successfully" message
- Verify `.next` folder exists
- No error messages

---

## Step 2: Access GoDaddy cPanel

### 2.1 Log Into GoDaddy

1. Go to **godaddy.com**
2. Click **"My Account"** or **"Log In"**
3. Enter your credentials

### 2.2 Access cPanel

1. In your dashboard, find **"Web Hosting"**
2. Click on **"Manage"** next to your domain
3. Look for **"cPanel"** or **"Control Panel"** button
4. Click to open cPanel

---

## Step 3: Set Up Node.js Application

### 3.1 Create Node.js App

1. In cPanel, scroll down to **"Software"**
2. Click **"Node.js Selector"** or **"Setup Node.js App"**
3. Click **"Create Application"** button
4. Fill in the form:
   - **Node.js Version**: Select 20.x or latest
   - **Application Mode**: Production
   - **Application Root**: `/home/username/quanqua`
   - **Application URL**: Your domain (e.g., quanqua.com)
   - **Application Startup File**: `server.js` (if needed)
5. Click **"Create"**

### 3.2 Note Important Information

Write down these details (you'll need them):
- Application Root path: ____________________
- Node.js version: ____________________
- Application URL: ____________________

---

## Step 4: Upload Files to cPanel

### Option A: Using cPanel File Manager

1. In cPanel, click **"File Manager"**
2. Navigate to your domain's folder (usually `public_html`)
3. Create a folder called `quanqua` (or your application root)
4. Upload these folders/files:
   ```
   ✓ .next/           (production build)
   ✓ app/             (application code)
   ✓ public/           (static assets)
   ✓ package.json
   ✓ package-lock.json
   ✓ next.config.ts
   ✓ tsconfig.json
   ✓ .env.local        (your API key)
   ✓ node_modules/     (or install on server)
   ```

### Option B: Using FTP

1. Get FTP credentials from cPanel
2. Use FTP client (FileZilla, Cyberduck, etc.)
3. Connect to your server
4. Navigate to your domain folder
5. Upload the same files as above

---

## Step 5: Install Dependencies

### 5.1 Access Terminal in cPanel

1. In cPanel, find **"Terminal"** or **"SSH Access"**
2. Click to open terminal
3. Navigate to your application folder:
   ```bash
   cd ~/quanqua
   ```
   (Replace with your actual application root path)

### 5.2 Install Node Modules

```bash
# Install production dependencies
npm install --production
```

Wait for installation to complete.

---

## Step 6: Configure Environment Variables

### 6.1 Set Environment Variables in Node.js App

1. Go back to **"Node.js Selector"** in cPanel
2. Find your application
3. Click **"Edit"**
4. In **"Environment Variables"** section, add:
   ```
   Name: GOOGLE_CLOUD_API_KEY
   Value: your_api_key_here
   ```
5. Click **"Save"**

### 6.2 Verify Environment Variables

Make sure the variables are set correctly:
- GOOGLE_CLOUD_API_KEY should be set
- NODE_ENV should be "production" (if applicable)

---

## Step 7: Start the Application

### 7.1 Start Node.js App

In your Node.js Selector:
1. Find your Quanqua application
2. Click **"Start"** button
3. Wait for the application to start
4. Check the status - it should show "Running"

### 7.2 Check Application Logs

1. In Node.js Selector, click **"View Logs"**
2. Look for any error messages
3. If you see errors, note them down for troubleshooting

---

## Step 8: Test Your Website

### 8.1 Visit Your Domain

1. Open a web browser
2. Go to your domain (e.g., https://quanqua.com)
3. You should see the Quanqua homepage

### 8.2 Test Features

Test each feature to ensure it works:
- [ ] Page loads correctly
- [ ] Translation works
- [ ] Language selection works
- [ ] History button appears (after translating)
- [ ] About page loads
- [ ] Privacy page loads
- [ ] Mobile view works

---

## Step 9: Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Page Not Found" or 404 Error

**Solution**:
1. Check that `public_html` is the document root
2. Verify Node.js application URL points to correct path
3. Restart the Node.js application

#### Issue 2: "Translation Failed" Error

**Solution**:
1. Verify API key is set correctly in environment variables
2. Check Google Cloud Console that API is enabled
3. Verify billing is enabled in Google Cloud
4. Check application logs for specific errors

#### Issue 3: "Internal Server Error"

**Solution**:
1. Check application logs in cPanel
2. Verify all files were uploaded correctly
3. Ensure node_modules folder exists
4. Try restarting the Node.js application

#### Issue 4: Slow Loading Times

**Solution**:
1. Enable caching if available
2. Optimize images
3. Use CDN if available in your hosting plan
4. Consider upgrading hosting plan

---

## Step 10: Monitor and Maintain

### 10.1 Check Application Status

Regularly check:
- Application is running in Node.js Selector
- No errors in application logs
- Website is accessible

### 10.2 Monitor API Usage

In Google Cloud Console:
1. Go to APIs & Services
2. View Cloud Translation API usage
3. Set up billing alerts

### 10.3 Keep Updated

To update your site:
1. Make changes locally
2. Rebuild: `npm run build`
3. Upload new `.next` folder
4. Restart application in cPanel

---

## Important Notes

### Security
- ❌ **Never** commit `.env.local` to Git
- ✅ Always use HTTPS (SSL certificate)
- ✅ Keep API key secure

### Performance
- Use production build (`npm run build`)
- Enable caching where possible
- Monitor API usage

### Backup
- Download a backup of your files regularly
- Save your `.env.local` file securely
- Note your Node.js configuration

---

## Quick Reference

### Essential Commands
```bash
# Build for production
npm run build

# Test production build locally
npm start

# Check Node.js version (required 18+)
node --version
```

### Important Paths
- Application Root: `/home/username/quanqua`
- Public Access: Your domain URL
- Logs: cPanel → Node.js Selector → View Logs

### Support Resources
- `TROUBLESHOOTING.md` - Common issues
- `API_SETUP_CHECK.md` - API setup
- `README.md` - General documentation

---

## You're Done! 🎉

If everything worked, your Quanqua translation website should now be live at your domain!

**Next Steps**:
1. Test all features thoroughly
2. Set up SSL certificate (if not auto-enabled)
3. Configure Google Search Console
4. Monitor site performance
5. Share your site with users!

Good luck! 🚀

