import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import EngineeringHero from './EngineeringHero';
import { LanguageProvider } from '../context/LanguageContext';

const renderEngineeringHero = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
        <EngineeringHero />
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

describe('EngineeringHero', () => {
  beforeEach(() => {
    localStorage.setItem('portfolio-language', 'en');
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    setMotionPreferences({});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('renders the closed engineering hero copy without student framing', () => {
    renderEngineeringHero();

    expect(screen.getByText('DATA ENGINEER')).toBeInTheDocument();
    expect(screen.getByText('ETL pipelines')).toBeInTheDocument();
    expect(screen.getByText('Data quality contracts')).toBeInTheDocument();
    expect(screen.getByText('Automation & CI/CD')).toBeInTheDocument();
    expect(
      screen.getByText(
        'I build data pipelines and public-facing products that turn raw sources into validated artifacts, reproducible workflows, and reliable delivery layers.'
      )
    ).toBeInTheDocument();
    expect(screen.queryByText(/student/i)).not.toBeInTheDocument();
  });

  it('keeps rotating only the defined engineering hero titles when reduced motion is enabled', () => {
    vi.useFakeTimers();
    setMotionPreferences({ reducedMotion: true });

    renderEngineeringHero();

    expect(screen.getByText('Reproducible pipelines')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5200);
    });

    expect(screen.getByText('Contracts and public delivery')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('uses a safe typewriter cycle on compact mobile without falling back to instant phrase swaps', () => {
    vi.useFakeTimers();
    setMotionPreferences({ coarsePointer: true, compactWidth: true });

    renderEngineeringHero();

    const title = screen.getByTestId('engineering-hero-title');
    expect(title).toHaveAttribute('data-title-animation', 'typewriter');
    expect(screen.getByTestId('engineering-orbit')).toHaveAttribute('data-orbit-animated', 'true');

    act(() => {
      vi.advanceTimersByTime(240);
    });

    expect(title.textContent).not.toBe('Reproducible pipelines|');
    expect(title.textContent?.length).toBeGreaterThan(1);

    expect(advanceUntilText(title, 'Reproducible pipelines', 2800)).toBe(true);
    expect(advanceUntilText(title, 'Contracts and public delivery', 9000)).toBe(true);

    vi.useRealTimers();
  });

  it('moves route badges below the main CTA stack on compact mobile only', () => {
    setMotionPreferences({ coarsePointer: true });

    renderEngineeringHero();

    const ctaColumn = screen.getByRole('button', { name: 'View Projects' }).closest('div');
    const badges = screen.getByTestId('engineering-trust-signals');

    expect(ctaColumn).not.toBeNull();
    expect(badges).not.toBeNull();
    expect(badges).toHaveClass('order-last');
  });

  it('shows the route-specific engineering orbit labels and pauses the ring on hover', () => {
    renderEngineeringHero();

    const technologies = ['Python', 'SQL', 'DuckDB', 'dbt', 'Pandera', 'GitHub Actions', 'Next.js', 'Flutter'];

    technologies.forEach((technology) => {
      expect(screen.getByRole('button', { name: technology })).toBeInTheDocument();
    });

    const orbit = screen.getByTestId('engineering-orbit');
    expect(orbit).toHaveAttribute('data-orbit-paused', 'false');

    const dbtButton = screen.getByRole('button', { name: 'dbt' });
    fireEvent.mouseEnter(dbtButton);

    expect(screen.getByText('dbt')).toBeInTheDocument();
    expect(orbit).toHaveAttribute('data-orbit-paused', 'true');
    expect(dbtButton).toHaveAttribute('aria-describedby', 'engineering-tech-hint-dbt');
  });
});
