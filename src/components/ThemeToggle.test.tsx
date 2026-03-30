import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';

const renderThemeToggle = () =>
  render(
    <ThemeProvider>
      <LanguageProvider>
        <ThemeToggle />
      </LanguageProvider>
    </ThemeProvider>
  );

describe('ThemeToggle', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('shows a visible helper hint when focused', () => {
    renderThemeToggle();

    const toggle = screen.getByRole('button', { name: 'Switch to dark theme' });

    fireEvent.focus(toggle);

    expect(screen.getByText('Change theme')).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-describedby', 'theme-toggle-hint');
    expect(screen.getByRole('tooltip')).toHaveAttribute('id', 'theme-toggle-hint');
  });
});
