import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Package, TrendingUp, Clock, 
  DollarSign, Search, Filter, X, Sun, CloudRain, 
  Thermometer, Droplets, MapPin, ChevronRight, AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('listings');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [listings, setListings] = useState([
        { id: 1, name: 'Alphonso Mangoes', quantity: '120 dozen', price: '₹800/dozen', status: 'Active', image: '/images/crops/alphonso_mangoes_1773328054659.png' },
        { id: 2, name: 'Basmati Rice', quantity: '1500 kg', price: '₹120/kg', status: 'Active', image: '/images/crops/basmati_rice_organic_1773328180216.png' },
        { id: 3, name: 'Red Onions', quantity: '800 kg', price: '₹35/kg', status: 'Low Stock', image: '/images/crops/red_onions.png' },
    ]);

    const [weather, setWeather] = useState({
        temp: "32°C",
        condition: "Sunny",
        humidity: "45%",
        soilMoisture: "Low",
        location: "Bengaluru, Karnataka",
        advice: "Water your wheat crops tonight for optimal moisture retention.",
        isLoading: false,
        error: ""
    });
    const [searchQuery, setSearchQuery] = useState("");

    const fetchWeather = async (query) => {
        if (!query) return;
        setWeather(prev => ({ ...prev, isLoading: true, error: "" }));
        try {
            // Geocoding with address details
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&addressdetails=1`);
            const geoData = await geoRes.json();
            
            if (geoData.length === 0) throw new Error("Location not found");
            const { lat, lon, display_name, address } = geoData[0];
            
            // Extract the most relevant city/area name
            const city = address.city || address.town || address.village || address.suburb || address.state_district || "";
            const locationLabel = query.match(/^\d+$/) ? `${query}, ${city}` : city || display_name.split(',')[0];
            
            // Weather
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,rain`);
            const data = await weatherRes.json();
            
            const tempVal = Math.round(data.current.temperature_2m);
            const humVal = data.current.relative_humidity_2m;
            const rainVal = data.current.rain;
            const code = data.current.weather_code;
            
            let cond = "Sunny";
            if (code > 0 && code < 4) cond = "Partly Cloudy";
            else if (code >= 45 && code <= 48) cond = "Foggy";
            else if (code >= 51 && code <= 67) cond = "Rainy";
            else if (code >= 80 && code <= 82) cond = "Showers";
            else if (code >= 95) cond = "Stormy";

            let adv = "Weather conditions are optimal for your crops.";
            if (rainVal === 0 && tempVal > 28) adv = "No rain and high heat. It is a good time to water your crops for better growth.";
            else if (rainVal > 0) adv = "Rain is falling or expected. Save your water and stop irrigation to avoid flooding the roots.";
            else if (tempVal < 10) adv = "It's getting cold. Consider covering sensitive plants to protect them from frost.";

            // Human-readable rain info
            let rainStatus = "No Rain";
            if (rainVal > 0 && rainVal <= 2) rainStatus = "Drizzle";
            else if (rainVal > 2 && rainVal <= 10) rainStatus = "Rainy";
            else if (rainVal > 10) rainStatus = "Heavy Rain";

            setWeather({
                temp: `${tempVal}°C`,
                condition: cond,
                humidity: `${humVal}%`,
                soilMoisture: humVal > 70 ? "Very Moist" : humVal > 40 ? "Good Moisture" : "Dry Soil",
                location: locationLabel,
                rain: rainVal > 0 ? `${rainVal}mm (${rainStatus})` : "No Rain (0mm)",
                advice: adv,
                isLoading: false,
                error: ""
            });

            // Remember this location for next time
            localStorage.setItem('lastWeatherLocation', query);
        } catch (err) {
            setWeather(prev => ({ ...prev, isLoading: false, error: "Location not found." }));
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            fetchWeather(searchQuery);
        }
    };

    useEffect(() => {
        let savedLocation = localStorage.getItem('lastWeatherLocation');
        // Migrate from old default if found
        if (!savedLocation || savedLocation.includes("Karnal")) {
            savedLocation = "Bengaluru, Karnataka";
        }
        fetchWeather(savedLocation);
    }, []);

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-24 pb-20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-display font-black text-agri-dark dark:text-white mb-2 tracking-tight">Farmer <span className="text-agri-primary">Dashboard</span></h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                           <MapPin size={16} className="text-agri-primary" /> Welcome back, Farmer Shaswat. {weather.location}
                        </p>
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className="group flex items-center gap-2 bg-agri-primary hover:bg-agri-dark text-white px-8 py-4 rounded-2xl font-bold shadow-glow transition-all transform hover:-translate-y-1">
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        Create New Listing
                    </button>
                </header>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Stats & Weather (col-span-4) */}
                    <aside className="lg:col-span-4 space-y-8">
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-br from-agri-primary to-agri-dark p-6 rounded-[2rem] text-white shadow-premium relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sun size={80} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-grow">
                                        <p className="text-agri-light/60 font-bold uppercase tracking-widest text-[9px] mb-1">Live Forecast</p>
                                        <div className="relative max-w-[160px]">
                                            <input 
                                                type="text" 
                                                placeholder="City or Pincode"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyDown={handleSearch}
                                                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/40 outline-none transition-all pr-8"
                                            />
                                            <button 
                                                onClick={() => fetchWeather(searchQuery)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                                            >
                                                <Search size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl">
                                        <Sun size={20} className={`${weather.isLoading ? 'animate-spin' : ''} text-agri-secondary`} />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    {weather.error ? (
                                        <p className="text-red-300 text-[10px] font-bold">{weather.error}</p>
                                    ) : (
                                        <>
                                            <h3 className="text-4xl font-display font-black leading-none mb-1">{weather.isLoading ? "..." : weather.temp}</h3>
                                            <p className="text-agri-light/80 font-bold uppercase tracking-widest text-[10px]">
                                                {weather.condition} • {weather.location}
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
                                        <Droplets size={16} className="text-blue-300" />
                                        <div>
                                            <p className="text-[8px] text-white/50 uppercase font-bold">Soil</p>
                                            <p className="text-xs font-bold">{weather.soilMoisture}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
                                        <CloudRain size={16} className="text-agri-light" />
                                        <div>
                                            <p className="text-[8px] text-white/50 uppercase font-bold">Rain</p>
                                            <p className="text-xs font-bold whitespace-nowrap">{weather.rain || "0mm"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-black/20 rounded-xl border border-white/10 flex gap-3">
                                    <AlertCircle size={16} className="text-agri-secondary shrink-0" />
                                    <p className="text-[10px] font-medium leading-tight text-agri-light/90 italic">
                                        {weather.isLoading ? "Analyzing..." : weather.advice}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Stats Card */}
                        <div className="glass p-8 rounded-[2.5rem] shadow-premium">
                            <h4 className="font-display font-bold text-agri-dark dark:text-white mb-6">Financial Overview</h4>
                            <div className="space-y-6">
                                {[
                                    { label: 'Total Sales', value: '₹1,24,450', icon: <DollarSign size={20}/>, color: 'text-agri-primary bg-agri-primary/10' },
                                    { label: 'Active Listings', value: listings.length, icon: <Package size={20}/>, color: 'text-blue-500 bg-blue-500/10' },
                                    { label: 'Pending Orders', value: '05', icon: <Clock size={20}/>, color: 'text-amber-500 bg-amber-500/10' }
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
                                            <span className="font-medium text-gray-500 dark:text-gray-400">{stat.label}</span>
                                        </div>
                                        <span className="font-bold text-agri-dark dark:text-white text-lg">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </aside>

                    {/* Right Column: Listings (col-span-8) */}
                    <main className="lg:col-span-8 space-y-8">
                        
                        <div className="glass rounded-[2.5rem] shadow-premium overflow-hidden">
                            <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                                <h2 className="text-2xl font-display font-bold text-agri-dark dark:text-white">Active Inventory</h2>
                                <div className="flex glass rounded-2xl p-1.5 border-gray-200 dark:border-gray-800">
                                    {['listings', 'drafts', 'history'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-agri-primary text-white shadow-glow' : 'text-gray-400 hover:text-agri-primary'}`}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                <AnimatePresence>
                                    {listings.map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-8 flex flex-col sm:flex-row items-center gap-8 hover:bg-agri-primary/[0.02] transition-colors"
                                        >
                                            <div className="relative group shrink-0">
                                                <img src={item.image} alt={item.name} className="w-28 h-28 rounded-[1.5rem] object-cover shadow-lg" />
                                                <div className="absolute inset-0 bg-agri-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]" />
                                            </div>
                                            
                                            <div className="flex-grow text-center sm:text-left">
                                                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                                                    <h3 className="text-xl font-display font-bold text-agri-dark dark:text-white">{item.name}</h3>
                                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.status === 'Active' ? 'bg-agri-primary/10 text-agri-primary' : 'bg-red-100 text-red-600'}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-400 font-medium">
                                                    <span className="flex items-center gap-1.5"><Package size={16} className="text-agri-primary" /> {item.quantity}</span>
                                                    <span className="flex items-center gap-1.5 font-bold text-agri-primary"> {item.price}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 shrink-0">
                                                <button className="p-3 bg-white dark:bg-slate-900 rounded-xl text-gray-400 hover:text-agri-primary border border-gray-100 dark:border-gray-800 transition-all hover:border-agri-primary/30">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button className="p-3 bg-white dark:bg-slate-900 rounded-xl text-gray-400 hover:text-red-500 border border-gray-100 dark:border-gray-800 transition-all hover:border-red-500/30">
                                                    <Trash2 size={18} />
                                                </button>
                                                <button className="p-3 bg-agri-primary/10 text-agri-primary rounded-xl font-bold text-xs hover:bg-agri-primary hover:text-white transition-all">
                                                    Details
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                    </main>
                </div>
            </div>

            {/* Premium Add Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-agri-dark/60 backdrop-blur-md" 
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden relative z-[70] border border-white/20"
                        >
                            <div className="p-10">
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-3xl font-display font-black text-agri-dark dark:text-white">Add New Harvest</h2>
                                    <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                        <X size={24} className="text-gray-400" />
                                    </button>
                                </div>
                                
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Crop Name</label>
                                            <input type="text" className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary" placeholder="e.g. Basmati Rice" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Category</label>
                                            <select className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary">
                                                <option>Grains</option>
                                                <option>Fruits</option>
                                                <option>Vegetables</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Quantity (KG/Tons)</label>
                                            <input type="text" className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary" placeholder="500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Price per Unit (₹)</label>
                                            <input type="text" className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary" placeholder="120" />
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="w-full bg-agri-primary text-white font-bold py-5 rounded-2xl shadow-glow hover:bg-agri-dark transition-all transform hover:-translate-y-1">
                                            Publish Listing
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardPage;
