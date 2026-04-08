import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, Compass, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const snapshotIcons = [GraduationCap, Compass, Briefcase];

const CareerSnapshot = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="career-snapshot" className="section-padding dark:bg-primary-bg light:bg-lightMode-bg">
      <div className="container-custom">
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="mb-10 max-w-3xl"
        >
          <h2 className="mb-4 text-3xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary sm:text-4xl">
            {t.careerSnapshot.title}
          </h2>
          <p className="text-base leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary sm:text-lg">
            {t.careerSnapshot.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {t.careerSnapshot.items.map((item, index) => {
            const Icon = snapshotIcons[index] ?? Briefcase;

            return (
              <motion.article
                key={item.title}
                initial={{ y: 22, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : index * 0.06 }}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="rounded-[24px] border p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] dark:border-primary-lighter dark:bg-primary-light/35 light:border-lightMode-border light:bg-lightMode-surface"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="ui-section-icon rounded-2xl p-3">
                    <Icon size={22} />
                  </div>
                  <p className="text-lg font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                    {item.title}
                  </p>
                </div>
                <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary sm:text-[0.95rem]">
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerSnapshot;
