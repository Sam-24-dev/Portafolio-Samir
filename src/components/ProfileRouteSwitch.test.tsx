import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProfileRouteSwitch from './ProfileRouteSwitch';
import { LanguageProvider } from '../context/LanguageContext';

const portfolioEvents: CustomEvent[] = [];

const capturePortfolioEvent = (event: Event) => {
  portfolioEvents.push(event as CustomEvent);
};

const renderSwitch = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
        <ProfileRouteSwitch routeMode="analyst" />
      </LanguageProvider>
    </MemoryRouter>
  );

describe('ProfileRouteSwitch', () => {
  beforeEach(() => {
    portfolioEvents.length = 0;
    window.addEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
    localStorage.setItem('portfolio-language', 'en');
  });

  afterEach(() => {
    window.removeEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
    localStorage.clear();
  });

  it('tracks route switching from analyst to engineering', () => {
    renderSwitch();

    fireEvent.click(screen.getByRole('button', { name: 'Data Engineer' }));

    expect(portfolioEvents[0].detail).toEqual({
      name: 'profile_route_switch',
      location: 'navbar',
      language: 'en',
      routeMode: 'engineer',
      target: 'profile_switch',
    });
  });
});
