import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-gray-900 pt-24 pb-12 transition-colors duration-500 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -tr-y-1/2 translate-x-1/2 w-96 h-96 bg-agri-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-4 max-w-sm">
                        <Link to="/" className="flex items-center gap-2 mb-8 group">
                            <div className="p-2 bg-agri-primary/10 rounded-xl group-hover:bg-agri-primary/20 transition-colors">
                                <Leaf className="h-6 w-6 text-agri-primary group-hover:rotate-12 transition-transform" />
                            </div>
                            <span className="font-display font-bold text-2xl tracking-tight text-agri-dark dark:text-white">
                                Agri<span className="text-agri-primary">Connect</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
                            Transforming Indian agriculture through direct trade, transparent pricing, and sustainable growth for every farmer.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Facebook, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-agri-primary hover:text-white transition-all transform hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="font-display font-bold text-agri-dark dark:text-white uppercase tracking-widest text-xs mb-8">Platform</h3>
                        <ul className="space-y-4">
                            {['Marketplace', 'Live Prices', 'For Farmers', 'Track Order'].map(item => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-500 dark:text-gray-400 hover:text-agri-primary transition-colors font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="font-display font-bold text-agri-dark dark:text-white uppercase tracking-widest text-xs mb-8">Company</h3>
                        <ul className="space-y-4">
                            {['About Us', 'Farmer Stories', 'Careers', 'Contact'].map(item => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-500 dark:text-gray-400 hover:text-agri-primary transition-colors font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div className="lg:col-span-4">
                        <div className="p-8 rounded-3xl bg-agri-primary/5 border border-agri-primary/10">
                            <h3 className="font-display font-bold text-xl text-agri-dark dark:text-white mb-4">Join our journey</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Receive weekly updates on market trends and farmer success stories.</p>
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="flex-grow bg-white dark:bg-slate-900 border border-agri-primary/20 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary/30"
                                />
                                <button className="p-3 bg-agri-primary text-white rounded-xl shadow-glow transition-all hover:bg-agri-dark">
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        &copy; {new Date().getFullYear()} AgriConnect. Empowering Indian Agriculture.
                    </p>
                    <div className="flex gap-8 text-sm font-medium">
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-agri-primary transition-colors">Privacy</a>
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-agri-primary transition-colors">Terms</a>
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-agri-primary transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
