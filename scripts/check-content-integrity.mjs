import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const filesToScan = [
  'src/data/routeContent.ts',
  'src/data/engineeringContent.ts',
  'src/data/translations.ts',
  'src/data/projects.ts',
  'src/data/caseStudies.ts',
  'AGENTS.md',
  'docs/roadmap-v2.md',
  'docs/iterations/phase-05-ops-and-automation.md',
];

const mojibakePatterns = [
  { label: 'replacement character', regex: /\uFFFD/ },
  { label: 'latin-1 mojibake lead byte', regex: /\u00C3|\u00C2/ },
  { label: 'smart quotes / arrow mojibake', regex: /Ã¢â€ â€™|Ã¢â‚¬â„¢|Ã¢â‚¬Å“|Ã¢â‚¬/ },
];

const problems = [];
let verifiedFileCount = 0;

const readTextFile = (file) => {
  try {
    return readFileSync(resolve(process.cwd(), file), 'utf8');
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'unknown read error';
    problems.push(`${file}: missing or unreadable (${reason})`);
    return null;
  }
};

for (const file of filesToScan) {
  const text = readTextFile(file);

  if (text === null) {
    continue;
  }

  verifiedFileCount += 1;

  for (const pattern of mojibakePatterns) {
    if (pattern.regex.test(text)) {
      problems.push(`${file}: found ${pattern.label}`);
    }
  }
}

if (problems.length > 0) {
  console.error('Content integrity check failed:');
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exit(1);
}

console.log(`Verified content integrity across ${verifiedFileCount} files.`);
