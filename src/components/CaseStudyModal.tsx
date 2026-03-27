import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, FileText, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import { CaseStudy } from '../data/caseStudies';
import { Project } from '../data/projects';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const CaseStudyModal = ({ caseStudy, isOpen, onClose, project }: CaseStudyModalProps) => {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
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
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !caseStudy || !project) {
    return null;
  }

  const title = language === 'es' ? project.titleEs : project.title;
  const summary = language === 'es' ? caseStudy.summaryEs : caseStudy.summary;
  const roleSummary = language === 'es' ? caseStudy.roleSummaryEs : caseStudy.roleSummary;
  const businessProblem = language === 'es' ? caseStudy.businessProblemEs : caseStudy.businessProblem;
  const datasetAndWorkflow =
    language === 'es' ? caseStudy.datasetAndWorkflowEs : caseStudy.datasetAndWorkflow;
  const toolsUsed = language === 'es' ? caseStudy.toolsUsedEs : caseStudy.toolsUsed;
  const metricsAndResult =
    language === 'es' ? caseStudy.metricsAndResultEs : caseStudy.metricsAndResult;
  const whyItMatters = language === 'es' ? caseStudy.whyItMattersEs : caseStudy.whyItMatters;
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

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="case-study-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={overlayTransition}
        className="fixed inset-0 z-[90] bg-primary-bg/80 backdrop-blur-md"
        onClick={onClose}
      >
        <div className="flex min-h-full items-end justify-center sm:items-center sm:p-6">
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} ${t.projects.caseStudyDialogLabel}`}
            initial={panelInitial}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={panelInitial}
            transition={panelTransition}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[32px] border dark:border-primary-lighter dark:bg-primary-light light:border-lightMode-border light:bg-lightMode-surface sm:max-h-[90vh] sm:max-w-5xl sm:rounded-[32px]"
          >
            <div className="sticky top-0 z-20 border-b px-5 py-4 backdrop-blur-sm dark:border-primary-lighter dark:bg-primary-light/95 light:border-lightMode-border light:bg-lightMode-surface/95 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
                    {t.projects.caseStudyBadge}
                  </p>
                  <h3 className="text-2xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary sm:text-3xl">
                    {title}
                  </h3>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label={t.projects.closeCaseStudy}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border transition-colors dark:border-primary-lighter dark:bg-primary-bg/80 dark:text-text-primary dark:hover:border-accent-cyan dark:hover:text-accent-cyan light:border-lightMode-border light:bg-lightMode-surfaceAlt light:text-lightMode-text-primary light:hover:border-accent-cyan light:hover:text-accent-cyan"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto overscroll-contain px-5 pb-6 pt-5 sm:px-6 sm:pb-8 md:px-8">
              <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
                <div className="self-start overflow-hidden rounded-[24px] border dark:border-primary-lighter dark:bg-primary-bg/60 light:border-lightMode-border light:bg-lightMode-surfaceAlt">
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
                  <section className="rounded-[24px] border p-5 dark:border-primary-lighter dark:bg-primary-bg/60 light:border-lightMode-border light:bg-lightMode-surfaceAlt sm:p-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-cyan">
                      {t.projects.executiveSummary}
                    </p>
                    <p className="text-base leading-relaxed dark:text-text-primary light:text-lightMode-text-primary">
                      {summary}
                    </p>
                  </section>

                  <section className="rounded-[24px] border border-accent-cyan/25 bg-accent-cyan/10 p-5 sm:p-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-cyan">
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
                  <section className="rounded-[24px] border p-5 dark:border-primary-lighter dark:bg-primary-bg/60 light:border-lightMode-border light:bg-lightMode-surfaceAlt sm:p-6">
                    <h4 className="mb-3 text-lg font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                      {t.projects.metricsResultsTitle}
                    </h4>
                    <div className="grid items-start gap-3 sm:grid-cols-3">
                      {metricsAndResult.map((metric) => (
                        <div
                          key={metric}
                          className="self-start rounded-2xl border px-4 py-3 dark:border-accent-cyan/20 dark:bg-accent-cyan/5 light:border-lightMode-border light:bg-lightMode-surface"
                        >
                          <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                            {metric}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[24px] border p-5 dark:border-primary-lighter dark:bg-primary-bg/60 light:border-lightMode-border light:bg-lightMode-surfaceAlt sm:p-6">
                    <h4 className="mb-3 text-lg font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                      {t.projects.businessProblemTitle}
                    </h4>
                    <ul className="space-y-3">
                      {businessProblem.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary"
                        >
                          <span className="mt-1 text-accent-cyan">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="space-y-4">
                  <section className="rounded-[24px] border border-accent-cyan/25 bg-accent-cyan/10 p-5 sm:p-6">
                    <h4 className="mb-3 text-lg font-poppins font-semibold text-accent-cyan">
                      {t.projects.whyItMattersTitle}
                    </h4>
                    <p className="text-sm leading-relaxed dark:text-text-primary light:text-lightMode-text-primary">
                      {whyItMatters}
                    </p>
                  </section>

                  <section className="rounded-[24px] border p-5 dark:border-primary-lighter dark:bg-primary-bg/60 light:border-lightMode-border light:bg-lightMode-surfaceAlt sm:p-6">
                    <h4 className="mb-3 text-lg font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                      {t.projects.datasetWorkflowTitle}
                    </h4>
                    <ul className="space-y-3">
                      {datasetAndWorkflow.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary"
                        >
                          <span className="mt-1 text-accent-cyan">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 border-t pt-4 dark:border-primary-lighter light:border-lightMode-border">
                      <div className="flex flex-wrap gap-2">
                        {toolsUsed.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-accent-blue/25 bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t pt-5 dark:border-primary-lighter light:border-lightMode-border sm:flex-row sm:flex-wrap">
                <a
                  href={caseStudy.links.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent-cyan px-4 py-2.5 text-sm font-medium text-primary-bg transition-colors hover:bg-accent-light"
                >
                  <ExternalLink size={16} />
                  <span>{primaryActionLabel}</span>
                </a>

                <a
                  href={caseStudy.links.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2.5 text-sm font-medium text-accent-cyan transition-colors hover:bg-accent-cyan hover:text-primary-bg"
                >
                  <FileText size={16} />
                  <span>{t.projects.repositoryNotes}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default CaseStudyModal;
