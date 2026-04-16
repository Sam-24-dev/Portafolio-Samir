export type TechIconProfile = 'analyst' | 'engineering';

export interface TechIconItem {
  name: string;
  profile: TechIconProfile;
  source: string;
  iconClassName?: string;
}

const analystIcon = (name: string, fileName: string, iconClassName?: string): TechIconItem => ({
  name,
  profile: 'analyst',
  source: `/images/icons/analyst/${fileName}`,
  iconClassName,
});

const engineeringIcon = (name: string, fileName: string, iconClassName?: string): TechIconItem => ({
  name,
  profile: 'engineering',
  source: `/images/icons/engineering/${fileName}`,
  iconClassName,
});

export const analystOrbitIcons: TechIconItem[] = [
  analystIcon('Python', 'python.svg'),
  analystIcon('SQL', 'sql.svg'),
  analystIcon('Power BI', 'powerbi.svg'),
  analystIcon('R', 'r.svg'),
  analystIcon('Jupyter', 'jupyter.svg'),
  analystIcon('Pandas', 'pandas.svg'),
  analystIcon('Git', 'git.svg'),
  analystIcon('TypeScript', 'typescript.svg'),
];

export const engineeringOrbitIcons: TechIconItem[] = [
  engineeringIcon('Python', 'python.svg'),
  engineeringIcon('SQL', 'sql.svg'),
  engineeringIcon('DuckDB', 'duckdb.svg'),
  engineeringIcon('dbt', 'dbt.svg'),
  engineeringIcon('Pandera', 'pandera.png'),
  engineeringIcon('GitHub Actions', 'github-actions.svg'),
  engineeringIcon('Next.js', 'nextjs.svg'),
  engineeringIcon('Flutter', 'flutter.svg'),
];

export const engineeringCoreStack: TechIconItem[] = [
  engineeringIcon('Python', 'python.svg'),
  engineeringIcon('SQL', 'sql.svg'),
  engineeringIcon('DuckDB', 'duckdb.svg'),
  engineeringIcon('dbt', 'dbt.svg'),
  engineeringIcon('Pandera', 'pandera.png'),
  engineeringIcon('GitHub Actions', 'github-actions.svg'),
  engineeringIcon('Next.js', 'nextjs.svg'),
  engineeringIcon('Flutter', 'flutter.svg'),
];

export const engineeringSupportingStack: TechIconItem[] = [
  engineeringIcon('Polars', 'polars.svg', 'scale-[1.4]'),
  engineeringIcon('Parquet', 'parquet.svg', 'scale-[1.35]'),
  engineeringIcon('TypeScript', 'typescript.svg'),
  engineeringIcon('Vercel', 'vercel.svg'),
  engineeringIcon('scikit-learn', 'scikit-learn.svg'),
  engineeringIcon('XGBoost', 'xgboost.svg'),
  engineeringIcon('Framer Motion', 'framer-motion.svg', 'scale-[1.15]'),
];
