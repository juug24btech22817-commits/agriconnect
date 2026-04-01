import React, { createContext, useState, useEffect } from 'react';

// Create a simple, basic context for holding User info.
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Read saved data when app loads
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Trouble reading saved user logic", err);
      }
    }
  }, []);

  // Standard simple login function
  const loginAction = (newToken, newUserObj) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUserObj));
    setToken(newToken);
    setUser(newUserObj);
  };

  // Standard simple logout
  const logoutAction = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};
