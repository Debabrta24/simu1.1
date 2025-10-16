# Logic Gates Simulator - Deployment Guide

## Project Overview
An interactive educational circuit simulator for learning digital logic gates and combinational circuits.

## Features
- Basic Logic Gates: AND, OR, NOT, NAND, NOR, XOR, XNOR
- Combinational Circuits: Half Adder, Full Adder, Half Subtractor, Full Subtractor
- Advanced Circuits: Decoder, Multiplexer, Comparator, ALU
- Real-time circuit animation showing current flow
- Interactive truth tables
- Power on/off simulation
- Responsive design with dark mode support

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

This project is configured to deploy as a static site to Vercel. The backend is not required as all logic runs in the browser.

#### Quick Deploy
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy directly (Vercel will build automatically):
```bash
vercel --prod
```

**Or build first, then deploy:**
```bash
npm run build
vercel --prod
```

#### Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel will automatically detect the configuration
4. Click "Deploy"

**Configuration (auto-detected from vercel.json):**
- Build Command: `npm run build`
- Output Directory: `dist/public`
- Install Command: `npm install`

### Option 2: Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/public` folder to Netlify
3. Configure redirects in `netlify.toml`:
```toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Static Hosting (GitHub Pages, S3, etc.)

For static hosting, you'll need to export the built files:

1. Build the project:
```bash
npm run build
```

2. The static files will be in `dist/public/`
3. Upload this folder to your static hosting provider

## Environment Variables

No environment variables are required for the basic deployment. If you're using a database, configure:

```env
DATABASE_URL=your_database_url
```

## Build Configuration

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/public
```

### Node Version
- Node.js 20.x or higher recommended

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:5000](http://localhost:5000)

## Production Build

The build process:
1. Compiles TypeScript
2. Bundles frontend with Vite
3. Bundles backend with esbuild
4. Optimizes assets
5. Generates static files

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Code splitting
- Asset optimization
- SVG animations (hardware accelerated)
- Lazy loading
- Caching headers

## Troubleshooting

### Build fails
- Ensure Node.js version >= 20
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

### Animations not working
- Ensure browser supports SVG animations
- Check if hardware acceleration is enabled
- Clear browser cache

### Routing issues
- Ensure rewrites/redirects are configured correctly
- Check that all routes redirect to index.html for SPA routing

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.

## License

MIT License
