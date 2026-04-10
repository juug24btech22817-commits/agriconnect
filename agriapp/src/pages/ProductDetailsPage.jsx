import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, MapPin, Truck, Lock, Package, ChevronLeft, 
  ShieldCheck, Zap, Plus, Minus, Loader2, Info, 
  Sparkles, TrendingUp, BarChart3, ShoppingBag, ArrowRight, User,
  Navigation, CheckCircle2, RotateCcw, HandCoins, Award, PackageCheck
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { initialCropsData } from '../constants/crops';
import { api } from '../services/api';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { addToCart } = useCart();
    
    const [crop, setCrop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buyLoading, setBuyLoading] = useState(false);
    const [locLoading, setLocLoading] = useState(false);
    const [location, setLocation] = useState(() => {
        return localStorage.getItem('deliveryLocation') || 'Bengaluru 560001';
    });
    const [count, setCount] = useState(1);
    const [activeTab, setActiveTab] = useState('overview');


    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // Try fetching from initial data first for instant feel
                const found = initialCropsData.find(c => c.id === parseInt(id));
                if (found) {
                    setCrop(found);
                }
                
                // Then try API for most up to date info
                const apiData = await api.getProducts();
                const fresh = apiData.find(c => c.id === parseInt(id));
                if (fresh) setCrop(fresh);
            } catch (err) {
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const handleBuyNow = () => {
        setBuyLoading(true);
        setTimeout(() => {
            setBuyLoading(false);
            if (!user) {
                navigate('/login', { state: { from: '/cart' } });
                return;
            }
            addToCart(crop, count);
            navigate('/cart');
        }, 1000);
    };

    const handleAddToCart = () => {
        addToCart(crop, count);
        // Maybe show a toast or small animation later
    };

    const handleDetectLocation = () => {
        setLocLoading(true);
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            setLocLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Using OpenStreetMap Nominatim for free reverse geocoding
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();
                
                const city = data.address.city || data.address.town || data.address.village || "Unknown City";
                const pincode = data.address.postcode || "";
                const newLoc = `${city} ${pincode}`.trim();
                
                setLocation(newLoc);
                localStorage.setItem('deliveryLocation', newLoc);
            } catch (err) {
                console.error("Error fetching location details:", err);
            } finally {
                setLocLoading(false);
            }
        }, (err) => {
            console.error("Geolocation error:", err);
            setLocLoading(false);
        });
    };


    const getMockDeliveryDate = () => {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 4);
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return deliveryDate.toLocaleDateString('en-IN', options);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-agri-surface dark:bg-slate-950">
                <Loader2 className="w-12 h-12 text-agri-primary animate-spin" />
            </div>
        );
    }

    if (!crop) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-agri-surface dark:bg-slate-950">
                <h2 className="text-3xl font-display font-black text-agri-dark dark:text-white mb-4">Product Not Found</h2>
                <Link to="/marketplace" className="text-agri-primary font-bold hover:underline">Return to Marketplace</Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Breadcrumbs & Back */}
                <button 
                    onClick={() => navigate('/marketplace')}
                    className="flex items-center gap-2 text-gray-500 hover:text-agri-primary transition-colors mb-10 group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Harvest</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    {/* Visual Gallery Section */}
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-premium group"
                        >
                            <img 
                                src={crop.image} 
                                alt={crop.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute top-8 right-8 px-4 py-2 glass dark:bg-slate-900/80 rounded-2xl flex items-center gap-2 border border-white/20 shadow-xl">
                                <Star size={18} className="text-agri-secondary fill-agri-secondary" />
                                <span className="text-lg font-black text-agri-dark dark:text-white">{crop.rating}</span>
                            </div>
                            <div className="absolute bottom-8 left-8 py-3 px-6 bg-agri-dark/60 backdrop-blur-md rounded-2xl text-xs font-black text-white uppercase tracking-widest border border-white/10 shadow-xl">
                                15 {crop.unit} Remaining In Stock
                            </div>
                        </motion.div>
                        
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-agri-primary cursor-pointer transition-all opacity-60 hover:opacity-100">
                                    <img src={crop.image} alt="thumbnail" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Content Section */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 text-agri-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                                <Sparkles size={16} />
                                Certified {crop.category}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-black text-agri-dark dark:text-white mb-4 tracking-tighter uppercase leading-none">
                                {crop.name}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-500 font-medium mb-6">
                                <MapPin size={18} className="text-agri-primary" />
                                <span>Harvested in {crop.location}</span>
                            </div>

                            {/* Delivering to Section */}
                            <div className="p-6 bg-gray-50/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl text-agri-secondary shadow-sm">
                                        <Navigation size={20} className={locLoading ? 'animate-pulse' : ''} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Delivering to</p>
                                        <h4 className="text-lg font-black text-agri-dark dark:text-white uppercase leading-none">
                                            {locLoading ? 'Locating...' : location}
                                        </h4>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleDetectLocation}
                                    disabled={locLoading}
                                    className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-agri-primary/5 text-agri-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 dark:border-slate-700 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {locLoading ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
                                    {locLoading ? 'Detecting...' : 'Use Current Location'}
                                </button>
                            </div>
                        </div>

                        {/* Price & Primary Info */}

                        <div className="p-10 rounded-[3rem] bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <TrendingUp size={120} className="text-agri-primary" />
                            </div>
                            
                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-6xl font-display font-black text-agri-dark dark:text-white tracking-tighter">
                                    {crop.price}
                                </span>
                                <span className="text-xl font-bold text-gray-400">
                                    / {crop.unit}
                                </span>
                            </div>
                            <div className="px-3 py-1 bg-agri-primary/10 text-agri-primary inline-block rounded-lg text-[10px] font-black uppercase tracking-widest mb-6 border border-agri-primary/20">
                                Inclusive of all taxes
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl text-agri-primary shadow-sm">
                                        <Truck size={24} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            <span className="text-emerald-600">FREE delivery</span> by {getMockDeliveryDate()}
                                        </p>
                                        <p className="text-gray-500 text-sm">Fastest delivery tomorrow if ordered within 4 hours.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl text-agri-secondary shadow-sm">
                                        <MapPin size={24} />
                                    </div>
                                    <p className="font-bold uppercase tracking-widest text-xs">Delivering to {location}</p>
                                </div>
                            </div>

                        </div>

                        {/* Amazon-style Service Badges */}
                        <div className="flex items-center justify-between gap-2 py-8 border-y border-gray-100 dark:border-slate-800 mb-10 overflow-x-auto hide-scrollbar">
                            {[
                                { icon: Truck, label: 'Free Delivery', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                                { icon: RotateCcw, label: 'Non-Returnable', color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-slate-800' },
                                { icon: PackageCheck, label: 'AgriConnect Delivered', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                                { icon: HandCoins, label: 'Pay on Delivery', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                                { icon: Award, label: 'Top Brand', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' }
                            ].map((badge, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center min-w-[80px] group cursor-help px-2">
                                    <div className={`p-4 rounded-2xl ${badge.bg} ${badge.color} mb-3 group-hover:rotate-12 transition-all duration-500 shadow-sm border border-transparent group-hover:border-current/10`}>
                                        <badge.icon size={22} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-tight leading-tight text-gray-500 dark:text-gray-400 group-hover:text-agri-dark dark:group-hover:text-white transition-colors">
                                        {badge.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Producer & Story */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="p-8 bg-agri-primary/5 rounded-3xl border border-agri-primary/10">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 leading-none">Sold & Produced by</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-agri-primary/20 rounded-2xl flex items-center justify-center text-agri-primary">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-agri-dark dark:text-white uppercase leading-tight">{crop.farmerDetails?.farmName || crop.farmer}</h3>
                                        <p className="text-xs font-bold text-agri-primary">{crop.farmerDetails?.experience || 'Heritage Farm'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-agri-secondary/5 rounded-3xl border border-agri-secondary/10">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 leading-none">Delivered by</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-agri-secondary/20 rounded-2xl flex items-center justify-center text-agri-secondary">
                                        <Package size={24} />
                                    </div>
                                    <h3 className="text-lg font-black text-agri-dark dark:text-white uppercase leading-tight">AgriConnect Logis</h3>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Set Quantity</p>
                                    <span className="text-sm font-bold text-agri-dark dark:text-white">Minimum: 0.5 {crop.unit}</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <button 
                                        onClick={() => setCount(Math.max(0.5, count - 0.5))}
                                        className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-slate-800 rounded-xl text-gray-600 hover:text-agri-secondary transition-colors"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className="text-3xl font-display font-black text-agri-dark dark:text-white min-w-[1.5ch] text-center">{count}</span>
                                    <button 
                                        onClick={() => setCount(count + 0.5)}
                                        className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-slate-800 rounded-xl text-gray-600 hover:text-agri-primary transition-colors"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-6 bg-white dark:bg-slate-800 text-agri-dark dark:text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] border-2 border-gray-100 dark:border-slate-700 hover:border-agri-primary transition-all group"
                                >
                                    <span className="flex items-center justify-center gap-3">
                                        <ShoppingBag size={20} />
                                        Add to Cart
                                    </span>
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={buyLoading}
                                    className="w-full py-6 bg-agri-primary hover:bg-emerald-700 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-glow flex items-center justify-center gap-3 disabled:opacity-80"
                                >
                                    {buyLoading ? (
                                        <Loader2 size={24} className="animate-spin text-white" />
                                    ) : (
                                        <Zap size={22} className="fill-white" />
                                    )}
                                    {buyLoading ? 'PROCESSING...' : 'Proceed to Buy'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Extended Details Tabs */}
                <div className="mt-24">
                    <div className="flex gap-12 border-b border-gray-100 dark:border-slate-800 mb-12 overflow-x-auto hide-scrollbar">
                        {['overview', 'farmer story', 'quality audit'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-6 text-sm font-black uppercase tracking-widest transition-all relative ${
                                    activeTab === tab ? 'text-agri-primary' : 'text-gray-400'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-agri-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl">
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
                                        "{crop.farmerDetails?.bio || 'This product is curated by our experts to ensure the purest harvest directly from specialized local farms.'}"
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800">
                                        <Info size={24} className="text-agri-primary mb-3" />
                                        <h4 className="font-black text-xs uppercase tracking-widest mb-2">Category</h4>
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{crop.category}</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800">
                                        <TrendingUp size={24} className="text-agri-secondary mb-3" />
                                        <h4 className="font-black text-xs uppercase tracking-widest mb-2">Mandi Trace</h4>
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{crop.mandiPrice} Regional Avg.</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800">
                                        <ShieldCheck size={24} className="text-emerald-500 mb-3" />
                                        <h4 className="font-black text-xs uppercase tracking-widest mb-2">Integrity</h4>
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">100% Lab Verified</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {/* Add more tab content as needed */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailsPage;
