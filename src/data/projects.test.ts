import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects data', () => {
  it('separates analyst featured work from supporting projects', () => {
    const featured = projects.filter((project) => project.tier === 'featured');
    const supporting = projects.filter((project) => project.tier === 'supporting');

    expect(featured).toHaveLength(3);
    expect(supporting).toHaveLength(3);
    expect(featured.map((project) => project.title)).toEqual([
      'Customer Profile Analytics Dashboard',
      'eSports Analytics Dashboard LATAM',
      'Grocery Sales BI Dashboard',
    ]);
  });
});
