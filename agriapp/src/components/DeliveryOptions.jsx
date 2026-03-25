import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Bike, Leaf, Building2, Zap, ShieldCheck } from 'lucide-react';

const DeliveryOptions = () => {
    const options = [
        {
            id: 'apartment',
            title: 'Apartment Cluster',
            description: 'Group deliveries for your complex. Reduce costs by 30% and help the planet.',
            icon: <Building2 className="text-blue-500" size={24} />,
            badge: 'Most Popular',
            color: 'blue'
        },
        {
            id: 'hyperlocal',
            title: 'Hyper-local Hub',
            description: 'Fresh from our local neighborhood hubs to your door in under 2 hours.',
            icon: <Zap className="text-agri-yellow" size={24} />,
            badge: 'Express',
            color: 'yellow'
        },
        {
            id: 'eco',
            title: 'Eco-Friendly EV',
            description: '100% Electric vehicle delivery. Zero emissions, zero noise, maximum freshness.',
            icon: <Leaf className="text-agri-green" size={24} />,
            badge: 'Green',
            color: 'green'
        }
    ];

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900/50 rounded-3xl mb-12 border border-gray-100 dark:border-gray-800">
            <div className="px-6 sm:px-12 text-center mb-10">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-agri-green mb-3 block">Smart Logistics</span>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">How we bring the farm to you</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm">
                    We use innovative delivery models to ensure the lowest carbon footprint and the highest quality for your vegetables.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 sm:px-12">
                {options.map((opt, idx) => (
                    <motion.div
                        key={opt.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${opt.color}-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500`} />
                        
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 bg-white dark:bg-gray-700 shadow-lg rounded-xl flex items-center justify-center`}>
                                {opt.icon}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md`}>
                                {opt.badge}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{opt.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                            {opt.description}
                        </p>

                        <div className="flex items-center gap-1 text-xs font-bold text-agri-green">
                            <ShieldCheck size={14} />
                            Verified Quality
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default DeliveryOptions;
