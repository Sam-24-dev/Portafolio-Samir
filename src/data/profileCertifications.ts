export type CertificationKind = 'verified' | 'program' | 'award';
export type ProfileCertificationRoute = 'analyst' | 'engineer';
export type ProfileCertificationLanguage = 'en' | 'es';

export interface ProfileCertification {
  title: string;
  issuer: string;
  meta: string;
  kind: CertificationKind;
  href?: string;
  hrefLabel?: string;
}

export const profileCertifications: Record<
  ProfileCertificationLanguage,
  Record<ProfileCertificationRoute, ProfileCertification[]>
> = {
  en: {
    analyst: [
      {
        title: 'Microsoft Certified: Power BI Data Analyst Associate',
        issuer: 'Microsoft',
        meta: 'Microsoft Learn credential share',
        kind: 'verified',
        href: 'https://learn.microsoft.com/api/credentials/share/es-es/SamirLeonardoCaizapastoHernandez-2266/A021695B53220029?sharingId=1B76592A76F95900',
        hrefLabel: 'View credential',
      },
      {
        title: 'Data Analyst Associate',
        issuer: 'DataCamp',
        meta: 'Issued Mar 2026',
        kind: 'verified',
        href: 'https://www.datacamp.com/certificate/DAA0019896448643',
        hrefLabel: 'View credential',
      },
      {
        title: 'Microsoft Office Specialist: Excel Associate',
        issuer: 'Microsoft',
        meta: 'Issued Mar 2026',
        kind: 'verified',
        href: 'https://www.credly.com/badges/7ba4ed36-3918-4cc3-9661-8fa869b022ed',
        hrefLabel: 'View credential',
      },
      {
        title: 'Data-Driven Decision Specialist',
        issuer: 'ESPOL & MINTEL',
        meta: 'Bootcamp completion',
        kind: 'program',
        href: 'https://acreditta.com/credential/9a908bad-12b0-4134-99ea-06ca940a92e3?utm_source=copy&resource_type=badge&resource=9a908bad-12b0-4134-99ea-06ca940a92e3',
        hrefLabel: 'View credential',
      },
      {
        title: 'NASA Space Apps Challenge 2025',
        issuer: 'Galactic Problem Solver',
        meta: 'Oct 2025',
        kind: 'award',
        href: 'https://portafolio-samir-tau.vercel.app/certificates/nasa-space-apps-2025.pdf',
        hrefLabel: 'View certificate',
      },
    ],
    engineer: [
      {
        title: 'ETL and ELT in Python',
        issuer: 'DataCamp',
        meta: 'Issued Mar 2026',
        kind: 'verified',
        href: 'https://www.datacamp.com/statement-of-accomplishment/course/cf1b953a1835bd22e0acf97bf28d289ffc151ed2?raw=1',
        hrefLabel: 'View credential',
      },
      {
        title: 'Data-Driven Decision Specialist',
        issuer: 'ESPOL & MINTEL',
        meta: 'Bootcamp completion',
        kind: 'program',
        href: 'https://acreditta.com/credential/9a908bad-12b0-4134-99ea-06ca940a92e3?utm_source=copy&resource_type=badge&resource=9a908bad-12b0-4134-99ea-06ca940a92e3',
        hrefLabel: 'View credential',
      },
      {
        title: 'NASA Space Apps Challenge 2025',
        issuer: 'Galactic Problem Solver',
        meta: 'Oct 2025',
        kind: 'award',
        href: 'https://portafolio-samir-tau.vercel.app/certificates/nasa-space-apps-2025.pdf',
        hrefLabel: 'View certificate',
      },
    ],
  },
  es: {
    analyst: [
      {
        title: 'Microsoft Certified: Power BI Data Analyst Associate',
        issuer: 'Microsoft',
        meta: 'Credencial compartida en Microsoft Learn',
        kind: 'verified',
        href: 'https://learn.microsoft.com/api/credentials/share/es-es/SamirLeonardoCaizapastoHernandez-2266/A021695B53220029?sharingId=1B76592A76F95900',
        hrefLabel: 'Ver credencial',
      },
      {
        title: 'Data Analyst Associate',
        issuer: 'DataCamp',
        meta: 'Emitido en mar. 2026',
        kind: 'verified',
        href: 'https://www.datacamp.com/certificate/DAA0019896448643',
        hrefLabel: 'Ver credencial',
      },
      {
        title: 'Microsoft Office Specialist: Excel Associate',
        issuer: 'Microsoft',
        meta: 'Emitido en mar. 2026',
        kind: 'verified',
        href: 'https://www.credly.com/badges/7ba4ed36-3918-4cc3-9661-8fa869b022ed',
        hrefLabel: 'Ver credencial',
      },
      {
        title: 'Data-Driven Decision Specialist',
        issuer: 'ESPOL & MINTEL',
        meta: 'Bootcamp completado',
        kind: 'program',
        href: 'https://acreditta.com/credential/9a908bad-12b0-4134-99ea-06ca940a92e3?utm_source=copy&resource_type=badge&resource=9a908bad-12b0-4134-99ea-06ca940a92e3',
        hrefLabel: 'Ver credencial',
      },
      {
        title: 'NASA Space Apps Challenge 2025',
        issuer: 'Galactic Problem Solver',
        meta: 'oct. 2025',
        kind: 'award',
        href: 'https://portafolio-samir-tau.vercel.app/certificates/nasa-space-apps-2025.pdf',
        hrefLabel: 'Ver certificado',
      },
    ],
    engineer: [
      {
        title: 'ETL y ELT en Python',
        issuer: 'DataCamp',
        meta: 'Emitido en mar. 2026',
        kind: 'verified',
        href: 'https://www.datacamp.com/statement-of-accomplishment/course/cf1b953a1835bd22e0acf97bf28d289ffc151ed2?raw=1',
        hrefLabel: 'Ver credencial',
      },
      {
        title: 'Data-Driven Decision Specialist',
        issuer: 'ESPOL & MINTEL',
        meta: 'Bootcamp completado',
        kind: 'program',
        href: 'https://acreditta.com/credential/9a908bad-12b0-4134-99ea-06ca940a92e3?utm_source=copy&resource_type=badge&resource=9a908bad-12b0-4134-99ea-06ca940a92e3',
        hrefLabel: 'Ver credencial',
      },
      {
        title: 'NASA Space Apps Challenge 2025',
        issuer: 'Galactic Problem Solver',
        meta: 'oct. 2025',
        kind: 'award',
        href: 'https://portafolio-samir-tau.vercel.app/certificates/nasa-space-apps-2025.pdf',
        hrefLabel: 'Ver certificado',
      },
    ],
  },
};
