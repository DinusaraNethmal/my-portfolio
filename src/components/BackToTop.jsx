import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full
                     flex items-center justify-center
                     bg-white/70 dark:bg-black/50 backdrop-blur-xl
                     border border-gray-200/80 dark:border-white/10
                     text-gray-700 dark:text-gray-300
                     hover:text-blue-600 dark:hover:text-blue-400
                     hover:border-blue-500/40 dark:hover:border-blue-500/40
                     hover:bg-white dark:hover:bg-white/10
                     shadow-lg hover:shadow-glow
                     transition-all duration-300 group cursor-pointer"
        >
          <HiArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
