import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ThemeToggleOptions = {
  origin?: {
    x: number;
    y: number;
  };
};

type ViewTransitionController = {
  finished?: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransitionController | void;
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (options?: ThemeToggleOptions) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getThemeColor = (theme: Theme) => (theme === 'dark' ? '#0a192f' : '#f8fafc');

const ensureThemeColorMeta = () => {
  let element = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', 'theme-color');
    document.head.appendChild(element);
  }

  return element;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
    ensureThemeColorMeta().setAttribute('content', getThemeColor(theme));
  }, [theme]);

  const toggleTheme = (options?: ThemeToggleOptions) => {
    const root = window.document.documentElement;
    const viewTransitionDocument = document as ViewTransitionDocument;
    const startViewTransition = viewTransitionDocument.startViewTransition;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsRichThemeTransition = window.matchMedia('(pointer: fine) and (hover: hover)').matches;

    if (options?.origin) {
      root.style.setProperty('--theme-transition-x', `${options.origin.x}px`);
      root.style.setProperty('--theme-transition-y', `${options.origin.y}px`);
    }

    const applyTheme = () => {
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    if (!startViewTransition || prefersReducedMotion || !supportsRichThemeTransition) {
      applyTheme();
      return;
    }

    root.classList.add('theme-transition-active');

    const transition = startViewTransition.call(viewTransitionDocument, () => {
      applyTheme();
    });

    if (!transition?.finished) {
      root.classList.remove('theme-transition-active');
      return;
    }

    void transition.finished.finally(() => {
      root.classList.remove('theme-transition-active');
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
