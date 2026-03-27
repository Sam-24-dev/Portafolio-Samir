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

  it('shows a grouped analyst stack and refreshed focus areas in English', () => {
    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>
    );

    expect(screen.getByText('Customer analytics and segmentation')).toBeInTheDocument();
    expect(screen.getByText('Power BI KPI storytelling')).toBeInTheDocument();
    expect(screen.getByText('SQL and Python reproducible workflows')).toBeInTheDocument();

    const coreStackSection = screen.getByText('Core Analyst Stack').closest('section');
    const supportingToolsSection = screen.getByText('Supporting Tools').closest('section');

    expect(coreStackSection).not.toBeNull();
    expect(supportingToolsSection).not.toBeNull();

    expect(within(coreStackSection as HTMLElement).getAllByText('DAX').length).toBeGreaterThan(0);
    expect(within(coreStackSection as HTMLElement).getByText('Excel')).toBeInTheDocument();
    expect(within(coreStackSection as HTMLElement).getByText('MySQL')).toBeInTheDocument();
    expect(within(coreStackSection as HTMLElement).queryByText('TypeScript')).not.toBeInTheDocument();

    expect(within(supportingToolsSection as HTMLElement).getByText('Jupyter')).toBeInTheDocument();
    expect(within(supportingToolsSection as HTMLElement).getByText('Git')).toBeInTheDocument();
    expect(within(supportingToolsSection as HTMLElement).getByText('TypeScript')).toBeInTheDocument();
  });

  it('shows a grouped analyst stack and refreshed focus areas in Spanish', () => {
    window.localStorage.setItem('portfolio-language', 'es');

    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>
    );

    expect(screen.getByText('Analítica de clientes y segmentación')).toBeInTheDocument();
    expect(screen.getByText('Storytelling de KPIs en Power BI')).toBeInTheDocument();
    expect(screen.getByText('Flujos reproducibles con SQL y Python')).toBeInTheDocument();

    const coreStackSection = screen.getByText('Stack Principal de Analítica').closest('section');
    const supportingToolsSection = screen.getByText('Herramientas de Apoyo').closest('section');

    expect(coreStackSection).not.toBeNull();
    expect(supportingToolsSection).not.toBeNull();

    expect(within(coreStackSection as HTMLElement).getAllByText('DAX').length).toBeGreaterThan(0);
    expect(within(coreStackSection as HTMLElement).getByText('Excel')).toBeInTheDocument();
    expect(within(coreStackSection as HTMLElement).getByText('MySQL')).toBeInTheDocument();
    expect(within(supportingToolsSection as HTMLElement).getByText('TypeScript')).toBeInTheDocument();
  });
});
