import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const batchSize = Math.max(1, Number.parseInt(process.env.VITEST_BATCH_SIZE ?? '1', 10) || 1);
const explicitArgs = process.argv.slice(2);
const vitestEntry = path.join(rootDir, 'node_modules', 'vitest', 'vitest.mjs');
const nodeBin = process.execPath;

const testFilePattern = /\.test\.(ts|tsx)$/;

const collectTestFiles = (startDir) => {
  const absoluteStart = path.join(rootDir, startDir);
  const entries = readdirSync(absoluteStart, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(absoluteStart, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectTestFiles(path.join(startDir, entry.name)));
      continue;
    }

    if (entry.isFile() && testFilePattern.test(entry.name)) {
      files.push(path.relative(rootDir, absolutePath));
    }
  }

  return files;
};

const runVitest = (args) => {
  const result = spawnSync(nodeBin, [vitestEntry, 'run', ...args], {
    cwd: rootDir,
    env: process.env,
    stdio: 'inherit',
    windowsHide: true,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

if (explicitArgs.length > 0) {
  runVitest(explicitArgs);
  process.exit(0);
}

const testFiles = [...collectTestFiles('src'), ...collectTestFiles('api')].sort((left, right) => left.localeCompare(right));

if (testFiles.length === 0) {
  console.warn('No test files found.');
  process.exit(0);
}

for (let index = 0; index < testFiles.length; index += batchSize) {
  const batch = testFiles.slice(index, index + batchSize);
  const batchNumber = Math.floor(index / batchSize) + 1;
  const totalBatches = Math.ceil(testFiles.length / batchSize);

  console.log(`\nRunning Vitest batch ${batchNumber}/${totalBatches} (${batch.length} files)...`);
  runVitest(batch);
}
