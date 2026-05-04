import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useHeroTitleRotation from './useHeroTitleRotation';

const advanceTimersInSteps = (totalMs: number, stepMs = 100) => {
  for (let elapsed = 0; elapsed < totalMs; elapsed += stepMs) {
    act(() => {
      vi.advanceTimersByTime(Math.min(stepMs, totalMs - elapsed));
    });
  }
};

describe('useHeroTitleRotation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps typewriter cycles deterministic on compact viewports without blank stalls between phrases', () => {
    const { result } = renderHook(() =>
      useHeroTitleRotation({
        titles: ['AB', 'CD'],
        titleAnimationMode: 'typewriter',
        isCompactViewport: true,
      })
    );

    const samples: string[] = [];

    for (let index = 0; index < 44; index += 1) {
      advanceTimersInSteps(110, 55);

      samples.push(result.current);
    }

    expect(samples).toContain('AB');
    expect(samples).toContain('CD');
    expect(samples).not.toContain('');
  });

  it('uses swap mode for reduced motion title rotation', () => {
    const { result } = renderHook(() =>
      useHeroTitleRotation({
        titles: ['Business analytics', 'Reliable delivery'],
        titleAnimationMode: 'swap',
        isCompactViewport: true,
      })
    );

    expect(result.current).toBe('Business analytics');

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current).toBe('Reliable delivery');
  });
});
