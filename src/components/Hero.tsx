import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackPortfolioEvent } from '../lib/analytics';

const Hero = () => {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = t.hero.titles;

  useEffect(() => {
    const fallbackTitle = titles[0] ?? '';

    if (shouldReduceMotion) {
      if (displayText !== fallbackTitle) {
        setDisplayText(fallbackTitle);
      }
      return;
    }

    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 35 : 65;
    const pauseTime = isDeleting ? 800 : 1800;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentTitle.substring(0, displayText.length - 1)
            : currentTitle.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, shouldReduceMotion, titleIndex, titles]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (!element) {
      return;
    }

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({ top: offsetPosition, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  const techIcons = [
    { src: '/images/icons/python.svg', alt: 'Python' },
    { src: '/images/icons/mysql.svg', alt: 'SQL' },
    { src: '/images/icons/powerbi.svg', alt: 'Power BI' },
    { src: '/images/icons/r.svg', alt: 'R' },
    { src: '/images/icons/jupyter.svg', alt: 'Jupyter' },
    { src: '/images/icons/pandas.svg', alt: 'Pandas' },
    { src: '/images/icons/git.svg', alt: 'Git' },
    { src: '/images/icons/typescript.svg', alt: 'TypeScript' },
  ];

  const contactLinks = [
    {
      href: 'https://github.com/Sam-24-dev',
      icon: '/images/socials/github.svg',
      label: 'GitHub',
      target: 'github_profile' as const,
    },
    {
      href: 'https://www.linkedin.com/in/samir-caizapasto/',
      icon: '/images/socials/linkedin.svg',
      label: 'LinkedIn',
      target: 'linkedin_profile' as const,
    },
  ];

  const liftMotion = shouldReduceMotion ? undefined : { y: -3, scale: 1.03 };
  const buttonHoverMotion = shouldReduceMotion ? undefined : { scale: 1.03 };
  const buttonTapMotion = shouldReduceMotion ? undefined : { scale: 0.98 };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:px-12 md:pt-32 lg:px-24"
    >
      <div className="container-custom z-10">
        <div className="flex flex-col items-center justify-between gap-10 sm:gap-12 lg:flex-row lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }}
            className="flex-1 text-center lg:max-w-2xl lg:text-left"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] dark:text-accent-cyan light:text-lightMode-accent-primary">
              {t.hero.eyebrow}
            </p>

            <h1 className="text-4xl font-poppins font-bold leading-tight dark:text-text-highlight light:text-lightMode-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              {t.hero.greeting}
            </h1>

            <div className="mx-auto flex min-h-[72px] max-w-2xl items-center justify-center sm:min-h-[84px] md:min-h-[104px] lg:mx-0 lg:justify-start">
              <h2 className="text-2xl font-poppins font-semibold leading-tight gradient-text sm:text-3xl md:text-4xl">
                {displayText}
                <span className={shouldReduceMotion ? '' : 'animate-pulse'}>|</span>
              </h2>
            </div>

            <p className="mx-auto mb-7 max-w-xl text-base leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary sm:mb-8 sm:text-lg md:text-xl lg:mx-0">
              {t.hero.subtitle}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={liftMotion}
                  className="focus-ring flex min-h-11 items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors dark:border-white/10 dark:bg-primary-light/60 dark:text-text-primary dark:hover:bg-primary-lighter light:border-black/10 light:bg-lightMode-surface/80 light:text-lightMode-text-primary light:hover:bg-lightMode-surfaceAlt"
                  onClick={() =>
                    trackPortfolioEvent('external_profile_click', {
                      location: 'hero',
                      language,
                      target: link.target,
                    })
                  }
                >
                  <img src={link.icon} alt="" aria-hidden="true" className="h-5 w-5" />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-3 sm:gap-4 md:flex-row lg:justify-start">
              <motion.button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="focus-ring min-h-12 rounded-lg bg-accent-cyan px-8 py-3 font-semibold text-primary-bg transition-all hover:bg-accent-light"
                whileHover={buttonHoverMotion}
                whileTap={buttonTapMotion}
              >
                {t.hero.viewProjects}
              </motion.button>
              <motion.a
                href="/cv/SamirCaizapastoCV.pdf"
                download
                className="focus-ring flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 px-8 py-3 font-semibold transition-all dark:border-accent-cyan dark:text-accent-cyan dark:hover:bg-accent-cyan dark:hover:text-primary-bg light:border-lightMode-accent-primary light:text-lightMode-accent-primary light:hover:border-lightMode-accent-primary light:hover:bg-lightMode-accent-primary light:hover:text-white"
                whileHover={buttonHoverMotion}
                whileTap={buttonTapMotion}
                onClick={() =>
                  trackPortfolioEvent('cv_download', {
                    location: 'hero',
                    language,
                    target: 'cv',
                  })
                }
              >
                <Download size={20} />
                {t.hero.downloadCV}
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            className="relative h-56 w-56 flex-shrink-0 sm:h-72 sm:w-72 md:h-96 md:w-96"
          >
            <motion.div
              className="absolute inset-[-24px] sm:inset-[-44px] md:inset-[-72px]"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={shouldReduceMotion ? undefined : { duration: 36, repeat: Infinity, ease: 'linear' }}
            >
              {techIcons.map((icon, index) => {
                const angle = (index / techIcons.length) * 2 * Math.PI;
                const radius = 'calc(50% - 20px)';
                const x = `calc(50% + ${radius} * ${Math.cos(angle)} - 20px)`;
                const y = `calc(50% + ${radius} * ${Math.sin(angle)} - 20px)`;

                return (
                  <motion.div
                    key={icon.alt}
                    className={`absolute h-10 w-10 rounded-2xl border p-2 shadow-xl dark:border-primary-lighter/50 dark:bg-primary-light/70 light:border-lightMode-border light:bg-lightMode-surface/95 sm:h-12 sm:w-12 md:h-14 md:w-14 ${
                      index > 5 ? 'hidden sm:block' : ''
                    }`}
                    style={{ top: y, left: x }}
                    animate={shouldReduceMotion ? undefined : { rotate: -360 }}
                    transition={shouldReduceMotion ? undefined : { duration: 36, repeat: Infinity, ease: 'linear' }}
                  >
                    <img src={icon.src} alt="" aria-hidden="true" className="h-full w-full object-contain" />
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="relative h-full w-full rounded-full p-1 gradient-border">
              <img
                src="/images/perfil.jpg"
                alt="Portrait of Samir Caizapasto"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 1, duration: 0.5 }}
        className="focus-ring absolute bottom-6 left-1/2 z-20 -translate-x-1/2 dark:text-accent-cyan light:text-lightMode-accent-primary sm:bottom-8"
        onClick={() => scrollToSection('about')}
        aria-label={t.accessibility.scrollToAbout}
      >
        <ChevronDown size={32} className={shouldReduceMotion ? '' : 'animate-bounce'} />
      </motion.button>
    </section>
  );
};

export default Hero;
