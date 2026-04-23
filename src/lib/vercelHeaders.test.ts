import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

type HeaderEntry = {
  key: string;
  value: string;
};

type HeaderRule = {
  source: string;
  headers: HeaderEntry[];
};

describe('vercel header hardening', () => {
  it('ships the expected conservative security headers', () => {
    const vercelConfig = JSON.parse(readFileSync(resolve(process.cwd(), 'vercel.json'), 'utf8')) as {
      headers: HeaderRule[];
    };

    const rootHeaders = vercelConfig.headers.find((rule) => rule.source === '/(.*)');

    expect(rootHeaders).toBeDefined();
    expect(rootHeaders?.headers).toEqual(
      expect.arrayContaining([
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ])
    );
    expect(rootHeaders?.headers).not.toEqual(
      expect.arrayContaining([{ key: 'X-XSS-Protection', value: '1; mode=block' }])
    );
  });
});
