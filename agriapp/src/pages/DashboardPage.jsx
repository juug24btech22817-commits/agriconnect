import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Package, TrendingUp, Clock, DollarSign, Search, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const mockListings = [
    { id: 1, name: 'Alphonso Mangoes', quantity: '120 dozen', price: '₹800/dozen', status: 'Active', image: '/images/crops/alphonso_mangoes_1773328054659.png' },
    { id: 2, name: 'Basmati Rice', quantity: '1500 kg', price: '₹120/kg', status: 'Active', image: '/images/crops/basmati_rice_organic_1773328180216.png' },
    { id: 3, name: 'Red Onions', quantity: '800 kg', price: '₹35/kg', status: 'Low Stock', image: '/images/crops/red_onions.png' },
];

const mockOrders = [
    { id: 'ORD-IND-001', buyer: 'Reliance Fresh', total: '₹45,000.00', status: 'Pending', date: 'Today' },
    { id: 'ORD-IND-002', buyer: 'BigBasket', total: '₹12,480.00', status: 'Processing', date: 'Yesterday' },
    { id: 'ORD-IND-003', buyer: 'Local Sabzi Mandi', total: '₹8,400.00', status: 'Completed', date: 'Oct 12' },
];

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('listings');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [listings, setListings] = useState([
        { id: 1, name: 'Alphonso Mangoes', quantity: '120 dozen', price: '₹800/dozen', status: 'Active', image: '/images/crops/alphonso_mangoes_1773328054659.png' },
        { id: 2, name: 'Basmati Rice', quantity: '1500 kg', price: '₹120/kg', status: 'Active', image: '/images/crops/basmati_rice_organic_1773328180216.png' },
        { id: 3, name: 'Red Onions', quantity: '800 kg', price: '₹35/kg', status: 'Low Stock', image: '/images/crops/red_onions.png' },
    ]);

    const handleDeleteListing = (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            setListings(prev => prev.filter(item => item.id !== id));
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-8 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Farmer Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400">Welcome back! Manage your Indian crop listings.</p>
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-agri-green hover:bg-agri-dark text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-agri-green/30 transition-all transform hover:scale-105">
                        <Plus size={20} />
                        Add New Crop
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { title: 'Total Earnings', value: '₹1,24,450.00', icon: <div className="text-xl font-bold">₹</div>, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
                        { title: 'Active Listings', value: listings.length, icon: <Package size={24} />, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
                        { title: 'Pending Orders', value: '5', icon: <Clock size={24} />, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{card.title}</p>
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl flex items-center justify-center w-12 h-12 ${card.color}`}>
                                    {card.icon}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Listings Section (Takes up 2/3 width on desktop) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Crop Listings</h2>
                                <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1 w-full sm:w-auto">
                                    <button
                                        onClick={() => setActiveTab('listings')}
                                        className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'listings' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                                    >
                                        Active
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('drafts')}
                                        className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'drafts' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                                    >
                                        Drafts
                                    </button>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                <AnimatePresence>
                                    {listings.map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                            layout
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                        >
                                            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover shadow-sm bg-gray-100 dark:bg-gray-700 shrink-0" />
                                            <div className="flex-grow text-center sm:text-left">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                                <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1"><Package size={14} /> {item.quantity}</span>
                                                    <span className="flex items-center gap-1 font-bold text-agri-green"> {item.price}</span>
                                                </div>
                                                <div className="mt-3">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <button onClick={() => alert('Editing feature coming soon!')} className="p-2 text-gray-400 hover:text-blue-500 bg-gray-50 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteListing(item.id)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {listings.length === 0 && (
                                    <div className="p-12 text-center">
                                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-500">No active listings found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Section (Takes up 1/3 width on desktop) */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
                                <button className="text-sm font-medium text-agri-green hover:text-agri-dark">View All</button>
                            </div>
                            <div className="p-6 space-y-6">
                                {mockOrders.map((order, idx) => (
                                    <div key={order.id} className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{order.buyer}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                                {order.id} • {order.date}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900 dark:text-white">{order.total}</p>
                                            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${order.status === 'Completed' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' :
                                                order.status === 'Processing' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' :
                                                    'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="bg-gradient-to-br from-agri-green to-agri-dark rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
                            <h3 className="text-xl font-bold mb-2 relative z-10">Need Market Insights?</h3>
                            <p className="text-agri-light/90 text-sm mb-4 relative z-10">Check today's live pricing trends in Indian mandis.</p>
                            <Link to="/prices" className="block mt-4">
                                <button className="bg-white text-agri-green px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-gray-50 transition-colors w-full relative z-10">
                                    View Live Prices
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal for adding a crop */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h2 className="text-xl font-bold dark:text-white text-gray-900">Add New Crop</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4 text-left">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Crop Name</label>
                                    <input type="text" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-agri-green focus:border-agri-green focus:outline-none" placeholder="e.g. Alphonso Mangoes" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                                        <input type="text" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-agri-green focus:outline-none" placeholder="e.g. 500 kg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                                        <input type="text" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-agri-green focus:outline-none" placeholder="e.g. ₹120" />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button onClick={() => { alert('Crop added successfully!'); setIsAddModalOpen(false); }} className="w-full bg-agri-green text-white font-bold py-3 rounded-lg hover:bg-agri-dark transition-colors shadow-md shadow-agri-green/20">
                                        Save Listing
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

export default DashboardPage;
