import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, FileText, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { repoProofCards } from '../data/repoProof';

const CodeDocumentation = () => {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="code-documentation" className="section-padding dark:bg-primary-bg light:bg-lightMode-bg">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="mb-10 max-w-3xl"
        >
          <h2 className="mb-4 text-3xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary sm:text-4xl">
            {t.codeDocumentation.title}
          </h2>
          <p className="text-base leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary sm:text-lg">
            {t.codeDocumentation.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-5 xl:grid-cols-3">
          {repoProofCards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : index * 0.06 }}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              className="flex h-full flex-col rounded-[24px] border p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-primary-lighter dark:bg-primary-light/35 light:border-lightMode-border light:bg-lightMode-surface"
            >
              <div className="mb-5">
                <p className="ui-eyebrow mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  {t.codeDocumentation.title}
                </p>
                <h3 className="mb-3 text-xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                  {language === 'es' ? card.nameEs : card.name}
                </h3>
                <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                  {language === 'es' ? card.proofEs : card.proof}
                </p>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span key={tag} className="ui-pill-neutral px-3 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={card.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring ui-btn-neutral flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  <Github size={16} />
                  {t.codeDocumentation.openRepository}
                </a>
                <a
                  href={card.readmeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring ui-btn-secondary flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  <FileText size={16} />
                  {t.codeDocumentation.viewReadme}
                </a>
                {card.demoUrl && (
                  <a
                    href={card.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring ui-btn-primary flex w-full items-center justify-center gap-2 sm:w-auto"
                  >
                    <ExternalLink size={16} />
                    {t.codeDocumentation.liveDemo}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodeDocumentation;
