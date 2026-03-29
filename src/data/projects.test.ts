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

  it('assigns supporting categories for lightweight analyst filtering', () => {
    const rice = projects.find((project) => project.id === 4);
    const pingPong = projects.find((project) => project.id === 5);
    const nasa = projects.find((project) => project.id === 6);

    expect(rice?.categories).toEqual(['bi_dashboards', 'etl_data_prep']);
    expect(pingPong?.categories).toEqual(['statistics']);
    expect(nasa?.categories).toEqual(['etl_data_prep']);
  });
});
