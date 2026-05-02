import { useReducedMotion } from 'framer-motion';
import useCompactViewport from './useCompactViewport';

const COMPACT_ORBIT_ROTATION_DURATION = 54;
const DEFAULT_ORBIT_ROTATION_DURATION = 36;

export type HeroTitleAnimationMode = 'typewriter' | 'swap';

const getPrefersReducedMotion = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const useHeroMotionPolicy = () => {
  const prefersReducedMotion = useReducedMotion();
  const isCompactViewport = useCompactViewport();
  const shouldReduceMotion = prefersReducedMotion || getPrefersReducedMotion();
  const titleAnimationMode: HeroTitleAnimationMode = shouldReduceMotion ? 'swap' : 'typewriter';

  return {
    isCompactViewport,
    shouldReduceMotion,
    allowContinuousRotation: !shouldReduceMotion,
    orbitRotationDuration: isCompactViewport ? COMPACT_ORBIT_ROTATION_DURATION : DEFAULT_ORBIT_ROTATION_DURATION,
    titleAnimationMode,
  };
};

export default useHeroMotionPolicy;
