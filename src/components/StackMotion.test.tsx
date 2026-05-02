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

const setMotionPreferences = ({
  reducedMotion = false,
  compactWidth = false,
}: {
  reducedMotion?: boolean;
  compactWidth?: boolean;
} = {}) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches:
      query === '(prefers-reduced-motion: reduce)'
        ? reducedMotion
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

  it('still initializes ambient motion on compact mobile with calmer analyst settings', async () => {
    setMotionPreferences({ compactWidth: true });

    render(
      <LanguageProvider>
        <SkillsGrid />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(animeMocks.animate).toHaveBeenCalledTimes(2);
    });

    const [coreCall, supportCall] = animeMocks.animate.mock.calls;

    expect(coreCall?.[1]).toMatchObject({
      duration: expect.any(Number),
      x: [0, expect.any(Number)],
      y: [0, expect.any(Number)],
      rotate: [0, expect.any(Number)],
      scale: [1, expect.any(Number)],
    });

    expect((coreCall?.[1] as { duration: number }).duration).toBeGreaterThan(5200);
    expect((coreCall?.[1] as { x: number[] }).x[1]).toBeLessThan(3);
    expect((coreCall?.[1] as { rotate: number[] }).rotate[1]).toBeLessThan(1.25);
    expect((coreCall?.[1] as { scale: number[] }).scale[1]).toBeLessThan(1.022);

    expect((supportCall?.[1] as { duration: number }).duration).toBeGreaterThan(6400);
    expect((supportCall?.[1] as { x: number[] }).x[1]).toBeLessThan(10);
    expect((supportCall?.[1] as { rotate: number[] }).rotate[1]).toBeLessThan(1.8);
    expect((supportCall?.[1] as { scale: number[] }).scale[1]).toBeLessThan(1.035);
  });

  it('still initializes ambient motion on compact mobile with calmer engineer settings', async () => {
    setMotionPreferences({ compactWidth: true });

    render(
      <LanguageProvider>
        <EngineeringStack />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(animeMocks.animate).toHaveBeenCalledTimes(2);
    });

    const [coreCall, supportCall] = animeMocks.animate.mock.calls;

    expect((coreCall?.[1] as { duration: number }).duration).toBeGreaterThan(4600);
    expect((coreCall?.[1] as { x: number[] }).x[1]).toBeLessThan(4);
    expect((coreCall?.[1] as { rotate: number[] }).rotate[1]).toBeLessThan(1.6);
    expect((coreCall?.[1] as { scale: number[] }).scale[1]).toBeLessThan(1.026);

    expect((supportCall?.[1] as { duration: number }).duration).toBeGreaterThan(5600);
    expect((supportCall?.[1] as { x: number[] }).x[1]).toBeLessThan(12);
    expect((supportCall?.[1] as { rotate: number[] }).rotate[1]).toBeLessThan(2.2);
    expect((supportCall?.[1] as { scale: number[] }).scale[1]).toBeLessThan(1.04);
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
