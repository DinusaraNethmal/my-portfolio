import { HiSun, HiMoon } from 'react-icons/hi';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      className="relative p-2 rounded-full border
                 border-gray-300 dark:border-white/10
                 bg-gray-100 dark:bg-white/5
                 text-gray-600 dark:text-gray-300
                 hover:text-yellow-500 dark:hover:text-yellow-400
                 hover:border-yellow-400/50
                 transition-all duration-300"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
