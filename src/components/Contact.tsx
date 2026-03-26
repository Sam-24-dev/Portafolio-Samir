import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (submissionState !== 'idle') {
      setSubmissionState('idle');
      setStatusMessage('');
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmissionState('sending');
      setStatusMessage(t.contact.sendingMessage);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Contact submission failed');
      }

      setFormData({
        name: '',
        email: '',
        message: '',
        company: '',
      });
      setSubmissionState('success');
      setStatusMessage(t.contact.successMessage);
    } catch {
      setSubmissionState('error');
      setStatusMessage(t.contact.errorMessage);
    }
  };

  const submitButtonLabel = submissionState === 'sending' ? t.contact.sending : t.contact.send;
  const statusClasses = useMemo(() => {
    if (submissionState === 'success') {
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
    }

    if (submissionState === 'error') {
      return 'border-rose-500/30 bg-rose-500/10 text-rose-400';
    }

    return 'border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan';
  }, [submissionState]);

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: t.contact.email,
      value: 'samir.leonardo.caizapasto04@gmail.com',
      href: 'mailto:samir.leonardo.caizapasto04@gmail.com'
    },
    {
      icon: <Linkedin size={20} />,
      label: t.contact.linkedin,
      value: 'linkedin.com/in/samir-caizapasto',
      href: 'https://www.linkedin.com/in/samir-caizapasto/'
    },
    {
      icon: <Github size={20} />,
      label: t.contact.github,
      value: 'github.com/Sam-24-dev',
      href: 'https://github.com/Sam-24-dev'
    },
    {
      icon: <MapPin size={20} />,
      label: t.contact.location,
      value: 'Guayaquil, Ecuador',
      href: null
    }
  ];

  return (
    <section
      id="contact"
      className="section-padding overflow-x-clip dark:bg-primary-light light:bg-lightMode-surfaceAlt transition-colors"
    >
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center md:mb-16"
        >
          <h2 className="mb-6 text-4xl font-poppins font-bold gradient-text sm:text-5xl md:text-6xl">
            {t.contact.title}
          </h2>
          <p className="dark:text-text-secondary light:text-lightMode-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-10">
          {/* Columna izquierda: info */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-poppins font-semibold gradient-text mb-6">
                {t.contact.info}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4 rounded-lg border p-4 dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface"
                    whileHover={shouldReduceMotion ? undefined : { x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="p-2 bg-accent-cyan/10 rounded-lg text-accent-cyan">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm dark:text-text-secondary light:text-lightMode-text-secondary mb-1">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="break-all font-medium dark:text-text-primary dark:hover:text-accent-cyan light:text-lightMode-text-primary light:hover:text-accent-cyan transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium dark:text-text-primary light:text-lightMode-text-primary">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="rounded-xl border p-6 dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface"
              whileHover={shouldReduceMotion ? undefined : { y: -5, transition: { duration: 0.3 } }}
            >
              <h3 className="text-xl font-poppins font-semibold gradient-text mb-4">
                {t.contact.letsConnect}
              </h3>
              <p className="dark:text-text-secondary light:text-lightMode-text-secondary leading-relaxed">
                {t.contact.connectText}
              </p>
            </motion.div>
          </motion.div>

          {/* Columna derecha: formulario */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium dark:text-text-primary light:text-lightMode-text-primary mb-2"
                >
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t.contact.namePlaceholder}
                  required
                  className={`w-full rounded-lg border px-4 py-3.5 transition-all dark:bg-primary-bg dark:text-text-primary light:bg-lightMode-surface light:text-lightMode-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 ${
                    focusedField === 'name'
                      ? 'border-accent-cyan dark:bg-primary-light light:bg-lightMode-surfaceAlt'
                      : 'dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium dark:text-text-primary light:text-lightMode-text-primary mb-2"
                >
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t.contact.emailPlaceholder}
                  required
                  className={`w-full rounded-lg border px-4 py-3.5 transition-all dark:bg-primary-bg dark:text-text-primary light:bg-lightMode-surface light:text-lightMode-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 ${
                    focusedField === 'email'
                      ? 'border-accent-cyan dark:bg-primary-light light:bg-lightMode-surfaceAlt'
                      : 'dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium dark:text-text-primary light:text-lightMode-text-primary mb-2"
                >
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t.contact.messagePlaceholder}
                  required
                  rows={6}
                  className={`w-full resize-none rounded-lg border px-4 py-3.5 transition-all dark:bg-primary-bg dark:text-text-primary light:bg-lightMode-surface light:text-lightMode-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 ${
                    focusedField === 'message'
                      ? 'border-accent-cyan dark:bg-primary-light light:bg-lightMode-surfaceAlt'
                      : 'dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface'
                  }`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={submissionState === 'sending'}
                aria-busy={submissionState === 'sending'}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent-cyan px-8 py-3 font-semibold text-primary-bg transition-all hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-80"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                <Send size={20} />
                {submitButtonLabel}
              </motion.button>

              {submissionState !== 'idle' && (
                <div
                  aria-live="polite"
                  className={`rounded-lg border px-4 py-3 text-sm font-medium ${statusClasses}`}
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
