import React from 'react';
import { Leaf, Twitter, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <Leaf className="h-8 w-8 text-agri-green" />
                            <span className="font-bold text-xl tracking-tight text-agri-dark dark:text-agri-light">
                                AgriConnect
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                            Empowering farmers through direct trade. Eliminating middlemen for maximum profit and guaranteeing the best market rates for every harvest.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-agri-green transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-agri-green transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-agri-green transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Platform</h3>
                        <ul className="space-y-3">
                            <li><Link to="/marketplace" className="text-gray-500 dark:text-gray-400 hover:text-agri-green text-sm transition-colors">Marketplace</Link></li>
                            <li><Link to="/prices" className="text-gray-500 dark:text-gray-400 hover:text-agri-green text-sm transition-colors">Live Prices</Link></li>
                            <li><Link to="/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-agri-green text-sm transition-colors">For Farmers</Link></li>
                            <li><Link to="/tracking" className="text-gray-500 dark:text-gray-400 hover:text-agri-green text-sm transition-colors">Track Order</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-agri-green text-sm transition-colors">About Us</Link></li>
                            <li><Link to="/stories" className="text-gray-500 dark:text-gray-400 hover:text-agri-green text-sm transition-colors">Farmer Stories</Link></li>
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-agri-green text-sm transition-colors">Careers</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-agri-green text-sm transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin size={18} className="text-agri-green mt-0.5 shrink-0" />
                                <span>Plot No. 42, Green Valley, HSR Layout, Bengaluru, Karnataka 560102</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <Phone size={18} className="text-agri-green shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <Mail size={18} className="text-agri-green shrink-0" />
                                <span>support@agriconnect.in</span>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} AgriConnect. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm">
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-agri-green">Privacy Policy</a>
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-agri-green">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
