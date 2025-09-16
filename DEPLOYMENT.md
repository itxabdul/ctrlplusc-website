# Deployment Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Update Analytics IDs in index.html:**
   - Replace `GA_MEASUREMENT_ID` with your Google Analytics ID
   - Replace `HOTJAR_ID` with your Hotjar site ID

4. **Start server:**
   ```bash
   npm start
   ```

## Production Deployment Options

### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### 2. Netlify
- Connect GitHub repo
- Build command: `npm run build` (if needed)
- Publish directory: `.`

### 3. Railway/Render
- Connect GitHub repo
- Add environment variables
- Deploy with Node.js runtime

### 4. VPS (DigitalOcean/AWS)
```bash
# Install Node.js
# Clone repo
# Install dependencies
# Set up PM2 or similar process manager
pm2 start backend-api.js --name ctrlc-website
```

## Analytics Setup

1. **Google Analytics 4:**
   - Create property at analytics.google.com
   - Copy measurement ID (G-XXXXXXXXXX)
   - Replace in index.html

2. **Hotjar:**
   - Create account at hotjar.com
   - Copy site ID
   - Replace in index.html

## Domain Setup

1. Point domain to your deployment
2. Update Open Graph URLs in index.html
3. Generate SSL certificate (automatic with most platforms)

## Monitoring

- Check `/api/health` endpoint
- Monitor `waitlist-emails.json` for signups
- Review analytics dashboard regularly

## Security Checklist

✅ Rate limiting enabled
✅ CORS configured
✅ Helmet security headers
✅ Input validation
✅ No sensitive data in client
✅ Environment variables secured