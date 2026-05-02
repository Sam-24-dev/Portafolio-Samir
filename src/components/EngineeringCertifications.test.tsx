import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';
import EngineeringCertifications from './EngineeringCertifications';

describe('EngineeringCertifications', () => {
  it('uses a single-column verified grid when the engineering profile has one verified credential', () => {
    render(
      <LanguageProvider>
        <EngineeringCertifications />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { name: 'Certifications' })).toBeInTheDocument();
    expect(screen.getByTestId('certifications-verified-grid')).not.toHaveClass('md:grid-cols-2');
    expect(screen.getByText('ETL and ELT in Python')).toBeInTheDocument();
  });
});
