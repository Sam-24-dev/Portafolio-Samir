import { describe, expect, it } from 'vitest';
import { analystRouteContent, engineeringRouteContent, routeSwitchContent } from './routeContent';

describe('routeContent', () => {
  const mojibakePattern = /\u00C3|\u00C2|\uFFFD|â†’|â€™|â€œ|â€/;

  it('keeps analyst and engineering metadata distinct by route', () => {
    expect(analystRouteContent.en.metadata.canonicalPath).toBe('/');
    expect(engineeringRouteContent.en.metadata.canonicalPath).toBe('/engineering');
    expect(analystRouteContent.en.metadata.title).not.toBe(engineeringRouteContent.en.metadata.title);
    expect(analystRouteContent.en.metadata.description).not.toBe(engineeringRouteContent.en.metadata.description);
  });

  it('localizes the route switch labels and route-aware CTAs by language', () => {
    expect(routeSwitchContent.en.analyst).toBe('Data Analyst');
    expect(routeSwitchContent.en.engineer).toBe('Data Engineer');
    expect(routeSwitchContent.es.analyst).toBe('Analista de Datos');
    expect(routeSwitchContent.es.engineer).toBe('Ingeniero de Datos');
    expect(analystRouteContent.en.exploreEngineering).toBe('Explore Data Engineering');
    expect(analystRouteContent.es.exploreEngineering).toBe('Ver perfil de Ingeniero de Datos');
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

  it('keeps the spanish analyst metadata readable and free of mojibake', () => {
    const serialized = JSON.stringify(analystRouteContent.es.metadata);

    expect(serialized).not.toMatch(mojibakePattern);
    expect(analystRouteContent.es.metadata.description).toContain('análisis estadístico');
    expect(analystRouteContent.es.metadata.ogDescription).toContain('bilingüe');
    expect(analystRouteContent.es.metadata.twitterDescription).toContain('decisión');
  });
});
