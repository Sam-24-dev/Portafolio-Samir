import type { PortfolioRouteMode } from './portfolioRoute';

export type PortfolioLanguage = 'en' | 'es';
export type { PortfolioRouteMode } from './portfolioRoute';

export type PortfolioEventName =
  | 'cv_download'
  | 'case_study_open'
  | 'project_dashboard_click'
  | 'project_demo_click'
  | 'external_profile_click'
  | 'contact_submit_success'
  | 'contact_submit_error'
  | 'profile_route_switch'
  | 'engineering_entry_click'
  | 'engineering_case_open'
  | 'engineering_repo_click'
  | 'engineering_demo_click';

export type PortfolioAnalyticsLocation =
  | 'hero'
  | 'featured_card'
  | 'supporting_card'
  | 'case_study_modal'
  | 'contact'
  | 'about_certifications'
  | 'navbar'
  | 'engineering_projects'
  | 'engineering_bridge_projects'
  | 'engineering_case_modal';

export type PortfolioAnalyticsTarget =
  | 'cv'
  | 'dashboard'
  | 'live_demo'
  | 'github_profile'
  | 'github_repo'
  | 'linkedin_profile'
  | 'email'
  | 'profile_switch'
  | 'engineering_route';

export interface PortfolioAnalyticsPayload {
  language: PortfolioLanguage;
  location: PortfolioAnalyticsLocation;
  projectId?: number;
  projectSlug?: string;
  routeMode?: PortfolioRouteMode;
  target?: PortfolioAnalyticsTarget;
}

export interface PortfolioAnalyticsDetail extends PortfolioAnalyticsPayload {
  name: PortfolioEventName;
}

export const trackPortfolioEvent = (
  name: PortfolioEventName,
  payload: PortfolioAnalyticsPayload
) => {
  if (typeof window === 'undefined') {
    return;
  }

  const detail: PortfolioAnalyticsDetail = {
    name,
    ...payload,
  };

  window.dispatchEvent(new CustomEvent<PortfolioAnalyticsDetail>('portfolio:analytics', { detail }));

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'portfolio_event',
      portfolio_event: name,
      ...payload,
    });
  }
};
