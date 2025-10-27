# Quanqua Translator - Troubleshooting Guide

## Translation Not Working? "The string did not match the expected pattern"

This error means there's an issue with the Google Translate API configuration.

### Quick Fixes:

#### 1. **Check API Key Format**
Your `.env.local` should contain:
```env
GOOGLE_TRANSLATE_API_KEY=AIzaSy...your_key_here
```

The key should:
- ✅ Start with `AIzaSy`
- ✅ Be exactly 39 characters
- ✅ Have no spaces or extra characters
- ✅ Not include quotes

#### 2. **Enable Cloud Translation API**
Make sure the API is enabled in Google Cloud Console:
1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to "APIs & Services" > "Library"
4. Search for "Cloud Translation API"
5. Click "Enable"

#### 3. **Check Billing**
The API requires:
- ✅ A billing account linked to your project
- ✅ Credits available (free tier: 500,000 chars/month)

#### 4. **Verify API Key Restrictions**
If you have restrictions set:
- Allow requests from `localhost:3001`
- Or temporarily remove restrictions for testing

#### 5. **Test the API Key**
Test in browser console:
```javascript
fetch('https://translation.googleapis.com/language/translate/v2?key=YOUR_KEY', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({q: 'Hello', source: 'en', target: 'am'})
}).then(r => r.json()).then(console.log)
```

### Alternative: Use Mock Translation

If you want to test the UI without the API, you can temporarily use mock translations.

---

## Common Issues & Solutions

### Issue: "Translation API key not configured"
**Solution:** Create `.env.local` with your API key

### Issue: "Invalid API key"
**Solution:** Regenerate the key in Google Cloud Console

### Issue: "API key expired"
**Solution:** API keys don't expire, but restrictions might block it

### Issue: "Quota exceeded"
**Solution:** You've used all free tier credits, wait for reset or upgrade

---

## Getting Your API Key

1. **Go to Google Cloud Console**
   https://console.cloud.google.com/

2. **Create or Select Project**
   - Click project dropdown
   - Click "NEW PROJECT"
   - Name it "Quanqua Translator"
   - Click "CREATE"

3. **Enable Translation API**
   - APIs & Services > Library
   - Search "Cloud Translation API"
   - Click "ENABLE"

4. **Create API Key**
   - APIs & Services > Credentials
   - Click "CREATE CREDENTIALS" > "API Key"
   - Copy the key

5. **Add to .env.local**
   ```bash
   echo "GOOGLE_TRANSLATE_API_KEY=your_key_here" > .env.local
   ```

6. **Restart Server**
   ```bash
   npm run dev
   ```

---

## Test Your Setup

After configuring, test with these translations:

- English → Amharic: "Hello"
- English → Tigrigna: "Thank you"  
- Amharic → English: "ሰላም"

---

## Need Help?

Check the browser console for detailed error messages. The app will log all API errors for debugging.

