import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { routeSectionOwnership, sharedShellComponents } from './lib/portfolioRoute';

const renderApp = (initialEntries: string[] = ['/']) =>
  render(
    <MemoryRouter
      initialEntries={initialEntries}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

describe('Phase 04 routing shell', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    localStorage.setItem('portfolio-language', 'en');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('renders the analyst route by default and keeps the analyst-first structure intact', async () => {
    renderApp(['/']);

    expect(screen.getByText('Key Results')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Additional Relevant Projects' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Get In Touch' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Data Analyst' })[0]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('button', { name: 'Data Engineer' })[0]).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('link', { name: 'Explore Data Engineering' })).toHaveAttribute('href', '/engineering');
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(screen.getAllByText(/Built with React, TypeScript, and Tailwind CSS/i)).toHaveLength(1);
    expect(sharedShellComponents).toContain('Contact');
    expect(routeSectionOwnership.analyst).toContain('about');
    expect(routeSectionOwnership.engineer).not.toContain('about');

    await waitFor(() => {
      expect(document.title).toBe('Samir Caizapasto | Data Analyst Portfolio');
    });

    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://portafolio-samir-tau.vercel.app/'
    );
  });

  it('renders the engineering route with route-aware metadata and anchor sections', async () => {
    renderApp(['/engineering']);

    expect(screen.getByText('Technical evidence')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Key projects for the Data Engineer profile' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bridge projects' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Engineering stack' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How I turn data into reliable products' })).toBeInTheDocument();
    expect(screen.getByText('Core stack')).toBeInTheDocument();
    expect(screen.getByText('126')).toBeInTheDocument();
    expect(screen.getByText('Technology Trend Analysis Platform')).toBeInTheDocument();
    expect(screen.getByText('RideFare ETL Pipeline')).toBeInTheDocument();
    expect(screen.getByText('Rice Crop Analytics Platform')).toBeInTheDocument();
    expect(screen.getByText('eSports Analytics Dashboard LATAM')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Get In Touch' })).toBeInTheDocument();
    expect(screen.getAllByText(/Built with React, TypeScript, and Tailwind CSS/i)).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Data Engineer' })[0]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('button', { name: 'Data Analyst' })[0]).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('link', { name: 'Back to Data Analyst Portfolio' })).toHaveAttribute('href', '/');
    expect(screen.queryByText('Key Results')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'About Me' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Featured Projects' })).not.toBeInTheDocument();
    expect(screen.queryByText(/7th-semester/i)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(document.title).toBe('Samir Caizapasto | Data Engineer Portfolio');
    });

    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://portafolio-samir-tau.vercel.app/engineering'
    );
  });

  it('uses the visible switch to navigate from analyst to engineering', async () => {
    renderApp(['/']);

    fireEvent.click(screen.getByRole('button', { name: 'Data Engineer' }));

    expect(await screen.findByRole('heading', { name: 'Key projects for the Data Engineer profile' })).toBeInTheDocument();
  });

  it('renders analyst section paths with analyst metadata intact', async () => {
    renderApp(['/projects']);

    expect(screen.getByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Key projects for the Data Engineer profile' })).not.toBeInTheDocument();

    await waitFor(() => {
      expect(document.title).toBe('Samir Caizapasto | Data Analyst Portfolio');
    });

    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://portafolio-samir-tau.vercel.app/'
    );
  });

  it('renders engineering section paths with engineering metadata intact', async () => {
    renderApp(['/engineering/projects']);

    expect(screen.getByRole('heading', { name: 'Key projects for the Data Engineer profile' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Featured Projects' })).not.toBeInTheDocument();

    await waitFor(() => {
      expect(document.title).toBe('Samir Caizapasto | Data Engineer Portfolio');
    });

    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://portafolio-samir-tau.vercel.app/engineering'
    );
  });

  it('renders the localized engineer title and switch labels in spanish', async () => {
    localStorage.setItem('portfolio-language', 'es');

    renderApp(['/engineering']);

    expect(screen.getAllByRole('button', { name: 'Analista de Datos' })[0]).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getAllByRole('button', { name: 'Ingeniero de Datos' })[0]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('link', { name: 'Volver al perfil de Analista de Datos' })).toHaveAttribute('href', '/');

    await waitFor(() => {
      expect(document.title).toBe('Samir Caizapasto | Portafolio de Ingeniero de Datos');
    });
  });

  it('supports the new how-i-work path with engineering metadata intact', async () => {
    renderApp(['/engineering/how-i-work']);

    expect(screen.getByRole('heading', { name: 'How I turn data into reliable products' })).toBeInTheDocument();

    await waitFor(() => {
      expect(document.title).toBe('Samir Caizapasto | Data Engineer Portfolio');
    });
  });

  it('keeps the legacy strengths alias compatible', async () => {
    renderApp(['/engineering/strengths']);

    expect(await screen.findByRole('heading', { name: 'How I turn data into reliable products' })).toBeInTheDocument();
  });

  it('redirects unknown routes back to the analyst homepage', async () => {
    renderApp(['/unexpected']);

    expect(await screen.findByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Key projects for the Data Engineer profile' })).not.toBeInTheDocument();
  });
});
