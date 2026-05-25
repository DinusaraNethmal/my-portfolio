import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaBrain, FaCode, FaRocket } from 'react-icons/fa';
import { HiLocationMarker, HiCalendar } from 'react-icons/hi';
import { education } from '../data/education';

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const stats = [
  { icon: FaCode,   value: '3+',   label: 'Projects Built'      },
  { icon: FaBrain,  value: '15+',  label: 'Technologies Learned' },
  { icon: FaRocket, value: '2025', label: 'Internship Goal'      },
];

const interests = [
  { label: 'Artificial Intelligence' },
  { label: 'Machine Learning'        },
  { label: 'Data Science'            },
  { label: 'Web Development'         },
  { label: 'LangChain & RAG'         },
  { label: 'Cloud Tech'              },
];

/* Helper: get initials from institution name */
const getInitials = (name) =>
  name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || name.slice(0, 2).toUpperCase();

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="about"
      className="section-padding bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom" ref={ref}>

        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-blue-500 text-sm font-mono tracking-widest uppercase">Get to know me</span>
          <h2 className="section-heading text-gray-900 dark:text-white mt-2">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="glow-line w-24 mx-auto mt-3" />
        </motion.div>

        {/* Top: intro + stats */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-start">

          {/* Left – bio */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-5"
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Hi! I'm <span className="text-gray-900 dark:text-white font-semibold">Dinusara Nethmal</span>, an undergraduate student
              passionate about the intersection of{' '}
              <span className="text-blue-600 dark:text-blue-400 font-medium">Artificial Intelligence</span>,{' '}
              <span className="text-blue-600 dark:text-blue-400 font-medium">Data Science</span>, and{' '}
              <span className="text-blue-600 dark:text-blue-400 font-medium">Full Stack Web Development</span>.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I love turning complex ideas into real-world applications — from building RAG-powered chatbots
              with LangChain to crafting full-stack web platforms with React and Node.js. I'm always
              exploring new technologies and pushing my limits.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              My goal is to land a meaningful role in{' '}
              <strong className="text-gray-900 dark:text-white">AI Engineering</strong> or{' '}
              <strong className="text-gray-900 dark:text-white">Full Stack Development</strong>, where I can
              contribute, learn, and grow alongside an innovative team.
            </p>

            {/* Interests */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map(({ label }) => (
                  <span
                    key={label}
                    className="px-3 py-1.5
                               bg-blue-50 dark:bg-blue-500/10
                               border border-blue-200 dark:border-blue-500/20
                               text-blue-700 dark:text-blue-300
                               rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right – stats */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="glass rounded-2xl p-5 text-center
                             hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="text-blue-500 text-2xl mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Quick info */}
            <div className="glass rounded-2xl p-6 space-y-3">
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-blue-500" /> Quick Info
              </h3>
              {[
                { label: 'Location',  value: 'Sri Lanka/ Dankotuwa'                },
                { label: 'Status',    value: 'Undergraduate Student At SLIIT'    },
                { label: 'Focus',     value: 'AI + ML + Full Stack Dev'      },
                { label: 'Available', value: 'For Wrok 2025/2026'},
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between text-sm
                             border-b border-gray-200 dark:border-white/5 pb-2"
                >
                  <span className="text-gray-500">{label}</span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education section */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            <FaGraduationCap className="inline text-blue-500 mr-2 mb-1" />
            Education
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                variants={fadeUp(0.1 * i)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="glass rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Banner image */}
                <div className="relative w-full h-52 overflow-hidden rounded-t-2xl">
                  <img
                    src={edu.image}
                    alt={edu.institution}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback with text initials */}
                  <div
                    className="hidden absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800
                               flex items-center justify-center rounded-t-2xl"
                  >
                    <span className="text-3xl font-bold text-white/80 tracking-wide">
                      {getInitials(edu.institution)}
                    </span>
                  </div>
                  {/* Bottom gradient overlay for premium look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/45 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Text content */}
                <div className="p-6">
                  <h4 className="text-gray-900 dark:text-white font-semibold text-sm
                                 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {edu.institution}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-1">{edu.degree}</p>

                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><HiCalendar /> {edu.period}</span>
                    <span className="flex items-center gap-1"><HiLocationMarker /> {edu.location}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-3 leading-relaxed">
                    {edu.description}
                  </p>

                  {edu.achievements?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {edu.achievements.map((a) => (
                        <span
                          key={a}
                          className="px-2 py-0.5
                                     bg-gray-100 dark:bg-gray-800
                                     border border-gray-200 dark:border-gray-700
                                     text-gray-600 dark:text-gray-300
                                     rounded-full text-xs"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
