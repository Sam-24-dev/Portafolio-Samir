import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import type { PortfolioRouteMode } from '../lib/portfolioRoute';

const LocationProbe = () => {
  const location = useLocation();
  return <output data-testid="current-pathname">{location.pathname}</output>;
};

const renderNavbar = (routeMode: PortfolioRouteMode, initialEntries: string[] = ['/']) =>
  render(
    <MemoryRouter
      initialEntries={initialEntries}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ThemeProvider>
        <LanguageProvider>
          <Navbar routeMode={routeMode} />
          <LocationProbe />
        </LanguageProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

describe('Navbar route-aware shell', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    localStorage.setItem('portfolio-language', 'en');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('shows the profile switch and engineering navigation items on the engineering route', () => {
    renderNavbar('engineer', ['/engineering']);

    expect(screen.getByRole('button', { name: 'Data Analyst' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'Data Engineer' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Stack' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'How I work' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'About' })).not.toBeInTheDocument();
  });

  it('uses the condensed analyst navigation labels on the analyst route', () => {
    renderNavbar('analyst', ['/']);

    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Strengths' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument();
  });

  it('keeps theme, language, and menu controls visible in the mobile header', () => {
    renderNavbar('analyst', ['/']);

    const themeButtons = screen.getAllByRole('button', { name: 'Switch to dark theme' });
    const languageButtons = screen.getAllByRole('button', { name: /EN -/ });
    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    const brandButton = screen.getByRole('button', { name: 'SC' });

    expect(themeButtons.length).toBeGreaterThanOrEqual(1);
    expect(languageButtons.length).toBeGreaterThanOrEqual(1);
    expect(menuButton).toBeInTheDocument();
    expect(brandButton).toHaveClass('min-h-11', 'min-w-11');
    expect(themeButtons[0]).toHaveClass('min-h-11', 'min-w-11');
    expect(languageButtons[0]).toHaveClass('min-h-11', 'min-w-11');
    expect(menuButton).toHaveClass('min-h-11', 'min-w-11');
  });

  it('keeps the switch inside the mobile menu block', () => {
    renderNavbar('analyst', ['/']);

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const mobileNavigation = document.getElementById('mobile-navigation');
    expect(mobileNavigation).not.toBeNull();
    expect(within(mobileNavigation as HTMLElement).getAllByRole('button', { name: 'Data Analyst' })).toHaveLength(1);
    expect(within(mobileNavigation as HTMLElement).getAllByRole('button', { name: 'Data Engineer' })).toHaveLength(1);
  });

  it('navigates to clean section paths instead of mutating the hash', () => {
    renderNavbar('engineer', ['/engineering']);

    fireEvent.click(screen.getAllByRole('button', { name: 'Projects' })[0]);

    expect(screen.getByTestId('current-pathname')).toHaveTextContent('/engineering/projects');
  });

  it('localizes the mobile and desktop navigation in spanish for the engineer profile', () => {
    localStorage.setItem('portfolio-language', 'es');
    renderNavbar('engineer', ['/engineering']);

    expect(screen.getByRole('button', { name: 'Analista de Datos' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ingeniero de Datos' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Cómo trabajo' })).toBeInTheDocument();
  });

  it('navigates the engineer profile to the exclusive how-i-work path', () => {
    renderNavbar('engineer', ['/engineering']);

    fireEvent.click(screen.getAllByRole('button', { name: 'How I work' })[0]);

    expect(screen.getByTestId('current-pathname')).toHaveTextContent('/engineering/how-i-work');
  });
});
