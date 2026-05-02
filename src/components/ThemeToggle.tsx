import { Sun, Moon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import HintBubble from './HintBubble';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [showHint, setShowHint] = useState(false);
  const pointerOriginRef = useRef<{ x: number; y: number } | null>(null);
  const hintId = 'theme-toggle-hint';
  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    pointerOriginRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleToggle = (button: HTMLButtonElement) => {
    const rect = button.getBoundingClientRect();
    const origin = pointerOriginRef.current ?? {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    pointerOriginRef.current = null;
    toggleTheme({ origin });
  };

  return (
    <div className="relative flex items-center">
      <motion.button
        type="button"
        onClick={event => handleToggle(event.currentTarget)}
        onPointerDown={handlePointerDown}
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
        onFocus={() => setShowHint(true)}
        onBlur={() => setShowHint(false)}
        aria-describedby={showHint ? hintId : undefined}
        className="focus-ring relative inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent-cyan/10 light:hover:bg-lightMode-accent-primary/10"
        aria-label={theme === 'dark' ? t.accessibility.switchToLightTheme : t.accessibility.switchToDarkTheme}
        {...motionProps}
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 180 : 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-slate-700" />
          ) : (
            <Sun size={20} className="text-accent-cyan" />
          )}
        </motion.div>
      </motion.button>

      <HintBubble
        id={hintId}
        text={t.accessibility.changeTheme}
        visible={showHint}
        className="left-1/2 top-full mt-3 min-w-max -translate-x-1/2"
      />
    </div>
  );
};

export default ThemeToggle;
