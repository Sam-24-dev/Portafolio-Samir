import { render, screen, within } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';
import About from './About';

describe('phase 2 analyst depth batch 3', () => {
  it('groups credentials by hiring signal instead of showing one flat list', () => {
    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>
    );

    const verifiedSection = screen.getByText('Verified Credentials').closest('section');
    const programSection = screen.getByText('Program Completion').closest('section');
    const awardsSection = screen.getByText('Recognition & Awards').closest('section');

    expect(verifiedSection).not.toBeNull();
    expect(programSection).not.toBeNull();
    expect(awardsSection).not.toBeNull();
    expect(
      screen.getByText('Certifications and recognitions that reinforce my technical and analytical readiness.')
    ).toBeInTheDocument();

    expect(within(verifiedSection as HTMLElement).getAllByText('Verified credential')).toHaveLength(3);
    expect(within(programSection as HTMLElement).getByText('Program completion')).toBeInTheDocument();
    expect(within(awardsSection as HTMLElement).getByText('Recognition')).toBeInTheDocument();

    expect(within(verifiedSection as HTMLElement).getByText('Data Analyst Associate')).toBeInTheDocument();
    expect(within(verifiedSection as HTMLElement).getByText('ETL and ELT in Python')).toBeInTheDocument();
    expect(within(awardsSection as HTMLElement).getByText('NASA Space Apps Challenge 2025')).toBeInTheDocument();
  });
});
