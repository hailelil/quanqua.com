# Quanqua.com - Multilingual Translation Platform

A modern, responsive translation website built with Next.js and Google Cloud Translation API. Translate seamlessly between English, Amharic, Tigrigna, and Afaan Oromo.

![Quanqua.com](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)

## ✨ Features

### 🌍 Core Translation
- **Multilingual Support**: Translate between English, Amharic (አማርኛ), Tigrigna (ትግርኛ), and Afaan Oromo
- **Bidirectional Translation**: Switch source and target languages with one click
- **Real-time Translation**: Automatic translation as you type
- **Native Language Names**: Beautiful Ge'ez script and native language names displayed

### 🎨 Ethiopian-Themed Design
- **Cultural Identity**: Ethiopian flag colors (green, yellow, red, blue) throughout the interface
- **Educational Footer**: Learn about Ethiopian languages and cultural heritage
- **Clean Interface**: Removed ad clutter for focused translation experience
- **Mobile-First**: Fully responsive design for all devices

### 💡 Enhanced Features
- **Translation History**: Local storage of past translations (up to 50 items)
- **Copy & Share**: One-click copy with visual feedback, native share integration
- **Voice Features**: Text-to-speech playback for all languages
- **Voice Input**: Speech recognition for hands-free translation
- **Character Counter**: Track input length in real-time
- **Swappable Languages**: Beautiful central swap button
- **Loading States**: Smooth spinner animations during translation

### ♿ Accessibility
- **Keyboard Navigation**: Full keyboard support with focus indicators
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **High Contrast**: Optimized text contrast for readability
- **Right-to-Left Support**: Proper RTL support for Ethiopic scripts

### 🔒 Security & Performance
- **Fast & Secure**: API requests proxied through secure Next.js backend
- **Error Handling**: Graceful error messages with retry options
- **Type-Safe**: Full TypeScript implementation
- **Optimized**: Fast load times and smooth animations

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Translation API**: Google Cloud Translation API
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Cloud Platform account (for Translation API key)
- (For deployment) Vercel account or similar hosting service

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd quanqua-com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Cloud Translation API**
   
   a. Go to [Google Cloud Console](https://console.cloud.google.com/)
   
   b. Create a new project or select an existing one
   
   c. Enable the "Cloud Translation API"
   
   d. Go to [Credentials](https://console.cloud.google.com/apis/credentials)
   
   e. Create an API key (restrict it to Cloud Translation API for security)
   
   f. Copy the API key

4. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your API key:
   ```
   GOOGLE_TRANSLATE_API_KEY=your_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
quanqua-com/
├── app/
│   ├── api/
│   │   └── translate/
│   │       └── route.ts         # Translation API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main translation UI
│   └── globals.css               # Global styles
├── public/                       # Static assets
├── .env.local.example            # Environment variables template
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── README.md                     # This file
```

## Deployment

### Quick Deployment Options

1. **Vercel** (Recommended - Easiest)
   - Free hosting with automatic deployments
   - Built-in HTTPS and CDN
   - See [Vercel deployment guide](#deploying-to-vercel) below

2. **GoDaddy cPanel**
   - Requires Node.js server
   - See `GODADDY_DEPLOY.md` for detailed instructions

### Deploying to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import project to Vercel**
   
   a. Go to [Vercel](https://vercel.com)
   
   b. Click "Add New Project"
   
   c. Import your GitHub repository
   
   d. Add environment variable:
      - Name: `GOOGLE_TRANSLATE_API_KEY`
      - Value: Your Google Cloud Translation API key
   
   e. Click "Deploy"

3. **Configure custom domain (Quanqua.com)**
   
   a. In Vercel dashboard, go to "Settings" → "Domains"
   
   b. Add domain: `quanqua.com`
   
   c. Follow DNS configuration instructions:
   
      **If using GoDaddy (recommended DNS records):**
      ```
      Type: A
      Name: @
      Value: 76.76.19.61 (Vercel's IP, check current in Vercel dashboard)
      
      Type: CNAME
      Name: www
      Value: cname.vercel-dns.com
      ```
   
   d. Wait for DNS propagation (can take up to 48 hours)
   
   e. SSL certificate will be automatically provisioned

4. **Update API Key restrictions (if applicable)**
   
   In Google Cloud Console, update your API key restrictions:
   
   - Under "Application restrictions", add your domain: `quanqua.com`
   - Under "API restrictions", ensure "Cloud Translation API" is selected

### Alternative: Deploy to Netlify

1. Follow similar steps as above
2. Set environment variables in Netlify dashboard
3. Configure DNS records provided by Netlify

## Local Development

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## API Usage

### Translation Endpoint

**URL**: `POST /api/translate`

**Request Body**:
```json
{
  "text": "Hello, how are you?",
  "sourceLang": "en",
  "targetLang": "am"
}
```

**Response**:
```json
{
  "translatedText": "ሰላም፣ እንዴት ነህ?",
  "sourceLang": "en",
  "targetLang": "am"
}
```

### Supported Languages

| Code | Language | Flag |
|------|----------|------|
| `en` | English | 🇬🇧 |
| `am` | Amharic | 🇪🇹 |
| `ti` | Tigrigna | 🇪🇷 |
| `om` | Afaan Oromo | 🇪🇹 |

## Cost Estimation

Google Cloud Translation API pricing (as of 2024):
- **Free tier**: 500,000 characters/month
- **Paid**: $20 per 1 million characters

For a small-to-medium website, this should be well within the free tier limits.

## Security Considerations

1. **API Key Security**: Never commit `.env.local` to version control
2. **Rate Limiting**: Consider implementing rate limiting for production
3. **Input Validation**: Server-side validation handles malicious inputs
4. **HTTPS**: Always use HTTPS in production (automatically handled by Vercel)

## Troubleshooting

### "Translation API key not configured"
- Ensure `.env.local` exists with `GOOGLE_TRANSLATE_API_KEY`
- Restart development server after adding environment variables

### "Translation failed"
- Verify API key is valid and has Cloud Translation API enabled
- Check API billing in Google Cloud Console
- Ensure API quota is not exceeded

### "Invalid language code"
- Use correct language codes: `en`, `am`, `ti`, `om`

## Future Enhancements

- [ ] Add dark mode toggle
- [ ] Implement translation history (local storage)
- [ ] Add voice input/output using Web Speech API
- [ ] Add user authentication for history persistence
- [ ] Implement caching to reduce API calls
- [ ] Add more languages
- [ ] Add offline mode with service workers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please open an issue on GitHub or contact support@quanqua.com

---

Built with ❤️ using Next.js, TypeScript, and Google Cloud Translation API
