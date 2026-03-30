import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import HintBubble from './HintBubble';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [showHint, setShowHint] = useState(false);
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
      className="ui-control-shell relative flex items-center gap-2"
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}
    >
      <motion.button
        type="button"
        onClick={() => setLanguage('en')}
        onFocus={() => setShowHint(true)}
        onBlur={() => setShowHint(false)}
        aria-pressed={language === 'en'}
        aria-label={`EN - ${t.accessibility.switchToEnglish}`}
        className={`focus-ring ui-control-toggle ${
          language === 'en'
            ? 'ui-control-toggle-active'
            : 'ui-control-toggle-idle'
        }`}
        {...motionProps}
      >
        EN
      </motion.button>
      <motion.button
        type="button"
        onClick={() => setLanguage('es')}
        onFocus={() => setShowHint(true)}
        onBlur={() => setShowHint(false)}
        aria-pressed={language === 'es'}
        aria-label={`ES - ${t.accessibility.switchToSpanish}`}
        className={`focus-ring ui-control-toggle ${
          language === 'es'
            ? 'ui-control-toggle-active'
            : 'ui-control-toggle-idle'
        }`}
        {...motionProps}
      >
        ES
      </motion.button>

      <HintBubble
        text={t.accessibility.changeLanguage}
        visible={showHint}
        className="left-1/2 top-full mt-2 min-w-max -translate-x-1/2"
      />
    </div>
  );
};

export default LanguageSelector;
