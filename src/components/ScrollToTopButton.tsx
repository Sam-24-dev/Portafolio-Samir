import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.1, backgroundColor: 'rgba(100, 255, 218, 1)' },
        whileTap: { scale: 0.95 },
      };
  const transition = shouldReduceMotion ? { duration: 0 } : undefined;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="focus-ring fixed bottom-8 right-8 z-50 rounded-full bg-accent-cyan/80 p-3 text-primary-bg shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={transition}
          aria-label={t.accessibility.scrollToTop}
          {...motionProps}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
