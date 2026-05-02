import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { animate, stagger, type JSAnimation } from 'animejs';

type StackMotionProfile = 'analyst' | 'engineer';

interface StackMotionConfig {
  profile: StackMotionProfile;
}

type StackMotionTier = 'regular' | 'compact';

const profileSettings: Record<
  StackMotionProfile,
  Record<
    StackMotionTier,
    {
      coreY: number;
      coreX: number;
      coreScale: number;
      coreRotate: number;
      coreDuration: number;
      supportX: number;
      supportY: number;
      supportScale: number;
      supportRotate: number;
      supportDuration: number;
    }
  >
> = {
  analyst: {
    regular: {
      coreY: 8,
      coreX: 3,
      coreScale: 1.022,
      coreRotate: 1.25,
      coreDuration: 5200,
      supportX: 10,
      supportY: 8,
      supportScale: 1.035,
      supportRotate: 1.8,
      supportDuration: 6400,
    },
    compact: {
      coreY: 4.6,
      coreX: 1.8,
      coreScale: 1.01,
      coreRotate: 0.42,
      coreDuration: 6600,
      supportX: 4.8,
      supportY: 3.6,
      supportScale: 1.014,
      supportRotate: 0.62,
      supportDuration: 7800,
    },
  },
  engineer: {
    regular: {
      coreY: 10,
      coreX: 4,
      coreScale: 1.026,
      coreRotate: 1.6,
      coreDuration: 4600,
      supportX: 12,
      supportY: 10,
      supportScale: 1.04,
      supportRotate: 2.2,
      supportDuration: 5600,
    },
    compact: {
      coreY: 5.5,
      coreX: 2.3,
      coreScale: 1.012,
      coreRotate: 0.6,
      coreDuration: 6200,
      supportX: 5.6,
      supportY: 4.4,
      supportScale: 1.016,
      supportRotate: 0.82,
      supportDuration: 7400,
    },
  },
};

const getStackMotionTier = (): StackMotionTier => {
  if (typeof window === 'undefined') {
    return 'regular';
  }

  return window.matchMedia('(max-width: 767px)').matches ? 'compact' : 'regular';
};

export const useStackAmbientMotion = ({ profile }: StackMotionConfig) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion =
      shouldReduceMotion ||
      (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    if (!section || prefersReducedMotion) {
      return;
    }

    const settings = profileSettings[profile][getStackMotionTier()];
    const coreItems = section.querySelectorAll<HTMLElement>('[data-stack-core-item]');
    const supportItems = section.querySelectorAll<HTMLElement>('[data-stack-support-item]');

    if (coreItems.length === 0 && supportItems.length === 0) {
      return;
    }

    let coreAnimation: JSAnimation | null = null;
    let supportAnimation: JSAnimation | null = null;

    const ensureAnimations = () => {
      if (!coreAnimation && coreItems.length > 0) {
        coreAnimation = animate(coreItems, {
          x: [0, settings.coreX],
          y: [0, -settings.coreY],
          rotate: [0, settings.coreRotate],
          scale: [1, settings.coreScale],
          duration: settings.coreDuration,
          delay: stagger(170, { from: 'center' }),
          ease: 'inOutSine',
          alternate: true,
          loop: true,
          autoplay: false,
        });
      }

      if (!supportAnimation && supportItems.length > 0) {
        supportAnimation = animate(supportItems, {
          x: [0, settings.supportX],
          y: [0, -settings.supportY],
          rotate: [0, settings.supportRotate],
          scale: [1, settings.supportScale],
          duration: settings.supportDuration,
          delay: stagger(210, { from: 'center' }),
          ease: 'inOutSine',
          alternate: true,
          loop: true,
          autoplay: false,
        });
      }
    };

    const startAmbientMotion = () => {
      ensureAnimations();
      if (coreAnimation) {
        if (coreAnimation.paused) {
          coreAnimation.resume();
        } else {
          coreAnimation.play();
        }
      }

      if (supportAnimation) {
        if (supportAnimation.paused) {
          supportAnimation.resume();
        } else {
          supportAnimation.play();
        }
      }
    };

    const pauseAmbientMotion = () => {
      coreAnimation?.pause();
      supportAnimation?.pause();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          startAmbientMotion();
          return;
        }

        pauseAmbientMotion();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      coreAnimation?.cancel();
      supportAnimation?.cancel();
    };
  }, [profile, shouldReduceMotion]);

  return sectionRef;
};
