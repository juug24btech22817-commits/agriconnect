import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Activity, HeartPulse, Sparkles, Zap, ShoppingBag, Filter, LayoutGrid } from 'lucide-react';
import CropCard from '../components/CropCard';
import DeliveryOptions from '../components/DeliveryOptions';
import { api } from '../services/api';

// Fallback data if backend is not available
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
        id: 5, name: 'Nagpur Oranges', category: 'Fruits', price: '₹60', unit: 'kg', 
        farmer: 'Sanjay Deshmukh', location: 'Nagpur, Maharashtra', rating: '4.8', 
        image: '/images/crops/nagpur_oranges.png',
        mandiPrice: '₹42', retailPrice: '₹95',
        farmerDetails: {
            phone: '+91 54321 09876',
            bio: 'Specializing in GI-tagged Nagpur Santra. 100% natural and juicy.',
            verified: true,
            experience: '20 years',
            farmName: 'Orange Valley'
        }
    },
    { 
        id: 6, name: 'Nanjangud Banana', category: 'Fruits', price: '₹45', unit: 'dozen', 
        farmer: 'Shivanna M.', location: 'Mysuru, Karnataka', rating: '4.9', 
        image: '/images/crops/nanjangud_banana.png',
        mandiPrice: '₹28', retailPrice: '₹70',
        farmerDetails: {
            phone: '+91 43210 98765',
            bio: 'Preserving the unique flavor of the protected Nanjangud Rasabale banana.',
            verified: true,
            experience: '30 years',
            farmName: 'Heritage Groves'
        }
    },
    { 
        id: 7, name: 'Organic Potatoes', category: 'Vegetables', price: '₹30', unit: 'kg', 
        farmer: 'Lokesh Gowda', location: 'Hassan, Karnataka', rating: '4.6', 
        image: '/images/crops/fresh_potatoes_organic.png',
        mandiPrice: '₹18', retailPrice: '₹50',
        farmerDetails: {
            phone: '+91 32109 87654',
            bio: 'Bulk producer of high-starch organic potatoes. Preferred for high-end restaurants.',
            verified: true,
            experience: '10 years',
            farmName: 'Hassan Greens'
        }
    },
    { 
        id: 8, name: 'Red Onions', category: 'Vegetables', price: '₹35', unit: 'kg', 
        farmer: 'Prakash Patil', location: 'Nasik, Maharashtra', rating: '4.7', 
        image: '/images/crops/red_onions.png',
        mandiPrice: '₹20', retailPrice: '₹60',
        farmerDetails: {
            phone: '+91 21098 76543',
            bio: 'Leading supplier of export-quality Nasik onions. Long shelf-life guaranteed.',
            verified: true,
            experience: '22 years',
            farmName: 'Patil Agri'
        }
    },
    { 
        id: 9, name: 'Finger Millet (Ragi)', category: 'Grains', price: '₹55', unit: 'kg', 
        farmer: 'Mala Hegde', location: 'Mandya, Karnataka', rating: '4.9', 
        image: '/images/crops/finger_millet_ragi.png',
        mandiPrice: '₹38', retailPrice: '₹90',
        farmerDetails: {
            phone: '+91 10987 65432',
            bio: 'Empowering local women cooperatives to produce stone-ground organic ragi.',
            verified: true,
            experience: '18 years',
            farmName: 'Shakti Cooperatives'
        }
    },
    { 
        id: 10, name: 'Red Beetroot', category: 'Vegetables', price: '₹40', unit: 'kg', 
        farmer: 'Ravi Kumar', location: 'Ooty, Tamil Nadu', rating: '4.8', 
        image: '/images/crops/red_beetroot_fresh_premium_1773328361352.png',
        mandiPrice: '₹25', retailPrice: '₹75',
        farmerDetails: {
            phone: '+91 99887 76655',
            bio: 'Premium root vegetables grown in the rich volcanic soil of the Nilgiris.',
            verified: true,
            experience: '14 years',
            farmName: 'Hillside Harvest'
        }
    },
    { 
        id: 11, name: 'Round Brinjal', category: 'Vegetables', price: '₹30', unit: 'kg', 
        farmer: 'Irfan Khan', location: 'Belagavi, Karnataka', rating: '4.5', 
        image: '/images/crops/round_brinjal_eggplant_premium_shot_1773328572152.png',
        mandiPrice: '₹15', retailPrice: '₹55',
        farmerDetails: {
            phone: '+91 88776 65544',
            bio: 'Specializing in traditional Gulla-style brinjals with zero pesticide residue.',
            verified: true,
            experience: '9 years',
            farmName: 'Khan Organic'
        }
    },
    { 
        id: 12, name: 'Red Chilli (Dry)', category: 'Grains', price: '₹180', unit: 'kg', 
        farmer: 'Subba Rao', location: 'Guntur, Andhra Pradesh', rating: '4.9', 
        image: '/images/crops/red_chilli.png',
        mandiPrice: '₹130', retailPrice: '₹280',
        farmerDetails: {
            phone: '+91 77665 54433',
            bio: 'Manufacturer of the world-famous Guntur Sannam chillies. Direct from farm.',
            verified: true,
            experience: '28 years',
            farmName: 'Guntur Spice'
        }
    },
    { 
        id: 13, name: 'Crisp Cucumber', category: 'Vegetables', price: '₹25', unit: 'kg', 
        farmer: 'Deepak More', location: 'Pune, Maharashtra', rating: '4.6', 
        image: '/images/crops/crisp_cucumber.png',
        mandiPrice: '₹12', retailPrice: '₹45',
        farmerDetails: {
            phone: '+91 66554 43322',
            bio: 'Greenhouse-grown hydroponic cucumbers. Extra crunchy and seedless.',
            verified: true,
            experience: '6 years',
            farmName: 'Pune Hydro'
        }
    },
    { 
        id: 14, name: 'Samba Masuri Rice', category: 'Grains', price: '₹75', unit: 'kg', 
        farmer: 'Venkat Reddy', location: 'Nellore, Andhra Pradesh', rating: '4.8', 
        image: '/images/crops/samba_masuri_rice.png',
        mandiPrice: '₹55', retailPrice: '₹110',
        farmerDetails: {
            phone: '+91 55443 32211',
            bio: 'Cultivating the finest fine-grain Samba Masuri in the Krishna delta.',
            verified: true,
            experience: '35 years',
            farmName: 'Nellore Pride'
        }
    },
    { 
        id: 15, name: 'Fresh Ridge Gourd', category: 'Vegetables', price: '₹35', unit: 'kg', 
        farmer: 'Basavaraj S.', location: 'Hubli, Karnataka', rating: '4.7', 
        image: '/images/crops/fresh_ridge_gourd.png',
        mandiPrice: '₹20', retailPrice: '₹65',
        farmerDetails: {
            phone: '+91 44332 21100',
            bio: 'Naturally grown ridge gourd. Tender and rich in fiber.',
            verified: true,
            experience: '11 years',
            farmName: 'Hubli Harvest'
        }
    },
    { 
        id: 16, name: 'Pure Cow Ghee', category: 'Dairy', price: '₹750', unit: 'kg', 
        farmer: 'Desi Dairy Farm', location: 'Aarey Colony, Mumbai', rating: '4.9', 
        image: '/images/crops/pure_cow_ghee.png',
        mandiPrice: '₹550', retailPrice: '₹950',
        farmerDetails: {
            phone: '+91 33221 10099',
            bio: 'Traditional wood-churned A2 ghee made from grass-fed Gir cows.',
            verified: true,
            experience: '12 years',
            farmName: 'Desi Amrit'
        }
    },
    { 
        id: 17, name: 'Chikkamagaluru Arabica', category: 'Grains', price: '₹550', unit: 'kg', 
        farmer: 'Baba Budangiri Estates', location: 'Chikkamagaluru, Karnataka', rating: '4.9', 
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop', 
        mandiPrice: '₹380', retailPrice: '₹750',
        farmerDetails: {
            phone: '+91 22110 09988',
            bio: 'Single-origin Arabica beans shade-grown at 3500ft.',
            verified: true,
            experience: '40 years',
            farmName: 'Baba Budangiri'
        }
    },
    { 
        id: 18, name: 'Fresh Green Apple', category: 'Fruits', price: '₹150', unit: 'kg', 
        farmer: 'Shimla Orchards', location: 'Shimla, Himachal Pradesh', rating: '4.8', 
        image: '/images/crops/fresh_green_apple.png', 
        mandiPrice: '₹100', retailPrice: '₹200',
        farmerDetails: {
            phone: '+91 11223 34455',
            bio: 'Crisp and sweet green apples straight from the hills of Shimla.',
            verified: true,
            experience: '15 years',
            farmName: 'Himalayan Harvests'
        }
    },
    { 
        id: 19, name: 'Organic Garlic', category: 'Vegetables', price: '₹180', unit: 'kg', 
        farmer: 'Sunil Kulkarni', location: 'Nashik, Maharashtra', rating: '4.9', 
        image: '/images/crops/garlic_in_bowl.png',
        mandiPrice: '₹120', retailPrice: '₹250',
        farmerDetails: {
            phone: '+91 91234 56789',
            bio: 'Premium organic garlic grown using traditional methods. High potency and rich flavor.',
            verified: true,
            experience: '15 years',
            farmName: 'Kulkarni Organic'
        }
    }
];

const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Subscription'];

const categoryData = {
    'All': { 
        title: "Full Harvest", 
        tagline: "Total transparency, direct from source.",
        description: "Browse curated premium produce from India's elite verified farms.",
        benefit: "Verified Direct",
        health: ["Traceable Origins", "Fair Farmer Pricing"]
    },
    'Vegetables': { 
        title: "Vital Greens", 
        tagline: "Harvested at peak nutrition.",
        description: "Delivered within 24h of harvest for maximum vitamin retention.",
        benefit: "24h Farm-to-Table",
        health: ["Immune Booster", "Digestive Health"]
    },
    'Fruits': { 
        title: "Sun-Ripened", 
        tagline: "100% Tree-Ripened.",
        description: "Zero toxic ripening agents. Pure, intense natural sweetness.",
        benefit: "Chemical-Free",
        health: ["Vitamin C Rich", "Vitalizing Energy"]
    },
    'Grains': { 
        title: "Golden Grains", 
        tagline: "Heritage harvests.",
        description: "Premium Basmati and ancient millets from specialized cooperatives.",
        benefit: "GI Tagged",
        health: ["Complex Carbs", "Essential Minerals"]
    },
    'Dairy': { 
        title: "Pure Dairy", 
        tagline: "Pure, local, and A2.",
        description: "Artisanal dairy products from local farmer cooperatives.",
        benefit: "Farmer Owned",
        health: ["Calcium Rich", "A2 Protein"]
    },
    'Subscription': { 
        title: "Harvest Boxes", 
        tagline: "Healthy living made easy.",
        description: "Weekly curated boxes of seasonal produce by nutrition experts.",
        benefit: "Save 30%",
        health: ["Weekly Balance", "Complete Nutrition"]
    }
};

const MarketplacePage = () => {
    const [crops, setCrops] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    
    // Fetch products from backend
    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const data = await api.getProducts();
                // Ensure Garlic is visible even if backend data is returned
                let processedData = data || [];
                const hasGarlic = processedData.some(c => c.name.toLowerCase().includes('garlic'));
                if (!hasGarlic) {
                    const garlicFallback = initialCropsData.find(c => c.name.includes('Garlic'));
                    if (garlicFallback) processedData = [...processedData, garlicFallback];
                }

                if (processedData.length > 0) {
                    setCrops(processedData);
                } else {
                    setCrops(initialCropsData);
                }
            } catch (err) {
                console.error("Failed to load backend crops, using offline data.");
                setCrops(initialCropsData);
            }
        };
        fetchCrops();
    }, []);

    const filteredCrops = crops.filter(crop => {
        const matchesCategory = activeCategory === 'All' || crop.category === activeCategory;
        const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crop.farmer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const activeInfo = categoryData[activeCategory] || categoryData['All'];

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-24 pb-24 transition-colors duration-500 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-agri-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-agri-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="max-w-xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-agri-primary font-bold text-sm mb-4"
                        >
                            <ShoppingBag size={16} /> Premium Agri Marketplace
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-display font-black text-agri-dark dark:text-white mb-6 tracking-tight">
                            Fresh <span className="text-agri-primary">Direct</span>
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            Bypassing middlemen to deliver high-integrity produce directly from India's finest producers.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-md">
                        <div className="relative flex-grow">
                             <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-agri-primary transition-colors">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-5 glass dark:bg-slate-900 border-gray-200 dark:border-gray-800 rounded-2xl text-agri-dark dark:text-white shadow-premium focus:ring-2 focus:ring-agri-primary transition-all font-medium"
                                placeholder="Search produce..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={() => setIsFiltersOpen(true)}
                            className="flex items-center justify-center gap-3 px-8 py-5 glass dark:bg-slate-800 text-agri-dark dark:text-white rounded-2xl font-bold border border-gray-200 dark:border-gray-700 hover:border-agri-primary transition-all active:scale-95"
                        >
                            <Filter size={18} /> Filters
                        </button>
                    </div>
                </header>

                {/* Delivery Options Brief */}
                <DeliveryOptions />

                {/* Category Navigation */}
                <div className="flex overflow-x-auto hide-scrollbar gap-4 mb-10 pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 border ${
                                activeCategory === cat
                                ? 'bg-agri-primary text-white border-agri-primary shadow-glow ring-4 ring-agri-primary/10'
                                : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:border-agri-primary hover:text-agri-primary'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Category Banner */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-12 p-10 glass dark:bg-slate-900 rounded-[3rem] border-agri-primary/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                            <LayoutGrid size={200} className="text-agri-primary" />
                        </div>
                        
                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                            <div className="max-w-2xl">
                                <span className="inline-block px-4 py-1 bg-agri-primary/10 text-agri-primary rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 border border-agri-primary/20">
                                    Quality Standard: Grade A+
                                </span>
                                <h2 className="text-4xl font-display font-black text-agri-dark dark:text-white mb-3">
                                    {activeInfo.title}
                                </h2>
                                <p className="text-agri-primary font-bold text-lg mb-4">{activeInfo.tagline}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed italic">
                                    "{activeInfo.description}"
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="p-8 bg-gray-50 dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-agri-primary/10 text-agri-primary rounded-xl">
                                            <HeartPulse size={24} />
                                        </div>
                                        <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Integrity Stats</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {activeInfo.health.map((h, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                                                <div className="w-2 h-2 bg-agri-primary rounded-full" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-8 bg-agri-dark dark:bg-white text-white dark:text-agri-dark rounded-3xl flex flex-col items-center justify-center text-center -rotate-2 hover:rotate-0 transition-transform cursor-pointer shadow-premium">
                                    <Sparkles size={32} className="text-agri-secondary mb-3" />
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Market Hero</p>
                                    <p className="text-2xl font-display font-black tracking-tighter line-clamp-2">
                                        {activeInfo.benefit}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Product Grid */}
                {filteredCrops.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredCrops.map((crop, index) => (
                            <CropCard key={crop.id} crop={crop} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 glass dark:bg-slate-900 rounded-[4rem] border-dashed border-gray-300 dark:border-gray-800"
                    >
                        <Search size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-6" />
                        <h3 className="text-2xl font-display font-black text-agri-dark dark:text-white mb-2">No Harvest Found</h3>
                        <p className="text-gray-500 font-medium">Try searching for a broad category or clear your filters.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                            className="mt-8 text-agri-primary font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                        >
                            Reset Discovery
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Filters Modal Content handled in MarketplacePage or shared component */}
        </div>
    );
};

export default MarketplacePage;
