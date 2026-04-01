import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Keeping it simple: default to standard user
  const [role, setRole] = useState('user'); 
  const [error, setError] = useState('');
  
  const { loginAction } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await api.register(name, email, password, role);
      // Immediately log them in after registering
      loginAction(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Email might already be in use.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl border border-green-100">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Create Account</h2>
      {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required 
          />
        </div>
        
        {/* Simple Role Setup for Demo - In a real app we'd secure this! */}
        <div>
          <label className="block text-gray-700 mb-2">Account Type</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="user">Farmer/Buyer (User)</option>
            <option value="admin">Platform Manager (Admin)</option>
          </select>
        </div>

        <button type="submit" className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors mt-4">
          Register
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Already have an account? <Link to="/login" className="text-green-600 font-bold hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
