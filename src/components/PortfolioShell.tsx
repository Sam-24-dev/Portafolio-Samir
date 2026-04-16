import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import CustomCursor from './CustomCursor';
import ScrollToTopButton from './ScrollToTopButton';
import Contact from './Contact';
import SiteFooter from './SiteFooter';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioMetadata } from '../hooks/usePortfolioMetadata';
import { getPortfolioRouteMode, getSectionIdFromPathname, isRouteRootPath } from '../lib/portfolioRoute';
import { scrollToHashTarget, scrollToPageTop, scrollToSectionById, type SectionNavigationState } from '../lib/sectionNavigation';

const PortfolioShell = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const routeMode = getPortfolioRouteMode(location.pathname);

  usePortfolioMetadata(routeMode);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const navigationState = (location.state as SectionNavigationState | null) ?? null;
    const shouldSmoothScroll = navigationState?.scrollBehavior === 'smooth';
    const sectionIdFromPath = getSectionIdFromPathname(location.pathname);

    if (location.hash) {
      const timeoutId = window.setTimeout(() => {
        scrollToHashTarget(location.hash, shouldSmoothScroll);
      }, 80);

      return () => window.clearTimeout(timeoutId);
    }

    if (sectionIdFromPath && !isRouteRootPath(location.pathname)) {
      const timeoutId = window.setTimeout(() => {
        scrollToSectionById(sectionIdFromPath, shouldSmoothScroll);
      }, 80);

      return () => window.clearTimeout(timeoutId);
    }

    scrollToPageTop(shouldSmoothScroll);
  }, [location.hash, location.pathname, location.state]);

  return (
    <div id="app-shell" className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        {t.accessibility.skipToContent}
      </a>
      <CustomCursor />
      <ScrollToTopButton />
      <Navbar routeMode={routeMode} />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Outlet />
        <Contact routeMode={routeMode} />
      </main>
      <SiteFooter />
    </div>
  );
};

export default PortfolioShell;
