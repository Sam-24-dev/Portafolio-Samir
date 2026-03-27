import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { LanguageProvider, useLanguage } from './LanguageContext';

const LanguageProbe = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <span>{language}</span>
      <span>{t.nav.home}</span>
    </>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'en';
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US',
    });
  });

  it('initializes from saved localStorage language first', () => {
    localStorage.setItem('portfolio-language', 'es');

    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>
    );

    expect(screen.getByText('es')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('es');
  });

  it('falls back to browser language when there is no saved preference', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'es-EC',
    });

    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>
    );

    expect(screen.getByText('es')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('es');
  });
});
