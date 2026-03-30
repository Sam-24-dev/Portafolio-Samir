import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import HintBubble from './HintBubble';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showMobileControlsHint, setShowMobileControlsHint] = useState(false);
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.skills, href: '#strengths' },
    { name: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'projects', 'strengths', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);

        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const controlsHintKey = 'portfolio-controls-hint-seen';
    const hasSeenHint = window.localStorage.getItem(controlsHintKey) === 'true';
    const isTouchLikeViewport =
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    if (!isTouchLikeViewport || hasSeenHint) {
      return;
    }

    setShowMobileControlsHint(true);

    const timeoutId = window.setTimeout(() => {
      setShowMobileControlsHint(false);
      window.localStorage.setItem(controlsHintKey, 'true');
    }, 4500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);

    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    }

    setIsOpen(false);
  };

  const brandMotionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };
  const mobileMenuTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' };

  return (
    <nav
      aria-label={t.accessibility.primaryNavigation}
      className={`fixed z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b shadow-lg backdrop-blur-md dark:border-primary-lighter dark:bg-primary-bg/80 light:border-lightMode-border light:bg-lightMode-surface/80'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          <motion.a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('#home');
            }}
            className="focus-ring cursor-pointer text-2xl font-poppins font-bold gradient-text"
            {...brandMotionProps}
          >
            SC
          </motion.a>

          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(link.href);
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`focus-ring relative text-sm font-medium transition-colors group ${
                    isActive
                      ? 'dark:text-accent-cyan light:text-lightMode-accent-primary'
                      : 'dark:text-text-secondary dark:hover:text-accent-cyan light:text-lightMode-text-secondary light:hover:text-lightMode-accent-primary'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full dark:bg-accent-cyan light:bg-lightMode-accent-primary ${
                      isActive ? 'w-full' : ''
                    }`}
                  />
                </a>
              );
            })}
            <ThemeToggle />
            <LanguageSelector />
          </div>

          <div className="relative flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              aria-label={isOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
              className="focus-ring rounded-lg p-2 dark:text-accent-cyan light:text-lightMode-accent-primary"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <HintBubble
              text={t.accessibility.controlsHint}
              visible={showMobileControlsHint}
              className="right-0 top-full mt-3 max-w-[15rem] rounded-2xl border px-3 py-2 text-left"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={mobileMenuTransition}
            className="backdrop-blur-sm dark:bg-primary-light/95 light:bg-lightMode-surfaceAlt/95 md:hidden"
          >
            <div className="container-custom py-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(link.href);
                    }}
                    aria-current={isActive ? 'location' : undefined}
                    className={`focus-ring block rounded-lg py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'dark:text-accent-cyan light:text-lightMode-accent-primary'
                        : 'dark:text-text-secondary dark:hover:text-accent-cyan light:text-lightMode-text-secondary light:hover:text-lightMode-accent-primary'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
