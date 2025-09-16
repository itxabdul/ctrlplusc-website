# Analytics Setup Guide

## Google Analytics 4 Setup

1. Create GA4 property at https://analytics.google.com
2. Replace `GA_MEASUREMENT_ID` in index.html with your measurement ID (format: G-XXXXXXXXXX)

## Hotjar Setup

1. Create account at https://www.hotjar.com
2. Replace `HOTJAR_ID` in index.html with your site ID

## Tracked Events

### Conversion Events
- `waitlist_signup_attempt` - User submits form
- `waitlist_signup_success` - Email successfully saved
- `waitlist_signup_error` - Form validation error

### Engagement Events
- `page_view` - Initial page load
- `scroll_25_percent` - User scrolls 25% of page
- `scroll_50_percent` - User scrolls 50% of page
- `scroll_75_percent` - User scrolls 75% of page
- `time_on_page` - Time spent before leaving (in seconds)

## A/B Testing Framework

The current implementation supports easy A/B testing:

1. **Headlines**: Change h1 text
2. **CTAs**: Modify button text/color
3. **Features**: Add/remove feature blocks
4. **Social proof**: Update user count in subtitle

## Performance Monitoring

Built-in performance optimizations:
- Font preloading
- Minimal CSS (inline)
- No external dependencies
- Lazy loading ready
- Mobile-first responsive

## Conversion Funnel

1. Page view
2. Scroll engagement
3. Email input focus
4. Form submission
5. Success confirmation

Monitor drop-off rates at each stage to optimize conversion.