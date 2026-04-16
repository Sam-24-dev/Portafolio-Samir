import { motion, useReducedMotion } from 'framer-motion';
import { engineeringRouteContent } from '../data/routeContent';
import { useLanguage } from '../context/LanguageContext';
import {
  engineeringCoreStack,
  engineeringSupportingStack,
  type TechIconItem,
} from '../lib/techIcons';
import { useStackAmbientMotion } from '../hooks/useStackAmbientMotion';

const EngineeringSkillMark = ({ skill, compact = false }: { skill: TechIconItem; compact?: boolean }) => {
  return (
    <span
      className={`ui-engineering-orbit-tile flex items-center justify-center rounded-2xl border ${
        compact ? 'h-10 w-10 p-2' : 'h-12 w-12 p-2.5'
      }`}
    >
      <img
        src={skill.source}
        alt=""
        aria-hidden="true"
        decoding="async"
        className={`${compact ? 'h-5 w-5 object-contain' : 'h-7 w-7 object-contain'} ${skill.iconClassName ?? ''}`}
      />
    </span>
  );
};

const EngineeringStack = () => {
  const { language } = useLanguage();
  const content = engineeringRouteContent[language].stack;
  const shouldReduceMotion = useReducedMotion();
  const stackRef = useStackAmbientMotion({ profile: 'engineer' });
  const coreGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };
  const coreCardVariants = {
    hidden: {
      opacity: 0,
      y: 34,
      scale: 0.82,
      rotateX: 16,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: shouldReduceMotion ? 0 : 0.62,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const chipGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };
  const chipVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -20 : 20,
      y: 18,
      scale: 0.86,
      filter: 'blur(10px)',
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: shouldReduceMotion ? 0 : 0.52,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="engineering-stack"
      ref={stackRef}
      className="section-padding overflow-x-clip dark:bg-primary-bg light:bg-lightMode-surface"
    >
      <div className="container-custom">
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="mb-12 text-center md:mb-14"
        >
          <p className="ui-engineering-kicker mb-4 text-sm font-semibold uppercase tracking-[0.26em]">
            {language === 'es' ? 'Capa de herramientas' : 'Tooling layer'}
          </p>
          <h2 className="mb-5 text-4xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary sm:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="space-y-6">
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="ui-engineering-kicker text-sm font-semibold uppercase tracking-[0.18em]">
                {content.coreLabel}
              </h3>
            </div>

            <motion.div
              variants={coreGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.22 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {engineeringCoreStack.map((skill) => (
                <motion.article
                  key={skill.name}
                  data-stack-core-item
                  className="ui-engineering-surface flex min-h-[8.75rem] flex-col justify-between rounded-[24px] border p-4 text-left"
                  variants={coreCardVariants}
                  style={{ transformPerspective: 1200 }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -8,
                          scale: 1.02,
                          boxShadow: '0px 22px 44px rgba(37, 99, 235, 0.18)',
                        }
                  }
                >
                  <EngineeringSkillMark skill={skill} />
                  <div className="space-y-1">
                    <p className="text-base font-semibold leading-tight dark:text-text-primary light:text-lightMode-text-primary">
                      {skill.name}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] dark:text-text-secondary light:text-lightMode-text-secondary">
              {content.supportingLabel}
            </h3>

            <motion.div
              variants={chipGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.24 }}
              className="flex flex-wrap gap-3"
            >
              {engineeringSupportingStack.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  custom={index}
                  data-stack-support-item
                  className="ui-engineering-surface inline-flex min-h-11 items-center gap-3 rounded-2xl border px-4 py-3"
                  variants={chipVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.015 }}
                >
                  <EngineeringSkillMark skill={skill} compact />
                  <span className="text-sm font-medium dark:text-text-primary light:text-lightMode-text-primary">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default EngineeringStack;
