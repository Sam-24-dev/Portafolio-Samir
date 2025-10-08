import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />

      <footer className="bg-primary-light py-8 border-t border-primary-lighter">
        <div className="container-custom text-center">
          <p className="text-text-secondary">
            © 2025 Samir Caizapasto. {t.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
