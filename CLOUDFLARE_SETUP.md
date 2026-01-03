# Cloudflare Pages Environment Variables Setup

## Required Environment Variable for TireRaven API

To enable the TireRaven API integration on your Cloudflare Pages deployment, you need to add the API key as an environment variable.

---

## Step-by-Step Instructions

### 1. **Log in to Cloudflare Dashboard**
Visit: https://dash.cloudflare.com

### 2. **Navigate to Your Pages Project**
1. Click on "Workers & Pages" in the left sidebar
2. Select your project: `losreyestires-onlineshop`

### 3. **Go to Settings**
Click on the "Settings" tab at the top of the project page

### 4. **Add Environment Variable**
1. Scroll down to "Environment Variables" section
2. Click "Add variable" or "Edit variables"
3. Add the following:

```
Variable name: NEXT_PUBLIC_TIRERAVEN_API_KEY
Value: tireraven_live_e561279385760a19fd9ce9b9c177419cca92f6cec9afbd97f83b647e424373c7
```

4. Select which environments to apply to:
   - ✅ **Production** (recommended)
   - ✅ **Preview** (optional, for testing)

5. Click "Save"

### 5. **Redeploy Your Site**
After adding the environment variable, you need to trigger a new deployment:

**Option A: Via Git Push**
```bash
git commit --allow-empty -m "Trigger redeploy for env vars"
git push origin main
```

**Option B: Via Cloudflare Dashboard**
1. Go to "Deployments" tab
2. Click "Retry deployment" on the latest deployment
3. Or click "Create deployment" to make a new one

---

## Verification

### Check if Environment Variable is Set

After redeployment, verify the API is working:

1. **Visit your live site**: https://6c9058b7.losreyestires-onlineshop.pages.dev/tires
2. **Open browser console** (F12 → Console tab)
3. **Look for this message**: `"Loaded X tires from TireRaven API"`
4. **Verify tire data** shows real products from your inventory

### Expected Console Output
```
Loaded 10 tires from TireRaven API
```

### Expected Page Behavior
- Loading spinner appears briefly
- Tire cards populate with real inventory
- Brands: BLACKHAWK, MOMO, CAPRICORN
- Real pricing: $38 - $115
- Stock quantities visible

---

## Alternative: Use Cloudflare Wrangler CLI

If you have Wrangler CLI installed:

```bash
# Install Wrangler (if not installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Set environment variable
wrangler pages project set-env \
  --project-name=losreyestires-onlineshop \
  --environment=production \
  NEXT_PUBLIC_TIRERAVEN_API_KEY=tireraven_live_e561279385760a19fd9ce9b9c177419cca92f6cec9afbd97f83b647e424373c7
```

---

## Troubleshooting

### Issue: API key not working
**Possible causes:**
- Environment variable not saved correctly
- Site not redeployed after adding variable
- Typo in variable name (must be exact: `NEXT_PUBLIC_TIRERAVEN_API_KEY`)
- API key expired or invalid

**Solutions:**
1. Double-check variable name spelling
2. Verify variable is set for "Production" environment
3. Trigger a new deployment
4. Check browser console for error messages

### Issue: Still seeing fallback data
**Possible causes:**
- API key not set in Cloudflare
- Build cache issue
- API endpoint unreachable

**Solutions:**
1. Clear Cloudflare Pages build cache:
   - Go to Settings → Build cache
   - Click "Clear cache and redeploy"
2. Verify API key is correct
3. Test API manually: `curl -H "X-API-Key: YOUR_KEY" https://api.tireraven.com/api/external/v1/items`

### Issue: Build fails after adding variable
**Possible causes:**
- Invalid API key format
- Network issue during build

**Solutions:**
1. Check build logs in Cloudflare Pages dashboard
2. Verify API key doesn't contain special characters that need escaping
3. Try wrapping value in quotes if it contains special characters

---

## Security Notes

⚠️ **Important Security Practices**

1. **Never commit API keys to Git**
   - `.env.local` is in `.gitignore` ✅
   - API key is stored securely in Cloudflare

2. **Use `NEXT_PUBLIC_` prefix carefully**
   - This makes the variable available in browser
   - It's safe for read-only API keys
   - Don't use this prefix for sensitive write keys

3. **Rotate keys regularly**
   - Get new API key from TireRaven periodically
   - Update in both `.env.local` and Cloudflare Pages
   - Old deployments will need to be redeployed

4. **Monitor API usage**
   - Check TireRaven dashboard for unusual activity
   - Set up rate limiting if available
   - Monitor Cloudflare Pages logs

---

## Verification Checklist

Before considering the setup complete, verify:

- [ ] Environment variable added in Cloudflare Pages dashboard
- [ ] Variable name is exactly: `NEXT_PUBLIC_TIRERAVEN_API_KEY`
- [ ] Variable value is the correct API key
- [ ] Variable is set for "Production" environment
- [ ] Site has been redeployed after adding variable
- [ ] Browser console shows: "Loaded X tires from TireRaven API"
- [ ] Tire catalog shows real products (BLACKHAWK, MOMO, etc.)
- [ ] Pricing matches TireRaven inventory ($38-$115)
- [ ] Stock quantities are visible on product cards

---

## Next Steps After Setup

Once the environment variable is working:

1. **Test the tire finder**
   - Try searching by vehicle (e.g., 2024 Toyota Camry)
   - Verify it shows relevant tire sizes
   - Check that results come from real inventory

2. **Monitor performance**
   - Check page load times on /tires
   - Verify API caching is working (5-minute cache)
   - Look for any console errors

3. **Add more inventory**
   - Expand your TireRaven catalog
   - New tires will automatically appear on the site
   - No code changes needed!

---

**Setup Complete! 🎉**

Your Los Reyes Tires online shop is now fully integrated with the TireRaven API and will display real-time inventory to customers.
