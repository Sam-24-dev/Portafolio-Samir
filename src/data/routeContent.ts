import type { AnalystSectionId, PortfolioRouteMode } from '../lib/portfolioRoute';
import { engineeringRouteContent } from './engineeringContent';

export type PortfolioLocale = 'en' | 'es';

interface RouteMetaContent {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

interface RouteSwitchContent {
  label: string;
  analyst: string;
  engineer: string;
}

interface AnalystRouteContent {
  metadata: RouteMetaContent;
  exploreEngineering: string;
  navigation: Array<{
    id: AnalystSectionId;
    label: string;
  }>;
  contactSupportCopy: string;
}

const siteOrigin = 'https://portafolio-samir-tau.vercel.app';

export const routeSwitchContent: Record<PortfolioLocale, RouteSwitchContent> = {
  en: {
    label: 'Portfolio profile',
    analyst: 'Data Analyst',
    engineer: 'Data Engineer',
  },
  es: {
    label: 'Perfil del portafolio',
    analyst: 'Data Analyst',
    engineer: 'Data Engineer',
  },
};

export const analystRouteContent: Record<PortfolioLocale, AnalystRouteContent> = {
  en: {
    metadata: {
      title: 'Samir Caizapasto | Data Analyst Portfolio',
      description:
        'Data Analyst portfolio focused on business-ready dashboards, SQL workflows, and measurable project impact across customer analytics, BI, and statistical modeling.',
      canonicalPath: '/',
      ogTitle: 'Samir Caizapasto | Data Analyst Portfolio',
      ogDescription:
        'Analyst-first portfolio with bilingual delivery, measurable project outcomes, and recruiter-friendly proof of impact.',
      twitterTitle: 'Samir Caizapasto | Data Analyst Portfolio',
      twitterDescription: 'Data Analyst focused on clear dashboards, KPI tracking, and decision-ready insights.',
    },
    exploreEngineering: 'Explore Data Engineering',
    navigation: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'projects', label: 'Projects' },
      { id: 'strengths', label: 'Strengths' },
      { id: 'contact', label: 'Contact' },
    ],
    contactSupportCopy:
      'I am open to analyst roles and collaborations where I can turn data into clear analysis, useful dashboards, and better-informed decisions.',
  },
  es: {
    metadata: {
      title: 'Samir Caizapasto | Portafolio de Analista de Datos',
      description:
        'Portafolio de Analista de Datos enfocado en dashboards listos para negocio, flujos con SQL y proyectos con impacto medible en BI, customer analytics y análisis estadístico.',
      canonicalPath: '/',
      ogTitle: 'Samir Caizapasto | Portafolio de Analista de Datos',
      ogDescription:
        'Portafolio analyst-first con entrega bilingüe, resultados medibles y prueba clara de impacto para reclutamiento.',
      twitterTitle: 'Samir Caizapasto | Portafolio de Analista de Datos',
      twitterDescription:
        'Analista de datos enfocado en dashboards claros, KPIs y resultados listos para decisión.',
    },
    exploreEngineering: 'Ver perfil Data Engineer',
    navigation: [
      { id: 'home', label: 'Inicio' },
      { id: 'about', label: 'Sobre mí' },
      { id: 'projects', label: 'Proyectos' },
      { id: 'strengths', label: 'Fortalezas' },
      { id: 'contact', label: 'Contacto' },
    ],
    contactSupportCopy:
      'Estoy abierto a roles y colaboraciones donde pueda convertir datos en análisis claros, dashboards útiles y decisiones mejor informadas.',
  },
};

export { engineeringRouteContent } from './engineeringContent';

export const getPortfolioMetadata = (language: PortfolioLocale, mode: PortfolioRouteMode) => {
  const metadata =
    mode === 'engineer' ? engineeringRouteContent[language].metadata : analystRouteContent[language].metadata;

  return {
    ...metadata,
    canonicalUrl: `${siteOrigin}${metadata.canonicalPath}`,
  };
};
