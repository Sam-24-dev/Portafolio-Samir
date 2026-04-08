import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';
import Strengths from './Strengths';

describe('analyst-first strengths polish', () => {
  it('prioritizes technical strengths with refreshed copy in English', () => {
    render(
      <LanguageProvider>
        <Strengths />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { name: 'Key Strengths', level: 2 })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: 'Key Strengths' })).toHaveLength(1);
    expect(
      screen.getByText('The capabilities that best explain how I turn data into decisions and business-ready deliverables.')
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Technical Strengths', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Soft Skills', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Customer analytics and actionable segmentation')).toBeInTheDocument();
    expect(screen.getByText('Executive Power BI dashboards with KPI storytelling')).toBeInTheDocument();
    expect(screen.getByText('Decision-ready reporting for non-technical stakeholders')).toBeInTheDocument();
    expect(screen.getByText('Clear communication of insights for business audiences')).toBeInTheDocument();
  });

  it('prioritizes technical strengths with refreshed copy in Spanish', () => {
    window.localStorage.setItem('portfolio-language', 'es');

    render(
      <LanguageProvider>
        <Strengths />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { name: 'Fortalezas Clave', level: 2 })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: 'Fortalezas Clave' })).toHaveLength(1);
    expect(
      screen.getByText('Las capacidades que mejor explican como convierto datos en decisiones y entregables listos para negocio.')
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Fortalezas Tecnicas', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Habilidades Blandas', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Analitica de clientes y segmentacion accionable')).toBeInTheDocument();
    expect(screen.getByText('Dashboards ejecutivos en Power BI con storytelling de KPIs')).toBeInTheDocument();
    expect(screen.getByText('Reportes listos para la toma de decisiones de stakeholders no tecnicos')).toBeInTheDocument();
    expect(screen.getByText('Comunicacion clara de insights para audiencias de negocio')).toBeInTheDocument();
  });
});
