import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import EngineeringProjects from './EngineeringProjects';
import { LanguageProvider } from '../context/LanguageContext';

const portfolioEvents: CustomEvent[] = [];

const capturePortfolioEvent = (event: Event) => {
  portfolioEvents.push(event as CustomEvent);
};

const renderEngineeringProjects = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
        <EngineeringProjects />
      </LanguageProvider>
    </MemoryRouter>
  );

const findEngineeringDialog = () => screen.findByRole('dialog', undefined, { timeout: 5000 });

describe('EngineeringProjects', () => {
  beforeEach(() => {
    portfolioEvents.length = 0;
    window.addEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
    localStorage.setItem('portfolio-language', 'en');
  });

  afterEach(() => {
    window.removeEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
    localStorage.clear();
  });

  it('opens the engineering case modal with localized tabs and distinct architecture and delivery content in english', async () => {
    renderEngineeringProjects();

    fireEvent.click(screen.getAllByRole('button', { name: 'View case details' })[0]);

    const dialog = await findEngineeringDialog();

    expect(within(dialog).getByText('Technology Trend Analysis Platform')).toBeInTheDocument();
    expect(within(dialog).getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(within(dialog).getByRole('tab', { name: 'Architecture' })).toBeInTheDocument();
    expect(within(dialog).getByRole('tab', { name: 'Delivery' })).toBeInTheDocument();
    expect(
      within(dialog).getByText(/This case shows how public signals from GitHub, StackOverflow, and Reddit/i)
    ).toBeInTheDocument();

    const architectureTab = within(dialog).getByRole('tab', { name: 'Architecture' });
    fireEvent.click(architectureTab);
    await waitFor(() =>
      expect(within(dialog).getByRole('tab', { name: 'Architecture' })).toHaveAttribute('aria-selected', 'true')
    );

    expect(
      await within(dialog).findByRole('img', { name: 'Technology Trend Analysis Platform architecture diagram' })
    ).toBeInTheDocument();
    expect(await within(dialog).findByText(/Three public sources land in one shared flow/i)).toBeInTheDocument();

    const deliveryTab = within(dialog).getByRole('tab', { name: 'Delivery' });
    fireEvent.click(deliveryTab);
    await waitFor(() =>
      expect(within(dialog).getByRole('tab', { name: 'Delivery' })).toHaveAttribute('aria-selected', 'true')
    );

    expect(
      await within(dialog).findByRole('img', { name: 'Technology Trend Analysis Platform public product screenshot' })
    ).toBeInTheDocument();
    expect(await within(dialog).findByText(/The result is a product someone can inspect end to end/i)).toBeInTheDocument();
  });

  it('tracks case, repository, and demo interactions with engineering context', async () => {
    renderEngineeringProjects();

    fireEvent.click(screen.getAllByRole('button', { name: 'View case details' })[0]);

    const dialog = await findEngineeringDialog();

    fireEvent.click(within(dialog).getByRole('link', { name: 'Open repository' }));
    fireEvent.click(within(dialog).getByRole('link', { name: 'View demo' }));

    expect(portfolioEvents.map((event) => event.detail)).toEqual([
      {
        name: 'engineering_case_open',
        location: 'engineering_projects',
        language: 'en',
        routeMode: 'engineer',
        projectSlug: 'tech-trends',
        target: 'engineering_route',
      },
      {
        name: 'engineering_repo_click',
        location: 'engineering_case_modal',
        language: 'en',
        routeMode: 'engineer',
        projectSlug: 'tech-trends',
        target: 'github_repo',
      },
      {
        name: 'engineering_demo_click',
        location: 'engineering_case_modal',
        language: 'en',
        routeMode: 'engineer',
        projectSlug: 'tech-trends',
        target: 'live_demo',
      },
    ]);
  });

  it('shows the rewritten engineering labels in spanish', async () => {
    localStorage.setItem('portfolio-language', 'es');

    renderEngineeringProjects();

    expect(screen.getByText('Proyectos clave del perfil de Ingeniero de Datos')).toBeInTheDocument();
    expect(screen.getByText(/Dos proyectos que muestran cómo convierto datos en flujos confiables/i)).toBeInTheDocument();
    expect(screen.getAllByText('El reto')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Cómo funciona')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Cómo se valida')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Qué se entrega')[0]).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Ver caso completo' })[0]);

    const dialog = await findEngineeringDialog();

    expect(within(dialog).getByText('Caso del proyecto')).toBeInTheDocument();
    expect(within(dialog).getByRole('tab', { name: 'Resumen' })).toHaveAttribute('aria-selected', 'true');
    expect(within(dialog).getByRole('tab', { name: 'Arquitectura' })).toBeInTheDocument();
    expect(within(dialog).getByRole('tab', { name: 'Entrega' })).toBeInTheDocument();
    expect(within(dialog).getByText('De qué trata')).toBeInTheDocument();
    expect(within(dialog).getByText('Qué demuestra')).toBeInTheDocument();
    expect(within(dialog).getByText('Pruebas del proyecto')).toBeInTheDocument();
  });
});
