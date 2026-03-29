import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageSquare, Heart, Share2, Search, 
  TrendingUp, Award, User, Clock, CheckCircle, 
  Plus, MessageCircle, Sparkles, Filter 
} from 'lucide-react';

const postsData = [
    {
        id: 1,
        author: "Farmer Gurdeep",
        avatar: null,
        location: "Amritsar, Punjab",
        time: "2h ago",
        content: "Just started the organic transition for my 5-acre wheat farm. Any tips on natural pest control for the early stages?",
        likes: 24,
        comments: 12,
        tags: ["OrganicTransition", "WheatFarming"],
        isVerified: true
    },
    {
        id: 2,
        author: "Dr. Ananya Rao",
        avatar: null,
        location: "AgriTech Expert",
        time: "5h ago",
        content: "High moisture levels detected in Southern Karnataka this week. Farmers should monitor for fungal growth in paddy fields.",
        likes: 56,
        comments: 8,
        tags: ["WeatherAlert", "PaddyHealth"],
        isExpert: true
    },
    {
        id: 3,
        author: "Venkatesh K.",
        avatar: null,
        location: "Kolar, Karnataka",
        time: "1d ago",
        content: "Successfully harvested the first batch of hybrid tomatoes. The yield is 20% higher thanks to the new drip irrigation setup!",
        likes: 89,
        comments: 45,
        tags: ["SuccessStory", "SmartIrrigation"],
        isVerified: true
    }
];

const categories = ["General", "Expert Advice", "Market Trends", "Success Stories", "Tech Support"];

const CommunityPage = () => {
    const [activeCategory, setActiveCategory] = useState("General");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-24 pb-24 transition-colors duration-500 overflow-x-hidden">
            {/* Background Mesh */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-agri-primary/5 to-transparent blur-3xl opacity-50" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-agri-primary font-black text-xs uppercase tracking-[0.2em] mb-4"
                        >
                            <Users size={16} /> Global Agri Knowledge Network
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-display font-black text-agri-dark dark:text-white mb-6 uppercase tracking-tighter">
                            Grow <span className="text-agri-primary">Together</span>
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            Connect with 50,000+ verified farmers and experts. Share insights, solve challenges, and access professional guidance.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button className="px-8 py-5 bg-agri-primary text-white rounded-[1.25rem] font-black text-sm uppercase tracking-widest shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                            <Plus size={20} /> New Discussion
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left: Sidebar (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="glass p-8 rounded-[2.5rem] border-agri-primary/10">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Discovery</h3>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`w-full text-left px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                                            activeCategory === cat 
                                            ? 'bg-agri-primary/10 text-agri-primary border-l-4 border-agri-primary' 
                                            : 'text-gray-500 hover:text-agri-dark dark:hover:text-white hover:bg-agri-primary/5'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-agri-dark rounded-[2.5rem] text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                <Award size={80} />
                            </div>
                            <h4 className="text-xl font-display font-black mb-2 uppercase tracking-tight">Expert Access</h4>
                            <p className="text-sm text-white/50 mb-6">Upgrade to Premium to get priority answers from industry scientists.</p>
                            <button className="w-full py-4 bg-agri-primary rounded-xl font-bold text-xs uppercase tracking-widest shadow-glow">Join Elite</button>
                        </div>
                    </div>

                    {/* Middle: Feed (6 cols) */}
                    <div className="lg:col-span-6 space-y-8">
                        {/* Compact Search */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:text-agri-primary transition-colors">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-4 glass dark:bg-slate-900 border-gray-200 dark:border-gray-800 rounded-2xl text-agri-dark dark:text-white shadow-premium focus:ring-2 focus:ring-agri-primary transition-all font-medium"
                                placeholder="Search discussions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="space-y-6">
                            {postsData.map((post) => (
                                <motion.div 
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass p-8 rounded-[2.5rem] border-agri-primary/10 relative overflow-hidden group hover:shadow-premium transition-all"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-agri-primary/10 rounded-2xl flex items-center justify-center text-agri-primary">
                                                <User size={24} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-black text-agri-dark dark:text-white uppercase tracking-tighter">{post.author}</h4>
                                                    {post.isVerified && <CheckCircle size={14} className="text-blue-500" />}
                                                    {post.isExpert && <Sparkles size={14} className="text-agri-secondary" />}
                                                </div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.location} • {post.time}</p>
                                            </div>
                                        </div>
                                        <button className="p-2 text-gray-300 hover:text-agri-primary transition-colors">
                                            <Share2 size={18} />
                                        </button>
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 font-medium">
                                        {post.content}
                                    </p>

                                    <div className="flex gap-2 mb-8">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-gray-50 dark:bg-slate-800 text-[10px] font-black text-gray-500 uppercase tracking-widest rounded-lg">#{tag}</span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-rose-500 transition-colors font-bold text-sm">
                                            <Heart size={18} /> {post.likes}
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-agri-primary transition-colors font-bold text-sm">
                                            <MessageCircle size={18} /> {post.comments}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Trending (3 cols) */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="glass p-8 rounded-[2.5rem] border-agri-primary/10">
                            <h3 className="text-xs font-black uppercase tracking-widest text-agri-primary mb-8 flex items-center gap-2">
                                <TrendingUp size={16} /> Rapid Growth
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { topic: "Solar Dryer Subsidy", count: "1.2k posts" },
                                    { topic: "Organic Fertilizers", count: "850 posts" },
                                    { topic: "Potato Blight Control", count: "640 posts" }
                                ].map((item, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <h4 className="font-bold text-agri-dark dark:text-white group-hover:text-agri-primary transition-colors">#{item.topic}</h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-8 rounded-[3rem] border-agri-primary/10 text-center">
                            <div className="w-16 h-16 bg-agri-secondary/10 text-agri-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award size={32} />
                            </div>
                            <h4 className="font-display font-black text-agri-dark dark:text-white uppercase tracking-tighter mb-2">Community Hero</h4>
                            <p className="text-xs text-gray-500 font-medium mb-6">Top contributor of the week</p>
                            <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-full mx-auto mb-2 overflow-hidden">
                                <User size={48} className="translate-y-2 opacity-30" />
                            </div>
                            <p className="font-black text-agri-dark dark:text-white text-sm">Sunil Verma</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
