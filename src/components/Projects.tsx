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
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="projects" className="section-padding bg-primary-light">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
            {t.projects.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-primary-bg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent-cyan/20 transition-all duration-300 border border-primary-lighter"
            >
              <div className="relative h-64 overflow-hidden bg-primary-lighter">
                <img
                  src={project.image}
                  alt={language === 'es' ? project.titleEs : project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%231d3557" width="400" height="300"/%3E%3Ctext fill="%2364ffda" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProject Screenshot%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-poppins font-bold text-text-highlight mb-3">
                  {language === 'es' ? project.titleEs : project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-accent-cyan/10 text-accent-cyan rounded-full border border-accent-cyan/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-text-secondary mb-4 leading-relaxed">
                  {language === 'es' ? project.descriptionEs : project.description}
                </p>

                <div className="mb-6">
                  <ul className="space-y-2">
                    {(language === 'es' ? project.highlightsEs : project.highlights).map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-sm text-text-secondary">
                        <span className="text-accent-cyan mr-2">▹</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-primary-bg font-medium rounded-lg hover:bg-accent-light transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      {t.projects.liveDemo}
                    </a>
                  )}
                  {project.dashboardUrl && (
                    <a
                      href={project.dashboardUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white font-medium rounded-lg hover:bg-accent-blue/80 transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      {t.projects.dashboard}
                    </a>
                  )}
                  {project.analysisUrl && (
                    <a
                      href={project.analysisUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-accent-cyan text-accent-cyan font-medium rounded-lg hover:bg-accent-cyan hover:text-primary-bg transition-colors text-sm"
                    >
                      <FileText size={16} />
                      {t.projects.analysis}
                    </a>
                  )}
                  {project.reportUrl && (
                    <a
                      href={project.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-accent-cyan text-accent-cyan font-medium rounded-lg hover:bg-accent-cyan hover:text-primary-bg transition-colors text-sm"
                    >
                      <FileText size={16} />
                      {t.projects.report}
                    </a>
                  )}
                  {project.certificateUrl && (
                    <a
                      href={project.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 font-medium rounded-lg hover:bg-yellow-500/20 transition-colors text-sm"
                    >
                      <Award size={16} />
                      {t.projects.certificate}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-text-secondary text-text-secondary font-medium rounded-lg hover:border-accent-cyan hover:text-accent-cyan transition-colors text-sm"
                    >
                      <Github size={16} />
                      {t.projects.github}
                    </a>
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