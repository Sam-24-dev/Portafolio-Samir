import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, FileText, X } from 'lucide-react';
import { KeyboardEvent as ReactKeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import { CaseStudy } from '../data/caseStudies';
import { Project } from '../data/projects';
import { trackPortfolioEvent } from '../lib/analytics';

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

const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'));
};

const CaseStudyModal = ({ caseStudy, isOpen, onClose, onExited, project, triggerElement }: CaseStudyModalProps) => {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const titleId = useId();
  const overviewTabId = `${titleId}-overview-tab`;
  const previewTabId = `${titleId}-preview-tab`;
  const overviewPanelId = `${titleId}-overview-panel`;
  const previewPanelId = `${titleId}-preview-panel`;
  const [activeTab, setActiveTab] = useState<CaseStudyTab>('overview');
  const [shouldRenderPreview, setShouldRenderPreview] = useState(false);
  const [previewStatus, setPreviewStatus] = useState<PreviewStatus>('idle');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const restoreTarget = triggerElement ?? previouslyFocused;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const appShell = document.getElementById('app-shell');
    const previousAriaHidden = appShell?.getAttribute('aria-hidden') ?? null;
    const shellWasInert = appShell?.hasAttribute('inert') ?? false;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    if (appShell) {
      appShell.setAttribute('aria-hidden', 'true');
      appShell.setAttribute('inert', '');
    }

    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener('keydown', handleEscape);

      if (appShell) {
        if (previousAriaHidden === null) {
          appShell.removeAttribute('aria-hidden');
        } else {
          appShell.setAttribute('aria-hidden', previousAriaHidden);
        }

        if (shellWasInert) {
          appShell.setAttribute('inert', '');
        } else {
          appShell.removeAttribute('inert');
        }
      }

      restoreTarget?.focus();
    };
  }, [isOpen, onClose, triggerElement]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveTab('overview');
    setShouldRenderPreview(false);
    setPreviewStatus('idle');
  }, [isOpen, caseStudy?.projectId]);

  useEffect(() => {
    if (!isOpen || activeTab !== 'preview' || !shouldRenderPreview || previewStatus !== 'loading') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPreviewStatus((currentStatus) => (currentStatus === 'loading' ? 'error' : currentStatus));
    }, 6500);

    return () => {
      window.clearTimeout(timeoutId);
    };
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
  const overlayTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.18, ease: 'easeOut' };
  const panelTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: 'easeOut' };
  const panelInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 };
  const tabs: Array<{ id: CaseStudyTab; label: string; tabId: string; panelId: string; disabled?: boolean }> = [
    {
      id: 'overview',
      label: t.projects.overviewTab,
      tabId: overviewTabId,
      panelId: overviewPanelId,
    },
    {
      id: 'preview',
      label: t.projects.livePreviewTab,
      tabId: previewTabId,
      panelId: previewPanelId,
      disabled: !hasPreview,
    },
  ];

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = getFocusableElements(dialogRef.current);

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (!activeElement || activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      return;
    }

    if (!activeElement || activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    const tabCount = tabs.length;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (index + 1) % tabCount;
      const nextTab = tabs[nextIndex];
      tabRefs.current[nextIndex]?.focus();
      if (!nextTab.disabled) {
        handleSelectTab(nextTab.id);
      }
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const previousIndex = (index - 1 + tabCount) % tabCount;
      const previousTab = tabs[previousIndex];
      tabRefs.current[previousIndex]?.focus();
      if (!previousTab.disabled) {
        handleSelectTab(previousTab.id);
      }
    }

    if (event.key === 'Home') {
      event.preventDefault();
      tabRefs.current[0]?.focus();
      handleSelectTab('overview');
    }

    if (event.key === 'End') {
      event.preventDefault();
      tabRefs.current[tabCount - 1]?.focus();
      if (hasPreview) {
        handleSelectTab('preview');
      }
    }
  };

  const handleSelectTab = (nextTab: CaseStudyTab) => {
    setActiveTab(nextTab);

    if (nextTab === 'preview' && hasPreview && !shouldRenderPreview) {
      setShouldRenderPreview(true);
      setPreviewStatus('loading');
    }
  };

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

  const previewPanel = hasPreview ? (
    <div
      id={previewPanelId}
      role="tabpanel"
      aria-labelledby={previewTabId}
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

          {previewStatus === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center backdrop-blur-sm dark:bg-primary-bg/75 light:bg-slate-900/45">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent-cyan/30 border-t-accent-cyan" />
              <p className="text-sm font-medium dark:text-text-primary light:text-white">{t.projects.previewLoading}</p>
            </div>
          )}

          {previewStatus === 'error' && (
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
          )}
        </div>
      </section>
    </div>
  ) : null;

  return createPortal(
    <AnimatePresence onExitComplete={onExited}>
      {isOpen && (
        <motion.div
          key="case-study-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          className="fixed inset-0 z-[90] backdrop-blur-md dark:bg-primary-bg/80 light:bg-slate-900/40"
          onClick={onClose}
        >
          <div className="flex min-h-full items-end justify-center sm:items-center sm:p-6">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={panelInitial}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={panelInitial}
              transition={panelTransition}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={handleDialogKeyDown}
            className="flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[32px] border shadow-[0_28px_80px_rgba(15,23,42,0.22)] dark:border-primary-lighter dark:bg-primary-light light:border-lightMode-border light:bg-white sm:max-h-[90vh] sm:max-w-5xl sm:rounded-[32px]"
            >
              <div className="sticky top-0 z-20 border-b px-5 py-4 backdrop-blur-sm dark:border-primary-lighter dark:bg-primary-light/95 light:border-lightMode-border light:bg-lightMode-surface/95 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="ui-eyebrow mb-2 text-xs font-semibold uppercase tracking-[0.2em]">
                      {t.projects.caseStudyBadge}
                    </p>
                    <h3
                      id={titleId}
                      className="text-2xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary sm:text-3xl"
                    >
                      {title}
                    </h3>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    aria-label={t.projects.closeCaseStudy}
                    className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border transition-colors dark:border-primary-lighter dark:bg-primary-bg/80 dark:text-text-primary dark:hover:border-accent-cyan dark:hover:text-accent-cyan light:border-lightMode-border light:bg-lightMode-surfaceAlt light:text-lightMode-text-primary light:hover:border-lightMode-accent-primary light:hover:text-lightMode-accent-primary"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-4 overflow-x-auto pb-1">
                  <div
                    role="tablist"
                    aria-label={t.projects.caseStudyTabsLabel}
                    className="ui-control-shell inline-flex rounded-full"
                  >
                    {tabs.map((tab, index) => {
                      const isSelected = activeTab === tab.id;

                      return (
                        <button
                          key={tab.id}
                          ref={(element) => {
                            tabRefs.current[index] = element;
                          }}
                          id={tab.tabId}
                          role="tab"
                          type="button"
                          aria-selected={isSelected}
                          aria-controls={tab.panelId}
                          tabIndex={isSelected ? 0 : -1}
                          disabled={tab.disabled}
                          onClick={() => handleSelectTab(tab.id)}
                          onKeyDown={(event) => handleTabKeyDown(event, index)}
                          className={`focus-ring ui-control-toggle rounded-full ${
                            isSelected
                              ? 'ui-control-toggle-active'
                              : 'ui-control-toggle-idle'
                          } ${tab.disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto overscroll-contain px-5 pb-6 pt-5 light:bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] sm:px-6 sm:pb-8 md:px-8">
                <div
                  id={overviewPanelId}
                  role="tabpanel"
                  aria-labelledby={overviewTabId}
                  hidden={activeTab !== 'overview'}
                  className={activeTab === 'overview' ? undefined : 'hidden'}
                >
                  <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
                    <div className="self-start overflow-hidden rounded-[24px] border shadow-sm dark:border-primary-lighter dark:bg-primary-bg/60 light:border-lightMode-border light:bg-white">
                      <div className="aspect-[16/10] w-full">
                        <img
                          src={project.image}
                          alt={title}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
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

                {previewPanel}

                <div className="mt-6 flex flex-col gap-3 border-t pt-5 dark:border-primary-lighter light:border-lightMode-border sm:flex-row sm:flex-wrap">
                  {!(activeTab === 'preview' && previewStatus === 'error') && (
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
                  )}

                  {caseStudy.links.caseStudyUrl && (
                    <a
                      href={caseStudy.links.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring ui-btn-secondary flex"
                    >
                      <FileText size={16} />
                      <span>{t.projects.repositoryNotes}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CaseStudyModal;
