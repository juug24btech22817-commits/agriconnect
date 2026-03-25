import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import CropCard from '../components/CropCard';
import DeliveryOptions from '../components/DeliveryOptions';

// Dummy Data
const cropsData = [
    { 
        id: 101, name: 'Farmer’s Choice Box (Small)', category: 'Subscription', price: '₹499', unit: 'box', 
        farmer: 'AgriConnect Curated', location: 'Multiple Farms', rating: '4.9', 
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop',
        mandiPrice: '₹350', retailPrice: '₹650',
        farmerDetails: {
            phone: '+91 00000 00000',
            bio: 'A curated mix of 5kg seasonal vegetables, harvested fresh from 3 local organic farms.',
            verified: true,
            experience: 'Curated by Experts',
            farmName: 'AgriConnect Hub'
        }
    },
    { 
        id: 102, name: 'Premium Essentials Box', category: 'Subscription', price: '₹999', unit: 'box', 
        farmer: 'AgriConnect Curated', location: 'Multiple Farms', rating: '5.0', 
        image: 'https://images.unsplash.com/photo-1574316071802-0d68494bc20d?w=500&h=500&fit=crop',
        mandiPrice: '₹750', retailPrice: '₹1400',
        farmerDetails: {
            phone: '+91 00000 00000',
            bio: '10kg of premium veggies and fruits. Includes exotic vegetables and seasonal fruits.',
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
        image: 'https://images.unsplash.com/photo-1590665413185-1d58df0d94a9?w=500&h=500&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1597361719262-bc46c6eb5324?w=500&h=500&fit=crop',
        mandiPrice: '₹22', retailPrice: '₹60',
        farmerDetails: {
            phone: '+91 21098 76543',
            bio: 'Traditional farmer specializing in trellis-grown gourds and leafy greens.',
            verified: true,
            experience: '30 years',
            farmName: 'Deccan Greens'
        }
    },
    { id: 9, name: 'Nagpur Oranges', category: 'Fruits', price: '₹60', unit: 'kg', farmer: 'Orange City Orchards', location: 'Maharashtra, India', rating: '4.8', image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=500&h=500&fit=crop', mandiPrice: '₹35', retailPrice: '₹95' },
    { id: 10, name: 'Finger Millet (Ragi)', category: 'Grains', price: '₹45', unit: 'kg', farmer: 'Deccan Roots', location: 'Karnataka, India', rating: '4.7', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&h=500&fit=crop', mandiPrice: '₹32', retailPrice: '₹75' },
    { id: 11, name: 'Hybrid Red Onions', category: 'Vegetables', price: '₹35', unit: 'kg', farmer: 'Nashik Valley Farms', location: 'Maharashtra, India', rating: '4.6', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=500&h=500&fit=crop', mandiPrice: '₹18', retailPrice: '₹55' },
    { id: 12, name: 'Samba Masuri Rice', category: 'Grains', price: '₹55', unit: 'kg', farmer: 'Cauvery Delta Farms', location: 'Tamil Nadu, India', rating: '4.8', image: 'https://images.unsplash.com/photo-1543321594-e3505b8bc00a?w=500&h=500&fit=crop', mandiPrice: '₹38', retailPrice: '₹85' },
    { id: 13, name: 'Guntur Red Chillies', category: 'Vegetables', price: '₹180', unit: 'kg', farmer: 'Andhra Spice Hub', location: 'Andhra Pradesh, India', rating: '4.9', image: 'https://images.unsplash.com/photo-1582408917838-89c565d3ecad?w=500&h=500&fit=crop', mandiPrice: '₹130', retailPrice: '₹260' },
    { id: 14, name: 'Coorg Robusta Coffee', category: 'Grains', price: '₹450', unit: 'kg', farmer: 'Western Ghats Estates', location: 'Karnataka, India', rating: '4.9', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&h=500&fit=crop', mandiPrice: '₹320', retailPrice: '₹650' },
];

const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Subscription'];

const MarketplacePage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const filteredCrops = cropsData.filter(crop => {
        const matchesCategory = activeCategory === 'All' || crop.category === activeCategory;
        const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crop.farmer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-8 pb-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Strings */}
                <div className="text-center md:text-left mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Fresh Marketplace</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Buy directly from Indian farmers. Freshness guaranteed.</p>
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
                <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 pb-2">
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
