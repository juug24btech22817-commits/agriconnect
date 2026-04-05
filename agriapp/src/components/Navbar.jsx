import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Sun, Moon, Bell, User, ShoppingCart, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const hour = new Date().getHours();
        return hour >= 18 || hour < 6; // Real-time auto-dark mode from 6 PM to 6 AM
    });
    const [language, setLanguage] = useState('EN');
    const location = useLocation();
    const { cartCount } = useCart();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('themePreference', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('themePreference', 'light');
        }
    }, [darkMode]);

    const navLinks = [
        { name: language === 'EN' ? 'Home' : 'होम', path: '/' },
        { name: language === 'EN' ? 'Marketplace' : 'मार्केटप्लेस', path: '/marketplace' },
        { name: language === 'EN' ? 'Dashboard' : 'डैशबोर्ड', path: '/dashboard' },
        { name: language === 'EN' ? 'AI Advisor' : 'एआई सलाहकार', path: '/advisor' },
        { name: language === 'EN' ? 'Community' : 'समुदाय', path: '/community' },
        { name: language === 'EN' ? 'Prices' : 'कीमतें', path: '/prices' },
        { name: language === 'EN' ? 'Stories' : 'कहानियां', path: '/stories' },
        { name: language === 'EN' ? 'Contact' : 'संपर्क', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 glass border-none shadow-premium transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-agri-primary/10 rounded-xl group-hover:bg-agri-primary/20 transition-colors">
                                <Leaf className="h-6 w-6 text-agri-primary group-hover:rotate-12 transition-transform" />
                            </div>
                            <span className="font-display font-bold text-2xl tracking-tight text-agri-dark dark:text-white">
                                Agri<span className="text-agri-primary">Connect</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-2 lg:ml-10 flex items-center space-x-1 lg:space-x-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-1.5 lg:px-4 py-2 rounded-xl text-[11px] lg:text-sm font-semibold transition-all duration-300 relative group overflow-hidden ${isActive(link.path)
                                            ? 'text-agri-primary bg-agri-primary/5'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-agri-primary'
                                        }`}
                                >
                                    <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                                    {isActive(link.path) && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-agri-primary rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}

                            <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 mx-1 lg:mx-4"></div>

                            {/* Icons Section */}
                            <div className="flex items-center gap-1 lg:gap-3">
                                {/* Language Toggle */}
                                <button
                                    onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                                    className="px-1.5 py-1 text-[10px] font-bold border border-gray-200 dark:border-gray-800 rounded-lg hover:border-agri-primary transition-colors text-gray-500 dark:text-gray-400"
                                >
                                    {language}
                                </button>

                                <Link
                                    to="/cart"
                                    className="p-1.5 lg:p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-agri-primary/10 hover:text-agri-primary transition-all relative"
                                >
                                    <ShoppingCart size={16} className="lg:w-5 lg:h-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute top-1 right-1 w-3.5 h-3.5 lg:w-4 lg:h-4 bg-agri-primary text-white text-[8px] lg:text-[9px] font-bold flex items-center justify-center rounded-full border border-white dark:border-slate-900">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-1.5 lg:p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-agri-primary/10 hover:text-agri-primary transition-all"
                                >
                                    {darkMode ? <Sun size={16} className="lg:w-5 lg:h-5" /> : <Moon size={16} className="lg:w-5 lg:h-5" />}
                                </button>

                                <Link
                                    to="/dashboard"
                                    className="bg-agri-primary hover:bg-agri-dark text-white px-2 lg:px-6 py-2 lg:py-2.5 rounded-xl text-[11px] lg:text-sm font-bold transition-all shadow-glow transform hover:-translate-y-0.5 ml-1 lg:ml-2 whitespace-nowrap"
                                >
                                    {language === 'EN' ? 'Sell Now' : 'अभी बेचें'}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile toggle button */}
                    <div className="md:hidden flex items-center gap-3">
                        <Link to="/cart" className="p-2 relative text-gray-600 dark:text-gray-300">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-agri-primary text-white text-[9px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl bg-agri-primary/10 text-agri-primary"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden glass border-t border-gray-200 dark:border-gray-800 shadow-2xl"
                    >
                        <div className="px-4 py-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${isActive(link.path)
                                            ? 'bg-agri-primary/10 text-agri-primary'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-agri-primary/5 hover:text-agri-primary'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 mt-4">
                                <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                                <button
                                    onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold"
                                >
                                    {language}
                                </button>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-grow ml-4 bg-agri-primary text-white text-center py-3 rounded-xl font-bold shadow-lg shadow-agri-primary/20"
                                >
                                    {language === 'EN' ? 'Sell Crops' : 'फसल बेचें'}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
