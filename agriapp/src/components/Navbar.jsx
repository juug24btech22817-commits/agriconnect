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

    const mainLinks = [
        { name: language === 'EN' ? 'Home' : 'होम', path: '/' },
        { name: language === 'EN' ? 'Market' : 'मार्केट', path: '/marketplace' },
        { name: language === 'EN' ? 'Dash' : 'डैश', path: '/dashboard' },
        { name: language === 'EN' ? 'AI' : 'एआई', path: '/advisor' },
        { name: language === 'EN' ? 'Weather' : 'मौसम', path: '/weather' },
    ];

    const moreLinks = [
        { name: language === 'EN' ? 'Community' : 'समुदाय', path: '/community' },
        { name: language === 'EN' ? 'Prices' : 'कीमतें', path: '/prices' },
        { name: language === 'EN' ? 'Stories' : 'कहानियां', path: '/stories' },
        { name: language === 'EN' ? 'Contact' : 'संपर्क', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 glass border-none shadow-premium transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 group">
                            <Leaf className="h-5 w-5 lg:h-6 lg:w-6 text-agri-primary group-hover:rotate-12 transition-transform" />
                            <span className="font-display font-bold text-lg lg:text-2xl tracking-tight text-agri-dark dark:text-white">
                                Agri<span className="text-agri-primary">Connect</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-1">
                            {mainLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-2 lg:px-3 py-2 rounded-xl text-[12px] lg:text-[14px] font-bold transition-all duration-300 relative group ${isActive(link.path)
                                            ? 'text-agri-primary bg-agri-primary/5'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-agri-primary'
                                        }`}
                                >
                                    <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                                    {isActive(link.path) && (
                                        <motion.div layoutId="nav-active" className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-agri-primary rounded-full" />
                                    )}
                                </Link>
                            ))}

                            {/* More Dropdown */}
                            <div className="relative group/more">
                                <button className="px-2 lg:px-3 py-2 rounded-xl text-[12px] lg:text-[14px] font-bold text-gray-600 dark:text-gray-400 hover:text-agri-primary flex items-center gap-1">
                                    {language === 'EN' ? 'More' : 'और'}
                                    <Menu size={14} />
                                </button>
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-premium border border-gray-100 dark:border-gray-800 py-2 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all transform origin-top-right scale-95 group-hover/more:scale-100">
                                    {moreLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className={`block px-4 py-2 text-sm font-medium ${isActive(link.path) ? 'text-agri-primary bg-agri-primary/5' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 mx-2"></div>

                            {/* Icons Section */}
                            <div className="flex items-center gap-1 lg:gap-2">
                                <button onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')} className="px-1.5 py-1 text-[10px] font-black border border-gray-100 dark:border-gray-800 rounded-lg hover:border-agri-primary transition-colors text-gray-400">
                                    {language}
                                </button>

                                <Link to="/cart" className="p-1.5 rounded-xl text-gray-400 hover:bg-agri-primary/10 hover:text-agri-primary transition-all relative">
                                    <ShoppingCart size={16} />
                                    {cartCount > 0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-agri-primary text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">{cartCount}</span>}
                                </Link>

                                <button onClick={() => setDarkMode(!darkMode)} className="p-1.5 rounded-xl text-gray-400 hover:bg-agri-primary/10 hover:text-agri-primary transition-all">
                                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                                </button>

                                <Link to="/dashboard" className="bg-agri-primary text-white px-4 py-2 rounded-xl text-[12px] font-black shadow-glow transform hover:-translate-y-0.5 transition-all ml-1">
                                    {language === 'EN' ? 'Sell' : 'बेचें'}
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
                            {[...mainLinks, ...moreLinks].map((link) => (
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
                                <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-500">
                                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                                <button
                                    onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold text-gray-500"
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
