export interface RepoProofCard {
  id: string;
  name: string;
  nameEs: string;
  proof: string;
  proofEs: string;
  tags: string[];
  repoUrl: string;
  readmeUrl: string;
  demoUrl?: string;
}

export const repoProofCards: RepoProofCard[] = [
  {
    id: 'customer-profile-analytics-powerbi',
    name: 'customer-profile-analytics-powerbi',
    nameEs: 'customer-profile-analytics-powerbi',
    proof:
      'Shows Python-based cleaning, customer segmentation framing, and the documentation discipline behind an executive Power BI case.',
    proofEs:
      'Muestra limpieza con Python, framing de segmentacion de clientes y la disciplina de documentacion detras de un caso ejecutivo en Power BI.',
    tags: ['Python', 'Jupyter', 'Power BI', 'pandas'],
    repoUrl: 'https://github.com/Sam-24-dev/customer-profile-analytics-powerbi',
    readmeUrl: 'https://github.com/Sam-24-dev/customer-profile-analytics-powerbi#readme',
    demoUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiNzE3YmU3ZDktN2M3Yi00ODY5LTk2OTktOGI0NmE3YmU1ZDdiIiwidCI6ImI3YWY4Y2FmLTgzZDgtNDY0NC04NWFlLTMxN2M1NDUyMjNjMSIsImMiOjR9&pageName=b29252d974b9cb52bd7f',
  },
  {
    id: 'esports-analytics-dashboard',
    name: 'eSports-Analytics-Dashboard',
    nameEs: 'eSports-Analytics-Dashboard',
    proof:
      'Shows SQL extraction, Python transformation, automation discipline, and a published analytical product backed by tests.',
    proofEs:
      'Muestra extraccion SQL, transformacion en Python, disciplina de automatizacion y un producto analitico publicado con soporte de pruebas.',
    tags: ['MySQL', 'Python', 'Chart.js', 'GitHub Actions'],
    repoUrl: 'https://github.com/Sam-24-dev/eSports-Analytics-Dashboard',
    readmeUrl: 'https://github.com/Sam-24-dev/eSports-Analytics-Dashboard#readme',
    demoUrl: 'https://sam-24-dev.github.io/eSports-Analytics-Dashboard/',
  },
  {
    id: 'analisis-cultivo-arroz',
    name: 'Analisis-Cultivo-Arroz',
    nameEs: 'Analisis-Cultivo-Arroz',
    proof:
      'Shows ETL-backed delivery, KPI framing, and repo-level documentation for an operational analytics workflow.',
    proofEs:
      'Muestra entrega respaldada por ETL, framing de KPIs y documentacion a nivel de repo para un flujo de analitica operativa.',
    tags: ['MySQL', 'Python', 'ETL', 'Chart.js'],
    repoUrl: 'https://github.com/Sam-24-dev/Analisis-Cultivo-Arroz',
    readmeUrl: 'https://github.com/Sam-24-dev/Analisis-Cultivo-Arroz#readme',
    demoUrl: 'https://sam-24-dev.github.io/Analisis-Cultivo-Arroz/',
  },
];
