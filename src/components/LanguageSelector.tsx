import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe size={18} className="text-accent-cyan" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
        className="bg-primary-light text-text-primary border border-primary-lighter rounded-lg px-3 py-1.5 text-sm focus:border-accent-cyan focus:outline-none cursor-pointer transition-colors hover:border-accent-cyan/70"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
};

export default LanguageSelector;