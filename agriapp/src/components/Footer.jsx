import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Twitter, Facebook, Instagram, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 5000);
        }
    };

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
                            Empowering Indian farmers through direct trade, transparent pricing, and sustainable growth for every harvest.
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
                            {[
                                { name: 'Marketplace', path: '/marketplace' },
                                { name: 'Live Prices', path: '/prices' },
                                { name: 'For Farmers', path: '/dashboard' },
                                { name: 'Track Order', path: '/tracking' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-gray-500 dark:text-gray-400 hover:text-agri-primary transition-colors font-medium">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="font-display font-bold text-agri-dark dark:text-white uppercase tracking-widest text-xs mb-8">Company</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'About Us', path: '/about' },
                                { name: 'Farmer Stories', path: '/stories' },
                                { name: 'AI Advisor', path: '/advisor' },
                                { name: 'Contact', path: '/contact' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-gray-500 dark:text-gray-400 hover:text-agri-primary transition-colors font-medium">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div className="lg:col-span-4">
                        <div className="p-8 rounded-[2.5rem] bg-agri-primary/5 border border-agri-primary/10 relative overflow-hidden group">
                            <AnimatePresence mode="wait">
                                {subscribed ? (
                                    <motion.div
                                        key="thanks"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="py-4 text-center"
                                    >
                                        <CheckCircle2 size={40} className="text-agri-primary mx-auto mb-4" />
                                        <h3 className="font-display font-bold text-xl text-agri-dark dark:text-white mb-2">Welcome Aboard!</h3>
                                        <h3 className="font-display font-bold text-xl text-agri-dark dark:text-white mb-2 underline decoration-agri-primary decoration-4">Check Your Inbox</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Welcome aboard. You're now subscribed to India's most trusted agricultural intelligence.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <h3 className="font-display font-bold text-xl text-agri-dark dark:text-white mb-4 uppercase tracking-wider text-xs">Stay Informed</h3>
                                        <h2 className="text-3xl font-display font-black text-agri-dark dark:text-white mb-4 leading-tight">Empower Your <span className="text-agri-primary">Harvest.</span></h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                                            Join 50,000+ modern farmers. Get India's most trusted mandi intelligence and real-time crop forecasts delivered every Sunday.
                                        </p>
                                        <form onSubmit={handleSubscribe} className="flex gap-2">
                                            <input 
                                                type="email" 
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com" 
                                                className="flex-grow bg-white dark:bg-slate-900 border border-agri-primary/20 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary/30 text-agri-dark dark:text-white"
                                            />
                                            <button className="p-3 bg-agri-primary text-white rounded-xl shadow-glow transition-all hover:bg-agri-dark">
                                                <ArrowRight size={20} />
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {/* India Contact Quick Glance */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
                                <Phone size={16} className="text-agri-primary" />
                                <span className="text-[10px] md:text-sm font-bold text-gray-600 dark:text-gray-300 tracking-tight">1800-419-8444</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
                                <Mail size={16} className="text-agri-secondary" />
                                <span className="text-[10px] md:text-sm font-bold text-gray-600 dark:text-gray-300 tracking-tight">support@agri.in</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            &copy; {new Date().getFullYear()} AgriConnect. Empowering Indian Agriculture.
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 bg-agri-primary/10 rounded-full">
                            <MapPin size={12} className="text-agri-primary" />
                            <span className="text-[10px] font-bold text-agri-primary uppercase tracking-widest">Base: Bengaluru</span>
                        </div>
                    </div>
                    <div className="flex gap-8 text-sm font-medium">
                        <Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-agri-primary transition-colors">Privacy</Link>
                        <Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-agri-primary transition-colors">Terms</Link>
                        <Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-agri-primary transition-colors">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

