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
                        <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-agri-primary/10 text-agri-primary border border-agri-primary/20 text-sm font-bold mb-6">
                            <Heart size={14} className="fill-current" /> Voices of Change
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-agri-dark dark:text-white mb-8 leading-[1.1] tracking-tight">
                            Real Farmers. <br /> <span className="text-gradient">Real Success Stories.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            Hear directly from the community that grows our food about how AgriConnect is transforming livelihoods through direct trade.
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

                            {/* Media Section */}
                            <div className="w-full lg:w-1/2 relative group">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-premium aspect-[4/3]">
                                    <img 
                                        src={story.videoBg} 
                                        alt="Farm background" 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:via-black/10 transition-all duration-500"></div>
                                    
                                    {/* Video Button */}
                                    <button
                                        onClick={() => setSelectedStory(story)}
                                        className="absolute inset-0 m-auto w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 text-white hover:bg-agri-primary hover:border-agri-primary hover:scale-110 transition-all z-10 shadow-2xl group/btn"
                                    >
                                        <PlayCircle size={48} className="ml-1 group-hover/btn:fill-white/20" />
                                    </button>

                                    {/* Tags */}
                                    <div className="absolute bottom-6 left-8 flex gap-2">
                                        {story.tags.map(tag => (
                                            <span key={tag} className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Decorative elements */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-agri-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-agri-primary/20 transition-colors" />
                            </div>

                            {/* Text Context */}
                            <div className="w-full lg:w-1/2 space-y-8">
                                <div className="relative">
                                    <Quote className="text-agri-primary/20 dark:text-agri-secondary/10 w-24 h-24 absolute -top-12 -left-8 -z-10" />
                                    <blockquote className="text-3xl md:text-4xl text-agri-dark dark:text-white font-display font-bold leading-tight relative z-10">
                                        "{story.quote}"
                                    </blockquote>
                                </div>

                                <div className="flex items-center gap-6 p-6 glass rounded-3xl border-white/40 shadow-sm">
                                    <div className="relative">
                                        <img src={story.image} alt={story.name} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-agri-primary/10 shadow-lg" />
                                        <div className="absolute -bottom-2 -right-2 bg-agri-primary text-white p-1.5 rounded-lg shadow-lg">
                                            <ShieldCheck size={14} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-agri-dark dark:text-white">{story.name}</h3>
                                        <p className="text-agri-primary dark:text-agri-secondary font-bold tracking-wide uppercase text-xs mt-1">{story.farm}</p>
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

                {/* Bottom CTA Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 relative rounded-[3rem] bg-agri-dark p-12 md:p-24 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-mesh-gradient opacity-20" />
                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8">
                            Ready to write your own <br /> <span className="text-agri-primary">Success Story?</span>
                        </h2>
                        <p className="text-xl text-agri-light/70 mb-12 font-medium">
                            Join thousands of farmers who are already trading directly and earning more.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/register">
                                <button className="px-10 py-5 bg-agri-primary text-white rounded-2xl font-bold text-lg shadow-glow hover:scale-105 transition-all w-full sm:w-auto">
                                    Register as a Farmer
                                </button>
                            </Link>
                            <Link to="/marketplace">
                                <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                                    Support Our Farmers <ArrowRight size={20} />
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

