import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackPortfolioEvent } from '../lib/analytics';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';
type ContactApiResponse = { message?: string };

const Contact = () => {
  const { t, language } = useLanguage();
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

  const readApiMessage = async (response: Response): Promise<string | null> => {
    try {
      const payload = (await response.json()) as ContactApiResponse;
      return typeof payload.message === 'string' ? payload.message : null;
    } catch {
      return null;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (submissionState !== 'idle') {
      setSubmissionState('idle');
      setStatusMessage('');
    }

    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
        const apiMessage = await readApiMessage(response);
        const isConfigIssue =
          response.status === 500 || (apiMessage?.toLowerCase().includes('not configured') ?? false);

        setSubmissionState('error');
        setStatusMessage(isConfigIssue ? t.contact.configError : (apiMessage ?? t.contact.errorMessage));
        trackPortfolioEvent('contact_submit_error', {
          location: 'contact',
          language,
        });
        return;
      }

      setFormData({
        name: '',
        email: '',
        message: '',
        company: '',
      });
      setSubmissionState('success');
      setStatusMessage(t.contact.successMessage);
      trackPortfolioEvent('contact_submit_success', {
        location: 'contact',
        language,
      });
    } catch {
      setSubmissionState('error');
      setStatusMessage(t.contact.errorMessage);
      trackPortfolioEvent('contact_submit_error', {
        location: 'contact',
        language,
      });
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

    return 'border-accent-cyan/20 bg-accent-cyan/10 dark:text-accent-cyan light:text-lightMode-accent-primary';
  }, [submissionState]);

  const statusRole = submissionState === 'error' ? 'alert' : 'status';
  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: t.contact.email,
      value: 'samir.leonardo.caizapasto04@gmail.com',
      href: 'mailto:samir.leonardo.caizapasto04@gmail.com',
      target: 'email' as const,
    },
    {
      icon: <Linkedin size={20} />,
      label: t.contact.linkedin,
      value: 'linkedin.com/in/samir-caizapasto',
      href: 'https://www.linkedin.com/in/samir-caizapasto/',
      target: 'linkedin_profile' as const,
    },
    {
      icon: <Github size={20} />,
      label: t.contact.github,
      value: 'github.com/Sam-24-dev',
      href: 'https://github.com/Sam-24-dev',
      target: 'github_profile' as const,
    },
    {
      icon: <MapPin size={20} />,
      label: t.contact.location,
      value: 'Guayaquil, Ecuador',
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding overflow-x-clip transition-colors dark:bg-primary-light light:bg-lightMode-surfaceAlt"
    >
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
          className="mb-14 text-center md:mb-16"
        >
          <h2 className="mb-6 text-4xl font-poppins font-bold gradient-text sm:text-5xl md:text-6xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-10">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-6 text-2xl font-poppins font-semibold gradient-text">
                {t.contact.info}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 rounded-lg border p-4 dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface"
                    whileHover={shouldReduceMotion ? undefined : { x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="rounded-lg bg-accent-cyan/10 p-2 dark:text-accent-cyan light:text-lightMode-accent-primary">
                      {info.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-sm dark:text-text-secondary light:text-lightMode-text-secondary">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="focus-ring break-all font-medium transition-colors dark:text-text-primary dark:hover:text-accent-cyan light:text-lightMode-text-primary light:hover:text-lightMode-accent-primary"
                          onClick={() =>
                            trackPortfolioEvent('external_profile_click', {
                              location: 'contact',
                              language,
                              target: info.target,
                            })
                          }
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
              <h3 className="mb-4 text-xl font-poppins font-semibold gradient-text">
                {t.contact.letsConnect}
              </h3>
              <p className="leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                {t.contact.connectText}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
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
                  className="mb-2 block text-sm font-medium dark:text-text-primary light:text-lightMode-text-primary"
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
                  autoComplete="name"
                  required
                  className={`focus-ring w-full rounded-lg border px-4 py-3.5 transition-all dark:text-text-primary light:text-lightMode-text-primary ${
                    focusedField === 'name'
                      ? 'border-accent-cyan dark:bg-primary-light light:border-lightMode-accent-primary light:bg-lightMode-surfaceAlt'
                      : 'dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium dark:text-text-primary light:text-lightMode-text-primary"
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
                  autoComplete="email"
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  required
                  className={`focus-ring w-full rounded-lg border px-4 py-3.5 transition-all dark:text-text-primary light:text-lightMode-text-primary ${
                    focusedField === 'email'
                      ? 'border-accent-cyan dark:bg-primary-light light:border-lightMode-accent-primary light:bg-lightMode-surfaceAlt'
                      : 'dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium dark:text-text-primary light:text-lightMode-text-primary"
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
                  autoComplete="off"
                  required
                  rows={6}
                  className={`focus-ring w-full resize-none rounded-lg border px-4 py-3.5 transition-all dark:text-text-primary light:text-lightMode-text-primary ${
                    focusedField === 'message'
                      ? 'border-accent-cyan dark:bg-primary-light light:border-lightMode-accent-primary light:bg-lightMode-surfaceAlt'
                      : 'dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface'
                  }`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={submissionState === 'sending'}
                aria-busy={submissionState === 'sending'}
                className="focus-ring flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent-cyan px-8 py-3 font-semibold text-primary-bg transition-all hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-80"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                <Send size={20} />
                {submitButtonLabel}
              </motion.button>

              {submissionState !== 'idle' && (
                <div
                  role={statusRole}
                  aria-live={submissionState === 'error' ? 'assertive' : 'polite'}
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
