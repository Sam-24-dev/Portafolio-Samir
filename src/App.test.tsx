import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

describe('phase 1 analyst foundation', () => {
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
    expect(screen.getByRole('heading', { name: 'Additional Projects' })).toBeInTheDocument();
    expect(screen.getByText('Customer Profile Analytics Dashboard')).toBeInTheDocument();
  });
});
