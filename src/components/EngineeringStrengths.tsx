import { motion, useReducedMotion } from 'framer-motion';
import { Boxes, GitBranchPlus, Rocket, ShieldCheck, Workflow } from 'lucide-react';
import { engineeringRouteContent } from '../data/routeContent';
import { useLanguage } from '../context/LanguageContext';
import type { EngineeringStrengthIcon } from '../data/engineeringContent';

const strengthIcons: Record<EngineeringStrengthIcon, typeof Workflow> = {
  workflow: Workflow,
  shield: ShieldCheck,
  automation: GitBranchPlus,
  delivery: Rocket,
  bridge: Boxes,
};

const EngineeringStrengths = () => {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const content = engineeringRouteContent[language].strengths;

  return (
    <section
      id="engineering-how-i-work"
      className="section-padding overflow-x-clip dark:bg-primary-light light:bg-lightMode-surfaceAlt"
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
            {content.eyebrow}
          </p>
          <h2 className="mb-5 text-4xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary sm:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {content.items.map((strength, index) => (
            <motion.article
              key={strength.title}
              initial={{ y: 22, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : index * 0.06 }}
              className="ui-engineering-surface flex min-h-44 flex-col rounded-[24px] border p-5"
            >
              <span className="ui-engineering-chip mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl">
                {(() => {
                  const Icon = strengthIcons[strength.icon];
                  return <Icon size={20} aria-hidden="true" />;
                })()}
              </span>
              <p className="mb-3 text-base font-semibold leading-tight dark:text-text-primary light:text-lightMode-text-primary">
                {strength.title}
              </p>
              <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                {strength.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringStrengths;
