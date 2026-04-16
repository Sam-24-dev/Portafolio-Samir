import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { engineeringRouteContent } from '../data/routeContent';
import { trackPortfolioEvent } from '../lib/analytics';

const EngineeringBridgeProjects = () => {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const content = engineeringRouteContent[language].bridgeProjects;
  const modalCopy = engineeringRouteContent[language].caseStudyModal;

  return (
    <section
      id="engineering-bridge-projects"
      className="section-padding overflow-x-clip dark:bg-primary-bg light:bg-lightMode-bg"
    >
      <div className="container-custom">
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="mb-10 text-center md:mb-12"
        >
          <p className="ui-engineering-kicker mb-4 text-sm font-semibold uppercase tracking-[0.26em]">
            {content.eyebrow}
          </p>
          <h2 className="mb-5 text-3xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary sm:text-4xl">
            {content.title}
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary sm:text-lg">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-2">
          {content.cards.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : index * 0.08 }}
              className="ui-engineering-surface rounded-[28px] border p-6 shadow-[0_18px_40px_rgba(29,78,216,0.08)]"
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

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] px-4 py-4">
                  <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                    {content.labels.pipelineShape}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {project.pipelineShape}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] px-4 py-4">
                  <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                    {content.labels.validationLayer}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {project.validationLayer}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] px-4 py-4">
                  <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                    {content.labels.outputLayer}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {project.outputLayer}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] px-4 py-4">
                  <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                    {content.labels.verifiedResult}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {project.verifiedResult}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring ui-engineering-btn-primary"
                  onClick={() =>
                    trackPortfolioEvent('engineering_repo_click', {
                      location: 'engineering_bridge_projects',
                      language,
                      routeMode: 'engineer',
                      projectSlug: project.id,
                      target: 'github_repo',
                    })
                  }
                >
                  <Github size={16} />
                  {modalCopy.repoButtonLabel}
                </a>

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring ui-engineering-btn-secondary"
                    onClick={() =>
                      trackPortfolioEvent('engineering_demo_click', {
                        location: 'engineering_bridge_projects',
                        language,
                        routeMode: 'engineer',
                        projectSlug: project.id,
                        target: 'live_demo',
                      })
                    }
                  >
                    <ExternalLink size={16} />
                    {modalCopy.demoButtonLabel}
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringBridgeProjects;
