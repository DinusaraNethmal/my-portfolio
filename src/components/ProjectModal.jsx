import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { HiCheckCircle, HiClock } from 'react-icons/hi';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4
                   bg-black/60 dark:bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-2xl bg-white dark:bg-gray-900
                     border border-gray-200 dark:border-white/10
                     rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        >
          {/* Image */}
          <div className="relative h-52 flex-shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.background = 'linear-gradient(135deg,#1e3a8a,#2563eb)';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70
                         text-white rounded-full transition-colors"
            >
              <FaTimes size={14} />
            </button>

            <div className="absolute bottom-4 left-4">
              {project.status === 'completed' ? (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 border border-green-500/30
                                 text-green-400 rounded-full text-xs font-medium">
                  <HiCheckCircle /> Completed
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 border border-orange-500/30
                                 text-orange-400 rounded-full text-xs font-medium">
                  <HiClock /> Ongoing
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{project.description}</p>

            {/* Tech stack */}
            <div className="mb-5">
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10
                               border border-blue-200 dark:border-blue-500/20
                               text-blue-700 dark:text-blue-300 rounded-full text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            {project.features?.length > 0 && (
              <div className="mb-6">
                <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-2">Key Features</h4>
                <ul className="space-y-1.5">
                  {project.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <HiCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                           bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm
                           font-medium transition-colors"
              >
                <FaGithub /> View on GitHub
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                             border border-gray-200 dark:border-white/10
                             hover:border-gray-300 dark:hover:border-white/20
                             text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
                             rounded-xl text-sm font-medium transition-colors"
                >
                  <FaExternalLinkAlt size={12} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
