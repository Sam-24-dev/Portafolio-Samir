import { cleanup, render, screen, within } from '@testing-library/react';
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
    expect(within(coreStackSection as HTMLElement).queryByText('8')).not.toBeInTheDocument();
    expect(within(coreStackSection as HTMLElement).queryByText('TypeScript')).not.toBeInTheDocument();

    expect(within(supportingToolsSection as HTMLElement).getByText('Jupyter')).toBeInTheDocument();
    expect(within(supportingToolsSection as HTMLElement).getByText('Git')).toBeInTheDocument();
    expect(within(supportingToolsSection as HTMLElement).getByText('TypeScript')).toBeInTheDocument();
  });

  it('shows the bootcamp credential link in both languages', () => {
    const credentialUrl =
      'https://acreditta.com/credential/9a908bad-12b0-4134-99ea-06ca940a92e3?utm_source=copy&resource_type=badge&resource=9a908bad-12b0-4134-99ea-06ca940a92e3';

    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>
    );

    const bootcampCard = screen.getByText('Data Analytics & Business Intelligence Bootcamp').closest('div');
    expect(bootcampCard).not.toBeNull();
    expect(within(bootcampCard as HTMLElement).queryByRole('link', { name: 'View credential' })).not.toBeInTheDocument();

    const programSection = screen.getByText('Program Completion').closest('section');
    expect(programSection).not.toBeNull();
    expect(within(programSection as HTMLElement).getByRole('link', { name: 'View credential' })).toHaveAttribute(
      'href',
      credentialUrl
    );

    window.localStorage.setItem('portfolio-language', 'es');
    cleanup();

    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>
    );

    const bootcampCardEs = screen.getByText('Bootcamp en Data Analytics & Business Intelligence').closest('div');
    expect(bootcampCardEs).not.toBeNull();
    expect(within(bootcampCardEs as HTMLElement).queryByRole('link', { name: 'Ver credencial' })).not.toBeInTheDocument();

    const programSectionEs = screen.getByText('Formación Completada').closest('section');
    expect(programSectionEs).not.toBeNull();
    expect(within(programSectionEs as HTMLElement).getByRole('link', { name: 'Ver credencial' })).toHaveAttribute(
      'href',
      credentialUrl
    );
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
