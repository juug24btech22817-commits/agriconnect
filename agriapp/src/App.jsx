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
import AdvisorPage from './pages/AdvisorPage';
import CommunityPage from './pages/CommunityPage';
import ContactPage from './pages/ContactPage';
import ContactWidget from './components/ContactWidget';

import { CartProvider } from './context/CartContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 bg-red-50 text-red-900 min-h-screen">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <pre className="bg-red-100 p-4 rounded-xl overflow-auto">{this.state.error.toString()}</pre>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg">Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * App.js - Entry point for the AgriConnect React Application.
 * Manages global routing, Context Providers, and high-level layout.
 * Includes a global ErrorBoundary for maximum application stability.
 */
function App() {
  return (
    <ErrorBoundary>
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
              <Route path="/advisor" element={<AdvisorPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <ContactWidget />
        </div>
      </CartProvider>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
