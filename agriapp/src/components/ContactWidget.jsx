import React, { useState } from 'react';
import { PhoneCall, MessageCircle, Mail, MapPin, X } from 'lucide-react';

const ContactWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const contactDetails = [
        { icon: <PhoneCall size={18} />, label: "Toll-Free", value: "1800-419-8444", color: "text-agri-primary" },
        { icon: <MessageCircle size={18} />, label: "WhatsApp", value: "+91 99887 76655", color: "text-emerald-500" },
        { icon: <Mail size={18} />, label: "Email Support", value: "support@agriconnect.in", color: "text-agri-secondary" },
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4 scale-90 md:scale-100">
            {isOpen && (
                <div className="glass p-6 rounded-[2rem] shadow-premium border border-agri-primary/20 w-72 mb-2 bg-white dark:bg-slate-900">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-agri-primary animate-pulse" />
                            <span className="font-display font-bold text-agri-dark dark:text-white uppercase tracking-widest text-[10px]">India Support</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                            <X size={16} className="text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-5">
                        {contactDetails.map((contact, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{contact.label}</span>
                                <div className="flex items-center gap-3">
                                    <div className={`${contact.color} p-2 bg-gray-50 dark:bg-gray-900 rounded-xl`}>
                                        {contact.icon}
                                    </div>
                                    <span className="text-sm font-bold text-agri-dark dark:text-gray-100">{contact.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-start gap-2">
                        <MapPin size={14} className="text-gray-400 mt-1 shrink-0" />
                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                            Level 4, Agri-Tech Park, Hebbal, Bengaluru - 560024
                        </p>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full shadow-glow flex items-center justify-center transition-all duration-300 group ${isOpen ? 'bg-agri-dark text-white' : 'bg-agri-primary text-white'}`}
            >
                {isOpen ? <X size={24} /> : <PhoneCall size={24} />}
                
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                )}
            </button>
        </div>
    );
};

export default ContactWidget;

