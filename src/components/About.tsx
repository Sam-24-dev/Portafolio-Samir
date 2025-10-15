import { motion } from 'framer-motion';
import { GraduationCap, Award, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

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
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const certifications = [
    t.about.cert1,
    t.about.cert2,
    t.about.cert3,
    t.about.cert4,
    t.about.cert5
  ];

  return (
    <section id="about" className="section-padding dark:bg-primary-bg light:bg-lightMode-bg transition-colors">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            {t.about.title}
          </h2>
          <p className="dark:text-text-secondary light:text-lightMode-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 mb-16"
        >
          {/* Párrafos personales (izquierda) */}
          <motion.div variants={item} className="space-y-6">
            <p className="dark:text-text-primary light:text-lightMode-text-primary leading-relaxed text-base">
              {t.about.paragraph1}
            </p>
            <p className="dark:text-text-primary light:text-lightMode-text-primary leading-relaxed text-base">
              {t.about.paragraph2}
            </p>
            <p className="dark:text-text-primary light:text-lightMode-text-primary leading-relaxed text-base">
              {t.about.paragraph3}
            </p>
          </motion.div>

          {/* Tarjetas: Educación / Certificaciones / Ubicación (derecha) */}
          <motion.div variants={item} className="space-y-6">
            {/* Educación */}
            <motion.div
              className="p-6 rounded-xl border dark:bg-primary-light dark:border-primary-lighter light:bg-lightMode-surface light:border-lightMode-border light:shadow-sm"
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

            {/* Ubicación usando Target (tu ícono original) */}
            <motion.div
              className="p-6 rounded-xl border dark:bg-primary-light dark:border-primary-lighter light:bg-lightMode-surface light:border-lightMode-border light:shadow-sm"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent-cyan/10 rounded-lg">
                  <Target size={24} className="text-accent-cyan" />
                </div>
                <h3 className="text-xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                  {t.about.location}
                </h3>
              </div>
              <p className="font-semibold dark:text-text-primary light:text-lightMode-text-primary mb-1">
                {t.about.locationValue}
              </p>
              <p className="text-accent-cyan text-sm font-medium">
                {t.about.locationNote}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Certificaciones (tarjeta grande abajo) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 rounded-xl border dark:bg-primary-light dark:border-primary-lighter light:bg-lightMode-surface light:border-lightMode-border light:shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent-cyan/10 rounded-lg">
              <Award size={28} className="text-accent-cyan" />
            </div>
            <h3 className="text-2xl font-poppins font-semibold gradient-text">
              {t.about.certifications}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-lg dark:bg-primary-bg/50 light:bg-lightMode-surfaceAlt border dark:border-primary-lighter/50 light:border-lightMode-border"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <span className="text-accent-cyan mt-1">▹</span>
                <span className="dark:text-text-primary light:text-lightMode-text-primary">
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

