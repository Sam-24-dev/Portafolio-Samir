import { motion } from 'framer-motion';
import { Database, Code, BarChart3, PieChart, Globe, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t.skills.databases,
      icon: <Database size={32} />,
      skills: ["MySQL", "Query Optimization", "Database Design", "Data Modeling", "Performance Tuning"],
      color: "accent-cyan"
    },
    {
      title: t.skills.programming,
      icon: <Code size={32} />,
      skills: ["Python", "R", "JavaScript", "TypeScript", "SQL"],
      color: "accent-blue"
    },
    {
      title: t.skills.analytics,
      icon: <BarChart3 size={32} />,
      skills: ["Pandas", "Plotly", "Statistical Analysis", "Data Visualization", "Hypothesis Testing"],
      color: "accent-cyan"
    },
    {
      title: t.skills.bi,
      icon: <PieChart size={32} />,
      skills: ["Power BI", "DAX", "Excel Advanced", "Dashboard Design", "KPI Development"],
      color: "accent-blue"
    },
    {
      title: t.skills.web,
      icon: <Globe size={32} />,
      skills: ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Chart.js", "React"],
      color: "accent-cyan"
    },
    {
      title: t.skills.tools,
      icon: <Wrench size={32} />,
      skills: ["Git", "GitHub", "Jupyter Notebook", "VS Code", "RStudio", "GitHub Pages"],
      color: "accent-blue"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" className="section-padding bg-primary-light">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
            {t.skills.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-primary-bg p-6 rounded-xl border border-primary-lighter hover:border-accent-cyan/50 transition-all"
            >
              <div className={`inline-block p-3 bg-${category.color}/10 rounded-lg mb-4`}>
                <div className={`text-${category.color}`}>
                  {category.icon}
                </div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-text-highlight mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className={`px-3 py-1.5 text-sm bg-${category.color}/10 text-${category.color} rounded-lg border border-${category.color}/20 transition-all hover:bg-${category.color}/20`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-primary-bg p-8 rounded-xl border border-primary-lighter">
            <h3 className="text-2xl font-poppins font-semibold gradient-text mb-6">
              {t.skills.keyStrengths}
            </h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start">
                <span className="text-accent-cyan mr-3 mt-1">▹</span>
                <span>{t.skills.strength1}</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-cyan mr-3 mt-1">▹</span>
                <span>{t.skills.strength2}</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-cyan mr-3 mt-1">▹</span>
                <span>{t.skills.strength3}</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-cyan mr-3 mt-1">▹</span>
                <span>{t.skills.strength4}</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-cyan mr-3 mt-1">▹</span>
                <span>{t.skills.strength5}</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary-bg p-8 rounded-xl border border-primary-lighter">
            <h3 className="text-2xl font-poppins font-semibold gradient-text mb-6">
              {t.skills.softSkills}
            </h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start">
                <span className="text-accent-blue mr-3 mt-1">▹</span>
                <span>{t.skills.soft1}</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-blue mr-3 mt-1">▹</span>
                <span>{t.skills.soft2}</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-blue mr-3 mt-1">▹</span>
                <span>{t.skills.soft3}</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-blue mr-3 mt-1">▹</span>
                <span>{t.skills.soft4}</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-blue mr-3 mt-1">▹</span>
                <span>{t.skills.soft5}</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;