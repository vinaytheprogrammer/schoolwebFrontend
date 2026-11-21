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
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-100 px-4 py-8">
      <motion.div
        className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-amber-600 py-6 px-4 text-center">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-amber-100 text-sm mt-1">Staff and Administrator Access Portal</p>
        </div>

        <div className="p-6">
          {error && (
            <motion.div
              className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="admin@school.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 disabled:opacity-50 text-sm shadow-md"
            >
              {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
            <span className="font-semibold">Demo Credentials:</span>
            <div className="mt-1">
              Email: <code className="bg-amber-100 px-1 py-0.5 rounded">admin@school.com</code> (or <code className="bg-amber-100 px-1 py-0.5 rounded">vinay@a.com</code>)
            </div>
            <div className="mt-0.5">
              Password: <code className="bg-amber-100 px-1 py-0.5 rounded">admin123</code>
            </div>
          </div>

          <div className="mt-6 text-center text-gray-600 text-xs">
            <p>For credentials reset or assistance, contact school administration.</p>
            <p className="mt-2">
              <Link to="/" className="text-amber-700 font-medium hover:underline">
                ← Return to Homepage
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
