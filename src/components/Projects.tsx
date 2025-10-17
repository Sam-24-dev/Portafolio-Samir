import { motion, Variants } from 'framer-motion'; // <-- CAMBIO #1: Importamos 'Variants'
import { ExternalLink, Github, FileText, Award } from 'lucide-react';
import { projects } from '../data/projects.ts';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const { t, language } = useLanguage();

  const gradients = [
    'from-cyan-400/70 to-blue-500/70',
    'from-green-400/70 to-teal-400/70',
    'from-pink-500/70 to-purple-500/70',
    'from-indigo-400/70 to-purple-500/70',
    'from-orange-400/70 to-yellow-500/70',
  ];

  // --- CAMBIO #2: Añadimos el tipo 'Variants' para solucionar el error ---
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="projects" className="section-padding dark:bg-primary-bg light:bg-lightMode-bg">
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

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* --- CAMBIO #3: Imagen siempre a la derecha en pantallas grandes --- */}
              <div className="lg:col-span-7 lg:order-last">
                <motion.div 
                  className="relative group h-80 rounded-lg overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} z-0`}></div>
                  <img
                    src={project.image}
                    alt={language === 'es' ? project.titleEs : project.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Columna Izquierda: Información */}
              <div className="lg:col-span-5">
                <h3 className="text-2xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary mb-4">
                  {language === 'es' ? project.titleEs : project.title}
                </h3>
                
                <div className="p-4 rounded-md dark:bg-primary-light light:bg-lightMode-surfaceAlt border dark:border-primary-lighter light:border-lightMode-border mb-5">
                   <p className="dark:text-text-secondary light:text-lightMode-text-secondary leading-relaxed text-sm">
                    {language === 'es' ? project.descriptionEs : project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium bg-accent-cyan/10 text-accent-cyan rounded-full border border-accent-cyan/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                   {project.demoUrl && (
                    <motion.a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-primary-bg font-medium rounded-lg transition-colors text-sm" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <ExternalLink size={16} /> {project.id === 1 ? "Video Demo" : t.projects.liveDemo}
                    </motion.a>
                  )}
                  {project.dashboardUrl && (
                    <motion.a href={project.dashboardUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white font-medium rounded-lg hover:bg-accent-blue/80 transition-colors text-sm" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <ExternalLink size={16} /> {t.projects.dashboard}
                    </motion.a>
                  )}
                  {project.analysisUrl && (
                    <motion.a href={project.analysisUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-accent-cyan text-accent-cyan font-medium rounded-lg hover:bg-accent-cyan hover:text-primary-bg transition-colors text-sm" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <FileText size={16} /> {t.projects.analysis}
                    </motion.a>
                  )}
                  {project.reportUrl && (
                    <motion.a href={project.reportUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-accent-cyan text-accent-cyan font-medium rounded-lg hover:bg-accent-cyan hover:text-primary-bg transition-colors text-sm" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <FileText size={16} /> {t.projects.report}
                    </motion.a>
                  )}
                  {project.certificateUrl && (
                    <motion.a href={project.certificateUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 font-medium rounded-lg hover:bg-yellow-500/20 transition-colors text-sm" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Award size={16} /> {t.projects.certificate}
                    </motion.a>
                  )}
                  {project.repoUrl && (
                    <motion.a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border dark:border-text-secondary dark:text-text-secondary light:border-lightMode-border light:text-lightMode-text-secondary font-medium rounded-lg hover:border-accent-cyan hover:text-accent-cyan transition-colors text-sm" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Github size={16} /> {t.projects.github}
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;