import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Sun, Moon, Bell, User, ShoppingCart, PhoneCall, Sparkles, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Navbar = () => {
    const { user, logoutAction } = useContext(AuthContext);
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
        { name: language === 'EN' ? 'Weather' : 'मौसम', path: '/weather' },
        { name: language === 'EN' ? 'Prices' : 'कीमतें', path: '/prices' },
        { name: language === 'EN' ? 'Community' : 'समुदाय', path: '/community' },
        { name: language === 'EN' ? 'Stories' : 'कहानियां', path: '/stories' },
        { name: language === 'EN' ? 'Contact' : 'संपर्क', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 glass border-none shadow-premium transition-all duration-300">
            <div className="max-w-full mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
                    {/* Logo - Left Aligned */}
                    <div className="flex-shrink-0 min-w-fit">
                        <Link to="/" className="flex items-center gap-2 group">
                            <Leaf className="h-8 w-8 text-agri-primary group-hover:rotate-12 transition-transform" />
                            <span className="font-display font-bold text-xl lg:text-2xl tracking-tighter text-agri-dark dark:text-white">
                                AgriConnect
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu - Spanning Center */}
                    <div className="hidden md:flex flex-grow justify-center overflow-x-auto no-scrollbar">
                        <div className="flex items-center space-x-1 lg:space-x-1 xl:space-x-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-2 lg:px-2 py-2 rounded-xl text-[11px] lg:text-[13px] font-bold transition-all duration-300 relative group truncate ${isActive(link.path)
                                            ? 'text-agri-primary bg-agri-primary/5'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-agri-primary hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                        }`}
                                >
                                    <span className="relative z-10 whitespace-nowrap flex items-center gap-1">
                                        {link.icon && <span className="opacity-80 group-hover:opacity-100 transition-opacity">{link.icon}</span>}
                                        {link.name}
                                    </span>
                                    {isActive(link.path) && (
                                        <motion.div layoutId="nav-active" className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-agri-primary rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Icons Section - Right Aligned */}
                    <div className="hidden md:flex items-center gap-1 lg:gap-3">
                        <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 mr-2"></div>
                        
                        <button onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')} className="px-2 py-1 text-[10px] font-black border border-gray-100 dark:border-gray-800 rounded-lg hover:border-agri-primary transition-colors text-gray-400">
                            {language}
                        </button>

                        <Link to="/cart" className="p-2 rounded-xl text-gray-400 hover:bg-agri-primary/10 hover:text-agri-primary transition-all relative">
                            <ShoppingCart size={18} />
                            {cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-agri-primary text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">{cartCount}</span>}
                        </Link>

                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl text-gray-400 hover:bg-agri-primary/10 hover:text-agri-primary transition-all">
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <div className="flex items-center gap-2">
                            {user ? (
                                <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 p-1.5 pr-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <div className="w-8 h-8 rounded-xl bg-agri-primary/10 flex items-center justify-center text-agri-primary">
                                        <User size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-agri-primary leading-none mb-1">Authenticated</span>
                                        <button 
                                            onClick={logoutAction}
                                            className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors text-left"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    to="/login"
                                    className="px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-agri-primary transition-colors"
                                >
                                    Login
                                </Link>
                            )}

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group"
                            >
                                {/* Subtle pulsing background glow */}
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-1 bg-agri-primary rounded-2xl blur-lg"
                                />
                                
                                <Link 
                                    to={user ? "/dashboard" : "/login"} 
                                    className="relative bg-gradient-to-r from-agri-primary via-emerald-500 to-teal-600 text-white px-7 py-3 rounded-2xl text-sm font-black shadow-glow hover:shadow-emerald-500/60 transform transition-all ml-2 flex items-center gap-2 group ring-1 ring-white/20 overflow-hidden"
                                >
                                    {/* Animated Shine Effect */}
                                    <motion.div 
                                        animate={{ left: ['-100%', '200%'] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                                        className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                                    />
                                    
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-emerald-100 animate-pulse" />
                                        {language === 'EN' ? 'Sell Now' : 'अभी बेचें'}
                                    </span>
                                </Link>
                            </motion.div>
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
                                    className={`px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center ${isActive(link.path)
                                            ? 'bg-agri-primary/10 text-agri-primary shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-agri-primary/5 hover:text-agri-primary'
                                        }`}
                                >
                                    {link.icon && <span className="mr-1.5 opacity-80 group-hover:opacity-100">{link.icon}</span>}
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
                                    className="flex-grow ml-4 bg-gradient-to-r from-agri-primary via-emerald-500 to-teal-600 text-white text-center py-4 rounded-[1.5rem] font-black shadow-xl shadow-agri-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all border border-white/20 relative overflow-hidden"
                                >
                                    <Sparkles className="h-5 w-5 text-emerald-100" />
                                    {language === 'EN' ? 'Sell Now' : 'अभी बेचें'}
                                    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]" />
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
