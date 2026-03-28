import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Phone, MessageSquare, MapPin, Truck, Package, ShieldCheck, ShoppingBag } from 'lucide-react';

const OrderTrackingPage = () => {
    const [orderData, setOrderData] = useState({
        id: 'AGR-839201',
        partner: 'Shiprocket',
        trackingId: 'SR-92837482',
        estimatedDelivery: 'Today, 2:00 PM',
        currentStatus: 'Quality Check',
        steps: [
            { id: 1, name: 'Order Placed', status: 'complete', time: '10:00 AM', icon: ShoppingBag },
            { id: 2, name: 'Harvesting', status: 'complete', time: '11:30 AM', icon: Package },
            { id: 3, name: 'Quality Check', status: 'current', time: 'In Progress', icon: ShieldCheck },
            { id: 4, name: 'Out for Delivery', status: 'upcoming', time: 'Pending', icon: Truck },
            { id: 5, name: 'Delivered', status: 'upcoming', time: 'Pending', icon: Check },
        ]
    });

    // Simulate real-time tracking update
    useEffect(() => {
        const timer = setTimeout(() => {
            // In real app, fetch /api/delivery/track/${orderData.trackingId}
            console.log('Fetching latest tracking data...');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-8 pb-24 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header content */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Track Your Order</h1>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">Order ID: #{orderData.id}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-agri-green font-bold text-sm uppercase">{orderData.partner}</span>
                    </div>
                </div>

                {/* Delivery ETA Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-agri-green text-white rounded-3xl p-8 mb-8 text-center shadow-xl shadow-agri-green/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <p className="text-agri-light/80 text-sm font-semibold uppercase tracking-wider mb-2 relative z-10">Estimated Delivery</p>
                    <h2 className="text-4xl md:text-5xl font-black relative z-10">{orderData.estimatedDelivery}</h2>
                    <p className="text-xs mt-4 opacity-70 relative z-10 font-mono tracking-widest">TRACKING ID: {orderData.trackingId}</p>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-8">
                    {/* Tracking Timeline */}
                    <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Order Status</h3>

                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                            <div className="space-y-8 relative z-10">
                                {orderData.steps.map((step, stepIdx) => (
                                    <div key={step.name} className="flex items-start gap-6">
                                        <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-4 ${step.status === 'complete' ? 'bg-agri-green border-agri-light dark:border-gray-800 text-white shadow-md' :
                                            step.status === 'current' ? 'bg-yellow-400 border-yellow-100 dark:border-gray-800 text-yellow-900 shadow-md shadow-yellow-400/30' :
                                                'bg-gray-100 dark:bg-gray-800 border-white dark:border-gray-900 text-gray-400'
                                            }`}>
                                            {step.status === 'complete' ? <Check size={20} className="stroke-[3]" /> :
                                                step.status === 'current' ? <div className="w-3 h-3 bg-yellow-900 rounded-full animate-ping"></div> :
                                                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>}
                                        </div>
                                        <div className="pt-2">
                                            <h4 className={`text-lg font-bold ${step.status === 'complete' ? 'text-gray-900 dark:text-white' :
                                                step.status === 'current' ? 'text-yellow-600 dark:text-yellow-400' :
                                                    'text-gray-400 dark:text-gray-500'
                                                }`}>{step.name}</h4>
                                            <p className={`text-sm mt-1 ${step.status === 'current' ? 'text-yellow-700/70 dark:text-yellow-500/70 font-medium' : 'text-gray-500 dark:text-gray-400'
                                                }`}>{step.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Farmer Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                            <img
                                src="https://images.unsplash.com/photo-1595804365737-12681fbfa968?w=300&h=300&fit=crop"
                                alt="Farmer"
                                className="w-24 h-24 rounded-full mx-auto object-cover mb-4 ring-4 ring-agri-light dark:ring-gray-700 shadow-md"
                            />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Arjun Singh</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex items-center justify-center gap-1">
                                <MapPin size={14} /> Green Valley Farm, Kolar, Karnataka
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => alert(`Initiating call to ${orderData.partner} Support...`)}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-agri-green text-agri-green dark:text-agri-light hover:bg-agri-light dark:hover:bg-agri-green/20 font-bold transition-colors"
                                >
                                    <Phone size={18} /> Support
                                </button>
                                <button
                                    onClick={() => alert('Message sent to delivery agent...')}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 font-bold transition-colors"
                                >
                                    <MessageSquare size={18} /> Agent
                                </button>
                            </div>
                        </div>

                        {/* Order Summary Miniature */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&h=100&fit=crop"
                                alt="Crop"
                                className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white text-sm">Organic Tomatoes</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">50 kg • ₹4,200.00 total</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderTrackingPage;
