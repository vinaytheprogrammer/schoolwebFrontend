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
      setIsScrolled(window.scrollY > 20);
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
        {/* Top Info Ribbon (School Affiliation & Contact) */}
        <div className="bg-[#052e7e] text-white text-xs py-2 px-4 border-b border-amber-400/40 hidden md:block">
          <div className="container mx-auto max-w-7xl flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1.5 text-amber-300 font-semibold tracking-wide">
                <FiAward size={13} className="text-amber-300" />
                <span>CBSE Affiliated Sr. Sec. School (Est. 1998)</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="text-slate-200">Affiliation No. 2730488</span>
            </div>

            <div className="flex items-center space-x-5 text-slate-200">
              <a href="tel:+918595792883" className="flex items-center gap-1 hover:text-amber-300 transition">
                <FiPhone size={12} className="text-amber-300" />
                <span>+91 85957 92883</span>
              </a>
              <span className="text-white/40">•</span>
              <a href="mailto:Ciatschool1998@gmail.com" className="flex items-center gap-1 hover:text-amber-300 transition">
                <FiMail size={12} className="text-amber-300" />
                <span>Ciatschool1998@gmail.com</span>
              </a>
              <span className="text-white/40">•</span>
              <Link to="/admissions" className="text-amber-300 font-bold hover:underline">
                Admissions 2026-27 Open
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`bg-white transition-all duration-300 border-b-2 border-amber-500 ${
            isScrolled ? 'shadow-md py-2.5' : 'shadow-xs py-3.5'
          }`}
        >
          <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
            {/* School Brand / Crest */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/logo.png"
                alt="CIAT Convent Logo"
                className="w-12 h-12 md:w-14 md:h-14 rounded-lg shadow-xs group-hover:scale-105 transition-transform duration-200 object-contain p-0.5 bg-white border border-amber-200"
              />

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg md:text-xl font-black text-[#052e7e] tracking-tight">
                    CIAT CONVENT
                  </h1>
                  <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-300 hidden sm:inline-block">
                    Sr. Sec. School
                  </span>
                </div>
                <p className="text-xs text-amber-700 font-semibold tracking-wide">
                  Excellence in Education • Delhi
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 relative ${
                      isActive
                        ? 'text-[#052e7e] bg-amber-50 font-bold border-b-2 border-amber-500'
                        : 'text-slate-700 hover:text-[#052e7e] hover:bg-amber-50/60'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:shadow"
              >
                <span>Apply Online</span>
                <FiArrowRight size={13} />
              </Link>

              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#052e7e] transition font-semibold text-xs">
                    <FiUser size={15} />
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-4 py-1.5 border-b border-slate-100 text-xs text-slate-500">
                      Signed in as <span className="font-bold text-slate-800 block truncate">{user.email}</span>
                    </div>
                    {isAdmin() && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-[#052e7e] font-semibold hover:bg-amber-50 transition"
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
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#052e7e] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition"
                >
                  Admin Portal
                </Link>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="xl:hidden p-2 rounded-lg text-[#052e7e] hover:bg-amber-50 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
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
              className="xl:hidden bg-white border-b-2 border-amber-500 shadow-xl overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                      location.pathname === item.path
                        ? 'bg-amber-50 text-[#052e7e] border-l-4 border-amber-500'
                        : 'text-slate-700 hover:bg-amber-50/60'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <Link
                    to="/admissions"
                    className="w-full py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-center text-xs uppercase tracking-wider"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Apply for Admission 2026-27
                  </Link>
                  {user ? (
                    <>
                      {isAdmin() && (
                        <Link
                          to="/admin/dashboard"
                          className="w-full py-2 rounded-lg bg-slate-100 text-[#052e7e] font-bold text-center text-xs"
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
                      className="w-full py-2 rounded-lg bg-slate-100 text-[#052e7e] font-bold text-center text-xs border border-slate-300"
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

      {/* Spacer so page content does not hide behind fixed header */}
      <div className="pt-[115px] md:pt-[125px]"></div>
    </>
  );
};

export default Header;
