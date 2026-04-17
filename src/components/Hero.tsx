import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { analystRouteContent } from '../data/routeContent';
import { trackPortfolioEvent } from '../lib/analytics';
import { analystOrbitIcons } from '../lib/techIcons';
import { useSectionNavigation } from '../hooks/useSectionNavigation';
import OrbitTechRing from './OrbitTechRing';

const Hero = () => {
  const { t, language } = useLanguage();
  const analystRoute = analystRouteContent[language];
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion =
    prefersReducedMotion ||
    (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigateToSection = useSectionNavigation('analyst');

  const titles = t.hero.titles;

  useEffect(() => {
    if (shouldReduceMotion) {
      const nextTitle = titles[titleIndex] ?? '';
      if (displayText !== nextTitle) {
        setDisplayText(nextTitle);
        return;
      }

      const timeout = window.setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }, 4600);

      return () => window.clearTimeout(timeout);
    }

    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 28 : 58;
    const pauseTime = isDeleting ? 240 : 2600;

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
            <p className="ui-analyst-kicker mb-4 text-center text-sm font-semibold uppercase tracking-[0.32em] sm:text-[0.95rem] lg:text-left">
              {t.hero.eyebrow}
            </p>

            <div className="mb-6">
              <div className="flex flex-wrap justify-center gap-2.5 lg:justify-start">
                {t.hero.trustSignals.map((signal, index) => (
                  <span
                    key={signal}
                    className={`${index < 2 ? 'ui-analyst-pill' : 'ui-pill-neutral'} px-3.5 py-1.5 text-[11px] sm:text-xs`}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="text-[2.7rem] font-poppins font-bold leading-tight dark:text-text-highlight light:text-lightMode-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              {t.hero.greetingLead}{' '}
              <span className="gradient-text inline-block">{t.hero.greetingAccent}</span>
            </h1>

            <div className="mx-auto flex min-h-[64px] max-w-2xl items-center justify-center sm:min-h-[84px] md:min-h-[104px] lg:mx-0 lg:justify-start">
              <h2 className="text-[1.45rem] font-poppins font-semibold leading-tight gradient-text sm:text-3xl md:text-4xl">
                {displayText}
                <span className={shouldReduceMotion ? 'opacity-70' : 'animate-pulse'}>|</span>
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
                  className="focus-ring ui-btn-neutral"
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
                onClick={() => navigateToSection('projects')}
                className="focus-ring ui-btn-primary ui-btn-lg"
                whileHover={buttonHoverMotion}
                whileTap={buttonTapMotion}
              >
                {t.hero.viewProjects}
              </motion.button>
              <motion.a
                href="/cv/SamirCaizapastoCV.pdf"
                download="SamirCaizapastoCV.pdf"
                className="focus-ring ui-btn-secondary ui-btn-lg"
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

            <div className="mt-4 flex justify-center lg:justify-start">
              <Link
                to="/engineering"
                className="focus-ring ui-analyst-link inline-flex items-center gap-2 text-sm font-semibold"
                onClick={() =>
                  trackPortfolioEvent('engineering_entry_click', {
                    location: 'hero',
                    language,
                    routeMode: 'engineer',
                    target: 'engineering_route',
                  })
                }
              >
                {analystRoute.exploreEngineering}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            className="relative h-[17rem] w-[17rem] flex-shrink-0 sm:h-[22rem] sm:w-[22rem] md:h-[26rem] md:w-[26rem]"
          >
            <OrbitTechRing
              icons={analystOrbitIcons}
              shouldReduceMotion={shouldReduceMotion}
              hintPrefix="hero-tech-hint"
              tileClassName="ui-analyst-orbit-tile"
              dataTestId="analyst-orbit"
            />

            <div className="absolute left-1/2 top-1/2 z-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 gradient-border sm:h-64 sm:w-64 md:h-80 md:w-80">
              <img
                src="/images/perfil.webp"
                alt="Portrait of Samir Caizapasto"
                className="h-full w-full rounded-full object-cover"
                decoding="async"
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
        onClick={() => navigateToSection('about')}
        aria-label={t.accessibility.scrollToAbout}
      >
        <ChevronDown size={32} className={shouldReduceMotion ? '' : 'animate-bounce'} />
      </motion.button>
    </section>
  );
};

export default Hero;
