# 🌐 DOMAIN SETUP GUIDE - ctrlplusc.com

## Overview
Configure your Namecheap domain `ctrlplusc.com` to point to your Vercel deployment for a professional branded experience.

---

## 🎯 QUICK SETUP (5 minutes)

### Step 1: Add Domain in Vercel Dashboard
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Add both:
   - `ctrlplusc.com` (primary)
   - `www.ctrlplusc.com` (redirect to primary)

### Step 2: Configure DNS in Namecheap
1. Login to [Namecheap Dashboard](https://namecheap.com)
2. Go to **Domain List** → **Manage** next to `ctrlplusc.com`
3. Navigate to **Advanced DNS** tab
4. Add these records:

```
Type: A Record
Host: @
Value: 76.76.19.19
TTL: Automatic

Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

### Step 3: Verify Configuration
- DNS propagation: 5-30 minutes
- SSL certificate: Auto-provisioned by Vercel
- Test: `https://ctrlplusc.com` should load your site

---

## 🔧 DETAILED CONFIGURATION

### DNS Records Explanation

**A Record (@)**
- Points root domain to Vercel's IP
- Host: `@` (represents ctrlplusc.com)
- Value: `76.76.19.19` (Vercel's IPv4)

**CNAME Record (www)**
- Points www subdomain to Vercel
- Host: `www`
- Value: `cname.vercel-dns.com`

### Alternative: Vercel Nameservers (Advanced)
If you want Vercel to manage all DNS:

1. In Vercel: Settings → Domains → Use Vercel DNS
2. Copy provided nameservers
3. In Namecheap: Domain → Nameservers → Custom DNS
4. Add Vercel nameservers

---

## 🚀 SSL CERTIFICATE

### Automatic Setup
- Vercel auto-provisions Let's Encrypt SSL
- Usually takes 30 seconds to 10 minutes
- No action required from your side

### Verification
```bash
# Check SSL status
curl -I https://ctrlplusc.com

# Expected response includes:
HTTP/2 200
server: Vercel
```

---

## 🧪 TESTING CHECKLIST

### Domain Resolution
- [ ] `ctrlplusc.com` loads website
- [ ] `www.ctrlplusc.com` redirects to main domain
- [ ] HTTPS automatically enforced
- [ ] SSL certificate valid (green lock icon)

### DNS Propagation Check
Use these tools to verify DNS propagation:
- https://dnschecker.org/
- https://whatsmydns.net/

### Performance Verification
```bash
# Test response time
curl -w "@curl-format.txt" -o /dev/null -s "https://ctrlplusc.com"

# Expected: <2 second response time globally
```

---

## 🔍 TROUBLESHOOTING

### Common Issues:

**Domain not resolving:**
- Wait for DNS propagation (up to 48 hours)
- Clear DNS cache: `ipconfig /flushdns` (Windows)
- Check DNS records in Namecheap

**SSL errors:**
- Ensure both www and root domains added in Vercel
- Wait for certificate provisioning
- Try incognito/private browsing mode

**Redirect loops:**
- Verify CNAME points to `cname.vercel-dns.com`
- Check Vercel domain configuration
- Ensure no conflicting redirects in Namecheap

### DNS Propagation Times:
- Local ISP: 5-30 minutes
- Global propagation: 2-24 hours
- Full propagation: Up to 48 hours

---

## 📊 MONITORING & ANALYTICS

### Domain Analytics Setup
Once domain is live, verify:

1. **Google Analytics**: Update property URL to `ctrlplusc.com`
2. **Hotjar**: Update site URL in settings
3. **Search Console**: Add property for new domain
4. **Social Media**: Update links to use custom domain

### Performance Monitoring
```javascript
// Test API endpoint with custom domain
fetch('https://ctrlplusc.com/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com' })
});
```

---

## 🎉 LAUNCH CHECKLIST

Final verification before announcing launch:

- [ ] **Domain resolves**: Both ctrlplusc.com and www work
- [ ] **SSL active**: Green lock icon in browser
- [ ] **API functional**: Email submissions work
- [ ] **Analytics tracking**: GA4 and Hotjar active
- [ ] **Performance**: PageSpeed score >90
- [ ] **Mobile responsive**: Tested on devices
- [ ] **SEO ready**: Meta tags and schema markup active

---

## 🚀 POST-LAUNCH

### Immediate Actions (Day 1):
1. Test email collection functionality
2. Monitor server response times
3. Check analytics data flow
4. Test on multiple devices/browsers

### Week 1 Monitoring:
- Traffic patterns and sources
- Conversion rate optimization
- User behavior analysis
- Technical performance metrics

**🎯 Your branded domain will be live and ready for professional marketing!**