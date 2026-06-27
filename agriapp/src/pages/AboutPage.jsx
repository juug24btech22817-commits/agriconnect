/**
 * AboutPage.jsx - Static page detailing the mission, values, and origin story of AgriConnect.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Globe, ArrowRight, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen pt-12 pb-24 transition-colors duration-300">

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                        Reimagining <br /> <span className="text-agri-green">Agricultural Markets</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Connecting farmers and buyers with transparent pricing, reliable logistics, and fresher produce — so every harvest finds the right home.
                    </p>
                </motion.div>
            </section>

            {/* Values Section */}
            <section className="bg-agri-light/50 dark:bg-gray-800/50 py-24 mb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">Our Core Values</h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: <Target size={40} />, title: "Empowerment", desc: "Giving farmers control over their pricing and direct access to a growing market." },
                            { icon: <Heart size={40} />, title: "Transparency", desc: "Clear fees, open pricing data, and detailed origin tracking for every single crop." },
                            { icon: <Globe size={40} />, title: "Sustainability", desc: "Encouraging local trade to reduce carbon footprints and ensure fresher food delivery." }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
                            >
                                <div className="w-20 h-20 mx-auto bg-agri-green/10 rounded-full flex items-center justify-center text-agri-green mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Origin Story */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <img
                            src="/images/about_farmer.png"
                            alt="Farmer in field"
                            className="rounded-3xl shadow-2xl object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <span className="text-agri-green font-bold tracking-wider uppercase">Our Story</span>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Born in the fields, built for the future.</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            We saw firsthand how hard farmers worked, only to see the majority of the profit go to brokers and distributors. Buyers paid premium prices for food that wasn't fresh by the time it reached them.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            AgriConnect uses technology to solve this. Our platform handles the logistics, payments, and discovery, allowing farmers and buyers to securely trade directly and fairly.
                        </p>
                        <Link to="/marketplace" aria-label="Go to marketplace">
                            <button
                                className="mt-4 inline-flex items-center gap-2 bg-agri-green text-white px-5 py-3 rounded-full hover:bg-agri-dark font-bold text-lg transition"
                                aria-label="Start trading now"
                            >
                                Start trading now
                                <ArrowRight className="ml-2" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-agri-light/30 dark:bg-gray-800/30 py-24 mb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-agri-green font-bold tracking-wider uppercase text-sm">Testimonials</span>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2">What Our Community Says</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-4">
                            Real stories from the farmers and buyers who drive the AgriConnect ecosystem.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "AgriConnect changed my life. I get 20% higher prices for my wheat crops and direct access to buyers without brokers.",
                                name: "Ramesh Prasad",
                                role: "Wheat Farmer, Bihar",
                                stars: 5,
                                initial: "R"
                            },
                            {
                                quote: "The transparency in crop origins and super fast logistics makes AgriConnect the perfect direct sourcing partner for my restaurants.",
                                name: "Sarah Jenkins",
                                role: "Restaurant Owner, New Delhi",
                                stars: 5,
                                initial: "S"
                            },
                            {
                                quote: "Direct payments securely settled within 24 hours of delivery validation solved all my cashflow problems. A blessing!",
                                name: "Rajesh Patel",
                                role: "Organic Farmer, Gujarat",
                                stars: 5,
                                initial: "R"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(item.stars)].map((_, i) => (
                                            <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{item.quote}"</p>
                                </div>
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="w-10 h-10 rounded-full bg-agri-green text-white font-bold flex items-center justify-center">
                                        {item.initial}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">{item.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sleek FAQ Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="text-center mb-16">
                    <span className="text-agri-green font-bold tracking-wider uppercase text-sm">Questions</span>
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    <FAQItem 
                        question="How does AgriConnect ensure fair pricing?" 
                        answer="We connect farmers directly with buyers, removing middle brokers. Both parties agree on competitive prices based on live, transparent market data available on our marketplace."
                    />
                    <FAQItem 
                        question="What are the shipping and delivery options?" 
                        answer="AgriConnect handles full logistics end-to-end through our network of verified delivery partners. Produce is picked up directly from the farm gates and delivered safely to buyers."
                    />
                    <FAQItem 
                        question="Can I buy from multiple farmers in one order?" 
                        answer="Yes. You can mix and match produce from different farmers in a single checkout, making it easier to source everything you need at once."
                    />
                    <FAQItem 
                        question="How do payments work?" 
                        answer="Buyers pay securely via UPI, Cards, or NetBanking. Funds are held securely in escrow and released directly to the farmer within 24 hours of successful delivery verification."
                    />
                </div>
            </section>

        </div>
    );
};

// Interactive FAQ Component
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border border-gray-100 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 overflow-hidden transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-6 py-5 flex justify-between items-center text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
                <span>{question}</span>
                <span className="text-agri-green">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-50 dark:border-gray-700/50 pt-4">
                    {answer}
                </div>
            </motion.div>
        </div>
    );
};

export default AboutPage;

