import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ProofStrip = () => {
  const { t } = useLanguage();

  return (
    <section className="relative -mt-10 pb-8 md:-mt-14 md:pb-12">
      <div className="container-custom px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="ui-analyst-surface rounded-[28px] border shadow-2xl shadow-black/10 backdrop-blur-xl"
        >
          <div className="px-5 py-7 sm:px-6 md:px-8 md:py-8">
            <div className="mb-6 max-w-2xl md:mb-8">
              <p className="ui-analyst-kicker mb-2 text-sm font-semibold uppercase tracking-[0.22em]">
                {t.proofStrip.title}
              </p>
              <p className="max-w-xl text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary sm:text-base">
                {t.proofStrip.subtitle}
              </p>
            </div>

            <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {t.proofStrip.items.map((item) => (
                <div
                  key={`${item.value}-${item.label}`}
                  className="rounded-2xl border px-5 py-5 dark:border-primary-lighter/80 dark:bg-primary-bg/80 light:border-lightMode-border light:bg-lightMode-bg/80"
                >
                  <p className="mb-2 text-3xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary">
                    {item.value}
                  </p>
                  <p className="ui-eyebrow mb-2 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm">
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofStrip;
