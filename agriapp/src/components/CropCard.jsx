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
  Truck, Lock, Package, ChevronDown
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
    const { addToCart } = useCart();
    const navigate = useNavigate();

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
                    <div className="absolute top-5 right-5 z-10 glass dark:bg-slate-900/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-premium border border-white/20">
                        <div className="flex items-center -space-x-0.5">
                            {renderStars(crop.rating)}
                        </div>
                        <span className="text-[10px] font-black text-agri-dark dark:text-white ml-0.5">{crop.rating}</span>
                    </div>
                    <div className="absolute top-5 left-5 z-10 px-3 py-1.5 bg-agri-dark/60 backdrop-blur-md rounded-xl text-[8px] font-black text-white uppercase tracking-widest border border-white/10 shadow-xl">
                        {stockAvailable} {crop.unit} IN STOCK
                    </div>
                    <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                        <div className="text-white">
                             <div className="flex items-center gap-1 mb-1">
                                <div className="w-1 h-1 bg-agri-primary rounded-full animate-pulse" />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-80">{crop.category}</span>
                             </div>
                             <h3 className="text-xl font-display font-black leading-none uppercase tracking-tighter">{crop.name}</h3>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowPriceModal(true); }}
                            className="p-3 glass dark:bg-slate-900/80 text-white hover:text-agri-primary rounded-2xl transition-all border border-white/20 shadow-premium"
                        >
                            <BarChart3 size={18} />
                        </button>
                    </div>
                </div>


                {/* Content Container - Amazon Inspired Detailed Layout */}
                <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-transparent to-gray-50/30 dark:to-slate-900/10">
                    
                    {/* Price & Unit Breakdown */}
                    <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl font-display font-black text-agri-dark dark:text-white tracking-tighter">
                                {crop.price}
                            </span>
                            <span className="text-sm font-bold text-gray-400">
                                ({crop.price} / {crop.unit})
                            </span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Inclusive of all taxes
                        </p>
                    </div>

                    {/* Delivery & Location */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                            <Truck size={18} className="text-agri-primary shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <span className="text-emerald-600 dark:text-agri-primary font-bold">FREE delivery</span> <span className="font-bold">{getMockDeliveryDate()}</span>
                                </p>
                                <button className="text-[10px] font-black text-agri-primary uppercase tracking-widest hover:underline text-left">
                                    Details
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                            <MapPin size={16} className="shrink-0" />
                            <p className="text-xs font-medium truncate">
                                Delivering to <span className="font-bold text-agri-dark dark:text-white">Bengaluru 560001</span>
                            </p>
                            <button className="text-[10px] font-black text-agri-primary uppercase tracking-widest ml-auto">Update</button>
                        </div>

                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                             <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">In Stock</span>
                        </div>
                    </div>

                    {/* Fulfillment & Security */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-8 py-6 border-y border-gray-100 dark:border-slate-800">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Delivered by</p>
                            <p className="text-xs font-bold text-agri-dark dark:text-white flex items-center gap-1.5">
                                <Package size={12} className="text-agri-primary" /> AgriConnect
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Sold by</p>
                            <p className="text-xs font-bold text-agri-dark dark:text-white truncate max-w-full">
                                {crop.farmerDetails?.farmName || crop.farmer}
                            </p>
                        </div>
                        <div className="col-span-2 mt-2 pt-2 border-t border-gray-50 dark:border-slate-800/50">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 dark:text-gray-400">
                                <Lock size={12} className="text-agri-secondary" />
                                <span className="uppercase tracking-widest">Secure transaction</span>
                             </div>
                        </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="mt-auto space-y-4">
                        <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Quantity</span>
                             <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setWeight(Math.max(0.5, weight - 0.5))}
                                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-gray-500 transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="text-sm font-black text-agri-dark dark:text-white min-w-[2ch] text-center">{weight}</span>
                                <button 
                                    onClick={() => setWeight(weight + 0.5)}
                                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-gray-500 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-5 bg-white dark:bg-slate-800 text-agri-dark dark:text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] border border-gray-200 dark:border-slate-700 hover:border-agri-primary transition-all shadow-sm"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={isLoading}
                                className="w-full py-5 bg-agri-primary hover:bg-emerald-700 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-glow flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 size={18} className="animate-spin text-white" />
                                ) : (
                                    <Zap size={18} className="fill-white" />
                                )}
                                {isLoading ? 'Processing...' : 'Buy Now'}
                            </button>
                        </div>
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
