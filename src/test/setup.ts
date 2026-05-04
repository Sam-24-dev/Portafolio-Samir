import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('framer-motion', async () => {
  const React = await import('react');

  const motionPropKeys = new Set([
    'initial',
    'animate',
    'exit',
    'transition',
    'variants',
    'whileInView',
    'whileHover',
    'whileTap',
    'whileFocus',
    'whileDrag',
    'layout',
    'layoutId',
    'layoutScroll',
    'layoutRoot',
    'viewport',
    'drag',
    'dragConstraints',
    'dragElastic',
    'dragMomentum',
    'dragDirectionLock',
    'dragListener',
    'dragPropagation',
    'onDrag',
    'onDragStart',
    'onDragEnd',
    'onDragTransitionEnd',
    'onHoverStart',
    'onHoverEnd',
    'onTap',
    'onTapStart',
    'onTapCancel',
    'onPan',
    'onPanStart',
    'onPanEnd',
    'onViewportEnter',
    'onViewportLeave',
    'onAnimationStart',
    'onAnimationComplete',
    'onLayoutAnimationStart',
    'onLayoutAnimationComplete',
    'onUpdate',
    'transformTemplate',
    'custom',
  ]);

  type MotionProps = Omit<Record<string, unknown>, 'children'> & { children?: React.ReactNode };

  const stripMotionProps = (props: Record<string, unknown>) => {
    const cleaned: Record<string, unknown> = { ...props };

    motionPropKeys.forEach((key) => {
      if (key in cleaned) {
        delete cleaned[key];
      }

      const lowerKey = key.toLowerCase();
      if (lowerKey in cleaned) {
        delete cleaned[lowerKey];
      }
    });

    return cleaned;
  };

  const motionCache = new Map<string, React.ForwardRefExoticComponent<MotionProps>>();

  const createMotionComponent = (tag: string) => {
    const cached = motionCache.get(tag);
    if (cached) {
      return cached;
    }

    const MotionComponent = React.forwardRef<HTMLElement, MotionProps>((props, ref) => {
      const { children, ...rest } = props;
      return React.createElement(tag, { ...stripMotionProps(rest), ref }, children as React.ReactNode);
    });

    MotionComponent.displayName = `motion.${tag}`;
    motionCache.set(tag, MotionComponent);
    return MotionComponent;
  };

  const motion = new Proxy(
    {},
    {
      get: (_target, tag) => createMotionComponent(String(tag)),
    }
  );

  const AnimatePresence = ({
    children,
    onExitComplete,
  }: {
    children?: React.ReactNode;
    onExitComplete?: () => void;
  }) => {
    const [renderedChildren, setRenderedChildren] = React.useState<React.ReactNode>(children);
    const exitTimerRef = React.useRef<number | null>(null);

    React.useEffect(() => {
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }

      if (children) {
        setRenderedChildren(children);
        return;
      }

      if (renderedChildren) {
        exitTimerRef.current = window.setTimeout(() => {
          setRenderedChildren(null);
          onExitComplete?.();
          exitTimerRef.current = null;
        }, 0);
      } else {
        setRenderedChildren(null);
      }

      return () => {
        if (exitTimerRef.current !== null) {
          window.clearTimeout(exitTimerRef.current);
          exitTimerRef.current = null;
        }
      };
    }, [children, onExitComplete, renderedChildren]);

    return React.createElement(React.Fragment, null, renderedChildren);
  };

  const useReducedMotion = () => false;

  return {
    motion,
    AnimatePresence,
    useReducedMotion,
  };
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.clearAllTimers();
});

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? false : false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});
