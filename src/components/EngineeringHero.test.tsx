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

describe('EngineeringHero', () => {
  beforeEach(() => {
    localStorage.setItem('portfolio-language', 'en');
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    setReducedMotionPreference(false);
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
    setReducedMotionPreference(true);

    renderEngineeringHero();

    expect(screen.getByText('Reproducible pipelines')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5200);
    });

    expect(screen.getByText('Contracts and public delivery')).toBeInTheDocument();

    vi.useRealTimers();
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
