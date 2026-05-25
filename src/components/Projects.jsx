import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects, projectCategories } from '../data/projects';

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const PROJECTS_PER_PAGE = 3;

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const nextProjectImage = currentPage < totalPages ? filtered[startIndex + PROJECTS_PER_PAGE]?.image : null;
  const prevProjectImage = currentPage > 1 ? filtered[startIndex - PROJECTS_PER_PAGE]?.image : null;

  return (
    <section
      id="projects"
      className="section-padding bg-white dark:bg-gray-950 relative transition-colors duration-300"
      ref={ref}
    >
      <div className="absolute inset-0 bg-grid opacity-60 dark:opacity-20 pointer-events-none" />

      <div className="container-custom">

        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <span className="text-blue-500 text-sm font-mono tracking-widest uppercase">Things I've built</span>
          <h2 className="section-heading text-gray-900 dark:text-white mt-2">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
            Click any card to see full details. Click the image to visit the GitHub repo directly.
          </p>
          <div className="glow-line w-24 mx-auto mt-3" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {projectCategories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {paginatedProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 dark:text-gray-600">
            No projects in this category yet. Check back soon!
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex items-center justify-center gap-6 mt-8"
          >
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`group relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300
                ${currentPage === 1 
                  ? 'border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-700 cursor-not-allowed' 
                  : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer bg-white dark:bg-gray-900 hover:shadow-lg'}`}
            >
              <HiChevronLeft size={24} />
              {prevProjectImage && currentPage !== 1 && (
                <div className="absolute -left-14 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-10 h-10 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
                   <img src={prevProjectImage} alt="Previous project" className="w-full h-full object-cover" />
                </div>
              )}
            </button>
            
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`group relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300
                ${currentPage === totalPages 
                  ? 'border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-700 cursor-not-allowed' 
                  : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer bg-white dark:bg-gray-900 hover:shadow-lg'}`}
            >
              <HiChevronRight size={24} />
              {nextProjectImage && currentPage !== totalPages && (
                <div className="absolute -right-14 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-10 h-10 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
                   <img src={nextProjectImage} alt="Next project" className="w-full h-full object-cover" />
                </div>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;
