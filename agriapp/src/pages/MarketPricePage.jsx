import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Dummy Chart Data
const chartData = [
    { day: '01', price: 18000 }, { day: '04', price: 18500 }, { day: '08', price: 17500 },
    { day: '12', price: 19000 }, { day: '16', price: 19500 }, { day: '20', price: 18500 },
    { day: '24', price: 20000 }, { day: '28', price: 19500 }, { day: '30', price: 21000 },
];

const trendingCrops = [
    { name: 'Nasik Red Onions', currentPrice: '₹35/kg', change: '+5.2%', isPositive: true, sparkline: [4, 5, 4, 6, 7, 8, 9] },
    { name: 'Sona Masuri Rice', currentPrice: '₹52,000/ton', change: '+12.4%', isPositive: true, sparkline: [10, 11, 14, 13, 16, 18, 20] },
    { name: 'Desi Potatoes', currentPrice: '₹22/kg', change: '-1.4%', isPositive: false, sparkline: [8, 8, 7, 6, 7, 5, 4] },
    { name: 'Robusta Coffee', currentPrice: '₹450/kg', change: '+2.1%', isPositive: true, sparkline: [20, 21, 20, 22, 23, 23, 24] },
];

const MarketPricePage = () => {
    const [selectedRange, setSelectedRange] = useState('1M');

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-8 pb-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Market Insights</h1>
                    <p className="text-gray-500 dark:text-gray-400">Live pricing and historical trends in Indian markets.</p>
                </header>

                {/* Main Chart Section - Dark Theme */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 rounded-3xl p-6 md:p-8 shadow-2xl mb-8 border border-gray-800 relative overflow-hidden"
                >
                    {/* Header of Chart */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-2xl font-bold text-white">Sona Masuri Rice</h2>
                                <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-medium border border-gray-700">Per Ton</span>
                            </div>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl md:text-5xl font-black text-white">₹21,000.00</span>
                                <span className="flex items-center text-agri-green bg-agri-green/10 px-2 py-1 rounded font-bold text-lg mb-1">
                                    <ArrowUpRight size={20} className="mr-1" /> +12.4%
                                </span>
                            </div>
                        </div>

                        {/* Range Selector */}
                        <div className="flex bg-gray-800 rounded-lg p-1 mt-6 md:mt-0">
                            {['1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setSelectedRange(range)}
                                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${selectedRange === range ? 'bg-agri-green text-white shadow' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recharts Area */}
                    <div className="h-72 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#11d432" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#11d432" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                                <XAxis dataKey="day" stroke="#6B7280" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                                <YAxis stroke="#6B7280" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                                    itemStyle={{ color: '#11d432', fontWeight: 'bold' }}
                                    formatter={(value) => [`₹${value}`, 'Price']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#11d432"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorPrice)"
                                    activeDot={{ r: 8, fill: '#11d432', stroke: '#fff', strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Trending List */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Trending Crops</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {trendingCrops.map((crop, idx) => (
                            <motion.div
                                key={crop.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">{crop.name}</h4>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">{crop.currentPrice}</p>
                                </div>

                                {/* Mini Sparkline Mock */}
                                <div className="hidden sm:block w-24 h-10 mx-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={crop.sparkline.map((v, i) => ({ val: v, i }))}>
                                            <Line type="monotone" dataKey="val" stroke={crop.isPositive ? '#11d432' : '#EF4444'} strokeWidth={2} dot={false} isAnimationActive={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="text-right flex flex-col items-end">
                                    <span className={`flex items-center font-bold px-2 py-1 rounded-md text-sm ${crop.isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                                        }`}>
                                        {crop.isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                                        {crop.change}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MarketPricePage;
