/**
 * CropCard.jsx - Premium AgriTech UI Card
 * Handles product display, floating badges, and high-end interaction modals.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Star, MapPin, Check, Zap, Plus, Minus, 
  X, User, ShieldCheck, Phone, PhoneCall, Info, HeartPulse, 
  TrendingUp, BarChart3, Globe, Sparkles 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

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

const farmerName = (name) => name.split(' ')[0];

const CropCard = ({ crop, index }) => {
    const [phase, setPhase] = useState('initial');
    const [weight, setWeight] = useState(1);
    const [showFarmerModal, setShowFarmerModal] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const stockAvailable = 15; 

    const handleAddToCart = () => {
        addToCart(crop, weight);
        setPhase('confirming');
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

                {/* Media Container */}
                <div className="relative h-64 overflow-hidden shrink-0">
                    <div className="absolute top-5 right-5 z-10 glass dark:bg-slate-900/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-premium border border-white/20">
                        <Star size={14} className="text-agri-secondary fill-agri-secondary" />
                        <span className="text-[10px] font-black text-agri-dark dark:text-white">{crop.rating}</span>
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
                            onClick={() => setShowPriceModal(true)}
                            className="p-3 glass dark:bg-slate-900/80 text-white hover:text-agri-primary rounded-2xl transition-all border border-white/20 shadow-premium"
                        >
                            <BarChart3 size={18} />
                        </button>
                    </div>
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-display font-black text-agri-dark dark:text-white tracking-tighter">{crop.price}</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">/ {crop.unit}</span>
                        </div>
                        <button 
                            onClick={() => setShowFarmerModal(true)}
                            className="flex items-center gap-3 p-1.5 pr-4 glass dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-agri-primary transition-all group/farmer"
                        >
                            <div className="w-8 h-8 bg-agri-primary/10 rounded-xl flex items-center justify-center text-agri-primary">
                                <User size={16} />
                            </div>
                            <div className="text-left">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Producer</p>
                                <p className="text-[10px] font-bold text-agri-dark dark:text-white leading-none truncate max-w-[80px]">{farmerName(crop.farmer)}</p>
                            </div>
                        </button>
                    </div>

                    <div className="mt-auto">
                        {phase === 'selecting' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass dark:bg-slate-800 rounded-3xl p-5 border-agri-primary/20"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">SET QUANTITY</label>
                                    <button onClick={reset} className="text-gray-400 hover:text-rose-500 transition-colors">
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-4 gap-2 mb-4">
                                    {weightOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setWeight(opt)}
                                            className={`py-3 rounded-xl text-xs font-black transition-all ${
                                                weight === opt 
                                                ? 'bg-agri-primary text-white shadow-glow' 
                                                : 'bg-white dark:bg-slate-900 text-gray-500 border border-gray-100 dark:border-slate-700 hover:border-agri-primary'
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-4 bg-agri-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-glow active:scale-95 transition-all"
                                >
                                    Confirm +{weight} {crop.unit}
                                </button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setPhase('selecting')}
                                    className="flex items-center justify-center gap-3 py-4 glass dark:bg-slate-800 hover:bg-agri-primary/5 text-agri-dark dark:text-white border border-gray-100 dark:border-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                                >
                                    <Plus size={16} /> Add
                                </button>
                                <button
                                    onClick={() => { addToCart(crop, 1); navigate('/cart'); }}
                                    className="flex items-center justify-center gap-3 py-4 bg-agri-primary hover:bg-emerald-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-glow"
                                >
                                    <Zap size={16} className="fill-white" /> Buy
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {showFarmerModal && <FarmerProfileModal farmer={crop} onClose={() => setShowFarmerModal(false)} />}
                {showPriceModal && <PriceAnalysisModal crop={crop} onClose={() => setShowPriceModal(false)} />}
            </AnimatePresence>
        </>
    );
};

export default CropCard;
