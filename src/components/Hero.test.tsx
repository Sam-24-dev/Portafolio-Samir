import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Hero from './Hero';
import { LanguageProvider } from '../context/LanguageContext';

const portfolioEvents: CustomEvent[] = [];

const capturePortfolioEvent = (event: Event) => {
  portfolioEvents.push(event as CustomEvent);
};

const renderHero = () =>
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>
  );

describe('Hero', () => {
  beforeEach(() => {
    portfolioEvents.length = 0;
    window.addEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
    localStorage.setItem('portfolio-language', 'en');
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  });

  afterEach(() => {
    window.removeEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('tracks CV downloads and external profile clicks', () => {
    renderHero();

    const downloadLink = screen.getByRole('link', { name: 'Download CV' });
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });

    [downloadLink, githubLink, linkedinLink].forEach((link) => {
      link.addEventListener('click', (event) => event.preventDefault());
    });

    fireEvent.click(downloadLink);
    fireEvent.click(githubLink);
    fireEvent.click(linkedinLink);

    expect(portfolioEvents.map((event) => event.detail)).toEqual([
      {
        name: 'cv_download',
        location: 'hero',
        language: 'en',
        target: 'cv',
      },
      {
        name: 'external_profile_click',
        location: 'hero',
        language: 'en',
        target: 'github_profile',
      },
      {
        name: 'external_profile_click',
        location: 'hero',
        language: 'en',
        target: 'linkedin_profile',
      },
    ]);
  });
});
