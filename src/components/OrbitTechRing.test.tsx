import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import OrbitTechRing from './OrbitTechRing';
import type { TechIconItem } from '../lib/techIcons';

const sampleIcons: TechIconItem[] = [
  { name: 'Python', profile: 'analyst', source: '/images/icons/analyst/python.svg' },
  { name: 'SQL', profile: 'analyst', source: '/images/icons/analyst/sql.svg' },
];

const setMotionPreferences = ({
  reducedMotion = false,
  coarsePointer = false,
}: {
  reducedMotion?: boolean;
  coarsePointer?: boolean;
}) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches:
      query === '(prefers-reduced-motion: reduce)'
        ? reducedMotion
        : query === '(pointer: coarse)'
          ? coarsePointer
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

describe('OrbitTechRing', () => {
  beforeEach(() => {
    setMotionPreferences({});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('pauses the orbit and shows a tooltip on desktop hover', () => {
    render(
      <div className="relative h-80 w-80">
        <OrbitTechRing
          icons={sampleIcons}
          shouldReduceMotion={false}
          hintPrefix="orbit-test"
          tileClassName="ui-analyst-orbit-tile"
          dataTestId="orbit-test"
        />
      </div>
    );

    const orbit = screen.getByTestId('orbit-test');
    const pythonButton = screen.getByRole('button', { name: 'Python' });

    expect(orbit).toHaveAttribute('data-orbit-paused', 'false');

    fireEvent.mouseEnter(pythonButton);

    expect(screen.getByRole('tooltip')).toHaveTextContent('Python');
    expect(orbit).toHaveAttribute('data-orbit-paused', 'true');

    fireEvent.mouseLeave(pythonButton);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(orbit).toHaveAttribute('data-orbit-paused', 'false');
  });

  it('supports touch interaction with timeout-based tooltips', () => {
    vi.useFakeTimers();
    setMotionPreferences({ coarsePointer: true });

    render(
      <div className="relative h-80 w-80">
        <OrbitTechRing
          icons={sampleIcons}
          shouldReduceMotion={false}
          hintPrefix="orbit-touch"
          tileClassName="ui-engineering-orbit-tile"
          dataTestId="orbit-touch"
        />
      </div>
    );

    const orbit = screen.getByTestId('orbit-touch');
    const pythonButton = screen.getByRole('button', { name: 'Python' });
    const sqlButton = screen.getByRole('button', { name: 'SQL' });

    fireEvent.click(pythonButton);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Python');
    expect(screen.getByRole('status')).toHaveTextContent('Python');
    expect(orbit).toHaveAttribute('data-orbit-paused', 'true');

    fireEvent.click(sqlButton);
    expect(screen.getByRole('tooltip')).toHaveTextContent('SQL');
    expect(screen.getByRole('status')).toHaveTextContent('SQL');

    act(() => {
      vi.advanceTimersByTime(2200);
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(orbit).toHaveAttribute('data-orbit-paused', 'false');

    vi.useRealTimers();
  });
});
