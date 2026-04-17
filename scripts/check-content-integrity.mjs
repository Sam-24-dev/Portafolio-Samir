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
  { label: 'smart quotes / arrow mojibake', regex: /â†’|â€™|â€œ|â€/ },
];

const requiredSnippets = [
  {
    file: 'src/lib/portfolioRoute.ts',
    snippets: ['/engineering/how-i-work', '/engineering/strengths', 'engineering-how-i-work'],
  },
  {
    file: 'src/data/routeContent.ts',
    snippets: ['canonicalPath: \'/\''],
  },
  {
    file: 'src/data/engineeringContent.ts',
    snippets: ['canonicalPath: \'/engineering\''],
  },
];

const problems = [];

for (const file of filesToScan) {
  const text = readFileSync(resolve(process.cwd(), file), 'utf8');

  for (const pattern of mojibakePatterns) {
    if (pattern.regex.test(text)) {
      problems.push(`${file}: found ${pattern.label}`);
    }
  }
}

for (const entry of requiredSnippets) {
  const text = readFileSync(resolve(process.cwd(), entry.file), 'utf8');

  for (const snippet of entry.snippets) {
    if (!text.includes(snippet)) {
      problems.push(`${entry.file}: missing required snippet ${snippet}`);
    }
  }
}

if (problems.length > 0) {
  console.error('Content integrity check failed:');
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exit(1);
}

console.log(`Verified content integrity across ${filesToScan.length} files and ${requiredSnippets.length} route checks.`);
