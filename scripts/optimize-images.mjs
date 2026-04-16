import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const imagePairs = [
  ['public/images/perfil.png', 'public/images/perfil.webp'],
  ['public/images/projects/customer-profile-analytics.png', 'public/images/projects/customer-profile-analytics.webp'],
  ['public/images/projects/esports-dashboard.png', 'public/images/projects/esports-dashboard.webp'],
  ['public/images/projects/powerbi-dashboard.png', 'public/images/projects/powerbi-dashboard.webp'],
  ['public/images/projects/rice-system.png', 'public/images/projects/rice-system.webp'],
  ['public/images/projects/pingpong-analysis.png', 'public/images/projects/pingpong-analysis.webp'],
  ['public/images/projects/nasa-space-apps.png', 'public/images/projects/nasa-space-apps.webp'],
];

const run = async () => {
  for (const [inputPath, outputPath] of imagePairs) {
    const absoluteInput = resolve(process.cwd(), inputPath);
    const absoluteOutput = resolve(process.cwd(), outputPath);

    if (!existsSync(absoluteInput)) {
      console.log(`Skipping ${inputPath}: source image not found.`);
      continue;
    }

    mkdirSync(dirname(absoluteOutput), { recursive: true });

    await sharp(absoluteInput)
      .rotate()
      .webp({
        quality: 82,
        effort: 6,
      })
      .toFile(absoluteOutput);

    console.log(`Optimized ${inputPath} -> ${outputPath}`);
  }
};

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
