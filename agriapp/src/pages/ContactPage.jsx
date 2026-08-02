import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2, ChevronDown, Globe2, HelpCircle, Twitter, Facebook, Instagram, Linkedin, Youtube, Clock, Loader2, Search } from 'lucide-react';


const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedName, setSubmittedName] = useState('');
    const [openFaq, setOpenFaq] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: 'General Inquiry',
        language: 'English',
        subject: '',
        message: ''
    });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [activeOffice, setActiveOffice] = useState('bengaluru');

    const offices = {
        bengaluru: {
            id: 'bengaluru',
            title: "India Headquarters",
            address: "Level 4, Agri-Tech Park, M.G. Road, Hebbal, Bengaluru, Karnataka - 560024",
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0267727402087!2d77.5913217!3d13.0339598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17ec23fbf507%3A0x6e9f298e154f3be7!2sHebbal%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
            phone: "+91 80 4912 3456"
        },
        delhi: {
            id: 'delhi',
            title: "Regional Center",
            address: "Level 2, Seed Breeding Research Center, Pusa Road, New Delhi - 110012",
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9961678125433!2d77.1687422!3d28.6304523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02953ab709f7%3A0xe5de52d4bd280d56!2sPusa%20Road%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin",
            phone: "+91 11 4105 6789"
        }
    };

    const validateField = (name, value) => {
        switch(name) {
            case 'name':
                return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
            case 'email':
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email' : '';
            case 'phone':
                return value && !/^[6-9][0-9]{9}$/.test(value.replace(/\s+/g, '')) ? 'Please enter a valid 10-digit Indian mobile number' : '';
            case 'subject':
                return value.trim().length < 3 ? 'Subject must be at least 3 characters' : '';
            case 'message':
                return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'category' && key !== 'language') {
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTouched({ name: true, email: true, phone: true, subject: true, message: true });
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmittedName(formData.name || '');
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', category: 'General Inquiry', language: 'English', subject: '', message: '' });
            setTouched({});
            setErrors({});
            setTimeout(() => setSubmitted(false), 5000);
        }, 1500);
    };

    const contactMethods = [
        { 
            icon: <Phone className="text-agri-primary" />, 
            title: "Toll-Free Support", 
            value: "1800-102-5566", 
            link: "tel:18001025566",
            desc: "Available in 8+ Indian languages" 
        },
        { 
            icon: <MessageSquare className="text-emerald-500" />, 
            title: "WhatsApp Support", 
            value: "+91 88001 12233", 
            link: "https://wa.me/918800112233",
            desc: "Instant chat support and updates" 
        },
        { 
            icon: <Mail className="text-agri-secondary" />, 
            title: "Email Assistance", 
            value: "support@agriconnect.org", 
            link: "mailto:support@agriconnect.org",
            desc: "24/7 email help desk" 
        }
    ];

    const socialLinks = [
        { icon: <Twitter size={20} />, label: "Twitter", color: "hover:text-blue-400", href: "https://twitter.com/agriconnect" },
        { icon: <Facebook size={20} />, label: "Facebook", color: "hover:text-blue-600", href: "https://facebook.com/agriconnect" },
        { icon: <Instagram size={20} />, label: "Instagram", color: "hover:text-pink-500", href: "https://instagram.com/agriconnect" },
        { icon: <Linkedin size={20} />, label: "LinkedIn", color: "hover:text-blue-700", href: "https://linkedin.com/company/agriconnect" },
        { icon: <Youtube size={20} />, label: "YouTube", color: "hover:text-red-500", href: "https://youtube.com/agriconnect" }
    ];

    const faqs = [
        { q: "How long does it take to verify my farmer account?", a: "Verification typically takes 24-48 hours after you upload your government ID and land documents." },
        { q: "What are the service fees for direct trading?", a: "AgriConnect charges a nominal 2% platform fee on successful transactions. There are no registration or listing fees." },
        { q: "Is payment guaranteed for my produce?", a: "Yes, we use a secure escrow system. Payment is collected from the buyer before shipment and released to you upon delivery." },
        { q: "Can I sell in small quantities?", a: "Absolutely! Our platform supports both small-scale farmers and large commercial producers." },
        { q: "Can I get support in my regional language?", a: "Yes — our support team offers assistance in 8+ Indian languages, including Hindi, Kannada, Telugu, Tamil, Marathi and more." },
        { q: "How do I track my order or shipment?", a: "Once your produce is dispatched, you'll receive a real-time tracking link via SMS and WhatsApp. You can also monitor delivery status from your AgriConnect dashboard under 'My Orders'." }
    ];

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-24 pb-32 transition-colors duration-500 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-agri-primary/5 rounded-full blur-[140px] -mr-40 -mt-40 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-agri-secondary/5 rounded-full blur-[140px] -ml-40 -mb-40" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-agri-primary/10 text-agri-primary border border-agri-primary/20 text-xs font-bold tracking-widest uppercase shadow-sm">
                            <Globe2 size={14} className="animate-spin-slow" /> Multi-Language Support Available
                        </span>
                        <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold tracking-widest uppercase shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Avg. Response &lt; 24 hrs
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-display font-black text-agri-dark dark:text-white mb-6 tracking-tight leading-tight">
                        We're Here to <span className="text-gradient">Help You</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                        Whether you're a farmer, trader, or agri-entrepreneur, our dedicated team is ready to assist you—day or night, in your preferred language.
                    </p>
                    <p className="mt-4 text-sm text-gray-400 dark:text-gray-500 max-w-2xl mx-auto">
                        Need help fast? Select your issue and language, and we will route your request to the right specialist within 24 hours.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-6">
                            {contactMethods.map((method, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="glass p-8 rounded-[2.5rem] border-white/40 dark:border-white/10 flex items-start gap-6 shadow-premium group transition-all hover:border-agri-primary/30"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-500">
                                        {method.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-2">{method.title}</h3>
                                        <a href={method.link} className="text-2xl font-bold text-agri-dark dark:text-white mb-1 tracking-tight hover:text-agri-primary transition-colors block">
                                            {method.value}
                                        </a>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{method.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="glass p-8 rounded-[3rem] border border-white/20 bg-agri-primary/5 dark:bg-agri-primary/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-agri-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                            <div className="flex flex-col gap-6 relative z-10">
                                {/* Office Selection Tabs */}
                                <div className="flex gap-2 p-1 bg-white/50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <button
                                        type="button"
                                        onClick={() => setActiveOffice('bengaluru')}
                                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                                            activeOffice === 'bengaluru'
                                                ? 'bg-agri-primary text-white shadow-md'
                                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                                        }`}
                                    >
                                        Bengaluru HQ
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveOffice('delhi')}
                                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                                            activeOffice === 'delhi'
                                                ? 'bg-agri-primary text-white shadow-md'
                                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                                        }`}
                                    >
                                        New Delhi Center
                                    </button>
                                </div>

                                {/* Active Office Details & Map */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeOffice}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-2xl text-white shadow-glow ${activeOffice === 'bengaluru' ? 'bg-agri-primary' : 'bg-agri-secondary'}`}>
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-display font-bold text-agri-dark dark:text-white mb-1 tracking-tight">
                                                    {offices[activeOffice].title}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                                    {offices[activeOffice].address}
                                                </p>
                                                <p className="text-xs text-agri-primary font-semibold mt-1">
                                                    Tel: {offices[activeOffice].phone}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Embedded Google Map */}
                                        <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-inner relative bg-gray-100 dark:bg-gray-900">
                                            <iframe
                                                title={`${offices[activeOffice].title} Map`}
                                                src={offices[activeOffice].mapUrl}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0, filter: 'contrast(1.1) opacity(0.95)' }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="absolute inset-0"
                                            />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="flex items-center gap-5 pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <div className="p-3 bg-agri-secondary/10 rounded-xl text-agri-secondary">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-agri-dark dark:text-white uppercase tracking-wider flex items-center gap-2">
                                            Office Hours
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5 uppercase tracking-widest">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                Live
                                            </span>
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">Mon – Sat &nbsp;·&nbsp; 9:00 AM – 6:00 PM IST</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    {socialLinks.map((social, i) => (
                                        <motion.a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            className={`p-3 bg-white dark:bg-gray-800 rounded-xl text-gray-400 shadow-sm transition-colors ${social.color}`}
                                            title={social.label}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
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
                                        aria-live="polite"
                                    >
                                        <div className="w-24 h-24 bg-agri-primary/10 rounded-full flex items-center justify-center text-agri-primary mb-8 animate-bounce">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h2 className="text-3xl font-bold text-agri-dark dark:text-white mb-2">Message Sent, {submittedName || 'there'}! 🎉</h2>
                                        <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">Ticket confirmed</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                                            Our team will reach out to you within 24 hours in your preferred language.
                                        </p>
                                        <button 
                                            onClick={() => { setSubmitted(false); setSubmittedName(''); }}
                                            className="mt-12 py-3 px-8 bg-agri-primary text-white rounded-xl font-bold hover:bg-agri-primary/90 transition-all duration-300 shadow-sm"
                                        >
                                            Send Another Message
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
                                            <div className="space-y-2 group">
                                                <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${errors.name && touched.name ? 'text-red-500' : 'text-gray-400 group-focus-within:text-agri-primary'}`}>Full Name *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Rahul Sharma"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    aria-invalid={errors.name && touched.name}
                                                    aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                                                    aria-label="Full Name"
                                                    autoFocus
                                                    className={`w-full bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl p-4 font-medium text-agri-dark dark:text-white outline-none transition-all ${
                                                        errors.name && touched.name
                                                            ? 'border-red-500 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900'
                                                            : 'border-transparent focus:border-agri-primary/20 focus:ring-4 focus:ring-agri-primary/10 focus:bg-white dark:focus:bg-gray-700'
                                                    }`}
                                                />
                                                {errors.name && touched.name && <p id="name-error" className="text-xs text-red-500 font-medium mt-1">{errors.name}</p>}
                                            </div>
                                            <div className="space-y-2 group">
                                                <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${errors.email && touched.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-agri-primary'}`}>Email Address *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="rahul@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    aria-invalid={errors.email && touched.email}
                                                    aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                                                    aria-label="Email Address"
                                                    className={`w-full bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl p-4 font-medium text-agri-dark dark:text-white outline-none transition-all ${
                                                        errors.email && touched.email
                                                            ? 'border-red-500 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900'
                                                            : 'border-transparent focus:border-agri-primary/20 focus:ring-4 focus:ring-agri-primary/10 focus:bg-white dark:focus:bg-gray-700'
                                                    }`}
                                                />
                                                {errors.email && touched.email && <p id="email-error" className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${errors.phone && touched.phone ? 'text-red-500' : 'text-gray-400 group-focus-within:text-agri-primary'}`}>Phone Number (Optional)</label>
                                            <div className="flex gap-3">
                                                <div className="flex items-center bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-2xl px-4 py-4 font-medium text-agri-dark dark:text-white select-none shrink-0">
                                                    🇮🇳 +91
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        id="phone"
                                                        placeholder="98765 43210"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        maxLength={13}
                                                        aria-invalid={errors.phone && touched.phone}
                                                        aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                                                        className={`w-full bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl p-4 font-medium text-agri-dark dark:text-white outline-none transition-all ${
                                                            errors.phone && touched.phone
                                                                ? 'border-red-500 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900'
                                                                 : 'border-transparent focus:border-agri-primary/20 focus:ring-4 focus:ring-agri-primary/10 focus:bg-white dark:focus:bg-gray-700'
                                                        }`}
                                                    />
                                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">10-digit mobile number (e.g., 98765 43210)</p>
                                                    {errors.phone && touched.phone && <p id="phone-error" className="text-xs text-red-500 font-medium mt-1">{errors.phone}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2 group">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-agri-primary transition-colors">How can we help?</label>
                                                <div className="relative">
                                                    <select
                                                        name="category"
                                                        value={formData.category}
                                                        onChange={handleChange}
                                                        className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-2xl p-4 focus:border-agri-primary/20 focus:ring-4 focus:ring-agri-primary/10 transition-all font-medium text-agri-dark dark:text-white appearance-none cursor-pointer outline-none"
                                                    >
                                                        <option>General Inquiry</option>
                                                        <option>Sell Crops Support</option>
                                                        <option>Buyer Onboarding</option>
                                                        <option>Farmer Verification</option>
                                                        <option>Payment Issue</option>
                                                        <option>Technical Issue</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-agri-primary transition-colors" size={20} />
                                                </div>
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({ ...prev, category: 'Sell Crops Support', subject: 'Inquiry about selling crops' }));
                                                            setErrors(prev => ({ ...prev, subject: '' }));
                                                        }}
                                                        className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider transition-colors border border-emerald-500/20"
                                                    >
                                                        🌾 Sell Crops
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({ ...prev, category: 'Buyer Onboarding', subject: 'Registering as a buyer' }));
                                                            setErrors(prev => ({ ...prev, subject: '' }));
                                                        }}
                                                        className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider transition-colors border border-amber-500/20"
                                                    >
                                                        🤝 Buyer Signup
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({ ...prev, category: 'Technical Issue', subject: 'Technical support request' }));
                                                            setErrors(prev => ({ ...prev, subject: '' }));
                                                        }}
                                                        className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider transition-colors border border-blue-500/20"
                                                    >
                                                        ⚙️ Tech Support
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({ ...prev, category: 'Farmer Verification', subject: 'Help with farmer account verification' }));
                                                            setErrors(prev => ({ ...prev, subject: '' }));
                                                        }}
                                                        className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider transition-colors border border-purple-500/20"
                                                    >
                                                        ✅ Verification
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-2 group">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-agri-primary transition-colors">Preferred Language</label>
                                                <div className="relative">
                                                    <select
                                                        name="language"
                                                        value={formData.language}
                                                        onChange={handleChange}
                                                        className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-2xl p-4 focus:border-agri-primary/20 focus:ring-4 focus:ring-agri-primary/10 transition-all font-medium text-agri-dark dark:text-white appearance-none cursor-pointer outline-none"
                                                    >
                                                        <option>English</option>
                                                        <option>Hindi (हिन्दी)</option>
                                                        <option>Kannada (ಕನ್ನಡ)</option>
                                                        <option>Telugu (తెలుగు)</option>
                                                        <option>Tamil (தமிழ்)</option>
                                                        <option>Marathi (मराठी)</option>
                                                        <option>Bengali (বাংলা)</option>
                                                        <option>Gujarati (ગુજรાતી)</option>
                                                        <option>Odia (ଓଡ଼ିଆ)</option>
                                                        <option>Punjabi (ਪੰਜਾਬੀ)</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-agri-primary transition-colors" size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${errors.subject && touched.subject ? 'text-red-500' : 'text-gray-400 group-focus-within:text-agri-primary'}`}>Subject *</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                placeholder="Short summary"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-invalid={errors.subject && touched.subject}
                                                aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
                                                aria-label="Subject"
                                                className={`w-full bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl p-4 font-medium text-agri-dark dark:text-white outline-none transition-all ${
                                                    errors.subject && touched.subject
                                                        ? 'border-red-500 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900'
                                                        : 'border-transparent focus:border-agri-primary/20 focus:ring-4 focus:ring-agri-primary/10 focus:bg-white dark:focus:bg-gray-700'
                                                }`}
                                            />
                                            {errors.subject && touched.subject && <p id="subject-error" className="text-xs text-red-500 font-medium mt-1">{errors.subject}</p>}
                                        </div>
                                        <div className="space-y-2 group">
                                            <div className="flex justify-between items-center">
                                                <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${errors.message && touched.message ? 'text-red-500' : 'text-gray-400 group-focus-within:text-agri-primary'}`}>Message *</label>
                                                <span className={`text-xs font-medium ${formData.message.trim().length < 10 ? 'text-gray-400' : 'text-agri-primary'}`}>{formData.message.length}/500</span>
                                            </div>
                                            <textarea
                                                rows="5"
                                                name="message"
                                                placeholder="Tell us more about your needs..."
                                                maxLength={500}
                                                value={formData.message}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-label="Message"
                                                className={`w-full bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl p-4 font-medium text-agri-dark dark:text-white resize-none outline-none transition-all ${
                                                    errors.message && touched.message
                                                        ? 'border-red-500 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900'
                                                        : 'border-transparent focus:border-agri-primary/20 focus:ring-4 focus:ring-agri-primary/10 focus:bg-white dark:focus:bg-gray-700'
                                                }`}
                                            ></textarea>
                                            {errors.message && touched.message && <p className="text-xs text-red-500 font-medium mt-1">{errors.message}</p>}
                                        </div>
                                        <button 
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-5 bg-agri-primary text-white rounded-2xl font-bold text-xl shadow-glow hover:bg-agri-dark transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed overflow-hidden relative group"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={22} className="animate-spin" />
                                                    Sending your message…
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* FAQ Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 max-w-4xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-agri-primary/10 text-agri-primary border border-agri-primary/20 text-xs font-bold mb-4 tracking-widest uppercase">
                            <HelpCircle size={13} /> FAQ
                        </span>
                        <h2 className="text-4xl font-display font-bold text-agri-dark dark:text-white mb-4">Common Questions</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Quick answers to frequently asked support queries — no waiting required.</p>
                    </div>

                    {/* FAQ Search Bar */}
                    <div className="mb-10 max-w-md mx-auto relative group">
                        <input
                            type="text"
                            placeholder="Search frequently asked questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-2xl py-4 px-6 pl-14 text-agri-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-agri-primary focus:border-transparent transition-all shadow-sm group-hover:border-gray-300 dark:group-hover:border-gray-700"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-agri-primary transition-colors" size={20} />
                    </div>

                    <div className="space-y-4">
                        {faqs.filter(faq => 
                            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((faq, idx) => (
                            <div key={idx} className="glass rounded-[2rem] border-white/20 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-agri-primary/5 transition-colors group"
                                >
                                    <span className="text-lg font-bold text-agri-dark dark:text-white flex items-center gap-3 group-hover:text-agri-primary transition-colors">
                                        <HelpCircle size={20} className="text-agri-primary opacity-50" />
                                        {faq.q}
                                    </span>
                                    <ChevronDown className={`text-gray-400 transition-transform duration-300 ${openFaq === faq.q ? 'rotate-180 text-agri-primary' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaq === faq.q && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-8 text-gray-500 dark:text-gray-400 font-medium leading-relaxed ml-8">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                        {faqs.filter(faq => 
                            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length === 0 && (
                            <p className="text-center text-gray-400 py-8 font-medium">No matches found for "{searchQuery}"</p>
                        )}
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default ContactPage;

