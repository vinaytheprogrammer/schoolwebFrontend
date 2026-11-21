import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut, FiPhone, FiMail, FiAward, FiArrowRight, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAdmin } = useContext(AuthContext);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close mobile menu and dropdown when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsAboutDropdownOpen(false);
  }, [location]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aboutDropdownItems = [
    { name: 'About Our School', path: '/about', desc: 'Our 25-year history, legacy & campus' },
    { name: 'Vision & Mission', path: '/vision-mission', desc: 'Core philosophy & institutional values' },
    { name: "Principal's Desk", path: '/principal-message', desc: 'Welcome address by the Principal' },
  ];

  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Notice Board', path: '/news' },
    { name: 'School Events', path: '/events' },
    { name: 'Photo Gallery', path: '/gallery' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isAboutActive = ['/about', '/vision-mission', '/principal-message'].includes(location.pathname);

  return (
    <>
      <header className="w-full fixed top-0 z-[1000] transition-all duration-200">
        {/* Top Info Ribbon */}
        <div className="bg-slate-900 text-slate-300 text-xs py-2 px-6 lg:px-12 border-b border-slate-800 hidden md:block">
          <div className="w-full max-w-[1600px] mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3 text-slate-300">
              <span className="flex items-center gap-1.5 font-medium text-white">
                <FiAward size={14} className="text-orange-400" />
                <span>CBSE Affiliated Senior Secondary School (Est. 1998)</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Affiliation No. 2130000</span>
            </div>

            <div className="flex items-center space-x-5 text-slate-300">
              <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-white transition">
                <FiPhone size={13} className="text-orange-400" />
                <span>+91 98765 43210</span>
              </a>
              <span className="text-slate-600">•</span>
              <a href="mailto:info@greenwoodschool.edu" className="flex items-center gap-1.5 hover:text-white transition">
                <FiMail size={13} className="text-orange-400" />
                <span>info@greenwoodschool.edu</span>
              </a>
              <span className="text-slate-600">•</span>
              <Link
                to="/admissions"
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-2.5 py-0.5 rounded text-[11px] transition shadow-xs"
              >
                Admissions 2026-27 Open
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`bg-white transition-all duration-200 border-b border-slate-200/80 ${
            isScrolled ? 'shadow-md py-3' : 'shadow-xs py-4'
          }`}
        >
          <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-between items-center gap-6">
            {/* School Brand / Crest */}
            <Link to="/" className="flex items-center space-x-3.5 shrink-0 group focus:outline-none">
              <img
                src="/logo.png"
                alt="Greenwood Convent School Crest"
                className="w-12 h-12 md:w-13 md:h-13 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
              />

              <div className="flex flex-col">
                <span className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  GREENWOOD CONVENT SCHOOL
                </span>
                <span className="text-xs text-orange-600 font-semibold tracking-wide">
                  Sr. Sec. • CBSE Affiliated • Delhi
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {/* Home Link */}
              <Link
                to="/"
                className={`text-sm font-semibold whitespace-nowrap transition-colors relative py-1 ${
                  location.pathname === '/'
                    ? 'text-orange-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 after:rounded-full'
                    : 'text-slate-700 hover:text-orange-600'
                }`}
              >
                Home
              </Link>

              {/* About Us Dropdown */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`text-sm font-semibold whitespace-nowrap transition-colors inline-flex items-center gap-1.5 py-1 ${
                    isAboutActive
                      ? 'text-orange-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 after:rounded-full'
                      : 'text-slate-700 hover:text-orange-600'
                  }`}
                >
                  <span>About Us</span>
                  <FiChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180 text-orange-600' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isAboutDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-2 w-72 z-50"
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200/80 p-2 overflow-hidden">
                        {aboutDropdownItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`block p-3 rounded-lg transition-colors ${
                              location.pathname === item.path
                                ? 'bg-orange-50/80 text-orange-700'
                                : 'hover:bg-slate-50 text-slate-800 hover:text-orange-600'
                            }`}
                          >
                            <span className="block font-bold text-sm">{item.name}</span>
                            <span className="block text-xs text-slate-500 mt-0.5">{item.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Navigation Items */}
              {mainNavItems.slice(1).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-semibold whitespace-nowrap transition-colors relative py-1 ${
                      isActive
                        ? 'text-orange-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 after:rounded-full'
                        : 'text-slate-700 hover:text-orange-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3 shrink-0">
              <Link
                to="/admissions"
                className="whitespace-nowrap inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:shadow"
              >
                <span>Apply Online</span>
                <FiArrowRight size={13} />
              </Link>

              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-800 transition font-semibold text-xs border border-orange-200">
                    <FiUser size={14} />
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div className="px-4 py-1.5 border-b border-slate-100 text-xs text-slate-500">
                      Signed in as <span className="font-bold text-slate-800 block truncate">{user.email}</span>
                    </div>
                    {isAdmin() && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-orange-700 font-semibold hover:bg-orange-50 transition"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                    >
                      <div className="flex items-center space-x-1.5">
                        <FiLogOut size={14} />
                        <span>Sign Out</span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 transition"
                >
                  Admin Portal
                </Link>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b-2 border-orange-500 shadow-xl overflow-hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="px-6 py-4 space-y-2">
                <Link
                  to="/"
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    location.pathname === '/' ? 'bg-orange-50 text-orange-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Home
                </Link>

                <div className="pt-2 pb-1 border-t border-slate-100">
                  <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                    About Our School
                  </span>
                  {aboutDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                        location.pathname === item.path ? 'bg-orange-50 text-orange-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-2 pb-1 border-t border-slate-100">
                  <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Academics & Life
                  </span>
                  {mainNavItems.slice(1).map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                        location.pathname === item.path ? 'bg-orange-50 text-orange-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <Link
                    to="/admissions"
                    className="w-full text-center py-2.5 rounded-lg bg-orange-600 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Apply for Admission 2026-27
                  </Link>
                  {!user && (
                    <Link
                      to="/login"
                      className="w-full text-center py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs"
                    >
                      Admin Staff Portal
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer so page content starts cleanly below header */}
      <div className="pt-[104px] md:pt-[112px]"></div>
    </>
  );
};

export default Header;
