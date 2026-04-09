import React, { createContext, useState, useEffect } from 'react';

// Create a simple, basic context for holding User info.
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
      return null;
    }
  });
  
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Still keep the check in useEffect for cross-tab sync or other side effects if needed,
  // but it's now primarily handled in useState.
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
