import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const requiredAssets = [
  'public/robots.txt',
  'public/sitemap.xml',
  'public/og-image.jpg',
  'public/favicon.svg',
  'public/cv/SamirCaizapastoCV.pdf',
];

const missingAssets = requiredAssets.filter((asset) => !existsSync(resolve(process.cwd(), asset)));

if (missingAssets.length > 0) {
  console.error('Missing required public assets:');
  missingAssets.forEach((asset) => console.error(`- ${asset}`));
  process.exit(1);
}

console.log(`Verified ${requiredAssets.length} required public assets.`);
