import { forwardRef, type CSSProperties } from 'react';

type HintBubbleProps = {
  id?: string;
  text: string;
  visible: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  style?: CSSProperties;
  overlay?: boolean;
  floating?: boolean;
};

const placementClasses: Record<NonNullable<HintBubbleProps['placement']>, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
};

const overlayPlacementClasses: Record<NonNullable<HintBubbleProps['placement']>, string> = {
  top: '-translate-x-1/2 -translate-y-[calc(100%+0.75rem)]',
  bottom: '-translate-x-1/2 translate-y-[calc(100%+0.75rem)]',
  left: '-translate-x-[calc(100%+0.75rem)] -translate-y-1/2',
  right: 'translate-x-[calc(100%+0.75rem)] -translate-y-1/2',
};

const HintBubble = forwardRef<HTMLDivElement, HintBubbleProps>(function HintBubble(
  {
    id,
    text,
    visible,
    placement = 'bottom',
    className = '',
    style,
    overlay = false,
    floating = false,
  },
  ref
) {
  if (!visible) {
    return null;
  }

  return (
    <div
      ref={ref}
      id={id}
      role="tooltip"
      style={style}
      className={`ui-tooltip pointer-events-none absolute z-50 max-w-[10rem] rounded-xl border px-3 py-2 text-center text-xs font-medium leading-tight shadow-2xl ${
        floating ? '' : overlay ? overlayPlacementClasses[placement] : placementClasses[placement]
      } ${className}`}
    >
      {text}
    </div>
  );
});

export default HintBubble;
