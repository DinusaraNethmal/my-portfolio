import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaHeart } from 'react-icons/fa';

const quickLinks = [
  { label: 'Home',     to: 'hero'     },
  { label: 'About',    to: 'about'    },
  { label: 'Skills',   to: 'skills'   },
  { label: 'Projects', to: 'projects' },
  { label: 'Journey',  to: 'timeline' },
  { label: 'Contact',  to: 'contact'  },
];

const socials = [
  { icon: FaGithub,    href: 'https://github.com/DinusaraNethmal',       label: 'GitHub'    },
  { icon: FaLinkedin,  href: 'https://linkedin.com/in/dinusara-nethmal', label: 'LinkedIn'  },
  { icon: FaFacebook,  href: 'https://www.facebook.com/dinusara.nethmal/',  label: 'Facebook'  },
  { icon: FaInstagram, href: 'https://www.instagram.com/dinusar.netha/',label: 'Instagram' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-950
                       border-t border-gray-200 dark:border-white/5
                       pt-14 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-black border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
                <span
                  className="font-serif text-gray-900 dark:text-white text-lg font-bold select-none"
                  style={{ lineHeight: 1 }}
                >
                  D
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                Dinusara<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed max-w-xs">
              Undergraduate | AI & Data Science Enthusiast | Full Stack Developer.
              Building the future, one project at a time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-sm">Quick Links</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {quickLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  smooth
                  duration={500}
                  offset={-70}
                  className="text-gray-500 dark:text-gray-500
                             hover:text-blue-600 dark:hover:text-blue-400
                             text-sm transition-colors cursor-pointer"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-sm">Connect</h3>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="p-2.5 bg-gray-200 dark:bg-white/5
                             hover:bg-blue-100 dark:hover:bg-blue-500/15
                             border border-gray-300 dark:border-white/10
                             hover:border-blue-300 dark:hover:border-blue-500/30
                             text-gray-500 dark:text-gray-400
                             hover:text-blue-600 dark:hover:text-blue-400
                             rounded-xl transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Open to internship opportunities in AI, ML, and Full Stack.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="glow-line mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3
                        text-xs text-gray-500 dark:text-gray-600">
          <p>© {year} Dinusara Nethmal. All rights reserved.</p>
          <p className="flex items-center gap-1.5"></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
