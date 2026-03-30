import { motion } from 'framer-motion';
import { Award, BrainCircuit, ExternalLink, GraduationCap, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SkillsGrid from './SkillsGrid';

const About = () => {
  const { t } = useLanguage();
  const certifications = t.about.certificationsList;
  type CertificationKind = (typeof certifications)[number]['kind'];

  const getCertificationTag = (kind: CertificationKind) => {
    switch (kind) {
      case 'verified':
        return t.about.credentialTag;
      case 'program':
        return t.about.programTag;
      default:
        return t.about.awardTag;
    }
  };

  const getCertificationTagClasses = (kind: CertificationKind) => {
    switch (kind) {
      case 'verified':
        return 'ui-pill-teal';
      case 'program':
        return 'ui-pill-blue';
      default:
        return 'ui-pill-amber';
    }
  };

  const getIssuerClasses = (kind: CertificationKind) => {
    switch (kind) {
      case 'verified':
        return 'ui-eyebrow';
      case 'program':
        return 'text-lightMode-accent-secondary dark:text-accent-blue';
      default:
        return 'text-lightMode-accent-tertiary dark:text-yellow-400';
    }
  };

  const verifiedCredentials = certifications.filter((cert) => cert.kind === 'verified');
  const programCredentials = certifications.filter((cert) => cert.kind === 'program');
  const awardCredentials = certifications.filter((cert) => cert.kind === 'award');

  return (
    <section id="about" className="section-padding dark:bg-primary-light light:bg-lightMode-surfaceAlt">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-poppins font-bold gradient-text md:text-6xl">{t.about.title}</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="mb-16 grid items-start gap-12 lg:grid-cols-5">
          <motion.div
            className="lg:col-span-3"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <User size={28} className="ui-eyebrow" />
              <h3 className="text-2xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {t.about.knowMeBetter}
              </h3>
            </div>

            <div className="space-y-4 leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
              <p>{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
              <p>{t.about.paragraph3}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {t.about.focusAreas.map((area) => (
                <span
                  key={area}
                  className="ui-pill-teal px-4 py-2 text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <BrainCircuit size={28} className="ui-eyebrow" />
              <h3 className="text-2xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {t.about.skillsAndTools}
              </h3>
            </div>
            <SkillsGrid />
          </motion.div>
        </div>

        <div className="grid gap-8">
          <motion.div
            className="rounded-xl border p-6 dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="ui-section-icon rounded-lg p-2">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {t.about.education}
              </h3>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="flex h-full flex-col rounded-2xl border p-5 dark:border-primary-lighter dark:bg-primary-light/40 light:border-lightMode-border light:bg-lightMode-surfaceAlt">
                <p className="ui-eyebrow mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                  {t.about.academicTraining}
                </p>
                <p className="mb-1 font-semibold dark:text-text-primary light:text-lightMode-text-primary">{t.about.degree}</p>
                <p className="mb-2 text-sm dark:text-text-secondary light:text-lightMode-text-secondary">{t.about.university}</p>
                <p className="ui-eyebrow-soft mb-3 text-sm font-medium">{t.about.academicDates}</p>
                <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                  {t.about.academicSummary}
                </p>
              </div>

              <div className="flex h-full flex-col rounded-2xl border p-5 dark:border-primary-lighter dark:bg-primary-light/40 light:border-lightMode-border light:bg-lightMode-surfaceAlt">
                <p className="ui-eyebrow mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                  {t.about.specializedTraining}
                </p>
                <p className="mb-1 font-semibold dark:text-text-primary light:text-lightMode-text-primary">
                  {t.about.bootcampTitle}
                </p>
                <p className="mb-2 text-sm dark:text-text-secondary light:text-lightMode-text-secondary">
                  {t.about.bootcampInstitution}
                </p>
                <p className="ui-eyebrow-soft mb-3 text-sm font-medium">{t.about.bootcampDates}</p>
                <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                  {t.about.bootcampFinal}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border p-6 dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="ui-section-icon rounded-lg p-2">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-poppins font-semibold dark:text-text-highlight light:text-lightMode-text-primary">
                {t.about.certifications}
              </h3>
            </div>

            <p className="mb-6 max-w-3xl text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
              {t.about.certificationsIntro}
            </p>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <section className="rounded-[24px] border p-5 dark:border-primary-lighter dark:bg-primary-light/35 light:border-lightMode-border light:bg-lightMode-surfaceAlt">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="ui-eyebrow mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
                      {t.about.verifiedCredentials}
                    </p>
                    <p className="max-w-2xl text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                      {t.about.verifiedCredentialsNote}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {verifiedCredentials.map((cert) => (
                    <article
                      key={`${cert.title}-${cert.issuer}`}
                      className="flex h-full flex-col justify-between rounded-[20px] border p-4 dark:border-primary-lighter dark:bg-primary-bg/70 light:border-lightMode-border light:bg-lightMode-surface"
                    >
                      <div>
                        <span className={`mb-4 px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${getCertificationTagClasses(cert.kind)}`}>
                          {getCertificationTag(cert.kind)}
                        </span>
                        <p className="mb-1 text-base font-semibold dark:text-text-primary light:text-lightMode-text-primary">
                          {cert.title}
                        </p>
                        <p className={`mb-2 text-sm font-medium ${getIssuerClasses(cert.kind)}`}>{cert.issuer}</p>
                        <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                          {cert.meta}
                        </p>
                      </div>

                      {cert.href && cert.hrefLabel && (
                        <a
                          href={cert.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ui-btn-secondary mt-5 w-full"
                        >
                          <span>{cert.hrefLabel}</span>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              <div className="grid gap-5">
                <section className="rounded-[24px] border p-5 dark:border-primary-lighter dark:bg-primary-light/35 light:border-lightMode-border light:bg-lightMode-surfaceAlt">
                  <div className="mb-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-lightMode-accent-secondary dark:text-accent-blue">
                      {t.about.programCompletion}
                    </p>
                    <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                      {t.about.programCompletionNote}
                    </p>
                  </div>

                  {programCredentials.map((cert) => (
                    <article
                      key={`${cert.title}-${cert.issuer}`}
                      className="rounded-[20px] border p-4 dark:border-primary-lighter dark:bg-primary-bg/70 light:border-lightMode-border light:bg-lightMode-surface"
                    >
                      <span className={`mb-4 px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${getCertificationTagClasses(cert.kind)}`}>
                        {getCertificationTag(cert.kind)}
                      </span>
                      <p className="mb-1 text-base font-semibold dark:text-text-primary light:text-lightMode-text-primary">
                        {cert.title}
                      </p>
                      <p className={`mb-2 text-sm font-medium ${getIssuerClasses(cert.kind)}`}>{cert.issuer}</p>
                      <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                        {cert.meta}
                      </p>
                    </article>
                  ))}
                </section>

                <section className="rounded-[24px] border p-5 dark:border-primary-lighter dark:bg-primary-light/35 light:border-lightMode-border light:bg-lightMode-surfaceAlt">
                  <div className="mb-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-lightMode-accent-tertiary dark:text-yellow-400">
                      {t.about.awardsRecognition}
                    </p>
                    <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                      {t.about.awardsRecognitionNote}
                    </p>
                  </div>

                  {awardCredentials.map((cert) => (
                    <article
                      key={`${cert.title}-${cert.issuer}`}
                      className="rounded-[20px] border p-4 dark:border-primary-lighter dark:bg-primary-bg/70 light:border-lightMode-border light:bg-lightMode-surface"
                    >
                      <span className={`mb-4 px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${getCertificationTagClasses(cert.kind)}`}>
                        {getCertificationTag(cert.kind)}
                      </span>
                      <p className="mb-1 text-base font-semibold dark:text-text-primary light:text-lightMode-text-primary">
                        {cert.title}
                      </p>
                      <p className={`mb-2 text-sm font-medium ${getIssuerClasses(cert.kind)}`}>{cert.issuer}</p>
                      <p className="text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                        {cert.meta}
                      </p>

                      {cert.href && cert.hrefLabel && (
                        <a
                          href={cert.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ui-btn-amber mt-5 w-full"
                        >
                          <span>{cert.hrefLabel}</span>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </article>
                  ))}
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
