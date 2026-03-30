import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    const contactMethods = [
        { 
            icon: <Phone className="text-agri-primary" />, 
            title: "Toll-Free Support", 
            value: "1800-419-8444", 
            desc: "Mon-Sat, 9 AM - 6 PM IST" 
        },
        { 
            icon: <MessageSquare className="text-emerald-500" />, 
            title: "WhatsApp Support", 
            value: "+91 99887 76655", 
            desc: "Direct support for farmers" 
        },
        { 
            icon: <Mail className="text-agri-secondary" />, 
            title: "Email Assistance", 
            value: "support@agriconnect.in", 
            desc: "Response within 24 hours" 
        }
    ];

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-24 pb-32 transition-colors duration-500 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-agri-primary/5 rounded-full blur-[120px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-agri-secondary/5 rounded-full blur-[120px] -ml-32 -mb-32" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-agri-primary/10 text-agri-primary border border-agri-primary/20 text-xs font-bold mb-6 tracking-widest uppercase">
                        Get in Touch
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-black text-agri-dark dark:text-white mb-6 tracking-tight">
                        We're Here to <span className="text-gradient">Support You.</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                        Whether you are a farmer, a trader, or just curious about AgriConnect, we would love to hear from you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            {contactMethods.map((method, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 8 }}
                                    className="glass p-8 rounded-[2.5rem] border-white/40 dark:border-white/10 flex items-start gap-6 shadow-premium group transition-all hover:border-agri-primary/30"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                                        {method.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-2">{method.title}</h3>
                                        <p className="text-2xl font-bold text-agri-dark dark:text-white mb-1 tracking-tight">{method.value}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{method.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="glass p-8 rounded-[3rem] border border-white/20 bg-agri-primary/5 dark:bg-agri-primary/5">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-agri-primary rounded-xl text-white shadow-glow">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-agri-dark dark:text-white mb-2">India Headquarters</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                        Level 4, Agri-Tech Park, <br />
                                        M.G. Road, Hebbal, <br />
                                        Bengaluru, Karnataka - 560024
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-14 shadow-premium border border-gray-100 dark:border-gray-800 relative overflow-hidden"
                        >
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-center py-20 flex flex-col items-center justify-center"
                                    >
                                        <div className="w-24 h-24 bg-agri-primary/10 rounded-full flex items-center justify-center text-agri-primary mb-8 animate-bounce">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h2 className="text-3xl font-bold text-agri-dark dark:text-white mb-4">Message Sent!</h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                                            Our representative from AgriConnect India will get back to you within 24 hours.
                                        </p>
                                        <button 
                                            onClick={() => setSubmitted(false)}
                                            className="mt-12 text-agri-primary font-bold hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-8"
                                    >
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                                <input required type="text" placeholder="Rahul Sharma" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-agri-primary/30 transition-all font-medium text-agri-dark dark:text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                                <input required type="email" placeholder="rahul@example.com" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-agri-primary/30 transition-all font-medium text-agri-dark dark:text-white" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">How can we help?</label>
                                            <select className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-agri-primary/30 transition-all font-medium text-agri-dark dark:text-white appearance-none">
                                                <option>General Inquiry</option>
                                                <option>Sell Crops Support</option>
                                                <option>Buyer Onboarding</option>
                                                <option>Technical Issue</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message</label>
                                            <textarea required rows="5" placeholder="Tell us more about your needs..." className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-agri-primary/30 transition-all font-medium text-agri-dark dark:text-white resize-none"></textarea>
                                        </div>
                                        <button 
                                            type="submit"
                                            className="w-full py-5 bg-agri-primary text-white rounded-2xl font-bold text-lg shadow-glow hover:bg-agri-dark transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            Send Message <Send size={20} />
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
