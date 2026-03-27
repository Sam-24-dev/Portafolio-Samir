import { Sun, Moon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="focus-ring relative rounded-lg p-2 transition-colors hover:bg-accent-cyan/10"
      aria-label={theme === 'dark' ? t.accessibility.switchToLightTheme : t.accessibility.switchToDarkTheme}
      {...motionProps}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'light' ? (
          <Moon size={20} className="text-lightMode-text-secondary" />
        ) : (
          <Sun size={20} className="text-accent-cyan" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
