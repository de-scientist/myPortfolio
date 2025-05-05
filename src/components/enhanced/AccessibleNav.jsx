import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';

const AccessibleNav = ({ links }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (!section) return;
        
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <nav
      className="fixed top-0 z-20 w-full backdrop-blur bg-primary/80"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container px-6 py-4 mx-auto">
        <div className="flex justify-between items-center">
          <motion.button
            className="p-2 text-white transition-transform transform md:hidden active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-[64px] right-0 h-screen w-64 bg-primary/95 backdrop-blur-sm shadow-lg md:hidden"
              >
                <div
                  className="flex flex-col p-6 space-y-4"
                  id="mobile-menu"
                >
                  {links.map((link) => (
                    <motion.a
                      key={link.id}
                      href={`#${link.id}`}
                      className={`block py-3 px-4 text-white hover:text-[#915EFF] transition-all transform hover:bg-white/10 rounded-lg ${
                        activeSection === link.id ? 'text-[#915EFF] bg-white/5' : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(link.id)?.scrollIntoView({
                          behavior: 'smooth',
                        });
                        setIsMenuOpen(false);
                      }}
                      aria-current={activeSection === link.id ? 'page' : undefined}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map((link) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                className={`py-2 text-white hover:text-[#915EFF] transition-all ${
                  activeSection === link.id ? 'text-[#915EFF]' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.id)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
                aria-current={activeSection === link.id ? 'page' : undefined}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

AccessibleNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default AccessibleNav;