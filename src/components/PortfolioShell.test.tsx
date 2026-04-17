import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PortfolioShell from './PortfolioShell';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

const navigationMocks = vi.hoisted(() => ({
  scrollToHashTarget: vi.fn(),
  scrollToPageTop: vi.fn(),
  scrollToSectionById: vi.fn(),
}));

vi.mock('../lib/sectionNavigation', async () => {
  const actual = await vi.importActual<typeof import('../lib/sectionNavigation')>('../lib/sectionNavigation');
  return {
    ...actual,
    scrollToHashTarget: navigationMocks.scrollToHashTarget,
    scrollToPageTop: navigationMocks.scrollToPageTop,
    scrollToSectionById: navigationMocks.scrollToSectionById,
  };
});

const renderShell = (initialEntries: string[]) =>
  render(
    <MemoryRouter
      initialEntries={initialEntries}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ThemeProvider>
        <LanguageProvider>
          <Routes>
            <Route element={<PortfolioShell />}>
              <Route index element={<div>Analyst root</div>} />
              <Route path="projects" element={<div>Analyst projects</div>} />
              <Route path="engineering" element={<div>Engineering root</div>} />
              <Route path="engineering/how-i-work" element={<div>Engineering how i work</div>} />
              <Route path="engineering/contact" element={<div>Engineering contact</div>} />
            </Route>
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

describe('PortfolioShell section-path synchronization', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.setItem('portfolio-language', 'en');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it('scrolls to the mapped section when a section path is opened directly', () => {
    renderShell(['/engineering/contact']);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByText('Engineering contact')).toBeInTheDocument();
    expect(navigationMocks.scrollToSectionById).toHaveBeenCalledWith('contact', false);
  });

  it('keeps old hash URLs backward-compatible', () => {
    renderShell(['/engineering#contact']);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByText('Engineering root')).toBeInTheDocument();
    expect(navigationMocks.scrollToHashTarget).toHaveBeenCalledWith('#contact', false);
  });

  it('scrolls to the engineer how-i-work section when the new path is opened directly', () => {
    renderShell(['/engineering/how-i-work']);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByText('Engineering how i work')).toBeInTheDocument();
    expect(navigationMocks.scrollToSectionById).toHaveBeenCalledWith('engineering-how-i-work', false);
  });
});
