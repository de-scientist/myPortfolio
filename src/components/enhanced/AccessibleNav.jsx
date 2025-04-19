import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
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
          <button
            className="p-2 text-white transition-transform transform md:hidden active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
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

          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } md:flex md:items-center md:space-x-8`}
            id="mobile-menu"
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`block py-2 text-white hover:text-[#915EFF] transition-all transform hover:scale-105 active:scale-95 ${
                  activeSection === link.id ? 'text-[#915EFF]' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.id)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                  setIsMenuOpen(false);
                }}
                aria-current={activeSection === link.id ? 'page' : undefined}
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