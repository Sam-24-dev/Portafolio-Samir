import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Contact from ${formData.name}`;
    const body = `${formData.message}\r\n\r\nFrom: ${formData.email}`;
    const mailtoLink = `mailto:samir.leonardo.caizapasto04@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

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
      value: 'linkedin.com/in/samircaizapasto',
      href: 'https://www.linkedin.com/in/samircaizapasto/'
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
    <section id="contact" className="section-padding dark:bg-primary-light light:bg-lightMode-surfaceAlt transition-colors">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            {t.contact.title}
          </h2>
          <p className="dark:text-text-secondary light:text-lightMode-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
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
                    className="flex items-start gap-4 p-4 rounded-lg border dark:bg-primary-bg dark:border-primary-lighter light:bg-lightMode-surface light:border-lightMode-border"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
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
                          className="font-medium dark:text-text-primary light:text-lightMode-text-primary hover:text-accent-cyan transition-colors break-all"
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
              className="p-6 rounded-xl border dark:bg-primary-bg dark:border-primary-lighter light:bg-lightMode-surface light:border-lightMode-border"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className={`w-full px-4 py-3 rounded-lg border transition-all dark:bg-primary-bg dark:text-text-primary light:bg-lightMode-surface light:text-lightMode-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 ${
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
                  className={`w-full px-4 py-3 rounded-lg border transition-all dark:bg-primary-bg dark:text-text-primary light:bg-lightMode-surface light:text-lightMode-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 ${
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
                  className={`w-full px-4 py-3 rounded-lg border transition-all resize-none dark:bg-primary-bg dark:text-text-primary light:bg-lightMode-surface light:text-lightMode-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 ${
                    focusedField === 'message'
                      ? 'border-accent-cyan dark:bg-primary-light light:bg-lightMode-surfaceAlt'
                      : 'dark:border-primary-lighter dark:bg-primary-bg light:border-lightMode-border light:bg-lightMode-surface'
                  }`}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-3 bg-accent-cyan dark:text-primary-bg light:text-lightMode-text-primary font-semibold rounded-lg hover:bg-accent-light transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                {t.contact.send}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
