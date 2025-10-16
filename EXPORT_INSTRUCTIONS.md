# Export Static HTML/CSS/JS Files

## Quick Export Guide

After building your project, you'll have standalone HTML, CSS, and JS files that can be deployed anywhere.

### Step 1: Build the Project

```bash
npm run build
```

This creates optimized production files in the `dist/public` directory.

### Step 2: Locate the Files

The build process generates the following structure:

```
dist/
└── public/
    ├── index.html          # Main HTML file
    ├── assets/
    │   ├── index-[hash].js    # Main JavaScript bundle
    │   ├── index-[hash].css   # Main CSS bundle
    │   └── [other-assets]     # Images, fonts, etc.
    └── [other-files]
```

### Step 3: Deploy

#### Option A: Upload to Any Web Server

Simply upload the contents of `dist/public/` to your web server.

**Important:** Configure your server to:
- Serve `index.html` for all routes (SPA routing)
- Set appropriate cache headers for assets

#### Option B: Use the Export Script

```bash
node export-static.js
```

This copies all files to `exported-site/` folder ready for deployment.

## Server Configuration Examples

### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist/public;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

## File Structure Explanation

### index.html
- Entry point for the application
- Contains the root div where React mounts
- Loads the JavaScript and CSS bundles

### assets/index-[hash].js
- Bundled JavaScript containing:
  - React application code
  - All circuit logic
  - UI components
  - State management

### assets/index-[hash].css
- Bundled CSS containing:
  - Tailwind CSS utilities
  - Custom styles
  - Component styles
  - Dark mode styles

### Other Assets
- SVG files for icons
- Font files
- Any attached images

## CDN Deployment

For CDN deployment (CloudFlare, AWS CloudFront, etc.):

1. Upload `dist/public/` contents to your CDN
2. Configure:
   - Origin: Your bucket/storage
   - Cache behavior: Cache all static assets
   - Fallback: Redirect 404 to index.html

## Environment Considerations

### API Endpoints

If your app needs API endpoints, ensure:
- API calls use relative URLs (already configured)
- CORS is properly set up on your API server

### Base Path

If deploying to a subdirectory (e.g., example.com/app/):
1. Update `vite.config.ts`:
```js
export default defineConfig({
  base: '/app/'
})
```
2. Rebuild the project

## Testing the Build Locally

```bash
# Install a simple HTTP server
npm install -g serve

# Serve the built files
serve -s dist/public -p 3000
```

Then visit http://localhost:3000

## Optimization Tips

1. **Gzip Compression**: Enable on your server
2. **HTTP/2**: Use for better performance
3. **CDN**: Use for static assets
4. **Caching**: Set long cache times for hashed assets

## Troubleshooting

### Blank Page After Deploy
- Check browser console for errors
- Verify all asset paths are correct
- Ensure server redirects 404s to index.html

### CSS Not Loading
- Check asset path in index.html
- Verify CSS file exists in assets folder
- Check server MIME types

### JavaScript Errors
- Check browser compatibility
- Verify all assets loaded correctly
- Check for CORS issues

## File Sizes

Typical build sizes:
- HTML: ~2-5 KB
- JS Bundle: ~200-400 KB (gzipped: ~60-100 KB)
- CSS Bundle: ~50-100 KB (gzipped: ~10-20 KB)

## Next Steps

1. Build your project: `npm run build`
2. Test locally: `serve -s dist/public`
3. Deploy to your hosting provider
4. Configure server for SPA routing
5. Test in production

For detailed deployment guides, see README_DEPLOYMENT.md
