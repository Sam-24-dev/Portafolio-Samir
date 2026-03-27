import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Strengths = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

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
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="mb-14 text-center"
        >
          <h2 className="mb-6 text-5xl font-poppins font-bold gradient-text md:text-6xl">{t.skills.strengthsTitle}</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
            {t.skills.strengthsSubtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.12 }}
          className="grid gap-6 lg:grid-cols-12 lg:items-start"
        >
          <motion.article
            className="lg:col-span-7 rounded-[28px] border p-7 shadow-[0_18px_48px_rgba(8,145,178,0.08)] dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface"
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          >
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-poppins font-semibold gradient-text">{t.skills.keyStrengths}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                  {t.about.focusAreas.join(' • ')}
                </p>
              </div>
              <span className="rounded-full border border-accent-cyan/25 bg-accent-cyan/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-cyan">
                {t.skills.analystFirstTag}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {keyStrengths.map((strength) => (
                <div
                  key={strength}
                  className="flex min-h-28 gap-4 rounded-2xl border p-4 dark:border-primary-lighter/60 dark:bg-primary-light/40 light:border-lightMode-border light:bg-lightMode-surfaceAlt"
                >
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-cyan/15 text-sm font-semibold text-accent-cyan">
                    +
                  </span>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">{strength}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article
            className="lg:col-span-5 rounded-[28px] border p-7 dark:border-primary-lighter dark:bg-primary-bg/90 light:border-lightMode-border light:bg-lightMode-surface"
            whileHover={shouldReduceMotion ? undefined : { y: -3 }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {t.skills.softSkills}
              </h3>
              <p className="mt-2 text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                {t.skills.softSkillsNote}
              </p>
            </div>

            <ul className="space-y-3">
              {softSkills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-start gap-3 rounded-2xl border px-4 py-3 dark:border-primary-lighter/50 dark:bg-primary-light/30 light:border-lightMode-border light:bg-lightMode-surfaceAlt"
                >
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent-blue" />
                  <span className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">{skill}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};

export default Strengths;
