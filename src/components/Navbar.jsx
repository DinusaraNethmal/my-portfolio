import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Home',     to: 'hero'     },
  { label: 'About',    to: 'about'    },
  { label: 'Skills',   to: 'skills'   },
  { label: 'Projects', to: 'projects' },
  { label: 'Journey',  to: 'timeline' },
  { label: 'Contact',  to: 'contact'  },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive]     = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-sm dark:shadow-lg'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="hero" smooth duration={500} className="cursor-pointer">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden bg-white/10 dark:bg-black/10 border border-gray-200 dark:border-gray-800">
                  <img src="/images/d.png" alt="logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white hidden sm:block">
                  Dinusara<span className="text-blue-500">.</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  spy
                  smooth
                  duration={500}
                  offset={-70}
                  onSetActive={() => setActive(to)}
                  className="cursor-pointer"
                >
                  <motion.span
                    whileHover={{ y: -1 }}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 block
                      ${active === to
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                  >
                    {label}
                    {active === to && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-full -z-10"
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
                className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400
                           hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition"
              >
                {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-950
                            border-l border-gray-200 dark:border-white/10 flex flex-col pt-20 px-6 gap-2">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  smooth
                  duration={500}
                  offset={-70}
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer"
                >
                  <div className={`px-4 py-3 rounded-xl font-medium transition-all
                    ${active === to
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
