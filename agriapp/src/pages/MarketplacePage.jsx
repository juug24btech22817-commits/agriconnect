import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Activity, HeartPulse, Sparkles, Zap } from 'lucide-react';
import CropCard from '../components/CropCard';
import DeliveryOptions from '../components/DeliveryOptions';

// The following data represents the core product catalog for the marketplace.
// Each crop contains pricing, farmer info, and local image paths.
const initialCropsData = [
    { 
        id: 101, name: 'Farmer’s Choice Box (Small)', category: 'Subscription', price: '₹499', unit: 'box', 
        farmer: 'AgriConnect Curated', location: 'Multiple Farms', rating: '4.9', 
        image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1000',
        mandiPrice: '₹350', retailPrice: '₹650',
        farmerDetails: {
            phone: '+91 00000 00000',
            bio: 'A curated mix of 5kg seasonal vegetables, harvested fresh from local organic farms.',
            verified: true,
            experience: 'Curated by Experts',
            farmName: 'AgriConnect Hub'
        }
    },

    { 
        id: 1, name: 'Alphonso Mangoes', category: 'Fruits', price: '₹800', unit: 'kg', 
        farmer: 'Ramesh Rao', location: 'Ratnagiri, Maharashtra', rating: '5.0', 
        image: '/images/crops/alphonso_mangoes_1773328054659.png',
        mandiPrice: '₹550', retailPrice: '₹1200',
        farmerDetails: {
            phone: '+91 98765 43210',
            bio: 'Traditional mango cultivator for 3 generations. Uses organic organic ripening methods.',
            verified: true,
            experience: '25 years',
            farmName: 'Ratnagiri Estates'
        }
    },
    { 
        id: 2, name: 'Basmati Rice (Organic)', category: 'Grains', price: '₹120', unit: 'kg', 
        farmer: 'Gurdeep Singh', location: 'Amritsar, Punjab', rating: '4.9', 
        image: '/images/crops/basmati_rice_organic_1773328180216.png',
        mandiPrice: '₹85', retailPrice: '₹180',
        farmerDetails: {
            phone: '+91 87654 32109',
            bio: 'Specialist in organic Basmati cultivation. Focused on soil health and sustainability.',
            verified: true,
            experience: '15 years',
            farmName: 'Punjab Harvest'
        }
    },
    { 
        id: 3, name: 'Fresh Tomatoes', category: 'Vegetables', price: '₹40', unit: 'kg', 
        farmer: 'Venkatesh K.', location: 'Kolar, Karnataka', rating: '4.8', 
        image: '/images/crops/fresh_tomatoes_1773328278118.png',
        mandiPrice: '₹22', retailPrice: '₹65',
        farmerDetails: {
            phone: '+91 76543 21098',
            bio: 'Passionate vegetable grower using drip irrigation for water conservation.',
            verified: true,
            experience: '8 years',
            farmName: 'Golden Fields'
        }
    },
    { 
        id: 4, name: 'Organic Carrots', category: 'Vegetables', price: '₹50', unit: 'kg', 
        farmer: 'Anjali Devi', location: 'Ooty, Tamil Nadu', rating: '4.7', 
        image: '/images/crops/organic_carrots_bunch_fresh_premium_1773328341539.png',
        mandiPrice: '₹30', retailPrice: '₹85',
        farmerDetails: {
            phone: '+91 65432 10987',
            bio: 'Cultivating high-altitude root vegetables without synthetic pesticides.',
            verified: true,
            experience: '12 years',
            farmName: 'Nilgiri Farms'
        }
    },
    { 
        id: 5, name: 'Red Beetroot', category: 'Vegetables', price: '₹45', unit: 'kg', 
        farmer: 'Sunil Sharma', location: 'Shimla, Himachal', rating: '4.6', 
        image: '/images/crops/red_beetroot_fresh_premium_1773328361352.png',
        mandiPrice: '₹28', retailPrice: '₹75',
        farmerDetails: {
            phone: '+91 54321 09876',
            bio: 'Grows hardy vegetable varieties adapted to the Himalayan climate.',
            verified: false,
            experience: '10 years',
            farmName: 'Hillside Organic'
        }
    },
    { 
        id: 6, name: 'Round Brinjal', category: 'Vegetables', price: '₹35', unit: 'kg', 
        farmer: 'Prasad Babu', location: 'Chittoor, Andhra Pradesh', rating: '4.5', 
        image: '/images/crops/round_brinjal_eggplant_premium_shot_1773328572152.png',
        mandiPrice: '₹20', retailPrice: '₹55',
        farmerDetails: {
            phone: '+91 43210 98765',
            bio: 'Expert in native seed saving and mixed cropping patterns.',
            verified: true,
            experience: '20 years',
            farmName: 'Valley Harvest'
        }
    },
    { 
        id: 7, name: 'Crisp Cucumber', category: 'Vegetables', price: '₹30', unit: 'kg', 
        farmer: 'Rajesh Kumar', location: 'Panipat, Haryana', rating: '4.7', 
        image: '/images/crops/crisp_cucumber.png',
        mandiPrice: '₹14', retailPrice: '₹45',
        farmerDetails: {
            phone: '+91 32109 87654',
            bio: 'Using greenhouse technology for year-round fresh cucumber supply.',
            verified: true,
            experience: '6 years',
            farmName: 'Green Valley'
        }
    },
    { 
        id: 8, name: 'Fresh Ridge Gourd', category: 'Vegetables', price: '₹40', unit: 'kg', 
        farmer: 'Mallayya Reddy', location: 'Medak, Telangana', rating: '4.6', 
        image: '/images/crops/fresh_ridge_gourd.png',
        mandiPrice: '₹22', retailPrice: '₹60',
        farmerDetails: {
            phone: '+91 21098 76543',
            bio: 'Traditional farmer specializing in trellis-grown gourds and leafy greens.',
            verified: true,
            experience: '30 years',
            farmName: 'Deccan Greens'
        }
    },
    { id: 9, name: 'Nagpur Oranges', category: 'Fruits', price: '₹60', unit: 'kg', farmer: 'Orange City Orchards', location: 'Maharashtra, India', rating: '4.8', image: '/images/crops/nagpur_oranges.png', mandiPrice: '₹35', retailPrice: '₹95' },
    { id: 10, name: 'Finger Millet (Ragi)', category: 'Grains', price: '₹45', unit: 'kg', farmer: 'Deccan Roots', location: 'Karnataka, India', rating: '4.7', image: '/images/crops/finger_millet_ragi.png', mandiPrice: '₹32', retailPrice: '₹75' },
    { id: 11, name: 'Hybrid Red Onions', category: 'Vegetables', price: '₹35', unit: 'kg', farmer: 'Nashik Valley Farms', location: 'Maharashtra, India', rating: '4.6', image: '/images/crops/red_onions.png', mandiPrice: '₹18', retailPrice: '₹55' },
    { id: 12, name: 'Sona Masuri Rice', category: 'Grains', price: '₹55', unit: 'kg', farmer: 'Tungabhadra Farms', location: 'Raichur, Karnataka', rating: '4.8', image: '/images/crops/samba_masuri_rice.png', mandiPrice: '₹38', retailPrice: '₹85' },
    { id: 13, name: 'Byadgi Red Chillies', category: 'Vegetables', price: '₹220', unit: 'kg', farmer: 'Haveri Spice Co', location: 'Haveri, Karnataka', rating: '4.9', image: '/images/crops/red_chilli.png', mandiPrice: '₹160', retailPrice: '₹320' },
    { id: 14, name: 'Chikkamagaluru Arabica', category: 'Grains', price: '₹550', unit: 'kg', farmer: 'Baba Budangiri Estates', location: 'Chikkamagaluru, Karnataka', rating: '4.9', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop', mandiPrice: '₹380', retailPrice: '₹750' },
    { id: 15, name: 'Mysore Nanjangud Bananas', category: 'Fruits', price: '₹70', unit: 'kg', farmer: 'Srirangapatna Orchards', location: 'Mysore, Karnataka', rating: '5.0', image: '/images/crops/nanjangud_banana.png', mandiPrice: '₹45', retailPrice: '₹110' },
    { 
        id: 16, name: 'Organic Potatoes', category: 'Vegetables', price: '₹30', unit: 'kg', 
        farmer: 'Sandeep Hedge', location: 'Hassan, Karnataka', rating: '4.7', 
        image: '/images/crops/fresh_potatoes_organic.png',
        mandiPrice: '₹18', retailPrice: '₹50',
        farmerDetails: {
            phone: '+91 91234 56789',
            bio: 'Specialist in soil-grown tubers. Our potatoes are rich in starch and free from heavy chemicals.',
            verified: true,
            experience: '18 years',
            farmName: 'Hassan Roots'
        }
    },
];

const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Subscription'];

const categoryData = {
    'All': { 
        title: "Full Harvest", 
        tagline: "Total transparency, direct from the source.",
        description: "Browse our entire collection of fresh produce from verified Indian farmers. From the hills of Shimla to the fields of Kolar.",
        benefit: "Verified Farmers Only",
        health: ["Traceable Origins", "Freshness Guarantee", "Fair Farmer Pricing"]
    },
    'Vegetables': { 
        title: "Vital Vegetables", 
        tagline: "Harvested at peak nutrition.",
        description: "Grown using sustainable methods and delivered within 24 hours of harvest to ensure maximum crunch and vitamin retention.",
        benefit: "24h Farm-to-Table",
        health: ["High in Fiber & Antioxidants", "Supports Digestive Health", "Natural Immune Booster"]
    },
    'Fruits': { 
        title: "Sun-Ripened Fruits", 
        tagline: "100% Naturally Ripened.",
        description: "Our fruits are allowed to ripen on the tree/vine, resulting in superior sweetness and flavor without toxic ripening agents.",
        benefit: "Chemical-Free Ripening",
        health: ["Rich in Vit C & Potassium", "Natural Sugar (Low GI)", "Vitalizing Energy Source"]
    },
    'Grains': { 
        title: "Golden Grains", 
        tagline: "India's heritage harvests.",
        description: "Sourcing premium Basmati and ancient millets (Ragi, Bajra) directly from Punjab and Deccan cooperatives.",
        benefit: "GI Tagged Varieties",
        health: ["Complex Carbs for Energy", "High in Essential Minerals", "Lowers Cholesterol Risk"]
    },
    'Dairy': { 
        title: "Pure Dairy", 
        tagline: "Pure, local, and fresh.",
        description: "Working with local cooperatives to bring you fresh A2 milk and artisanal dairy products. (Expansion in progress).",
        benefit: "Cooperative Sourced",
        health: ["Superior Calcium Source", "Healthy Fats (A2 Milk)", "Muscular Recovery Protein"]
    },
    'Subscription': { 
        title: "Box Subscriptions", 
        tagline: "Affordable healthy living.",
        description: "The most convenient way to get a balanced variety of seasonal produce delivered weekly. Curated by nutrition experts.",
        benefit: "Save up to 30%",
        health: ["Complete Weekly Nutrition", "Balanced Seasonal Diet", "Sustainable Sourcing"]
    }
};

/**
 * Mapping between local product names and Agmarknet API commodity names.
 * This is used to align live prices with the correct marketplace products.
 */
const commodityMapping = {
    'Alphonso Mangoes': 'Mango',
    'Basmati Rice (Organic)': 'Rice',
    'Fresh Tomatoes': 'Tomato',
    'Organic Carrots': 'Carrot',
    'Red Beetroot': 'Beetroot',
    'Round Brinjal': 'Brinjal',
    'Crisp Cucumber': 'Cucumber',
    'Fresh Ridge Gourd': 'Ridgeguard(Turai)',
    'Nagpur Oranges': 'Orange',
    'Finger Millet (Ragi)': 'Ragi (Finger Millet)',
    'Hybrid Red Onions': 'Onion',
    'Sona Masuri Rice': 'Rice',
    'Byadgi Red Chillies': 'Chilli Red',
    'Chikkamagaluru Arabica': 'Coffee',
    'Mysore Nanjangud Bananas': 'Banana',
    'Organic Potatoes': 'Potato'
};

const MarketplacePage = () => {
    const [crops, setCrops] = useState(initialCropsData);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const fetchLivePrices = async () => {
            const apiKey = import.meta.env.VITE_AGMARKNET_API_KEY;
            
            try {
                let data;
                if (apiKey) {
                    const response = await fetch(`https://api.data.gov.in/resource/9ef2731d-a65a-4a31-adb9-ad830832d57c?api-key=${apiKey}&format=json&limit=100`);
                    data = await response.json();
                } else {
                    // Demo Mode: Fetch from local mock file
                    const response = await fetch('/data/mock_mandi_prices.json');
                    data = await response.json();
                }
                
                if (data.records && data.records.length > 0) {
                    const latestPrices = {};
                    data.records.forEach(record => {
                        // Keep the highest (modal) price found for each commodity
                        if (!latestPrices[record.commodity] || parseInt(record.modal_price) > parseInt(latestPrices[record.commodity].modal_price)) {
                            latestPrices[record.commodity] = record;
                        }
                    });

                    const updatedCrops = crops.map(crop => {
                        const apiCommodity = commodityMapping[crop.name];
                        if (apiCommodity && latestPrices[apiCommodity]) {
                            const marketPrice = parseInt(latestPrices[apiCommodity].modal_price);
                            return {
                                ...crop,
                                mandiPrice: `₹${marketPrice}`,
                                retailPrice: `₹${Math.round(marketPrice * 1.6)}`, // Typical 60% retail markup
                                isLiveValue: true
                            };
                        }
                        return crop;
                    });

                    setCrops(updatedCrops);
                    setIsLive(true);
                }
            } catch (error) {
                console.error("Failed to fetch live prices:", error);
            }
        };

        fetchLivePrices();
    }, []);

    const filteredCrops = crops.filter(crop => {
        const matchesCategory = activeCategory === 'All' || crop.category === activeCategory;
        const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crop.farmer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Derive category info from static categoryData mapping
    const activeInfo = categoryData[activeCategory];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-8 pb-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Strings */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Fresh Marketplace</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Buy directly from Indian farmers. Freshness guaranteed.</p>
                    </div>
                    {isLive && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-agri-green/10 border border-agri-green/20 rounded-2xl w-fit self-center md:self-auto shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agri-green opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-agri-green"></span>
                            </span>
                            <span className="text-xs font-black text-agri-green uppercase tracking-widest">
                                Live Market Prices Active
                            </span>
                        </div>
                    )}
                </div>

                {/* Delivery & Logistics Info */}
                <DeliveryOptions />

                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-4 bg-white dark:bg-gray-800 border-none rounded-2xl text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-agri-green sm:text-lg transition-all"
                            placeholder="Search for crops, farmers, or states..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button onClick={() => setIsFiltersOpen(true)} className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-4 rounded-2xl shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                        <SlidersHorizontal size={20} />
                        Filters
                    </button>
                </div>

                {/* Category Pills */}
                <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-6 pb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${activeCategory === category
                                ? 'bg-agri-green text-white shadow-md shadow-agri-green/30'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-agri-green hover:text-agri-green dark:hover:text-agri-yellow'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Category Information Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mb-10 p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl shadow-agri-green/5 relative overflow-hidden"
                    >
                        {/* Decorative Background Icon */}
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-agri-green/5 dark:bg-agri-green/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                            <div className="max-w-xl text-left">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-agri-green font-black uppercase tracking-widest text-[10px] py-1 px-3 bg-agri-green/10 rounded-full">
                                        Market Insight
                                    </span>
                                    <span className="text-gray-400 text-xs">•</span>
                                    <span className="text-gray-500 dark:text-gray-400 font-bold text-[10px] uppercase">
                                        {activeCategory}
                                    </span>
                                </div>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                                    {activeInfo.title} <span className="text-agri-green">.</span>
                                </h2>
                                <p className="text-agri-green font-black text-base mb-4">
                                    {activeInfo.tagline}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base italic">
                                    "{activeInfo.description}"
                                </p>
                            </div>
                            
                            <div className="flex-grow flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 p-6 bg-agri-light dark:bg-gray-700/50 rounded-2xl border border-agri-green/10 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-agri-green/20 text-agri-green rounded-lg">
                                            <HeartPulse size={20} />
                                        </div>
                                        <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-xs">Health Advantages</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {activeInfo.health.map((h, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                                                <div className="w-1.5 h-1.5 bg-agri-green rounded-full shadow-[0_0_5px_rgba(46,125,50,0.5)]" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="shrink-0 p-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl flex flex-col items-center justify-center text-center">
                                    <Sparkles size={24} className="text-agri-yellow dark:text-agri-green mb-2" />
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Top Promise</p>
                                    <p className="text-lg font-black tracking-tighter leading-tight">
                                        {activeInfo.benefit}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Product Grid */}
                {filteredCrops.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredCrops.map((crop, index) => (
                                <CropCard key={crop.id} crop={crop} index={index} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                        <div className="text-gray-400 mb-4 flex justify-center"><Search size={48} /></div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No crops found</h3>
                        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                            className="mt-6 text-agri-green hover:text-agri-dark font-medium underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

            </div>


            {/* Filters Modal */}
            <AnimatePresence>
                {isFiltersOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden relative"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold dark:text-white text-gray-900">Filters</h2>
                                <button onClick={() => setIsFiltersOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6 space-y-6 text-left">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
                                    <div className="flex items-center gap-4">
                                        <input type="number" placeholder="Min ₹" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-agri-green" />
                                        <span className="text-gray-400">-</span>
                                        <input type="number" placeholder="Max ₹" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-agri-green" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Minimum Rating</h3>
                                    <select className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-agri-green">
                                        <option>Any rating</option>
                                        <option>4 Stars & Up</option>
                                        <option>4.5 Stars & Up</option>
                                    </select>
                                </div>
                                <div className="pt-2">
                                    <button onClick={() => { setIsFiltersOpen(false); alert('Filters applied!'); }} className="w-full bg-agri-green text-white font-bold py-3 rounded-lg hover:bg-agri-dark transition-colors shadow-md shadow-agri-green/20">
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MarketplacePage;
