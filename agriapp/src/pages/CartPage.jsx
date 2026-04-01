import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard, Truck, Building2, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const navigate = useNavigate();
    const [deliveryMethod, setDeliveryMethod] = React.useState('shiprocket');

    const subtotal = cart.reduce((acc, item) => {
        const priceStr = typeof item.price === 'string' ? item.price : String(item.price || 0);
        const price = parseFloat(priceStr.replace('₹', '').replace(',', ''));
        return acc + (isNaN(price) ? 0 : price) * item.quantity;
    }, 0);

    const partners = {
        shiprocket: { cost: 40, name: 'Shiprocket' },
        shadowfax: { cost: 60, name: 'Shadowfax' },
        porter: { cost: 150, name: 'Porter' }
    };

    const { user } = React.useContext(AuthContext);

    const deliveryCharge = partners[deliveryMethod]?.cost || 0;
    const discount = 0; // Planned: Cluster discount logic
    const total = subtotal + deliveryCharge - discount;

    const handleCheckout = async () => {
        if (!user) {
            alert('Please log in to place an order.');
            navigate('/login');
            return;
        }

        try {
            const orderPayload = {
                items: cart.map(item => ({ product: item.id || item._id, quantity: item.quantity })),
                totalAmount: total,
                shippingAddress: "Default User Address", // In a real app we'd ask for this
                status: "Pending"
            };

            await api.createOrder(orderPayload);
            alert(`Order Placed Successfully via ${partners[deliveryMethod].name}! Your total was ₹${total.toLocaleString()}`);
            clearCart();
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to place order. Please try again.');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 pb-24">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="w-24 h-24 bg-agri-light dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 text-agri-green">
                            <ShoppingBag size={48} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                            Looks like you haven't added any fresh produce to your cart yet.
                        </p>
                        <Link
                            to="/marketplace"
                            className="inline-flex items-center gap-2 bg-agri-green hover:bg-agri-dark text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-md shadow-agri-green/20"
                        >
                            <ArrowLeft size={20} />
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-12 pb-24 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/marketplace" className="p-2 bg-white dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400 hover:text-agri-green transition-colors shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-center"
                                >
                                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.farmer}</p>
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-bold text-gray-600 dark:text-gray-300">
                                                {item.quantity} {item.unit}
                                            </span>
                                            <p className="text-agri-green font-bold text-lg">{item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-1 ring-1 ring-gray-200 dark:ring-gray-600">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-lg text-gray-500 dark:text-gray-300 transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-lg text-gray-500 dark:text-gray-300 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Delivery Partner Selection */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Delivery Partner</h3>
                            <div className="space-y-3">
                                {[
                                    { id: 'shiprocket', name: 'Shiprocket', cost: 40, time: '2-3 Days', desc: 'Standard Pan-India' },
                                    { id: 'shadowfax', name: 'Shadowfax', cost: 60, time: '2-4 Hours', desc: 'Hyper-local fresh' },
                                    { id: 'porter', name: 'Porter', cost: 150, time: 'Same Day', desc: 'Bulk/Heavy (50kg+)' }
                                ].map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setDeliveryMethod(p.id)}
                                        className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                                            deliveryMethod === p.id 
                                            ? 'border-agri-green bg-agri-green/5' 
                                            : 'border-gray-100 dark:border-gray-700 hover:border-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-left">
                                                <p className="font-bold text-sm text-gray-900 dark:text-white">{p.name}</p>
                                                <p className="text-[10px] text-gray-500">{p.desc} • {p.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-agri-green text-sm">₹{p.cost}</p>
                                            {deliveryMethod === p.id && <div className="w-2 h-2 bg-agri-green rounded-full ml-auto mt-1" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Serviceability Check */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Check Serviceability</h3>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Enter PIN Code" 
                                    className="flex-grow bg-gray-50 dark:bg-gray-700 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-agri-green transition-all"
                                />
                                <button className="bg-agri-green text-white px-4 py-2 rounded-xl text-sm font-bold">Check</button>
                            </div>
                        </div>

                        <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl shadow-gray-900/20 sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-white">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Delivery</span>
                                    <span className={`font-bold ${deliveryMethod === 'apartment' ? 'text-green-400' : 'text-white'}`}>
                                        {deliveryMethod === 'apartment' ? 'FREE' : `₹${deliveryCharge}`}
                                    </span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-400">
                                        <span>Cluster Discount (5%)</span>
                                        <span className="font-bold">-₹{discount}</span>
                                    </div>
                                )}
                                <div className="h-px bg-gray-800 my-4" />
                                <div className="flex justify-between text-xl">
                                    <span className="font-black">Total</span>
                                    <span className="font-black text-agri-green">₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full flex items-center justify-center gap-2 bg-agri-green hover:bg-agri-dark text-white py-4 rounded-2xl font-bold transition-all shadow-md shadow-agri-green/20"
                            >
                                <CreditCard size={20} />
                                Checkout Now
                            </button>
                            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 px-4">
                                By proceeding, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
