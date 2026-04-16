const NAV_OFFSET = 80;

export interface SectionNavigationState {
  scrollBehavior?: ScrollBehavior;
}

export const scrollToSectionById = (sectionId: string, smooth: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  const element = document.getElementById(sectionId);
  if (!element) {
    return;
  }

  const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;

  window.scrollTo({
    top: offsetPosition,
    behavior: smooth ? 'smooth' : 'auto',
  });
};

export const clearHashFromUrl = (pathname: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.history.replaceState(null, '', `${pathname}${window.location.search}`);
};

export const scrollToPageTop = (smooth: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
};

export const scrollToHashTarget = (hash: string, smooth: boolean) => {
  if (!hash) {
    return;
  }

  scrollToSectionById(hash.replace(/^#/, ''), smooth);
};
