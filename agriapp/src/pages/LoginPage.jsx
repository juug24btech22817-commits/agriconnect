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
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-2xl rounded-2xl border border-green-100">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-green-800">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to continue your farming journey.</p>
      </div>
      {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-70"
        >
          {isLoading ? 'Signing In...' : 'Log In'}
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Don't have an account? <Link to="/register" className="text-green-600 font-bold hover:underline">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
