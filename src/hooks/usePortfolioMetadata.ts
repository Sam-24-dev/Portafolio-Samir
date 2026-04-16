import { useEffect } from 'react';
import { getPortfolioMetadata } from '../data/routeContent';
import { useLanguage } from '../context/LanguageContext';
import type { PortfolioRouteMode } from '../lib/portfolioRoute';

const ensureMetaByName = (name: string) => {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }

  return element;
};

const ensureMetaByProperty = (property: string) => {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }

  return element;
};

const ensureCanonicalLink = () => {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  return element;
};

export const usePortfolioMetadata = (routeMode: PortfolioRouteMode) => {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const metadata = getPortfolioMetadata(language, routeMode);
    document.title = metadata.title;
    ensureMetaByName('description').setAttribute('content', metadata.description);
    ensureMetaByProperty('og:title').setAttribute('content', metadata.ogTitle);
    ensureMetaByProperty('og:description').setAttribute('content', metadata.ogDescription);
    ensureMetaByProperty('og:url').setAttribute('content', metadata.canonicalUrl);
    ensureMetaByName('twitter:title').setAttribute('content', metadata.twitterTitle);
    ensureMetaByName('twitter:description').setAttribute('content', metadata.twitterDescription);
    ensureCanonicalLink().setAttribute('href', metadata.canonicalUrl);
  }, [language, routeMode]);
};
