import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut, FiPhone, FiMail, FiAward, FiArrowRight } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Vision & Mission', path: '/vision-mission' },
    { name: "Principal's Message", path: '/principal-message' },
    { name: 'Notice Board', path: '/news' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="w-full fixed top-0 z-[1000] transition-all duration-200">
        {/* Top Info Ribbon */}
        <div className="bg-orange-800 text-orange-100 text-xs py-1.5 px-4 border-b border-orange-700/60 hidden md:block">
          <div className="container mx-auto max-w-7xl flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="flex items-center gap-1.5 text-white font-semibold tracking-wide">
                <FiAward size={13} className="text-orange-300" />
                <span>CBSE Affiliated Sr. Sec. School (Est. 1998)</span>
              </span>
              <span className="text-orange-400/60">•</span>
              <span className="text-orange-200">Affiliation No. 2730488</span>
            </div>

            <div className="flex items-center space-x-4 text-orange-100">
              <a href="tel:+918595792883" className="flex items-center gap-1 hover:text-white transition">
                <FiPhone size={12} className="text-orange-300" />
                <span>+91 85957 92883</span>
              </a>
              <span className="text-orange-400/60">•</span>
              <a href="mailto:Ciatschool1998@gmail.com" className="flex items-center gap-1 hover:text-white transition">
                <FiMail size={12} className="text-orange-300" />
                <span>Ciatschool1998@gmail.com</span>
              </a>
              <span className="text-orange-400/60">•</span>
              <Link to="/admissions" className="text-white font-bold hover:underline">
                Admissions 2026-27 Open
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`bg-white transition-all duration-200 border-b-2 border-orange-500 ${
            isScrolled ? 'shadow-md py-2' : 'shadow-xs py-3'
          }`}
        >
          <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
            {/* School Brand / Crest */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/logo.png"
                alt="CIAT Convent Logo"
                className="w-11 h-11 md:w-12 md:h-12 rounded-lg shadow-xs group-hover:scale-105 transition-transform duration-200 object-contain p-0.5 bg-white border border-orange-200"
              />

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-base md:text-lg font-black text-orange-950 tracking-tight">
                    CIAT CONVENT
                  </h1>
                  <span className="text-[10px] font-bold uppercase bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded border border-orange-200 hidden sm:inline-block">
                    Sr. Sec.
                  </span>
                </div>
                <p className="text-xs text-orange-600 font-semibold tracking-wide">
                  Excellence in Education • Delhi
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-150 relative ${
                      isActive
                        ? 'text-orange-600 bg-orange-50/80 font-bold border-b-2 border-orange-500'
                        : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-2.5">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:shadow"
              >
                <span>Apply Online</span>
                <FiArrowRight size={13} />
              </Link>

              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-800 transition font-semibold text-xs border border-orange-200">
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
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-orange-50 hover:text-orange-700 border border-slate-200 transition"
                >
                  Admin Portal
                </Link>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-orange-800 hover:bg-orange-50 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
              className="lg:hidden bg-white border-b-2 border-orange-500 shadow-xl overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                      location.pathname === item.path
                        ? 'bg-orange-50 text-orange-700 border-l-4 border-orange-500'
                        : 'text-slate-700 hover:bg-orange-50/60'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <Link
                    to="/admissions"
                    className="w-full py-2.5 rounded-lg bg-orange-600 text-white font-bold text-center text-xs uppercase tracking-wider shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Apply for Admission 2026-27
                  </Link>
                  {user ? (
                    <>
                      {isAdmin() && (
                        <Link
                          to="/admin/dashboard"
                          className="w-full py-2 rounded-lg bg-orange-50 text-orange-800 font-bold text-center text-xs border border-orange-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full py-2 text-center text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="w-full py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold text-center text-xs border border-slate-200"
                      onClick={() => setIsMenuOpen(false)}
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
      <div className="pt-[72px] md:pt-[98px]"></div>
    </>
  );
};

export default Header;
