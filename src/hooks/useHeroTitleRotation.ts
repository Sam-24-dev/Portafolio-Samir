import { useEffect, useRef, useState } from 'react';
import type { HeroTitleAnimationMode } from './useHeroMotionPolicy';

interface UseHeroTitleRotationProps {
  titles: string[];
  titleAnimationMode: HeroTitleAnimationMode;
  isCompactViewport?: boolean;
}

const REDUCED_MOTION_HOLD = 4600;
const DESKTOP_TYPING_SPEED = 58;
const DESKTOP_DELETING_SPEED = 28;
const DESKTOP_HOLD = 2600;
const COMPACT_TYPING_SPEED = 74;
const COMPACT_DELETING_SPEED = 52;
const COMPACT_HOLD = 3100;

type HeroTitlePhase = 'typing' | 'holding' | 'deleting';

interface HeroTitleRotationState {
  titleIndex: number;
  charIndex: number;
  phase: HeroTitlePhase;
}

const createTypewriterState = (titles: string[]): HeroTitleRotationState => {
  const firstTitle = titles[0] ?? '';

  if (firstTitle.length === 0) {
    return {
      titleIndex: 0,
      charIndex: 0,
      phase: 'holding',
    };
  }

  if (firstTitle.length === 1) {
    return {
      titleIndex: 0,
      charIndex: 1,
      phase: 'holding',
    };
  }

  return {
    titleIndex: 0,
    charIndex: 1,
    phase: 'typing',
  };
};

const advanceTypewriterState = (
  previousState: HeroTitleRotationState,
  titles: string[]
): HeroTitleRotationState => {
  if (titles.length === 0) {
    return previousState;
  }

  const currentTitle = titles[previousState.titleIndex] ?? '';

  if (currentTitle.length === 0) {
    return createTypewriterState(titles);
  }

  if (previousState.phase === 'typing') {
    const nextCharIndex = Math.min(previousState.charIndex + 1, currentTitle.length);

    return {
      ...previousState,
      charIndex: nextCharIndex,
      phase: nextCharIndex >= currentTitle.length ? 'holding' : 'typing',
    };
  }

  if (previousState.phase === 'holding') {
    if (titles.length === 1) {
      return previousState;
    }

    if (currentTitle.length <= 1) {
      const nextTitleIndex = (previousState.titleIndex + 1) % titles.length;
      const nextTitle = titles[nextTitleIndex] ?? '';

      return {
        titleIndex: nextTitleIndex,
        charIndex: nextTitle.length > 0 ? 1 : 0,
        phase: nextTitle.length > 1 ? 'typing' : 'holding',
      };
    }

    return {
      ...previousState,
      phase: 'deleting',
    };
  }

  if (previousState.charIndex > 1) {
    return {
      ...previousState,
      charIndex: previousState.charIndex - 1,
    };
  }

  const nextTitleIndex = (previousState.titleIndex + 1) % titles.length;
  const nextTitle = titles[nextTitleIndex] ?? '';

  return {
    titleIndex: nextTitleIndex,
    charIndex: nextTitle.length > 0 ? 1 : 0,
    phase: nextTitle.length > 1 ? 'typing' : 'holding',
  };
};

const useHeroTitleRotation = ({
  titles,
  titleAnimationMode,
  isCompactViewport = false,
}: UseHeroTitleRotationProps) => {
  const titlesKey = titles.join('\u0000');
  const stableTitlesRef = useRef(titles);

  if (stableTitlesRef.current.join('\u0000') !== titlesKey) {
    stableTitlesRef.current = titles;
  }

  const stableTitles = stableTitlesRef.current;
  const [rotationState, setRotationState] = useState<HeroTitleRotationState>(() => createTypewriterState(stableTitles));

  useEffect(() => {
    setRotationState(createTypewriterState(stableTitles));
  }, [titleAnimationMode, stableTitles]);

  useEffect(() => {
    if (stableTitles.length === 0) {
      return;
    }

    if (titleAnimationMode === 'swap') {
      const timeout = window.setTimeout(() => {
        setRotationState((previousState) => ({
          ...previousState,
          titleIndex: (previousState.titleIndex + 1) % stableTitles.length,
        }));
      }, REDUCED_MOTION_HOLD);

      return () => window.clearTimeout(timeout);
    }

    const currentTitle = stableTitles[rotationState.titleIndex] ?? '';

    if (currentTitle.length === 0) {
      return;
    }

    if (rotationState.phase === 'holding' && stableTitles.length === 1) {
      return;
    }

    const transitionDelay =
      rotationState.phase === 'typing'
        ? isCompactViewport
          ? COMPACT_TYPING_SPEED
          : DESKTOP_TYPING_SPEED
        : rotationState.phase === 'holding'
          ? isCompactViewport
            ? COMPACT_HOLD
            : DESKTOP_HOLD
          : isCompactViewport
            ? COMPACT_DELETING_SPEED
            : DESKTOP_DELETING_SPEED;

    const timeout = window.setTimeout(() => {
      setRotationState((previousState) => advanceTypewriterState(previousState, stableTitles));
    }, transitionDelay);

    return () => window.clearTimeout(timeout);
  }, [isCompactViewport, rotationState, titleAnimationMode, stableTitles]);

  if (stableTitles.length === 0) {
    return '';
  }

  if (titleAnimationMode === 'swap') {
    return stableTitles[rotationState.titleIndex] ?? '';
  }

  const currentTitle = stableTitles[rotationState.titleIndex] ?? '';
  return currentTitle.slice(0, rotationState.charIndex);
};

export default useHeroTitleRotation;
