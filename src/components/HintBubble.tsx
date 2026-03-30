type HintBubbleProps = {
  id?: string;
  text: string;
  visible: boolean;
  className?: string;
};

const HintBubble = ({ id, text, visible, className = '' }: HintBubbleProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      id={id}
      role="tooltip"
      className={`ui-tooltip pointer-events-none absolute z-30 rounded-xl border px-3 py-2 text-xs font-medium ${className}`}
    >
      {text}
    </div>
  );
};

export default HintBubble;
