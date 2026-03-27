import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };

  return (
    <div
      role="group"
      aria-label={t.accessibility.languageSelector}
      className="flex items-center gap-2 rounded-lg border border-accent-cyan/20 bg-accent-cyan/10 p-1"
    >
      <motion.button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label={`EN - ${t.accessibility.switchToEnglish}`}
        className={`focus-ring rounded-md px-3 py-1 text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-accent-cyan text-primary-bg dark:text-primary-bg'
            : 'dark:text-accent-cyan dark:hover:bg-accent-cyan/20 light:text-lightMode-accent-primary light:hover:bg-accent-cyan/20'
        }`}
        {...motionProps}
      >
        EN
      </motion.button>
      <motion.button
        type="button"
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        aria-label={`ES - ${t.accessibility.switchToSpanish}`}
        className={`focus-ring rounded-md px-3 py-1 text-sm font-medium transition-all ${
          language === 'es'
            ? 'bg-accent-cyan text-primary-bg dark:text-primary-bg'
            : 'dark:text-accent-cyan dark:hover:bg-accent-cyan/20 light:text-lightMode-accent-primary light:hover:bg-accent-cyan/20'
        }`}
        {...motionProps}
      >
        ES
      </motion.button>
    </div>
  );
};

export default LanguageSelector;
