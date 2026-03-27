import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach } from 'vitest';
import { LanguageProvider } from '../context/LanguageContext';
import Projects from './Projects';

afterEach(() => {
  window.localStorage.clear();
});

describe('phase 2 analyst depth batch 1', () => {
  it('shows case study actions only for the two priority featured projects', () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    expect(screen.getAllByRole('button', { name: 'View Case Study' })).toHaveLength(2);

    const customerCard = screen.getByRole('heading', { name: 'Customer Profile Analytics Dashboard' }).closest('article');
    const esportsCard = screen.getByRole('heading', { name: 'eSports Analytics Dashboard LATAM' }).closest('article');
    const groceryCard = screen.getByRole('heading', { name: 'Grocery Sales BI Dashboard' }).closest('article');

    expect(customerCard).not.toBeNull();
    expect(esportsCard).not.toBeNull();
    expect(groceryCard).not.toBeNull();

    expect(within(customerCard as HTMLElement).getByRole('button', { name: 'View Case Study' })).toBeInTheDocument();
    expect(within(esportsCard as HTMLElement).getByRole('button', { name: 'View Case Study' })).toBeInTheDocument();
    expect(within(groceryCard as HTMLElement).queryByRole('button', { name: 'View Case Study' })).not.toBeInTheDocument();
  });

  it('opens the simplified case study modal with focus and closes it with Escape', async () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'View Case Study' })[0]);

    const dialog = screen.getByRole('dialog', { name: 'Customer Profile Analytics Dashboard case study' });
    const closeButton = within(dialog).getByRole('button', { name: 'Close case study' });

    expect(dialog).toBeInTheDocument();
    expect(closeButton).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
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
      expect(screen.queryByRole('dialog', { name: 'Customer Profile Analytics Dashboard case study' })).not.toBeInTheDocument();
    });
    expect(document.body.style.overflow).toBe('');
  });

  it('keeps the case study modal mounted long enough for exit animation before cleanup', async () => {
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'View Case Study' })[0]);

    const dialog = screen.getByRole('dialog', { name: 'Customer Profile Analytics Dashboard case study' });
    const closeButton = within(dialog).getByRole('button', { name: 'Close case study' });

    fireEvent.click(closeButton);

    expect(screen.getByRole('dialog', { name: 'Customer Profile Analytics Dashboard case study' })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Customer Profile Analytics Dashboard case study' })).not.toBeInTheDocument();
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

    const dialog = screen.getByRole('dialog', { name: 'Dashboard de Customer Profile Analytics caso de estudio' });

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
});
