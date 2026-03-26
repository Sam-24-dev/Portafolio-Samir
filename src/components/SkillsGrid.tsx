import { motion } from 'framer-motion';

const skills = [
  { name: 'Python', icon: '/images/icons/python.svg' },
  { name: 'SQL', icon: '/images/icons/mysql.svg' },
  { name: 'Power BI', icon: '/images/icons/powerbi.svg' },
  { name: 'R', icon: '/images/icons/r.svg' },
  { name: 'Pandas', icon: '/images/icons/pandas.svg' },
  { name: 'Jupyter', icon: '/images/icons/jupyter.svg' },
  { name: 'Git', icon: '/images/icons/git.svg' },
  { name: 'TypeScript', icon: '/images/icons/typescript.svg' },
];

const SkillsGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="flex aspect-square flex-col items-center justify-center rounded-2xl border p-4 text-center backdrop-blur-sm dark:border-primary-lighter/50 dark:bg-primary-light/60 light:border-lightMode-border light:bg-lightMode-surface/80"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.08, y: -5, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}
          viewport={{ once: true }}
        >
          <img src={skill.icon} alt={skill.name} className="mb-3 h-8 w-8 object-contain md:h-9 md:w-9" />
          <p className="text-sm font-semibold leading-tight dark:text-text-primary light:text-lightMode-text-primary">
            {skill.name}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsGrid;
