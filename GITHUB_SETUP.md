# GitHub Setup for Quanqua

Follow these steps to push your project to GitHub and deploy on Vercel.

## Step 1: Create GitHub Repository

1. Go to **https://github.com/new**
2. Repository name: `quanqua`
3. Description: `Ethiopian Language Translator - Amharic, Tigrigna, Afaan Oromo`
4. Choose **Public** (or Private if you prefer)
5. **Do NOT** check "Initialize with README"
6. Click **"Create repository"**

## Step 2: Add and Commit Your Files

In your terminal, run these commands:

```bash
cd /Users/mardaa/senai/quanqua-com

# Add all files
git add .

# Commit
git commit -m "Production ready Quanqua - Ethiopian Language Translator"

# Add the GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/quanqua.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Copy Your GitHub Username

I'll run the commands for you. Just tell me:
- **What's your GitHub username?** (found at github.com/YOUR_USERNAME)

Or I can help you check if you already have one set up locally.

---

## Alternative: Let Me Check Your GitHub Config

I can check if you have a GitHub username configured locally.

