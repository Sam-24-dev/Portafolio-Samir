import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';

const renderThemeToggle = () =>
  render(
    <ThemeProvider>
      <LanguageProvider>
        <ThemeToggle />
      </LanguageProvider>
    </ThemeProvider>
  );

describe('ThemeToggle', () => {
  const originalMatchMedia = window.matchMedia;
  const originalStartViewTransition = (document as Document & { startViewTransition?: unknown }).startViewTransition;

  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('pointer: coarse'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    window.localStorage.clear();
    window.matchMedia = originalMatchMedia;
    (document as Document & { startViewTransition?: unknown }).startViewTransition = originalStartViewTransition;
  });

  it('shows a visible helper hint when focused', () => {
    renderThemeToggle();

    const toggle = screen.getByRole('button', { name: 'Switch to dark theme' });

    fireEvent.focus(toggle);

    expect(screen.getByText('Change theme')).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-describedby', 'theme-toggle-hint');
    expect(screen.getByRole('tooltip')).toHaveAttribute('id', 'theme-toggle-hint');
  });

  it('falls back to a simple theme toggle on coarse pointers and updates theme-color metadata', () => {
    const startViewTransition = vi.fn();
    (document as Document & { startViewTransition?: typeof startViewTransition }).startViewTransition =
      startViewTransition;

    const themeMeta = document.querySelector('meta[name="theme-color"]') ?? document.createElement('meta');
    themeMeta.setAttribute('name', 'theme-color');
    document.head.appendChild(themeMeta);

    renderThemeToggle();

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));

    expect(startViewTransition).not.toHaveBeenCalled();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(themeMeta).toHaveAttribute('content', '#0a192f');
  });

  it('uses the rich view transition path on desktop pointers when supported', () => {
    const startViewTransition = vi.fn((callback: () => void) => {
      callback();
      return { finished: Promise.resolve() };
    });

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(pointer: fine) and (hover: hover)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    (document as Document & { startViewTransition?: typeof startViewTransition }).startViewTransition =
      startViewTransition;

    renderThemeToggle();

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));

    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
