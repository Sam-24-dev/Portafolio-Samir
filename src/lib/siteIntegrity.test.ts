import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('public SEO and asset integrity', () => {
  it('ships required public assets for SEO and trust', () => {
    const requiredAssets = [
      'public/robots.txt',
      'public/sitemap.xml',
      'public/og-image.jpg',
      'public/favicon.svg',
      'public/cv/SamirCaizapastoCV.pdf',
    ];

    requiredAssets.forEach((assetPath) => {
      expect(existsSync(resolve(process.cwd(), assetPath)), `${assetPath} should exist`).toBe(true);
    });
  });

  it('includes crawlable robots and sitemap content', () => {
    const robots = readFileSync(resolve(process.cwd(), 'public/robots.txt'), 'utf8');
    const sitemap = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8');
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Sitemap: https://portafolio-samir-tau.vercel.app/sitemap.xml');
    expect(sitemap).toContain('<loc>https://portafolio-samir-tau.vercel.app/</loc>');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('"@type": "Person"');
    expect(html).toContain('"@type": "WebSite"');
  });
});
