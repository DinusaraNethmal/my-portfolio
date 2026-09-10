import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
        className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]"
      >
        {/* Serif D mark */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mb-10 flex items-center justify-center"
        >
          {/* Subtle circular pulse behind letter */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-28 h-28 rounded-full bg-blue-500"
          />

          {/* The elegant serif D */}
          <span
            className="relative select-none text-gray-900"
            style={{
              fontFamily: '"Playfair Display", "Didot", "Bodoni MT", "Times New Roman", serif',
              fontSize: '108px',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              userSelect: 'none',
            }}
          >
            D
          </span>
        </motion.div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
          className="text-gray-800 text-sm font-medium tracking-[0.25em] uppercase mb-8"
          style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
        >
          Dinusara Nethmal
        </motion.p>

        {/* Thin progress line */}
        <div className="w-40 h-px bg-gray-200 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            style={{ transformOrigin: 'left center' }}
            className="h-full bg-gray-900"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
