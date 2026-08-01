import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, Clock, Phone, MessageSquare, MapPin, Truck, Package, ShieldCheck, ShoppingBag, Search, ArrowLeft, RefreshCw, Copy, CheckCheck, Star, Zap } from 'lucide-react';

const OrderTrackingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryTrackingId = searchParams.get('id');
    const [trackingIdInput, setTrackingIdInput] = useState('');
    const [trackingId, setTrackingId] = useState(queryTrackingId || '');
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCopyId = () => {
        navigator.clipboard.writeText(trackingId).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const fetchTrackingData = async (tid) => {
        if (!tid || !tid.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/delivery/track/${tid}`);
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('Tracking ID not found. Please verify and try again.');
                } else if (res.status === 500) {
                    throw new Error('Server error. Please try again shortly.');
                }
                throw new Error('Unable to fetch tracking details.');
            }
            const data = await res.json();
            setOrderData(data);
            setError('');
        } catch (err) {
            setError(err.message || 'Error fetching tracking details.');
            setOrderData(null);
        } finally {
            setLoading(false);
        }
    };

    // Load initial query tracking if present
    useEffect(() => {
        if (queryTrackingId) {
            setTrackingId(queryTrackingId);
            fetchTrackingData(queryTrackingId);
        }
    }, [queryTrackingId]);

    // Poll for updates every 5 seconds if active tracking is on
    useEffect(() => {
        if (!trackingId) return;
        const interval = setInterval(() => {
            fetchTrackingData(trackingId);
        }, 5000);
        return () => clearInterval(interval);
    }, [trackingId]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedId = trackingIdInput.trim();
        if (!trimmedId) {
            setError('Please enter a valid tracking ID.');
            return;
        }
        setError('');
        setTrackingId(trimmedId);
        setSearchParams({ id: trimmedId });
        fetchTrackingData(trimmedId);
    };

    const handleBack = () => {
        setTrackingId('');
        setOrderData(null);
        setSearchParams({});
        setError('');
    };

    const mapStatusToSteps = (currentStatus, historyList) => {
        const stepsDefinition = [
            { key: 'Order Placed', name: 'Order Placed', icon: ShoppingBag },
            { key: 'Picked Up', name: 'Harvest & Packaging', icon: Package },
            { key: 'In Transit', name: 'Quality Check & Transit', icon: ShieldCheck },
            { key: 'Out for Delivery', name: 'Out for Delivery', icon: Truck },
            { key: 'Delivered', name: 'Delivered', icon: Check }
        ];

        const statusKeys = ['Order Placed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];
        const currentIdx = statusKeys.indexOf(currentStatus);

        return stepsDefinition.map((step, idx) => {
            let status = 'upcoming';
            let time = 'Pending';

            if (idx < currentIdx) {
                status = 'complete';
            } else if (idx === currentIdx) {
                status = 'current';
                time = 'In Progress';
            }

            const historyItem = (historyList || []).find(h => h.status === step.key);
            if (historyItem) {
                status = idx === currentIdx && currentStatus !== 'Delivered' ? 'current' : 'complete';
                const date = new Date(historyItem.time);
                time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }

            return {
                ...step,
                status,
                time
            };
        });
    };

    const steps = orderData ? mapStatusToSteps(orderData.status, orderData.history) : [];

    const formattedEstimatedDelivery = orderData && orderData.estimatedDelivery
        ? new Date(orderData.estimatedDelivery).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })
        : 'Tomorrow, 5:00 PM';

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-24 transition-colors duration-300 relative overflow-hidden">
            {/* Dynamic Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-agri-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatePresence mode="wait">
                    {!trackingId || error ? (
                        /* SEARCH MODE */
                        <motion.div
                            key="search-view"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 md:p-12 shadow-premium border border-gray-100 dark:border-gray-700 text-center max-w-lg mx-auto"
                        >
                            <div className="w-20 h-20 bg-agri-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                <Truck size={36} className="text-agri-primary" />
                            </div>
                            
                            <h1 className="text-3xl font-display font-black text-agri-dark dark:text-white mb-3">Live Order Tracking</h1>
                            <p className="text-gray-500 dark:text-gray-400 mb-2 max-w-sm mx-auto text-sm leading-relaxed">
                                Enter your unique Tracking ID to see real-time updates of your harvest journey from farm to table.
                            </p>
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
                                    <Zap size={10} className="fill-emerald-500" /> Real-time updates every 5s
                                </span>
                            </div>

                            <form onSubmit={handleSearchSubmit} className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="e.g. TRK-182938"
                                        value={trackingIdInput}
                                        onChange={(e) => setTrackingIdInput(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-4 pl-12 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary focus:border-transparent outline-none transition-all font-semibold placeholder-gray-400"
                                        required
                                    />
                                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-xs font-semibold mt-2">{error}</p>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-agri-primary to-emerald-700 hover:from-emerald-700 hover:to-agri-primary text-white font-black py-4 rounded-2xl shadow-glow transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <RefreshCw className="animate-spin" size={20} />
                                    ) : (
                                        <>Track Harvest Journey</>
                                    )}
                                </motion.button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <Link to="/marketplace" className="inline-flex items-center gap-2 text-xs font-bold text-agri-primary hover:underline">
                                    <ArrowLeft size={14} /> Back to Marketplace
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        /* TRACKING DETAIL MODE */
                        <motion.div
                            key="tracking-view"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                        >
                            {/* Header details */}
                            <div className="flex justify-between items-center mb-2">
                                <button onClick={handleBack} className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-agri-primary transition-colors">
                                    <ArrowLeft size={16} /> Check Another ID
                                </button>
                                <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1.5">
                                    <RefreshCw size={10} className="animate-spin text-agri-primary" /> Live Syncing
                                </span>
                            </div>

                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-2">Track Your Produce</h1>
                                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider">
                                    <span className="text-gray-400">Tracking ID:</span>
                                    <button
                                        onClick={handleCopyId}
                                        className="flex items-center gap-1.5 text-agri-primary font-mono hover:opacity-75 transition-opacity"
                                        title="Copy tracking ID"
                                    >
                                        <span>{trackingId}</span>
                                        {copied ? <CheckCheck size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                    </button>
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                                    <span className="text-emerald-600 dark:text-emerald-400">{orderData.partner || 'Shiprocket'}</span>
                                </div>
                            </div>

                            {/* Delivered Banner */}
                            <AnimatePresence>
                                {orderData.status === 'Delivered' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-4 flex items-center gap-3 shadow-lg"
                                    >
                                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                                            <Star size={20} className="fill-white text-white" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-black text-sm">Your order has been delivered! 🎉</p>
                                            <p className="text-[10px] text-white/75 font-semibold mt-0.5">Thank you for choosing AgriConnect. Enjoy your fresh harvest!</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Delivery ETA Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-r from-agri-primary to-emerald-700 text-white rounded-[2.5rem] p-8 text-center shadow-premium relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
                                <p className="text-emerald-100/80 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Estimated Delivery Date</p>
                                <h2 className="text-3xl md:text-4xl font-black relative z-10">{formattedEstimatedDelivery}</h2>
                                <p className="text-[10px] mt-4 opacity-80 relative z-10 font-bold uppercase tracking-widest bg-white/10 inline-block px-4 py-1.5 rounded-full">
                                    Status: {orderData.status}
                                </p>
                                {/* Progress Bar */}
                                {(() => {
                                    const statusKeys = ['Order Placed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];
                                    const pct = Math.round(((statusKeys.indexOf(orderData.status) + 1) / statusKeys.length) * 100);
                                    return (
                                        <div className="mt-5 relative z-10">
                                            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                                    className="h-full bg-white rounded-full"
                                                />
                                            </div>
                                            <p className="text-[10px] text-white/60 mt-1.5 font-bold">{pct}% complete</p>
                                        </div>
                                    );
                                })()}
                            </motion.div>

                            <div className="grid md:grid-cols-5 gap-8">
                                {/* Tracking Timeline */}
                                <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-premium border border-gray-100 dark:border-gray-700">
                                    <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-8">Harvest Journey Progress</h3>

                                    <div className="relative">
                                        {/* Vertical Line */}
                                        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-100 dark:bg-gray-700"></div>

                                        <div className="space-y-8 relative z-10">
                                            {steps.map((step) => {
                                                const Icon = step.icon;
                                                return (
                                                    <div key={step.name} className="flex items-start gap-6">
                                                        <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                                                            step.status === 'complete' 
                                                                ? 'bg-agri-primary border-transparent text-white shadow-md shadow-agri-primary/20' :
                                                            step.status === 'current' 
                                                                ? 'bg-yellow-400 border-yellow-200 text-yellow-900 shadow-md shadow-yellow-400/20' :
                                                            'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 text-gray-400'
                                                        }`}>
                                                            <Icon size={20} className={step.status === 'current' ? 'animate-bounce' : ''} />
                                                        </div>
                                                        <div className="pt-1.5">
                                                            <h4 className={`text-md font-bold ${
                                                                step.status === 'complete' ? 'text-gray-900 dark:text-white' :
                                                                step.status === 'current' ? 'text-yellow-600 dark:text-yellow-400' :
                                                                'text-gray-400 dark:text-gray-500'
                                                            }`}>{step.name}</h4>
                                                            <p className={`text-xs mt-0.5 font-semibold ${
                                                                step.status === 'current' 
                                                                    ? 'text-yellow-700/70 dark:text-yellow-500/70' 
                                                                    : 'text-gray-400 dark:text-gray-500'
                                                            }`}>{step.time}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Info / Support */}
                                <div className="md:col-span-2 space-y-6">
                                    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-premium border border-gray-100 dark:border-gray-700 text-center">
                                        <img
                                            src="https://images.unsplash.com/photo-1595804365737-12681fbfa968?w=300&h=300&fit=crop"
                                            alt="Farmer"
                                            className="w-20 h-20 rounded-full mx-auto object-cover mb-4 ring-4 ring-agri-primary/20 dark:ring-gray-700 shadow-md"
                                        />
                                        <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">Arjun Singh</h3>
                                        <p className="text-gray-400 dark:text-gray-500 text-xs mb-6 flex items-center justify-center gap-1 font-semibold">
                                            <MapPin size={12} className="text-agri-primary" /> Green Valley Farm, Kolar
                                        </p>

                                        <div className="flex flex-col gap-3">
                                            <button
                                                onClick={() => alert(`Initiating call to ${orderData.partner || 'Shiprocket'} Support...`)}
                                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-agri-primary/30 text-agri-primary dark:text-agri-light hover:bg-agri-primary/5 font-bold transition-all text-xs"
                                            >
                                                <Phone size={14} /> Support Center
                                            </button>
                                            <button
                                                onClick={() => alert('Sending live advisor message to farmer...')}
                                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 font-bold transition-all text-xs"
                                            >
                                                <MessageSquare size={14} /> Message Farmer
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Summary Miniature */}
                                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-premium border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <ShoppingBag size={20} className="text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div className="text-left flex-1">
                                            <p className="font-bold text-gray-900 dark:text-white text-xs">Fresh Harvest Produce</p>
                                            <p className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">
                                                Paid via Cash on Delivery
                                            </p>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg shrink-0 ${
                                            orderData.status === 'Delivered' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' :
                                            orderData.status === 'Out for Delivery' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400' :
                                            'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                        }`}>
                                            {orderData.status === 'Out for Delivery' ? '🚚 On Way' :
                                             orderData.status === 'Delivered' ? '✅ Done' :
                                             '⏳ Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OrderTrackingPage;
