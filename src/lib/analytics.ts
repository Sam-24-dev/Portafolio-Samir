export type PortfolioLanguage = 'en' | 'es';

export type PortfolioEventName =
  | 'cv_download'
  | 'case_study_open'
  | 'project_dashboard_click'
  | 'project_demo_click'
  | 'external_profile_click'
  | 'contact_submit_success'
  | 'contact_submit_error';

export type PortfolioAnalyticsLocation =
  | 'hero'
  | 'featured_card'
  | 'supporting_card'
  | 'case_study_modal'
  | 'contact'
  | 'about_certifications';

export type PortfolioAnalyticsTarget =
  | 'cv'
  | 'dashboard'
  | 'live_demo'
  | 'github_profile'
  | 'github_repo'
  | 'linkedin_profile'
  | 'email';

export interface PortfolioAnalyticsPayload {
  language: PortfolioLanguage;
  location: PortfolioAnalyticsLocation;
  projectId?: number;
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
