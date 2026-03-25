import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen pt-12 pb-24 transition-colors duration-300">

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                        Reimagining the <br /> <span className="text-agri-green">Agricultural Supply Chain</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        AgriConnect was founded with a simple mission: to empower farmers and provide buyers with fresher, more affordable produce by eliminating the middleman.
                    </p>
                </motion.div>
            </section>

            {/* Values Section */}
            <section className="bg-agri-light/50 dark:bg-gray-800/50 py-24 mb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">Our Core Values</h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: <Target size={40} />, title: "Empowerment", desc: "Giving farmers control over their pricing and direct access to a growing market." },
                            { icon: <Heart size={40} />, title: "Transparency", desc: "Clear fees, open pricing data, and detailed origin tracking for every single crop." },
                            { icon: <Globe size={40} />, title: "Sustainability", desc: "Encouraging local trade to reduce carbon footprints and ensure fresher food delivery." }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
                            >
                                <div className="w-20 h-20 mx-auto bg-agri-green/10 rounded-full flex items-center justify-center text-agri-green mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Origin Story */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1595804365737-12681fbfa968?w=800&h=1000&fit=crop"
                            alt="Farmer in field"
                            className="rounded-3xl shadow-2xl object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <span className="text-agri-green font-bold tracking-wider uppercase">Our Story</span>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Born in the fields, built for the future.</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            We saw firsthand how hard farmers worked, only to see the majority of the profit go to brokers and distributors. Buyers paid premium prices for food that wasn't fresh by the time it reached them.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            AgriConnect uses technology to solve this. Our platform handles the logistics, payments, and discovery, allowing farmers and buyers to securely trade directly and fairly.
                        </p>
                        <Link to="/marketplace">
                            <button className="mt-4 flex items-center gap-2 text-agri-green hover:text-agri-dark font-bold text-lg group">
                                Experience the difference <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
