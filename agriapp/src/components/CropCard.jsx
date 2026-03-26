import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, MapPin, Check, Zap, Plus, Minus, X, User, ShieldCheck, Phone, PhoneCall, Info, HeartPulse } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FarmerProfileModal = ({ farmer, onClose }) => {
    if (!farmer) return null;
    const details = farmer.farmerDetails;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl max-w-md w-full relative"
                onClick={e => e.stopPropagation()}
            >
                <div className="h-32 bg-agri-green relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="px-6 pb-8 -mt-12">
                    <div className="flex justify-between items-end mb-4">
                        <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-2xl p-1 shadow-lg border-4 border-white dark:border-gray-800">
                            <div className="w-full h-full bg-agri-light dark:bg-gray-600 rounded-xl flex items-center justify-center text-agri-green">
                                <User size={40} />
                            </div>
                        </div>
                        {details?.verified && (
                            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 mb-2 shadow-sm border-2 border-white">
                                <ShieldCheck size={14} />
                                Verified Farmer
                            </div>
                        )}
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{farmer.farmer}</h3>
                    <p className="text-agri-green font-bold text-sm mb-4 flex items-center gap-1">
                         <MapPin size={14} /> {farmer.location}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-600">
                            <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Experience</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{details?.experience || 'N/A'}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-600">
                            <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Farm Name</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{details?.farmName || 'Private Farm'}</p>
                        </div>
                    </div>

                    <div className="bg-agri-light/30 dark:bg-gray-700/30 p-4 rounded-2xl mb-6 border border-agri-green/10">
                        <p className="text-[10px] uppercase font-bold text-agri-green mb-2">Farmer's Story</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                            "{details?.bio || 'Passionate about farming and delivering fresh crops directly to your table.'}"
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600">
                            <div className="p-2 bg-agri-green/10 text-agri-green rounded-lg">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-500">Contact Number</p>
                                <p className="text-sm font-black text-gray-900 dark:text-white">{details?.phone || 'Hidden'}</p>
                            </div>
                        </div>
                        <button 
                            className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                            onClick={() => window.location.href = `tel:${details?.phone}`}
                        >
                            <PhoneCall size={20} />
                            Call Farmer Directly
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
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full relative p-8"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-agri-light dark:bg-gray-700 rounded-2xl flex items-center justify-center text-agri-green mx-auto mb-4">
                        <Zap size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Fair Price Analysis</h3>
                    <p className="text-sm text-gray-500 mt-1">Transparency for {crop.name}</p>
                </div>

                <div className="space-y-6 mb-8">
                    {/* Mandi Rate */}
                    <div className="relative">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Wholesale Mandi</span>
                            <span className="text-sm font-bold text-gray-500">{crop.mandiPrice}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-300 dark:bg-gray-600 w-[40%]" />
                        </div>
                    </div>

                    {/* AgriConnect Rate */}
                    <div className="relative">
                        <div className="flex justify-between items-end mb-1">
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-black text-agri-green uppercase tracking-wider">AgriConnect (Farmer Gets)</span>
                                <Check size={12} className="text-agri-green" />
                            </div>
                            <span className="text-lg font-black text-agri-green">{crop.price}</span>
                        </div>
                        <div className="h-3 bg-agri-green/10 rounded-full overflow-hidden border border-agri-green/20">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '65%' }}
                                className="h-full bg-agri-green" 
                            />
                        </div>
                        <p className="text-[10px] text-agri-green font-bold mt-1">Farmers earn ~30% more here!</p>
                    </div>

                    {/* Retail Rate */}
                    <div className="relative">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">City Retail Shops</span>
                            <span className="text-sm font-bold text-gray-500">{crop.retailPrice}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-red-400/30 w-[90%]" />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl text-center border border-gray-100 dark:border-gray-600">
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        🤝 A <span className="text-agri-green">Win-Win</span> for everyone.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">Higher profit for farmers, fresher crops for you.</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const healthMap = {
    'Vegetables': ["High in Fiber & Antioxidants", "Supports Digestive Health", "Natural Immune Booster"],
    'Fruits': ["Rich in Vit C & Potassium", "Natural Sugar (Low GI)", "Vitalizing Energy Source"],
    'Grains': ["Complex Carbs for Energy", "High in Essential Minerals", "Lowers Cholesterol Risk"],
    'Dairy': ["Superior Calcium Source", "Healthy Fats (A2 Milk)", "Muscular Recovery Protein"],
    'Subscription': ["Complete Weekly Nutrition", "Balanced Seasonal Diet", "Sustainable Sourcing"],
    'All': ["Traceable Origins", "Freshness Guarantee", "Fair Farmer Pricing"]
};

const ProductDetailModal = ({ crop, onClose, onAdd, weight, setWeight, weightOptions }) => {
    if (!crop) return null;
    const health = healthMap[crop.category] || healthMap['All'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl max-w-2xl w-full flex flex-col md:flex-row relative"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 p-2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Left: Image Section */}
                <div className="md:w-1/2 h-64 md:h-auto relative bg-gray-100 dark:bg-gray-900">
                    <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Right: Info Section */}
                <div className="md:w-1/2 p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-agri-green font-black uppercase tracking-widest text-[10px] py-1 px-3 bg-agri-green/10 rounded-full">
                            {crop.category}
                        </span>
                        {crop.isLiveValue && (
                            <span className="bg-red-500 text-white text-[8px] font-black uppercase px-2 py-1 rounded-md animate-pulse">LIVE</span>
                        )}
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                        {crop.name}
                    </h2>

                    <div className="flex items-baseline gap-2 mb-6">
                        <p className="text-3xl font-black text-agri-green">{crop.price}</p>
                        <p className="text-gray-400 font-bold text-sm">/ {crop.unit}</p>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                                <HeartPulse size={14} className="text-agri-green" />
                                Health Advantages
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                {health.map((h, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700">
                                        <Check size={14} className="text-agri-green" />
                                        {h}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 bg-agri-light/30 dark:bg-gray-700/30 rounded-2xl border border-agri-green/10">
                            <h3 className="text-xs font-black uppercase tracking-wider text-agri-green mb-2">Farmer's Story</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">
                                "{crop.farmerDetails?.bio || 'Passionate about farming and delivering fresh crops directly to your table.'}"
                            </p>
                            <p className="text-xs font-black text-gray-400 mt-4">— {crop.farmer}, {crop.location}</p>
                        </div>

                        <div>
                            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">Select Quantity</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {weightOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setWeight(opt)}
                                        className={`py-3 rounded-xl text-sm font-black transition-all ${
                                            weight === opt 
                                            ? 'bg-agri-green text-white shadow-lg ring-4 ring-agri-green/20' 
                                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-agri-green'
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onAdd}
                            className="flex-grow py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.25rem] font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/10"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const CropCard = ({ crop, index }) => {
    const [phase, setPhase] = useState('initial'); // 'initial', 'selecting', 'confirming'
    const [weight, setWeight] = useState(1);
    const [showFarmerModal, setShowFarmerModal] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Mock stock data for demonstration
    const stockAvailable = 15; 

    const handleAddToCart = () => {
        addToCart(crop, weight);
        setPhase('confirming');
        setShowDetailModal(false);
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 transition-all group flex flex-col h-full relative"
            >
                {/* Confirmation Popup Overlay */}
                <AnimatePresence>
                    {phase === 'confirming' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 bg-agri-green/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white"
                        >
                            <motion.div
                                initial={{ scale: 0.8, y: 10 }}
                                animate={{ scale: 1, y: 0 }}
                                className="bg-white/10 p-3 rounded-full mb-4"
                            >
                                <Check size={32} className="text-white" />
                            </motion.div>
                            <h4 className="text-xl font-bold mb-1">Added to Cart!</h4>
                            <p className="text-sm text-white/90 mb-6">{weight} {crop.unit} {crop.name}</p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => navigate('/cart')}
                                    className="flex-grow py-3 bg-white text-agri-green rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    View Cart
                                </button>
                                <button
                                    onClick={reset}
                                    className="flex-grow py-3 bg-agri-dark/30 hover:bg-agri-dark/50 text-white rounded-xl font-bold transition-colors border border-white/20"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative Image Container */}
                <div 
                    className="relative h-48 overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => setShowDetailModal(true)}
                >
                    <div className="absolute top-3 right-3 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm border border-gray-100 dark:border-gray-700">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-100">{crop.rating}</span>
                    </div>
                    {/* Stock Badge */}
                    <div className="absolute top-10 right-3 z-10 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-tighter shadow-xl">
                        {stockAvailable} {crop.unit} left
                    </div>
                    <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div 
                        className="flex justify-between items-start mb-2 gap-2 cursor-pointer"
                        onClick={() => setShowDetailModal(true)}
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-agri-green transition-colors">{crop.name}</h3>
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-agri-green dark:text-agri-yellow bg-agri-light/50 dark:bg-gray-700/50 px-2 py-1 rounded-md shrink-0 border border-agri-green/10">
                                {crop.category}
                            </span>
                            {crop.isLiveValue && (
                                <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-white bg-red-500 px-1.5 py-0.5 rounded-sm animate-pulse">
                                    <div className="w-1 h-1 bg-white rounded-full" />
                                    Live
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xl font-black text-gray-900 dark:text-white flex items-end gap-1">
                            {crop.price} <span className="text-sm text-gray-400 font-medium">/ {crop.unit}</span>
                        </p>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowPriceModal(true); }}
                            className="p-2 text-agri-green hover:bg-agri-green/10 rounded-full transition-colors group/price"
                            title="Why this price?"
                        >
                            <Info size={16} className="group-hover/price:scale-110 transition-transform" />
                        </button>
                    </div>

                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowFarmerModal(true); }}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4 hover:text-agri-green transition-colors w-fit group/farmer"
                    >
                        <div className="relative">
                            <User size={14} className="shrink-0 text-agri-green" />
                            {crop.farmerDetails?.verified && (
                                <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 border border-white">
                                    <ShieldCheck size={6} />
                                </div>
                            )}
                        </div>
                        <span className="truncate flex items-center gap-1 underline decoration-transparent group-hover/farmer:decoration-agri-green transition-all underline-offset-4 font-medium">
                            {crop.farmer} • {crop.location.split(',')[0]}
                            <Info size={12} className="opacity-0 group-hover/farmer:opacity-100 transition-opacity" />
                        </span>
                    </button>

                    <div className="mt-auto">
                        {phase === 'selecting' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 border border-agri-green/20"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Select Weight</label>
                                    <button onClick={(e) => { e.stopPropagation(); reset(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-4 gap-2 mb-4">
                                    {weightOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={(e) => { e.stopPropagation(); setWeight(opt); }}
                                            className={`py-2 rounded-lg text-xs font-bold transition-all ${
                                                weight === opt 
                                                ? 'bg-agri-green text-white shadow-sm ring-2 ring-agri-green/20' 
                                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-agri-green'
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                                    className="w-full py-4 bg-agri-green text-white rounded-xl font-bold hover:bg-agri-dark transition-all shadow-lg active:scale-95"
                                >
                                    Confirm {weight} {crop.unit}
                                </button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setPhase('selecting'); }}
                                    className="flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl font-black text-xs uppercase tracking-tighter transition-all"
                                >
                                    <ShoppingCart size={18} />
                                    Add
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); addToCart(crop, 1); navigate('/cart'); }}
                                    className="flex items-center justify-center gap-2 py-3 bg-agri-green hover:bg-agri-dark text-white rounded-xl font-black text-xs uppercase tracking-tighter transition-all shadow-md shadow-agri-green/20"
                                >
                                    <Zap size={18} className="fill-white" />
                                    Buy Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            <AnimatePresence>
                {showFarmerModal && (
                    <FarmerProfileModal 
                        farmer={crop} 
                        onClose={() => setShowFarmerModal(false)} 
                    />
                )}
                {showPriceModal && (
                    <PriceAnalysisModal
                        crop={crop}
                        onClose={() => setShowPriceModal(false)}
                    />
                )}
                {showDetailModal && (
                    <ProductDetailModal
                        crop={crop}
                        weight={weight}
                        setWeight={setWeight}
                        weightOptions={weightOptions}
                        onAdd={handleAddToCart}
                        onClose={() => setShowDetailModal(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default CropCard;
