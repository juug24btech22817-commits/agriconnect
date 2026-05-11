import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, PlayCircle, X, ArrowRight, Heart, Users, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const stories = [
    {
        id: 1,
        name: "Sandeep Patil",
        farm: "Patil Family Farm, Maharashtra",
        quote: "AgriConnect completely changed our business. By cutting out the middleman, we increased our profit margins by 40% in just one season.",
        image: "https://images.unsplash.com/photo-1595804365737-12681fbfa968?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
        tags: ["Vegetables", "Direct Trade"]
    },
    {
        id: 2,
        name: "Meera Reddy",
        farm: "Reddy Estates, Telangana",
        quote: "The live pricing dashboard gives me the confidence to know I'm selling my coffee beans at the true market value, not what a broker dictates.",
        image: "https://images.unsplash.com/photo-1587326442657-3b28b7ed661c?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
        tags: ["Coffee", "Market Access"]
    },
    {
        id: 3,
        name: "Deepak Sharma",
        farm: "Sharma Organic Greens, Punjab",
        quote: "The buyer feedback and rating system has helped us establish a premium brand for our organic vegetables. Buyers trust us.",
        image: "https://images.unsplash.com/photo-1506807803408-db287eeb22bd?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop",
        tags: ["Organic", "Direct Sales"]
    }
];

const StoriesPage = () => {
    const [selectedStory, setSelectedStory] = useState(null);

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-20 pb-32 transition-colors duration-300 overflow-x-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-agri-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-agri-secondary/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <header className="text-center mb-24 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
                            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-gradient-to-r from-agri-primary/20 to-agri-secondary/20 text-agri-primary dark:text-agri-light border border-agri-primary/20 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-glow-sm"
                        >
                            <Heart size={12} className="fill-agri-primary animate-pulse" /> Voices of Change
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-display font-black text-agri-dark dark:text-white mb-8 leading-[1] tracking-tighter">
                            Real Farmers. <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-agri-primary via-agri-secondary to-agri-primary bg-[length:200%_auto] animate-gradient-x">Success Stories.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                            Empowering the backbone of our nation through transparency, technology, and trust.
                        </p>
                    </motion.div>
                </header>

                <div className="space-y-32">
                    {stories.map((story, idx) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}
                        >

                            <div className="w-full lg:w-1/2 relative group">
                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/3] border-4 border-white/10"
                                >
                                    <img 
                                        src={story.videoBg} 
                                        alt="Farm background" 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                    
                                    {/* Video Button */}
                                    <button
                                        onClick={() => setSelectedStory(story)}
                                        className="absolute inset-0 m-auto w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-agri-primary hover:border-agri-primary hover:scale-110 transition-all z-10 shadow-[0_0_50px_rgba(255,255,255,0.2)] group/btn"
                                    >
                                        <PlayCircle size={40} className="ml-1 group-hover/btn:fill-white/20 transition-all" />
                                    </button>
                                </motion.div>
                                
                                {/* Tags */}
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                                    {story.tags.map(tag => (
                                        <span key={tag} className="px-5 py-2.5 bg-agri-dark/80 backdrop-blur-xl rounded-2xl text-[10px] font-black uppercase tracking-widest text-white border border-white/10 shadow-xl">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Text Context */}
                            <div className="w-full lg:w-1/2 space-y-8">
                                <div className="relative">
                                    <Quote className="text-agri-primary/20 dark:text-agri-secondary/10 w-24 h-24 absolute -top-12 -left-8 -z-10" />
                                    <blockquote className="text-3xl md:text-4xl text-agri-dark dark:text-white font-display font-bold leading-tight relative z-10">
                                        "{story.quote}"
                                    </blockquote>
                                </div>

                                <div className="flex items-center gap-6 p-8 bg-white/5 dark:bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl hover:border-agri-primary/30 transition-all group/info">
                                    <div className="relative">
                                        <img src={story.image} alt={story.name} className="w-24 h-24 rounded-3xl object-cover ring-4 ring-agri-primary/10 shadow-2xl group-hover/info:scale-105 transition-transform" />
                                        <div className="absolute -bottom-2 -right-2 bg-agri-primary text-white p-2 rounded-xl shadow-xl">
                                            <ShieldCheck size={16} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-display font-black text-agri-dark dark:text-white leading-none">{story.name}</h3>
                                        <p className="text-agri-primary dark:text-agri-secondary font-black tracking-[0.2em] uppercase text-[10px] mt-3">{story.farm}</p>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* Video Player Modal Overlay */}
                <AnimatePresence>
                    {selectedStory && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-agri-dark/95 backdrop-blur-xl"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="glass rounded-[3rem] overflow-hidden max-w-5xl w-full aspect-video relative flex flex-col items-center justify-center text-white border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.2)]"
                            >
                                <button 
                                    onClick={() => setSelectedStory(null)} 
                                    className="absolute top-8 right-8 z-20 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-white border border-white/10 hover:rotate-90"
                                >
                                    <X size={24} />
                                </button>

                                <div className="text-center p-12 max-w-2xl">
                                    <div className="w-24 h-24 bg-agri-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                                        <PlayCircle size={48} className="text-agri-primary" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">Success Story: {selectedStory.name}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                        Experience the journey of {selectedStory.name} and how direct trade is empowering their community through technology.
                                    </p>
                                    <div className="inline-flex items-center gap-3 py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400">
                                        <Users size={14} /> FARMER DOCUMENTARY SERIES
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-60 relative rounded-[4rem] bg-agri-dark p-16 md:p-32 overflow-hidden border border-white/5"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15),transparent)] pointer-events-none" />
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-agri-primary/10 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-agri-secondary/10 rounded-full blur-[100px]" />
                    
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-10 tracking-tight">
                            Ready to write your own <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-agri-primary to-agri-secondary">Success Story?</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-agri-light/60 mb-16 font-medium leading-relaxed">
                            Join thousands of farmers who are already trading directly and earning more. Your future starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                            <Link to="/register" className="w-full sm:w-auto">
                                <button className="px-12 py-6 bg-agri-primary text-white rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                                    Start Your Journey
                                </button>
                            </Link>
                            <Link to="/marketplace" className="w-full sm:w-auto">
                                <button className="px-12 py-6 bg-white/5 backdrop-blur-2xl text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-widest flex items-center justify-center gap-3 group">
                                    Explore Market <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default StoriesPage;

