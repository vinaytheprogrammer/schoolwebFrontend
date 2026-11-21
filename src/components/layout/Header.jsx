import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut, FiArrowRight } from 'react-icons/fi';

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
      setIsScrolled(window.scrollY > 10);
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
    { name: 'Gallery', path: '/gallery' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`w-full fixed top-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-slate-800 py-3'
            : 'bg-slate-900/90 backdrop-blur-sm border-b border-slate-800/80 py-3.5'
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="CIAT Convent Logo"
                className="w-11 h-11 md:w-12 md:h-12 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-200 object-contain bg-white p-0.5"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold text-white tracking-wider flex items-center gap-1.5">
                CIAT CONVENT
                <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30 hidden sm:inline-block">
                  CBSE
                </span>
              </span>
              <span className="text-xs text-slate-400 font-medium">Sr. Sec. School • Est. 1998</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-amber-400 bg-slate-800/80 font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action / User authentication */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold border border-amber-500/30">
                    <FiUser size={13} />
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-2 border-b border-slate-800 text-xs text-slate-400">
                    Signed in as <span className="font-semibold text-slate-200 block truncate">{user.email}</span>
                  </div>
                  {isAdmin() && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-slate-800 transition"
                  >
                    <div className="flex items-center space-x-2">
                      <FiLogOut size={14} />
                      <span>Sign Out</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/admissions"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-sm transition flex items-center gap-1"
                >
                  <span>Apply Now</span>
                  <FiArrowRight size={12} />
                </Link>
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/80 transition"
                >
                  Admin Portal
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 shadow-2xl fixed top-[60px] left-0 w-full z-[1050]"
          >
            <div className="container mx-auto px-4 py-5 max-w-md">
              <nav className="flex flex-col space-y-1.5">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`py-2 px-3.5 rounded-lg text-sm font-medium transition flex items-center justify-between ${
                        isActive
                          ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    </Link>
                  );
                })}

                <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-2">
                  {user ? (
                    <>
                      {isAdmin() && (
                        <Link
                          to="/admin/dashboard"
                          className="py-2 px-3.5 rounded-lg text-sm text-amber-400 bg-slate-800/80 font-medium"
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
                        className="text-left py-2 px-3.5 rounded-lg text-sm text-red-400 hover:bg-slate-800 flex items-center space-x-2"
                      >
                        <FiLogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/admissions"
                        className="py-2.5 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-center text-xs shadow-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Apply for Admission
                      </Link>
                      <Link
                        to="/login"
                        className="py-2.5 px-3 rounded-lg bg-slate-800 text-slate-200 font-semibold text-center text-xs border border-slate-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Portal
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Height spacer */}
      <div className="pt-[68px]"></div>
    </>
  );
};

export default Header;
