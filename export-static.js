#!/usr/bin/env node

/**
 * Export Static Site Script
 * This script copies the built static files to an export directory
 * Ready for deployment to any static hosting provider
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, 'dist', 'public');
const EXPORT_DIR = path.join(__dirname, 'exported-site');

function copyFolderRecursive(source, target) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Read source directory
  const files = fs.readdirSync(source);

  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      // Recursively copy subdirectories
      copyFolderRecursive(sourcePath, targetPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✓ Copied: ${file}`);
    }
  });
}

function main() {
  console.log('🚀 Logic Gates Simulator - Static Export\n');

  // Check if build exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('❌ Error: Build directory not found!');
    console.error('Please run "npm run build" first.\n');
    process.exit(1);
  }

  // Remove existing export directory
  if (fs.existsSync(EXPORT_DIR)) {
    console.log('🗑️  Removing existing export directory...');
    fs.rmSync(EXPORT_DIR, { recursive: true, force: true });
  }

  // Copy files
  console.log('📦 Copying files to export directory...\n');
  copyFolderRecursive(SOURCE_DIR, EXPORT_DIR);

  // Create deployment info file
  const deploymentInfo = {
    exportDate: new Date().toISOString(),
    version: JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')).version,
    files: fs.readdirSync(EXPORT_DIR),
    instructions: 'Upload all files in this directory to your web server'
  };

  fs.writeFileSync(
    path.join(EXPORT_DIR, 'DEPLOYMENT_INFO.json'),
    JSON.stringify(deploymentInfo, null, 2)
  );

  // Create README
  const readmeContent = `# Logic Gates Simulator - Exported Static Site

## Deployment Instructions

This folder contains the complete static website ready for deployment.

### Files Included:
- index.html - Main entry point
- assets/ - JavaScript, CSS, and other assets
- Additional resources

### Quick Deploy:

1. **Simple Web Server:**
   Upload all files to your web hosting provider.

2. **Important Configuration:**
   - Ensure your server redirects all routes to index.html
   - This is necessary for client-side routing to work

3. **Test Locally:**
   \`\`\`bash
   npx serve -s .
   \`\`\`

### Server Configuration Examples:

**Nginx:**
\`\`\`nginx
location / {
    try_files $uri $uri/ /index.html;
}
\`\`\`

**Apache (.htaccess):**
\`\`\`apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
\`\`\`

### Hosting Providers:

- **Netlify**: Drag and drop this folder
- **Vercel**: Run \`vercel --prod\` in this directory
- **GitHub Pages**: Push to gh-pages branch
- **AWS S3**: Upload and configure as static website
- **Any Web Server**: Upload via FTP/SFTP

Exported on: ${new Date().toLocaleString()}
`;

  fs.writeFileSync(path.join(EXPORT_DIR, 'README.md'), readmeContent);

  // Success message
  console.log('\n✨ Export completed successfully!\n');
  console.log(`📂 Files exported to: ${EXPORT_DIR}`);
  console.log(`📄 Total files: ${countFiles(EXPORT_DIR)}`);
  console.log(`💾 Total size: ${getFolderSize(EXPORT_DIR)}\n`);
  console.log('Next steps:');
  console.log('1. Navigate to exported-site/ folder');
  console.log('2. Upload all files to your web hosting provider');
  console.log('3. Configure server to redirect routes to index.html');
  console.log('\nFor detailed instructions, see EXPORT_INSTRUCTIONS.md\n');
}

function countFiles(dir) {
  let count = 0;
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      count += countFiles(filePath);
    } else {
      count++;
    }
  });
  
  return count;
}

function getFolderSize(dir) {
  let size = 0;
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      size += parseFloat(getFolderSize(filePath));
    } else {
      size += fs.statSync(filePath).size;
    }
  });
  
  return formatBytes(size);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

main();
