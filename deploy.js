const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const projectName = 'recipe-collection';
const buildCommand = 'npm run build';
const outputDir = 'out';

console.log('🚀 Starting deployment process...');

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.error('❌ Error: .env.local file not found!');
  console.log('Please create a .env.local file with your Supabase credentials:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
  process.exit(1);
}

// Build the project
console.log('📦 Building the project...');
try {
  execSync(buildCommand, { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Check if the output directory exists
if (!fs.existsSync(outputDir)) {
  console.error(`❌ Error: Output directory '${outputDir}' not found!`);
  process.exit(1);
}

console.log('🎉 Deployment preparation complete!');
console.log('');
console.log('To deploy to Netlify:');
console .log('1. Install Netlify CLI: npm install -g netlify-cli');
console.log('2. Login to Netlify: netlify login');
console.log('3. Initialize site: netlify init');
console.log('4. Deploy: netlify deploy --prod');
console.log('');
console.log('To deploy to Vercel:');
console.log('1. Install Vercel CLI: npm install -g vercel');
console.log('2. Login to Vercel: vercel login');
console.log('3. Deploy: vercel --prod');