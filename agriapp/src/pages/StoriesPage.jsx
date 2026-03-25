import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, PlayCircle, X } from 'lucide-react';

const stories = [
    {
        id: 1,
        name: "Samuel Oakes",
        farm: "Oakes Family Farm",
        quote: "AgriConnect completely changed our business. By cutting out the middleman, we increased our profit margins by 40% in just one season.",
        image: "https://images.unsplash.com/photo-1595804365737-12681fbfa968?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Maria Gonzalez",
        farm: "Sol Y Tierra",
        quote: "The live pricing dashboard gives me the confidence to know I'm selling my coffee beans at the true market value, not what a broker dictates.",
        image: "https://images.unsplash.com/photo-1587326442657-3b28b7ed661c?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "David Chen",
        farm: "Valley Greens",
        quote: "The buyer feedback and rating system has helped us establish a premium brand for our organic vegetables. Buyers trust us.",
        image: "https://images.unsplash.com/photo-1506807803408-db287eeb22bd?q=80&w=600&auto=format&fit=crop",
        videoBg: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop"
    }
];

const StoriesPage = () => {
    const [selectedStory, setSelectedStory] = useState(null);

    return (
        <div className="bg-agri-light dark:bg-gray-900 min-h-screen pt-12 pb-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Real Farmers. <br /> <span className="text-agri-green">Real Success Stories.</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Hear directly from the people who grow our food about how direct trade is transforming their livelihoods.
                    </p>
                </header>

                <div className="space-y-20">
                    {stories.map((story, idx) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
                        >

                            {/* Media Section */}
                            <div className="w-full lg:w-1/2 relative group rounded-3xl overflow-hidden shadow-2xl">
                                <img src={story.videoBg} alt="Farm background" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                                <button
                                    onClick={() => setSelectedStory(story)}
                                    className="absolute inset-0 m-auto w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 text-white hover:bg-agri-green/90 hover:border-agri-green hover:scale-110 transition-all z-10"
                                >
                                    <PlayCircle size={40} className="ml-1" />
                                </button>
                            </div>

                            {/* Text Context */}
                            <div className="w-full lg:w-1/2 space-y-6">
                                <Quote className="text-agri-green/30 dark:text-agri-yellow/20 w-16 h-16 -mb-4 -ml-2" />
                                <blockquote className="text-2xl md:text-3xl text-gray-900 dark:text-white font-medium italic leading-relaxed relative z-10">
                                    "{story.quote}"
                                </blockquote>

                                <div className="flex items-center gap-4 mt-8">
                                    <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-agri-green shadow-md" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{story.name}</h3>
                                        <p className="text-agri-green dark:text-agri-yellow font-semibold">{story.farm}</p>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* Video Player Modal Overlay */}
                <AnimatePresence>
                    {selectedStory && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-gray-900 rounded-3xl overflow-hidden max-w-4xl w-full aspect-video relative flex items-center justify-center text-white"
                            >
                                <div className="absolute top-4 right-4 z-10">
                                    <button onClick={() => setSelectedStory(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white">
                                        <span className="sr-only">Close</span>
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="text-center p-8">
                                    <PlayCircle size={64} className="mx-auto mb-4 text-agri-green opacity-50" />
                                    <h3 className="text-2xl font-bold mb-2">Success Story: {selectedStory.name}</h3>
                                    <p className="text-gray-400">Video player would initialize here with farm footage...</p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default StoriesPage;
