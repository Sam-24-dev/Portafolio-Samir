import { motion, useReducedMotion, Variants } from 'framer-motion';
import { Award, ExternalLink, FileText, Github } from 'lucide-react';
import { useRef, useState } from 'react';
import CaseStudyModal from './CaseStudyModal';
import { getCaseStudyByProjectId } from '../data/caseStudies';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { trackPortfolioEvent } from '../lib/analytics';

const gradients = [
  'from-cyan-400/70 to-blue-500/70',
  'from-green-400/70 to-teal-400/70',
  'from-orange-400/70 to-yellow-500/70',
  'from-pink-500/70 to-purple-500/70',
  'from-indigo-400/70 to-purple-500/70',
  'from-sky-400/70 to-cyan-500/70',
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Projects = () => {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeCaseStudyProjectId, setActiveCaseStudyProjectId] = useState<number | null>(null);
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);
  const lastCaseStudyTriggerRef = useRef<HTMLElement | null>(null);

  const featuredProjects = projects.filter((project) => project.tier === 'featured');
  const supportingProjects = projects.filter((project) => project.tier === 'supporting');

  const getHighlights = (project: (typeof projects)[number]) =>
    language === 'es' ? project.highlightsEs : project.highlights;

  const getTitle = (project: (typeof projects)[number]) => (language === 'es' ? project.titleEs : project.title);
  const getDescription = (project: (typeof projects)[number]) =>
    language === 'es' ? project.descriptionEs : project.description;
  const getSupportingLabel = (project: (typeof projects)[number]) =>
    language === 'es' ? project.supportingLabelEs : project.supportingLabel;
  const getSupportingValue = (project: (typeof projects)[number]) =>
    language === 'es' ? project.supportingValueEs : project.supportingValue;
  const getDemoLabel = (project: (typeof projects)[number]) => {
    if (language === 'es' && project.demoLabelEs) {
      return project.demoLabelEs;
    }

    if (language === 'en' && project.demoLabel) {
      return project.demoLabel;
    }

    return t.projects.liveDemo;
  };
  const hasCaseStudy = (projectId: number) => Boolean(getCaseStudyByProjectId(projectId));
  const activeProject = projects.find((project) => project.id === activeCaseStudyProjectId) ?? null;
  const activeCaseStudy = activeCaseStudyProjectId ? getCaseStudyByProjectId(activeCaseStudyProjectId) ?? null : null;

  const hoverLift = shouldReduceMotion ? undefined : { scale: 1.04, y: -2 };
  const tapPress = shouldReduceMotion ? undefined : { scale: 0.98 };
  const actionClass =
    'focus-ring flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto';

  const handleCaseStudyOpen = (projectId: number, triggerElement: HTMLElement | null) => {
    lastCaseStudyTriggerRef.current = triggerElement;
    trackPortfolioEvent('case_study_open', {
      location: 'featured_card',
      language,
      projectId,
    });
    setActiveCaseStudyProjectId(projectId);
    setIsCaseStudyModalOpen(true);
  };

  const handleProjectDashboardClick = (projectId: number, location: 'featured_card' | 'supporting_card') => {
    trackPortfolioEvent('project_dashboard_click', {
      location,
      language,
      projectId,
      target: 'dashboard',
    });
  };

  const handleProjectDemoClick = (projectId: number, location: 'featured_card' | 'supporting_card') => {
    trackPortfolioEvent('project_demo_click', {
      location,
      language,
      projectId,
      target: 'live_demo',
    });
  };

  const handleProjectRepoClick = (projectId: number, location: 'featured_card' | 'supporting_card') => {
    trackPortfolioEvent('external_profile_click', {
      location,
      language,
      projectId,
      target: 'github_repo',
    });
  };

  return (
    <section id="projects" className="section-padding overflow-x-clip dark:bg-primary-bg light:bg-lightMode-bg">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center md:mb-16"
        >
          <h2 className="mb-6 text-4xl font-poppins font-bold gradient-text sm:text-5xl md:text-6xl">{t.projects.title}</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="mb-14 md:mb-20">
          <div className="mb-10 max-w-2xl">
            <h3 className="mb-3 text-2xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary sm:text-3xl">
              {t.projects.featuredTitle}
            </h3>
            <p className="leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
              {t.projects.featuredSubtitle}
            </p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {featuredProjects.map((project, index) => {
              const projectHasCaseStudy = hasCaseStudy(project.id);

              return (
                <motion.article
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid items-center gap-6 rounded-[28px] border p-4 shadow-xl shadow-black/5 dark:border-primary-lighter dark:bg-primary-light/30 light:border-lightMode-border light:bg-lightMode-surface sm:p-6 lg:grid-cols-12 lg:gap-8 lg:p-8"
                >
                  <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                    <motion.div
                      className="relative overflow-hidden rounded-2xl shadow-2xl"
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                    >
                      <div className={`absolute inset-0 z-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}></div>
                      <img
                        src={project.image}
                        alt={getTitle(project)}
                        className="relative z-10 h-full min-h-[220px] w-full object-cover object-center sm:min-h-[260px]"
                        loading="lazy"
                      />
                    </motion.div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] dark:text-accent-cyan light:text-lightMode-accent-primary">
                        {t.projects.featuredEyebrow}
                      </p>
                      {projectHasCaseStudy && (
                        <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] dark:text-accent-cyan light:text-lightMode-accent-primary">
                          {t.projects.caseStudyBadge}
                        </span>
                      )}
                    </div>

                    <h4 className="mb-4 text-2xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary">
                      {getTitle(project)}
                    </h4>

                    <p className="mb-6 text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                      {getDescription(project)}
                    </p>

                    <div className="mb-6">
                      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] dark:text-accent-cyan light:text-lightMode-accent-primary">
                        {t.projects.highlights}
                      </p>
                      <ul className="space-y-2">
                        {getHighlights(project).map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-3 text-sm dark:text-text-secondary light:text-lightMode-text-secondary"
                          >
                            <span className="mt-1 dark:text-accent-cyan light:text-lightMode-accent-primary">&gt;</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1 text-xs font-medium dark:text-accent-cyan light:text-lightMode-accent-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      {projectHasCaseStudy && (
                        <motion.button
                          type="button"
                          onClick={(event) => handleCaseStudyOpen(project.id, event.currentTarget)}
                          className={`${actionClass} border border-accent-cyan/40 bg-accent-cyan/10 dark:text-accent-cyan dark:hover:bg-accent-cyan dark:hover:text-primary-bg light:text-lightMode-accent-primary light:hover:border-lightMode-accent-primary light:hover:bg-lightMode-accent-primary light:hover:text-white`}
                          whileHover={hoverLift}
                          whileTap={tapPress}
                        >
                          <FileText size={16} /> {t.projects.caseStudy}
                        </motion.button>
                      )}
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${actionClass} bg-accent-cyan text-primary-bg`}
                          onClick={() => handleProjectDemoClick(project.id, 'featured_card')}
                          whileHover={hoverLift}
                          whileTap={tapPress}
                        >
                          <ExternalLink size={16} /> {getDemoLabel(project)}
                        </motion.a>
                      )}
                      {project.dashboardUrl && (
                        <motion.a
                          href={project.dashboardUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${actionClass} bg-accent-blue text-white hover:bg-accent-blue/80`}
                          onClick={() => handleProjectDashboardClick(project.id, 'featured_card')}
                          whileHover={hoverLift}
                          whileTap={tapPress}
                        >
                          <ExternalLink size={16} /> {t.projects.dashboard}
                        </motion.a>
                      )}
                      {project.analysisUrl && (
                        <motion.a
                          href={project.analysisUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${actionClass} border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-primary-bg`}
                          whileHover={hoverLift}
                          whileTap={tapPress}
                        >
                          <FileText size={16} /> {t.projects.analysis}
                        </motion.a>
                      )}
                      {project.reportUrl && (
                        <motion.a
                          href={project.reportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${actionClass} border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-primary-bg`}
                          whileHover={hoverLift}
                          whileTap={tapPress}
                        >
                          <FileText size={16} /> {t.projects.report}
                        </motion.a>
                      )}
                      {project.certificateUrl && (
                        <motion.a
                          href={project.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${actionClass} border border-yellow-500/50 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20`}
                          whileHover={hoverLift}
                          whileTap={tapPress}
                        >
                          <Award size={16} /> {t.projects.certificate}
                        </motion.a>
                      )}
                      {project.repoUrl && (
                        <motion.a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${actionClass} border dark:border-text-secondary dark:text-text-secondary dark:hover:border-accent-cyan dark:hover:text-accent-cyan light:border-lightMode-border light:text-lightMode-text-secondary light:hover:border-lightMode-accent-primary light:hover:text-lightMode-accent-primary`}
                          onClick={() => handleProjectRepoClick(project.id, 'featured_card')}
                          whileHover={hoverLift}
                          whileTap={tapPress}
                        >
                          <Github size={16} /> {t.projects.github}
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-8 max-w-3xl">
            <h3 className="mb-3 text-2xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary sm:text-3xl">
              {t.projects.supportingTitle}
            </h3>
            <p className="leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
              {t.projects.supportingSubtitle}
            </p>
          </div>

          <div className="mb-8 rounded-[24px] border border-dashed px-5 py-4 dark:border-primary-lighter dark:bg-primary-light/20 light:border-lightMode-border light:bg-lightMode-surfaceAlt sm:px-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] dark:text-accent-cyan light:text-lightMode-accent-primary">
              {t.projects.supportingContextLabel}
            </p>
            <p className="max-w-3xl text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
              {t.projects.supportingArchiveIntro}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 xl:grid-cols-3">
            {supportingProjects.map((project, index) => (
              <motion.article
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="overflow-hidden rounded-[24px] border border-dashed shadow-sm dark:border-primary-lighter dark:bg-primary-light/15 light:border-lightMode-border light:bg-lightMode-surface"
              >
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[(index + featuredProjects.length) % gradients.length]}`}></div>
                  <img
                    src={project.image}
                    alt={getTitle(project)}
                    className="relative z-10 h-44 w-full object-cover object-center opacity-90"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  {getSupportingLabel(project) && (
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] dark:text-accent-cyan light:text-lightMode-accent-primary">
                      {getSupportingLabel(project)}
                    </p>
                  )}

                  <h4 className="mb-3 text-xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                    {getTitle(project)}
                  </h4>

                  {getSupportingValue(project) && (
                    <div className="mb-4 rounded-2xl border px-4 py-3 dark:border-primary-lighter dark:bg-primary-bg/65 light:border-lightMode-border light:bg-lightMode-surfaceAlt">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] dark:text-accent-cyan light:text-lightMode-accent-primary">
                        {t.projects.supportingContributionTitle}
                      </p>
                      <p className="text-sm leading-relaxed dark:text-text-primary light:text-lightMode-text-primary">
                        {getSupportingValue(project)}
                      </p>
                    </div>
                  )}

                  <p className="mb-4 text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {getDescription(project)}
                  </p>

                  <ul className="mb-4 space-y-2">
                    {getHighlights(project).slice(0, 2).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-sm dark:text-text-secondary light:text-lightMode-text-secondary"
                      >
                        <span className="mt-1 dark:text-accent-cyan light:text-lightMode-accent-primary">&gt;</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1 text-xs font-medium dark:text-accent-cyan light:text-lightMode-accent-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${actionClass} bg-accent-cyan text-primary-bg`}
                        onClick={() => handleProjectDemoClick(project.id, 'supporting_card')}
                        whileHover={hoverLift}
                        whileTap={tapPress}
                      >
                        <ExternalLink size={16} /> {getDemoLabel(project)}
                      </motion.a>
                    )}
                    {project.analysisUrl && (
                      <motion.a
                        href={project.analysisUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${actionClass} border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-primary-bg`}
                        whileHover={hoverLift}
                        whileTap={tapPress}
                      >
                        <FileText size={16} /> {t.projects.analysis}
                      </motion.a>
                    )}
                    {project.reportUrl && (
                      <motion.a
                        href={project.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${actionClass} border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-primary-bg`}
                        whileHover={hoverLift}
                        whileTap={tapPress}
                      >
                        <FileText size={16} /> {t.projects.report}
                      </motion.a>
                    )}
                    {project.certificateUrl && (
                      <motion.a
                        href={project.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${actionClass} border border-yellow-500/50 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20`}
                        whileHover={hoverLift}
                        whileTap={tapPress}
                      >
                        <Award size={16} /> {t.projects.certificate}
                      </motion.a>
                    )}
                    {project.repoUrl && (
                      <motion.a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${actionClass} border dark:border-text-secondary dark:text-text-secondary dark:hover:border-accent-cyan dark:hover:text-accent-cyan light:border-lightMode-border light:text-lightMode-text-secondary light:hover:border-lightMode-accent-primary light:hover:text-lightMode-accent-primary`}
                        onClick={() => handleProjectRepoClick(project.id, 'supporting_card')}
                        whileHover={hoverLift}
                        whileTap={tapPress}
                      >
                        <Github size={16} /> {t.projects.github}
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
      <CaseStudyModal
        caseStudy={activeCaseStudy}
        isOpen={isCaseStudyModalOpen && Boolean(activeCaseStudy && activeProject)}
        onClose={() => setIsCaseStudyModalOpen(false)}
        onExited={() => setActiveCaseStudyProjectId(null)}
        project={activeProject}
        triggerElement={lastCaseStudyTriggerRef.current}
      />
    </section>
  );
};

export default Projects;
