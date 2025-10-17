import { motion } from 'framer-motion';
import { User, BrainCircuit, GraduationCap, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SkillsGrid from './SkillsGrid';

const About = () => {
  const { t } = useLanguage();

  const certifications = [
    t.about.cert1,
    t.about.cert2,
    t.about.cert3,
    t.about.cert4,
    t.about.cert5
  ];

  return (
    <section id="about" className="section-padding dark:bg-primary-light light:bg-lightMode-surfaceAlt">
      <div className="container-custom">
        {/* Título de la sección */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-poppins font-bold gradient-text mb-4">
            {t.about.title}
          </h2>
          <p className="dark:text-text-secondary light:text-lightMode-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Contenedor principal: Bio y Skills */}
        <div className="grid lg:grid-cols-5 gap-12 items-start mb-16">
          <motion.div 
            className="lg:col-span-3"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <User size={28} className="text-accent-cyan" />
              <h3 className="text-2xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {t.about.knowMeBetter}
              </h3>
            </div>
            <div className="space-y-4 dark:text-text-secondary light:text-lightMode-text-secondary leading-relaxed">
              <p>{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
              <p>{t.about.paragraph3}</p>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-2"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit size={28} className="text-accent-cyan" />
              <h3 className="text-2xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {t.about.skillsAndTools}
              </h3>
            </div>
            <SkillsGrid />
          </motion.div>
        </div>

        {/* SECCIÓN DE EDUCACIÓN Y CERTIFICACIONES */}
        <div className="grid md:grid-cols-1 gap-8">
            {/* Educación */}
            <motion.div
              className="p-6 rounded-xl border dark:bg-primary-bg light:bg-lightMode-surface dark:border-primary-lighter light:border-lightMode-border"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              // --- AQUÍ ESTÁ EL CAMBIO ---
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent-cyan/10 rounded-lg">
                  <GraduationCap size={24} className="text-accent-cyan" />
                </div>
                <h3 className="text-xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                  {t.about.education}
                </h3>
              </div>
              <p className="font-semibold dark:text-text-primary light:text-lightMode-text-primary mb-1">
                {t.about.degree}
              </p>
              <p className="dark:text-text-secondary light:text-lightMode-text-secondary text-sm mb-2">
                {t.about.university}
              </p>
              <p className="text-accent-cyan text-sm font-medium">
                {t.about.semester}
              </p>
            </motion.div>
            
            {/* Certificaciones */}
            <motion.div
              className="p-6 rounded-xl border dark:bg-primary-bg light:bg-lightMode-surface dark:border-primary-lighter light:border-lightMode-border"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              // --- Y AQUÍ TAMBIÉN ---
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent-cyan/10 rounded-lg">
                  <Award size={28} className="text-accent-cyan" />
                </div>
                <h3 className="text-xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                  {t.about.certifications}
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-accent-cyan mt-1">▹</span>
                    <span className="dark:text-text-secondary light:text-lightMode-text-secondary text-sm">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;