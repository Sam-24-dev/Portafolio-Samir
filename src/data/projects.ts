export type ProjectTier = 'featured' | 'supporting';
export type ProjectCategory = 'bi_dashboards' | 'customer_analytics' | 'etl_data_prep' | 'statistics';

export interface Project {
  id: number;
  tier: ProjectTier;
  categories?: ProjectCategory[];
  title: string;
  titleEs: string;
  image: string;
  tech: string[];
  description: string;
  descriptionEs: string;
  highlights: string[];
  highlightsEs: string[];
  supportingLabel?: string;
  supportingLabelEs?: string;
  supportingValue?: string;
  supportingValueEs?: string;
  demoUrl?: string;
  demoLabel?: string;
  demoLabelEs?: string;
  dashboardUrl?: string;
  analysisUrl?: string;
  reportUrl?: string;
  certificateUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    tier: 'featured',
    title: 'Customer Profile Analytics Dashboard',
    titleEs: 'Dashboard de Customer Profile Analytics',
    image: '/images/projects/customer-profile-analytics.webp',
    tech: ['Python', 'Jupyter', 'Power BI', 'pandas', 'Business Storytelling'],
    description:
      'Customer analytics case that turns marketing records into reliable segments and an executive Power BI view for decision-making.',
    descriptionEs:
      'Caso de analítica de clientes que convierte registros de marketing en segmentos confiables y una vista ejecutiva en Power BI para apoyar decisiones.',
    highlights: [
      '2,021 customer records prepared for analysis',
      'Reliable high-value segmentation for business reading',
      'Reproducible cleaning and validation workflow in Python',
      'Executive Power BI report with mobile layouts',
    ],
    highlightsEs: [
      '2,021 registros de clientes preparados para análisis',
      'Segmentación de alto valor confiable para lectura de negocio',
      'Flujo reproducible de limpieza y validación en Python',
      'Reporte ejecutivo en Power BI con layouts móviles',
    ],
    dashboardUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiNzE3YmU3ZDktN2M3Yi00ODY5LTk2OTktOGI0NmE3YmU1ZDdiIiwidCI6ImI3YWY4Y2FmLTgzZDgtNDY0NC04NWFlLTMxN2M1NDUyMjNjMSIsImMiOjR9&pageName=b29252d974b9cb52bd7f',
    repoUrl: 'https://github.com/Sam-24-dev/customer-profile-analytics-powerbi',
  },
  {
    id: 2,
    tier: 'featured',
    title: 'eSports Analytics Dashboard LATAM',
    titleEs: 'Dashboard de Analítica eSports LATAM',
    image: '/images/projects/esports-dashboard.webp',
    tech: ['MySQL', 'Python', 'Chart.js', 'Machine Learning', 'GitHub Actions'],
    description:
      'Analytical product that combines competitive data, performance context, and player projections for eSports LATAM decision-making.',
    descriptionEs:
      'Producto analítico que combina datos competitivos, contexto de rendimiento y proyecciones de jugadores para apoyar decisiones en eSports LATAM.',
    highlights: [
      'Unified view of teams, players, and competitions',
      'Player projections built for 2026 planning',
      'Validated data flow with automated tests',
      'Published dashboard for operational tracking',
    ],
    highlightsEs: [
      'Vista unificada de equipos, jugadores y competiciones',
      'Proyecciones de jugadores para planificación 2026',
      'Flujo de datos validado con pruebas automatizadas',
      'Dashboard publicado para seguimiento operativo',
    ],
    demoUrl: 'https://sam-24-dev.github.io/eSports-Analytics-Dashboard/',
    demoLabel: 'Live Dashboard',
    demoLabelEs: 'Dashboard en Vivo',
    repoUrl: 'https://github.com/Sam-24-dev/eSports-Analytics-Dashboard',
  },
  {
    id: 3,
    tier: 'featured',
    title: 'Grocery Sales BI Dashboard',
    titleEs: 'Dashboard BI de Ventas de Abarrotes',
    image: '/images/projects/powerbi-dashboard.webp',
    tech: ['Power BI', 'DAX', 'Excel', 'Business Intelligence'],
    description:
      'Commercial Power BI dashboard designed to surface performance gaps, leading categories, and market opportunities with an executive readout.',
    descriptionEs:
      'Dashboard comercial en Power BI diseñado para mostrar brechas de desempeño, categorías líderes y oportunidades de mercado con lectura ejecutiva inmediata.',
    highlights: [
      '$16.66K performance gap identified',
      '23 active sellers analyzed',
      '$80.05K top revenue category identified',
      'Tulsa surfaced as the strongest market',
    ],
    highlightsEs: [
      '$16.66K de brecha de desempeño identificada',
      '23 vendedores activos analizados',
      '$80.05K en la categoría con mayor ingreso identificada',
      'Tulsa apareció como el mercado más fuerte',
    ],
    dashboardUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiOTk5YTE0MjItZTNiOC00ZmI0LWI1NDUtZDY2ZThjZTYxYmQ0IiwidCI6ImI3YWY4Y2FmLTgzZDgtNDY0NC04NWFlLTMxN2M1NDUyMjNjMSIsImMiOjR9',
  },
  {
    id: 4,
    tier: 'supporting',
    categories: ['bi_dashboards', 'etl_data_prep'],
    title: 'Rice Crop Analytics Platform',
    titleEs: 'Plataforma Analítica para Cultivo de Arroz',
    image: '/images/projects/rice-system.webp',
    tech: ['MySQL', 'Python', 'ETL', 'Chart.js', 'Bootstrap'],
    description:
      'Operational analytics project that connects ETL, KPI tracking, and ROI recovery in a dashboard-backed agricultural workflow.',
    descriptionEs:
      'Proyecto de analítica operativa que conecta ETL, seguimiento de KPIs y recuperación de rentabilidad en un flujo agrícola respaldado por dashboards.',
    highlights: [
      'ROI roadmap from -5.58% to +15%',
      '+20.6 point improvement projection',
      '5 dashboard pages backed by ETL outputs',
    ],
    highlightsEs: [
      'Hoja de ruta de ROI desde -5.58% hasta +15%',
      'Proyección de mejora de +20.6 puntos',
      '5 páginas de dashboard respaldadas por ETL',
    ],
    supportingLabel: 'ETL and KPI delivery',
    supportingLabelEs: 'Entrega ETL y KPIs',
    supportingValue: 'Reinforces operational ETL execution, KPI design, and profitability recovery framing.',
    supportingValueEs:
      'Refuerza ejecución ETL operativa, diseño de KPIs y una narrativa clara de recuperación de rentabilidad.',
    demoUrl: 'https://sam-24-dev.github.io/Analisis-Cultivo-Arroz/',
    demoLabel: 'Live Platform',
    demoLabelEs: 'Plataforma en Vivo',
    repoUrl: 'https://github.com/Sam-24-dev/Analisis-Cultivo-Arroz',
  },
  {
    id: 5,
    tier: 'supporting',
    categories: ['statistics'],
    title: 'Statistical Analysis: Ping Pong Precision Model',
    titleEs: 'Análisis Estadístico: Modelo de Precisión en Ping Pong',
    image: '/images/projects/pingpong-analysis.webp',
    tech: ['R', 'Statistical Modeling', 'RMarkdown', 'Hypothesis Testing'],
    description:
      'Applied statistical study that models ping pong serve precision and validates the result with reproducible methodology.',
    descriptionEs:
      'Estudio estadístico aplicado que modela la precisión del saque en ping pong y valida el resultado con una metodología reproducible.',
    highlights: [
      '309 observations collected',
      'Validated model fit with p = 0.660',
      'Weak correlation result of r = 0.049',
    ],
    highlightsEs: [
      '309 observaciones recolectadas',
      'Ajuste del modelo validado con p = 0.660',
      'Resultado de correlación débil con r = 0.049',
    ],
    supportingLabel: 'Statistical validation',
    supportingLabelEs: 'Validación estadística',
    supportingValue: 'Reinforces experimental design, model validation, and reproducible communication of findings.',
    supportingValueEs:
      'Refuerza diseño experimental, validación de modelos y comunicación reproducible de hallazgos.',
    demoUrl: 'https://sam-24-dev.github.io/Analisis-Ping-Pong/',
    demoLabel: 'Live Platform',
    demoLabelEs: 'Plataforma en Vivo',
    repoUrl: 'https://github.com/Sam-24-dev/Analisis-Ping-Pong',
  },
  {
    id: 6,
    tier: 'supporting',
    categories: ['etl_data_prep'],
    title: 'NASA Space Apps Challenge 2025',
    titleEs: 'NASA Space Apps Challenge 2025',
    image: '/images/projects/nasa-space-apps.webp',
    tech: ['Python', 'Flask', 'React', 'TypeScript', 'Leaflet', 'Recharts'],
    description:
      'Hackathon MVP that turns historical weather signals into an interactive planning experience for outdoor decision support.',
    descriptionEs:
      'MVP de hackathon que convierte señales climáticas históricas en una experiencia interactiva para apoyar decisiones de planificación.',
    highlights: [
      '48-hour hackathon build',
      '10 years of historical weather analysis',
      '5 extreme conditions tracked',
      'Global interactive map experience',
    ],
    highlightsEs: [
      'Proyecto desarrollado en 48 horas',
      '10 años de análisis climáticos históricos',
      '5 condiciones extremas rastreadas',
      'Experiencia global con mapas interactivos',
    ],
    supportingLabel: 'Rapid product execution',
    supportingLabelEs: 'Ejecución rápida de producto',
    supportingValue: 'Reinforces rapid prototyping, cross-functional collaboration, and functional delivery under time pressure.',
    supportingValueEs:
      'Refuerza prototipado rápido, colaboración multidisciplinaria y entrega funcional bajo presión de tiempo.',
    demoUrl: 'https://www.youtube.com/watch?v=519T9N7JkZU&feature=youtu.be',
    demoLabel: 'Video Demo',
    demoLabelEs: 'Video Demo',
    certificateUrl: '/certificates/nasa-space-apps-2025.pdf',
    repoUrl: 'https://github.com/JairPalaguachi/Probability',
  },
];
