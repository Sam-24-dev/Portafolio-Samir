export interface CaseStudyLinks {
  caseStudyUrl: string;
  liveUrl: string;
  repoUrl: string;
}

export interface CaseStudy {
  projectId: number;
  summary: string;
  summaryEs: string;
  roleSummary: string;
  roleSummaryEs: string;
  businessProblem: string[];
  businessProblemEs: string[];
  datasetAndWorkflow: string[];
  datasetAndWorkflowEs: string[];
  toolsUsed: string[];
  toolsUsedEs: string[];
  metricsAndResult: string[];
  metricsAndResultEs: string[];
  whyItMatters: string;
  whyItMattersEs: string;
  links: CaseStudyLinks;
}

export const caseStudies: CaseStudy[] = [
  {
    projectId: 1,
    summary:
      'Built to move from inconsistent marketing records to a clearer customer view, defendable segments, and stronger commercial reading in Power BI.',
    summaryEs:
      'Diseñado para pasar de registros de marketing inconsistentes a una visión más clara del cliente, segmentos defendibles y una mejor lectura comercial en Power BI.',
    roleSummary:
      'Samir led the analytical cleanup, segment framing, and executive readout that turned the original work into a portfolio-ready BI case.',
    roleSummaryEs:
      'Samir lideró la limpieza analítica, la definición de segmentos y la lectura ejecutiva que convirtió el trabajo original en un caso sólido de BI para portafolio.',
    businessProblem: [
      'The source file mixed duplicates, inconsistent categories, and low analytical reliability.',
      'The output needed more than charts; it had to support explainable customer segmentation for non-technical review.',
    ],
    businessProblemEs: [
      'El archivo fuente mezclaba duplicados, categorías inconsistentes y baja confiabilidad analítica.',
      'La entrega necesitaba algo más que gráficos; debía sostener segmentación explicable para revisión no técnica.',
    ],
    datasetAndWorkflow: [
      'Raw marketing records were cleaned in Python, standardized with business rules, and prepared as a reliable analytical dataset.',
      'That final model fed a Power BI report designed for executive reading across desktop and mobile layouts.',
    ],
    datasetAndWorkflowEs: [
      'Los registros de marketing se limpiaron en Python, se estandarizaron con reglas de negocio y se prepararon como un dataset analítico confiable.',
      'Ese modelo final alimentó un reporte en Power BI diseñado para lectura ejecutiva en desktop y layouts móviles.',
    ],
    toolsUsed: [
      'Python and pandas',
      'Jupyter Notebook',
      'Power BI Desktop',
      'Power BI Service',
    ],
    toolsUsedEs: [
      'Python y pandas',
      'Jupyter Notebook',
      'Power BI Desktop',
      'Power BI Service',
    ],
    metricsAndResult: [
      '2,021 customer records prepared for analysis and segmentation.',
      '25.0% high-value segment made visible in the final customer view.',
      '1.14M in total spend and 16.1% premium-spend share surfaced in an executive report.',
    ],
    metricsAndResultEs: [
      '2,021 registros de clientes preparados para análisis y segmentación.',
      '25.0% de segmento de alto valor visible en la vista final de clientes.',
      '1.14M de gasto total y 16.1% de participación en gasto premium expuestos en un reporte ejecutivo.',
    ],
    whyItMatters:
      'It shows Samir can turn messy customer data into a decision-ready BI deliverable with clear commercial interpretation.',
    whyItMattersEs:
      'Demuestra que Samir puede convertir datos desordenados de clientes en una entrega de BI lista para decisión, con lectura comercial clara.',
    links: {
      caseStudyUrl: 'https://github.com/Sam-24-dev/customer-profile-analytics-powerbi#readme',
      liveUrl:
        'https://app.powerbi.com/view?r=eyJrIjoiNzE3YmU3ZDktN2M3Yi00ODY5LTk2OTktOGI0NmE3YmU1ZDdiIiwidCI6ImI3YWY4Y2FmLTgzZDgtNDY0NC04NWFlLTMxN2M1NDUyMjNjMSIsImMiOjR9&pageName=b29252d974b9cb52bd7f',
      repoUrl: 'https://github.com/Sam-24-dev/customer-profile-analytics-powerbi',
    },
  },
  {
    projectId: 2,
    summary:
      'Built to unify fragmented eSports LATAM data into one dashboard that supports tracking, comparison, and forward-looking player analysis.',
    summaryEs:
      'Diseñado para unificar datos fragmentados de eSports LATAM en un solo dashboard que facilita seguimiento, comparación y análisis prospectivo de jugadores.',
    roleSummary:
      'Samir led the analytical framing, ETL bridge, and delivery logic that kept the product useful as the data evolved.',
    roleSummaryEs:
      'Samir lideró el enfoque analítico, el puente ETL y la lógica de entrega que mantiene útil el producto incluso cuando cambian los datos.',
    businessProblem: [
      'Performance data was fragmented across teams, players, competitions, and match context.',
      'The product had to support day-to-day tracking without losing the value of forward-looking analysis.',
    ],
    businessProblemEs: [
      'Los datos de rendimiento estaban fragmentados entre equipos, jugadores, competiciones y contexto de partidas.',
      'El producto debía servir para seguimiento operativo sin perder el valor del análisis orientado al futuro.',
    ],
    datasetAndWorkflow: [
      'Data moved from MySQL and SQL extraction into Python transformations, validation checks, and dashboard-ready outputs.',
      'A machine learning stage added player projections before the product was published to GitHub Pages.',
    ],
    datasetAndWorkflowEs: [
      'Los datos avanzaron desde MySQL y la extracción SQL hacia transformaciones en Python, validaciones y salidas listas para dashboard.',
      'Una etapa de machine learning añadió proyecciones de jugadores antes de publicar el producto en GitHub Pages.',
    ],
    toolsUsed: [
      'MySQL and SQL',
      'Python and pandas',
      'Chart.js',
      'GitHub Actions and GitHub Pages',
    ],
    toolsUsedEs: [
      'MySQL y SQL',
      'Python y pandas',
      'Chart.js',
      'GitHub Actions y GitHub Pages',
    ],
    metricsAndResult: [
      '15 teams, 33 active players, and 8 countries consolidated in one analytical product.',
      '5 competitions and a 325K prize pool contextualized for faster competitive reading.',
      '33 player projections for 2026 delivered with 126 automated tests protecting the pipeline.',
    ],
    metricsAndResultEs: [
      '15 equipos, 33 jugadores activos y 8 países consolidados en un solo producto analítico.',
      '5 competiciones y un prize pool de 325K contextualizados para lectura competitiva más rápida.',
      '33 proyecciones de jugadores para 2026 entregadas con 126 pruebas automatizadas protegiendo el pipeline.',
    ],
    whyItMatters:
      'It shows Samir can deliver a broader analytical product that balances data quality, product thinking, and decision-ready storytelling.',
    whyItMattersEs:
      'Demuestra que Samir puede entregar un producto analítico más completo, equilibrando calidad de datos, criterio de producto y storytelling orientado a decisión.',
    links: {
      caseStudyUrl: 'https://github.com/Sam-24-dev/eSports-Analytics-Dashboard#readme',
      liveUrl: 'https://sam-24-dev.github.io/eSports-Analytics-Dashboard/',
      repoUrl: 'https://github.com/Sam-24-dev/eSports-Analytics-Dashboard',
    },
  },
];

export const caseStudyProjectIds = new Set(caseStudies.map((caseStudy) => caseStudy.projectId));

export const getCaseStudyByProjectId = (projectId: number) =>
  caseStudies.find((caseStudy) => caseStudy.projectId === projectId);
