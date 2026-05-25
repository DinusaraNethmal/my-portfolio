import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiCheckCircle, HiClock } from 'react-icons/hi';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group glass rounded-2xl overflow-hidden
                 hover:shadow-glow cursor-pointer
                 transition-all duration-300 flex flex-col"
    >
      {/* Project image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="block w-full h-full"
          aria-label={`View ${project.title} on GitHub`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.parentElement.style.background =
                'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #1d4ed8 100%)';
            }}
          />
        </a>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
            aria-label="GitHub repo"
          >
            <FaGithub size={14} />
          </a>
        </div>

        <div className="absolute bottom-3 left-3 pointer-events-none">
          {project.status === 'completed' ? (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-green-500/20 border border-green-500/30
                             text-green-400 rounded-full text-xs font-medium">
              <HiCheckCircle size={11} /> Completed
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-orange-500/20 border border-orange-500/30
                             text-orange-400 rounded-full text-xs font-medium">
              <HiClock size={11} /> Ongoing
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-gray-900 dark:text-white font-bold mb-2
                       group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map(t => (
            <span
              key={t}
              className="px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10
                         border border-blue-200 dark:border-blue-500/15
                         text-blue-700 dark:text-blue-400 rounded-full text-xs"
            >
              {t}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700/50
                             text-gray-500 dark:text-gray-500 rounded-full text-xs">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Bottom links */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400
                       hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaGithub size={14} /> GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400
                         hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaExternalLinkAlt size={12} /> Live
            </a>
          )}
          <span className="ml-auto text-xs text-gray-400 dark:text-gray-600">Click for details →</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
