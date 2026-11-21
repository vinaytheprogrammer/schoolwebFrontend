import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

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

  const handleQuickFill = (email, password) => {
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
    <div className="flex justify-center items-center min-h-[80vh] bg-orange-50/30 px-4 py-12">
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-200"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* School Warm Orange Header */}
        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 py-6 px-4 text-center border-b-4 border-orange-400">
          <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
            <img src="/logo.svg" alt="Greenwood Convent Logo" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <h1 className="text-xl font-black text-white tracking-wide">GREENWOOD CONVENT SCHOOL</h1>
          <p className="text-orange-200 text-xs font-semibold tracking-wider uppercase mt-0.5">Staff & Administrative Portal</p>
        </div>

        <div className="p-6 sm:p-8">
          {error && (
            <motion.div
              className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-xs font-medium mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-slate-700 font-bold mb-1 text-xs uppercase tracking-wider">
                Official Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="admin@school.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-slate-700 font-bold mb-1 text-xs uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 text-xs sm:text-sm uppercase tracking-wider shadow-sm mt-2"
            >
              {isLoading ? 'Verifying Credentials...' : 'Sign In to Dashboard'}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-5 p-3.5 bg-orange-50 rounded-xl border border-orange-200 text-xs text-orange-950">
            <span className="font-bold block mb-1">Demo Access Credentials:</span>
            <div className="flex flex-col gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@school.com', 'admin123')}
                className="text-left py-0.5 px-1 rounded hover:bg-orange-100 transition flex items-center justify-between"
              >
                <span>Email: <code className="font-mono font-bold">admin@school.com</code> (Principal)</span>
                <span className="text-orange-700 underline font-medium">Use</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('staff@school.com', 'admin123')}
                className="text-left py-0.5 px-1 rounded hover:bg-orange-100 transition flex items-center justify-between"
              >
                <span>Email: <code className="font-mono font-bold">staff@school.com</code> (Staff)</span>
                <span className="text-orange-700 underline font-medium">Use</span>
              </button>
              <div className="pt-1 border-t border-orange-200 text-slate-600">
                Password: <code className="font-mono font-bold">admin123</code>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-slate-500 text-xs">
            <Link to="/" className="text-orange-700 font-bold hover:underline">
              ← Return to School Homepage
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
