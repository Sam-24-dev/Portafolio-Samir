import type { EngineeringSectionId } from '../lib/portfolioRoute';

export type EngineeringProjectId = 'tech-trends' | 'ridefare';
export type EngineeringCaseTab = 'overview' | 'architecture' | 'delivery';
export type EngineeringStrengthIcon = 'workflow' | 'shield' | 'automation' | 'delivery' | 'bridge';
export type EngineeringNavigationId = Extract<
  EngineeringSectionId,
  'engineering-home' | 'engineering-projects' | 'engineering-stack' | 'engineering-how-i-work' | 'contact'
>;

interface RouteMetaContent {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

interface EngineeringHeroContent {
  eyebrow: string;
  greetingLead: string;
  greetingAccent: string;
  badges: string[];
  titles: string[];
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  tertiaryCta: string;
}

export interface EngineeringProofMetric {
  value: string;
  label: string;
  note: string;
}

export interface EngineeringFeaturedProject {
  id: EngineeringProjectId;
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  demoUrl?: string;
  challenge: string;
  dataFlow: string;
  qualityDiscipline: string;
  publicOutput: string;
}

export interface EngineeringBridgeProject {
  id: 'rice-crop' | 'esports';
  title: string;
  description: string;
  tags: string[];
  pipelineShape: string;
  validationLayer: string;
  outputLayer: string;
  verifiedResult: string;
  repoUrl: string;
  demoUrl?: string;
}

export interface EngineeringCaseEvidence {
  eyebrow: string;
  eyebrowEs: string;
  detail: string;
  detailEs: string;
}

export interface EngineeringCaseSection {
  title: string;
  titleEs: string;
  body: string;
  bodyEs: string;
}

export interface EngineeringCaseStudy {
  id: EngineeringProjectId;
  summary: string;
  summaryEs: string;
  whyItMatters: string;
  whyItMattersEs: string;
  evidence: EngineeringCaseEvidence[];
  architectureImage: string;
  architectureImageAlt: string;
  architectureImageAltEs: string;
  architectureSections: EngineeringCaseSection[];
  deliveryImage: string;
  deliveryImageAlt: string;
  deliveryImageAltEs: string;
  deliverySections: EngineeringCaseSection[];
}

export interface EngineeringStrengthCard {
  icon: EngineeringStrengthIcon;
  title: string;
  description: string;
}

interface EngineeringStackContent {
  title: string;
  subtitle: string;
  coreLabel: string;
  supportingLabel: string;
}

interface EngineeringCaseModalCopy {
  badge: string;
  closeLabel: string;
  tabsLabel: string;
  overviewTab: string;
  architectureTab: string;
  deliveryTab: string;
  summaryLabel: string;
  whyItMattersLabel: string;
  verifiedEvidenceLabel: string;
  caseButtonLabel: string;
  repoButtonLabel: string;
  demoButtonLabel: string;
}

interface EngineeringProjectSection {
  eyebrow: string;
  title: string;
  subtitle: string;
  labels: {
    challenge: string;
    dataFlow: string;
    qualityDiscipline: string;
    publicOutput: string;
  };
  cards: EngineeringFeaturedProject[];
}

interface EngineeringBridgeSection {
  eyebrow: string;
  title: string;
  subtitle: string;
  labels: {
    pipelineShape: string;
    validationLayer: string;
    outputLayer: string;
    verifiedResult: string;
  };
  cards: EngineeringBridgeProject[];
}

interface EngineeringStrengthSection {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: EngineeringStrengthCard[];
}

export interface EngineeringRouteContent {
  metadata: RouteMetaContent;
  navigation: Array<{
    id: EngineeringNavigationId;
    label: string;
  }>;
  hero: EngineeringHeroContent;
  proofStrip: {
    title: string;
    subtitle: string;
    items: EngineeringProofMetric[];
  };
  anchorProjects: EngineeringProjectSection;
  bridgeProjects: EngineeringBridgeSection;
  stack: EngineeringStackContent;
  strengths: EngineeringStrengthSection;
  caseStudyModal: EngineeringCaseModalCopy;
  contactSupportCopy: string;
}

const techTrendsArchitectureImage = '/images/case-studies/engineering/tech-trends/architecture.webp';
const techTrendsDeliveryImage = '/images/case-studies/engineering/tech-trends/delivery.webp';
const ridefareArchitectureImage = '/images/case-studies/engineering/ridefare/architecture.webp';
const ridefareDeliveryImage = '/images/case-studies/engineering/ridefare/delivery.webp';

export const engineeringCaseStudies: EngineeringCaseStudy[] = [
  {
    id: 'tech-trends',
    summary:
      'This case shows how public signals from GitHub, StackOverflow, and Reddit become one ranking product with visible rules, stable outputs, and a public delivery layer.',
    summaryEs:
      'Este caso muestra cómo las señales públicas de GitHub, StackOverflow y Reddit se convierten en un producto de ranking con reglas visibles, salidas estables y una capa pública de entrega.',
    whyItMatters:
      'It proves this route is supported by real ETL work, validation rules, and a public product that can be reviewed from source data to final interface.',
    whyItMattersEs:
      'Demuestra que esta ruta se apoya en ETL real, reglas de validación y un producto público que puede revisarse desde los datos fuente hasta la interfaz final.',
    evidence: [
      {
        eyebrow: '931 repos',
        eyebrowEs: '931 repos',
        detail: 'The GitHub ingestion layer classified 931 repositories that feed the ranking base.',
        detailEs: 'La capa de ingesta de GitHub clasificó 931 repositorios que alimentan la base del ranking.',
      },
      {
        eyebrow: '22 technologies',
        eyebrowEs: '22 tecnologías',
        detail: 'The published output currently follows 22 technologies with visible ranking and history.',
        detailEs: 'La salida publicada hoy sigue a 22 tecnologías con ranking e historial visibles.',
      },
      {
        eyebrow: '33,356 questions',
        eyebrowEs: '33,356 preguntas',
        detail: 'The scoring model uses more than 33k real StackOverflow questions as a demand signal.',
        detailEs: 'El modelo usa más de 33 mil preguntas reales de StackOverflow como señal de demanda.',
      },
      {
        eyebrow: '366 mentions',
        eyebrowEs: '366 menciones',
        detail: 'Reddit adds a weekly signal that helps capture movement around emerging topics.',
        detailEs: 'Reddit agrega una señal semanal que ayuda a captar movimiento alrededor de temas emergentes.',
      },
    ],
    architectureImage: techTrendsArchitectureImage,
    architectureImageAlt: 'Technology Trend Analysis Platform architecture diagram',
    architectureImageAltEs: 'Diagrama de arquitectura de Technology Trend Analysis Platform',
    architectureSections: [
      {
        title: 'How it is organized',
        titleEs: 'Cómo está organizado',
        body: 'Three public sources land in one shared flow before the ranking is calculated and prepared for the product.',
        bodyEs:
          'Tres fuentes públicas aterrizan en un flujo compartido antes de calcular el ranking y prepararlo para el producto.',
      },
      {
        title: 'Validation',
        titleEs: 'Validación',
        body: 'Pandera checks and documented rules keep the score tied to explicit contracts instead of hidden assumptions.',
        bodyEs:
          'Las validaciones con Pandera y las reglas documentadas mantienen el score atado a contratos explícitos, no a supuestos ocultos.',
      },
      {
        title: 'Files and outputs',
        titleEs: 'Archivos y salidas',
        body: 'CSV and JSON artifacts feed ranking views, historical snapshots, and technology profiles in the public experience.',
        bodyEs:
          'Los artefactos CSV y JSON alimentan las vistas del ranking, los snapshots históricos y los perfiles de tecnología de la experiencia pública.',
      },
    ],
    deliveryImage: techTrendsDeliveryImage,
    deliveryImageAlt: 'Technology Trend Analysis Platform public product screenshot',
    deliveryImageAltEs: 'Captura del producto público de Technology Trend Analysis Platform',
    deliverySections: [
      {
        title: 'Tools',
        titleEs: 'Herramientas',
        body: 'Python handles ingestion, transformation, and Trend Score logic while Flutter Web packages the public interface.',
        bodyEs:
          'Python se encarga de la ingesta, la transformación y la lógica de Trend Score, mientras Flutter Web empaqueta la interfaz pública.',
      },
      {
        title: 'Automation',
        titleEs: 'Automatización',
        body: 'GitHub Actions runs the weekly refresh, validates outputs, and syncs the generated assets the site consumes.',
        bodyEs:
          'GitHub Actions ejecuta el refresh semanal, valida la salida y sincroniza los assets generados que consume el sitio.',
      },
      {
        title: 'Public experience',
        titleEs: 'Experiencia pública',
        body: 'The result is a product someone can inspect end to end, not a black-box demo with hidden runtime steps.',
        bodyEs:
          'El resultado es un producto que otra persona puede revisar de punta a punta, no una demo opaca con pasos ocultos en runtime.',
      },
    ],
  },
  {
    id: 'ridefare',
    summary:
      'This case turns a pricing workflow into a clearer delivery system, from raw data and marts to model artifacts, exported JSON, and a public Next.js product.',
    summaryEs:
      'Este caso convierte un flujo de pricing en un sistema de entrega más claro, desde datos crudos y marts hasta artefactos del modelo, JSON exportado y un producto público en Next.js.',
    whyItMatters:
      'It shows Samir can move beyond notebook logic into a reproducible pipeline with explicit steps, reviewable outputs, and a public product that stays stable after deploy.',
    whyItMattersEs:
      'Demuestra que Samir puede ir más allá de la lógica de notebook hacia un pipeline reproducible, con pasos explícitos, salidas revisables y un producto público estable después del deploy.',
    evidence: [
      {
        eyebrow: 'ingest → export-web',
        eyebrowEs: 'ingest → export-web',
        detail: 'The CLI exposes the full delivery chain as explicit commands instead of hidden notebook steps.',
        detailEs: 'La CLI expone toda la cadena de entrega como comandos explícitos, en lugar de pasos ocultos en notebooks.',
      },
      {
        eyebrow: 'DuckDB + dbt',
        eyebrowEs: 'DuckDB + dbt',
        detail: 'The warehouse layer stays reproducible through stable marts for analytics and ML.',
        detailEs: 'La capa warehouse se mantiene reproducible mediante marts estables para analítica y ML.',
      },
      {
        eyebrow: 'Explainability artifacts',
        eyebrowEs: 'Artefactos de explicabilidad',
        detail: 'SHAP exports and model outputs stay available as reviewable artifacts, not just screenshots.',
        detailEs: 'Las salidas de SHAP y del modelo quedan disponibles como artefactos revisables, no solo como capturas.',
      },
      {
        eyebrow: 'Next.js + Vercel',
        eyebrowEs: 'Next.js + Vercel',
        detail: 'The public interface is deployed from generated data, not from a live inference API.',
        detailEs: 'La interfaz pública se despliega desde datos generados, no desde una API de inferencia en vivo.',
      },
    ],
    architectureImage: ridefareArchitectureImage,
    architectureImageAlt: 'RideFare ETL Pipeline architecture diagram',
    architectureImageAltEs: 'Diagrama de arquitectura de RideFare ETL Pipeline',
    architectureSections: [
      {
        title: 'How it is organized',
        titleEs: 'Cómo está organizado',
        body: 'The project is split into ingest, transform, train, and export-web so the delivery path stays visible from start to finish.',
        bodyEs:
          'El proyecto se divide en ingest, transform, train y export-web para que el camino de entrega se mantenga visible de inicio a fin.',
      },
      {
        title: 'Validation',
        titleEs: 'Validación',
        body: 'DuckDB, dbt, typed contracts, and explainability artifacts make each run easier to validate, compare, and trust.',
        bodyEs:
          'DuckDB, dbt, los contratos tipados y los artefactos de explicabilidad hacen que cada ejecución sea más fácil de validar, comparar y confiar.',
      },
      {
        title: 'Files and outputs',
        titleEs: 'Archivos y salidas',
        body: 'Versioned JSON files and exported model artifacts connect the pipeline with the public web experience.',
        bodyEs:
          'Los archivos JSON versionados y los artefactos exportados del modelo conectan el pipeline con la experiencia web pública.',
      },
    ],
    deliveryImage: ridefareDeliveryImage,
    deliveryImageAlt: 'RideFare ETL Pipeline public product screenshot',
    deliveryImageAltEs: 'Captura del producto público de RideFare ETL Pipeline',
    deliverySections: [
      {
        title: 'Tools',
        titleEs: 'Herramientas',
        body: 'Python commands organize the ETL and ML flow while DuckDB and dbt provide the analytical backbone behind the site.',
        bodyEs:
          'Los comandos en Python organizan el flujo ETL y ML, mientras DuckDB y dbt aportan la base analítica detrás del sitio.',
      },
      {
        title: 'Automation',
        titleEs: 'Automatización',
        body: 'GitHub Actions validates the Python and frontend paths, refreshes artifacts, and keeps the release path controlled.',
        bodyEs:
          'GitHub Actions valida los caminos de Python y frontend, refresca artefactos y mantiene controlado el camino de release.',
      },
      {
        title: 'Public experience',
        titleEs: 'Experiencia pública',
        body: 'The public product reads exported data and reviewable artifacts, so the interface stays stable after deployment.',
        bodyEs:
          'El producto público lee datos exportados y artefactos revisables, por lo que la interfaz se mantiene estable después del despliegue.',
      },
    ],
  },
];

export const getEngineeringCaseStudyById = (id: EngineeringProjectId) =>
  engineeringCaseStudies.find((caseStudy) => caseStudy.id === id) ?? null;

export const engineeringRouteContent: Record<'en' | 'es', EngineeringRouteContent> = {
  en: {
    metadata: {
      title: 'Samir Caizapasto | Data Engineer Portfolio',
      description:
        'Data Engineer portfolio focused on reproducible ETL pipelines, automation, data quality contracts, and public-facing delivery artifacts.',
      canonicalPath: '/engineering',
      ogTitle: 'Samir Caizapasto | Data Engineer Portfolio',
      ogDescription:
        'Engineering route focused on ETL systems, validated artifacts, automation discipline, and public data products.',
      twitterTitle: 'Samir Caizapasto | Data Engineer Portfolio',
      twitterDescription:
        'Data Engineer route built around ETL pipelines, automation, contracts, and reliable public delivery layers.',
    },
    navigation: [
      { id: 'engineering-home', label: 'Home' },
      { id: 'engineering-projects', label: 'Projects' },
      { id: 'engineering-stack', label: 'Stack' },
      { id: 'engineering-how-i-work', label: 'How I work' },
      { id: 'contact', label: 'Contact' },
    ],
    hero: {
      eyebrow: 'DATA ENGINEER',
      greetingLead: 'Hey,',
      greetingAccent: "I'm Samir",
      badges: ['ETL pipelines', 'Data quality contracts', 'Automation & CI/CD'],
      titles: ['Reproducible pipelines', 'Contracts and public delivery', 'Automation with evidence'],
      subtitle:
        'I build data pipelines and public-facing products that turn raw sources into validated artifacts, reproducible workflows, and reliable delivery layers.',
      primaryCta: 'View Projects',
      secondaryCta: 'Download CV',
      tertiaryCta: 'Back to Data Analyst Portfolio',
    },
    proofStrip: {
      title: 'Technical evidence',
      subtitle:
        'These numbers show this route is backed by real data processing, validation, and automation, not just a polished interface.',
      items: [
        {
          value: '931',
          label: 'repos classified',
          note: '931 repositories were processed and organized as the base of the technology ranking.',
        },
        {
          value: '22',
          label: 'technologies in ranking',
          note: 'The published output currently follows 22 technologies with visible ranking and history.',
        },
        {
          value: '33,356',
          label: 'StackOverflow questions',
          note: 'The analysis uses more than 33k real questions to measure technical interest and demand.',
        },
        {
          value: '126',
          label: 'automated tests',
          note: 'The validation layer is backed by 126 automated tests inside the eSports delivery flow.',
        },
      ],
    },
    anchorProjects: {
      eyebrow: 'Data Engineer profile',
      title: 'Key projects for the Data Engineer profile',
      subtitle:
        'Two projects that show how I turn data into reliable flows, verifiable outcomes, and public products.',
      labels: {
        challenge: 'The challenge',
        dataFlow: 'How it works',
        qualityDiscipline: 'How it is validated',
        publicOutput: 'What gets delivered',
      },
      cards: [
        {
          id: 'tech-trends',
          title: 'Technology Trend Analysis Platform',
          description:
            'Platform that brings together public signals from GitHub, StackOverflow, and Reddit to build a technology ranking that is clear, validated, and easy to review.',
          tags: ['Python', 'Pandera', 'GitHub Actions', 'Flutter Web', 'Trend Score'],
          repoUrl: 'https://github.com/Sam-24-dev/Technology-trend-analysis-platform',
          demoUrl: 'https://sam-24-dev.github.io/Technology-trend-analysis-platform/',
          challenge: 'Bring three public sources into one ranking that stays explainable instead of feeling opaque.',
          dataFlow: 'GitHub, StackOverflow, and Reddit are processed, normalized, and combined before the ranking reaches the product.',
          qualityDiscipline:
            'Validation rules and weekly automation keep the outputs stable before anything is published.',
          publicOutput:
            'The final product publishes rankings, history, and technology profiles in a public Flutter Web experience.',
        },
        {
          id: 'ridefare',
          title: 'RideFare ETL Pipeline',
          description:
            'Pricing project rebuilt as a reproducible flow that goes from raw data to analytical artifacts and a public experience in Next.js.',
          tags: ['Python', 'DuckDB', 'dbt', 'Next.js', 'GitHub Actions'],
          repoUrl: 'https://github.com/Sam-24-dev/RideFare-ETL-Pipeline',
          demoUrl: 'https://ride-fare-etl-pipeline-web.vercel.app/',
          challenge: 'Move from a legacy notebook workflow to a product with clear steps and a release path others can follow.',
          dataFlow: 'Raw data moves through ingest, transform, train, and export-web before it reaches the interface.',
          qualityDiscipline:
            'DuckDB, dbt, typed contracts, and automated checks reduce hidden state and make the flow easier to trust.',
          publicOutput:
            'The project delivers versioned JSON, model artifacts, and a public Next.js site that stays reviewable after deploy.',
        },
      ],
    },
    bridgeProjects: {
      eyebrow: 'Additional technical proof',
      title: 'Bridge projects',
      subtitle:
        'Two hybrid projects where the value was not only in the dashboard, but also in how the data was prepared, validated, and delivered.',
      labels: {
        pipelineShape: 'How information moves',
        validationLayer: 'How quality is checked',
        outputLayer: 'What reaches the product',
        verifiedResult: 'What result it left',
      },
      cards: [
        {
          id: 'rice-crop',
          title: 'Rice Crop Analytics Platform',
          description:
            'Operational analytics workflow that turns agricultural and financial data into a dashboard with browser-ready JSON and a clear profitability goal.',
          tags: ['MySQL', 'Python ETL', 'JSON outputs', 'Chart.js'],
          pipelineShape:
            'MySQL and CSV inputs move through Python ETL into seven JSON files consumed by the web dashboard.',
          validationLayer:
            'KPI calculations and ETL checkpoints organize the output before the browser consumes it.',
          outputLayer:
            'Five dashboard views and browser-ready JSON artifacts keep the operational layer visible.',
          verifiedResult: 'ROI moved from -5.58% to +15%, a recovery of +20.6 points.',
          repoUrl: 'https://github.com/Sam-24-dev/Analisis-Cultivo-Arroz',
          demoUrl: 'https://sam-24-dev.github.io/Analisis-Cultivo-Arroz/',
        },
        {
          id: 'esports',
          title: 'eSports Analytics Dashboard LATAM',
          description:
            'Hybrid dashboard that combines ETL, JSON contracts, testing, and ML projections inside one public product.',
          tags: ['MySQL', 'Python ETL', 'Chart.js', 'GitHub Actions'],
          pipelineShape:
            'MySQL data moves through Python ETL into a validated JSON bridge that powers the public dashboard.',
          validationLayer:
            'Data contracts, expected-value helpers, and 126 automated tests protect the delivery chain.',
          outputLayer: 'GitHub Pages publishes the dashboard together with a 2026 ML projection module.',
          verifiedResult: '33 ML projections were published without breaking the analytical product experience.',
          repoUrl: 'https://github.com/Sam-24-dev/eSports-Analytics-Dashboard',
          demoUrl: 'https://sam-24-dev.github.io/eSports-Analytics-Dashboard/',
        },
      ],
    },
    stack: {
      title: 'Engineering stack',
      subtitle:
        'The tools behind this route, from reproducible ETL logic to public delivery and explainable outputs.',
      coreLabel: 'Core stack',
      supportingLabel: 'Supporting tools',
    },
    strengths: {
      eyebrow: 'How I work',
      title: 'How I turn data into reliable products',
      subtitle:
        'These principles summarize how I organize a data flow so another person can understand it, review it, and run it again.',
      items: [
        {
          icon: 'workflow',
          title: 'Reproducible flows',
          description: 'I prefer clear processes with visible steps over manual solutions that are hard to repeat.',
        },
        {
          icon: 'shield',
          title: 'Validation before publishing',
          description: 'Outputs are checked before they reach a dashboard or any public-facing artifact.',
        },
        {
          icon: 'automation',
          title: 'Useful automation',
          description: 'Checks and automated tasks help keep delivery stable without adding unnecessary complexity.',
        },
        {
          icon: 'delivery',
          title: 'Data that reaches product',
          description: 'I do not stop at analysis; I prepare the output so it ends in a public and reviewable experience.',
        },
        {
          icon: 'bridge',
          title: 'Bridge between analysis and system',
          description: 'The technical layer should support the analytical value, not get in its way.',
        },
      ],
    },
    caseStudyModal: {
      badge: 'Project case',
      closeLabel: 'Close project case',
      tabsLabel: 'Project case views',
      overviewTab: 'Overview',
      architectureTab: 'Architecture',
      deliveryTab: 'Delivery',
      summaryLabel: 'What it is about',
      whyItMattersLabel: 'What it proves',
      verifiedEvidenceLabel: 'Project evidence',
      caseButtonLabel: 'View case details',
      repoButtonLabel: 'Open repository',
      demoButtonLabel: 'View demo',
    },
    contactSupportCopy:
      'I am open to roles and collaborations where I can build reliable pipelines, automate data delivery, and turn analysis into reviewable public products.',
  },
  es: {
    metadata: {
      title: 'Samir Caizapasto | Portafolio de Ingeniero de Datos',
      description:
        'Portafolio de Ingeniero de Datos enfocado en pipelines ETL reproducibles, automatización, contratos de calidad y artefactos públicos.',
      canonicalPath: '/engineering',
      ogTitle: 'Samir Caizapasto | Portafolio de Ingeniero de Datos',
      ogDescription:
        'Ruta engineering enfocada en sistemas ETL, artefactos validados, disciplina de automatización y productos de datos públicos.',
      twitterTitle: 'Samir Caizapasto | Portafolio de Ingeniero de Datos',
      twitterDescription:
        'Ruta de Ingeniero de Datos construida alrededor de ETL, automatización, contratos y capas de entrega confiables.',
    },
    navigation: [
      { id: 'engineering-home', label: 'Inicio' },
      { id: 'engineering-projects', label: 'Proyectos' },
      { id: 'engineering-stack', label: 'Stack' },
      { id: 'engineering-how-i-work', label: 'Cómo trabajo' },
      { id: 'contact', label: 'Contacto' },
    ],
    hero: {
      eyebrow: 'INGENIERO DE DATOS',
      greetingLead: 'Hola,',
      greetingAccent: 'soy Samir',
      badges: ['Pipelines ETL', 'Contratos de datos', 'Automatización y CI/CD'],
      titles: ['Pipelines reproducibles', 'Contratos y entrega pública', 'Automatización con evidencia'],
      subtitle:
        'Construyo pipelines y productos de datos que convierten fuentes crudas en artefactos validados, salidas públicas y flujos reproducibles.',
      primaryCta: 'Ver Proyectos',
      secondaryCta: 'Descargar CV',
      tertiaryCta: 'Volver al perfil de Analista de Datos',
    },
    proofStrip: {
      title: 'Evidencia técnica',
      subtitle:
        'Estas cifras muestran que esta ruta no se apoya solo en una interfaz: detrás hay procesamiento de datos, validación y automatización real.',
      items: [
        {
          value: '931',
          label: 'repos clasificados',
          note: 'Se procesaron y ordenaron 931 repositorios como base del ranking tecnológico.',
        },
        {
          value: '22',
          label: 'tecnologías en ranking',
          note: 'La salida publicada hoy sigue a 22 tecnologías con ranking e historial visibles.',
        },
        {
          value: '33,356',
          label: 'preguntas en StackOverflow',
          note: 'El análisis usa más de 33 mil preguntas reales para medir interés y demanda técnica.',
        },
        {
          value: '126',
          label: 'pruebas automatizadas',
          note: 'La capa de validación se apoya en 126 pruebas automatizadas dentro del flujo eSports.',
        },
      ],
    },
    anchorProjects: {
      eyebrow: 'Perfil de Ingeniero de Datos',
      title: 'Proyectos clave del perfil de Ingeniero de Datos',
      subtitle:
        'Dos proyectos que muestran cómo convierto datos en flujos confiables, resultados verificables y productos públicos.',
      labels: {
        challenge: 'El reto',
        dataFlow: 'Cómo funciona',
        qualityDiscipline: 'Cómo se valida',
        publicOutput: 'Qué se entrega',
      },
      cards: [
        {
          id: 'tech-trends',
          title: 'Technology Trend Analysis Platform',
          description:
            'Plataforma que reúne señales públicas de GitHub, StackOverflow y Reddit para construir un ranking tecnológico claro, validado y fácil de revisar.',
          tags: ['Python', 'Pandera', 'GitHub Actions', 'Flutter Web', 'Trend Score'],
          repoUrl: 'https://github.com/Sam-24-dev/Technology-trend-analysis-platform',
          demoUrl: 'https://sam-24-dev.github.io/Technology-trend-analysis-platform/',
          challenge: 'Unir tres fuentes públicas en un ranking que se pueda explicar y revisar sin volverlo opaco.',
          dataFlow: 'GitHub, StackOverflow y Reddit se procesan, se ordenan y se combinan antes de llegar al producto final.',
          qualityDiscipline:
            'Las reglas de validación y la automatización semanal ayudan a mantener la salida estable antes de publicar.',
          publicOutput:
            'El resultado se publica en una experiencia Flutter Web con rankings, históricos y perfiles de tecnología.',
        },
        {
          id: 'ridefare',
          title: 'RideFare ETL Pipeline',
          description:
            'Proyecto de pricing convertido en un flujo reproducible que va desde datos crudos hasta artefactos analíticos y una experiencia pública en Next.js.',
          tags: ['Python', 'DuckDB', 'dbt', 'Next.js', 'GitHub Actions'],
          repoUrl: 'https://github.com/Sam-24-dev/RideFare-ETL-Pipeline',
          demoUrl: 'https://ride-fare-etl-pipeline-web.vercel.app/',
          challenge: 'Pasar de un flujo heredado en notebooks a un producto con pasos claros y una entrega que otros puedan seguir.',
          dataFlow: 'Los datos pasan por ingest, transform, train y export-web antes de llegar a la interfaz.',
          qualityDiscipline:
            'DuckDB, dbt, los contratos tipados y los checks automáticos reducen estado oculto y hacen el flujo más confiable.',
          publicOutput:
            'El proyecto entrega JSON versionado, artefactos del modelo y un sitio público en Next.js que sigue siendo revisable después del deploy.',
        },
      ],
    },
    bridgeProjects: {
      eyebrow: 'Capa técnica adicional',
      title: 'Proyectos puente',
      subtitle:
        'Dos proyectos híbridos donde el valor no estuvo solo en el dashboard, sino también en cómo se prepararon, validaron y publicaron los datos.',
      labels: {
        pipelineShape: 'Cómo se mueve la información',
        validationLayer: 'Cómo se asegura la calidad',
        outputLayer: 'Qué llega al producto',
        verifiedResult: 'Qué resultado dejó',
      },
      cards: [
        {
          id: 'rice-crop',
          title: 'Rice Crop Analytics Platform',
          description:
            'Proyecto operativo que convierte datos agrícolas y financieros en un dashboard con JSON listos para web y una meta clara de recuperación de rentabilidad.',
          tags: ['MySQL', 'Python ETL', 'JSON outputs', 'Chart.js'],
          pipelineShape:
            'Las entradas desde MySQL y CSV pasan por Python ETL hasta siete archivos JSON consumidos por el dashboard web.',
          validationLayer:
            'Los cálculos de KPI y los checkpoints del ETL ordenan la salida antes de que la consuma el navegador.',
          outputLayer:
            'Cinco vistas de dashboard y artefactos JSON listos para navegador mantienen visible la capa operativa.',
          verifiedResult: 'El ROI pasó de -5.58% a +15%, una recuperación de +20.6 puntos.',
          repoUrl: 'https://github.com/Sam-24-dev/Analisis-Cultivo-Arroz',
          demoUrl: 'https://sam-24-dev.github.io/Analisis-Cultivo-Arroz/',
        },
        {
          id: 'esports',
          title: 'eSports Analytics Dashboard LATAM',
          description:
            'Dashboard híbrido que une ETL, contratos de datos, pruebas y proyecciones ML dentro de una sola experiencia pública.',
          tags: ['MySQL', 'Python ETL', 'Chart.js', 'GitHub Actions'],
          pipelineShape:
            'Los datos en MySQL pasan por Python ETL hacia un puente JSON validado que alimenta el dashboard público.',
          validationLayer:
            'Los contratos de datos, los helpers de valor esperado y 126 pruebas automatizadas protegen la cadena de entrega.',
          outputLayer: 'GitHub Pages publica el dashboard junto con un módulo de proyecciones ML para 2026.',
          verifiedResult: 'Se publicaron 33 proyecciones ML respaldadas por 126 pruebas automatizadas.',
          repoUrl: 'https://github.com/Sam-24-dev/eSports-Analytics-Dashboard',
          demoUrl: 'https://sam-24-dev.github.io/eSports-Analytics-Dashboard/',
        },
      ],
    },
    stack: {
      title: 'Stack de ingeniería',
      subtitle:
        'Las herramientas detrás de esta ruta, desde lógica ETL reproducible hasta entrega pública y salidas explicables.',
      coreLabel: 'Stack principal',
      supportingLabel: 'Herramientas de apoyo',
    },
    strengths: {
      eyebrow: 'Cómo trabajo',
      title: 'Cómo convierto datos en productos confiables',
      subtitle:
        'Estos principios resumen cómo organizo un flujo de datos para que otra persona pueda entenderlo, revisarlo y volver a ejecutarlo.',
      items: [
        {
          icon: 'workflow',
          title: 'Flujos reproducibles',
          description: 'Prefiero procesos claros, con pasos visibles, antes que soluciones manuales difíciles de repetir.',
        },
        {
          icon: 'shield',
          title: 'Validación antes de publicar',
          description: 'La salida se revisa antes de llegar al dashboard o a cualquier artefacto público.',
        },
        {
          icon: 'automation',
          title: 'Automatización útil',
          description: 'Los checks y tareas automáticas ayudan a mantener estabilidad sin agregar complejidad innecesaria.',
        },
        {
          icon: 'delivery',
          title: 'Datos que llegan a producto',
          description: 'No me quedo en el análisis: preparo la salida para que termine en una experiencia pública y revisable.',
        },
        {
          icon: 'bridge',
          title: 'Puente entre análisis y sistema',
          description: 'Busco que la parte técnica sostenga el valor analítico, no que lo opaque.',
        },
      ],
    },
    caseStudyModal: {
      badge: 'Caso del proyecto',
      closeLabel: 'Cerrar caso del proyecto',
      tabsLabel: 'Vistas del caso del proyecto',
      overviewTab: 'Resumen',
      architectureTab: 'Arquitectura',
      deliveryTab: 'Entrega',
      summaryLabel: 'De qué trata',
      whyItMattersLabel: 'Qué demuestra',
      verifiedEvidenceLabel: 'Pruebas del proyecto',
      caseButtonLabel: 'Ver caso completo',
      repoButtonLabel: 'Abrir repositorio',
      demoButtonLabel: 'Ver demo',
    },
    contactSupportCopy:
      'Estoy abierto a roles y colaboraciones donde pueda construir pipelines confiables, automatizar entregas de datos y convertir análisis en productos públicos revisables.',
  },
};
