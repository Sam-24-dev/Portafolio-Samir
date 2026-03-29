import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';
import Projects from './Projects';

const portfolioEvents: CustomEvent[] = [];

const capturePortfolioEvent = (event: Event) => {
  portfolioEvents.push(event as CustomEvent);
};

afterEach(() => {
  window.localStorage.clear();
  portfolioEvents.length = 0;
  vi.useRealTimers();
  window.removeEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
});

describe('phase 2 analyst depth batch 1', () => {
  it('shows case study actions for all featured projects only', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    expect(screen.getAllByRole('button', { name: 'View Case Study' })).toHaveLength(3);

    const customerCard = screen.getByRole('heading', { name: 'Customer Profile Analytics Dashboard' }).closest('article');
    const esportsCard = screen.getByRole('heading', { name: 'eSports Analytics Dashboard LATAM' }).closest('article');
    const groceryCard = screen.getByRole('heading', { name: 'Grocery Sales BI Dashboard' }).closest('article');

    expect(customerCard).not.toBeNull();
    expect(esportsCard).not.toBeNull();
    expect(groceryCard).not.toBeNull();

    expect(within(customerCard as HTMLElement).getByRole('button', { name: 'View Case Study' })).toBeInTheDocument();
    expect(within(esportsCard as HTMLElement).getByRole('button', { name: 'View Case Study' })).toBeInTheDocument();
    expect(within(groceryCard as HTMLElement).getByRole('button', { name: 'View Case Study' })).toBeInTheDocument();
  });

  it('opens the simplified case study modal with focus, inert background state, and closes it with Escape', async () => {
    render(
      <div id="app-shell">
        <LanguageProvider>
          <Projects />
        </LanguageProvider>
      </div>
    );

    const triggerButton = screen.getAllByRole('button', { name: 'View Case Study' })[0];
    fireEvent.click(triggerButton);

    const dialog = screen.getByRole('dialog', { name: 'Customer Profile Analytics Dashboard' });
    const closeButton = within(dialog).getByRole('button', { name: 'Close case study' });
    const appShell = document.getElementById('app-shell');

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(closeButton).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
    expect(appShell).toHaveAttribute('inert', '');
    expect(appShell).toHaveAttribute('aria-hidden', 'true');
    expect(within(dialog).getByText('Case Outcome')).toBeInTheDocument();
    expect(within(dialog).getByText("Samir's Role")).toBeInTheDocument();
    expect(within(dialog).getByText('Key results')).toBeInTheDocument();
    expect(within(dialog).getByText('Business context')).toBeInTheDocument();
    expect(within(dialog).getByText('Workflow and tools')).toBeInTheDocument();
    expect(within(dialog).getByText('Why it matters')).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: 'Full README' })).toBeInTheDocument();
    expect(within(dialog).queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument();
    expect(within(dialog).queryByText('Quick Proof')).not.toBeInTheDocument();
    expect(within(dialog).queryByText('What Samir led')).not.toBeInTheDocument();
    expect(within(dialog).queryByText('Tools and delivery')).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Customer Profile Analytics Dashboard' })).not.toBeInTheDocument();
    });

    expect(document.body.style.overflow).toBe('');
    expect(appShell).not.toHaveAttribute('inert');
    expect(appShell).not.toHaveAttribute('aria-hidden');
    expect(triggerButton).toHaveFocus();
  });

  it('keeps the case study modal mounted long enough for exit animation before cleanup', async () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'View Case Study' })[0]);

    const dialog = screen.getByRole('dialog', { name: 'Customer Profile Analytics Dashboard' });
    const closeButton = within(dialog).getByRole('button', { name: 'Close case study' });

    fireEvent.click(closeButton);

    expect(screen.getByRole('dialog', { name: 'Customer Profile Analytics Dashboard' })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Customer Profile Analytics Dashboard' })).not.toBeInTheDocument();
    });
  });

  it('keeps Spanish featured cards aligned with the Grocery-style structure', () => {
    window.localStorage.setItem('portfolio-language', 'es');

    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    expect(screen.queryByText('Resumen del caso')).not.toBeInTheDocument();
    expect(screen.getByText('Otros Proyectos Seleccionados')).toBeInTheDocument();
  });

  it('shows a more concise modal hierarchy in Spanish', () => {
    window.localStorage.setItem('portfolio-language', 'es');

    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Ver Caso de Estudio' })[0]);

    const dialog = screen.getByRole('dialog', { name: 'Dashboard de Customer Profile Analytics' });

    expect(within(dialog).getByRole('tab', { name: 'Resumen' })).toHaveAttribute('aria-selected', 'true');
    expect(within(dialog).getByRole('tab', { name: 'Vista en Vivo' })).toHaveAttribute('aria-selected', 'false');
    expect(within(dialog).getByText('Resultado del caso')).toBeInTheDocument();
    expect(within(dialog).getByText('Rol de Samir')).toBeInTheDocument();
    expect(within(dialog).getByText('Resultados clave')).toBeInTheDocument();
    expect(within(dialog).getByText('Contexto del problema')).toBeInTheDocument();
    expect(within(dialog).getByText('Flujo y herramientas')).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: 'README completo' })).toBeInTheDocument();
    expect(within(dialog).queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument();
    expect(within(dialog).queryByText('Prueba rápida')).not.toBeInTheDocument();
    expect(within(dialog).queryByText('Qué lideró Samir')).not.toBeInTheDocument();
    expect(within(dialog).queryByText('Herramientas y entrega')).not.toBeInTheDocument();
  });

  it('shows only supporting filters that have matching projects and keeps featured projects visible', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    expect(screen.queryByRole('button', { name: 'Customer Analytics' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'ETL & Data Prep' }));

    expect(screen.getByRole('heading', { name: 'Customer Profile Analytics Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'eSports Analytics Dashboard LATAM' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Grocery Sales BI Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rice Crop Analytics Platform' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'NASA Space Apps Challenge 2025' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Statistical Analysis: Ping Pong Precision Model' })
    ).not.toBeInTheDocument();
  });

  it('opens Grocery on overview first and lazy-loads the live preview only when selected', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    const groceryCard = screen.getByRole('heading', { name: 'Grocery Sales BI Dashboard' }).closest('article');

    expect(groceryCard).not.toBeNull();

    fireEvent.click(within(groceryCard as HTMLElement).getByRole('button', { name: 'View Case Study' }));

    const dialog = screen.getByRole('dialog', { name: 'Grocery Sales BI Dashboard' });

    expect(within(dialog).getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(within(dialog).getByRole('tab', { name: 'Live Preview' })).toHaveAttribute('aria-selected', 'false');
    expect(within(dialog).queryByTitle('Grocery Sales BI Dashboard live preview')).not.toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole('tab', { name: 'Live Preview' }));

    expect(within(dialog).getByRole('tab', { name: 'Live Preview' })).toHaveAttribute('aria-selected', 'true');
    expect(within(dialog).getByTitle('Grocery Sales BI Dashboard live preview')).toBeInTheDocument();
    expect(within(dialog).getByText('Loading live preview...')).toBeInTheDocument();
  });

  it('renders a clean fallback when a live preview cannot be embedded', () => {
    vi.useFakeTimers();

    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'View Case Study' })[0]);

    const dialog = screen.getByRole('dialog', { name: 'Customer Profile Analytics Dashboard' });

    fireEvent.click(within(dialog).getByRole('tab', { name: 'Live Preview' }));

    const previewFrame = within(dialog).getByTitle('Customer Profile Analytics Dashboard live preview');

    expect(previewFrame).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(6600);
    });

    expect(within(dialog).getByTitle('Customer Profile Analytics Dashboard live preview')).toBeInTheDocument();
    expect(within(dialog).getByText('Preview unavailable here')).toBeInTheDocument();
    expect(
      within(dialog).getByText('This preview could not be embedded in the modal. You can still open it in a new tab.')
    ).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: 'Open in new tab' })).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('tracks featured and supporting project conversion events', () => {
    window.addEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);

    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'View Case Study' })[0]);
    fireEvent.click(screen.getAllByRole('link', { name: 'Dashboard' })[0]);
    fireEvent.click(screen.getAllByRole('link', { name: 'GitHub' })[0]);
    fireEvent.click(screen.getAllByRole('link', { name: 'Live Platform' })[0]);

    expect(portfolioEvents.map((event) => event.detail)).toEqual([
      {
        name: 'case_study_open',
        location: 'featured_card',
        language: 'en',
        projectId: 1,
      },
      {
        name: 'project_dashboard_click',
        location: 'featured_card',
        language: 'en',
        projectId: 1,
        target: 'dashboard',
      },
      {
        name: 'external_profile_click',
        location: 'featured_card',
        language: 'en',
        projectId: 1,
        target: 'github_repo',
      },
      {
        name: 'project_demo_click',
        location: 'supporting_card',
        language: 'en',
        projectId: 4,
        target: 'live_demo',
      },
    ]);
  });
});
