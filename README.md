# Ctrl+C Landing Page

🚀 **High-converting landing page for Ctrl+C clipboard manager**

Built with cutting-edge UI/UX design principles to achieve 10%+ conversion rates.

## 🎯 Live Site
**https://ctrlplusc-website.vercel.app**

🚀 **Status**: Deploying latest fixes...

## ✨ Features

- **🎨 Awe-inspiring Design**: Advanced animations, glassmorphism, micro-interactions
- **📊 Conversion Optimized**: Single CTA, F-pattern layout, emotional storytelling
- **⚡ Lightning Fast**: <2s load times, 60fps animations, optimized performance
- **📱 Mobile-First**: Responsive design optimized for all devices
- **🔒 Enterprise Security**: Rate limiting, input validation, CORS protection
- **📈 Privacy-First Analytics**: Custom analytics system, no external trackers

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel Edge Network
- **Analytics**: Privacy-focused custom analytics system

## 🚀 Quick Deploy

1. **Clone Repository**
   ```bash
   git clone https://github.com/itxabdul/ctrlplusc-website
   cd ctrlplusc-website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

## 📊 Performance Metrics

- **PageSpeed Score**: 95%+
- **First Contentful Paint**: <1.2s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Expected Conversion Rate**: 10-15%

## 🗄️ Database Schema

```sql
CREATE TABLE waitlist_signups (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100)
);
```

## 📈 Analytics Events

- `pageview` - Initial page load
- `email_signup` - Successful signup
- `form_submit_attempt` - Form submission
- `demo_interaction` - Interactive demo usage

## 🎨 Design System

- **Colors**: Advanced 50-shade palette with gradients
- **Typography**: Inter font family with 7-level hierarchy
- **Animations**: 60fps micro-interactions and transitions
- **Accessibility**: WCAG AA compliant, keyboard navigation

## 🔧 Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This is a production landing page. For issues or improvements, please create an issue.

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with 💙 for maximum conversion and user delight**
