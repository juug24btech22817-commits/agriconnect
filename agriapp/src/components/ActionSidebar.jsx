import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Settings, LayoutGrid, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * ActionSidebar.jsx - Premium floating vertical navigation
 * Provides quick access to Cart, Dashboard, and Marketplace.
 */
const ActionSidebar = () => {
    const { cartCount } = useCart();

    const actions = [
        { 
            icon: <LayoutGrid size={20} />, 
            label: 'Market', 
            path: '/marketplace', 
            color: 'text-emerald-500', 
            bg: 'bg-emerald-500/10' 
        },
        { 
            icon: <ShoppingCart size={20} />, 
            label: 'Cart', 
            path: '/cart', 
            color: 'text-agri-primary', 
            bg: 'bg-agri-primary/10',
            badge: cartCount
        },
        { 
            icon: <Settings size={20} />, 
            label: 'Tools', 
            path: '/dashboard', 
            color: 'text-agri-secondary', 
            bg: 'bg-agri-secondary/10' 
        },
    ];

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col gap-4">
            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-3 rounded-[2rem] border border-white/20 dark:border-slate-800 shadow-premium flex flex-col gap-2"
            >
                {actions.map((action, idx) => (
                    <Link key={idx} to={action.path} className="group relative">
                        <motion.div
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-4 rounded-2xl transition-all ${action.bg} ${action.color} relative shadow-sm border border-transparent hover:border-current/10`}
                        >
                            {action.icon}
                            {action.badge > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-agri-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-lg">
                                    {action.badge}
                                </span>
                            )}
                        </motion.div>
                        
                        {/* Tooltip */}
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-agri-dark text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 shadow-xl">
                            {action.label}
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-agri-dark" />
                        </div>
                    </Link>
                ))}
            </motion.div>
        </div>
    );
};

export default ActionSidebar;
