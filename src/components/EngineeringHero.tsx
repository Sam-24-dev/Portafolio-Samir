import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { engineeringRouteContent } from '../data/routeContent';
import { trackPortfolioEvent } from '../lib/analytics';
import { engineeringOrbitIcons } from '../lib/techIcons';
import { useSectionNavigation } from '../hooks/useSectionNavigation';
import useCompactViewport from '../hooks/useCompactViewport';
import OrbitTechRing from './OrbitTechRing';

const EngineeringHero = () => {
  const { language } = useLanguage();
  const hero = engineeringRouteContent[language].hero;
  const prefersReducedMotion = useReducedMotion();
  const isCompactViewport = useCompactViewport();
  const shouldReduceMotion =
    prefersReducedMotion ||
    (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false);
  const shouldSimplifyMotion = shouldReduceMotion || isCompactViewport;
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigateToSection = useSectionNavigation('engineer');

  useEffect(() => {
    if (shouldSimplifyMotion) {
      const nextTitle = hero.titles[titleIndex] ?? '';
      if (displayText !== nextTitle) {
        setDisplayText(nextTitle);
        return;
      }

      const timeout = window.setTimeout(() => {
        setTitleIndex((previous) => (previous + 1) % hero.titles.length);
      }, 4600);

      return () => window.clearTimeout(timeout);
    }

    const currentTitle = hero.titles[titleIndex];
    const typingSpeed = isDeleting ? 28 : 58;
    const pauseTime = isDeleting ? 240 : 2600;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        window.setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex((previous) => (previous + 1) % hero.titles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentTitle.substring(0, displayText.length - 1)
            : currentTitle.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => window.clearTimeout(timeout);
  }, [displayText, hero.titles, isDeleting, shouldSimplifyMotion, titleIndex]);

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
      id="engineering-home"
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
            <p className="ui-engineering-kicker mb-4 text-center text-sm font-semibold uppercase tracking-[0.32em] sm:text-[0.95rem] lg:text-left">
              {hero.eyebrow}
            </p>

            <div className="mb-6">
              <div className="flex flex-wrap justify-center gap-2.5 lg:justify-start">
                {hero.badges.map((badge) => (
                  <span key={badge} className="ui-engineering-pill px-3.5 py-1.5 text-[11px] sm:text-xs">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="text-[2.7rem] font-poppins font-bold leading-tight dark:text-text-highlight light:text-lightMode-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              {hero.greetingLead}{' '}
              <span className="engineering-gradient-text inline-block">{hero.greetingAccent}</span>
            </h1>

            <div className="mx-auto flex min-h-[64px] max-w-2xl items-center justify-center sm:min-h-[84px] md:min-h-[104px] lg:mx-0 lg:justify-start">
              <h2 className="engineering-gradient-text text-[1.45rem] font-poppins font-semibold leading-tight sm:text-3xl md:text-4xl">
                {displayText}
                <span className={shouldSimplifyMotion ? 'opacity-70' : 'animate-pulse'}>|</span>
              </h2>
            </div>

            <p className="mx-auto mb-7 max-w-xl text-base leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary sm:mb-8 sm:text-lg md:text-xl lg:mx-0">
              {hero.subtitle}
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
                      routeMode: 'engineer',
                      target: link.target,
                    })
                  }
                >
                  <img src={link.icon} alt="" aria-hidden="true" className="h-5 w-5" />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-3 sm:gap-4 md:flex-row md:flex-wrap lg:justify-start">
              <motion.button
                type="button"
                onClick={() => navigateToSection('engineering-projects')}
                className="focus-ring ui-engineering-btn-primary"
                whileHover={buttonHoverMotion}
                whileTap={buttonTapMotion}
              >
                {hero.primaryCta}
              </motion.button>
              <motion.a
                href="/cv/SamirCaizapastoCV.pdf"
                download="SamirCaizapastoCV.pdf"
                className="focus-ring ui-engineering-btn-secondary"
                whileHover={buttonHoverMotion}
                whileTap={buttonTapMotion}
                onClick={() =>
                  trackPortfolioEvent('cv_download', {
                    location: 'hero',
                    language,
                    routeMode: 'engineer',
                    target: 'cv',
                  })
                }
              >
                <Download size={18} />
                {hero.secondaryCta}
              </motion.a>
            </div>

            <div className="mt-4 flex justify-center lg:justify-start">
              <Link
                to="/"
                className="focus-ring ui-engineering-link inline-flex items-center gap-2 text-sm font-semibold"
                onClick={() =>
                  trackPortfolioEvent('profile_route_switch', {
                    location: 'hero',
                    language,
                    routeMode: 'analyst',
                    target: 'engineering_route',
                  })
                }
              >
                <ArrowLeft size={16} />
                {hero.tertiaryCta}
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
              icons={engineeringOrbitIcons}
              shouldReduceMotion={shouldReduceMotion}
              allowContinuousRotation={!shouldSimplifyMotion}
              hintPrefix="engineering-tech-hint"
              tileClassName="ui-engineering-orbit-tile"
              dataTestId="engineering-orbit"
            />

            <div className="engineering-gradient-border absolute left-1/2 top-1/2 z-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 sm:h-64 sm:w-64 md:h-80 md:w-80">
              <img
                src="/images/perfil.webp"
                alt="Portrait of Samir Caizapasto"
                className="h-full w-full rounded-full object-cover"
                decoding="async"
                fetchpriority="high"
                width={1200}
                height={1083}
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
        className="focus-ring ui-engineering-kicker absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-8"
        onClick={() => navigateToSection('engineering-proof-strip')}
        aria-label={language === 'es' ? 'Ir a la prueba t\u00e9cnica' : 'Scroll to engineering proof'}
      >
        <ChevronDown size={32} className={shouldReduceMotion ? '' : 'animate-bounce'} />
      </motion.button>
    </section>
  );
};

export default EngineeringHero;
