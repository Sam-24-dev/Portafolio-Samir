import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

describe('phase 1 analyst foundation', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('shows an analyst-first proof strip, main landmark, and accessible navigation controls', () => {
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
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');

    screen.getAllByRole('button', { name: 'EN - Switch to English' }).forEach((button) => {
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    screen.getAllByRole('button', { name: 'ES - Switch to Spanish' }).forEach((button) => {
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });
  });

  it('uses Spanish-native analyst positioning and localized accessibility labels', () => {
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
    expect(screen.getByRole('link', { name: 'Saltar al contenido principal' })).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');

    screen.getAllByRole('button', { name: 'EN - Cambiar a inglés' }).forEach((button) => {
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    screen.getAllByRole('button', { name: 'ES - Cambiar a español' }).forEach((button) => {
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
