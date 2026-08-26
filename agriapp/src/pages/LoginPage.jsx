import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginAction } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await api.login(email, password);
      loginAction(data.token, data.user);

      const destination = location.state?.from;

      if (destination) {
        navigate(destination);
      } else if (data.user && data.user.role === 'admin') {
        navigate('/admin');
      } else if (data.user && data.user.role === 'farmer') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-8 shadow-[0_20px_60px_rgba(15,118,110,0.12)]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl shadow-sm">
            🌾
          </div>
          <h2 className="text-3xl font-bold text-green-800">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to continue your farming journey.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 transition focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-xs font-medium text-green-700 hover:text-green-800 hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 transition focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-3 font-bold text-white shadow-md transition hover:from-green-700 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Signing In...' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="font-bold text-green-700 hover:text-green-800 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
