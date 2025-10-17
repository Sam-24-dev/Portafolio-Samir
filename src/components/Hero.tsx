import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = t.hero.titles;

  useEffect(() => {
    // Lógica de máquina de escribir (sin cambios)
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 40 : 80;
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

  const techIcons = [
    { src: '/images/icons/python.svg', alt: 'Python' },
    { src: '/images/icons/mysql.svg', alt: 'SQL' },
    { src: '/images/icons/react.svg', alt: 'React' },
    { src: '/images/icons/powerbi.svg', alt: 'Power BI' },
    { src: '/images/icons/r.svg', alt: 'R' },
    { src: '/images/icons/typescript.svg', alt: 'TypeScript' },
    { src: '/images/icons/javascript.svg', alt: 'JavaScript' },
    { src: '/images/icons/html.svg', alt: 'HTML5' },
    { src: '/images/icons/github.svg', alt: 'Pandas' },
    { src: '/images/icons/git.svg', alt: 'Git' },
  ];

  const contactLinks = [
    { href: "https://github.com/Sam-24-dev", icon: "/images/socials/github.svg", label: "GitHub" },
    { href: "https://www.linkedin.com/in/samircaizapasto/", icon: "/images/socials/linkedin.svg", label: "LinkedIn" },
    { href: "mailto:samir.leonardo.caizapasto04@gmail.com", icon: "/images/socials/mail.svg", label: "Email" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center section-padding pt-32 overflow-hidden">
      <div className="container-custom z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Columna Izquierda: Texto y Botones */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary leading-tight">
              Hey, I'm Samir
            </h1>

            <div className="h-20 md:h-24 flex items-center justify-center lg:justify-start">
              <h2 className="text-3xl md:text-4xl font-poppins font-semibold gradient-text min-h-[3rem] md:min-h-[4rem]">
                {displayText}
                <span className="animate-pulse">|</span>
              </h2>
            </div>

            <p className="text-lg md:text-xl dark:text-text-secondary light:text-lightMode-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-3 mb-6 justify-center lg:justify-start">
              {contactLinks.map(link => (
                <motion.a 
                  key={link.label}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ y: -3, scale: 1.05 }} 
                  className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-primary-light/60 dark:bg-primary-light/60 light:bg-lightMode-surface/80 backdrop-blur-sm border dark:border-white/10 light:border-black/10 transition-colors dark:hover:bg-primary-lighter light:hover:bg-lightMode-surfaceAlt dark:text-text-primary light:text-lightMode-text-primary"
                >
                  <img src={link.icon} alt={`${link.label} icon`} className="w-5 h-5" />
                  <span className="font-medium text-sm">{link.label}</span>
                </motion.a>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={scrollToProjects}
                className="px-8 py-3 bg-accent-cyan dark:text-primary-bg light:text-lightMode-text-primary font-semibold rounded-lg hover:bg-accent-light transition-all"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
              >
                {t.hero.viewProjects}
              </motion.button>
              <motion.a
                href="/cv/SamirCaizapastoCV.pdf"
                download
                className="px-8 py-3 border-2 border-accent-cyan text-accent-cyan font-semibold rounded-lg hover:bg-accent-cyan dark:hover:text-primary-bg light:hover:text-lightMode-text-primary transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
              >
                <Download size={20} />
                {t.hero.downloadCV}
              </motion.a>
            </div>
          </motion.div>

          {/* Columna Derecha: Imagen y Iconos Orbitales */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 w-80 h-80 md:w-96 md:h-96 relative"
          >
            <motion.div 
              className="absolute inset-[-60px] md:inset-[-80px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              {techIcons.map((icon, index) => {
                const angle = (index / techIcons.length) * 2 * Math.PI;
                const radius = 'calc(50% - 28px)'; 
                const x = `calc(50% + ${radius} * ${Math.cos(angle)} - 28px)`;
                const y = `calc(50% + ${radius} * ${Math.sin(angle)} - 28px)`;
                return (
                  <motion.div
                    key={icon.alt}
                    className="absolute w-14 h-14 p-2.5 bg-primary-light/60 dark:bg-primary-light/60 light:bg-lightMode-surface/90 backdrop-blur-sm rounded-2xl shadow-xl border dark:border-primary-lighter/50 light:border-lightMode-border"
                    style={{ top: y, left: x }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  >
                    <img src={icon.src} alt={icon.alt} className="w-full h-full object-contain" />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* --- CONTENEDOR DE IMAGEN CENTRAL CORREGIDO --- */}
            <div className="w-full h-full relative p-1 gradient-border rounded-full">
                <img
                  src="/images/perfil.jpg"
                  alt="Foto de perfil de Samir Caizapasto"
                  className="w-full h-full rounded-full object-cover"
                />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <ChevronDown
          size={32}
          className="text-accent-cyan animate-bounce cursor-pointer"
          onClick={scrollToProjects}
        />
      </motion.div>
    </section>
  );
};

export default Hero;