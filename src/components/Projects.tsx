import { motion } from 'framer-motion';
import { ExternalLink, Github, FileText, Award } from 'lucide-react';
import { projects } from '../data/projects.ts';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const { t, language } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="projects" className="section-padding dark:bg-primary-light light:bg-lightMode-surfaceAlt">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            {t.projects.title}
          </h2>
          <p className="dark:text-text-secondary light:text-lightMode-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="group rounded-xl overflow-hidden border transition-all duration-300 dark:bg-primary-bg dark:border-primary-lighter light:bg-lightMode-surface light:border-lightMode-border light:shadow-md"
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
            >
              <div className="relative h-64 overflow-hidden dark:bg-primary-lighter light:bg-lightMode-surfaceAlt">
                <img
                  src={project.image}
                  alt={language === 'es' ? project.titleEs : project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%231d3557" width="400" height="300"/%3E%3Ctext fill="%2364ffda" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProject Screenshot%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary mb-3">
                  {language === 'es' ? project.titleEs : project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-accent-cyan/10 text-accent-cyan rounded-full border border-accent-cyan/20 cursor-default"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(100, 255, 218, 0.15)' }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <p className="dark:text-text-secondary light:text-lightMode-text-secondary mb-4 leading-relaxed">
                  {language === 'es' ? project.descriptionEs : project.description}
                </p>

                <div className="mb-6">
                  <ul className="space-y-2">
                    {(language === 'es' ? project.highlightsEs : project.highlights).map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-sm dark:text-text-secondary light:text-lightMode-text-secondary">
                        <span className="text-accent-cyan mr-2">▹</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                   {project.demoUrl && (
    <motion.a
      href={project.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 border border-accent-cyan text-accent-cyan font-medium rounded-lg hover:bg-accent-cyan dark:hover:text-primary-bg light:hover:text-lightMode-text-primary transition-colors text-sm"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <ExternalLink size={16} />
      {project.id === 1 ? "Video Demo" : t.projects.liveDemo}
    </motion.a>
  )}
                  {project.dashboardUrl && (
                    <motion.a
                      href={project.dashboardUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white font-medium rounded-lg hover:bg-accent-blue/80 transition-colors text-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={16} />
                      {t.projects.dashboard}
                    </motion.a>
                  )}
                  {project.analysisUrl && (
                    <motion.a
                      href={project.analysisUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-accent-cyan text-accent-cyan font-medium rounded-lg hover:bg-accent-cyan dark:hover:text-primary-bg light:hover:text-lightMode-text-primary transition-colors text-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FileText size={16} />
                      {t.projects.analysis}
                    </motion.a>
                  )}
                  {project.reportUrl && (
                    <motion.a
                      href={project.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-accent-cyan text-accent-cyan font-medium rounded-lg hover:bg-accent-cyan dark:hover:text-primary-bg light:hover:text-lightMode-text-primary transition-colors text-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FileText size={16} />
                      {t.projects.report}
                    </motion.a>
                  )}
                  {project.certificateUrl && (
                    <motion.a
                      href={project.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 font-medium rounded-lg hover:bg-yellow-500/20 transition-colors text-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Award size={16} />
                      {t.projects.certificate}
                    </motion.a>
                  )}
                  {project.repoUrl && (
                    <motion.a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border dark:border-text-secondary dark:text-text-secondary light:border-lightMode-border light:text-lightMode-text-secondary font-medium rounded-lg hover:border-accent-cyan hover:text-accent-cyan transition-colors text-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github size={16} />
                      {t.projects.github}
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;