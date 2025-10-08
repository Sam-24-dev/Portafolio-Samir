import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:samir.leonardo.caizapasto04@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: t.contact.email,
      value: "samir.leonardo.caizapasto04@gmail.com",
      href: "mailto:samir.leonardo.caizapasto04@gmail.com"
    },
    {
      icon: <Linkedin size={24} />,
      label: t.contact.linkedin,
      value: "samircaizapasto",
      href: "https://www.linkedin.com/in/samircaizapasto/"
    },
    {
      icon: <Github size={24} />,
      label: t.contact.github,
      value: "Sam-24-dev",
      href: "https://github.com/Sam-24-dev"
    },
    {
      icon: <MapPin size={24} />,
      label: t.contact.location,
      value: "Guayaquil, Ecuador",
      href: null
    }
  ];

  return (
    <section id="contact" className="section-padding bg-primary-bg">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
            {t.contact.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-poppins font-semibold text-text-highlight mb-6">
              {t.contact.info}
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="p-3 bg-accent-cyan/10 rounded-lg text-accent-cyan">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm mb-1">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-text-highlight hover:text-accent-cyan transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-text-highlight">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary-light p-6 rounded-xl border border-primary-lighter">
              <h4 className="text-xl font-poppins font-semibold text-text-highlight mb-4">
                {t.contact.letsConnect}
              </h4>
              <p className="text-text-secondary mb-6">
                {t.contact.connectText}
              </p>
              <a
                href="/cv/SamirCaizapastoCV.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-cyan text-primary-bg font-semibold rounded-lg hover:bg-accent-light transition-all transform hover:scale-105"
              >
                <Download size={20} />
                {t.contact.name === 'Name' ? 'Download CV' : 'Descargar CV'}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-text-secondary mb-2">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary-light border border-primary-lighter rounded-lg focus:border-accent-cyan focus:outline-none text-text-primary transition-colors"
                  placeholder={t.contact.namePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-text-secondary mb-2">
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary-light border border-primary-lighter rounded-lg focus:border-accent-cyan focus:outline-none text-text-primary transition-colors"
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-text-secondary mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-primary-light border border-primary-lighter rounded-lg focus:border-accent-cyan focus:outline-none text-text-primary transition-colors resize-none"
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent-cyan text-primary-bg font-semibold rounded-lg hover:bg-accent-light transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {t.contact.send}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
