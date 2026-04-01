// api.js - Centralized API calls using standard fetch to keep it easy to understand.
const API_URL = 'http://localhost:5000/api';

// Helper to get the logged-in user's token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // === Authentication ===
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  register: async (name, email, password, role = 'user') => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  // === Products / Marketplace ===
  getProducts: async () => {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  createProduct: async (productData) => {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(), // Needs Admin token
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  // === Orders ===
  createOrder: async (orderData) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
  },

  // === Market Prices ===
  getMarketPrices: async () => {
    const res = await fetch(`${API_URL}/market-prices`);
    if (!res.ok) throw new Error('Failed to fetch prices');
    return res.json();
  }
};
