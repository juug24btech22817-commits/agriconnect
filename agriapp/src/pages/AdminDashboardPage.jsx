import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

const AdminDashboardPage = () => {
  const { user, logoutAction } = useContext(AuthContext);
  const navigate = useNavigate();

  // Basic Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState('');
  
  const [message, setMessage] = useState({ text: '', type: '' });

  // Security check: only show if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-4xl text-red-600 font-bold mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">You must be logged in as an Administrator to view this page.</p>
        <button 
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Handle Adding Crop via backend API
  const handleAddCrop = async (e) => {
    e.preventDefault();
    try {
      const newCrop = {
        name,
        price: Number(price),
        category,
        inStock,
        image: image || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80', // Default image
      };
      
      await api.createProduct(newCrop);
      
      setMessage({ text: 'Crop added successfully!', type: 'success' });
      // Clear form
      setName(''); setPrice(''); setImage(''); setCategory('Vegetables'); setInStock(true);
    } catch (err) {
      setMessage({ text: 'Failed to add crop. See console.', type: 'error' });
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-green-900">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">Welcome, {user.name}</span>
          <button 
            onClick={() => { logoutAction(); navigate('/'); }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm font-bold"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Left column: Add Crop Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-green-50">
          <h2 className="text-2xl font-bold mb-4">Add New Crop</h2>
          
          {message.text && (
            <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleAddCrop} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Crop Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required 
                       className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. Organic Tomatoes"/>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Price (₹/Kg)</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} required 
                       className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 outline-none" min="1"/>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)}
                        className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 outline-none">
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Grains</option>
                  <option>Pulses</option>
                </select>
              </div>
              <div className="flex items-center mt-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} className="w-5 h-5 text-green-600 rounded"/>
                  <span className="text-gray-700 font-medium">Currently In Stock</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Image URL (Optional)</label>
              <input type="url" value={image} onChange={e => setImage(e.target.value)}
                     className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 outline-none" placeholder="https://example.com/image.jpg"/>
            </div>

            <button type="submit" className="w-full py-3 bg-green-600 text-white font-bold rounded mt-4 hover:bg-green-700 transition">
              Save Crop to Marketplace
            </button>
          </form>
        </div>

        {/* Right column: Quick Stats (Mocked UI) */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm border border-blue-100 flex flex-col items-center">
            <span className="text-blue-500 font-bold mb-1">Total Active Crops</span>
            <span className="text-4xl font-extrabold text-blue-900">42</span>
          </div>
          <div className="bg-amber-50 p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col items-center">
            <span className="text-amber-600 font-bold mb-1">Pending Orders</span>
            <span className="text-4xl font-extrabold text-amber-900">14</span>
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            (Stats are for demonstration purposes in this version)
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
