import { motion } from 'framer-motion';

// --- NUEVO: Array con nombre, icono y categoría ---
const skills = [
  { name: 'Python', icon: '/images/icons/python.svg', category: 'Programming' },
  { name: 'SQL', icon: '/images/icons/mysql.svg', category: 'Database' },
  { name: 'R', icon: '/images/icons/r.svg', category: 'Analytics' },
  { name: 'Power BI', icon: '/images/icons/powerbi.svg', category: 'BI Tool' },
  { name: 'React', icon: '/images/icons/react.svg', category: 'Frontend' },
  { name: 'TypeScript', icon: '/images/icons/typescript.svg', category: 'Programming' },
  { name: 'JavaScript', icon: '/images/icons/javascript.svg', category: 'Programming' },
  { name: 'Pandas', icon: '/images/icons/pandas.svg', category: 'Analytics' },
  { name: 'Tailwind CSS', icon: '/images/icons/tailwind.svg', category: 'Frontend' },
  { name: 'Git', icon: '/images/icons/git.svg', category: 'Tool' },
  { name: 'Vercel', icon: '/images/icons/vercel.svg', category: 'Deployment' },
  { name: 'Jupyter', icon: '/images/icons/jupyter.svg', category: 'Tool' },
];

const SkillsGrid = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="flex flex-col items-center justify-center text-center p-3 rounded-lg bg-primary-light/60 dark:bg-primary-light/60 light:bg-lightMode-surface/80 backdrop-blur-sm border dark:border-primary-lighter/50 light:border-lightMode-border aspect-square"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.08, y: -5, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}
          viewport={{ once: true }}
        >
          <img src={skill.icon} alt={skill.name} className="w-8 h-8 md:w-9 md:h-9 mb-2 object-contain" />
          <p className="text-sm font-semibold dark:text-text-primary light:text-lightMode-text-primary leading-tight">
            {skill.name}
          </p>
          {/* --- NUEVO: Etiqueta de categoría --- */}
          <p className="text-xs text-accent-cyan/80">
            {skill.category}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsGrid;