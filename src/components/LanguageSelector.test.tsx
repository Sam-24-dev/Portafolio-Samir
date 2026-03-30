import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const renderLanguageSelector = () =>
  render(
    <LanguageProvider>
      <LanguageSelector />
    </LanguageProvider>
  );

describe('LanguageSelector', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('shows a visible helper hint when focused', () => {
    renderLanguageSelector();

    const englishButton = screen.getByRole('button', { name: 'EN - Switch to English' });

    fireEvent.focus(englishButton);

    expect(screen.getByText('Change language')).toBeInTheDocument();
    expect(englishButton).toHaveAttribute('aria-describedby', 'language-selector-hint');
    expect(screen.getByRole('tooltip')).toHaveAttribute('id', 'language-selector-hint');
  });
});
