import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaDownload } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden
                 bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-100" />

      {/* Minimal gradient accents (light mode only to keep dark mode pure OLED black) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-400/8 rounded-full blur-[140px] animate-blob" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-slate-300/10 rounded-full blur-[120px] animate-blob animate-delay-2000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Main content — side by side */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — Text content */}
          <div className="flex-1 text-center lg:text-left">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                         bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8
                         text-gray-600 dark:text-gray-400 text-sm mb-8"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Open to Work  
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4 leading-tight tracking-tight"
            >
              <span className="text-gray-900 dark:text-white">Dinusara </span>
              <span className="text-blue-600 dark:text-blue-400">
                Nethmal
              </span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-6 font-mono min-h-[2rem]"
            >
              <TypeAnimation
                sequence={[
                  'Undergraduate Student At SLIIT', 2500,
                  'AI & Data Science Enthusiast', 2500,
                  'Full Stack Developer', 2500,
                  'AI & Machine Learning Engineer in Progress', 2500,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Passionate about building{' '}
              <span className="text-gray-800 dark:text-gray-200 font-medium">intelligent systems</span> and{' '}
              <span className="text-gray-800 dark:text-gray-200 font-medium">scalable web apps</span>.
              Exploring AI, Machine Learning, and modern web technologies — one project at a time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
            >
              <Link to="projects" smooth duration={600} offset={-70}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group px-6 py-3 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100
                             text-white dark:text-gray-900 rounded-full
                             font-semibold text-sm transition-all duration-300 flex items-center gap-2"
                >
                  View Projects
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="contact" smooth duration={600} offset={-70}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700
                             text-gray-700 dark:text-gray-300
                             hover:border-gray-400 dark:hover:border-gray-500
                             rounded-full font-semibold text-sm transition-all duration-300"
                >
                  Contact Me
                </motion.button>
              </Link>

              <motion.a
                href="/cv/Profile.pdf"
                download="Dinusara_Nethmal_CV.pdf"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group px-6 py-3 border border-gray-300 dark:border-gray-700
                           hover:border-gray-400 dark:hover:border-gray-500
                           text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
                           rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2"
              >
                <FaDownload size={12} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex gap-3 justify-center lg:justify-start"
            >
              {[
                { icon: FaGithub,    href: 'https://github.com/DinusaraNethmal',       label: 'GitHub'    },
                { icon: FaLinkedin,  href: 'https://linkedin.com/in/dinusara-nethmal', label: 'LinkedIn'  },
                { icon: FaFacebook,  href: 'https://www.facebook.com/dinusara.nethmal/',  label: 'Facebook'  },
                { icon: FaInstagram, href: 'https://www.instagram.com/dinusar.netha/',label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2.5 text-gray-400 dark:text-gray-500
                             hover:text-gray-700 dark:hover:text-gray-300
                             border border-gray-200 dark:border-gray-800
                             hover:border-gray-300 dark:hover:border-gray-600
                             rounded-lg transition-all duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Subtle glow behind image */}
              <div className="absolute -inset-4 bg-blue-500/6 dark:bg-blue-500/4 rounded-full blur-2xl" />

              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden
                              border-2 border-gray-200 dark:border-gray-800
                              shadow-lg">
                <img
                  src="/images/profile.jpg"
                  alt="Dinusara Nethmal"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background =
                      'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #1d4ed8 100%)';
                    e.target.parentElement.innerHTML =
                      '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;color:white;font-weight:800;">DN</div>';
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-400 dark:text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-gray-300 dark:border-gray-700 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
