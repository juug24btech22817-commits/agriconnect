import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, 
  Info, Search, MapPin, Calendar, Loader2, Sparkles, 
  Activity, Zap, Globe, BarChart3 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Dummy Chart Data
const chartData = [
    { day: '01', price: 18000 }, { day: '04', price: 18500 }, { day: '08', price: 17500 },
    { day: '12', price: 19000 }, { day: '16', price: 19500 }, { day: '20', price: 18500 },
    { day: '24', price: 20000 }, { day: '28', price: 19500 }, { day: '30', price: 21000 },
];

const trendingCrops = [
    { name: 'Nasik Red Onions', currentPrice: '₹35/kg', change: '+5.2%', isPositive: true, sparkline: [4, 5, 4, 6, 7, 8, 9] },
    { name: 'Sona Masuri Rice', currentPrice: '₹52,000/ton', change: '+12.4%', isPositive: true, sparkline: [10, 11, 14, 13, 16, 18, 20] },
    { name: 'Desi Potatoes', currentPrice: '₹22/kg', change: '-1.4%', isPositive: false, sparkline: [8, 8, 7, 6, 7, 5, 4] },
    { name: 'Robusta Coffee', currentPrice: '₹450/kg', change: '+2.1%', isPositive: true, sparkline: [20, 21, 20, 22, 23, 23, 24] },
];

const tickerItems = [
    "Wheat: ₹2,150/quintal ↑ 0.5%",
    "Paddy: ₹1,960/quintal ↓ 0.2%",
    "Sugar: ₹3,400/quintal ↑ 1.1%",
    "Corn: ₹1,850/quintal ↑ 0.8%",
    "Cotton: ₹6,200/quintal ↓ 0.4%"
];

const MarketPricePage = () => {
    const [selectedRange, setSelectedRange] = useState('1M');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Groceries', 'Fruits', 'Vegetables', 'Dry Fruits'];

    const getSimulatedPrice = (query) => {
        let hash = 0;
        for (let i = 0; i < query.length; i++) {
            hash = query.charCodeAt(i) + ((hash << 5) - hash);
        }
        const basePrice = 1500 + (Math.abs(hash) % 4500);
        const variation = (Math.abs(hash * 31) % 500);
        return {
            commodity: query.charAt(0).toUpperCase() + query.slice(1),
            avgPrice: basePrice,
            minPrice: basePrice - variation,
            minLocation: "Local Market, India",
            maxPrice: basePrice + variation,
            maxLocation: "Terminal Market, India",
            mandiCount: "12+",
            stateCount: "4+",
            arrivalDate: new Date().toLocaleDateString('en-GB'),
            unit: 'Quintal',
            isSimulated: true
        };
    };

    const performSearch = async (query) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;
        setIsLoading(true);
        setError(null);
        try {
            await new Promise(r => setTimeout(r, 800));
            const simulated = getSimulatedPrice(trimmedQuery);
            const result = {
                ...simulated,
                avgPricePerKg: Math.round(simulated.avgPrice / 100),
                minPricePerKg: Math.round(simulated.minPrice / 100),
                maxPricePerKg: Math.round(simulated.maxPrice / 100),
                isQuintal: true,
                isLive: false,
                isSimulated: true
            };
            setSearchResult(result);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        performSearch(searchQuery);
    };

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-24 pb-24 transition-colors duration-500 overflow-x-hidden">
            
            <div className="absolute top-16 left-0 w-full bg-agri-primary/10 backdrop-blur-md border-y border-agri-primary/20 py-2 z-30">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="flex whitespace-nowrap gap-12"
                >
                    {[...tickerItems, ...tickerItems].map((item, i) => (
                        <span key={i} className="flex items-center gap-2 text-xs font-black text-agri-primary uppercase tracking-widest">
                            <Activity size={14} /> {item}
                        </span>
                    ))}
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="max-w-xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-agri-primary font-bold text-sm mb-4"
                        >
                            <Globe size={16} /> National Mandi Database
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-display font-black text-agri-dark dark:text-white mb-4 tracking-tight">Market <span className="text-agri-primary">Insights</span></h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            Access real-time pricing intelligence from over 5,000 mandis across India.
                        </p>
                    </div>

                    <div className="w-full md:max-w-md">
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-agri-primary transition-colors">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-32 py-5 glass dark:bg-slate-900 border-gray-200 dark:border-gray-800 rounded-2xl text-agri-dark dark:text-white shadow-premium focus:ring-2 focus:ring-agri-primary transition-all font-medium"
                                placeholder="Search commodity..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute inset-y-2 right-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="h-full px-6 bg-agri-primary text-white rounded-xl text-xs font-bold shadow-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <><Zap size={14}/> Check Price</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    <div className="lg:col-span-8 space-y-8">
                        
                        <AnimatePresence>
                            {searchResult && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass p-10 rounded-[2.5rem] shadow-premium border-agri-primary/20 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-10 opacity-5">
                                        <Sparkles size={120} className="text-agri-primary" />
                                    </div>
                                    <div className="relative z-10 grid md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div>
                                                <span className="px-3 py-1 bg-agri-primary/10 text-agri-primary rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-agri-primary/20">
                                                    Live Status: Stable
                                                </span>
                                                <h2 className="text-4xl font-display font-black text-agri-dark dark:text-white uppercase tracking-tighter">
                                                    {searchResult.commodity}
                                                </h2>
                                                <p className="text-gray-400 font-medium">Last updated: {searchResult.arrivalDate}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Min Price</p>
                                                    <p className="text-2xl font-black text-red-500">₹{searchResult.minPricePerKg}</p>
                                                    <p className="text-[10px] text-gray-500 truncate">{searchResult.minLocation}</p>
                                                </div>
                                                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Max Price</p>
                                                    <p className="text-2xl font-black text-agri-primary">₹{searchResult.maxPricePerKg}</p>
                                                    <p className="text-[10px] text-gray-500 truncate">{searchResult.maxLocation}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-agri-primary dark:bg-agri-primary/20 p-8 rounded-[2rem] flex flex-col justify-center text-center text-white border border-white/10 group">
                                            <div className="mb-2 opacity-60 font-bold uppercase tracking-widest text-[10px]">National Average</div>
                                            <div className="text-6xl font-display font-black group-hover:scale-105 transition-transform">₹{searchResult.avgPricePerKg}</div>
                                            <div className="mt-2 font-medium opacity-80">Per Kilogram</div>
                                            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                                                <span>{searchResult.mandiCount} Mandis</span>
                                                <span>{searchResult.stateCount} States</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="bg-agri-dark rounded-[3rem] p-10 shadow-premium border border-white/5 relative overflow-hidden">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-display font-black text-white">Price Trajectory</h3>
                                        <span className="px-2 py-0.5 bg-agri-primary/20 text-agri-primary rounded text-[10px] font-black uppercase">Sona Masuri Rice</span>
                                    </div>
                                    <p className="text-white/40 text-sm font-medium flex items-center gap-2">
                                        <BarChart3 size={14} /> Historical trends for last 30 days
                                    </p>
                                </div>
                                <div className="flex bg-white/5 backdrop-blur-md rounded-xl p-1.5 border border-white/10">
                                    {['1W', '1M', '3M', '1Y'].map(range => (
                                        <button 
                                            key={range}
                                            onClick={() => setSelectedRange(range)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${selectedRange === range ? 'bg-agri-primary text-white shadow-glow' : 'text-white/40 hover:text-white'}`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-96 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                        <YAxis hide />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#fff' }}
                                            itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="price" 
                                            stroke="#10b981" 
                                            strokeWidth={4} 
                                            fillOpacity={1} 
                                            fill="url(#chartGradient)" 
                                            animationDuration={2000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="glass p-8 rounded-[2.5rem] shadow-premium">
                            <h3 className="text-xl font-display font-bold text-agri-dark dark:text-white mb-8 flex items-center gap-2">
                                <TrendingUp size={24} className="text-agri-primary" /> Active Trends
                            </h3>
                            <div className="space-y-6">
                                {trendingCrops.map((crop, i) => (
                                    <motion.div 
                                        key={i} 
                                        whileHover={{ x: 6 }}
                                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-agri-primary/5 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${crop.isPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                                                {crop.isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-agri-dark dark:text-white text-sm">{crop.name}</h4>
                                                <p className="text-xs text-gray-400 font-bold">{crop.currentPrice}</p>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-black ${crop.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {crop.change}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-agri-primary to-emerald-800 rounded-[2.5rem] p-8 text-white shadow-premium relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Activity size={100} />
                           </div>
                           <h4 className="text-lg font-display font-bold mb-4">Export Analysis</h4>
                           <p className="text-sm font-medium text-white/70 leading-relaxed mb-6">
                             Rice exports are expected to surge by 15% this quarter due to increased global demand.
                           </p>
                           <button className="px-6 py-3 bg-white text-agri-dark rounded-xl text-xs font-bold hover:bg-agri-light transition-colors">
                              Download Forecast
                           </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPricePage;
