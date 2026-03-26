import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProofStrip from './components/ProofStrip';
import About from './components/About';
import Projects from './components/Projects';
import Strengths from './components/Strengths';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ScrollToTopButton from './components/ScrollToTopButton';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <ScrollToTopButton />
      <Navbar />
      <Hero />
      <ProofStrip />
      <About />
      <Projects />
      <Strengths />
      <Contact />

      <footer className="border-t py-8 dark:border-primary-lighter dark:bg-primary-light light:border-lightMode-border light:bg-lightMode-surfaceAlt">
        <div className="container-custom text-center">
          <p className="dark:text-text-secondary light:text-lightMode-text-secondary">
            &copy; {currentYear} Samir Caizapasto. {t.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
