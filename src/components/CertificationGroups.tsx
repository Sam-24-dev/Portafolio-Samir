import { ExternalLink } from 'lucide-react';
import type { ProfileCertification, CertificationKind } from '../data/profileCertifications';

interface CertificationGroupsCopy {
  verifiedCredentials: string;
  verifiedCredentialsNote: string;
  programCompletion: string;
  programCompletionNote: string;
  awardsRecognition: string;
  awardsRecognitionNote: string;
  credentialTag: string;
  programTag: string;
  awardTag: string;
}

interface CertificationGroupsProps {
  certifications: ProfileCertification[];
  copy: CertificationGroupsCopy;
}

const CertificationGroups = ({ certifications, copy }: CertificationGroupsProps) => {
  const getCertificationTag = (kind: CertificationKind) => {
    switch (kind) {
      case 'verified':
        return copy.credentialTag;
      case 'program':
        return copy.programTag;
      default:
        return copy.awardTag;
    }
  };

  const getCertificationTagClasses = (kind: CertificationKind) => {
    switch (kind) {
      case 'verified':
        return 'ui-pill-teal';
      case 'program':
        return 'ui-pill-blue';
      default:
        return 'ui-pill-amber';
    }
  };

  const getIssuerClasses = (kind: CertificationKind) => {
    switch (kind) {
      case 'verified':
        return 'ui-eyebrow';
      case 'program':
        return 'text-lightMode-accent-secondary dark:text-accent-blue';
      default:
        return 'text-lightMode-accent-tertiary dark:text-yellow-400';
    }
  };

  const verifiedCredentials = certifications.filter((certification) => certification.kind === 'verified');
  const programCredentials = certifications.filter((certification) => certification.kind === 'program');
  const awardCredentials = certifications.filter((certification) => certification.kind === 'award');
  const verifiedGridClassName =
    verifiedCredentials.length > 1 ? 'grid gap-4 md:grid-cols-2' : 'grid gap-4';

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <section className="rounded-[24px] border p-5 dark:border-primary-lighter dark:bg-primary-light/35 light:border-lightMode-border light:bg-lightMode-surfaceAlt">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="ui-eyebrow mb-2 text-xs font-semibold uppercase tracking-[0.18em]">{copy.verifiedCredentials}</p>
            <p className="max-w-2xl text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
              {copy.verifiedCredentialsNote}
            </p>
          </div>
        </div>

        <div className={verifiedGridClassName} data-testid="certifications-verified-grid">
          {verifiedCredentials.map((certification) => (
            <article
              key={`${certification.title}-${certification.issuer}`}
              className="flex h-full flex-col justify-between rounded-[20px] border p-4 dark:border-primary-lighter dark:bg-primary-bg/70 light:border-lightMode-border light:bg-lightMode-surface"
            >
              <div>
                <span className={`mb-4 px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${getCertificationTagClasses(certification.kind)}`}>
                  {getCertificationTag(certification.kind)}
                </span>
                <p className="mb-1 text-base font-semibold dark:text-text-primary light:text-lightMode-text-primary">
                  {certification.title}
                </p>
                <p className={`mb-2 text-sm font-medium ${getIssuerClasses(certification.kind)}`}>{certification.issuer}</p>
                <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                  {certification.meta}
                </p>
              </div>

              {certification.href && certification.hrefLabel && (
                <a
                  href={certification.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn-secondary mt-5 w-full"
                >
                  <span>{certification.hrefLabel}</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-5">
        <section className="rounded-[24px] border p-5 dark:border-primary-lighter dark:bg-primary-light/35 light:border-lightMode-border light:bg-lightMode-surfaceAlt">
          <div className="mb-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-lightMode-accent-secondary dark:text-accent-blue">
              {copy.programCompletion}
            </p>
            <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
              {copy.programCompletionNote}
            </p>
          </div>

          {programCredentials.map((certification) => (
            <article
              key={`${certification.title}-${certification.issuer}`}
              className="rounded-[20px] border p-4 dark:border-primary-lighter dark:bg-primary-bg/70 light:border-lightMode-border light:bg-lightMode-surface"
            >
              <span className={`mb-4 px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${getCertificationTagClasses(certification.kind)}`}>
                {getCertificationTag(certification.kind)}
              </span>
              <p className="mb-1 text-base font-semibold dark:text-text-primary light:text-lightMode-text-primary">
                {certification.title}
              </p>
              <p className={`mb-2 text-sm font-medium ${getIssuerClasses(certification.kind)}`}>{certification.issuer}</p>
              <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                {certification.meta}
              </p>

              {certification.href && certification.hrefLabel && (
                <a
                  href={certification.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn-secondary mt-5 w-full"
                >
                  <span>{certification.hrefLabel}</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </article>
          ))}
        </section>

        <section className="rounded-[24px] border p-5 dark:border-primary-lighter dark:bg-primary-light/35 light:border-lightMode-border light:bg-lightMode-surfaceAlt">
          <div className="mb-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-lightMode-accent-tertiary dark:text-yellow-400">
              {copy.awardsRecognition}
            </p>
            <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
              {copy.awardsRecognitionNote}
            </p>
          </div>

          {awardCredentials.map((certification) => (
            <article
              key={`${certification.title}-${certification.issuer}`}
              className="rounded-[20px] border p-4 dark:border-primary-lighter dark:bg-primary-bg/70 light:border-lightMode-border light:bg-lightMode-surface"
            >
              <span className={`mb-4 px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${getCertificationTagClasses(certification.kind)}`}>
                {getCertificationTag(certification.kind)}
              </span>
              <p className="mb-1 text-base font-semibold dark:text-text-primary light:text-lightMode-text-primary">
                {certification.title}
              </p>
              <p className={`mb-2 text-sm font-medium ${getIssuerClasses(certification.kind)}`}>{certification.issuer}</p>
              <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                {certification.meta}
              </p>

              {certification.href && certification.hrefLabel && (
                <a
                  href={certification.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn-amber mt-5 w-full"
                >
                  <span>{certification.hrefLabel}</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CertificationGroups;
