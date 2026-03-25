import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Sun, Moon, Bell, User, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();
    const { cartCount } = useCart();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Marketplace', path: '/marketplace' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Prices', path: '/prices' },
        { name: 'Stories', path: '/stories' },
        { name: 'About', path: '/about' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 group">
                            <Leaf className="h-8 w-8 text-agri-green group-hover:rotate-12 transition-transform" />
                            <span className="font-bold text-xl tracking-tight text-agri-dark dark:text-agri-light">
                                AgriConnect
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4 w-full">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive(link.path)
                                            ? 'text-agri-green dark:text-agri-yellow bg-agri-green/10 dark:bg-agri-yellow/10'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-agri-green dark:hover:text-agri-yellow'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2"></div>

                            {/* Icons Section */}
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/cart"
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-agri-light dark:hover:bg-gray-800 transition-colors relative"
                                >
                                    <ShoppingCart size={20} />
                                    {cartCount > 0 && (
                                        <span className="absolute top-1 right-1 w-5 h-5 bg-agri-green text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                <button
                                    onClick={() => alert('No new notifications')}
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-agri-light dark:hover:bg-gray-800 transition-colors relative"
                                >
                                    <Bell size={20} />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                                </button>

                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-agri-light dark:hover:bg-gray-800 transition-colors"
                                >
                                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>

                                <button
                                    onClick={() => alert('Profile options coming soon!')}
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-agri-light dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                                >
                                    <User size={20} />
                                </button>
                            </div>

                            <Link
                                to="/dashboard"
                                className="bg-agri-green hover:bg-agri-dark text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-agri-green/20 transform hover:-translate-y-0.5 ml-2"
                            >
                                Sell Crops
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-2">
                        <Link
                            to="/cart"
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                        >
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-agri-green text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white dark:border-gray-900">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Open */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 shadow-xl border-t dark:border-gray-800 absolute w-full transition-all duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive(link.path)
                                        ? 'bg-agri-green/10 text-agri-green dark:bg-agri-yellow/10 dark:text-agri-yellow'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-agri-light hover:text-agri-green dark:hover:bg-gray-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="bg-agri-green text-white block px-3 py-2 rounded-md text-base font-medium mt-4 text-center shadow-lg hover:bg-agri-dark transition-all"
                        >
                            Sell Crops
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
