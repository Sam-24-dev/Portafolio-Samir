import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackPortfolioEvent } from '../lib/analytics';
import HintBubble from './HintBubble';

const Hero = () => {
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion =
    prefersReducedMotion ||
    (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTechHint, setActiveTechHint] = useState<string | null>(null);
  const touchHintTimeoutRef = useRef<number | null>(null);

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
      }, 3200);

      return () => window.clearTimeout(timeout);
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

  useEffect(() => {
    return () => {
      if (touchHintTimeoutRef.current !== null) {
        window.clearTimeout(touchHintTimeoutRef.current);
      }
    };
  }, []);

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
            <p className="ui-eyebrow mb-4 text-sm font-semibold uppercase tracking-[0.28em]">
              {t.hero.eyebrow}
            </p>

            <h1 className="text-4xl font-poppins font-bold leading-tight dark:text-text-highlight light:text-lightMode-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              {t.hero.greeting}
            </h1>

            <div className="mx-auto flex min-h-[72px] max-w-2xl items-center justify-center sm:min-h-[84px] md:min-h-[104px] lg:mx-0 lg:justify-start">
              <h2 className="text-2xl font-poppins font-semibold leading-tight gradient-text sm:text-3xl md:text-4xl">
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
                onClick={() => scrollToSection('projects')}
                className="focus-ring ui-btn-primary px-8"
                whileHover={buttonHoverMotion}
                whileTap={buttonTapMotion}
              >
                {t.hero.viewProjects}
              </motion.button>
              <motion.a
                href="/cv/SamirCaizapastoCV.pdf"
                download="SamirCaizapastoCV.pdf"
                className="focus-ring ui-btn-secondary px-8"
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
            className="relative h-[20rem] w-[20rem] flex-shrink-0 sm:h-[22rem] sm:w-[22rem] md:h-[26rem] md:w-[26rem]"
          >
            <motion.div
              className="absolute inset-0"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={shouldReduceMotion ? undefined : { duration: 36, repeat: Infinity, ease: 'linear' }}
            >
              {techIcons.map((icon, index) => {
                const angle = (index / techIcons.length) * 2 * Math.PI;
                const radius = 'calc(50% - 1.5rem)';
                const x = `calc(50% + ${radius} * ${Math.cos(angle)} - 1.5rem)`;
                const y = `calc(50% + ${radius} * ${Math.sin(angle)} - 1.5rem)`;

                return (
                  <motion.div
                    key={icon.alt}
                    className="absolute h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-14"
                    style={{ top: y, left: x }}
                    animate={shouldReduceMotion ? undefined : { rotate: -360 }}
                    transition={shouldReduceMotion ? undefined : { duration: 36, repeat: Infinity, ease: 'linear' }}
                  >
                    <button
                      type="button"
                      aria-label={icon.alt}
                      className="focus-ring ui-orbit-tile relative flex h-full w-full items-center justify-center rounded-2xl border p-2"
                      onMouseEnter={() => setActiveTechHint(icon.alt)}
                      onMouseLeave={() => setActiveTechHint((current) => (current === icon.alt ? null : current))}
                      onFocus={() => setActiveTechHint(icon.alt)}
                      onBlur={() => setActiveTechHint((current) => (current === icon.alt ? null : current))}
                      onClick={() => {
                        setActiveTechHint(icon.alt);
                        if (touchHintTimeoutRef.current !== null) {
                          window.clearTimeout(touchHintTimeoutRef.current);
                        }
                        touchHintTimeoutRef.current = window.setTimeout(() => {
                          setActiveTechHint((current) => (current === icon.alt ? null : current));
                        }, 1800);
                      }}
                    >
                      <img src={icon.src} alt="" aria-hidden="true" className="h-full w-full object-contain" />
                      <HintBubble
                        text={icon.alt}
                        visible={activeTechHint === icon.alt}
                        className="left-1/2 top-full mt-2 min-w-max -translate-x-1/2"
                      />
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 gradient-border sm:h-64 sm:w-64 md:h-80 md:w-80">
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
