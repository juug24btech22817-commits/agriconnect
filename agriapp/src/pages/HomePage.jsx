import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, ArrowRight, ShieldCheck, TrendingUp, Search 
} from 'lucide-react';

const HomePage = () => {
    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                {/* Modern Mesh Gradient Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 premium-gradient opacity-40 dark:opacity-20" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-agri-primary/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-agri-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.span 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-agri-primary/10 text-agri-primary border border-agri-primary/20 text-sm font-bold mb-8"
                        >
                            <Leaf size={16} /> Revolutionizing Indian Agriculture
                        </motion.span>
                        
                        <h1 className="text-6xl md:text-8xl font-display font-extrabold text-agri-dark dark:text-white mb-8 leading-[1.1] tracking-tight">
                            Direct Trade for <br /> 
                            <span className="text-gradient">Every Indian Farmer</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                            Empowering millions through a transparent marketplace, real-time market insights, and AI-powered crop tracking.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/marketplace">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-10 py-5 bg-agri-primary text-white rounded-2xl font-bold text-lg shadow-glow transition-all flex items-center justify-center gap-2 group"
                                >
                                    Explore Market <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link to="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-10 py-5 glass text-agri-dark dark:text-white rounded-2xl font-bold text-lg transition-all border-gray-200 dark:border-gray-800"
                                >
                                    List Your Harvest
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Dashboard Preview / Visual */}
                    <motion.div 
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-20 relative px-4"
                    >
                        <div className="max-w-5xl mx-auto glass rounded-[2.5rem] p-4 shadow-premium group border-white/40 overflow-hidden">
                           <img 
                            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2670&auto=format&fit=crop" 
                            className="w-full h-[400px] object-cover rounded-[2rem] opacity-90 group-hover:opacity-100 transition-opacity"
                            alt="Agriculture Technology"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/40 to-transparent pointer-events-none rounded-[2.5rem]" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-20 relative z-10 -mt-10">
                <div className="container mx-auto px-4">
                    <div className="glass rounded-[3rem] p-12 grid grid-cols-2 lg:grid-cols-4 gap-12 shadow-premium">
                        {[
                            { number: '50K+', label: 'Active Farmers', accent: 'text-agri-primary' },
                            { number: '1.2M', label: 'Tons Traded', accent: 'text-agri-secondary' },
                            { number: '200+', label: 'Mandis Live', accent: 'text-agri-primary' },
                            { number: '15Cr+', label: 'Monthly Earnings', accent: 'text-agri-secondary' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className={`text-4xl md:text-5xl font-display font-black mb-2 ${stat.accent}`}>{stat.number}</div>
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-agri-dark dark:text-white mb-6 tracking-tight">
                            Engineered for the <span className="text-agri-primary">Future</span>
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                            We provide the tools farmers need to thrive in a digital economy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { 
                                icon: <ShieldCheck size={32} />, 
                                title: "Verified Trade", 
                                desc: "Every transaction is secured with blockchain-backed transparency and instant payments.",
                                color: "bg-emerald-500/10 text-emerald-600"
                            },
                            { 
                                icon: <TrendingUp size={32} />, 
                                title: "Smart Insights", 
                                desc: "Get real-time mandi prices and demand forecasting powered by AI to sell at the top.",
                                color: "bg-amber-500/10 text-amber-600"
                            },
                            { 
                                icon: <Leaf size={32} />, 
                                title: "Supply Chain", 
                                desc: "Optimized logistics ensuring your produce reaches buyers in peak freshness, every time.",
                                color: "bg-teal-500/10 text-teal-600"
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -12 }}
                                className="glass p-10 rounded-[2.5rem] shadow-premium border-white/20 hover:border-agri-primary/30 transition-all group"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.color} mb-8 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-3xl font-display font-bold text-agri-dark dark:text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg font-medium">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 container mx-auto px-4 mb-32">
                <div className="relative rounded-[4rem] bg-agri-dark dark:bg-agri-primary/10 p-16 md:p-24 overflow-hidden border border-white/10">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="relative z-10 max-w-4xl">
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-tight">
                            Ready to join the <br /> <span className="text-agri-primary">Digital Agri Revolution?</span>
                        </h2>
                        <p className="text-xl text-agri-light/80 mb-12 max-w-2xl font-medium">
                            Join over 50,000 farmers and 2,000 institutional buyers across India.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Link to="/marketplace">
                                <button className="px-10 py-5 bg-white text-agri-dark hover:bg-agri-primary hover:text-white rounded-2xl font-bold text-lg shadow-2xl transition-all active:scale-95">
                                    Browse Marketplace
                                </button>
                            </Link>
                            <Link to="/about">
                                <button className="px-10 py-5 bg-white/10 text-white rounded-2xl font-bold text-lg backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all active:scale-95">
                                    How it Works
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
