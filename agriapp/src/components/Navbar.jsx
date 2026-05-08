import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Sun, Moon, Bell, User, ShoppingCart, PhoneCall, Sparkles, Home, Search, ChevronRight, LayoutDashboard, Store, CloudSun, BadgeIndianRupee, Users, BookOpen, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Navbar = () => {
    const { user, logoutAction } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(() => {
        const hour = new Date().getHours();
        return hour >= 18 || hour < 6;
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
        { name: language === 'EN' ? 'Home' : 'होम', path: '/', icon: <Home size={20} /> },
        { name: language === 'EN' ? 'Marketplace' : 'मार्केटप्लेस', path: '/marketplace', icon: <Store size={20} /> },
        { name: language === 'EN' ? 'Dashboard' : 'डैशबोर्ड', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: language === 'EN' ? 'AI Advisor' : 'एआई सलाहकार', path: '/advisor', icon: <Sparkles size={20} /> },
        { name: language === 'EN' ? 'Weather' : 'मौसम', path: '/weather', icon: <CloudSun size={20} /> },
        { name: language === 'EN' ? 'Prices' : 'कीमतें', path: '/prices', icon: <BadgeIndianRupee size={20} /> },
        { name: language === 'EN' ? 'Community' : 'समुदाय', path: '/community', icon: <Users size={20} /> },
        { name: language === 'EN' ? 'Stories' : 'कहानियां', path: '/stories', icon: <BookOpen size={20} /> },
        { name: language === 'EN' ? 'Contact' : 'संपर्क', path: '/contact', icon: <MessageSquare size={20} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="fixed w-full z-[60] glass border-none shadow-premium transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo - Always Visible */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center gap-2 group">
                                <Leaf className="h-8 w-8 text-agri-primary group-hover:rotate-12 transition-transform" />
                                <span className="font-display font-bold text-xl lg:text-2xl tracking-tighter text-agri-dark dark:text-white">
                                    AgriConnect
                                </span>
                            </Link>
                        </div>

                        {/* Permanent Search Bar */}
                        <div className="hidden md:flex flex-grow max-w-xl mx-8">
                            <div className="relative w-full group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-agri-primary transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    placeholder={language === 'EN' ? "Search seeds, tools, advice..." : "बीज, उपकरण, सलाह खोजें..."}
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-agri-primary/20 focus:border-agri-primary transition-all text-sm font-medium shadow-sm hover:shadow-md focus:shadow-md"
                                />
                            </div>
                        </div>

                        {/* Top Bar Actions */}
                        <div className="flex items-center gap-2 lg:gap-4">
                            {/* Mobile search indicator */}
                            <div className="md:hidden">
                                <Search size={22} className="text-gray-400" />
                            </div>

                            {/* Visible Login/Account Icon */}
                            <Link 
                                to={user ? "/dashboard" : "/login"}
                                className="p-2.5 rounded-2xl bg-agri-primary/10 text-agri-primary hover:bg-agri-primary/20 transition-all group flex items-center gap-2"
                            >
                                <User size={22} className="group-hover:scale-110 transition-transform" />
                                <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">
                                    {user ? 'Profile' : 'Sign In'}
                                </span>
                            </Link>

                            {/* Hamburger Menu Icon */}
                            <button
                                onClick={() => setIsOpen(true)}
                                className="p-2.5 rounded-2xl bg-agri-primary/10 text-agri-primary hover:bg-agri-primary/20 hover:scale-105 active:scale-95 transition-all group shadow-sm hover:shadow-premium-sm border border-agri-primary/5 hover:border-agri-primary/20"
                            >
                                <Menu size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-[80] overflow-y-auto no-scrollbar"
                        >
                            <div className="p-6 h-full flex flex-col">
                                {/* Sidebar Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <Leaf className="h-6 w-6 text-agri-primary" />
                                        <span className="font-display font-bold text-xl text-agri-dark dark:text-white">Menu</span>
                                    </div>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="p-2.5 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all hover:rotate-90"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Main Navigation Links */}
                                <div className="space-y-1 mb-8">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-3">Navigation</p>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center justify-between px-3 py-3 rounded-2xl font-bold transition-all group ${isActive(link.path)
                                                ? 'bg-agri-primary/10 text-agri-primary'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className={`${isActive(link.path) ? 'text-agri-primary' : 'text-gray-400 group-hover:text-agri-primary'} transition-colors`}>
                                                    {link.icon}
                                                </span>
                                                <span className="text-sm">{link.name}</span>
                                            </div>
                                            <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all ${isActive(link.path) ? 'opacity-100 translate-x-0' : ''}`} />
                                        </Link>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-[1px] bg-gray-100 dark:bg-gray-800 w-full mb-8"></div>

                                {/* Tools & Settings */}
                                <div className="space-y-6">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 px-3">Quick Actions</p>
                                    
                                    <div className="grid grid-cols-2 gap-3 px-3">
                                        <button 
                                            onClick={() => setDarkMode(!darkMode)}
                                            className="flex flex-col items-center justify-center p-4 rounded-3xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-gray-700 hover:border-agri-primary transition-all group"
                                        >
                                            {darkMode ? <Sun size={20} className="text-yellow-500 mb-2" /> : <Moon size={20} className="text-indigo-400 mb-2" />}
                                            <span className="text-[11px] font-bold text-gray-500">{darkMode ? 'Light' : 'Dark'}</span>
                                        </button>

                                        <button 
                                            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                                            className="flex flex-col items-center justify-center p-4 rounded-3xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-gray-700 hover:border-agri-primary transition-all"
                                        >
                                            <span className="text-lg font-black text-agri-primary mb-1 leading-none">{language === 'EN' ? 'अ' : 'A'}</span>
                                            <span className="text-[11px] font-bold text-gray-500">{language === 'EN' ? 'Hindi' : 'English'}</span>
                                        </button>
                                    </div>

                                    <Link 
                                        to="/cart" 
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between px-4 py-4 rounded-3xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-gray-700 hover:border-agri-primary transition-all mx-3 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <ShoppingCart size={20} className="text-gray-400 group-hover:text-agri-primary transition-colors" />
                                                {cartCount > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-agri-primary text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900">{cartCount}</span>}
                                            </div>
                                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">My Cart</span>
                                        </div>
                                        <ChevronRight size={16} className="text-gray-300" />
                                    </Link>

                                    {/* User Section */}
                                    <div className="px-3 pt-4">
                                        {user ? (
                                            <div className="p-4 rounded-[2rem] bg-gradient-to-br from-agri-primary/5 to-emerald-500/5 border border-agri-primary/10">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-agri-primary/10 flex items-center justify-center text-agri-primary">
                                                        <User size={24} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black uppercase tracking-widest text-agri-primary mb-0.5">Welcome back</span>
                                                        <span className="text-sm font-bold text-gray-800 dark:text-white truncate max-w-[150px]">{user.displayName || 'Farmer'}</span>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        logoutAction();
                                                        setIsOpen(false);
                                                    }}
                                                    className="w-full py-3 rounded-2xl bg-white dark:bg-slate-800 text-red-500 text-xs font-black uppercase tracking-widest border border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        ) : (
                                            <Link 
                                                to="/login"
                                                onClick={() => setIsOpen(false)}
                                                className="block w-full text-center py-4 rounded-3xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:border-agri-primary transition-all"
                                            >
                                                Login / Register
                                            </Link>
                                        )}
                                    </div>

                                    {/* Footer CTA */}
                                    <div className="px-3 pb-8 mt-auto">
                                        <Link 
                                            to={user ? "/dashboard" : "/login"}
                                            onClick={() => setIsOpen(false)}
                                            className="relative flex items-center justify-center gap-3 w-full py-5 rounded-[2rem] bg-gradient-to-r from-agri-primary via-emerald-500 to-teal-600 text-white font-black text-sm shadow-glow hover:shadow-emerald-500/40 transition-all overflow-hidden group"
                                        >
                                             <motion.div 
                                                animate={{ left: ['-100%', '200%'] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                                            />
                                            <Sparkles size={18} className="animate-pulse" />
                                            {language === 'EN' ? 'Sell Your Produce' : 'अपनी उपज बेचें'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
