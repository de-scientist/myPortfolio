import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll position for active section
  useEffect(() => {
    const handleActiveSection = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (!section) return;
        
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActive(navLinks[index].title);
        }
      });
    };

    window.addEventListener('scroll', handleActiveSection);
    return () => window.removeEventListener('scroll', handleActiveSection);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='flex justify-between items-center mx-auto w-full max-w-7xl'>
        <Link
          to='/'
          className='flex gap-2 items-center'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='object-contain w-24 h-24' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            &nbsp;
            <span className='hidden sm:block'> | TechVision S&S</span>
          </p>
        </Link>

        <ul className='hidden flex-row gap-10 list-none sm:flex'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`} onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(nav.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  setActive(nav.title);
                }
              }}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className='flex flex-1 justify-end items-center sm:hidden'>
          <button
            className='p-2 rounded-md transition-colors hover:bg-white/10'
            onClick={() => setToggle(!toggle)}
            aria-expanded={toggle}
            aria-label='Toggle menu'
          >
            <img
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain'
            />
          </button>

          {/* Mobile Menu Backdrop */}
          {toggle && (
            <div
              className="fixed inset-0 z-10 backdrop-blur-sm bg-black/50"
              onClick={() => setToggle(false)}
              aria-hidden="true"
            />
          )}
          
          {/* Mobile Menu */}
          <div
            className={`${
              !toggle ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
            } fixed top-0 right-0 p-6 w-[min(75vw,300px)] h-screen transition-all duration-300 ease-in-out bg-primary/95 backdrop-blur-md shadow-xl z-20`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end mb-8">
                <button
                  className="p-2 rounded-md transition-colors hover:bg-white/10"
                  onClick={() => setToggle(false)}
                  aria-label="Close menu"
                >
                  <img
                    src={close}
                    alt="close menu"
                    className="w-[20px] h-[20px] object-contain"
                  />
                </button>
              </div>
              
              <ul className='flex flex-col gap-6 items-start list-none'>
                {navLinks.filter(nav => nav.id !== 'footer').map((nav) => (
                  <li
                    key={nav.id}
                    className="w-full"
                  >
                    <a 
                      href={`#${nav.id}`}
                      className={`block px-4 py-3 w-full rounded-lg transition-all ${
                        active === nav.title 
                          ? "text-white bg-white/10" 
                          : "text-secondary hover:text-white hover:bg-white/5"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(nav.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                          setActive(nav.title);
                          setToggle(false);
                        }
                      }}
                    >
                      {nav.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
