export type ProjectTier = 'featured' | 'supporting';

export interface Project {
  id: number;
  tier: ProjectTier;
  title: string;
  titleEs: string;
  image: string;
  tech: string[];
  description: string;
  descriptionEs: string;
  highlights: string[];
  highlightsEs: string[];
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
    image: '/images/projects/customer-profile-analytics.png',
    tech: ['Python', 'Jupyter', 'Power BI', 'pandas', 'Business Storytelling'],
    description:
      'Reproducible customer analytics workflow that transforms raw marketing data into a clean analytical dataset and a polished Power BI dashboard for executive decision making.',
    descriptionEs:
      'Flujo reproducible de customer analytics que transforma datos crudos de marketing en un dataset analitico limpio y un dashboard de Power BI orientado a decisiones ejecutivas.',
    highlights: [
      '2,021 customers analyzed',
      '25.0% high-value customer segment',
      '16.1% premium spend share',
      '4 executive pages plus mobile layouts',
    ],
    highlightsEs: [
      '2,021 clientes analizados',
      '25.0% del segmento de alto valor',
      '16.1% de participacion en gasto premium',
      '4 paginas ejecutivas mas layouts moviles',
    ],
    dashboardUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiNzE3YmU3ZDktN2M3Yi00ODY5LTk2OTktOGI0NmE3YmU1ZDdiIiwidCI6ImI3YWY4Y2FmLTgzZDgtNDY0NC04NWFlLTMxN2M1NDUyMjNjMSIsImMiOjR9&pageName=b29252d974b9cb52bd7f',
    repoUrl: 'https://github.com/Sam-24-dev/customer-profile-analytics-powerbi',
  },
  {
    id: 2,
    tier: 'featured',
    title: 'eSports Analytics Dashboard LATAM',
    titleEs: 'Dashboard de Analitica eSports LATAM',
    image: '/images/projects/esports-dashboard.png',
    tech: ['MySQL', 'Python', 'Chart.js', 'Machine Learning', 'GitHub Actions'],
    description:
      'Analytical product that unifies relational data, ETL, validation, and dashboard delivery to explore team performance, competitions, and player projections across the LATAM eSports ecosystem.',
    descriptionEs:
      'Producto analitico que unifica datos relacionales, ETL, validacion y entrega de dashboard para explorar rendimiento de equipos, competiciones y proyecciones de jugadores en el ecosistema eSports LATAM.',
    highlights: [
      '40% faster query performance',
      '15 teams across 8 countries',
      '33 player projections for 2026',
      '126 automated tests in the suite',
    ],
    highlightsEs: [
      '40% mas rapido en consultas',
      '15 equipos en 8 paises',
      '33 proyecciones de jugadores para 2026',
      '126 pruebas automatizadas en la suite',
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
    image: '/images/projects/powerbi-dashboard.png',
    tech: ['Power BI', 'DAX', 'Excel', 'Business Intelligence'],
    description:
      'Executive sales dashboard focused on performance gaps, top sellers, and geographic insights to support faster commercial decisions.',
    descriptionEs:
      'Dashboard ejecutivo de ventas enfocado en brechas de desempeno, mejores vendedores e insights geograficos para apoyar decisiones comerciales mas rapidas.',
    highlights: [
      '$16.66K performance gap identified',
      '23 salespeople analyzed',
      'Top category and market opportunities surfaced',
    ],
    highlightsEs: [
      '$16.66K de brecha de desempeno identificada',
      '23 vendedores analizados',
      'Oportunidades top por categoria y mercado detectadas',
    ],
    dashboardUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiOTk5YTE0MjItZTNiOC00ZmI0LWI1NDUtZDY2ZThjZTYxYmQ0IiwidCI6ImI3YWY4Y2FmLTgzZDgtNDY0NC04NWFlLTMxN2M1NDUyMjNjMSIsImMiOjR9',
  },
  {
    id: 4,
    tier: 'supporting',
    title: 'Rice Crop Analytics Platform',
    titleEs: 'Plataforma Analitica para Cultivo de Arroz',
    image: '/images/projects/rice-system.png',
    tech: ['MySQL', 'Python', 'ETL', 'Chart.js', 'Bootstrap'],
    description:
      'Agricultural analytics project with a Python ETL pipeline, operational KPIs, and a strategic ROI recovery plan backed by dashboard delivery.',
    descriptionEs:
      'Proyecto de analitica agricola con pipeline ETL en Python, KPIs operativos y un plan estrategico de recuperacion de ROI respaldado por dashboards.',
    highlights: [
      'ROI roadmap from -5.58% to +15%',
      '+20.6 point improvement projection',
      '5 dashboard pages backed by ETL outputs',
    ],
    highlightsEs: [
      'Hoja de ruta de ROI desde -5.58% hasta +15%',
      'Proyeccion de mejora de +20.6 puntos',
      '5 paginas de dashboard respaldadas por ETL',
    ],
    demoUrl: 'https://sam-24-dev.github.io/Analisis-Cultivo-Arroz/',
    demoLabel: 'Live Platform',
    demoLabelEs: 'Plataforma en Vivo',
    repoUrl: 'https://github.com/Sam-24-dev/Analisis-Cultivo-Arroz',
  },
  {
    id: 5,
    tier: 'supporting',
    title: 'Statistical Analysis: Ping Pong Precision Model',
    titleEs: 'Analisis Estadistico: Modelo de Precision en Ping Pong',
    image: '/images/projects/pingpong-analysis.png',
    tech: ['R', 'Statistical Modeling', 'RMarkdown', 'Hypothesis Testing'],
    description:
      'Controlled experimental study that evaluates precision under different conditions and validates model fit through statistical testing.',
    descriptionEs:
      'Estudio experimental controlado que evalua la precision bajo distintas condiciones y valida el ajuste del modelo mediante pruebas estadisticas.',
    highlights: [
      '309 observations collected',
      'Validated model fit with p = 0.660',
      'Correlation insight of r = 0.65',
    ],
    highlightsEs: [
      '309 observaciones recolectadas',
      'Ajuste del modelo validado con p = 0.660',
      'Insight de correlacion de r = 0.65',
    ],
    demoUrl: 'https://sam-24-dev.github.io/Analisis-Ping-Pong/',
    demoLabel: 'Live Platform',
    demoLabelEs: 'Plataforma en Vivo',
    repoUrl: 'https://github.com/Sam-24-dev/An-lisis-Ping-Pong',
  },
  {
    id: 6,
    tier: 'supporting',
    title: 'NASA Space Apps Challenge 2025',
    titleEs: 'NASA Space Apps Challenge 2025',
    image: '/images/projects/nasa-space-apps.png',
    tech: ['Python', 'Flask', 'React', 'TypeScript', 'Leaflet', 'Recharts'],
    description:
      'Hackathon MVP that analyzes historical weather signals to estimate extreme conditions and support outdoor planning with interactive maps.',
    descriptionEs:
      'MVP de hackathon que analiza senales climaticas historicas para estimar condiciones extremas y apoyar la planificacion de actividades con mapas interactivos.',
    highlights: [
      '48-hour hackathon build',
      '10 years of historical weather analysis',
      '5 extreme conditions tracked',
      'Global interactive map experience',
    ],
    highlightsEs: [
      'Proyecto desarrollado en 48 horas',
      '10 anos de analisis climaticos historicos',
      '5 condiciones extremas rastreadas',
      'Experiencia global con mapas interactivos',
    ],
    demoUrl: 'https://www.youtube.com/watch?v=519T9N7JkZU&feature=youtu.be',
    demoLabel: 'Video Demo',
    demoLabelEs: 'Video Demo',
    certificateUrl: '/certificates/nasa-space-apps-2025.pdf',
    repoUrl: 'https://github.com/JairPalaguachi/Probability',
  },
];
