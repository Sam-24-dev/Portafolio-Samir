import { useEffect, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { analystRouteContent, engineeringRouteContent } from '../data/routeContent';
import {
  type AnalystSectionId,
  type EngineeringSectionId,
  type PortfolioRouteMode,
  analystSectionIds,
  engineeringSectionIds,
  getActiveNavigationSection,
  getSectionIdFromPathname,
} from '../lib/portfolioRoute';
import { useRootRouteNavigation, useSectionNavigation } from '../hooks/useSectionNavigation';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import HintBubble from './HintBubble';
import ProfileRouteSwitch from './ProfileRouteSwitch';

interface NavbarProps {
  routeMode: PortfolioRouteMode;
}

const Navbar = ({ routeMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<AnalystSectionId | EngineeringSectionId>(
    routeMode === 'engineer' ? 'engineering-home' : 'home'
  );
  const [showMobileControlsHint, setShowMobileControlsHint] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const navigateToSection = useSectionNavigation(routeMode);
  const navigateToRoot = useRootRouteNavigation(routeMode);

  const navLinks = useMemo(() => {
    if (routeMode === 'engineer') {
      return engineeringRouteContent[language].navigation.map((item) => ({
        name: item.label,
        id: item.id,
      }));
    }

    return analystRouteContent[language].navigation.map((item) => ({
      name: item.label,
      id: item.id,
    }));
  }, [language, routeMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = routeMode === 'engineer' ? engineeringSectionIds : analystSectionIds;
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });

      if (current) {
        setActiveSection(getActiveNavigationSection(routeMode, current));
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [routeMode]);

  useEffect(() => {
    const sectionFromPath = getSectionIdFromPathname(location.pathname);
    setIsOpen(false);
    if (sectionFromPath) {
      setActiveSection(getActiveNavigationSection(routeMode, sectionFromPath));
      return;
    }

    setActiveSection(routeMode === 'engineer' ? 'engineering-home' : 'home');
  }, [location.pathname, routeMode]);

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

  const handleSectionNavigation = (sectionId: AnalystSectionId | EngineeringSectionId) => {
    if (sectionId === (routeMode === 'engineer' ? 'engineering-home' : 'home')) {
      navigateToRoot();
    } else {
      navigateToSection(sectionId);
    }

    setActiveSection(sectionId);
    setIsOpen(false);
  };

  const brandMotionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };
  const mobileMenuTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' };
  const navAccentColor = routeMode === 'engineer' ? 'var(--engineering-link)' : '#64ffda';
  const activeNavTextClass = routeMode === 'engineer' ? 'text-[var(--engineering-link)]' : 'text-[#64ffda]';
  const idleNavTextClass = 'dark:text-text-secondary light:text-slate-700';
  const hoverNavTextClass = routeMode === 'engineer' ? 'hover:text-[var(--engineering-link)]' : 'hover:text-[#64ffda]';

  return (
    <nav
      aria-label={t.accessibility.primaryNavigation}
      className={`fixed z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? 'border-b shadow-lg backdrop-blur-[4px] md:backdrop-blur-md dark:border-primary-lighter dark:bg-primary-bg/84 light:border-lightMode-border light:bg-lightMode-surface/88'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between gap-4">
          <motion.button
            type="button"
            onClick={navigateToRoot}
            className="focus-ring cursor-pointer text-2xl font-poppins font-bold gradient-text"
            {...brandMotionProps}
          >
            SC
          </motion.button>

          <div className="hidden min-w-0 items-center gap-5 md:flex lg:gap-7">
            <div className="flex items-center gap-5 lg:gap-7">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleSectionNavigation(link.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`focus-ring group relative inline-flex min-h-[2.5rem] items-center justify-center pb-2 text-sm transition-colors ${
                      isActive ? `${activeNavTextClass} font-semibold` : `${idleNavTextClass} ${hoverNavTextClass} font-medium`
                    }`}
                  >
                    {link.name}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full transition-[width,opacity,box-shadow] duration-300 ease-out group-hover:w-full ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-70'
                      }`}
                      style={{
                        backgroundColor: navAccentColor,
                        boxShadow: isActive ? `0 0 14px ${navAccentColor}` : 'none',
                      }}
                    />
                  </button>
                );
              })}
            </div>

            <ProfileRouteSwitch routeMode={routeMode} />
            <ThemeToggle />
            <LanguageSelector />
          </div>

          <div className="relative flex items-center gap-2.5 md:hidden">
            <ThemeToggle />
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              aria-label={isOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
              className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 dark:text-accent-cyan light:text-lightMode-accent-primary"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <HintBubble
              text={t.accessibility.controlsHint}
              visible={showMobileControlsHint}
              className="right-0 top-full mt-2 max-w-[13rem] rounded-2xl border px-3 py-2 text-left text-xs"
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
            className="backdrop-blur-[2px] dark:bg-primary-light/97 light:bg-lightMode-surfaceAlt/97 md:hidden"
          >
            <div className="container-custom py-4">
              <div className="mb-4">
                <ProfileRouteSwitch routeMode={routeMode} onNavigate={() => setIsOpen(false)} />
              </div>

              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleSectionNavigation(link.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`focus-ring block w-full rounded-xl border px-3 py-3 text-left text-base font-medium transition-[background-color,border-color,color] ${
                      isActive
                        ? 'border-current/15 dark:bg-accent-cyan/10 dark:text-accent-cyan light:bg-lightMode-accent-primary/10 light:text-lightMode-accent-primary'
                        : 'border-transparent dark:text-text-secondary dark:hover:border-accent-cyan/10 dark:hover:bg-accent-cyan/5 dark:hover:text-accent-cyan light:text-slate-700 light:hover:border-lightMode-accent-primary/10 light:hover:bg-lightMode-accent-primary/5 light:hover:text-lightMode-accent-primary'
                    }`}
                  >
                    {link.name}
                  </button>
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
