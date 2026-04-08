import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProofStrip from './components/ProofStrip';
import About from './components/About';
import Projects from './components/Projects';
import Strengths from './components/Strengths';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ScrollToTopButton from './components/ScrollToTopButton';
import SiteFooter from './components/SiteFooter';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'es'
        ? 'Samir Caizapasto | Portafolio de Analista de Datos'
        : 'Samir Caizapasto | Data Analyst Portfolio';
  }, [language]);

  return (
    <div id="app-shell" className="min-h-screen">
      <a href="#main-content" className="skip-link">
        {t.accessibility.skipToContent}
      </a>
      <CustomCursor />
      <ScrollToTopButton />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProofStrip />
        <About />
        <Projects />
        <Strengths />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
