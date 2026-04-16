import { useReducedMotion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  type PortfolioRouteMode,
  type PortfolioSectionId,
  getRootPathForRouteMode,
  getSectionPath,
} from '../lib/portfolioRoute';
import { scrollToPageTop, scrollToSectionById, type SectionNavigationState } from '../lib/sectionNavigation';

const heroSectionByRouteMode: Record<PortfolioRouteMode, PortfolioSectionId> = {
  analyst: 'home',
  engineer: 'engineering-home',
};

export const useSectionNavigation = (routeMode: PortfolioRouteMode) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const prefersSmoothScroll = !shouldReduceMotion;

  return (sectionId: PortfolioSectionId) => {
    const targetPath = getSectionPath(routeMode, sectionId);
    const isRootSection = sectionId === heroSectionByRouteMode[routeMode];

    if (location.pathname === targetPath && !location.hash) {
      if (isRootSection) {
        scrollToPageTop(prefersSmoothScroll);
      } else {
        scrollToSectionById(sectionId, prefersSmoothScroll);
      }

      return;
    }

    navigate(targetPath, {
      state: {
        scrollBehavior: prefersSmoothScroll ? 'smooth' : 'auto',
      } satisfies SectionNavigationState,
    });
  };
};

export const useRootRouteNavigation = (routeMode: PortfolioRouteMode) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return () => {
    const targetPath = getRootPathForRouteMode(routeMode);
    if (location.pathname === targetPath && !location.hash) {
      scrollToPageTop(!shouldReduceMotion);
      return;
    }

    navigate(targetPath, {
      state: {
        scrollBehavior: shouldReduceMotion ? 'auto' : 'smooth',
      } satisfies SectionNavigationState,
    });
  };
};
