import { Quote, PlayCircle, X, ArrowRight, Heart, Users, ShieldCheck, TrendingUp, Globe, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
    { label: "Lives Impacted", value: "10,000+", icon: Users, color: "text-blue-500" },
    { label: "Revenue Generated", value: "₹500M+", icon: TrendingUp, color: "text-agri-primary" },
    { label: "Global Reach", value: "100+ Regions", icon: Globe, color: "text-agri-secondary" },
    { label: "Quality Awards", value: "25+", icon: Award, color: "text-purple-500" },
];

const stories = [
    {
        id: 1,
        name: "Sandeep Patil",
        farm: "Patil Family Farm, Maharashtra",
        quote: "AgriConnect completely changed our business. By cutting out the middleman, we increased our profit margins by 40% in just one season.",
        image: "https://images.unsplash.com/photo-1595804365737-12681fbfa968?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
        tags: ["Vegetables", "Direct Trade"],
        metrics: { profit: "+40%", savings: "25%" }
    },
    {
        id: 2,
        name: "Meera Reddy",
        farm: "Reddy Estates, Telangana",
        quote: "The live pricing dashboard gives me the confidence to know I'm selling my coffee beans at the true market value, not what a broker dictates.",
        image: "https://images.unsplash.com/photo-1587326442657-3b28b7ed661c?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
        tags: ["Coffee", "Market Access"],
        metrics: { profit: "+32%", savings: "18%" }
    },
    {
        id: 3,
        name: "Deepak Sharma",
        farm: "Sharma Organic Greens, Punjab",
        quote: "The buyer feedback and rating system has helped us establish a premium brand for our organic vegetables. Buyers trust us.",
        image: "https://images.unsplash.com/photo-1506807803408-db287eeb22bd?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop",
        tags: ["Organic", "Direct Sales"],
        metrics: { profit: "+55%", savings: "30%" }
    }
];

const StoriesPage = () => {
    const [selectedStory, setSelectedStory] = useState(null);

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-20 pb-32 transition-colors duration-300 overflow-x-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-agri-primary/5 rounded-full blur-[140px]" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        x: [0, -100, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-agri-secondary/5 rounded-full blur-[120px]" 
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <header className="text-center mb-32 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
                            className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md text-agri-primary dark:text-agri-secondary border border-agri-primary/10 text-xs font-black uppercase tracking-[0.3em] mb-10 shadow-premium-sm"
                        >
                            <Heart size={14} className="fill-agri-primary animate-pulse" /> Voices of Change
                        </motion.div>
                        <h1 className="text-7xl md:text-9xl font-display font-black text-agri-dark dark:text-white mb-10 leading-[0.9] tracking-tighter">
                            Real Farmers. <br /> 
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-agri-primary via-agri-secondary to-agri-primary bg-[length:200%_auto] animate-gradient-x">Success Stories.</span>
                                <motion.span 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    className="absolute bottom-4 left-0 h-4 bg-agri-primary/10 -z-10 rounded-full"
                                />
                            </span>
                        </h1>
                        <p className="text-xl md:text-3xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                            Empowering the backbone of our nation through transparency, technology, and trust.
                        </p>
                    </motion.div>
                </header>

                {/* Stats Showcase */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-40">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-premium group"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center mb-6 shadow-glow-sm group-hover:scale-110 transition-transform ${stat.color}`}>
                                <stat.icon size={28} />
                            </div>
                            <div className="text-4xl font-display font-black text-agri-dark dark:text-white mb-2">{stat.value}</div>
                            <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-48">
                    {stories.map((story, idx) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center`}
                        >

                            <div className="w-full lg:w-1/2 relative group">
                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    className="relative rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] aspect-[4/3] border-8 border-white dark:border-white/5"
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
                                        className="absolute inset-0 m-auto w-24 h-24 bg-white/20 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/30 text-white hover:bg-agri-primary hover:border-agri-primary hover:scale-110 transition-all z-10 shadow-[0_0_60px_rgba(255,255,255,0.2)] group/btn"
                                    >
                                        <PlayCircle size={48} className="ml-1 group-hover/btn:fill-white/20 transition-all" />
                                    </button>
                                </motion.div>
                                
                                {/* Tags */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                                    {story.tags.map(tag => (
                                        <span key={tag} className="px-6 py-3 bg-white dark:bg-agri-dark/90 backdrop-blur-2xl rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-agri-dark dark:text-white border border-agri-primary/20 shadow-premium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Text Context */}
                            <div className="w-full lg:w-1/2 space-y-12">
                                <div className="relative">
                                    <Quote className="text-agri-primary/20 dark:text-agri-secondary/10 w-32 h-32 absolute -top-16 -left-12 -z-10" />
                                    <blockquote className="text-4xl md:text-5xl text-agri-dark dark:text-white font-display font-bold leading-[1.1] relative z-10 tracking-tight">
                                        "{story.quote}"
                                    </blockquote>
                                </div>

                                <div className="flex flex-wrap gap-8">
                                    <div className="flex-1 min-w-[200px] p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white dark:border-white/10 shadow-premium hover:border-agri-primary/30 transition-all group/info">
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="relative">
                                                <img src={story.image} alt={story.name} className="w-20 h-20 rounded-[2rem] object-cover ring-4 ring-agri-primary/10 shadow-xl group-hover/info:scale-105 transition-transform" />
                                                <div className="absolute -bottom-2 -right-2 bg-agri-primary text-white p-2 rounded-xl shadow-xl">
                                                    <ShieldCheck size={16} />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-display font-black text-agri-dark dark:text-white leading-none">{story.name}</h3>
                                                <p className="text-agri-primary dark:text-agri-secondary font-black tracking-[0.2em] uppercase text-[10px] mt-3">{story.farm}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-agri-primary/10 dark:bg-agri-primary/5 p-4 rounded-2xl">
                                                <div className="text-agri-primary font-black text-2xl">{story.metrics.profit}</div>
                                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Profit Increase</div>
                                            </div>
                                            <div className="bg-agri-secondary/10 dark:bg-agri-secondary/5 p-4 rounded-2xl">
                                                <div className="text-agri-secondary font-black text-2xl">{story.metrics.savings}</div>
                                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cost Savings</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="inline-flex items-center gap-4 text-agri-primary dark:text-agri-secondary font-black uppercase tracking-[0.3em] text-sm group/btn hover:gap-6 transition-all">
                                    Read Full Case Study <ChevronRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                                </button>
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
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-agri-dark/95 backdrop-blur-2xl"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="bg-slate-900 rounded-[3.5rem] overflow-hidden max-w-6xl w-full aspect-video relative flex flex-col items-center justify-center text-white border border-white/10 shadow-[0_0_120px_rgba(16,185,129,0.3)] group/modal"
                            >
                                <button 
                                    onClick={() => setSelectedStory(null)} 
                                    className="absolute top-8 right-8 z-30 p-4 bg-white/10 hover:bg-agri-primary rounded-2xl transition-all text-white border border-white/10 hover:rotate-90 shadow-xl"
                                >
                                    <X size={24} />
                                </button>

                                {/* Mock Video Player Interface */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10 opacity-0 group-hover/modal:opacity-100 transition-opacity duration-500"></div>
                                
                                <img 
                                    src={selectedStory.videoBg} 
                                    className="absolute inset-0 w-full h-full object-cover blur-sm opacity-30" 
                                    alt="Background"
                                />

                                <div className="relative z-20 text-center p-12 max-w-3xl">
                                    <motion.div 
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-32 h-32 bg-agri-primary rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(16,185,129,0.6)] cursor-pointer hover:scale-110 transition-transform"
                                    >
                                        <PlayCircle size={60} className="text-white fill-white/20" />
                                    </motion.div>
                                    <h3 className="text-4xl md:text-6xl font-display font-black mb-6 tracking-tighter">Documentary: {selectedStory.name}</h3>
                                    <p className="text-gray-300 text-xl leading-relaxed mb-10 font-medium">
                                        Witness how {selectedStory.name} leveraged AgriConnect to transform their family farm into a thriving enterprise.
                                    </p>
                                    <div className="inline-flex items-center gap-4 py-3 px-6 rounded-2xl bg-white/10 border border-white/10 text-xs font-black tracking-widest text-agri-secondary uppercase">
                                        <Users size={16} /> Exclusive Farmer Series
                                    </div>
                                </div>

                                {/* Mock Controls */}
                                <div className="absolute bottom-10 left-10 right-10 z-20 opacity-0 group-hover/modal:opacity-100 transition-all duration-500 transform translate-y-4 group-hover/modal:translate-y-0">
                                    <div className="w-full h-1.5 bg-white/20 rounded-full mb-6 overflow-hidden relative">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "65%" }}
                                            className="absolute top-0 left-0 h-full bg-agri-primary"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-black tracking-widest uppercase text-white/60">
                                        <span>04:20 / 06:45</span>
                                        <div className="flex gap-6">
                                            <span>CC</span>
                                            <span>4K HD</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.section 
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-60 relative rounded-[5rem] bg-agri-dark p-20 md:p-32 overflow-hidden border border-white/10 shadow-premium"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.2),transparent)] pointer-events-none" />
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            x: [-20, 20, -20],
                            y: [-20, 20, -20]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-agri-primary/20 rounded-full blur-[120px]" 
                    />
                    <motion.div 
                        animate={{ 
                            scale: [1.2, 1, 1.2],
                            x: [20, -20, 20],
                            y: [20, -20, 20]
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-agri-secondary/20 rounded-full blur-[120px]" 
                    />
                    
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 py-2 px-4 rounded-xl bg-white/10 text-agri-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-white/10 shadow-glow-sm"
                        >
                            <Award size={14} /> Join the elite
                        </motion.div>
                        <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-12 tracking-tighter leading-none">
                            Write Your Own <br /> 
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-agri-primary via-white to-agri-secondary bg-[length:200%_auto] animate-gradient-x">Success Story.</span>
                        </h2>
                        <p className="text-2xl md:text-3xl text-agri-light/60 mb-20 font-medium leading-relaxed">
                            Join 10,000+ farmers who are already trading directly and maximizing their profits.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
                            <Link to="/register" className="w-full sm:w-auto">
                                <motion.button 
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(16,185,129,0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto px-16 py-8 bg-agri-primary text-white rounded-[2rem] font-black text-xl shadow-glow hover:bg-agri-accent transition-all uppercase tracking-[0.2em]"
                                >
                                    Start Now
                                </motion.button>
                            </Link>
                            <Link to="/marketplace" className="w-full sm:w-auto">
                                <motion.button 
                                    whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto px-16 py-8 bg-white/5 backdrop-blur-3xl text-white border-2 border-white/10 rounded-[2rem] font-black text-xl transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-4 group"
                                >
                                    The Market <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default StoriesPage;

