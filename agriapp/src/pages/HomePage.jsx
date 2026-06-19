import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, ArrowRight, ShieldCheck, TrendingUp, Search,
  Users, MapPin, IndianRupee, Activity, Sparkles, Star, ShoppingBag, ArrowUpRight
} from 'lucide-react';

const HomePage = () => {
    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-20">
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
                            <Leaf size={16} /> #1 Platform for Indian Farmers
                        </motion.span>
                        
                        <h1 className="text-6xl md:text-8xl font-display font-extrabold text-agri-dark dark:text-white mb-8 leading-[1.1] tracking-tight">
                            Smarter Trade for <br /> 
                            <span className="text-gradient">India's 50K+ Farmers</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                            Skip the middlemen. Get fair prices, real-time mandi rates, AI-powered crop advice, and direct buyer connections — all in one place.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/marketplace">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-10 py-5 bg-agri-primary text-white rounded-2xl font-bold text-lg shadow-glow transition-all flex items-center justify-center gap-2 group"
                                >
                                    Explore Marketplace <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link to="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-10 py-5 glass text-agri-dark dark:text-white rounded-2xl font-bold text-lg transition-all border-gray-200 dark:border-gray-800 flex items-center justify-center gap-2 group"
                                >
                                    <ShoppingBag size={18} className="text-agri-primary" /> Sell Your Harvest
                                </motion.button>
                            </Link>
                        </div>
                        <p className="mt-6 text-sm text-gray-400 dark:text-gray-500 font-medium">
                            ✅ No signup fee &nbsp;·&nbsp; 🔒 Secure payments &nbsp;·&nbsp; 📊 Real-time mandi prices
                        </p>
                    </motion.div>

                    {/* Dashboard Preview / Visual with Tech Badges */}
                    <motion.div 
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-20 relative px-4"
                    >
                        <div className="max-w-5xl mx-auto glass rounded-[2.5rem] p-4 shadow-premium group border-white/40 overflow-hidden relative">
                           <img 
                            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2670&auto=format&fit=crop" 
                            className="w-full h-[400px] object-cover rounded-[2rem] opacity-90 group-hover:opacity-100 transition-opacity"
                            alt="Agriculture Technology"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/40 to-transparent pointer-events-none rounded-[2.5rem]" />
                           
                           {/* Overlaid UI Badges for Premium tech feel */}
                           <motion.div 
                               initial={{ opacity: 0, x: -20 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: 0.8, duration: 0.8 }}
                               className="absolute top-8 left-8 glass p-4 rounded-2xl shadow-glow hidden md:flex items-center gap-3 border-white/30 backdrop-blur-md"
                           >
                               <div className="w-10 h-10 rounded-xl bg-agri-primary/20 flex items-center justify-center text-agri-primary">
                                   <TrendingUp size={20} />
                               </div>
                               <div className="text-left">
                                   <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live Price Index</div>
                                   <div className="text-sm font-black text-agri-dark dark:text-white flex items-center gap-1.5">
                                       Wheat: ₹2,450/Qtl <span className="text-emerald-500 font-bold text-xs">+3.4%</span>
                                   </div>
                               </div>
                           </motion.div>

                           <motion.div 
                               initial={{ opacity: 0, x: 20 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: 1.0, duration: 0.8 }}
                               className="absolute bottom-8 right-8 glass p-4 rounded-2xl shadow-premium hidden md:flex items-center gap-3 border-white/30 backdrop-blur-md"
                           >
                               <div className="w-10 h-10 rounded-xl bg-agri-secondary/20 flex items-center justify-center text-agri-secondary">
                                   <Sparkles size={20} />
                               </div>
                               <div className="text-left">
                                   <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Smart Crop Analytics</div>
                                   <div className="text-sm font-black text-agri-dark dark:text-white">
                                       Soil Health: <span className="text-agri-secondary">94% Excellent</span>
                                   </div>
                               </div>
                           </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-20 relative z-10 -mt-10">
                <div className="container mx-auto px-4">
                    <div className="glass rounded-[3rem] p-12 grid grid-cols-2 lg:grid-cols-4 gap-12 shadow-premium">
                        {[
                            { number: '72K+', label: 'Active Farmers', accent: 'text-agri-primary', icon: <Users size={24} className="text-agri-primary" />, bg: 'bg-agri-primary/10' },
                            { number: '2.4M', label: 'Tons Traded', accent: 'text-agri-secondary', icon: <TrendingUp size={24} className="text-agri-secondary" />, bg: 'bg-agri-secondary/10' },
                            { number: '340+', label: 'Mandis Live', accent: 'text-agri-primary', icon: <MapPin size={24} className="text-agri-primary" />, bg: 'bg-agri-primary/10' },
                            { number: '28Cr+', label: 'Monthly Earnings', accent: 'text-agri-secondary', icon: <IndianRupee size={24} className="text-agri-secondary" />, bg: 'bg-agri-secondary/10' }
                        ].map((stat, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center group flex flex-col items-center justify-center p-6 rounded-[2rem] hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>
                                <div className={`text-4xl md:text-5xl font-display font-black mb-2 ${stat.accent}`}>{stat.number}</div>
                                <div className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Crops Section */}
            <section className="py-12 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-3 border border-amber-500/20">
                                <Sparkles size={12} className="animate-spin-slow text-amber-500" /> Top Picks This Season
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-agri-dark dark:text-white tracking-tight">
                                Trending Harvests <span className="text-agri-primary">Right Now</span>
                            </h2>
                        </div>
                        <Link to="/marketplace" className="text-agri-primary hover:text-agri-dark dark:hover:text-white font-bold flex items-center gap-1.5 transition-colors group/all mt-4 md:mt-0">
                            View All 850+ Listings
                            <ArrowRight size={18} className="group-hover/all:translate-x-1.5 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Organic Basmati Rice (1121)",
                                farmer: "Gurpreet Singh",
                                location: "Amritsar, Punjab",
                                price: "₹6,800",
                                unit: "Quintal",
                                stock: "45 Tons available",
                                rating: "4.9",
                                badge: "Best Seller",
                                bg: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop"
                            },
                            {
                                title: "Premium Alphonso Mangoes",
                                farmer: "Devendra Patil",
                                location: "Ratnagiri, Maharashtra",
                                price: "₹1,200",
                                unit: "Dozen",
                                stock: "120 Crates available",
                                rating: "5.0",
                                badge: "Limited Deal",
                                bg: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop"
                            },
                            {
                                title: "Golden Sharbati Wheat",
                                farmer: "Ram Charan Yadav",
                                location: "Sehore, Madhya Pradesh",
                                price: "₹2,750",
                                unit: "Quintal",
                                stock: "80 Tons available",
                                rating: "4.8",
                                badge: "High Demand",
                                bg: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop"
                            }
                        ].map((crop, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -8 }}
                                className="glass rounded-[2rem] overflow-hidden shadow-premium border-white/20 hover:border-agri-primary/30 transition-all flex flex-col h-full group"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img 
                                        src={crop.bg} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        alt={crop.title}
                                    />
                                    <div className="absolute top-4 left-4 py-1.5 px-3 rounded-xl bg-agri-dark/80 backdrop-blur-md text-white text-xs font-black">
                                        {crop.badge}
                                    </div>
                                    <div className="absolute bottom-4 right-4 py-1 px-2.5 rounded-lg bg-white/90 dark:bg-slate-900/90 text-amber-500 text-xs font-extrabold flex items-center gap-1">
                                        <Star size={12} fill="currentColor" /> {crop.rating}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-grow text-left">
                                    <div>
                                        <h3 className="text-xl font-bold text-agri-dark dark:text-white group-hover:text-agri-primary transition-colors line-clamp-1">
                                            {crop.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-2 text-gray-500 dark:text-gray-400 text-xs font-semibold">
                                            <MapPin size={12} />
                                            <span>{crop.location}</span>
                                        </div>
                                        <div className="mt-1 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                                            Farmer: {crop.farmer}
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-gray-100 dark:border-slate-800/80 my-4 pt-4 flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-black text-agri-primary dark:text-agri-primary">{crop.price}</span>
                                            <span className="text-xs text-gray-400 dark:text-gray-500 font-bold"> / {crop.unit}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-500/10 py-0.5 px-2 rounded-full">
                                                {crop.stock}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <Link to={`/marketplace`} className="w-full">
                                        <button className="w-full py-3 bg-agri-surface hover:bg-agri-primary hover:text-white dark:bg-slate-900 dark:hover:bg-agri-primary text-agri-dark dark:text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-1.5 border border-gray-200 dark:border-slate-800 hover:border-transparent">
                                            <ShoppingBag size={14} /> Trade Now <ArrowUpRight size={14} />
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Market Hubs Section */}
            <section className="py-16 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="relative flex h-3.5 w-3.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-sm font-black text-emerald-500 uppercase tracking-wider">Live Mandi Hubs</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-agri-dark dark:text-white tracking-tight">
                                Real-Time Regional Activity
                            </h2>
                        </div>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mt-4 md:mt-0 font-medium">
                            Direct connection established across major agricultural centers in India. Pulse signals show active high-volume trade.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                state: "Punjab & Haryana",
                                hub: "Northern Grain Corridor",
                                active: "4.2k active today",
                                crops: "Wheat, Basmati, Mustard",
                                priceTrend: "+4.2%",
                                color: "border-l-4 border-emerald-500"
                            },
                            {
                                state: "Maharashtra",
                                hub: "Western Agro Hub",
                                active: "6.8k active today",
                                crops: "Onions, Sugarcane, Soy",
                                priceTrend: "+2.8%",
                                color: "border-l-4 border-amber-500"
                            },
                            {
                                state: "Gujarat & Rajasthan",
                                hub: "Cotton & Oilseed Zone",
                                active: "3.5k active today",
                                crops: "Cotton, Groundnut, Cumin",
                                priceTrend: "+5.1%",
                                color: "border-l-4 border-emerald-500"
                            },
                            {
                                state: "Karnataka & AP",
                                hub: "Southern Spice Belt",
                                active: "2.9k active today",
                                crops: "Ragi, Coffee, Turmeric",
                                priceTrend: "+1.9%",
                                color: "border-l-4 border-amber-500"
                            }
                        ].map((hub, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className={`glass p-6 rounded-3xl shadow-premium border-white/20 hover:border-agri-primary/30 transition-all flex flex-col justify-between ${hub.color}`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-left">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{hub.hub}</span>
                                            <h3 className="text-xl font-bold text-agri-dark dark:text-white mt-1">{hub.state}</h3>
                                        </div>
                                        <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold rounded-lg flex items-center gap-1">
                                            <Activity size={12} className="animate-pulse" />
                                            {hub.priceTrend}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 text-left">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{hub.active}</span>
                                        </div>
                                        <div className="text-xs text-gray-400 mt-2 font-medium">Crops: {hub.crops}</div>
                                    </div>
                                </div>
                                <Link to="/marketplace" className="text-agri-primary hover:text-agri-dark dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors group/link mt-2">
                                    View Live Trades
                                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
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
                                <h3 className="text-3xl font-display font-bold text-agri-dark dark:text-white mb-4 text-left">{feature.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg font-medium text-left">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 container mx-auto px-4 mb-32">
                <div className="relative rounded-[4rem] bg-agri-dark dark:bg-agri-primary/10 p-16 md:p-24 overflow-hidden border border-white/10">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="relative z-10 max-w-4xl text-left">
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-tight">
                            Grow More, <br /> <span className="text-agri-primary">Earn More — Together</span>
                        </h2>
                        <p className="text-xl text-agri-light/80 mb-12 max-w-2xl font-medium">
                            Join 72,000+ farmers and 3,500 institutional buyers already trading smarter on AgriConnect.
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
