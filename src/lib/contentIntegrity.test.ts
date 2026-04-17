import { describe, expect, it } from 'vitest';
import { engineeringCaseStudies, engineeringRouteContent } from '../data/engineeringContent';
import { projects } from '../data/projects';
import { analystRouteContent, routeSwitchContent } from '../data/routeContent';
import { translations } from '../data/translations';
import {
  engineeringLegacyAliasRoutes,
  engineeringSectionPathMap,
  getSectionIdFromPathname,
  resolveLegacyEngineeringPathname,
} from './portfolioRoute';

const mojibakePattern = /\u00C3|\u00C2|\uFFFD|â†’|â€™|â€œ|â€/;

describe('content and metadata integrity', () => {
  it('keeps localized content free of mojibake sequences', () => {
    const serialized = JSON.stringify({
      routeSwitchContent,
      analystRouteContent,
      engineeringRouteContent,
      engineeringCaseStudies,
      translations,
      projects,
    });

    expect(serialized).not.toMatch(mojibakePattern);
  });

  it('keeps route metadata populated and canonical paths stable', () => {
    for (const metadata of [
      analystRouteContent.en.metadata,
      analystRouteContent.es.metadata,
      engineeringRouteContent.en.metadata,
      engineeringRouteContent.es.metadata,
    ]) {
      expect(metadata.title.trim()).not.toHaveLength(0);
      expect(metadata.description.trim()).not.toHaveLength(0);
      expect(metadata.ogTitle.trim()).not.toHaveLength(0);
      expect(metadata.ogDescription.trim()).not.toHaveLength(0);
      expect(metadata.twitterTitle.trim()).not.toHaveLength(0);
      expect(metadata.twitterDescription.trim()).not.toHaveLength(0);
      expect(metadata.canonicalPath.startsWith('/')).toBe(true);
    }

    expect(analystRouteContent.en.metadata.canonicalPath).toBe('/');
    expect(engineeringRouteContent.en.metadata.canonicalPath).toBe('/engineering');
  });

  it('keeps the engineering route slug and legacy alias aligned', () => {
    expect(engineeringSectionPathMap['engineering-how-i-work']).toBe('/engineering/how-i-work');
    expect(engineeringLegacyAliasRoutes).toContain('/engineering/strengths');
    expect(getSectionIdFromPathname('/engineering/how-i-work')).toBe('engineering-how-i-work');
    expect(getSectionIdFromPathname('/engineering/strengths')).toBe('engineering-how-i-work');
    expect(resolveLegacyEngineeringPathname('/engineering/strengths')).toBe('/engineering/how-i-work');
    expect(resolveLegacyEngineeringPathname('/engineering/unknown')).toBeNull();
  });
});
