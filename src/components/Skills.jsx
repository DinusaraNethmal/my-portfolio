import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiReact, SiTailwindcss, SiHtml5, SiCss, SiJavascript,
  SiNodedotjs, SiExpress, SiSpringboot, SiFastapi,
  SiPython, SiNumpy, SiPandas, SiGoogle,
  SiMongodb, SiMysql,
  SiGit, SiGithub, SiPostman,
} from 'react-icons/si';
import { skillCategories } from '../data/skills';

const iconMap = {
  SiReact, SiTailwindcss, SiHtml5,
  SiCss3: SiCss,
  SiJavascript,
  SiNodedotjs, SiExpress, SiSpringboot, SiFastapi,
  SiPython, SiNumpy, SiPandas, SiGoogle,
  SiLangchain: SiPython,
  SiMongodb, SiMysql,
  SiGit, SiGithub,
  SiVisualstudiocode: SiGit,
  SiPostman,
};

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const SkillBadge = ({ skill, index }) => {
  const Icon = iconMap[skill.icon] || SiReact;
  return (
    <motion.div
      variants={fadeUp(index * 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg
                 transition-all duration-200 cursor-default group"
    >
      <Icon
        size={14}
        style={{ color: skill.color }}
        className="flex-shrink-0 group-hover:scale-110 transition-transform"
      />
      <span className="text-gray-700 dark:text-gray-300 text-xs font-medium
                       group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="skills"
      className="section-padding bg-gray-50 dark:bg-gray-900/50 relative transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-grid opacity-60 dark:opacity-30 pointer-events-none" />

      <div className="container-custom" ref={ref}>

        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-10"
        >
          <span className="text-blue-500 text-sm font-mono tracking-widest uppercase">What I work with</span>
          <h2 className="section-heading text-gray-900 dark:text-white mt-2">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <div className="glow-line w-24 mx-auto mt-3" />
        </motion.div>

        {/* Categories — 2-column grid on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.id}
              variants={fadeUp(ci * 0.1)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`h-5 w-1 rounded-full bg-gradient-to-b ${category.color}`} />
                <h3 className="text-gray-900 dark:text-gray-300 font-semibold text-sm">{category.label}</h3>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, si) => (
                  <SkillBadge key={skill.name} skill={skill} index={si} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
