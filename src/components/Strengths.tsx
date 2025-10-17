import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Strengths = () => {
  const { t } = useLanguage();

  const keyStrengths = [
    t.skills.strength1,
    t.skills.strength2,
    t.skills.strength3,
    t.skills.strength4,
    t.skills.strength5,
  ];

  const softSkills = [
    t.skills.soft1,
    t.skills.soft2,
    t.skills.soft3,
    t.skills.soft4,
    t.skills.soft5,
  ];

  return (
    <section id="strengths" className="section-padding dark:bg-primary-light light:bg-lightMode-surfaceAlt">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* --- AQUÍ ESTÁ EL CAMBIO --- */}
          <h2 className="text-5xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            {t.skills.strengthsTitle}
          </h2>
          <p className="dark:text-text-secondary light:text-lightMode-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            {t.skills.strengthsSubtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Key Strengths */}
          <motion.div
            className="p-8 rounded-xl border dark:bg-primary-bg light:bg-lightMode-surface dark:border-primary-lighter light:border-lightMode-border"
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <h3 className="text-2xl font-poppins font-semibold gradient-text mb-6">
              {t.skills.keyStrengths}
            </h3>
            <ul className="space-y-3 dark:text-text-secondary light:text-lightMode-text-secondary">
              {keyStrengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent-cyan mr-3 mt-1">▹</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            className="p-8 rounded-xl border dark:bg-primary-bg light:bg-lightMode-surface dark:border-primary-lighter light:border-lightMode-border"
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <h3 className="text-2xl font-poppins font-semibold gradient-text mb-6">
              {t.skills.softSkills}
            </h3>
            <ul className="space-y-3 dark:text-text-secondary light:text-lightMode-text-secondary">
              {softSkills.map((skill, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent-blue mr-3 mt-1">▹</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Strengths;