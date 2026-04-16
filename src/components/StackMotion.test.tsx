import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '../context/LanguageContext';
import SkillsGrid from './SkillsGrid';
import EngineeringStack from './EngineeringStack';

const animeMocks = vi.hoisted(() => ({
  animate: vi.fn(() => ({
    paused: true,
    play: vi.fn(),
    resume: vi.fn(),
    pause: vi.fn(),
    cancel: vi.fn(),
  })),
  stagger: vi.fn(() => 0),
}));

vi.mock('animejs', () => animeMocks);

const setMotionPreferences = ({ reducedMotion = false }: { reducedMotion?: boolean } = {}) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches:
      query === '(prefers-reduced-motion: reduce)'
        ? reducedMotion
        : query === '(max-width: 767px)'
          ? false
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

class MockIntersectionObserver {
  constructor(private readonly callback: IntersectionObserverCallback) {}

  observe = () => {
    this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  };

  disconnect = () => undefined;

  unobserve = () => undefined;

  takeRecords = () => [];

  root = null;

  rootMargin = '0px';

  thresholds = [0.35];
}

describe('Stack ambient motion', () => {
  beforeEach(() => {
    animeMocks.animate.mockClear();
    animeMocks.stagger.mockClear();
    setMotionPreferences();
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    localStorage.setItem('portfolio-language', 'en');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('initializes ambient motion for both stack sections on desktop', async () => {
    render(
      <LanguageProvider>
        <div>
          <SkillsGrid />
          <EngineeringStack />
        </div>
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(animeMocks.animate).toHaveBeenCalled();
    });

    expect(animeMocks.animate).toHaveBeenCalledTimes(4);
    expect(screen.getByText('Core Analyst Stack')).toBeInTheDocument();
    expect(screen.getByText('Core stack')).toBeInTheDocument();
  });

  it('skips ambient motion setup when reduced motion is enabled', async () => {
    setMotionPreferences({ reducedMotion: true });

    render(
      <LanguageProvider>
        <SkillsGrid />
      </LanguageProvider>
    );

    expect(screen.getByText('Core Analyst Stack')).toBeInTheDocument();

    expect(animeMocks.animate).not.toHaveBeenCalled();
  });
});
