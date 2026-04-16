import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { routeSwitchContent } from '../data/routeContent';
import {
  ANALYST_PATHNAME,
  ENGINEERING_PATHNAME,
  type PortfolioRouteMode,
} from '../lib/portfolioRoute';
import { trackPortfolioEvent } from '../lib/analytics';

interface ProfileRouteSwitchProps {
  routeMode: PortfolioRouteMode;
  onNavigate?: () => void;
}

const ProfileRouteSwitch = ({ routeMode, onNavigate }: ProfileRouteSwitchProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const labels = routeSwitchContent[language];

  const switchRoute = (nextMode: PortfolioRouteMode) => {
    if (nextMode === routeMode) {
      onNavigate?.();
      return;
    }

    const pathname = nextMode === 'engineer' ? ENGINEERING_PATHNAME : ANALYST_PATHNAME;
    trackPortfolioEvent('profile_route_switch', {
      location: 'navbar',
      language,
      routeMode: nextMode,
      target: 'profile_switch',
    });
    navigate(pathname);
    onNavigate?.();
  };

  const buttonMotion = shouldReduceMotion ? undefined : { scale: 0.98 };

  return (
    <div
      role="group"
      aria-label={labels.label}
      className="ui-route-switch inline-flex items-center gap-1 rounded-full border p-1"
      data-route-mode={routeMode}
      data-pathname={location.pathname}
    >
      <motion.button
        type="button"
        whileTap={buttonMotion}
        translate="no"
        aria-pressed={routeMode === 'analyst'}
        aria-current={routeMode === 'analyst' ? 'page' : undefined}
        className={`focus-ring ui-route-switch-option ${routeMode === 'analyst' ? 'ui-route-switch-analyst-active' : 'ui-route-switch-idle'}`}
        onClick={() => switchRoute('analyst')}
      >
        {labels.analyst}
      </motion.button>
      <motion.button
        type="button"
        whileTap={buttonMotion}
        translate="no"
        aria-pressed={routeMode === 'engineer'}
        aria-current={routeMode === 'engineer' ? 'page' : undefined}
        className={`focus-ring ui-route-switch-option ${routeMode === 'engineer' ? 'ui-route-switch-engineer-active' : 'ui-route-switch-idle'}`}
        onClick={() => switchRoute('engineer')}
      >
        {labels.engineer}
      </motion.button>
    </div>
  );
};

export default ProfileRouteSwitch;
