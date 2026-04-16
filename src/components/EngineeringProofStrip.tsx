import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { engineeringRouteContent } from '../data/routeContent';

const EngineeringProofStrip = () => {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const content = engineeringRouteContent[language].proofStrip;

  return (
    <section id="engineering-proof-strip" className="relative -mt-10 pb-8 md:-mt-14 md:pb-12">
      <div className="container-custom px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="ui-engineering-surface rounded-[28px] border shadow-2xl shadow-blue-500/10 backdrop-blur-xl"
        >
          <div className="px-5 py-7 sm:px-6 md:px-8 md:py-8">
            <div className="mb-6 max-w-2xl md:mb-8">
              <p className="ui-engineering-kicker mb-2 text-sm font-semibold uppercase tracking-[0.22em]">
                {content.title}
              </p>
              <p className="max-w-2xl text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary sm:text-base">
                {content.subtitle}
              </p>
            </div>

            <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {content.items.map((item) => (
                <article
                  key={`${item.value}-${item.label}`}
                  className="rounded-2xl border border-[var(--engineering-surface-border)] bg-[var(--engineering-pill-bg)] px-5 py-5"
                >
                  <p className="engineering-gradient-text mb-2 text-3xl font-poppins font-bold sm:text-[2rem]">
                    {item.value}
                  </p>
                  <p className="ui-engineering-kicker mb-2 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm">
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {item.note}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EngineeringProofStrip;
