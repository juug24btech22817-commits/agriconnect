/**
 * App.jsx - Root component of AgriConnect.
 * Sets up routing, global context providers, and base layout.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MarketplacePage from './pages/MarketplacePage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import MarketPricePage from './pages/MarketPricePage';
import StoriesPage from './pages/StoriesPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/tracking" element={<OrderTrackingPage />} />
              <Route path="/prices" element={<MarketPricePage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
