import { Suspense, lazy, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, FileText, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getEngineeringCaseStudyById, type EngineeringCaseTab, type EngineeringProjectId } from '../data/engineeringContent';
import { engineeringRouteContent } from '../data/routeContent';
import { trackPortfolioEvent } from '../lib/analytics';

const EngineeringCaseModal = lazy(() => import('./EngineeringCaseModal'));

const EngineeringProjects = () => {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const content = engineeringRouteContent[language].anchorProjects;
  const caseModalCopy = engineeringRouteContent[language].caseStudyModal;
  const [activeProjectId, setActiveProjectId] = useState<EngineeringProjectId | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [activeCaseTab, setActiveCaseTab] = useState<EngineeringCaseTab>('overview');
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const activeProject = content.cards.find((project) => project.id === activeProjectId) ?? null;
  const activeCaseStudy = activeProjectId ? getEngineeringCaseStudyById(activeProjectId) : null;

  const handleCaseOpen = (projectId: EngineeringProjectId, triggerElement: HTMLElement | null) => {
    lastTriggerRef.current = triggerElement;
    setActiveCaseTab('overview');
    trackPortfolioEvent('engineering_case_open', {
      location: 'engineering_projects',
      language,
      routeMode: 'engineer',
      projectSlug: projectId,
      target: 'engineering_route',
    });
    setActiveProjectId(projectId);
    setIsCaseModalOpen(true);
  };

  const handleCaseExited = () => {
    setActiveProjectId(null);
    lastTriggerRef.current = null;
  };

  return (
    <section
      id="engineering-projects"
      className="section-padding overflow-x-clip dark:bg-primary-bg light:bg-lightMode-bg"
    >
      <div className="container-custom">
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="mb-12 text-center md:mb-14"
        >
          <p className="ui-engineering-kicker mb-4 text-sm font-semibold uppercase tracking-[0.26em]">
            {content.eyebrow}
          </p>
          <h2 className="mb-5 text-4xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary sm:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-2">
          {content.cards.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ y: 28, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.08 }}
              className="ui-engineering-surface flex h-full flex-col rounded-[28px] border p-6 shadow-[0_22px_44px_rgba(29,78,216,0.08)]"
            >
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="ui-engineering-pill px-3 py-1 text-[11px] uppercase tracking-[0.16em]">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mb-3 text-2xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {project.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                {project.description}
              </p>

              <div className="grid gap-4">
                <article className="rounded-2xl border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] px-4 py-4">
                  <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                    {content.labels.challenge}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {project.challenge}
                  </p>
                </article>

                <article className="rounded-2xl border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] px-4 py-4">
                  <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                    {content.labels.dataFlow}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {project.dataFlow}
                  </p>
                </article>

                <article className="rounded-2xl border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] px-4 py-4">
                  <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                    {content.labels.qualityDiscipline}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {project.qualityDiscipline}
                  </p>
                </article>

                <article className="rounded-2xl border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] px-4 py-4">
                  <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                    {content.labels.publicOutput}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {project.publicOutput}
                  </p>
                </article>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  className="focus-ring ui-engineering-btn-primary"
                  onClick={(event) => handleCaseOpen(project.id, event.currentTarget)}
                >
                  <FileText size={16} />
                  {caseModalCopy.caseButtonLabel}
                </button>

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring ui-engineering-btn-secondary"
                  onClick={() =>
                    trackPortfolioEvent('engineering_repo_click', {
                      location: 'engineering_projects',
                      language,
                      routeMode: 'engineer',
                      projectSlug: project.id,
                      target: 'github_repo',
                    })
                  }
                >
                  <Github size={16} />
                  {caseModalCopy.repoButtonLabel}
                </a>

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring ui-engineering-btn-secondary"
                    onClick={() =>
                      trackPortfolioEvent('engineering_demo_click', {
                        location: 'engineering_projects',
                        language,
                        routeMode: 'engineer',
                        projectSlug: project.id,
                        target: 'live_demo',
                      })
                    }
                  >
                    <ExternalLink size={16} />
                    {caseModalCopy.demoButtonLabel}
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {activeCaseStudy && activeProject ? (
        <Suspense fallback={null}>
          <EngineeringCaseModal
            caseStudy={activeCaseStudy}
            isOpen={isCaseModalOpen}
            onClose={() => setIsCaseModalOpen(false)}
            onExited={handleCaseExited}
            project={activeProject}
            triggerElement={lastTriggerRef.current}
            activeTab={activeCaseTab}
            onSelectTab={setActiveCaseTab}
          />
        </Suspense>
      ) : null}
    </section>
  );
};

export default EngineeringProjects;
