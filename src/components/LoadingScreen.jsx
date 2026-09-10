import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white dark:bg-gray-950 flex flex-col items-center justify-center z-[9999] transition-colors duration-300"
      >
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-glow p-2">
            <img src="/images/d.png" alt="logo" className="w-full h-full object-contain" />
          </div>
          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 border-2 border-transparent border-t-blue-500 rounded-2xl"
          />
        </motion.div>

        {/* Progress bar */}
        <motion.div className="w-48 h-0.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
          />
        </motion.div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-gray-500 dark:text-gray-400 text-sm tracking-widest uppercase font-mono"
        >
          Loading Portfolio...
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
