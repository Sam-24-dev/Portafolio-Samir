import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackPortfolioEvent } from '../lib/analytics';

const SiteFooter = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-10 dark:border-primary-lighter dark:bg-primary-light light:border-lightMode-border light:bg-lightMode-surfaceAlt">
      <div className="container-custom px-6 md:px-12 lg:px-24">
        <div className="grid gap-8 border-b pb-8 dark:border-primary-lighter/70 light:border-lightMode-border md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
          <div>
            <h2 className="mb-2 text-2xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
              Samir Caizapasto
            </h2>
            <p className="ui-eyebrow mb-3 text-sm font-semibold uppercase tracking-[0.2em]">
              {t.footer.portfolioLabel}
            </p>
            <p className="max-w-2xl text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
              {t.footer.positioning}
            </p>
          </div>

          <div className="md:justify-self-end">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] dark:text-text-secondary light:text-lightMode-text-secondary">
              {t.contact.info}
            </p>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/cv/SamirCaizapastoCV.pdf"
                download="SamirCaizapastoCV.pdf"
                className="focus-ring ui-btn-secondary"
                onClick={() =>
                  trackPortfolioEvent('cv_download', {
                    location: 'footer',
                    language,
                    target: 'cv',
                  })
                }
              >
                <Download size={16} />
                {t.footer.downloadCV}
              </a>
              <a
                href="https://www.linkedin.com/in/samir-caizapasto/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring ui-btn-neutral"
                onClick={() =>
                  trackPortfolioEvent('external_profile_click', {
                    location: 'footer',
                    language,
                    target: 'linkedin_profile',
                  })
                }
              >
                <Linkedin size={16} />
                {t.footer.linkedin}
              </a>
              <a
                href="https://github.com/Sam-24-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring ui-btn-neutral"
                onClick={() =>
                  trackPortfolioEvent('external_profile_click', {
                    location: 'footer',
                    language,
                    target: 'github_profile',
                  })
                }
              >
                <Github size={16} />
                {t.footer.github}
              </a>
              <a href="#contact" className="focus-ring ui-btn-primary">
                <Mail size={16} />
                {t.footer.contact}
              </a>
            </div>
            <p className="text-sm dark:text-text-secondary light:text-lightMode-text-secondary">{t.footer.location}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-sm dark:text-text-secondary light:text-lightMode-text-secondary md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {currentYear} Samir Caizapasto. {t.footer.copyright}
          </p>
          <p>{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
