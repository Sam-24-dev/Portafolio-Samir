import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useStackAmbientMotion } from '../hooks/useStackAmbientMotion';

type SkillItem = {
  name: string;
  icon?: string;
  monogram?: string;
};

const coreStack: SkillItem[] = [
  { name: 'Python', icon: '/images/icons/analyst/python.svg' },
  { name: 'SQL', icon: '/images/icons/analyst/sql.svg' },
  { name: 'MySQL', icon: '/images/icons/analyst/mysql.svg' },
  { name: 'Power BI', icon: '/images/icons/analyst/powerbi.svg' },
  { name: 'DAX', icon: '/images/icons/analyst/dax.svg' },
  { name: 'Excel', icon: '/images/icons/analyst/excel.svg' },
  { name: 'Pandas', icon: '/images/icons/analyst/pandas.svg' },
  { name: 'R', icon: '/images/icons/analyst/r.svg' },
];

const supportingTools: SkillItem[] = [
  { name: 'Jupyter', icon: '/images/icons/analyst/jupyter.svg' },
  { name: 'Git', icon: '/images/icons/analyst/git.svg' },
  { name: 'TypeScript', icon: '/images/icons/analyst/typescript.svg' },
];

const SkillMark = ({ skill, compact = false }: { skill: SkillItem; compact?: boolean }) => {
  if (skill.icon) {
    return (
      <span
        className={`ui-analyst-orbit-tile flex items-center justify-center rounded-2xl border ${
          compact ? 'h-9 w-9' : 'h-12 w-12'
        }`}
      >
        <img
          src={skill.icon}
          alt=""
          aria-hidden="true"
          className={compact ? 'h-5 w-5 object-contain' : 'h-7 w-7 object-contain'}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`ui-analyst-orbit-tile ui-analyst-kicker flex items-center justify-center rounded-2xl border font-poppins font-semibold ${
        compact ? 'h-9 min-w-9 px-2 text-[11px]' : 'h-12 min-w-12 px-3 text-sm'
      }`}
    >
      {skill.monogram ?? skill.name.slice(0, 2).toUpperCase()}
    </span>
  );
};

const SkillsGrid = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const stackRef = useStackAmbientMotion({ profile: 'analyst' });
  const coreGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };
  const coreCardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.84,
      rotateX: 14,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const chipGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };
  const chipVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -18 : 18,
      y: 16,
      scale: 0.88,
      filter: 'blur(8px)',
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: shouldReduceMotion ? 0 : 0.48,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div ref={stackRef} className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h4 className="ui-analyst-kicker text-sm font-semibold uppercase tracking-[0.18em]">{t.about.coreAnalystStack}</h4>
        </div>

        <motion.div
          variants={coreGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {coreStack.map((skill) => (
            <motion.div
              key={skill.name}
              data-stack-core-item
              className="ui-analyst-surface group flex min-h-[8.75rem] flex-col justify-between rounded-[24px] border p-4 text-left backdrop-blur-sm"
              variants={coreCardVariants}
              style={{ transformPerspective: 1200 }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.02,
                      boxShadow: '0px 22px 42px rgba(8, 145, 178, 0.18)',
                    }
              }
            >
              <SkillMark skill={skill} />
              <div className="space-y-1">
                <p className="text-base font-semibold leading-tight dark:text-text-primary light:text-lightMode-text-primary">
                  {skill.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] dark:text-text-secondary light:text-lightMode-text-secondary">
          {t.about.supportingTools}
        </h4>

        <motion.div
          variants={chipGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.24 }}
          className="flex flex-wrap gap-3"
        >
          {supportingTools.map((skill, index) => (
            <motion.div
              key={skill.name}
              custom={index}
              data-stack-support-item
              className="ui-analyst-surface inline-flex min-h-11 items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-sm"
              variants={chipVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.015 }}
            >
              <SkillMark skill={skill} compact />
              <span className="text-sm font-medium dark:text-text-primary light:text-lightMode-text-primary">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default SkillsGrid;
