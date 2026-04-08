import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

describe('phase 1 analyst foundation', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('shows the full analyst-first structure, trust layer, and accessible navigation controls', () => {
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
    expect(screen.queryByRole('heading', { name: 'Career Snapshot' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Code & Documentation' })).not.toBeInTheDocument();
    expect(screen.getAllByText('Guayaquil, Ecuador').length).toBeGreaterThan(0);
    expect(screen.getByText('Built with React, TypeScript, and Tailwind CSS')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Download CV' })[0]).toHaveAttribute('href', '/cv/SamirCaizapastoCV.pdf');
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

  it('uses Spanish analyst positioning and localized accessibility labels', () => {
    window.localStorage.setItem('portfolio-language', 'es');

    render(
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getByText('Analista de Datos')).toBeInTheDocument();
    expect(screen.getByText('Los proyectos que mejor reflejan como trabajo hoy como Analista de Datos.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Otros Proyectos Seleccionados' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Resumen Profesional' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'C\u00F3digo y Documentaci\u00F3n' })).not.toBeInTheDocument();
    expect(screen.getAllByText('Guayaquil, Ecuador').length).toBeGreaterThan(0);
    expect(screen.getByText('Construido con React, TypeScript y Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Saltar al contenido principal' })).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('button', { name: 'Abrir men\u00FA' })).toHaveAttribute('aria-expanded', 'false');

    screen.getAllByRole('button', { name: 'EN - Cambiar a ingl\u00E9s' }).forEach((button) => {
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    screen.getAllByRole('button', { name: 'ES - Cambiar a espa\u00F1ol' }).forEach((button) => {
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
