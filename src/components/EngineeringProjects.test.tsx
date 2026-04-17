import { fireEvent, render, screen } from '@testing-library/react';
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

  it('opens the engineering case modal with localized tabs and distinct architecture and delivery content in english', () => {
    renderEngineeringProjects();

    fireEvent.click(screen.getAllByRole('button', { name: 'View case details' })[0]);

    expect(screen.getByText('Project case')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Architecture' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Delivery' })).toBeInTheDocument();
    expect(screen.getByText(/This case shows how public signals from GitHub, StackOverflow, and Reddit/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: 'Architecture' }));

    expect(screen.getByRole('img', { name: 'Technology Trend Analysis Platform architecture diagram' })).toBeInTheDocument();
    expect(screen.getByText(/Three public sources land in one shared flow/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: 'Delivery' }));

    expect(screen.getByRole('img', { name: 'Technology Trend Analysis Platform public product screenshot' })).toBeInTheDocument();
    expect(screen.getByText(/The result is a product someone can inspect end to end/i)).toBeInTheDocument();
  });

  it('tracks case, repository, and demo interactions with engineering context', () => {
    renderEngineeringProjects();

    fireEvent.click(screen.getAllByRole('button', { name: 'View case details' })[0]);
    fireEvent.click(screen.getAllByRole('link', { name: 'Open repository' })[0]);
    fireEvent.click(screen.getAllByRole('link', { name: 'View demo' })[0]);

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
        location: 'engineering_projects',
        language: 'en',
        routeMode: 'engineer',
        projectSlug: 'tech-trends',
        target: 'github_repo',
      },
      {
        name: 'engineering_demo_click',
        location: 'engineering_projects',
        language: 'en',
        routeMode: 'engineer',
        projectSlug: 'tech-trends',
        target: 'live_demo',
      },
    ]);
  });

  it('shows the rewritten engineering labels in spanish', () => {
    localStorage.setItem('portfolio-language', 'es');

    renderEngineeringProjects();

    expect(screen.getByText('Proyectos clave del perfil de Ingeniero de Datos')).toBeInTheDocument();
    expect(screen.getByText(/Dos proyectos que muestran cómo convierto datos en flujos confiables/i)).toBeInTheDocument();
    expect(screen.getAllByText('El reto')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Cómo funciona')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Cómo se valida')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Qué se entrega')[0]).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Ver caso completo' })[0]);

    expect(screen.getByRole('tab', { name: 'Resumen' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Arquitectura' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Entrega' })).toBeInTheDocument();
    expect(screen.getByText('De qué trata')).toBeInTheDocument();
    expect(screen.getByText('Qué demuestra')).toBeInTheDocument();
    expect(screen.getByText('Pruebas del proyecto')).toBeInTheDocument();
  });
});
