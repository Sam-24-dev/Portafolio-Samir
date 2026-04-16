import { ExternalLink, Github } from 'lucide-react';
import { useEffect, useId, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { EngineeringCaseStudy, EngineeringCaseTab, EngineeringFeaturedProject } from '../data/engineeringContent';
import { engineeringRouteContent } from '../data/routeContent';
import { trackPortfolioEvent } from '../lib/analytics';
import ProjectModalShell, { type ProjectModalTabDefinition } from './ProjectModalShell';

interface EngineeringCaseModalProps {
  caseStudy: EngineeringCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  project: EngineeringFeaturedProject | null;
  triggerElement: HTMLElement | null;
}

const EngineeringCaseModal = ({
  caseStudy,
  isOpen,
  onClose,
  onExited,
  project,
  triggerElement,
}: EngineeringCaseModalProps) => {
  const { language } = useLanguage();
  const modalId = useId();
  const [activeTab, setActiveTab] = useState<EngineeringCaseTab>('overview');

  const content = engineeringRouteContent[language].caseStudyModal;

  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [caseStudy?.id, isOpen]);

  const tabs: ProjectModalTabDefinition[] = useMemo(
    () => [
      {
        id: 'overview',
        label: content.overviewTab,
        tabId: `${modalId}-overview-tab`,
        panelId: `${modalId}-overview-panel`,
      },
      {
        id: 'architecture',
        label: content.architectureTab,
        tabId: `${modalId}-architecture-tab`,
        panelId: `${modalId}-architecture-panel`,
      },
      {
        id: 'delivery',
        label: content.deliveryTab,
        tabId: `${modalId}-delivery-tab`,
        panelId: `${modalId}-delivery-panel`,
      },
    ],
    [content.architectureTab, content.deliveryTab, content.overviewTab, modalId]
  );

  if (!caseStudy || !project) {
    return null;
  }

  const summary = language === 'es' ? caseStudy.summaryEs : caseStudy.summary;
  const whyItMatters = language === 'es' ? caseStudy.whyItMattersEs : caseStudy.whyItMatters;
  const evidence = caseStudy.evidence.map((item) => ({
    eyebrow: language === 'es' ? item.eyebrowEs : item.eyebrow,
    detail: language === 'es' ? item.detailEs : item.detail,
  }));
  const architectureSections = caseStudy.architectureSections.map((section) => ({
    title: language === 'es' ? section.titleEs : section.title,
    body: language === 'es' ? section.bodyEs : section.body,
  }));
  const deliverySections = caseStudy.deliverySections.map((section) => ({
    title: language === 'es' ? section.titleEs : section.title,
    body: language === 'es' ? section.bodyEs : section.body,
  }));
  const architectureImageAlt = language === 'es' ? caseStudy.architectureImageAltEs : caseStudy.architectureImageAlt;
  const deliveryImageAlt = language === 'es' ? caseStudy.deliveryImageAltEs : caseStudy.deliveryImageAlt;

  const renderNarrativeGrid = (sections: Array<{ title: string; body: string }>) => (
    <div className="grid gap-4 lg:grid-cols-3">
      {sections.map((section) => (
        <article key={section.title} className="ui-engineering-surface rounded-[24px] border p-5">
          <h4 className="mb-3 text-lg font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
            {section.title}
          </h4>
          <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">{section.body}</p>
        </article>
      ))}
    </div>
  );

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={() => {
        setActiveTab('overview');
        onClose();
      }}
      onExited={onExited}
      triggerElement={triggerElement}
      theme="engineering"
      badge={content.badge}
      title={project.title}
      subtitle={project.description}
      closeLabel={content.closeLabel}
      tabListLabel={content.tabsLabel}
      tabs={tabs}
      activeTab={activeTab}
      onSelectTab={(nextTab) => setActiveTab(nextTab as EngineeringCaseTab)}
      footer={
        <>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring ui-engineering-btn-primary"
            onClick={() =>
              trackPortfolioEvent('engineering_repo_click', {
                location: 'engineering_case_modal',
                language,
                routeMode: 'engineer',
                projectSlug: project.id,
                target: 'github_repo',
              })
            }
          >
            <Github size={16} />
            <span>{content.repoButtonLabel}</span>
          </a>

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring ui-engineering-btn-secondary"
              onClick={() =>
                trackPortfolioEvent('engineering_demo_click', {
                  location: 'engineering_case_modal',
                  language,
                  routeMode: 'engineer',
                  projectSlug: project.id,
                  target: 'live_demo',
                })
              }
            >
              <ExternalLink size={16} />
              <span>{content.demoButtonLabel}</span>
            </a>
          ) : null}
        </>
      }
    >
      <div
        id={tabs[0].panelId}
        role="tabpanel"
        aria-labelledby={tabs[0].tabId}
        hidden={activeTab !== 'overview'}
        className={activeTab === 'overview' ? 'space-y-6' : 'hidden'}
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <section className="ui-engineering-surface rounded-[24px] border p-5 sm:p-6">
            <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
              {content.summaryLabel}
            </p>
            <p className="text-base leading-relaxed dark:text-text-primary light:text-lightMode-text-primary">{summary}</p>
          </section>

          <section className="rounded-[24px] border border-[var(--engineering-pill-border)] bg-[var(--engineering-pill-bg)] p-5 sm:p-6">
            <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
              {content.whyItMattersLabel}
            </p>
            <p className="text-sm leading-relaxed dark:text-text-primary light:text-lightMode-text-primary">
              {whyItMatters}
            </p>
          </section>
        </div>

        <section>
          <p className="ui-engineering-kicker mb-3 text-xs font-semibold uppercase tracking-[0.18em]">
            {content.verifiedEvidenceLabel}
          </p>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {evidence.map((item) => (
              <article
                key={`${item.eyebrow}-${item.detail}`}
                className="rounded-2xl border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] px-4 py-4"
              >
                <p className="engineering-gradient-text mb-2 text-sm font-poppins font-semibold">{item.eyebrow}</p>
                <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div
        id={tabs[1].panelId}
        role="tabpanel"
        aria-labelledby={tabs[1].tabId}
        hidden={activeTab !== 'architecture'}
        className={activeTab === 'architecture' ? 'space-y-6' : 'hidden'}
      >
        <figure className="overflow-hidden rounded-[28px] border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] p-2 sm:p-3">
          <div className="flex items-center justify-center rounded-[22px] bg-[var(--engineering-surface-bg)] px-2 py-3 sm:px-4 sm:py-4">
            <img
              src={caseStudy.architectureImage}
              alt={architectureImageAlt}
              className="h-auto max-h-[16rem] w-full rounded-[18px] object-contain sm:max-h-[20rem] lg:max-h-[26rem]"
              loading="lazy"
            />
          </div>
        </figure>

        {renderNarrativeGrid(architectureSections)}
      </div>

      <div
        id={tabs[2].panelId}
        role="tabpanel"
        aria-labelledby={tabs[2].tabId}
        hidden={activeTab !== 'delivery'}
        className={activeTab === 'delivery' ? 'space-y-6' : 'hidden'}
      >
        <figure className="overflow-hidden rounded-[28px] border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] p-2 sm:p-3">
          <div className="flex items-center justify-center rounded-[22px] bg-[var(--engineering-surface-bg)] px-2 py-3 sm:px-4 sm:py-4">
            <img
              src={caseStudy.deliveryImage}
              alt={deliveryImageAlt}
              className="h-auto max-h-[16rem] w-full rounded-[18px] object-contain sm:max-h-[20rem] lg:max-h-[26rem]"
              loading="lazy"
            />
          </div>
        </figure>

        {renderNarrativeGrid(deliverySections)}
      </div>
    </ProjectModalShell>
  );
};

export default EngineeringCaseModal;
