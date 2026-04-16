import { ExternalLink, FileText } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { CaseStudy } from '../data/caseStudies';
import type { Project } from '../data/projects';
import { trackPortfolioEvent } from '../lib/analytics';
import ProjectModalShell, { type ProjectModalTabDefinition } from './ProjectModalShell';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  project: Project | null;
  triggerElement: HTMLElement | null;
}

type CaseStudyTab = 'overview' | 'preview';
type PreviewStatus = 'idle' | 'loading' | 'ready' | 'error';

const CaseStudyModal = ({ caseStudy, isOpen, onClose, onExited, project, triggerElement }: CaseStudyModalProps) => {
  const { t, language } = useLanguage();
  const modalId = useId();
  const [activeTab, setActiveTab] = useState<CaseStudyTab>('overview');
  const [shouldRenderPreview, setShouldRenderPreview] = useState(false);
  const [previewStatus, setPreviewStatus] = useState<PreviewStatus>('idle');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveTab('overview');
    setShouldRenderPreview(false);
    setPreviewStatus('idle');
  }, [caseStudy?.projectId, isOpen]);

  useEffect(() => {
    if (!isOpen || activeTab !== 'preview' || !shouldRenderPreview || previewStatus !== 'loading') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPreviewStatus((currentStatus) => (currentStatus === 'loading' ? 'error' : currentStatus));
    }, 6500);

    return () => window.clearTimeout(timeoutId);
  }, [activeTab, isOpen, previewStatus, shouldRenderPreview]);

  if (!caseStudy || !project) {
    return null;
  }

  const title = language === 'es' ? project.titleEs : project.title;
  const summary = language === 'es' ? caseStudy.summaryEs : caseStudy.summary;
  const roleSummary = language === 'es' ? caseStudy.roleSummaryEs : caseStudy.roleSummary;
  const businessProblem = language === 'es' ? caseStudy.businessProblemEs : caseStudy.businessProblem;
  const datasetAndWorkflow = language === 'es' ? caseStudy.datasetAndWorkflowEs : caseStudy.datasetAndWorkflow;
  const toolsUsed = language === 'es' ? caseStudy.toolsUsedEs : caseStudy.toolsUsed;
  const metricsAndResult = language === 'es' ? caseStudy.metricsAndResultEs : caseStudy.metricsAndResult;
  const whyItMatters = language === 'es' ? caseStudy.whyItMattersEs : caseStudy.whyItMatters;
  const hasPreview = Boolean(caseStudy.previewUrl && caseStudy.previewType);
  const previewFrameTitle =
    language === 'es' ? `${title} vista en vivo` : caseStudy.previewTitle ?? `${title} live preview`;
  const primaryActionLabel =
    project.dashboardUrl
      ? t.projects.dashboard
      : language === 'es' && project.demoLabelEs
        ? project.demoLabelEs
        : language === 'en' && project.demoLabel
          ? project.demoLabel
          : t.projects.liveDemo;

  const tabs: ProjectModalTabDefinition[] = [
    {
      id: 'overview',
      label: t.projects.overviewTab,
      tabId: `${modalId}-overview-tab`,
      panelId: `${modalId}-overview-panel`,
    },
    {
      id: 'preview',
      label: t.projects.livePreviewTab,
      tabId: `${modalId}-preview-tab`,
      panelId: `${modalId}-preview-panel`,
      disabled: !hasPreview,
    },
  ];

  const handlePrimaryActionClick = () => {
    if (project.dashboardUrl) {
      trackPortfolioEvent('project_dashboard_click', {
        location: 'case_study_modal',
        language,
        projectId: project.id,
        target: 'dashboard',
      });
      return;
    }

    trackPortfolioEvent('project_demo_click', {
      location: 'case_study_modal',
      language,
      projectId: project.id,
      target: 'live_demo',
    });
  };

  const handleSelectTab = (nextTab: string) => {
    const normalizedTab = nextTab as CaseStudyTab;
    setActiveTab(normalizedTab);

    if (normalizedTab === 'preview' && hasPreview && !shouldRenderPreview) {
      setShouldRenderPreview(true);
      setPreviewStatus('loading');
    }
  };

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
      triggerElement={triggerElement}
      theme="analyst"
      badge={t.projects.caseStudyBadge}
      title={title}
      closeLabel={t.projects.closeCaseStudy}
      tabListLabel={t.projects.caseStudyTabsLabel}
      tabs={tabs}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      footer={
        <>
          {!(activeTab === 'preview' && previewStatus === 'error') ? (
            <a
              href={caseStudy.links.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring ui-btn-primary flex"
              onClick={handlePrimaryActionClick}
            >
              <ExternalLink size={16} />
              <span>{primaryActionLabel}</span>
            </a>
          ) : null}

          {caseStudy.links.caseStudyUrl ? (
            <a
              href={caseStudy.links.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring ui-btn-secondary flex"
            >
              <FileText size={16} />
              <span>{t.projects.repositoryNotes}</span>
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
        className={activeTab === 'overview' ? undefined : 'hidden'}
      >
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="self-start overflow-hidden rounded-[24px] border shadow-sm dark:border-primary-lighter dark:bg-primary-bg/60 light:border-lightMode-border light:bg-white">
            <div className="aspect-[16/10] w-full">
              <img src={project.image} alt={title} className="h-full w-full object-cover object-top" loading="lazy" />
            </div>
          </div>

          <div className="space-y-4">
            <section className="ui-surface-neutral rounded-[24px] border p-5 shadow-sm sm:p-6">
              <p className="ui-eyebrow mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                {t.projects.executiveSummary}
              </p>
              <p className="text-base leading-relaxed dark:text-text-primary light:text-lightMode-text-primary">
                {summary}
              </p>
            </section>

            <section className="ui-surface-teal rounded-[24px] border p-5 sm:p-6">
              <p className="ui-eyebrow mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                {t.projects.roleInCaseTitle}
              </p>
              <p className="text-sm leading-relaxed dark:text-text-primary light:text-lightMode-text-primary">
                {roleSummary}
              </p>
            </section>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="space-y-4">
            <section className="ui-surface-neutral rounded-[24px] border p-5 shadow-sm sm:p-6">
              <h4 className="mb-3 text-lg font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {t.projects.metricsResultsTitle}
              </h4>
              <div className="grid items-start gap-3 sm:grid-cols-3">
                {metricsAndResult.map((metric) => (
                  <div
                    key={metric}
                    className="self-start rounded-2xl border px-4 py-3 shadow-sm dark:border-accent-cyan/20 dark:bg-accent-cyan/5 light:border-lightMode-border light:bg-white"
                  >
                    <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                      {metric}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="ui-surface-neutral rounded-[24px] border p-5 shadow-sm sm:p-6">
              <h4 className="mb-3 text-lg font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {t.projects.businessProblemTitle}
              </h4>
              <ul className="space-y-3">
                {businessProblem.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary"
                  >
                    <span className="mt-1 dark:text-accent-cyan light:text-lightMode-accent-primary">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-4">
            <section className="ui-surface-teal rounded-[24px] border p-5 sm:p-6">
              <h4 className="mb-3 text-lg font-poppins font-semibold dark:text-accent-cyan light:text-lightMode-accent-primary">
                {t.projects.whyItMattersTitle}
              </h4>
              <p className="text-sm leading-relaxed dark:text-text-primary light:text-lightMode-text-primary">
                {whyItMatters}
              </p>
            </section>

            <section className="ui-surface-neutral rounded-[24px] border p-5 shadow-sm sm:p-6">
              <h4 className="mb-3 text-lg font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {t.projects.datasetWorkflowTitle}
              </h4>
              <ul className="space-y-3">
                {datasetAndWorkflow.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary"
                  >
                    <span className="mt-1 dark:text-accent-cyan light:text-lightMode-accent-primary">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t pt-4 dark:border-primary-lighter light:border-lightMode-border">
                <div className="flex flex-wrap gap-2">
                  {toolsUsed.map((tool) => (
                    <span key={tool} className="ui-pill-blue px-3 py-1 text-xs font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {hasPreview ? (
        <div
          id={tabs[1].panelId}
          role="tabpanel"
          aria-labelledby={tabs[1].tabId}
          hidden={activeTab !== 'preview'}
          className={activeTab === 'preview' ? 'mt-6' : 'hidden'}
        >
          <section className="rounded-[28px] border p-5 dark:border-primary-lighter dark:bg-primary-bg/60 light:border-lightMode-border light:bg-lightMode-surfaceAlt sm:p-6">
            <div className="relative overflow-hidden rounded-[24px] border dark:border-primary-lighter light:border-lightMode-border">
              {shouldRenderPreview && caseStudy.previewUrl ? (
                <iframe
                  src={caseStudy.previewUrl}
                  title={previewFrameTitle}
                  className="h-[420px] w-full bg-white md:h-[500px]"
                  loading="lazy"
                  allowFullScreen
                  onLoad={() => setPreviewStatus('ready')}
                  onError={() => setPreviewStatus('error')}
                />
              ) : null}

              {previewStatus === 'loading' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center backdrop-blur-sm dark:bg-primary-bg/75 light:bg-slate-900/45">
                  <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent-cyan/30 border-t-accent-cyan" />
                  <p className="text-sm font-medium dark:text-text-primary light:text-white">{t.projects.previewLoading}</p>
                </div>
              ) : null}

              {previewStatus === 'error' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10 text-center backdrop-blur-sm dark:bg-primary-bg/85 light:bg-slate-900/50">
                  <div className="ui-surface-neutral w-full max-w-xl rounded-[24px] border border-dashed px-6 py-10">
                    <p className="ui-eyebrow mb-3 text-sm font-semibold uppercase tracking-[0.18em]">
                      {t.projects.previewUnavailableTitle}
                    </p>
                    <p className="mb-6 text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                      {t.projects.previewUnavailableBody}
                    </p>
                    <a
                      href={caseStudy.links.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring ui-btn-primary inline-flex"
                      onClick={handlePrimaryActionClick}
                    >
                      <ExternalLink size={16} />
                      <span>{t.projects.previewOpenExternal}</span>
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </ProjectModalShell>
  );
};

export default CaseStudyModal;
