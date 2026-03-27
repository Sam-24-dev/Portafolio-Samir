import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

type SkillItem = {
  name: string;
  icon?: string;
  monogram?: string;
};

const coreStack: SkillItem[] = [
  { name: 'Python', icon: '/images/icons/python.svg' },
  { name: 'SQL', icon: '/images/icons/sql.svg' },
  { name: 'MySQL', icon: '/images/icons/mysql.svg' },
  { name: 'Power BI', icon: '/images/icons/powerbi.svg' },
  { name: 'DAX', icon: '/images/icons/dax.svg' },
  { name: 'Excel', icon: '/images/icons/excel.svg' },
  { name: 'Pandas', icon: '/images/icons/pandas.svg' },
  { name: 'R', icon: '/images/icons/r.svg' },
];

const supportingTools: SkillItem[] = [
  { name: 'Jupyter', icon: '/images/icons/jupyter.svg' },
  { name: 'Git', icon: '/images/icons/git.svg' },
  { name: 'TypeScript', icon: '/images/icons/typescript.svg' },
];

const SkillMark = ({ skill, compact = false }: { skill: SkillItem; compact?: boolean }) => {
  if (skill.icon) {
    return (
      <span
        className={`flex items-center justify-center rounded-2xl border border-accent-cyan/20 bg-accent-cyan/10 ${
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
      className={`flex items-center justify-center rounded-2xl border border-accent-cyan/20 bg-accent-cyan/10 font-poppins font-semibold text-accent-cyan ${
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

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-cyan">{t.about.coreAnalystStack}</h4>
          <span className="rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-accent-cyan">
            {coreStack.length}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {coreStack.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group flex min-h-[8.75rem] flex-col justify-between rounded-[24px] border p-4 text-left backdrop-blur-sm dark:border-primary-lighter/50 dark:bg-primary-light/60 light:border-lightMode-border light:bg-lightMode-surface/85"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28, delay: index * 0.04 }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -4,
                      boxShadow: '0px 16px 30px rgba(8, 145, 178, 0.12)',
                    }
              }
              viewport={{ once: true }}
            >
              <SkillMark skill={skill} />
              <div className="space-y-1">
                <p className="text-base font-semibold leading-tight dark:text-text-primary light:text-lightMode-text-primary">
                  {skill.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] dark:text-text-secondary light:text-lightMode-text-secondary">
          {t.about.supportingTools}
        </h4>

        <div className="flex flex-wrap gap-3">
          {supportingTools.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="inline-flex min-h-11 items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-sm dark:border-primary-lighter/40 dark:bg-primary-bg/55 light:border-lightMode-border light:bg-lightMode-surface/80"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, delay: index * 0.05 }}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              viewport={{ once: true }}
            >
              <SkillMark skill={skill} compact />
              <span className="text-sm font-medium dark:text-text-primary light:text-lightMode-text-primary">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SkillsGrid;
