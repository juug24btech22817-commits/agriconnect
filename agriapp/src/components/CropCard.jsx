/**
 * CropCard.jsx - Premium AgriTech UI Card
 * Handles product display, floating badges, and high-end interaction modals.
 */
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Star, StarHalf, MapPin, Check, Zap, Plus, Minus, 
  X, User, ShieldCheck, Phone, PhoneCall, Info, HeartPulse, 
  TrendingUp, BarChart3, Globe, Sparkles, LogIn, Loader2,
  Truck, Lock, Package, ChevronDown, ChevronRight, CreditCard,
  Leaf, Droplets, Dna, CloudRain, Sunrise, Award, Shield
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const getMockDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 4); // 4 days from now
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return deliveryDate.toLocaleDateString('en-IN', options);
};

const calculateSavings = (priceStr, retailStr) => {
    const price = parseInt(priceStr.replace(/[^0-9]/g, ''));
    const retail = parseInt(retailStr.replace(/[^0-9]/g, ''));
    if (!price || !retail || retail <= price) return null;
    const savings = retail - price;
    const percent = Math.round((savings / retail) * 100);
    return { amount: savings, percent };
};



const FarmerProfileModal = ({ farmer, onClose }) => {
    if (!farmer) return null;
    const details = farmer.farmerDetails;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-agri-dark/80 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-premium max-w-lg w-full relative border border-white/10"
                onClick={e => e.stopPropagation()}
            >
                <div className="h-40 bg-gradient-to-br from-agri-primary to-emerald-900 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-0 left-10 translate-y-1/2">
                         <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-3xl p-1 shadow-premium border-4 border-white dark:border-slate-900 overflow-hidden">
                            <div className="w-full h-full bg-agri-primary/10 rounded-[1.25rem] flex items-center justify-center text-agri-primary">
                                <User size={56} />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="px-10 pb-10 pt-20">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                             <h3 className="text-3xl font-display font-black text-agri-dark dark:text-white mb-1 uppercase tracking-tighter">{farmer.farmer}</h3>
                             <p className="text-agri-primary font-bold text-sm flex items-center gap-2">
                                 <MapPin size={14} /> {farmer.location}
                             </p>
                        </div>
                        {details?.verified && (
                            <div className="px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/20 flex items-center gap-2">
                                <ShieldCheck size={14} /> Trusted Producer
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Mastery</p>
                            <p className="text-sm font-bold text-agri-dark dark:text-white">{details?.experience || 'Heritage Farming'}</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Origin</p>
                            <p className="text-sm font-bold text-agri-dark dark:text-white">{details?.farmName || 'Private Estates'}</p>
                        </div>
                    </div>

                    <div className="bg-agri-primary/5 dark:bg-slate-800/50 p-6 rounded-[2rem] mb-8 border border-agri-primary/10">
                        <div className="flex items-center gap-2 text-agri-primary mb-3">
                            <Sparkles size={16} />
                            <p className="text-[10px] uppercase font-black tracking-[0.2em]">The Artisan Story</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic font-medium">
                            "{details?.bio || 'Dedicated to preserving traditional cultivation methods for superior nutritional integrity.'}"
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            className="flex-grow py-5 bg-agri-dark dark:bg-white text-white dark:text-agri-dark rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-premium"
                            onClick={() => window.location.href = `tel:${details?.phone}`}
                        >
                            Connect Directly
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const PriceAnalysisModal = ({ crop, onClose }) => {
    if (!crop) return null;
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-agri-dark/80 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white dark:bg-slate-900 rounded-[3.5rem] overflow-hidden shadow-premium max-w-md w-full relative p-10 border border-white/10"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-8 right-8 p-2 text-gray-400 hover:text-agri-dark dark:hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-agri-primary/10 dark:bg-agri-primary/20 rounded-3xl flex items-center justify-center text-agri-primary mx-auto mb-6">
                        <TrendingUp size={40} />
                    </div>
                    <h3 className="text-3xl font-display font-black text-agri-dark dark:text-white uppercase tracking-tighter">Value Audit</h3>
                    <p className="text-sm font-bold text-agri-primary/60 tracking-widest uppercase mt-2">{crop.name}</p>
                </div>

                <div className="space-y-8 mb-10">
                    <div className="relative group">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Regional Mandi</span>
                            <span className="text-sm font-black text-gray-500">{crop.mandiPrice}</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-300 dark:bg-slate-700 w-[40%]" />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="flex justify-between items-end mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-agri-primary uppercase tracking-widest">Producer Price</span>
                                <div className="px-1.5 py-0.5 bg-agri-primary/10 text-agri-primary rounded text-[8px] font-black">HIGH YIELD</div>
                            </div>
                            <span className="text-2xl font-black text-agri-primary leading-none transition-transform group-hover:scale-110">{crop.price}</span>
                        </div>
                        <div className="h-4 bg-agri-primary/10 rounded-full overflow-hidden border border-agri-primary/20 p-0.5">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '68%' }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-agri-primary rounded-full shadow-glow" 
                            />
                        </div>
                        <p className="text-[10px] text-agri-primary font-black mt-2 tracking-tighter uppercase italic">+32% More Direct Profit for {farmerName(crop.farmer)}</p>
                    </div>

                    <div className="relative">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Typical Retail</span>
                            <span className="text-sm font-black text-gray-500">{crop.retailPrice}</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500/20 w-[92%]" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-agri-primary dark:bg-agri-primary text-white rounded-3xl text-center shadow-glow">
                    <p className="text-xs font-black uppercase tracking-[0.2em] mb-1">Impact Rating: Superior</p>
                    <p className="text-[10px] font-medium opacity-80">Removing middlemen creates a sustainable profit loop.</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const LoginRequiredModal = ({ onClose, onLogin }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-agri-dark/90 backdrop-blur-2xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white dark:bg-slate-950 rounded-[4rem] overflow-hidden shadow-2xl max-w-md w-full relative p-12 border border-agri-primary/20"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-10 right-10 p-2 text-gray-400 hover:text-rose-500 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-10">
                    <div className="w-24 h-24 bg-agri-primary/10 rounded-[2.5rem] flex items-center justify-center text-agri-primary mx-auto mb-8 relative">
                        <div className="absolute inset-0 bg-agri-primary/20 blur-2xl rounded-full" />
                        <LogIn size={48} className="relative z-10" />
                    </div>
                    <h3 className="text-4xl font-display font-black text-agri-dark dark:text-white uppercase tracking-tighter mb-4">Authentication Required</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        To maintain direct traceability and secure fair farmer payments, you must be logged into your AgriConnect account to complete this purchase.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={onLogin}
                        className="w-full py-6 bg-agri-primary text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-glow hover:scale-[1.03] active:scale-95 transition-all"
                    >
                        Sign In Now
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-6 bg-gray-50 dark:bg-slate-900 text-gray-400 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:text-gray-600 dark:hover:text-white transition-all"
                    >
                        Maybe Later
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};


const farmerName = (name) => name.split(' ')[0];

const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<Star key={i} size={10} className="text-agri-secondary fill-agri-secondary" />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<StarHalf key={i} size={10} className="text-agri-secondary fill-agri-secondary" />);
        } else {
            stars.push(<Star key={i} size={10} className="text-gray-300 dark:text-gray-700" />);
        }
    }
    return stars;
};

const CropCard = ({ crop, index }) => {
    const [phase, setPhase] = useState('initial');
    const [weight, setWeight] = useState(1);
    const [showFarmerModal, setShowFarmerModal] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const { user } = useContext(AuthContext);
    const { cart, addToCart } = useCart();
    const navigate = useNavigate();

    const isInCart = cart.some(item => item.id === crop.id);

    const stockAvailable = 15; 

    const handleAddToCart = () => {
        addToCart(crop, weight);
        setPhase('confirming');
    };

    const handleBuyNow = () => {
        setIsLoading(true);
        
        // Deliberate artificial delay for a "premium" weighted feel
        setTimeout(() => {
            setIsLoading(false);
            if (!user) {
                setShowLoginModal(true);
                return;
            }
            addToCart(crop, 1);
            navigate('/cart');
        }, 1000);
    };


    const handleLoginRedirect = () => {
        navigate('/login', { state: { from: '/cart' } });
    };

    const reset = () => {
        setPhase('initial');
        setWeight(1);
    };


    const weightOptions = crop.unit?.toLowerCase() === 'dozen' 
        ? [0.5, 1, 2] 
        : [0.5, 1, 2, 5];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-premium dark:shadow-none border border-gray-100 dark:border-slate-800 transition-all group flex flex-col h-full relative"
            >
                {/* Confirmation Popup */}
                <AnimatePresence>
                    {phase === 'confirming' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 bg-agri-primary/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center text-white"
                        >
                            <motion.div
                                initial={{ scale: 0.5, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-xl border border-white/20"
                            >
                                <Check size={40} className="text-white" strokeWidth={3} />
                            </motion.div>
                            <h4 className="text-2xl font-display font-black mb-1 leading-tight tracking-tighter">SUCCESSFULLY<br/>CARTED</h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 opacity-70">{weight} {crop.unit} of {crop.name}</p>
                            <div className="flex flex-col gap-3 w-full">
                                <button
                                    onClick={() => navigate('/cart')}
                                    className="w-full py-4 bg-white text-agri-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                                >
                                    Proceed to Cart
                                </button>
                                <button
                                    onClick={reset}
                                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-white/20"
                                >
                                    Continue Discovery
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Media Container - Clickable for details */}
                <div 
                    className="relative h-64 overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => navigate(`/product/${crop.id}`)}
                >
                    {/* Compact Rating Badge */}
                    <div className="absolute top-4 right-4 z-10 glass px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-premium border border-white/20">
                        <div className="flex items-center -space-x-0.5">
                            {renderStars(crop.rating)}
                        </div>
                        <span className="text-[10px] font-black text-agri-dark dark:text-white ml-0.5">{crop.rating}</span>
                    </div>
                    
                    {/* Professional Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        <div className="px-2 py-1 bg-agri-dark/80 backdrop-blur-md rounded-xl text-[7px] font-semibold text-white uppercase tracking-tight border border-white/10 shadow-lg flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            {stockAvailable} {crop.unit} IN STOCK
                        </div>
                        {crop.qualityMetrics?.organicCert && (
                             <div className="px-3 py-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl text-[8px] font-black text-agri-primary uppercase tracking-[0.1em] border border-agri-primary/20 shadow-lg flex items-center gap-2 max-w-[140px]">
                                <Award size={10} className="shrink-0" />
                                <span className="truncate">{crop.qualityMetrics.organicCert}</span>
                            </div>
                        )}
                    </div>



                    <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
                    
                    <div className="absolute inset-x-0 bottom-6 flex flex-col items-start justify-end pointer-events-none px-6">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="space-y-1.5 w-full"
                        >
                            <div className="flex flex-wrap items-center gap-2 max-w-full">
                                <span className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded text-[8px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">
                                    {crop.category}
                                </span>
                                <div className="w-1 h-1 bg-agri-primary rounded-full shrink-0" />
                                <span className="text-[9px] font-bold text-white/90 italic whitespace-nowrap">
                                    {crop.qualityMetrics?.freshnessScore} Freshness Score
                                </span>
                            </div>
                            <h3 className="text-lg lg:text-xl font-display font-black leading-[1.1] text-white uppercase tracking-tighter drop-shadow-lg">
                                {crop.name}
                            </h3>
                        </motion.div>
                    </div>
                </div>


                {/* Content Container - Premium Detailed Layout */}
                <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-gray-50/50 dark:to-slate-900/20">
                    
                    {/* Top Row: Price & Health */}
                    <div className="flex justify-between items-start mb-6 gap-3 flex-wrap">
                        <div className="flex-grow min-w-fit">
                             <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                                <span className="text-3xl font-display font-black text-agri-dark dark:text-white tracking-tighter">
                                    {crop.price}
                                </span>
                                {calculateSavings(crop.price, crop.retailPrice) && (
                                    <div className="flex flex-col justify-center shrink-0">
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] font-bold text-gray-400 line-through decoration-rose-500/30">
                                                {crop.retailPrice}
                                            </span>
                                            <span className="px-1 py-0.5 bg-rose-500/10 text-rose-500 rounded text-[6px] font-black uppercase tracking-wider">
                                                -{calculateSavings(crop.price, crop.retailPrice).percent}%
                                            </span>
                                        </div>
                                        <span className="text-[8px] font-bold text-gray-400 italic">
                                            / {crop.unit}
                                        </span>
                                    </div>
                                )}
                                {!calculateSavings(crop.price, crop.retailPrice) && (
                                    <span className="text-xs font-bold text-gray-400 italic mt-auto pb-0.5 shrink-0">
                                        / {crop.unit}
                                    </span>
                                )}
                            </div>
                            <p className="text-[10px] font-black text-agri-primary/60 uppercase tracking-widest">
                                Farm-Gate Pricing
                            </p>
                        </div>
                        {crop.nutrition?.healthBenefit && (
                             <div className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-[7px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-emerald-500/20 shadow-sm">
                                <HeartPulse size={10} strokeWidth={3} className="shrink-0" /> 
                                <span>{crop.nutrition.healthBenefit}</span>
                            </div>
                        )}
                    </div>

                    {/* Quick Nutrition & Purity Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                        {crop.qualityMetrics?.purity && (
                            <div className="px-2 py-0.5 bg-agri-primary/5 text-agri-primary rounded-lg text-[8px] font-bold flex items-center gap-1 border border-agri-primary/10 max-w-[130px]">
                                <Shield size={9} className="shrink-0" /> 
                                <span className="truncate">{crop.qualityMetrics.purity} Pure</span>
                            </div>
                        )}
                        {crop.nutrition?.vitamins?.slice(0, 2).map((v, i) => (
                            <div key={i} className="px-2 py-0.5 bg-blue-500/5 text-blue-500 rounded-lg text-[8px] font-bold flex items-center gap-1 border border-blue-500/10 max-w-[100px]">
                                <Zap size={9} className="shrink-0" /> 
                                <span className="truncate">{v}</span>
                            </div>
                        ))}
                    </div>

                    {/* Traceability Grid - The "Expert" section */}
                    <div className="grid grid-cols-2 gap-4 mb-8 p-5 bg-white dark:bg-slate-800/50 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-inner-premium relative overflow-hidden group/trace">
                         <div className="absolute top-0 right-0 p-3 text-agri-primary/10 group-hover/trace:text-agri-primary/20 transition-colors">
                            <Dna size={40} />
                         </div>
                         
                         <div className="space-y-1 relative z-10">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Harvested</p>
                            <div className="flex items-center gap-2">
                                <Sunrise size={12} className="text-amber-500" />
                                <span className="text-xs font-bold text-agri-dark dark:text-white">{crop.harvestDetails?.date || 'Refined'}</span>
                            </div>
                         </div>

                         <div className="space-y-1 relative z-10">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Soil Type</p>
                            <div className="flex items-center gap-2">
                                <Leaf size={12} className="text-emerald-500" />
                                <span className="text-xs font-bold text-agri-dark dark:text-white">{crop.harvestDetails?.soilType || 'Organic'}</span>
                            </div>
                         </div>

                         <div className="space-y-1 relative z-10">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Water Source</p>
                            <div className="flex items-center gap-2">
                                <Droplets size={12} className="text-blue-500" />
                                <span className="text-xs font-bold text-agri-dark dark:text-white">{crop.harvestDetails?.waterSource || 'Spring'}</span>
                            </div>
                         </div>

                         <div className="space-y-1 relative z-10">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Purity Score</p>
                            <div className="flex items-center gap-1">
                                <div className="h-1.5 w-16 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                     <div 
                                        className="h-full bg-agri-primary rounded-full shadow-glow" 
                                        style={{ width: `${(parseFloat(crop.qualityMetrics?.freshnessScore) || 9) * 10}%` }}
                                    />
                                </div>
                                <span className="text-[9px] font-black text-agri-primary opacity-70">A+</span>
                            </div>
                         </div>
                    </div>

                    {/* Delivery & Producer Interaction */}
                    <div className="space-y-4 mb-8 px-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-agri-primary/10 rounded-xl text-agri-primary">
                                    <Truck size={16} />
                                </div>
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                    Express by <span className="font-bold text-agri-dark dark:text-white">{getMockDeliveryDate()}</span>
                                </p>
                            </div>
                                                    </div>

                        <div 
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800/30 rounded-2xl border border-gray-100 dark:border-slate-800 cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-all border-dashed"
                            onClick={() => setShowFarmerModal(true)}
                        >
                            <div className="w-8 h-8 bg-agri-primary/10 rounded-lg flex items-center justify-center text-agri-primary shrink-0">
                                <User size={12} />
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Heritage Producer</p>
                                <p className="text-[10px] font-bold text-agri-dark dark:text-white">
                                    {crop.farmerDetails?.farmName || crop.farmer}
                                </p>
                            </div>
                            <ChevronRight size={12} className="ml-auto text-gray-300" />
                        </div>
                    </div>

                    {/* Professional Action Footer */}
                    <div className="mt-auto space-y-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                        <div className="flex items-center justify-between gap-2">
                             <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest group/secure min-w-0">
                                <div className="p-1 bg-blue-500/10 rounded-lg text-blue-500 group-hover/secure:bg-blue-500/20 transition-colors shrink-0">
                                    <ShieldCheck size={11} strokeWidth={3} />
                                </div>
                                <span className="truncate">Verified Transaction</span>
                             </div>
                             <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-slate-800/50 px-2 py-1 rounded-lg border border-gray-100/50 dark:border-slate-700/50 shrink-0">
                                <button 
                                    onClick={() => setWeight(Math.max(0.5, weight - 0.5))}
                                    className="text-gray-400 hover:text-agri-primary transition-colors"
                                >
                                    <Minus size={11} />
                                </button>
                                <span className="text-[9px] font-black text-agri-dark dark:text-white min-w-[3ch] text-center">{weight} {crop.unit}</span>
                                <button 
                                    onClick={() => setWeight(weight + 0.5)}
                                    className="text-gray-400 hover:text-agri-primary transition-colors"
                                >
                                    <Plus size={11} />
                                </button>
                             </div>
                        </div>

                        <button
                            onClick={isInCart ? () => navigate('/cart') : handleAddToCart}
                            className="w-full py-4 bg-gradient-to-r from-agri-primary to-emerald-700 hover:from-emerald-600 hover:to-agri-primary text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 shadow-glow flex items-center justify-center gap-2 group"
                        >
                            {isInCart ? <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /> : <ShoppingCart size={18} />}
                            {isInCart ? 'View in Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>

            </motion.div>

            <AnimatePresence>
                {showFarmerModal && <FarmerProfileModal farmer={crop} onClose={() => setShowFarmerModal(false)} />}
                {showPriceModal && <PriceAnalysisModal crop={crop} onClose={() => setShowPriceModal(false)} />}
                {showLoginModal && <LoginRequiredModal onClose={() => setShowLoginModal(false)} onLogin={handleLoginRedirect} />}
            </AnimatePresence>

        </>
    );
};

export default CropCard;
