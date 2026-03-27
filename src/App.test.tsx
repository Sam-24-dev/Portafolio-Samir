import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

describe('phase 1 analyst foundation', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('shows an analyst-first proof strip and clearer project hierarchy', () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getByText('Key Results')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Additional Relevant Projects' })).toBeInTheDocument();
    expect(screen.getByText('Customer Profile Analytics Dashboard')).toBeInTheDocument();
  });

  it('uses Spanish-native analyst positioning and supporting copy when the site is in Spanish', () => {
    window.localStorage.setItem('portfolio-language', 'es');

    render(
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getByText('Analista de Datos')).toBeInTheDocument();
    expect(screen.getByText('Los proyectos que mejor reflejan cómo trabajo hoy como Analista de Datos.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Otros Proyectos Seleccionados' })).toBeInTheDocument();
  });
});
