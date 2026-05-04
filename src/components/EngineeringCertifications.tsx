import { motion, useReducedMotion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { engineeringRouteContent } from '../data/routeContent';
import { profileCertifications } from '../data/profileCertifications';
import CertificationGroups from './CertificationGroups';

const EngineeringCertifications = () => {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const section = engineeringRouteContent[language].certifications;
  const certifications = profileCertifications[language].engineer;

  return (
    <section
      id="engineering-certifications"
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
            {section.eyebrow}
          </p>
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="ui-section-icon rounded-lg p-2">
              <Award size={24} />
            </span>
            <h2 className="text-4xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary sm:text-5xl">
              {section.title}
            </h2>
          </div>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
            {section.subtitle}
          </p>
        </motion.div>

        <CertificationGroups
          certifications={certifications}
          copy={{
            verifiedCredentials: t.about.verifiedCredentials,
            verifiedCredentialsNote: section.verifiedCredentialsNote,
            programCompletion: t.about.programCompletion,
            programCompletionNote: section.programCompletionNote,
            awardsRecognition: t.about.awardsRecognition,
            awardsRecognitionNote: section.awardsRecognitionNote,
            credentialTag: t.about.credentialTag,
            programTag: t.about.programTag,
            awardTag: t.about.awardTag,
          }}
        />
      </div>
    </section>
  );
};

export default EngineeringCertifications;
