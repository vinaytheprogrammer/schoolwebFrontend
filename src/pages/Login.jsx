import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiArrowRight, FiShield } from 'react-icons/fi';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: 'admin@school.com', password: 'admin123' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const setDemoCredentials = (email, password) => {
    setCredentials({ email, password });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(credentials.email, credentials.password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Invalid email or password');
      }
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        setError('Cannot connect to backend server. Make sure the backend is running on port 5000.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/90 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with School Crest */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-8 px-6 text-center border-b border-slate-800 text-white relative">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-slate-800/80 p-2 border border-slate-700 shadow-inner flex items-center justify-center">
            <img src="/logo.png" alt="CIAT Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
            Administrative Portal
          </span>
          <h1 className="text-2xl font-black tracking-tight text-white mt-3">
            CIAT Convent Staff Login
          </h1>
          <p className="text-slate-400 text-xs mt-1">Authorized personnel and faculty access only</p>
        </div>

        <div className="p-6 sm:p-8">
          {error && (
            <motion.div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-medium mb-5 flex items-start gap-2 shadow-xs"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FiShield className="shrink-0 mt-0.5 text-red-600" size={14} />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-slate-700 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                Official Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiMail size={16} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="admin@school.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-sm text-slate-800 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-slate-700 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiLock size={16} />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-sm text-slate-800 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <FiArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/90 text-xs text-amber-900">
            <div className="font-bold text-amber-950 mb-1.5 flex items-center justify-between">
              <span>Quick Test Credentials:</span>
              <span className="text-[10px] text-amber-700 font-normal">Click to auto-fill</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setDemoCredentials('admin@school.com', 'admin123')}
                className="text-left py-1 px-2 rounded hover:bg-amber-100/80 transition flex items-center justify-between font-mono text-[11px]"
              >
                <span>admin@school.com</span>
                <span className="text-amber-700 font-sans text-[10px] underline">Fill Principal</span>
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials('vinay@a.com', 'admin123')}
                className="text-left py-1 px-2 rounded hover:bg-amber-100/80 transition flex items-center justify-between font-mono text-[11px]"
              >
                <span>vinay@a.com</span>
                <span className="text-amber-700 font-sans text-[10px] underline">Fill Vinay</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-slate-500 text-xs">
            <Link to="/" className="text-slate-600 font-semibold hover:text-amber-600 transition inline-flex items-center gap-1">
              ← Return to School Homepage
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
