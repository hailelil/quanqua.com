# Google Translate API Setup Check

## Current Status
The Quanqua translator needs a valid Google Translate API key to work.

## Error: "Failed to parse error response"

This error indicates that:
1. ✅ Your API key exists in `.env.local`
2. ❌ The API key might be invalid or expired
3. ❌ The Cloud Translation API might not be enabled
4. ❌ Billing might not be set up

## Quick Setup (5 minutes)

### Step 1: Get Your API Key

1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable "Cloud Translation API":
   - Search for "Cloud Translation API"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "CREATE CREDENTIALS" > "API Key"
   - Copy the key (starts with `AIzaSy...`)

### Step 2: Add to Your Project

Edit `.env.local` and replace with your actual key:
```env
GOOGLE_TRANSLATE_API_KEY=AIzaSy...your_actual_key_here
```

### Step 3: Restart Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test Translation

Try translating "Hello" from English to Amharic. It should return: "ሰላም"

## Alternative: Test with Mock

If you just want to test the UI without API:

The app will show an error message, but you can still:
- ✅ Test the UI layout
- ✅ Try voice input (local)
- ✅ View history feature
- ✅ Test mobile responsiveness
- ✅ Check accessibility features

## Common API Errors

| Error | Solution |
|-------|----------|
| "API key not configured" | Create `.env.local` with GOOGLE_TRANSLATE_API_KEY |
| "Invalid API key" | Get new key from Google Cloud Console |
| "API not enabled" | Enable Cloud Translation API in Console |
| "Quota exceeded" | Free tier: 500k chars/month - wait or upgrade |
| "Permission denied" | Check API key restrictions allow localhost |

## Free Tier Limits

- ✅ **Free**: 500,000 characters/month
- ✅ Perfect for personal/portfolio projects
- ✅ No credit card needed initially
- ⚠️ Free tier expires after trial

---

**Need Help?** See `TROUBLESHOOTING.md` for detailed instructions.

