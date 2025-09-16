# 🔧 VERCEL ENVIRONMENT VARIABLES CONFIGURATION

## Exact Variables to Add in Vercel Dashboard

Go to: https://vercel.com/dashboard → ctrlplusc-website → Settings → Environment Variables

Add these exact variables:

### 1. SUPABASE_URL
```
SUPABASE_URL=https://fhonpihrlsiolxehogft.supabase.co
```

### 2. SUPABASE_ANON_KEY
```
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZob25waWhybHNpb2x4ZWhvZ2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNTA2NjYsImV4cCI6MjA3MzYyNjY2Nn0.Mq7VuhogcQZm_QlDfODp-Nxd12zFDOoGY0KoGId3omI
```

### 3. NODE_ENV
```
NODE_ENV=production
```

## ⚡ Quick Steps:

1. **Open Vercel Dashboard**: https://vercel.com/dashboard
2. **Select Project**: Click "ctrlplusc-website"
3. **Go to Settings**: Click Settings tab
4. **Environment Variables**: Click "Environment Variables" in sidebar
5. **Add Variables**: Click "Add" for each variable above
6. **Environment**: Select "Production, Preview, Development" for all
7. **Save**: Click "Save" after adding each variable
8. **Redeploy**: Go to Deployments → Click "Redeploy" on latest deployment

## ✅ After Adding Variables:

The Vercel deployment will automatically redeploy and your website will be live with:
- ✅ Fixed 404 error (no more "NOT_FOUND")
- ✅ Working email collection with Supabase
- ✅ Privacy-focused analytics tracking
- ✅ Rate limiting and security features

## 🧪 Test After Deployment:

Visit: https://ctrlplusc-website.vercel.app
- Page should load successfully
- Email form should work
- Analytics should track page views
- No console errors

Your website will be 100% functional after these environment variables are added!