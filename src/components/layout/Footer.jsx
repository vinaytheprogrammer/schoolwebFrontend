import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80">
      <div className="container mx-auto px-4 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* School Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/logo.png"
                alt="CIAT Convent Logo"
                className="w-12 h-12 rounded-lg bg-white p-0.5 shadow-md group-hover:scale-105 transition-transform duration-200 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-wider flex items-center gap-1.5">
                  CIAT CONVENT
                </span>
                <span className="text-xs text-amber-400 font-semibold tracking-wide">
                  Sr. Sec. School • CBSE Affiliated
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Committed to academic distinction, holistic character formation, and shaping innovative future leaders since 1998.
            </p>

            {/* Social Links */}
            <div className="flex space-x-2 pt-2">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 flex items-center justify-center transition-all duration-200"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-sky-500 hover:border-sky-400 flex items-center justify-center transition-all duration-200"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-pink-600 hover:border-pink-500 flex items-center justify-center transition-all duration-200"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-red-600 hover:border-red-500 flex items-center justify-center transition-all duration-200"
              >
                <FiYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-800/80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-500">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Vision & Mission', path: '/vision-mission' },
                { label: "Principal's Message", path: '/principal-message' },
                { label: 'Admissions 2026-27', path: '/admissions' },
                { label: 'Notice Board & News', path: '/news' },
                { label: 'Photo & Media Gallery', path: '/gallery' },
                { label: 'Contact Information', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-amber-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-amber-500/50 group-hover:text-amber-400 transition-colors text-xs">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-800/80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-500">
              Get In Touch
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <FiMapPin size={15} />
                </div>
                <span>Kanjhawala, North West Delhi, 110081</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                  <FiPhone size={15} />
                </div>
                <a href="tel:+918595792883" className="hover:text-amber-400 transition-colors">
                  +91 85957 92883
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                  <FiMail size={15} />
                </div>
                <a href="mailto:Ciatschool1998@gmail.com" className="hover:text-amber-400 transition-colors truncate">
                  Ciatschool1998@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Admissions / Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-800/80 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-500">
              Admissions Open
            </h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Applications for Academic Year 2026-27 are now open from Pre-Primary to Class XII.
            </p>
            <Link
              to="/admissions"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-200"
            >
              <span>Apply Online Now</span>
              <FiArrowRight size={14} />
            </Link>
            <div className="mt-4 pt-3 border-t border-slate-900 text-xs text-slate-500">
              Affiliated with the Central Board of Secondary Education (CBSE), New Delhi.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <p>© {currentYear} CIAT Convent Sr. Sec. School. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-slate-400 transition">About</Link>
            <span>•</span>
            <Link to="/admissions" className="hover:text-slate-400 transition">Admissions</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-400 transition">Contact</Link>
            <span>•</span>
            <Link to="/login" className="text-amber-500 hover:text-amber-400 transition">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
