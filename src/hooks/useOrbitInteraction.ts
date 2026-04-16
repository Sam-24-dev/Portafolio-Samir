import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface OrbitTooltipState {
  id: string;
  text: string;
}

interface UseOrbitInteractionOptions {
  hintPrefix: string;
  closeDelayMs?: number;
}

export const useOrbitInteraction = (
  options: UseOrbitInteractionOptions = {
    hintPrefix: 'orbit-tech-hint',
    closeDelayMs: 2100,
  }
) => {
  const { hintPrefix, closeDelayMs = 2100 } = options;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hintTimeoutRef = useRef<number | null>(null);
  const [activeName, setActiveName] = useState<string | null>(null);
  const [activeTrigger, setActiveTrigger] = useState<HTMLButtonElement | null>(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [tooltip, setTooltip] = useState<OrbitTooltipState | null>(null);

  const clearActiveHint = useCallback(() => {
    if (hintTimeoutRef.current !== null) {
      window.clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = null;
    }

    setActiveName(null);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia('(pointer: coarse)');
    const updatePointerMode = () => setIsCoarsePointer(media.matches);

    updatePointerMode();
    media.addEventListener?.('change', updatePointerMode);

    return () => {
      media.removeEventListener?.('change', updatePointerMode);
    };
  }, []);

  useEffect(() => {
    if (!activeName) {
      setActiveTrigger(null);
      setTooltip(null);
      return;
    }

    setActiveTrigger(triggerRefs.current[activeName] ?? null);
    setTooltip({
      id: `${hintPrefix}-${activeName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      text: activeName,
    });
  }, [activeName, hintPrefix]);

  useEffect(() => {
    if (!activeName || !isCoarsePointer) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current?.contains(event.target as Node)) {
        return;
      }

      clearActiveHint();
    };

    window.addEventListener('pointerdown', handlePointerDown, true);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [activeName, clearActiveHint, isCoarsePointer]);

  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current !== null) {
        window.clearTimeout(hintTimeoutRef.current);
      }
    };
  }, []);

  const setTriggerRef = useCallback(
    (name: string) => (node: HTMLButtonElement | null) => {
      triggerRefs.current[name] = node;
      if (activeName === name) {
        setActiveTrigger(node);
      }
    },
    [activeName]
  );

  const showTouchHint = useCallback(
    (name: string) => {
      if (!isCoarsePointer) {
        return;
      }

      if (hintTimeoutRef.current !== null) {
        window.clearTimeout(hintTimeoutRef.current);
      }

      if (activeName === name) {
        clearActiveHint();
        return;
      }

      setActiveName(name);
      hintTimeoutRef.current = window.setTimeout(() => {
        setActiveName((current) => (current === name ? null : current));
      }, closeDelayMs);
    },
    [activeName, clearActiveHint, closeDelayMs, isCoarsePointer]
  );

  const handlers = useMemo(
    () => ({
      onMouseEnter: (name: string) => {
        if (isCoarsePointer) {
          return;
        }

        setActiveName(name);
      },
      onMouseLeave: () => {
        if (isCoarsePointer) {
          return;
        }

        clearActiveHint();
      },
      onFocus: (name: string) => {
        setActiveName(name);
      },
      onBlur: () => {
        if (isCoarsePointer) {
          return;
        }

        clearActiveHint();
      },
      onClick: (name: string) => {
        showTouchHint(name);
      },
    }),
    [clearActiveHint, isCoarsePointer, showTouchHint]
  );

  return {
    containerRef,
    tooltip,
    activeTrigger,
    activeName,
    isCoarsePointer,
    isOrbitPaused: activeName !== null,
    setTriggerRef,
    clearActiveHint,
    handlers,
  };
};
