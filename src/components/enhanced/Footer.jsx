import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaRocket, FaChevronRight } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#' },
    { name: 'Media Services', href: '#media-services' },
  ];

  return (
    <motion.footer
      variants={fadeIn("up", "spring", 0.1, 1)}
      className="overflow-hidden relative px-4 py-16 mt-20 w-full bg-tertiary"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent pointer-events-none to-black/20" />
      
      <div className="grid relative z-10 grid-cols-1 gap-12 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4">
        {/* Company Info */}
        <div className="space-y-6">
          <img src="/logo.svg" alt="TechVision Logo" className="w-auto h-12" />
          <p className="text-[16px] leading-[26px] text-white/90">
          Our goal is to create a one-stop-shop
          where businesses, individuals, and institutions can access top-tier
          digital solutions while fostering a tech-driven community.
          We are more than just a service provider we are problem solvers committed to bridging digital gaps.
          </p>
          <p className="flex gap-2 items-center text-sm text-secondary">
          Your One-Stop Digital Hub Where We Innovate, Create, and Educate as
          We Empower the Digital Future. <FaRocket className="animate-bounce" />
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="flex gap-2 items-center transition-colors duration-300 text-white/80 hover:text-secondary group"
                >
                  <FaChevronRight className="transition-transform duration-300 text-secondary group-hover:translate-x-1" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <div className="space-y-4">
            <p className="flex gap-3 items-center transition-colors duration-300 cursor-pointer text-white/80 hover:text-secondary">
              <FaMapMarkerAlt className="text-secondary" /> 123 Westlands, Nairobi, Kenya
            </p>
            <p className="flex gap-3 items-center transition-colors duration-300 cursor-pointer text-white/80 hover:text-secondary">
              <FaPhone className="text-secondary" /> +254 729 934 671
            </p>
            <p className="flex gap-3 items-center transition-colors duration-300 cursor-pointer text-white/80 hover:text-secondary">
              <FaEnvelope className="text-secondary" /> info@techvision.com
            </p>
            <p className="flex gap-3 items-center transition-colors duration-300 cursor-pointer text-white/80 hover:text-secondary">
              <FaGlobe className="text-secondary" /> www.techvision.com
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Connect With Us</h3>
          <p className="text-white/80">Follow us on social media for updates and insights.</p>
          <div className="flex gap-4">
            {[
              { icon: FaFacebookF, href: 'https://facebook.com/TechVision' },
              { icon: FaInstagram, href: 'https://instagram.com/TechVision' },
              { icon: FaLinkedinIn, href: 'https://linkedin.com/company/TechVision' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg transition-all duration-300 transform bg-white/10 hover:bg-secondary hover:text-white text-secondary hover:-translate-y-1"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-8 mt-16 text-center border-t border-white/10 text-white/60">
        <p>&copy; {new Date().getFullYear()} TechVision Studios & Solutions. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;