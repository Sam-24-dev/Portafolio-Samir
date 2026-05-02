import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Hero from './Hero';
import { LanguageProvider } from '../context/LanguageContext';

const portfolioEvents: CustomEvent[] = [];

const capturePortfolioEvent = (event: Event) => {
  portfolioEvents.push(event as CustomEvent);
};

const renderHero = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    </MemoryRouter>
  );

const setMotionPreferences = ({
  reducedMotion = false,
  coarsePointer = false,
  compactWidth = false,
}: {
  reducedMotion?: boolean;
  coarsePointer?: boolean;
  compactWidth?: boolean;
}) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches:
      query === '(prefers-reduced-motion: reduce)'
        ? reducedMotion
        : query === '(pointer: coarse)'
          ? coarsePointer
          : query === '(max-width: 767px)'
            ? compactWidth
            : false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
};

const advanceTimersInSteps = (totalMs: number, stepMs = 100) => {
  for (let elapsed = 0; elapsed < totalMs; elapsed += stepMs) {
    act(() => {
      vi.advanceTimersByTime(Math.min(stepMs, totalMs - elapsed));
    });
  }
};

const advanceUntilText = (element: HTMLElement, expectedText: string, totalMs: number, stepMs = 100) => {
  for (let elapsed = 0; elapsed < totalMs; elapsed += stepMs) {
    if (element.textContent?.includes(expectedText)) {
      return true;
    }

    advanceTimersInSteps(Math.min(stepMs, totalMs - elapsed), stepMs);
  }

  return element.textContent?.includes(expectedText) ?? false;
};

describe('Hero', () => {
  beforeEach(() => {
    portfolioEvents.length = 0;
    window.addEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
    localStorage.setItem('portfolio-language', 'en');
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    setMotionPreferences({});
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
    const engineeringLink = screen.getByRole('link', { name: 'Explore Data Engineering' });

    [downloadLink, githubLink, linkedinLink, engineeringLink].forEach((link) => {
      link.addEventListener('click', (event) => event.preventDefault());
    });

    fireEvent.click(downloadLink);
    fireEvent.click(githubLink);
    fireEvent.click(linkedinLink);
    fireEvent.click(engineeringLink);

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
      {
        name: 'engineering_entry_click',
        location: 'hero',
        language: 'en',
        routeMode: 'engineer',
        target: 'engineering_route',
      },
    ]);
  });

  it('keeps rotating full hero titles when reduced motion is enabled', async () => {
    vi.useFakeTimers();
    setMotionPreferences({ reducedMotion: true });

    renderHero();

    expect(screen.getByText('Business analytics and storytelling')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5200);
    });

    expect(screen.getByText('Dashboards for real decisions')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('uses a safe typewriter cycle on compact mobile without falling back to instant phrase swaps', () => {
    vi.useFakeTimers();
    setMotionPreferences({ coarsePointer: true, compactWidth: true });

    renderHero();

    const title = screen.getByTestId('analyst-hero-title');
    expect(title).toHaveAttribute('data-title-animation', 'typewriter');
    expect(screen.getByTestId('analyst-orbit')).toHaveAttribute('data-orbit-animated', 'true');

    act(() => {
      vi.advanceTimersByTime(240);
    });

    expect(title.textContent).not.toBe('Business analytics and storytelling|');
    expect(title.textContent?.length).toBeGreaterThan(1);

    expect(advanceUntilText(title, 'Business analytics and storytelling', 4200)).toBe(true);
    expect(advanceUntilText(title, 'Dashboards for real decisions', 12000)).toBe(true);

    vi.useRealTimers();
  });

  it('moves trust pills below the main CTA stack on compact mobile only', () => {
    setMotionPreferences({ coarsePointer: true });

    renderHero();

    const ctaColumn = screen.getByRole('button', { name: 'View Projects' }).closest('div');
    const trustSignals = screen.getByTestId('analyst-trust-signals');

    expect(ctaColumn).not.toBeNull();
    expect(trustSignals).not.toBeNull();
    expect(trustSignals).toHaveClass('order-last');
  });

  it('shows orbit labels and pauses the ring on desktop hover', () => {
    renderHero();

    expect(screen.getAllByText('Guayaquil, Ecuador').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SQL + Python workflows').length).toBeGreaterThan(0);

    const technologies = ['Python', 'SQL', 'Power BI', 'R', 'Jupyter', 'Pandas', 'Git', 'TypeScript'];

    technologies.forEach((technology) => {
      expect(screen.getByRole('button', { name: technology })).toBeInTheDocument();
    });

    const orbit = screen.getByTestId('analyst-orbit');
    expect(orbit).toHaveAttribute('data-orbit-paused', 'false');

    const pythonButton = screen.getByRole('button', { name: 'Python' });

    fireEvent.mouseEnter(pythonButton);

    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(orbit).toHaveAttribute('data-orbit-paused', 'true');
    expect(pythonButton).toHaveAttribute('aria-describedby', 'hero-tech-hint-python');
    expect(screen.getByRole('tooltip')).toHaveAttribute('id', 'hero-tech-hint-python');
  });
});
