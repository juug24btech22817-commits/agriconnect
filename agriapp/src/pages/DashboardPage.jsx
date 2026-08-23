import React, { useState, useEffect, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Package, TrendingUp, Clock, 
  DollarSign, Search, Filter, X, Sun, Moon, CloudRain, 
  Thermometer, Droplets, MapPin, ChevronRight, AlertCircle, 
  Sparkles, BarChart2, Bell, ArrowUpRight, ArrowDownRight,
  Leaf, ShoppingCart, Star, Activity, Zap, CheckCircle2,
  RefreshCcw, Eye, Tag
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const isAuthorized = user && (user.role === 'farmer' || user.role === 'admin');
    const isBuyer = user && user.role === 'buyer';
    const [activeTab, setActiveTab] = useState('listings');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [language, setLanguage] = useState('EN');
    const [showNotif, setShowNotif] = useState(false);
    
    const [listings, setListings] = useState([]);
    const [, setLoadingListings] = useState(true);

    const [newCropName, setNewCropName] = useState('');
    const [newCropCategory, setNewCropCategory] = useState('Grains');
    const [newCropQuantity, setNewCropQuantity] = useState('');
    const [newCropPrice, setNewCropPrice] = useState('');
    const [newCropUnit, setNewCropUnit] = useState('kg');

    // Mock activity feed
    const activityFeed = [
        { id: 1, icon: <ShoppingCart size={14}/>, color: 'text-blue-400 bg-blue-400/10', msg: 'New order for Basmati Rice — 50kg', time: '2 min ago' },
        { id: 2, icon: <Tag size={14}/>, color: 'text-agri-primary bg-agri-primary/10', msg: 'Price updated: Red Onions → ₹38/kg', time: '1 hr ago' },
        { id: 3, icon: <CheckCircle2 size={14}/>, color: 'text-emerald-400 bg-emerald-400/10', msg: 'Order #1024 delivered successfully', time: '3 hr ago' },
        { id: 4, icon: <Star size={14}/>, color: 'text-amber-400 bg-amber-400/10', msg: 'You received a 5-star review!', time: 'Yesterday' },
        { id: 5, icon: <Bell size={14}/>, color: 'text-purple-400 bg-purple-400/10', msg: 'Mango season price alert triggered', time: 'Yesterday' },
    ];

    // Weekly sales data for mini bar chart
    const weekSales = [42, 68, 55, 80, 95, 60, 78];
    const weekLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxSale = Math.max(...weekSales);
    const activeListingCount = listings.filter((item) => item.status === 'Active').length;
    const totalViews = listings.reduce((sum, item) => sum + (item.views || 0), 0);

    const loadProducts = useCallback(async () => {
        if (!user || (user.role !== 'farmer' && user.role !== 'admin')) {
            setLoadingListings(false);
            return;
        }
        try {
            const res = await fetch(`http://localhost:5000/api/products?farmer=${user._id || user.id}`);
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    const mappedListings = data.map(item => ({
                        id: item._id,
                        name: item.name,
                        quantity: `${item.quantity} ${item.unit || 'kg'}`,
                        price: `₹${item.price}/${item.unit || 'kg'}`,
                        status: item.quantity > 10 ? 'Active' : 'Low Stock',
                        image: item.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop',
                        views: Math.floor(Math.random() * 200 + 50),
                    }));
                    setListings(mappedListings);
                } else {
                    setListings([
                        { id: 'mock-1', name: 'Alphonso Mangoes', quantity: '120 dozen', price: '₹800/dozen', status: 'Active', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&h=200&fit=crop', views: 142 },
                        { id: 'mock-2', name: 'Basmati Rice', quantity: '1500 kg', price: '₹120/kg', status: 'Active', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop', views: 89 },
                        { id: 'mock-3', name: 'Red Onions', quantity: '800 kg', price: '₹35/kg', status: 'Low Stock', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbfee9?w=200&h=200&fit=crop', views: 67 },
                    ]);
                }
            } else {
                throw new Error("Failed to fetch listings");
            }
        } catch (err) {
            console.error("Error loading products:", err);
            setListings([
                { id: 'mock-1', name: 'Alphonso Mangoes', quantity: '120 dozen', price: '₹800/dozen', status: 'Active', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&h=200&fit=crop', views: 142 },
                { id: 'mock-2', name: 'Basmati Rice', quantity: '1500 kg', price: '₹120/kg', status: 'Active', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop', views: 89 },
                { id: 'mock-3', name: 'Red Onions', quantity: '800 kg', price: '₹35/kg', status: 'Low Stock', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbfee9?w=200&h=200&fit=crop', views: 67 },
            ]);
        } finally {
            setLoadingListings(false);
        }
    }, [user]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleAddCrop = async (e) => {
        if (e) e.preventDefault();
        if (!newCropName || !newCropQuantity || !newCropPrice) {
            alert('Please fill out all required fields.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in.');
            return;
        }

        try {
            const cropPayload = {
                name: newCropName,
                category: newCropCategory,
                quantity: parseFloat(newCropQuantity),
                price: parseFloat(newCropPrice),
                unit: newCropUnit,
                image: newCropCategory === 'Fruits' 
                    ? 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop' 
                    : newCropCategory === 'Vegetables' 
                    ? 'https://images.unsplash.com/photo-1618519764620-7403abdbfee9?w=500&h=500&fit=crop' 
                    : 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
                description: `Fresh organic ${newCropName} direct from farm.`,
                mandiPrice: parseFloat(newCropPrice) * 0.85,
                retailPrice: parseFloat(newCropPrice) * 1.2
            };

            const res = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(cropPayload)
            });

            if (res.ok) {
                alert('Crop Listing Added Successfully!');
                setIsAddModalOpen(false);
                setNewCropName('');
                setNewCropQuantity('');
                setNewCropPrice('');
                loadProducts();
            } else {
                const errorData = await res.json();
                alert(`Failed to add crop: ${errorData.message}`);
            }
        } catch (err) {
            console.error(err);
            alert('Error adding crop. Please try again.');
        }
    };

    const [weather, setWeather] = useState({
        temp: "32°C",
        condition: "Clear",
        humidity: "45%",
        soilMoisture: "Low",
        location: "Bengaluru, Karnataka",
        advice: "Water your wheat crops tonight for optimal moisture retention.",
        isDay: true,
        isLoading: false,
        error: ""
    });
    const [searchQuery, setSearchQuery] = useState("");

    const filteredListings = listings.filter((item) => {
        if (activeTab === 'listings') return item.status === 'Active';
        if (activeTab === 'drafts') return item.status !== 'Active';
        return true;
    });

    const fetchWeather = async (query) => {
        if (!query) return;
        setWeather(prev => ({ ...prev, isLoading: true, error: "" }));
        try {
            const searchQ = query.match(/^\d{6}$/) ? `${query}, India` : query;
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQ)}&limit=1&addressdetails=1`);
            const geoData = await geoRes.json();
            
            if (geoData.length === 0) throw new Error("Location not found");
            const { lat, lon, display_name, address } = geoData[0];
            
            const city = address.city || address.town || address.village || address.suburb || address.state_district || address.city_district || "";
            const locationLabel = query.match(/^\d+$/) ? `${query}, ${city || address.state || ""}` : city || display_name.split(',')[0];
            
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,precipitation,is_day`);
            const data = await weatherRes.json();
            
            const tempVal = Math.round(data.current.temperature_2m);
            const humVal = data.current.relative_humidity_2m;
            const rainVal = data.current.precipitation;
            const code = data.current.weather_code;
            const isDay = data.current.is_day !== 0;
            
            let cond = isDay ? "Sunny" : "Clear Night";
            if (code > 0 && code < 4) cond = isDay ? "Partly Cloudy" : "Cloudy Night";
            else if (code >= 45 && code <= 48) cond = "Foggy";
            else if (code >= 51 && code <= 67) cond = "Rainy";
            else if (code >= 80 && code <= 82) cond = "Showers";
            else if (code >= 95) cond = "Stormy";

            let isRaining = rainVal > 0 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95;

            let adv = isDay ? "Weather conditions are optimal for your crops today." : "Optimal evening conditions for crop health.";
            if (isRaining) {
                adv = isDay ? "Rain is falling. No need for irrigation today." : "Night rain detected. Check your drainage to prevent waterlogging.";
            } else if (tempVal > 28) {
                adv = isDay ? "High heat today. Consider extra watering to keep soil moist." : "Warm night ahead. Ensure your storage areas are well ventilated.";
            } else if (tempVal < 15) {
                adv = isDay ? "Cool day ahead. Good for rabi crops." : "Cool night falling. Protect sensitive young saplings from the chill.";
            }

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
                isDay: isDay,
                isLoading: false,
                error: ""
            });

            localStorage.setItem('lastWeatherLocation', query);
        } catch {
            setWeather(prev => ({ ...prev, isLoading: false, error: "Location not found." }));
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') fetchWeather(searchQuery);
    };

    useEffect(() => {
        const savedLoc = localStorage.getItem('lastWeatherLocation');
        if (savedLoc) {
            fetchWeather(savedLoc);
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords;
                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await res.json();
                        const city = data.address.city || data.address.town || data.address.village || "Current Location";
                        fetchWeather(city);
                    } catch {
                        fetchWeather("Bengaluru");
                    }
                },
                () => fetchWeather("Bengaluru")
            );
        } else {
            fetchWeather("Bengaluru");
        }
    }, []);

    // Crop health scores
    const cropHealth = [
        { name: 'Mangoes', score: 92, color: '#f59e0b' },
        { name: 'Basmati', score: 78, color: '#10b981' },
        { name: 'Onions', score: 55, color: '#ef4444' },
    ];

    return (
        <div className={`min-h-screen pt-24 pb-20 transition-all duration-1000 ${
            weather.isDay 
                ? 'bg-agri-surface dark:bg-slate-950' 
                : 'bg-slate-900 dark:bg-black text-white'
        }`}>
            {/* Dynamic Atmosphere Gradient Layer */}
            <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${weather.isDay ? 'opacity-30' : 'opacity-60'}`}>
                <div className={`absolute inset-0 ${
                    weather.isDay 
                        ? 'bg-gradient-to-tr from-orange-200/20 via-transparent to-blue-200/20' 
                        : 'bg-gradient-to-b from-indigo-900/40 via-transparent to-transparent'
                }`} />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                    <div>
                        <h1 className="text-4xl font-display font-black text-agri-dark dark:text-white mb-2 tracking-tight flex items-center gap-3">
                            <span className="text-agri-primary">Agri</span>Dashboard
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                            </span>
                            <span className="ml-1 text-xs font-bold bg-agri-primary/10 text-agri-primary px-3 py-1 rounded-full border border-agri-primary/20">LIVE</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                           <MapPin size={16} className="text-agri-primary" /> 
                           {user ? `Welcome back, ${user.name}` : 'Please log in to manage your inventory'}
                           {weather.location && ` • ${weather.location}`}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                           Quick tip: keep your latest listings fresh and review buyer activity before noon.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Notification Bell */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowNotif(!showNotif)}
                                className="relative p-3 glass rounded-2xl border border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-300 hover:text-agri-primary transition-colors"
                            >
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                            </motion.button>
                            <AnimatePresence>
                                {showNotif && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        className="absolute right-0 top-14 w-72 glass rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden"
                                    >
                                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                            <span className="font-bold text-sm text-agri-dark dark:text-white">Notifications</span>
                                            <span className="text-[10px] font-bold text-agri-primary bg-agri-primary/10 px-2 py-0.5 rounded-full">5 new</span>
                                        </div>
                                        {activityFeed.map(a => (
                                            <div key={a.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                                                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${a.color}`}>{a.icon}</div>
                                                <div>
                                                    <p className="text-xs text-agri-dark dark:text-gray-200 font-medium leading-snug">{a.msg}</p>
                                                    <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {isAuthorized && (
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsAddModalOpen(true)} 
                                className="group relative flex items-center gap-3 bg-gradient-to-r from-agri-primary to-emerald-700 text-white px-8 py-4 rounded-2xl font-black shadow-glow transition-all overflow-hidden border border-white/20"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <motion.div
                                    animate={{ rotate: [0, 90, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Sparkles size={20} className="text-emerald-100" />
                                </motion.div>
                                <span className="relative z-10">{language === 'EN' ? 'Sell Now / List Crop' : 'अभी बेचें / फसल जोड़ें'}</span>
                            </motion.button>
                        )}
                    </div>
                </header>

                {/* Top KPI Bar */}
                {isAuthorized && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                    >
                        {[
                            { label: 'Total Revenue', value: '₹1,24,450', change: '+12.4%', up: true, icon: <DollarSign size={18}/>, color: 'from-emerald-500 to-green-600' },
                            { label: 'Active Listings', value: activeListingCount, change: '+2 today', up: true, icon: <Package size={18}/>, color: 'from-blue-500 to-indigo-600' },
                            { label: 'Pending Orders', value: '05', change: 'Needs action', up: false, icon: <Clock size={18}/>, color: 'from-amber-500 to-orange-600' },
                            { label: 'Total Views', value: totalViews.toLocaleString(), change: '+8.2% vs last week', up: true, icon: <Eye size={18}/>, color: 'from-purple-500 to-pink-600' },
                        ].map((kpi, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="glass rounded-2xl p-5 border border-gray-100 dark:border-gray-800 cursor-pointer group relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${kpi.color} opacity-5 group-hover:opacity-10 transition-opacity blur-xl`} />
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`p-2 rounded-xl bg-gradient-to-br ${kpi.color} text-white shadow-md`}>{kpi.icon}</div>
                                    <span className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded-full ${kpi.up ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-amber-600 bg-amber-50 dark:bg-amber-900/20'}`}>
                                        {kpi.up ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>}
                                        {kpi.change}
                                    </span>
                                </div>
                                <p className="text-2xl font-black text-agri-dark dark:text-white leading-none mb-1">{kpi.value}</p>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{kpi.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column */}
                    <aside className="lg:col-span-4 space-y-6">
                        
                        {/* Weather Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-6 rounded-[2rem] text-white shadow-premium relative overflow-hidden transition-all duration-1000 ${
                                weather.isDay 
                                    ? 'bg-gradient-to-br from-agri-primary to-agri-dark shadow-agri-primary/20' 
                                    : 'bg-gradient-to-br from-indigo-900 to-slate-900 shadow-indigo-900/20'
                            }`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-20 transform -rotate-12">
                                {weather.isDay ? <Sun size={120} /> : <Moon size={120} />}
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
                                                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-white/40 outline-none transition-all pr-10 backdrop-blur-sm"
                                            />
                                            <button 
                                                onClick={() => fetchWeather(searchQuery)}
                                                aria-label="Search weather location"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                                            >
                                                <Search size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl">
                                        {weather.isDay ? (
                                            <Sun size={20} className={`${weather.isLoading ? 'animate-spin' : ''} text-agri-secondary`} />
                                        ) : (
                                            <Moon size={20} className={`${weather.isLoading ? 'animate-spin' : ''} text-blue-200`} />
                                        )}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    {weather.error ? (
                                        <p className="text-red-300 text-[10px] font-bold">{weather.error}</p>
                                    ) : (
                                        <>
                                            <h3 className="text-5xl font-display font-black leading-none mb-1">{weather.isLoading ? "..." : weather.temp}</h3>
                                            <p className="text-agri-light/80 font-bold uppercase tracking-widest text-[10px]">
                                                {weather.condition} • {weather.location}
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-5">
                                    <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
                                        <Droplets size={16} className="text-blue-300" />
                                        <div>
                                            <p className="text-[8px] text-white/50 uppercase font-bold">Humidity</p>
                                            <p className="text-xs font-bold">{weather.humidity}</p>
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

                                <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex gap-3">
                                    <div className="bg-agri-secondary/20 p-2 rounded-lg shrink-0">
                                        <AlertCircle size={16} className="text-agri-secondary" />
                                    </div>
                                    <p className="text-[11px] font-medium leading-relaxed text-agri-light/90">
                                        {weather.isLoading ? "Analyzing crop conditions..." : weather.advice}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Crop Health Card */}
                        {isAuthorized && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                                className="glass p-6 rounded-[2rem] shadow-premium border border-gray-100 dark:border-gray-800"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <h4 className="font-display font-bold text-agri-dark dark:text-white flex items-center gap-2">
                                        <Leaf size={16} className="text-agri-primary" /> Crop Health
                                    </h4>
                                    <span className="text-[10px] font-bold text-gray-400">Live Score</span>
                                </div>
                                <div className="space-y-4">
                                    {cropHealth.map((crop, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-xs font-bold text-agri-dark dark:text-gray-300">{crop.name}</span>
                                                <span className="text-xs font-black" style={{ color: crop.color }}>{crop.score}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${crop.score}%` }}
                                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                                                    className="h-2 rounded-full"
                                                    style={{ backgroundColor: crop.color }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Weekly Sales Mini Chart */}
                        {isAuthorized && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 }}
                                className="glass p-6 rounded-[2rem] shadow-premium border border-gray-100 dark:border-gray-800"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <h4 className="font-display font-bold text-agri-dark dark:text-white flex items-center gap-2">
                                        <BarChart2 size={16} className="text-agri-primary" /> Weekly Sales
                                    </h4>
                                    <span className="text-[10px] font-bold text-agri-primary bg-agri-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
                                        <TrendingUp size={10} /> +18%
                                    </span>
                                </div>
                                <div className="flex items-end gap-2 h-24">
                                    {weekSales.map((val, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(val / maxSale) * 100}%` }}
                                                transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                                                className={`w-full rounded-t-lg ${i === 4 ? 'bg-agri-primary' : 'bg-agri-primary/20 dark:bg-agri-primary/30'}`}
                                                style={{ minHeight: 4 }}
                                            />
                                            <span className="text-[9px] text-gray-400 font-bold">{weekLabels[i]}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4 text-[11px] text-gray-400">
                                    Best day: <span className="font-bold text-agri-primary">Friday</span> — ₹18,500 in sales
                                </p>
                            </motion.div>
                        )}

                        {/* Market Prices Card */}
                        <div className="glass p-6 rounded-[2rem] shadow-premium">
                            <div className="flex items-center justify-between mb-5">
                                <h4 className="font-display font-bold text-agri-dark dark:text-white">Today's Mandi Prices</h4>
                                <span className="text-[10px] font-bold text-agri-primary bg-agri-primary/10 px-2 py-1 rounded-full">Live</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: 'Wheat', price: '₹2,180/q', change: '+1.2%', up: true },
                                    { name: 'Rice', price: '₹3,600/q', change: '+0.8%', up: true },
                                    { name: 'Onion', price: '₹1,450/q', change: '-2.1%', up: false },
                                    { name: 'Tomato', price: '₹890/q', change: '+4.5%', up: true },
                                ].map((crop, i) => (
                                    <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-agri-primary"></div>
                                            <span className="text-sm font-semibold text-agri-dark dark:text-white">{crop.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold text-agri-dark dark:text-gray-200">{crop.price}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ crop.up ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-red-500 bg-red-50 dark:bg-red-900/20'}`}>
                                                {crop.change}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </aside>

                    {/* Right Column */}
                    <main className="lg:col-span-8 space-y-6">
                        
                        {isAuthorized ? (
                            <>
                                {/* Quick Actions Row */}
                                {isAuthorized && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Add Listing', icon: <Plus size={20}/>, action: () => setIsAddModalOpen(true), color: 'bg-agri-primary text-white shadow-glow' },
                                            { label: 'View Orders', icon: <Package size={20}/>, action: () => navigate('/tracking'), color: 'glass text-agri-dark dark:text-white border border-gray-100 dark:border-gray-800' },
                                            { label: 'Market Prices', icon: <TrendingUp size={20}/>, action: () => navigate('/prices'), color: 'glass text-agri-dark dark:text-white border border-gray-100 dark:border-gray-800' },
                                            { label: 'Advisor', icon: <Clock size={20}/>, action: () => navigate('/advisor'), color: 'glass text-agri-dark dark:text-white border border-gray-100 dark:border-gray-800' },
                                        ].map((a, i) => (
                                            <motion.button
                                                key={i}
                                                whileHover={{ scale: 1.04, y: -2 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={a.action}
                                                className={`flex flex-col items-center gap-2 py-5 rounded-2xl font-bold text-sm transition-all ${a.color}`}
                                            >
                                                {a.icon}
                                                {a.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                )}

                                {/* Inventory Section */}
                                <div className="glass rounded-[2.5rem] shadow-premium overflow-hidden">
                                    <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                                        <div>
                                            <h2 className="text-2xl font-display font-bold text-agri-dark dark:text-white">Inventory Overview</h2>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Browse, update, and manage your crop inventory from one place.</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={loadProducts}
                                                className="p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-agri-primary transition-colors"
                                            >
                                                <RefreshCcw size={16} />
                                            </motion.button>
                                            <div className="flex bg-gray-100 dark:bg-slate-800/50 rounded-2xl p-1.5 border border-gray-200/50 dark:border-gray-700/50">
                                                {['listings', 'drafts', 'history'].map(tab => (
                                                    <button
                                                        key={tab}
                                                        onClick={() => setActiveTab(tab)}
                                                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-agri-primary text-white shadow-glow' : 'text-gray-400 hover:text-agri-primary'}`}
                                                    >
                                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                        <AnimatePresence>
                                            {filteredListings.length > 0 ? filteredListings.map((item, idx) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileHover={{ x: 6, backgroundColor: 'rgba(34,197,94,0.02)' }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ delay: idx * 0.08 }}
                                                    className="p-6 flex flex-col sm:flex-row items-center gap-6 transition-all border-b border-gray-50 dark:border-gray-800 last:border-0"
                                                >
                                                    <div className="relative group shrink-0">
                                                        <img src={item.image} alt={item.name} className="w-24 h-24 rounded-[1.5rem] object-cover shadow-lg" />
                                                        <div className="absolute inset-0 bg-agri-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem] flex items-center justify-center">
                                                            <Eye size={18} className="text-white" />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex-grow text-center sm:text-left">
                                                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                                                            <h3 className="text-lg font-display font-bold text-agri-dark dark:text-white">{item.name}</h3>
                                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.status === 'Active' ? 'bg-agri-primary/10 text-agri-primary' : 'bg-red-100 text-red-600'}`}>
                                                                {item.status}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-400 font-medium">
                                                            <span className="flex items-center gap-1.5"><Package size={12} className="text-agri-primary" /> {item.quantity}</span>
                                                            <span className="flex items-center gap-1.5 font-bold text-agri-primary">{item.price}</span>
                                                            <span className="flex items-center gap-1.5 text-gray-400"><Eye size={12} /> {item.views || '—'} views</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2 shrink-0">
                                                        <button className="p-3 bg-white dark:bg-slate-900 rounded-xl text-gray-400 hover:text-agri-primary border border-gray-100 dark:border-gray-800 transition-all hover:border-agri-primary/30 hover:scale-110">
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button className="p-3 bg-white dark:bg-slate-900 rounded-xl text-gray-400 hover:text-red-500 border border-gray-100 dark:border-gray-800 transition-all hover:border-red-500/30 hover:scale-110">
                                                            <Trash2 size={16} />
                                                        </button>
                                                        <button className="px-4 py-3 bg-agri-primary/10 text-agri-primary rounded-xl font-bold text-xs hover:bg-agri-primary hover:text-white transition-all hover:scale-105">
                                                            Details
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )) : (
                                                <div className="p-12 text-center">
                                                    <div className="w-16 h-16 bg-agri-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <Package size={28} className="text-agri-primary" />
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">No inventory found for this tab yet. Switch tabs or add a new crop listing to get started.</p>
                                                    <button
                                                        onClick={() => setIsAddModalOpen(true)}
                                                        className="px-5 py-3 bg-agri-primary text-white rounded-xl font-bold text-sm shadow-glow hover:bg-agri-dark transition-all"
                                                    >
                                                        Add Your First Listing
                                                    </button>
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Activity Feed */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="glass rounded-[2.5rem] shadow-premium overflow-hidden"
                                >
                                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                        <h3 className="font-display font-bold text-agri-dark dark:text-white flex items-center gap-2">
                                            <Activity size={16} className="text-agri-primary" /> Recent Activity
                                        </h3>
                                        <button className="text-[11px] font-bold text-agri-primary hover:underline flex items-center gap-1">
                                            View All <ChevronRight size={12} />
                                        </button>
                                    </div>
                                    <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                        {activityFeed.map((a, i) => (
                                            <motion.div
                                                key={a.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.35 + i * 0.07 }}
                                                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
                                            >
                                                <div className={`p-2.5 rounded-xl shrink-0 ${a.color}`}>{a.icon}</div>
                                                <p className="flex-grow text-sm text-agri-dark dark:text-gray-300 font-medium">{a.msg}</p>
                                                <span className="text-[10px] text-gray-400 whitespace-nowrap">{a.time}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        ) : (
                            <div className="glass rounded-[2.5rem] shadow-premium p-12 text-center space-y-6">
                                <div className="w-24 h-24 bg-agri-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sparkles size={40} className="text-agri-primary" />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-agri-dark dark:text-white">
                                    {isBuyer ? 'Farmer Dashboard' : 'Ready to grow with us?'}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto">
                                    {isBuyer 
                                        ? "This dashboard is reserved for our verified farmers. As a buyer, you can explore the marketplace to find fresh harvests!" 
                                        : "Join our community of farmers to list your crops, reach more buyers, and manage your harvests with ease."}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                                    {isBuyer ? (
                                        <Link to="/marketplace" className="px-8 py-4 bg-agri-primary text-white font-bold rounded-2xl shadow-glow hover:bg-agri-dark transition-all">
                                            Go to Marketplace
                                        </Link>
                                    ) : (
                                        <>
                                            <Link to="/login" className="px-8 py-4 bg-agri-primary text-white font-bold rounded-2xl shadow-glow hover:bg-agri-dark transition-all">
                                                Log In
                                            </Link>
                                            <Link to="/register" className="px-8 py-4 bg-white dark:bg-slate-900 text-agri-primary border border-agri-primary/20 font-bold rounded-2xl hover:bg-agri-primary/5 transition-all">
                                                Register as Farmer
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

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
                            {/* Modal gradient header */}
                            <div className="h-2 bg-gradient-to-r from-agri-primary via-emerald-400 to-agri-secondary" />
                            <div className="p-10">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-3xl font-display font-black text-agri-dark dark:text-white">Add New Harvest</h2>
                                        <p className="text-sm text-gray-400 mt-1">Fill in the details to list your crop</p>
                                    </div>
                                    <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                        <X size={24} className="text-gray-400" />
                                    </button>
                                </div>
                                
                                <form onSubmit={handleAddCrop} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Crop Name</label>
                                            <input 
                                                type="text" 
                                                value={newCropName}
                                                onChange={(e) => setNewCropName(e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary" 
                                                placeholder="e.g. Basmati Rice" 
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Category</label>
                                            <select 
                                                value={newCropCategory}
                                                onChange={(e) => setNewCropCategory(e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary"
                                            >
                                                <option value="Grains">🌾 Grains</option>
                                                <option value="Fruits">🍎 Fruits</option>
                                                <option value="Vegetables">🥦 Vegetables</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2 md:col-span-1">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Quantity</label>
                                            <input 
                                                type="number" 
                                                value={newCropQuantity}
                                                onChange={(e) => setNewCropQuantity(e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary" 
                                                placeholder="500" 
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-1">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Unit</label>
                                            <select 
                                                value={newCropUnit}
                                                onChange={(e) => setNewCropUnit(e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary"
                                            >
                                                <option value="kg">kg</option>
                                                <option value="tons">tons</option>
                                                <option value="dozen">dozen</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2 md:col-span-1">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Price per Unit (₹)</label>
                                            <input 
                                                type="number" 
                                                value={newCropPrice}
                                                onChange={(e) => setNewCropPrice(e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary" 
                                                placeholder="120" 
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <motion.button 
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit" 
                                            className="w-full bg-gradient-to-r from-agri-primary to-emerald-700 text-white font-black py-5 rounded-2xl shadow-glow transition-all flex items-center justify-center gap-2"
                                        >
                                            <Zap size={18} />
                                            Publish Harvest Listing
                                        </motion.button>
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
