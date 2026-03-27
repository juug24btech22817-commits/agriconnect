import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="bg-agri-light dark:bg-gray-900 min-h-screen">

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background visual */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2689&auto=format&fit=crop"
                        alt="Farm Sunrise"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-agri-green/20 text-agri-light border border-agri-green/50 backdrop-blur-sm text-sm font-semibold mb-6">
                            Revolutionizing Agriculture
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Connecting Farmers <br /> Directly to <span className="text-agri-yellow">Buyers</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light">
                            Empowering agriculture through direct trade, fair pricing, and transparent supply chains. No middlemen, maximum profit.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-agri-green hover:bg-agri-dark text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(46,125,50,0.4)] transition-all flex items-center justify-center gap-2"
                                >
                                    Sell Crops <ArrowRight size={20} />
                                </motion.button>
                            </Link>
                            <Link to="/marketplace">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md rounded-full font-bold text-lg transition-all"
                                >
                                    Buy Fresh Produce
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-">
                        {[
                            { number: '10K+', label: 'Active Farmers' },
                            { number: '50K+', label: 'Happy Buyers' },
                            { number: '₹15Cr+', label: 'Farmer Earnings' },
                            { number: '100%', label: 'Transparency' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center justify-center"
                            >
                                <div className="text-4xl font-black text-agri-green dark:text-agri-yellow mb-2">{stat.number}</div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-agri-light dark:bg-gray-900 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-agri-green/5 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-agri-yellow/5 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Why Choose AgriConnect?</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">We're changing the way agricultural trade works, benefiting everyone involved.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <ShieldCheck size={32} />, title: "Direct Trade", desc: "Eliminate middlemen. Farmers sell directly to buyers for maximum profit margins and fresher produce." },
                            { icon: <TrendingUp size={32} />, title: "Fair Pricing", desc: "Transparent price discovery based on real-time market data. Guaranteeing the best rates for every harvest." },
                            { icon: <Leaf size={32} />, title: "Fresh Quality", desc: "Shorter supply chains mean farm-to-table delivery is faster, ensuring buyers get the freshest quality possible." }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl shadow-agri-green/5 border border-gray-100 dark:border-gray-700 transition-all"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-agri-green/10 flex items-center justify-center text-agri-green dark:text-agri-yellow mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-agri-green dark:bg-agri-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Trading Experience?</h2>
                    <p className="text-xl text-agri-light/90 mb-10">Join thousands of farmers and buyers already using AgriConnect to trade smarter, faster, and fairer.</p>
                    <Link to="/marketplace">
                        <button className="px-8 py-4 bg-white text-agri-green hover:bg-gray-100 rounded-full font-bold text-lg shadow-xl transition-all">
                            Explore the Marketplace
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
