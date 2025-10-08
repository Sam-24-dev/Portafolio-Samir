import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = t.hero.titles;

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 1000 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentTitle.substring(0, displayText.length - 1)
            : currentTitle.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, titles]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      icon: <Linkedin size={24} />,
      href: 'https://www.linkedin.com/in/samircaizapasto/',
      label: 'LinkedIn'
    },
    {
      icon: <Github size={24} />,
      href: 'https://github.com/Sam-24-dev',
      label: 'GitHub'
    },
    {
      icon: <Mail size={24} />,
      href: 'mailto:samir.leonardo.caizapasto04@gmail.com',
      label: 'Email'
    },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding pt-32">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 gradient-border animate-gradient rounded-full p-1">
                <div className="w-full h-full bg-primary-bg rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/perfil.jpg" 
                    alt="Samir Caizapasto"
                    className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-text-highlight">
              Samir Leonardo Caizapasto Hernández
            </h1>

            <div className="h-16 md:h-20 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-poppins font-semibold gradient-text min-h-[2.5rem] md:min-h-[3rem]">
                {displayText}
                <span className="animate-pulse">|</span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-4 mt-8 justify-center"
          >
            <button
              onClick={scrollToProjects}
              className="px-8 py-3 bg-accent-cyan text-primary-bg font-semibold rounded-lg hover:bg-accent-light transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-accent-cyan/50"
            >
              {t.hero.viewProjects}
            </button>
            <a
              href="/cv/SamirCaizapastoCV.pdf"
              download
              className="px-8 py-3 border-2 border-accent-cyan text-accent-cyan font-semibold rounded-lg hover:bg-accent-cyan hover:text-primary-bg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Download size={20} />
              {t.hero.downloadCV}
            </a>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex gap-6 mt-12"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-cyan transition-all transform hover:scale-110 hover:-translate-y-1"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-16"
          >
            <ChevronDown
              size={32}
              className="text-accent-cyan animate-bounce cursor-pointer"
              onClick={scrollToProjects}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;