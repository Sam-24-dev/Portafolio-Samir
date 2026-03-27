import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type PortfolioAnalyticsDetail, trackPortfolioEvent } from './analytics';

describe('trackPortfolioEvent', () => {
  const eventListener = vi.fn();

  beforeEach(() => {
    eventListener.mockReset();
    window.addEventListener('portfolio:analytics', eventListener as EventListener);
    delete window.dataLayer;
  });

  afterEach(() => {
    window.removeEventListener('portfolio:analytics', eventListener as EventListener);
    delete window.dataLayer;
  });

  it('dispatches a custom portfolio analytics event', () => {
    trackPortfolioEvent('cv_download', {
      location: 'hero',
      language: 'en',
      target: 'cv',
    });

    expect(eventListener).toHaveBeenCalledTimes(1);

    const event = eventListener.mock.calls[0][0] as CustomEvent<PortfolioAnalyticsDetail>;
    expect(event.detail).toEqual({
      name: 'cv_download',
      location: 'hero',
      language: 'en',
      target: 'cv',
    });
  });

  it('pushes a compatible event into window.dataLayer when it exists', () => {
    window.dataLayer = [];

    trackPortfolioEvent('case_study_open', {
      location: 'featured_card',
      language: 'es',
      projectId: 1,
    });

    expect(window.dataLayer).toEqual([
      {
        event: 'portfolio_event',
        portfolio_event: 'case_study_open',
        location: 'featured_card',
        language: 'es',
        projectId: 1,
      },
    ]);
  });

  it('fails silently when dataLayer is absent', () => {
    expect(() =>
      trackPortfolioEvent('external_profile_click', {
        location: 'contact',
        language: 'en',
        target: 'linkedin_profile',
      })
    ).not.toThrow();
  });
});
