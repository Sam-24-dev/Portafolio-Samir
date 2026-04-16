import { describe, expect, it } from 'vitest';
import { analystRouteContent, engineeringRouteContent, routeSwitchContent } from './routeContent';

describe('routeContent', () => {
  it('keeps analyst and engineering metadata distinct by route', () => {
    expect(analystRouteContent.en.metadata.canonicalPath).toBe('/');
    expect(engineeringRouteContent.en.metadata.canonicalPath).toBe('/engineering');
    expect(analystRouteContent.en.metadata.title).not.toBe(engineeringRouteContent.en.metadata.title);
    expect(analystRouteContent.en.metadata.description).not.toBe(engineeringRouteContent.en.metadata.description);
  });

  it('keeps the shared route switch labels stable while route copy stays separated', () => {
    expect(routeSwitchContent.en.analyst).toBe('Data Analyst');
    expect(routeSwitchContent.en.engineer).toBe('Data Engineer');
    expect(analystRouteContent.en.exploreEngineering).toBe('Explore Data Engineering');
    expect(engineeringRouteContent.en.hero.primaryCta).toBe('View Projects');
  });

  it('stores route-aware navigation and contact copy by profile', () => {
    expect(analystRouteContent.en.navigation.map((item) => item.label)).toEqual([
      'Home',
      'About',
      'Projects',
      'Strengths',
      'Contact',
    ]);
    expect(engineeringRouteContent.en.navigation.map((item) => item.label)).toEqual([
      'Home',
      'Projects',
      'Stack',
      'How I work',
      'Contact',
    ]);
    expect(analystRouteContent.en.contactSupportCopy).toContain('clear analysis');
    expect(engineeringRouteContent.en.contactSupportCopy).toContain('build reliable pipelines');
  });

  it('keeps the spanish analyst metadata free of mojibake', () => {
    const serialized = JSON.stringify(analystRouteContent.es.metadata);

    expect(serialized).not.toContain('Ã');
    expect(serialized).not.toContain('ï¿½');
    expect(analystRouteContent.es.metadata.description).toContain('análisis estadístico');
    expect(analystRouteContent.es.metadata.ogDescription).toContain('bilingüe');
    expect(analystRouteContent.es.metadata.twitterDescription).toContain('decisión');
  });
});
