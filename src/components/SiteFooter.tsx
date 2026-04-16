import { useLanguage } from '../context/LanguageContext';

const SiteFooter = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-7 dark:border-primary-lighter dark:bg-primary-light light:border-lightMode-border light:bg-lightMode-surfaceAlt">
      <div className="container-custom px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center gap-2 text-center text-sm dark:text-text-secondary light:text-lightMode-text-secondary md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-pretty">
            &copy; {currentYear} Samir Caizapasto. {t.footer.copyright}
          </p>
          <p>{t.footer.location}</p>
          <p className="text-pretty md:text-right">{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
