export type PortfolioRouteMode = 'analyst' | 'engineer';

export interface PortfolioSectionLink {
  id: string;
  label: string;
}

export const sharedShellComponents = [
  'PortfolioShell',
  'Navbar',
  'ProfileRouteSwitch',
  'ThemeToggle',
  'LanguageSelector',
  'Contact',
  'SiteFooter',
  'ScrollToTopButton',
  'SkipLink',
] as const;

export const ANALYST_PATHNAME = '/';
export const ENGINEERING_PATHNAME = '/engineering';

export const sharedSectionIds = ['contact'] as const;
export const analystUniqueSectionIds = ['home', 'about', 'projects', 'strengths'] as const;
export const engineeringUniqueSectionIds = [
  'engineering-home',
  'engineering-proof-strip',
  'engineering-projects',
  'engineering-bridge-projects',
  'engineering-stack',
  'engineering-how-i-work',
] as const;

export const analystSectionIds = [...analystUniqueSectionIds, ...sharedSectionIds] as const;
export const engineeringSectionIds = [...engineeringUniqueSectionIds, ...sharedSectionIds] as const;

export type SharedSectionId = (typeof sharedSectionIds)[number];
export type AnalystSectionId = (typeof analystSectionIds)[number];
export type EngineeringSectionId = (typeof engineeringSectionIds)[number];
export type PortfolioSectionId = AnalystSectionId | EngineeringSectionId;

export const analystSectionPathMap: Record<AnalystSectionId, string> = {
  home: '/',
  about: '/about',
  projects: '/projects',
  strengths: '/strengths',
  contact: '/contact',
};

export const engineeringSectionPathMap: Record<EngineeringSectionId, string> = {
  'engineering-home': '/engineering',
  'engineering-proof-strip': '/engineering/proof',
  'engineering-projects': '/engineering/projects',
  'engineering-bridge-projects': '/engineering/bridge-projects',
  'engineering-stack': '/engineering/stack',
  'engineering-how-i-work': '/engineering/how-i-work',
  contact: '/engineering/contact',
};

const engineeringLegacySectionPathMap = {
  '/engineering/strengths': 'engineering-how-i-work',
} as const;

export const analystAliasRoutes = Object.values(analystSectionPathMap).filter((path) => path !== '/');
export const engineeringAliasRoutes = Object.values(engineeringSectionPathMap).filter((path) => path !== '/engineering');
export const engineeringLegacyAliasRoutes = Object.keys(engineeringLegacySectionPathMap);

export const routeSectionOwnership = {
  shared: sharedSectionIds,
  analyst: analystUniqueSectionIds,
  engineer: engineeringUniqueSectionIds,
} as const;

const sectionPathToId = new Map<string, PortfolioSectionId>(
  [
    ...Object.entries(analystSectionPathMap).map(([sectionId, path]) => [path, sectionId as PortfolioSectionId] as const),
    ...Object.entries(engineeringSectionPathMap).map(([sectionId, path]) => [path, sectionId as PortfolioSectionId] as const),
    ...Object.entries(engineeringLegacySectionPathMap).map(([path, sectionId]) => [path, sectionId as PortfolioSectionId] as const),
  ]
);

const normalizePathname = (pathname: string) => {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname || '/';
};

export const getPortfolioRouteMode = (pathname: string): PortfolioRouteMode =>
  normalizePathname(pathname).startsWith(ENGINEERING_PATHNAME) ? 'engineer' : 'analyst';

export const getRootPathForRouteMode = (routeMode: PortfolioRouteMode) =>
  routeMode === 'engineer' ? ENGINEERING_PATHNAME : ANALYST_PATHNAME;

export const getSectionPath = (routeMode: PortfolioRouteMode, sectionId: PortfolioSectionId) => {
  if (routeMode === 'engineer') {
    return engineeringSectionPathMap[sectionId as EngineeringSectionId] ?? ENGINEERING_PATHNAME;
  }

  return analystSectionPathMap[sectionId as AnalystSectionId] ?? ANALYST_PATHNAME;
};

export const getSectionIdFromPathname = (pathname: string) => {
  const normalizedPathname = normalizePathname(pathname);
  return sectionPathToId.get(normalizedPathname) ?? null;
};

export const isRouteRootPath = (pathname: string) => {
  const normalizedPathname = normalizePathname(pathname);
  return normalizedPathname === ANALYST_PATHNAME || normalizedPathname === ENGINEERING_PATHNAME;
};

export const getActiveNavigationSection = (
  routeMode: PortfolioRouteMode,
  sectionId: PortfolioSectionId
) => {
  if (routeMode === 'analyst') {
    return sectionId;
  }

  if (
    sectionId === 'engineering-projects' ||
    sectionId === 'engineering-bridge-projects'
  ) {
    return 'engineering-projects';
  }

  if (sectionId === 'engineering-proof-strip') {
    return 'engineering-home';
  }

  return sectionId;
};
