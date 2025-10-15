import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
      <motion.button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-accent-cyan text-primary-bg dark:text-primary-bg'
            : 'text-accent-cyan hover:bg-accent-cyan/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </motion.button>
      <motion.button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
          language === 'es'
            ? 'bg-accent-cyan text-primary-bg dark:text-primary-bg'
            : 'text-accent-cyan hover:bg-accent-cyan/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ES
      </motion.button>
    </div>
  );
};

export default LanguageSelector;

