import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageSquare, Heart, Share2, Search, 
  TrendingUp, Award, User, Clock, CheckCircle, 
  Plus, MessageCircle, Sparkles, Filter, X,
  Bookmark, Eye
} from 'lucide-react';

const categoryList = [
    { name: "General", icon: MessageSquare },
    { name: "Expert Advice", icon: Sparkles },
    { name: "Market Trends", icon: TrendingUp },
    { name: "Success Stories", icon: Award },
    { name: "Tech Support", icon: CheckCircle }
];

const CommunityPage = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Organic Pest Control Tips?",
            author: "Farmer Gurdeep",
            avatar: null,
            location: "Amritsar, Punjab",
            time: "2h ago",
            content: "Just started the organic transition for my 5-acre wheat farm. Any tips on natural pest control for the early stages?",
            likes: 24,
            liked: false,
            isBookmarked: false,
            views: 142,
            comments: 12,
            tags: ["OrganicTransition", "WheatFarming"],
            category: "General",
            isVerified: true
        },
        {
            id: 2,
            title: "Southern Karnataka Moisture Alert",
            author: "Dr. Ananya Rao",
            avatar: null,
            location: "AgriTech Expert",
            time: "5h ago",
            content: "High moisture levels detected in Southern Karnataka this week. Farmers should monitor for fungal growth in paddy fields.",
            likes: 56,
            liked: false,
            isBookmarked: true,
            views: 892,
            comments: 8,
            tags: ["WeatherAlert", "PaddyHealth"],
            category: "Expert Advice",
            isExpert: true
        },
        {
            id: 3,
            title: "Hybrid Tomato Success Story",
            author: "Venkatesh K.",
            avatar: null,
            location: "Kolar, Karnataka",
            time: "1d ago",
            content: "Successfully harvested the first batch of hybrid tomatoes. The yield is 20% higher thanks to the new drip irrigation setup!",
            likes: 89,
            liked: false,
            isBookmarked: false,
            views: 1240,
            comments: 45,
            tags: ["SuccessStory", "SmartIrrigation"],
            category: "Success Stories",
            isVerified: true
        }
    ]);

    const [activeCategory, setActiveCategory] = useState("General");
    const [sortBy, setSortBy] = useState("Newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");

    const handleLike = (id) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: post.liked ? post.likes - 1 : post.likes + 1,
                    liked: !post.liked
                };
            }
            return post;
        }));
    };

    const handleBookmark = (id) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    isBookmarked: !post.isBookmarked
                };
            }
            return post;
        }));
    };

    const handleAddPost = (e) => {
        e.preventDefault();
        if (!newPostContent.trim() || !newPostTitle.trim()) return;

        const newPost = {
            id: Date.now(),
            title: newPostTitle,
            author: "Farmer Shaswat",
            avatar: null,
            location: "Bengaluru, Karnataka",
            time: "Just now",
            content: newPostContent,
            likes: 0,
            liked: false,
            isBookmarked: false,
            views: 0,
            comments: 0,
            tags: ["Community", "AgriConnect"],
            category: activeCategory,
            isVerified: true
        };

        setPosts([newPost, ...posts]);
        setNewPostTitle("");
        setNewPostContent("");
        setIsModalOpen(false);
    };

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === "General" || post.category === activeCategory;
        const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             post.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (sortBy === "Popular") return b.likes - a.likes;
        if (sortBy === "Trending") return (b.likes + b.comments) - (a.likes + a.comments);
        return b.id - a.id; // Newest (by ID since ID is Date.now() for new posts)
    });

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-24 pb-24 transition-colors duration-500 overflow-x-hidden relative">
            {/* Premium Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-agri-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }} />
                <div className="absolute bottom-[10%] left-[10%] w-[45%] h-[45%] bg-agri-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '6s' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-agri-primary font-bold text-xs uppercase tracking-[0.3em] mb-4"
                        >
                            <div className="w-8 h-[2px] bg-agri-primary/30" />
                            <Users size={16} className="animate-bounce-slow" /> Global Agri Knowledge Network
                        </motion.div>
                        <h1 className="text-4xl md:text-7xl font-display font-black text-agri-dark dark:text-white mb-6 uppercase tracking-tighter leading-none">
                            Grow <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-primary to-emerald-600">Together</span>
                        </h1>
                        <div className="flex items-center gap-4 mb-6">
                            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-lg">
                                Connect with {50000 + posts.length} verified farmers and industry experts in our secure network.
                            </p>
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full shadow-sm">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">1.2k Live Now</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="px-10 py-6 bg-agri-primary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <Plus size={20} className="relative z-10" /> <span className="relative z-10">New Discussion</span>
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-3 space-y-8">
                        <div className="glass p-10 rounded-[3rem] border-agri-primary/10 shadow-premium">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center gap-2">
                                <Filter size={12} className="text-agri-primary" /> Discovery
                            </h3>
                            <div className="space-y-3">
                                {categoryList.map((cat) => (
                                    <button
                                        key={cat.name}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
                                            activeCategory === cat.name 
                                            ? 'bg-agri-primary text-white shadow-glow scale-[1.02]' 
                                            : 'text-gray-500 hover:text-agri-dark dark:hover:text-white hover:bg-agri-primary/5'
                                        }`}
                                    >
                                        <cat.icon size={16} className={activeCategory === cat.name ? "text-white" : "text-gray-400"} />
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 bg-gradient-to-br from-agri-dark via-slate-900 to-black rounded-[3rem] text-white overflow-hidden relative group border border-white/5 shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                                <Award size={150} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-agri-primary/20 rounded-xl flex items-center justify-center">
                                        <Sparkles size={20} className="text-agri-primary" />
                                    </div>
                                    <h4 className="text-xl font-display font-black tracking-tight uppercase">Expert Access</h4>
                                </div>
                                <p className="text-sm text-white/50 mb-8 leading-relaxed">Upgrade to <span className="text-agri-primary font-black">Elite</span> to get direct priority answers from industry scientists.</p>
                                <button className="w-full py-5 bg-white text-agri-dark rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-agri-primary hover:text-white transition-all shadow-xl active:scale-95">Join Elite Network</button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 space-y-10">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="relative flex-grow group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-agri-primary to-emerald-600 rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-agri-primary transition-colors">
                                            <Search className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[1.5rem] text-agri-dark dark:text-white shadow-2xl focus:ring-2 focus:ring-agri-primary/50 outline-none transition-all font-medium text-lg placeholder:text-gray-400"
                                            placeholder="Search discussions..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[1.5rem] min-w-[200px] shadow-lg">
                                    <Filter size={16} className="text-agri-primary" />
                                    <select 
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="bg-transparent border-none text-[10px] font-black text-gray-500 focus:ring-0 uppercase tracking-widest cursor-pointer w-full"
                                    >
                                        <option value="Newest">Newest First</option>
                                        <option value="Popular">Most Popular</option>
                                        <option value="Trending">Trending Now</option>
                                    </select>
                                </div>
                            </div>

                        <div className="space-y-8">
                            <AnimatePresence mode="popLayout">
                                {sortedPosts.map((post) => (
                                    <motion.div 
                                        key={post.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98, y: 30 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98, y: -30 }}
                                        className="glass p-10 rounded-[3.5rem] shadow-premium border-agri-primary/10 relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-agri-primary to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        {post.likes > 70 && (
                                            <div className="absolute top-0 right-0 px-8 py-3 bg-agri-secondary text-agri-dark font-black text-[10px] uppercase tracking-widest rounded-bl-[2rem] shadow-lg">
                                                Trending Topic
                                            </div>
                                        )}
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="flex gap-5">
                                                <div className="w-14 h-14 bg-gradient-to-br from-agri-primary/10 to-emerald-500/10 rounded-[1.5rem] flex items-center justify-center text-agri-primary ring-4 ring-white/5 shadow-inner">
                                                    <User size={28} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1.5">
                                                        <h4 className="text-lg font-black text-agri-dark dark:text-white uppercase tracking-tighter">{post.author}</h4>
                                                        {post.isVerified && <CheckCircle size={16} className="text-blue-500" />}
                                                        {post.isExpert && (
                                                            <div className="px-2 py-0.5 bg-agri-secondary/20 text-agri-secondary rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1 border border-agri-secondary/20">
                                                                <Sparkles size={8} /> Expert
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                        <Clock size={12} /> {post.time} • <div className="w-1 h-1 bg-gray-300 rounded-full" /> {post.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleBookmark(post.id)}
                                                    className={`p-3 rounded-2xl transition-all ${post.isBookmarked ? 'bg-agri-primary/10 text-agri-primary shadow-inner' : 'bg-gray-50 dark:bg-white/5 text-gray-300 hover:text-agri-primary'}`}
                                                >
                                                    <Bookmark size={20} fill={post.isBookmarked ? "currentColor" : "none"} />
                                                </button>
                                                <button className="p-3 bg-gray-50 dark:bg-white/5 text-gray-300 hover:text-agri-primary rounded-2xl transition-all">
                                                    <Share2 size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-display font-black text-agri-dark dark:text-white mb-4 tracking-tight leading-tight group-hover:text-agri-primary transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 font-medium">
                                            {post.content}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-10">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest rounded-xl hover:bg-agri-primary/10 hover:text-agri-primary transition-colors cursor-pointer">#{tag}</span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-10 pt-8 border-t border-gray-100 dark:border-white/5">
                                            <button 
                                                onClick={() => handleLike(post.id)}
                                                className={`flex items-center gap-3 transition-all font-black text-[10px] uppercase tracking-[0.2em] ${post.liked ? 'text-rose-500 scale-110' : 'text-gray-400 hover:text-rose-500 hover:scale-105'}`}
                                            >
                                                <Heart size={20} fill={post.liked ? "currentColor" : "none"} /> {post.likes}
                                            </button>
                                            <button className="flex items-center gap-3 text-gray-400 hover:text-agri-primary hover:scale-105 transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                                                <MessageCircle size={20} /> {post.comments}
                                            </button>
                                            <div className="flex items-center gap-3 text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] ml-auto">
                                                <Eye size={18} className="text-gray-300" /> {post.views > 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            
                            <div className="pt-12 text-center">
                                <button className="px-12 py-6 bg-white dark:bg-slate-900 border border-agri-primary/20 text-agri-primary rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-agri-primary hover:text-white hover:shadow-glow transition-all active:scale-95 group shadow-xl">
                                    <span className="flex items-center gap-3">
                                        Load More Discussions
                                        <TrendingUp size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-10">
                        <div className="glass p-10 rounded-[3rem] shadow-premium relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-agri-primary/5 rounded-full blur-3xl pointer-events-none" />
                            <h3 className="text-xl font-display font-black text-agri-dark dark:text-white mb-10 flex items-center gap-3 tracking-tight">
                                <div className="p-2 bg-agri-primary/10 rounded-xl">
                                    <TrendingUp size={24} className="text-agri-primary animate-bounce-slow" /> 
                                </div>
                                Active Trends
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { topic: "Solar Dryer Subsidy", count: "1.2k posts", icon: Sparkles },
                                    { topic: "Organic Fertilizers", count: "850 posts", icon: Award },
                                    { topic: "Potato Blight Control", count: "640 posts", icon: CheckCircle }
                                ].map((item, i) => (
                                    <div key={i} className="group cursor-pointer flex items-center gap-4 p-2 rounded-2xl hover:bg-agri-primary/5 transition-all">
                                        <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-400 group-hover:text-agri-primary transition-colors">
                                            <item.icon size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-agri-dark dark:text-white text-xs uppercase tracking-tight group-hover:text-agri-primary transition-colors">#{item.topic}</h4>
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.count}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-10 rounded-[3rem] border-agri-primary/10 text-center shadow-premium relative overflow-hidden group">
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-agri-secondary/10 rounded-full blur-3xl" />
                            <div className="w-20 h-20 bg-agri-secondary/10 text-agri-secondary rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner transform group-hover:rotate-12 transition-transform duration-500">
                                <Award size={40} />
                            </div>
                            <h4 className="text-xl font-display font-black text-agri-dark dark:text-white uppercase tracking-tighter mb-2">Community Hero</h4>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-8">Top contributor of the week</p>
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 rounded-full mx-auto mb-4 overflow-hidden shadow-xl ring-4 ring-white dark:ring-white/5 relative">
                                <User size={64} className="absolute inset-0 translate-y-3 opacity-30 mx-auto" />
                                <div className="absolute inset-0 bg-agri-primary/10" />
                            </div>
                            <p className="font-black text-agri-dark dark:text-white text-base uppercase tracking-tighter">Sunil Verma</p>
                            <div className="mt-4 flex justify-center gap-1">
                                {[1,2,3,4,5].map(i => <Sparkles key={i} size={12} className="text-agri-secondary animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Discussion Modal - Enhanced Styling */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-agri-dark/80 backdrop-blur-xl" 
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl w-full max-w-2xl overflow-hidden relative z-[70] border border-white/20"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-agri-primary to-emerald-600" />
                            
                            <form onSubmit={handleAddPost} className="p-12 md:p-16">
                                <div className="flex justify-between items-center mb-12">
                                    <div>
                                        <h2 className="text-4xl font-display font-black text-agri-dark dark:text-white uppercase tracking-tighter">Start Discussion</h2>
                                        <p className="text-sm text-gray-500 font-medium mt-2 tracking-tight">Share knowledge, ask for help, grow together.</p>
                                    </div>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="p-4 bg-gray-50 dark:bg-white/5 hover:bg-rose-500 hover:text-white rounded-2xl transition-all shadow-sm">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Discussion Subject</label>
                                        <div className="relative group">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-agri-primary to-emerald-600 rounded-2xl blur opacity-10 group-focus-within:opacity-20 transition" />
                                            <input 
                                                type="text"
                                                value={newPostTitle}
                                                onChange={(e) => setNewPostTitle(e.target.value)}
                                                className="relative w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-8 py-5 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary font-black text-lg placeholder:text-gray-400 placeholder:font-medium" 
                                                placeholder="What's your discussion about?"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Context & Details</label>
                                        <div className="relative group">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-agri-primary to-emerald-600 rounded-2xl blur opacity-10 group-focus-within:opacity-20 transition" />
                                            <textarea 
                                                rows="5"
                                                value={newPostContent}
                                                onChange={(e) => setNewPostContent(e.target.value)}
                                                className="relative w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-8 py-5 text-agri-dark dark:text-white focus:ring-2 focus:ring-agri-primary resize-none font-medium text-lg placeholder:text-gray-400" 
                                                placeholder="What's happening on your farm? Ask for advice or share your success..."
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Select Category</label>
                                        <div className="flex flex-wrap gap-3">
                                            {categoryList.map(cat => (
                                                <button
                                                    key={cat.name}
                                                    type="button"
                                                    onClick={() => setActiveCategory(cat.name)}
                                                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm ${
                                                        activeCategory === cat.name 
                                                        ? 'bg-agri-primary text-white scale-105 shadow-glow' 
                                                        : 'bg-gray-50 dark:bg-white/5 text-gray-500 hover:bg-agri-primary/10'
                                                    }`}
                                                >
                                                    <cat.icon size={14} />
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button type="button" className="w-full py-6 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-agri-primary hover:border-agri-primary transition-all group shadow-sm">
                                        <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                                            <Plus size={24} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Attach Media / Photos</span>
                                    </button>
                                </div>

                                <div className="pt-12">
                                    <button type="submit" className="w-full bg-agri-primary text-white font-black py-6 rounded-3xl shadow-glow hover:bg-agri-dark transition-all transform hover:-translate-y-1 uppercase tracking-[0.3em] text-xs">
                                        Publish Discussion
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommunityPage;
