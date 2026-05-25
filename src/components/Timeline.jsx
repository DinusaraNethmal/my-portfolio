import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCode, FaCertificate, FaRocket, FaUniversity } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { timeline } from '../data/timeline';

const iconMap = {
  graduation:   FaGraduationCap,
  university:   FaUniversity,
  code:         FaCode,
  ai:           HiAcademicCap,
  certificate:  FaCertificate,
  target:       FaRocket,
};

const colorMap = {
  education:    'border-blue-500/40   bg-blue-500/10   text-blue-500',
  project:      'border-violet-500/40 bg-violet-500/10 text-violet-500',
  certification:'border-orange-500/40 bg-orange-500/10 text-orange-500',
  goal:         'border-cyan-500/40   bg-cyan-500/10   text-cyan-500',
};

const Timeline = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      id="timeline"
      className="section-padding bg-gray-50 dark:bg-gray-900/50 relative transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-grid opacity-60 dark:opacity-20 pointer-events-none" />

      <div className="container-custom max-w-4xl" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-500 text-sm font-mono tracking-widest uppercase">My story so far</span>
          <h2 className="section-heading text-gray-900 dark:text-white mt-2">
            My <span className="text-gradient">Journey</span>
          </h2>
          <div className="glow-line w-24 mx-auto mt-3" />
        </motion.div>

        {/* Timeline items */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px
                          bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent
                          hidden md:block" />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const Icon = iconMap[item.icon] || FaCode;
              const isLeft = i % 2 === 0;
              const [borderClass, bgClass, textClass] = colorMap[item.type]?.split(' ') || colorMap.education.split(' ');

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-4
                    ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className={`glass rounded-2xl p-5 border ${borderClass}
                                  hover:-translate-y-1 transition-all duration-300 inline-block w-full`}
                    >
                      <div className={`flex items-center gap-2 mb-2
                        ${isLeft ? 'md:flex-row-reverse' : 'flex-row'}`}
                      >
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${borderClass} ${bgClass} ${textClass}`}>
                          {item.year}
                        </span>
                        <span className="text-gray-400 dark:text-gray-600 text-xs">{item.subtitle}</span>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex flex-col items-center flex-shrink-0">
                    <div className={`w-10 h-10 rounded-xl border-2 ${borderClass} ${bgClass}
                                    flex items-center justify-center z-10`}
                    >
                      <Icon className={textClass} size={16} />
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
