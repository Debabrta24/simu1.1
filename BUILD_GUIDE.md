# Logic Gates Simulator - Complete Build & Export Guide

## 📦 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

### 3. Export Static Files
```bash
node export-static.js
```

## 🏗️ Build Process Explained

### What Happens During Build?

The `npm run build` command:

1. **Frontend Build (Vite)**
   - Compiles TypeScript to JavaScript
   - Bundles React components
   - Processes Tailwind CSS
   - Optimizes images and assets
   - Generates source maps
   - Output: `dist/public/`

2. **Backend Build (esbuild)**
   - Compiles server TypeScript
   - Bundles Express server
   - Output: `dist/index.js`

### Build Output Structure

```
dist/
├── public/                    # Frontend static files
│   ├── index.html            # Main HTML (entry point)
│   ├── assets/
│   │   ├── index.[hash].js   # Main JS bundle (~200-400KB)
│   │   ├── index.[hash].css  # Main CSS bundle (~50-100KB)
│   │   └── [other assets]    # Images, fonts, etc.
│   └── [static files]
└── index.js                  # Server bundle (for Node.js hosting)
```

## 📤 Export Methods

### Method 1: Automatic Export Script (Recommended)

```bash
node export-static.js
```

**Output:** `exported-site/` folder with:
- All static files
- README.md with deployment instructions
- DEPLOYMENT_INFO.json with build metadata

### Method 2: Manual Export

1. Build the project:
```bash
npm run build
```

2. Copy files from `dist/public/`:
```bash
cp -r dist/public/* your-deployment-folder/
```

### Method 3: Direct Deploy

```bash
# Vercel
npm run build && vercel --prod

# Netlify
npm run build && netlify deploy --prod --dir=dist/public

# GitHub Pages
npm run build && gh-pages -d dist/public
```

## 🌐 Deployment Platforms

### Vercel (Recommended)

**Automatic Deploy:**
```bash
vercel --prod
```

**Manual Steps:**
1. Go to vercel.com
2. Import repository
3. Vercel auto-detects settings
4. Click Deploy

**Configuration:**
- Framework: None (uses vercel.json)
- Build Command: `npm run build`
- Output Directory: `dist/public`

### Netlify

**Using Netlify CLI:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist/public
```

**Using Netlify Dashboard:**
1. Drag and drop `dist/public` folder
2. Or connect Git repository

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

```bash
npm install -g gh-pages
npm run build
gh-pages -d dist/public
```

### AWS S3 + CloudFront

```bash
# Build
npm run build

# Sync to S3
aws s3 sync dist/public/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### Traditional Web Hosting (cPanel, FTP)

1. Build: `npm run build`
2. Upload `dist/public/` contents via FTP
3. Add `.htaccess` for Apache:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 📋 Generated Files Reference

### index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Logic Gates Simulator</title>
    <link rel="stylesheet" href="/assets/index.[hash].css">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index.[hash].js"></script>
  </body>
</html>
```

### JavaScript Bundle (index.[hash].js)
- React application
- All components and logic
- State management
- Circuit animations
- UI interactions

### CSS Bundle (index.[hash].css)
- Tailwind CSS utilities
- Custom component styles
- Dark mode styles
- Animation definitions
- Responsive breakpoints

## 🔧 Configuration

### Environment Variables

For development:
```env
NODE_ENV=development
PORT=5000
```

For production (if needed):
```env
NODE_ENV=production
DATABASE_URL=your_db_url  # Optional
```

### Base Path Configuration

If deploying to subdirectory (e.g., `/app/`):

**vite.config.ts:**
```ts
export default defineConfig({
  base: '/app/',
  // ... other config
})
```

Then rebuild:
```bash
npm run build
```

## 🧪 Testing Built Files

### Local Test Server

**Option 1: Using serve**
```bash
npx serve -s dist/public -p 3000
```

**Option 2: Using Python**
```bash
cd dist/public
python -m http.server 3000
```

**Option 3: Using Node**
```bash
npx http-server dist/public -p 3000
```

Visit: http://localhost:3000

### Verify Build

Checklist:
- ✅ All pages load correctly
- ✅ Routing works (try refreshing on a route)
- ✅ Animations work smoothly
- ✅ Dark mode toggles properly
- ✅ No console errors
- ✅ Assets load correctly

## 📊 Build Optimization

### Bundle Analysis

```bash
npm run build -- --mode=analyze
```

### Size Optimization Tips

1. **Code Splitting** (already implemented)
2. **Tree Shaking** (already implemented)
3. **Asset Optimization**:
   - Images: Use WebP format
   - Icons: Use SVG
   - Fonts: Subset fonts if possible

### Performance Checklist

- ✅ Minified JS/CSS
- ✅ Gzip/Brotli compression
- ✅ HTTP/2 enabled
- ✅ CDN for static assets
- ✅ Cache headers configured
- ✅ Lazy loading implemented

## 🐛 Troubleshooting

### Build Fails

**Error: Out of memory**
```bash
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

**Error: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Blank Page After Deploy

**Check:**
1. Browser console for errors
2. Network tab for 404s
3. Server routing configuration
4. Asset paths in index.html

**Fix:**
- Ensure server redirects 404 to index.html
- Check base path configuration
- Verify all files uploaded

### Slow Load Times

**Solutions:**
1. Enable Gzip on server
2. Use CDN for assets
3. Enable HTTP/2
4. Implement service worker (if needed)

### CSS Not Applied

**Check:**
1. CSS file path in index.html
2. MIME types on server
3. File permissions
4. Cache (try hard refresh)

## 📈 Production Checklist

Before deploying:
- [ ] Run `npm run build` successfully
- [ ] Test locally with `serve`
- [ ] Check all routes work
- [ ] Verify animations
- [ ] Test on mobile devices
- [ ] Check dark mode
- [ ] Review bundle sizes
- [ ] Configure server redirects
- [ ] Set up SSL certificate
- [ ] Configure caching headers
- [ ] Test on different browsers
- [ ] Monitor initial deployment

## 🔗 Useful Links

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev

## 📞 Support

For issues:
1. Check this guide
2. Review EXPORT_INSTRUCTIONS.md
3. Check README_DEPLOYMENT.md
4. Review build logs for errors

## 🎯 Summary

**Quick Deploy to Vercel:**
```bash
npm run build && vercel --prod
```

**Export for Any Host:**
```bash
npm run build && node export-static.js
```

**Files Located At:**
- Built files: `dist/public/`
- Exported files: `exported-site/`

Happy deploying! 🚀
