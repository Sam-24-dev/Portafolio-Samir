import { autoUpdate, flip, FloatingPortal, offset, shift, useFloating } from '@floating-ui/react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { TechIconItem } from '../lib/techIcons';
import HintBubble from './HintBubble';
import { useOrbitInteraction } from '../hooks/useOrbitInteraction';

interface OrbitTechRingProps {
  icons: TechIconItem[];
  shouldReduceMotion: boolean;
  hintPrefix: string;
  tileClassName: string;
  dataTestId?: string;
}

const OrbitTechRing = ({
  icons,
  shouldReduceMotion,
  hintPrefix,
  tileClassName,
  dataTestId,
}: OrbitTechRingProps) => {
  const { activeName, activeTrigger, containerRef, handlers, isCoarsePointer, isOrbitPaused, setTriggerRef, tooltip } =
    useOrbitInteraction({
      hintPrefix,
    });
  const profile = icons[0]?.profile ?? 'analyst';
  const dockedLabelClassName =
    profile === 'engineering'
      ? 'ui-engineering-pill border-[var(--engineering-pill-border)] bg-[var(--engineering-pill-bg)] text-[var(--engineering-pill-text)]'
      : 'ui-analyst-pill';
  const { refs, floatingStyles } = useFloating({
    open: Boolean(activeTrigger && tooltip),
    placement: 'top',
    strategy: 'fixed',
    middleware: [
      offset(16),
      flip({
        padding: 16,
        fallbackAxisSideDirection: 'end',
      }),
      shift({
        padding: 16,
      }),
    ],
    whileElementsMounted: (reference, floating, update) =>
      autoUpdate(reference, floating, update, {
        animationFrame: true,
      }),
  });

  useEffect(() => {
    refs.setReference(activeTrigger);
  }, [activeTrigger, refs]);

  return (
    <motion.div
      ref={containerRef}
      data-testid={dataTestId}
      data-orbit-paused={isOrbitPaused ? 'true' : 'false'}
      className="absolute inset-0 z-20"
      animate={shouldReduceMotion || isOrbitPaused ? undefined : { rotate: 360 }}
      transition={shouldReduceMotion ? undefined : { duration: 36, repeat: Infinity, ease: 'linear' }}
    >
      {icons.map((icon, index) => {
        const angle = (index / icons.length) * 2 * Math.PI;
        const radius = 'calc(50% - 1.5rem)';
        const x = `calc(50% + ${radius} * ${Math.cos(angle)} - 1.5rem)`;
        const y = `calc(50% + ${radius} * ${Math.sin(angle)} - 1.5rem)`;

        return (
          <motion.div
            key={icon.name}
            className="absolute h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-14"
            style={{ top: y, left: x, zIndex: activeName === icon.name ? 50 : 10 }}
            animate={shouldReduceMotion || isOrbitPaused ? undefined : { rotate: -360 }}
            transition={shouldReduceMotion ? undefined : { duration: 36, repeat: Infinity, ease: 'linear' }}
          >
            <button
              ref={setTriggerRef(icon.name)}
              type="button"
              aria-label={icon.name}
              aria-pressed={activeName === icon.name}
              aria-describedby={activeName === icon.name ? tooltip?.id : undefined}
              className={`focus-ring relative flex h-full w-full items-center justify-center rounded-2xl border p-2 ${tileClassName}`}
              onMouseEnter={() => handlers.onMouseEnter(icon.name)}
              onMouseLeave={handlers.onMouseLeave}
              onFocus={() => handlers.onFocus(icon.name)}
              onBlur={handlers.onBlur}
              onClick={() => handlers.onClick(icon.name)}
            >
              <img
                src={icon.source}
                alt=""
                aria-hidden="true"
                decoding="async"
                className={`h-full w-full object-contain ${icon.iconClassName ?? ''}`}
              />
            </button>
          </motion.div>
        );
      })}

      <FloatingPortal>
        <HintBubble
          ref={refs.setFloating}
          id={tooltip?.id}
          text={tooltip?.text ?? ''}
          visible={Boolean(tooltip && activeTrigger)}
          floating
          style={floatingStyles}
          className="max-w-[12rem] text-center leading-snug"
        />
      </FloatingPortal>

      {isCoarsePointer && activeName ? (
        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-none absolute left-1/2 top-full z-40 mt-3 -translate-x-1/2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg ${dockedLabelClassName}`}
        >
          {activeName}
        </div>
      ) : null}
    </motion.div>
  );
};

export default OrbitTechRing;
