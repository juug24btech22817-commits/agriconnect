import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, PlayCircle, X, ArrowRight, Heart, Users, ShieldCheck, TrendingUp, Globe, Award, ChevronRight, Search, Plus, Play, Pause, MessageSquare, Star, SlidersHorizontal, Sparkles, Eye, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
    { label: "Lives Impacted", value: "20,000+", icon: Users, color: "text-blue-500" },
    { label: "Revenue Generated", value: "₹950M+", icon: TrendingUp, color: "text-agri-primary" },
    { label: "Global Reach", value: "150+ Regions", icon: Globe, color: "text-agri-secondary" },
    { label: "Quality Awards", value: "35+", icon: Award, color: "text-purple-500" },
];

const stories = [
    {
        id: 8,
        name: "Sunita Devi",
        farm: "Himachal Orchards, Shimla",
        quote: "AgriConnect enabled direct sales of our premium Shimla Royal apples to top fruit retail chains. We bypassed four layers of brokers, securing 60% higher returns on our harvest.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1615220368123-9bb8faa5610f?q=80&w=800&auto=format&fit=crop",
        tags: ["Organic", "Direct Sales"],
        metrics: { profit: "+60%", savings: "35%", rating: "5.0", reviews: "28" }
    },
    {
        id: 7,
        name: "Devendra Hegde",
        farm: "Western Ghats Vanilla Plantation, Karnataka",
        quote: "Direct exports via AgriConnect doubled our vanilla beans revenue. This gave us the resource to invest in automated drip irrigation and scale our farm operations globally.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=800&auto=format&fit=crop",
        tags: ["Vanilla", "Smart Farming", "Direct Trade"],
        metrics: { profit: "+110%", savings: "40%", rating: "5.0", reviews: "45" }
    },
    {
        id: 6,
        name: "Harish Patel",
        farm: "Patil Smart Farms, Gujarat",
        quote: "Implementing drone-based crop monitoring and purchasing inputs directly through AgriConnect reduced our input costs by 30% and increased wheat yield by 45%.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop",
        tags: ["Smart Farming", "Grains"],
        metrics: { profit: "+45%", savings: "30%", rating: "5.0", reviews: "72" }
    },
    {
        id: 1,
        name: "Sandeep Patil",
        farm: "Patil Family Farm, Maharashtra",
        quote: "AgriConnect completely changed our business. By cutting out the middleman, we increased our profit margins by 40% in just one season.",
        image: "https://images.unsplash.com/photo-1595804365737-12681fbfa968?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
        tags: ["Vegetables", "Direct Trade"],
        metrics: { profit: "+40%", savings: "25%", rating: "4.9", reviews: "48" }
    },
    {
        id: 2,
        name: "Meera Reddy",
        farm: "Reddy Estates, Telangana",
        quote: "The live pricing dashboard gives me the confidence to know I'm selling my coffee beans at the true market value, not what a broker dictates.",
        image: "https://images.unsplash.com/photo-1587326442657-3b28b7ed661c?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
        tags: ["Coffee", "Market Access"],
        metrics: { profit: "+32%", savings: "18%", rating: "4.8", reviews: "36" }
    },
    {
        id: 3,
        name: "Deepak Sharma",
        farm: "Sharma Organic Greens, Punjab",
        quote: "The buyer feedback and rating system has helped us establish a premium brand for our organic vegetables. Buyers trust us.",
        image: "https://images.unsplash.com/photo-1506807803408-db287eeb22bd?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop",
        tags: ["Organic", "Direct Sales"],
        metrics: { profit: "+55%", savings: "30%", rating: "5.0", reviews: "64" }
    },
    {
        id: 4,
        name: "Ananya Nair",
        farm: "Nair Spices & Horticulture, Kerala",
        quote: "AgriConnect has helped us export our premium black pepper and cardamoms directly to buyers globally. Our family revenue grew by 85% in just 10 months.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop",
        tags: ["Spices", "Direct Trade"],
        metrics: { profit: "+85%", savings: "35%", rating: "4.9", reviews: "52" }
    },
    {
        id: 5,
        name: "Rajesh Grewal",
        farm: "Grewal Wheat Farms, Haryana",
        quote: "Selling our premium wheat crop directly to big processing plants in Delhi was a dream before AgriConnect. We got paid in 48 hours and saw a massive increase in our household income!",
        image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop",
        tags: ["Grains", "Direct Sales"],
        metrics: { profit: "+48%", savings: "22%", rating: "4.7", reviews: "29" }
    }
];

const StoriesPage = () => {
    const [activeStories, setActiveStories] = useState(stories);
    const [selectedStory, setSelectedStory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortMode, setSortMode] = useState("impact");
    
    // Likes and Views state
    const [storyLikes, setStoryLikes] = useState({ 1: 142, 2: 98, 3: 215, 4: 189, 5: 310, 6: 425, 7: 512, 8: 624 });
    const [storyViews, setStoryViews] = useState({ 1: 1240, 2: 950, 3: 1840, 4: 1530, 5: 2200, 6: 3100, 7: 4120, 8: 5120 });
    const [likedStories, setLikedStories] = useState({});
    
    // Video playback state
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(65);
    
    // Share story state
    const [sharedStoryId, setSharedStoryId] = useState(null);

    const handleShare = (storyId) => {
        navigator.clipboard.writeText(`${window.location.origin}/stories#story-${storyId}`);
        setSharedStoryId(storyId);
        setTimeout(() => setSharedStoryId(null), 2000);
    };
    
    // Share story modal state
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [newStoryForm, setNewStoryForm] = useState({
        name: "",
        farm: "",
        quote: "",
        category: "Vegetables",
        profit: "+30%",
        savings: "20%"
    });

    useEffect(() => {
        let interval;
        if (isPlaying && selectedStory) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 0.5;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, selectedStory]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setSelectedStory(null);
                setIsSubmitModalOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    // Calculate formatted time based on progress of a 5-minute video (300 seconds)
    const totalDuration = 300; // 5:00
    const currentSeconds = Math.floor((progress / 100) * totalDuration);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    const currentTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const handleSelectStory = (story) => {
        setSelectedStory(story);
        setIsPlaying(false);
        setProgress(0);
        setStoryViews(prev => ({
            ...prev,
            [story.id]: (prev[story.id] || 0) + 1
        }));
    };

    const handleAddStory = (e) => {
        e.preventDefault();
        if (!newStoryForm.name || !newStoryForm.farm || !newStoryForm.quote) return;
        
        const newId = Math.max(...activeStories.map((story) => story.id), 0) + 1;
        const newStory = {
            id: newId,
            name: newStoryForm.name,
            farm: newStoryForm.farm,
            quote: newStoryForm.quote,
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", // Elegant default farmer avatar
            videoBg: "https://images.unsplash.com/photo-1500937386664-56d159062255?q=80&w=800&auto=format&fit=crop", // Beautiful farm default
            tags: [newStoryForm.category, "Direct Trade"],
            metrics: { profit: newStoryForm.profit, savings: newStoryForm.savings, rating: "5.0", reviews: "1" }
        };
        
        setActiveStories([newStory, ...activeStories]);
        setStoryLikes(prev => ({ ...prev, [newId]: 0 }));
        setStoryViews(prev => ({ ...prev, [newId]: 0 }));
        setIsSubmitModalOpen(false);
        // Reset form
        setNewStoryForm({
            name: "",
            farm: "",
            quote: "",
            category: "Vegetables",
            profit: "+30%",
            savings: "20%"
        });
    };

    const toggleLike = (storyId) => {
        const isLiked = likedStories[storyId];
        setLikedStories(prev => ({
            ...prev,
            [storyId]: !isLiked
        }));
        setStoryLikes(prev => ({
            ...prev,
            [storyId]: Math.max(0, prev[storyId] + (isLiked ? -1 : 1))
        }));
    };

    const categories = useMemo(() => ["All", ...new Set(activeStories.flatMap((story) => story.tags))], [activeStories]);

    const filteredStories = activeStories.filter(story => {
        const matchesSearch = story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              story.farm.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              story.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCategory = selectedCategory === "All" || story.tags.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        if (sortMode === "liked") return (storyLikes[b.id] || 0) - (storyLikes[a.id] || 0);
        if (sortMode === "rating") return Number(b.metrics.rating || 0) - Number(a.metrics.rating || 0);
        return parseInt(b.metrics.profit, 10) - parseInt(a.metrics.profit, 10);
    });

    const featuredStory = filteredStories.length > 0 ? filteredStories[0] : null;

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
        setSortMode("impact");
    };

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

                <header className="text-center mb-14 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
                            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md text-agri-primary dark:text-agri-secondary border border-agri-primary/10 text-xs font-black uppercase tracking-[0.22em] mb-8 shadow-premium-sm"
                        >
                            <Heart size={14} className="fill-agri-primary animate-pulse" /> Voices of Change
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-agri-dark dark:text-white mb-7 leading-[0.98] tracking-tight">
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
                        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                            Empowering farmers through transparency, technology, and trust.
                        </p>
                        <div className="mt-7 text-sm uppercase tracking-[0.22em] font-black text-agri-primary dark:text-agri-secondary">
                            Showing {filteredStories.length} impact {filteredStories.length === 1 ? 'story' : 'stories'}
                        </div>
                    </motion.div>
                </header>

                {/* Stats Showcase */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-premium group"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center mb-5 shadow-glow-sm group-hover:scale-110 transition-transform ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="text-3xl font-display font-black text-agri-dark dark:text-white mb-2">{stat.value}</div>
                            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Search and Filters Section */}
                <div className="mb-10 p-5 rounded-2xl bg-white/75 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-premium flex flex-col xl:flex-row gap-4 justify-between items-center relative z-20">
                    <div className="relative w-full xl:w-96 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-agri-primary transition-colors" size={20} />
                        <input
                            type="text"
                            aria-label="Search stories, regions, crops"
                            placeholder="Search stories, regions, crops, farmers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-12 py-4 bg-white/80 dark:bg-slate-900/60 rounded-xl text-agri-dark dark:text-white border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-agri-primary/50 transition-all font-medium placeholder-gray-400"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                aria-label="Clear search"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-agri-primary transition-colors"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-center justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-[0.12em] transition-all border ${
                                    selectedCategory === cat
                                        ? "bg-agri-primary text-white border-agri-primary shadow-glow-sm scale-105"
                                        : "bg-white/40 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-white/20 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex w-full sm:w-auto items-center gap-2 rounded-xl bg-white/50 dark:bg-white/5 border border-white/30 dark:border-white/10 p-1">
                        <SlidersHorizontal size={16} className="ml-3 text-gray-400" />
                        {[
                            ["impact", "Impact"],
                            ["liked", "Liked"],
                            ["rating", "Rating"]
                        ].map(([value, label]) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setSortMode(value)}
                                className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                    sortMode === value
                                        ? "bg-agri-dark text-white dark:bg-white dark:text-agri-dark"
                                        : "text-gray-500 dark:text-gray-400 hover:text-agri-primary"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    
                    <button
                        onClick={resetFilters}
                        className="hidden xl:inline-flex px-5 py-3 bg-white/40 dark:bg-white/5 text-agri-dark dark:text-white rounded-xl font-black text-xs uppercase tracking-[0.16em] transition-all border border-white/20 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10"
                    >
                        Reset Filters
                    </button>
                    
                    <button
                        onClick={() => setIsSubmitModalOpen(true)}
                        className="w-full xl:w-auto px-6 py-4 bg-agri-secondary text-white rounded-xl font-black text-xs uppercase tracking-[0.16em] shadow-glow-sm hover:bg-agri-secondary/80 hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={16} /> Submit Your Story
                    </button>
                </div>

                {featuredStory && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch rounded-3xl bg-agri-dark text-white overflow-hidden shadow-premium border border-white/10"
                    >
                        <div className="p-8 md:p-10 flex flex-col justify-between gap-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-agri-secondary text-[10px] font-black uppercase tracking-[0.22em] mb-6">
                                    <Sparkles size={14} /> Featured Impact
                                </div>
                                <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight mb-5">
                                    {featuredStory.name} grew profits by {featuredStory.metrics.profit}
                                </h2>
                                <p className="text-agri-light/70 text-lg leading-relaxed max-w-2xl">
                                    {featuredStory.quote}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                {featuredStory.tags.map((tag) => (
                                    <span key={tag} className="px-4 py-2 rounded-xl bg-white/10 text-xs font-black uppercase tracking-widest text-white/80">
                                        {tag}
                                    </span>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleSelectStory(featuredStory)}
                                    className="ml-0 sm:ml-auto px-5 py-3 rounded-xl bg-agri-primary text-white text-xs font-black uppercase tracking-widest inline-flex items-center gap-2 hover:bg-agri-accent transition-colors"
                                >
                                    Watch Story <PlayCircle size={18} />
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleSelectStory(featuredStory)}
                            className="relative min-h-[280px] overflow-hidden text-left group"
                            aria-label={`Watch featured story from ${featuredStory.name}`}
                        >
                            <img loading="lazy" src={featuredStory.videoBg} alt={`${featuredStory.name} farm`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-black uppercase tracking-widest text-white/70">{featuredStory.farm}</div>
                                    <div className="mt-2 flex items-center gap-2 text-amber-300 font-black">
                                        <Star size={16} className="fill-amber-300" /> {featuredStory.metrics.rating} rating
                                    </div>
                                </div>
                                <span className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/20">
                                    <PlayCircle size={30} />
                                </span>
                            </div>
                        </button>
                    </motion.section>
                )}

                <div className="space-y-24">
                    {filteredStories.length > 0 ? (
                        filteredStories.map((story, idx) => (
                            <motion.div
                                key={story.id}
                                layout
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -10 }}
                                className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center p-8 rounded-[2.5rem] bg-white/30 dark:bg-slate-900/20 backdrop-blur-sm border border-transparent hover:border-white/40 dark:hover:border-white/5 hover:bg-white/60 dark:hover:bg-slate-900/40 hover:shadow-premium-lg transition-all duration-500`}
                            >

                                <div className="w-full lg:w-1/2 relative group">
                                    <motion.div 
                                        whileHover={{ scale: 1.04, rotate: idx % 2 === 0 ? 1 : -1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="relative rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] aspect-[4/3] border-8 border-white dark:border-white/5 cursor-pointer"
                                    >
                                        <img 
                                            loading="lazy"
                                            src={story.videoBg} 
                                            alt={`${story.name} story background`} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                        
                                        {/* Video Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.15, rotate: 90 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleSelectStory(story)}
                                            className="absolute inset-0 m-auto w-20 h-20 bg-white/25 backdrop-blur-3xl rounded-2xl flex items-center justify-center border border-white/40 text-white z-10 shadow-[0_0_60px_rgba(255,255,255,0.2)] group/btn hover:bg-agri-primary hover:border-agri-primary transition-all duration-300"
                                        >
                                            <PlayCircle size={42} className="group-hover/btn:fill-white/20 transition-all" />
                                        </motion.button>
                                    </motion.div>
                                    
                                    {/* Tags */}
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                                        {story.tags.map(tag => (
                                            <motion.span 
                                                key={tag} 
                                                whileHover={{ y: -3, scale: 1.05 }}
                                                className="px-5 py-3 bg-white dark:bg-agri-dark/95 backdrop-blur-2xl rounded-xl text-xs font-black uppercase tracking-[0.16em] text-agri-dark dark:text-white border border-agri-primary/20 shadow-premium cursor-default"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Text Context */}
                                <div className="w-full lg:w-1/2 space-y-12">
                                    <div className="relative">
                                        <Quote className="text-agri-primary/20 dark:text-agri-secondary/10 w-32 h-32 absolute -top-16 -left-12 -z-10 animate-pulse" />
                                        <blockquote className="text-2xl md:text-4xl text-agri-dark dark:text-white font-display font-bold leading-[1.16] relative z-10 tracking-tight transition-colors duration-300 group-hover:text-agri-primary dark:group-hover:text-agri-secondary">
                                            "{story.quote}"
                                        </blockquote>
                                    </div>

                                    <div className="flex flex-wrap gap-8">
                                        <motion.div 
                                            whileHover={{ scale: 1.02, y: -4 }}
                                            className="flex-1 min-w-[200px] p-6 bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white dark:border-white/10 shadow-premium hover:border-agri-primary/30 transition-all group/info"
                                        >
                                            <div className="flex items-center gap-6 mb-8">
                                                <div className="relative overflow-hidden rounded-2xl">
                                                    <motion.img 
                                                        whileHover={{ scale: 1.15 }}
                                                        loading="lazy" 
                                                        src={story.image} 
                                                        alt={story.name} 
                                                        className="w-20 h-20 rounded-2xl object-cover ring-4 ring-agri-primary/10 shadow-xl transition-transform duration-500" 
                                                    />
                                                    <div className="absolute -bottom-2 -right-2 bg-agri-primary text-white p-2 rounded-xl shadow-xl">
                                                        <ShieldCheck size={16} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl md:text-3xl font-display font-black text-agri-dark dark:text-white leading-none">{story.name}</h3>
                                                    <p className="text-agri-primary dark:text-agri-secondary font-black tracking-[0.14em] uppercase text-[10px] mt-3">{story.farm}</p>
                                                    <div className="flex items-center gap-1.5 mt-2 bg-amber-500/10 text-amber-500 dark:text-amber-400 px-3 py-1 rounded-lg w-fit">
                                                        <Star size={12} className="fill-amber-500 text-amber-500" />
                                                        <span className="text-xs font-black">{story.metrics.rating || "5.0"}</span>
                                                        <span className="text-[10px] opacity-70">({story.metrics.reviews || "1"})</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-agri-primary/10 dark:bg-agri-primary/5 p-4 rounded-2xl transition-all duration-300 hover:bg-agri-primary/20">
                                                    <div className="text-agri-primary font-black text-2xl">{story.metrics.profit}</div>
                                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Profit Increase</div>
                                                </div>
                                                <div className="bg-agri-secondary/10 dark:bg-agri-secondary/5 p-4 rounded-2xl transition-all duration-300 hover:bg-agri-secondary/20">
                                                    <div className="text-agri-secondary font-black text-2xl">{story.metrics.savings}</div>
                                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cost Savings</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                                        <button 
                                            onClick={() => handleSelectStory(story)}
                                            className="inline-flex items-center gap-4 text-agri-primary dark:text-agri-secondary font-black uppercase tracking-[0.3em] text-sm group/btn hover:gap-6 transition-all"
                                        >
                                            View Story Details <ChevronRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                                        </button>
                                        
                                        <div className="flex items-center gap-3">
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleLike(story.id)}
                                                className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all ${
                                                    likedStories[story.id]
                                                        ? "bg-red-500/10 border-red-500/30 text-red-500"
                                                        : "bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-red-500 hover:border-red-500/20"
                                                }`}
                                            >
                                                <Heart size={16} className={likedStories[story.id] ? "fill-red-500 animate-pulse" : ""} />
                                                <span className="text-xs font-black">{storyLikes[story.id] || 0}</span>
                                            </motion.button>

                                            <div className="flex items-center gap-2 px-5 py-3 rounded-full border bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/10 text-gray-500 dark:text-gray-400">
                                                <Eye size={16} />
                                                <span className="text-xs font-black">{storyViews[story.id] || 0}</span>
                                            </div>

                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleShare(story.id)}
                                                className={`flex items-center gap-2 px-5 py-3 rounded-full border bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-agri-primary hover:border-agri-primary/20 transition-all`}
                                            >
                                                <Share2 size={16} />
                                                <span className="text-xs font-black">
                                                    {sharedStoryId === story.id ? "Copied!" : "Share"}
                                                </span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white/20 dark:bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-xl p-12 max-w-xl mx-auto">
                            <MessageSquare className="mx-auto text-agri-primary/40 mb-6" size={48} />
                            <h3 className="text-2xl font-display font-black text-agri-dark dark:text-white mb-3">No Success Stories Found</h3>
                            <p className="text-gray-400 text-sm mb-8">No stories matched "{searchQuery || 'your selection'}" in {selectedCategory} yet. Try another crop, region, or share your own story.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-3">
                                <button
                                    onClick={resetFilters}
                                    className="px-6 py-4 bg-white text-agri-dark rounded-xl font-black text-xs uppercase tracking-[0.16em] shadow-glow-sm hover:scale-105 transition-all"
                                >
                                    Reset Filters
                                </button>
                                <button
                                    onClick={() => setIsSubmitModalOpen(true)}
                                    className="px-6 py-4 bg-agri-primary text-white rounded-xl font-black text-xs uppercase tracking-[0.16em] shadow-glow-sm hover:scale-105 transition-all"
                                >
                                    Submit Your Story
                                </button>
                            </div>
                        </div>
                    )}
                </div>


                {/* Video Player Modal Overlay */}
                <AnimatePresence>
                    {selectedStory && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedStory(null)}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-agri-dark/95 backdrop-blur-2xl"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                onClick={(e) => e.stopPropagation()}
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
                                        animate={isPlaying ? {} : { scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-32 h-32 bg-agri-primary rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(16,185,129,0.6)] cursor-pointer hover:scale-110 transition-transform text-white"
                                    >
                                        {isPlaying ? (
                                            <Pause size={50} className="text-white fill-white/20 animate-pulse" />
                                        ) : (
                                            <Play size={50} className="text-white fill-white/20 ml-1.5" />
                                        )}
                                    </motion.div>
                                    <h3 className="text-4xl md:text-6xl font-display font-black mb-6 tracking-tighter">
                                        {isPlaying ? "Playing Story" : "Story Preview"}: {selectedStory.name}
                                    </h3>
                                    <p className="text-gray-300 text-xl leading-relaxed mb-10 font-medium">
                                        {isPlaying 
                                            ? `Sit back and learn how ${selectedStory.name} revolutionized their farming standard operating procedures.`
                                            : `Witness how ${selectedStory.name} leveraged AgriConnect to transform their family farm into a thriving enterprise.`}
                                    </p>
                                    <div className="inline-flex items-center gap-4 py-3 px-6 rounded-2xl bg-white/10 border border-white/10 text-xs font-black tracking-widest text-agri-secondary uppercase">
                                        {isPlaying ? (
                                            <span className="flex h-2.5 w-2.5 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                            </span>
                                        ) : (
                                            <Users size={16} />
                                        )}
                                        {isPlaying ? "LIVE STORY PREVIEW" : "Story Preview"}
                                    </div>
                                </div>

                                {/* Mock Controls */}
                                <div className="absolute bottom-10 left-10 right-10 z-20 opacity-0 group-hover/modal:opacity-100 transition-all duration-500 transform translate-y-4 group-hover/modal:translate-y-0">
                                    <div 
                                        className="w-full h-1.5 bg-white/20 rounded-full mb-6 overflow-hidden relative cursor-pointer"
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const clickX = e.clientX - rect.left;
                                            const newProgress = (clickX / rect.width) * 100;
                                            setProgress(newProgress);
                                        }}
                                    >
                                        <motion.div 
                                            style={{ width: `${progress}%` }}
                                            className="absolute top-0 left-0 h-full bg-agri-primary"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-black tracking-widest uppercase text-white/60">
                                        <span>{currentTime} / 05:00</span>
                                        <div className="flex gap-6 items-center">
                                            <button 
                                                onClick={() => setIsPlaying(!isPlaying)}
                                                className="hover:text-white font-bold"
                                            >
                                                {isPlaying ? "PAUSE" : "PLAY"}
                                            </button>
                                            <span>CC</span>
                                            <span>4K HD</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Submit Story Modal */}
                <AnimatePresence>
                    {isSubmitModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSubmitModalOpen(false)}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-agri-dark/95 backdrop-blur-2xl"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-slate-900/90 rounded-[3.5rem] border border-white/10 p-12 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
                            >
                                <button
                                    onClick={() => setIsSubmitModalOpen(false)}
                                    className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-red-500 rounded-2xl text-white transition-all hover:rotate-90"
                                >
                                    <X size={20} />
                                </button>
                                
                                <div className="text-center mb-10">
                                    <div className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-agri-secondary/15 text-agri-secondary text-[10px] font-black tracking-widest mb-4">
                                        <MessageSquare size={12} /> Share Your Success
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">Your Success Story</h3>
                                    <p className="text-gray-400 text-sm mt-2">Inspire thousands of other farmers by sharing your AgriConnect journey.</p>
                                </div>
                                
                                <form onSubmit={handleAddStory} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Your Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Ramesh Kumar"
                                                value={newStoryForm.name}
                                                onChange={(e) => setNewStoryForm({...newStoryForm, name: e.target.value})}
                                                className="w-full px-5 py-4 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-agri-secondary/50 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Farm & Location</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Green Valley, Karnataka"
                                                value={newStoryForm.farm}
                                                onChange={(e) => setNewStoryForm({...newStoryForm, farm: e.target.value})}
                                                className="w-full px-5 py-4 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-agri-secondary/50 font-medium"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Crop / Category</label>
                                        <select
                                            value={newStoryForm.category}
                                            onChange={(e) => setNewStoryForm({...newStoryForm, category: e.target.value})}
                                            className="w-full px-5 py-4 bg-slate-800 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-agri-secondary/50 font-medium"
                                        >
                                            {["Vegetables", "Coffee", "Spices", "Organic", "Direct Trade", "Market Access"].map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Profit Increase</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. +35%"
                                                value={newStoryForm.profit}
                                                onChange={(e) => setNewStoryForm({...newStoryForm, profit: e.target.value})}
                                                className="w-full px-5 py-4 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-agri-secondary/50 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Cost Savings</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 20%"
                                                value={newStoryForm.savings}
                                                onChange={(e) => setNewStoryForm({...newStoryForm, savings: e.target.value})}
                                                className="w-full px-5 py-4 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-agri-secondary/50 font-medium"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Your Story Quote</label>
                                        <textarea
                                            required
                                            rows={3}
                                            placeholder="Write a short quote about how AgriConnect helped your business..."
                                            value={newStoryForm.quote}
                                            onChange={(e) => setNewStoryForm({...newStoryForm, quote: e.target.value})}
                                            className="w-full px-5 py-4 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-agri-secondary/50 font-medium resize-none"
                                        />
                                    </div>
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-4 bg-gradient-to-r from-agri-primary to-agri-secondary text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-glow hover:brightness-110 transition-all mt-4"
                                    >
                                        Publish Success Story
                                    </motion.button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Impact Timeline ─────────────────────────────── */}
                <motion.section
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-40 mb-24"
                >
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 py-2 px-5 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md text-agri-primary dark:text-agri-secondary border border-agri-primary/10 text-xs font-black uppercase tracking-[0.22em] mb-6 shadow-premium-sm">
                            <TrendingUp size={13} /> Our Journey
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-agri-dark dark:text-white tracking-tight mb-4">
                            Impact Timeline
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
                            Every milestone tells the story of thousands of farmers we've empowered.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Central line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-agri-primary via-agri-secondary to-agri-primary/20 hidden lg:block" />

                        <div className="space-y-10 lg:space-y-0">
                            {[
                                { year: "2021", title: "AgriConnect Launched", desc: "Started with 50 pilot farmers across Maharashtra, bridging the gap between fields and markets.", icon: "🌱", side: "left", color: "from-emerald-500/20 to-emerald-500/5" },
                                { year: "2022", title: "1,000 Farmers Onboarded", desc: "Expanded to 8 states. Average income rose 28% for registered farmers within the first year.", icon: "🚀", side: "right", color: "from-blue-500/20 to-blue-500/5" },
                                { year: "2023", title: "₹100M in Direct Trades", desc: "Crossed the ₹100 million mark in direct farmer-to-buyer transactions, cutting out middlemen.", icon: "💰", side: "left", color: "from-amber-500/20 to-amber-500/5" },
                                { year: "2024", title: "Global Reach — 50 Countries", desc: "Premium Indian produce now exports directly to buyers in 50+ countries, powered by our platform.", icon: "🌍", side: "right", color: "from-purple-500/20 to-purple-500/5" },
                                { year: "2025", title: "15,000+ Lives Transformed", desc: "A decade of impact compressed into 4 years. ₹750M+ in generated revenue for farming families.", icon: "🏆", side: "left", color: "from-agri-primary/20 to-agri-secondary/5" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: item.side === "left" ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.7, delay: i * 0.1 }}
                                    className={`lg:flex ${item.side === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-0 mb-10 lg:mb-16`}
                                >
                                    <div className={`lg:w-[calc(50%-3rem)] ${item.side === "right" ? "lg:pl-12" : "lg:pr-12 lg:text-right"}`}>
                                        <motion.div
                                            whileHover={{ y: -4, scale: 1.02 }}
                                            className={`p-7 rounded-3xl bg-gradient-to-br ${item.color} border border-white/40 dark:border-white/10 backdrop-blur-xl shadow-premium`}
                                        >
                                            <div className="text-4xl mb-3">{item.icon}</div>
                                            <div className="text-agri-primary dark:text-agri-secondary font-black text-xs uppercase tracking-[0.22em] mb-2">{item.year}</div>
                                            <h3 className="text-xl font-display font-black text-agri-dark dark:text-white mb-2">{item.title}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                        </motion.div>
                                    </div>
                                    {/* Dot on timeline */}
                                    <div className="hidden lg:flex w-24 justify-center shrink-0">
                                        <div className="w-6 h-6 rounded-full bg-agri-primary shadow-glow-sm border-4 border-white dark:border-slate-950 relative z-10" />
                                    </div>
                                    <div className="lg:w-[calc(50%-3rem)]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* ── Crop Categories Showcase ─────────────────────── */}
                <motion.section
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 py-2 px-5 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md text-agri-secondary border border-agri-secondary/10 text-xs font-black uppercase tracking-[0.22em] mb-6 shadow-premium-sm">
                            <Globe size={13} /> Produce Categories
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-agri-dark dark:text-white tracking-tight mb-4">
                            What Farmers Grow
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
                            From grains to spices, AgriConnect spans every corner of Indian agriculture.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { emoji: "🌾", name: "Grains", count: "2,400+", color: "hover:border-amber-400/50 hover:bg-amber-400/5", badge: "amber" },
                            { emoji: "🥦", name: "Vegetables", count: "3,100+", color: "hover:border-green-400/50 hover:bg-green-400/5", badge: "green" },
                            { emoji: "🍊", name: "Fruits", count: "1,800+", color: "hover:border-orange-400/50 hover:bg-orange-400/5", badge: "orange" },
                            { emoji: "🌶️", name: "Spices", count: "940+", color: "hover:border-red-400/50 hover:bg-red-400/5", badge: "red" },
                            { emoji: "☕", name: "Beverages", count: "520+", color: "hover:border-brown-400/50 hover:bg-yellow-900/10", badge: "yellow" },
                            { emoji: "🌿", name: "Organic", count: "1,200+", color: "hover:border-emerald-400/50 hover:bg-emerald-400/5", badge: "emerald" },
                        ].map((cat, i) => (
                            <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.5 }}
                                whileHover={{ y: -8, scale: 1.04 }}
                                className={`flex flex-col items-center justify-center p-7 rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-premium cursor-pointer transition-all duration-300 ${cat.color} group`}
                            >
                                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{cat.emoji}</div>
                                <div className="font-display font-black text-agri-dark dark:text-white text-sm mb-1">{cat.name}</div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cat.count} farmers</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* ── Testimonials Ticker ──────────────────────────── */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-24 overflow-hidden"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 py-2 px-5 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md text-purple-500 border border-purple-500/10 text-xs font-black uppercase tracking-[0.22em] mb-6 shadow-premium-sm">
                            <MessageSquare size={13} /> Live Voices
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-agri-dark dark:text-white tracking-tight">
                            What Farmers Are Saying
                        </h2>
                    </div>

                    {/* Row 1 — scrolls left */}
                    <div className="relative flex overflow-hidden mb-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                            className="flex gap-4 shrink-0"
                        >
                            {[...Array(2)].flatMap(() => [
                                { text: "Profits up 40% in one season!", name: "Sandeep P.", tag: "Vegetables" },
                                { text: "Finally selling at true market value.", name: "Meera R.", tag: "Coffee" },
                                { text: "Buyers trust us because of our ratings.", name: "Deepak S.", tag: "Organic" },
                                { text: "85% revenue growth in 10 months!", name: "Ananya N.", tag: "Spices" },
                                { text: "Paid in 48 hours — incredible!", name: "Rajesh G.", tag: "Grains" },
                                { text: "No more waiting for the middleman.", name: "Priya K.", tag: "Fruits" },
                            ]).map((q, i) => (
                                <div key={i} className="shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-xl shadow-premium-sm">
                                    <Quote size={18} className="text-agri-primary shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-agri-dark dark:text-white whitespace-nowrap">{q.text}</p>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{q.name} · {q.tag}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Row 2 — scrolls right */}
                    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <motion.div
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                            className="flex gap-4 shrink-0"
                        >
                            {[...Array(2)].flatMap(() => [
                                { text: "Best platform for small farmers.", name: "Arjun M.", tag: "Grains" },
                                { text: "Exported to 3 countries this year!", name: "Kavya T.", tag: "Spices" },
                                { text: "Real-time prices — no more cheating.", name: "Mohan D.", tag: "Dairy" },
                                { text: "My children can stay in farming now.", name: "Sunita B.", tag: "Fruits" },
                                { text: "Processing plants contact us directly.", name: "Ranjit S.", tag: "Wheat" },
                                { text: "Savings on logistics are phenomenal.", name: "Geeta L.", tag: "Organic" },
                            ]).map((q, i) => (
                                <div key={i} className="shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-xl shadow-premium-sm">
                                    <Star size={16} className="text-amber-400 fill-amber-400 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-agri-dark dark:text-white whitespace-nowrap">{q.text}</p>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{q.name} · {q.tag}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section 
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 relative rounded-[5rem] bg-agri-dark p-20 md:p-32 overflow-hidden border border-white/10 shadow-premium"
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
