import { motion } from 'framer-motion';
import { GraduationCap, Award, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding bg-primary-bg">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
            {t.about.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-text-secondary leading-relaxed text-lg">
              {t.about.paragraph1}
            </p>
            <p className="text-text-secondary leading-relaxed text-lg">
              {t.about.paragraph2}
            </p>
            <p className="text-text-secondary leading-relaxed text-lg">
              {t.about.paragraph3}
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-primary-light p-6 rounded-xl border border-primary-lighter hover:border-accent-cyan/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-cyan/10 rounded-lg">
                  <GraduationCap className="text-accent-cyan" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-poppins font-semibold text-text-highlight mb-2">
                    {t.about.education}
                  </h3>
                  <p className="text-text-secondary">
                    <span className="font-semibold text-text-primary">
                      {t.about.degree}
                    </span>
                    <br />
                    {t.about.university}
                    <br />
                    {t.about.semester}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary-light p-6 rounded-xl border border-primary-lighter hover:border-accent-cyan/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-blue/10 rounded-lg">
                  <Award className="text-accent-blue" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-poppins font-semibold text-text-highlight mb-2">
                    {t.about.certifications}
                  </h3>
                  <ul className="text-text-secondary space-y-1">
                    <li>• {t.about.cert1}</li>
                    <li>• {t.about.cert2}</li>
                    <li>• {t.about.cert3}</li>
                    <li>• {t.about.cert4}</li>
                    <li>• {t.about.cert5}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-primary-light p-6 rounded-xl border border-primary-lighter hover:border-accent-cyan/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-cyan/10 rounded-lg">
                  <Target className="text-accent-cyan" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-poppins font-semibold text-text-highlight mb-2">
                    {t.about.location}
                  </h3>
                  <p className="text-text-secondary">
                    {t.about.locationValue}
                    <br />
                    <span className="text-sm">{t.about.locationNote}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
