import { act, fireEvent, render, screen } from '@testing-library/react';
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

const setReducedMotionPreference = (matches: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
};

describe('Hero', () => {
  beforeEach(() => {
    portfolioEvents.length = 0;
    window.addEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
    localStorage.setItem('portfolio-language', 'en');
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    setReducedMotionPreference(false);
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

  it('keeps rotating full hero titles when reduced motion is enabled', async () => {
    vi.useFakeTimers();
    setReducedMotionPreference(true);

    renderHero();

    expect(screen.getByText('Power BI Dashboard Builder')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.getByText('SQL and Python Workflow Builder')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('shows interactive labels for all orbit technologies', () => {
    renderHero();

    expect(screen.getAllByText('Guayaquil, Ecuador').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Data Analyst track').length).toBeGreaterThan(0);

    const technologies = ['Python', 'SQL', 'Power BI', 'R', 'Jupyter', 'Pandas', 'Git', 'TypeScript'];

    technologies.forEach((technology) => {
      expect(screen.getByRole('button', { name: technology })).toBeInTheDocument();
    });

    expect(screen.queryByText('Python')).not.toBeInTheDocument();

    const pythonButton = screen.getByRole('button', { name: 'Python' });

    fireEvent.click(pythonButton);

    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(pythonButton).toHaveAttribute('aria-describedby', 'hero-tech-hint-python');
    expect(screen.getByRole('tooltip')).toHaveAttribute('id', 'hero-tech-hint-python');
  });
});
