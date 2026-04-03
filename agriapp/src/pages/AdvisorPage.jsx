import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Search, Bot, User, Send, Paperclip, X } from 'lucide-react';

const TypewriterMessage = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        // Split by whitespace but keep the whitespace tokens so words type naturally
        const tokens = text.split(/(\s+)/); 
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < tokens.length) {
                setDisplayedText(prev => prev + tokens[i]);
                i++;
                
                // Keep scroll anchored to bottom as we type
                const container = document.getElementById('chat-scroll-container');
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            } else {
                clearInterval(timer);
            }
        }, 60); // 60ms is a medium-fast natural token speed

        return () => clearInterval(timer);
    }, [text]);

    return (
        <div className="whitespace-pre-wrap text-sm md:text-base break-words font-medium">
            {displayedText.split('\n').map((line, i) => {
                // Bold text formatting
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                    <div key={i} className="min-h-[1.5rem]">
                        {parts.map((p, j) => {
                            const isCompleteBold = p.startsWith('**') && p.endsWith('**') && p.length >= 4;
                            const isIncompleteBold = p.startsWith('**') && !isCompleteBold;
                            
                            if (isCompleteBold) {
                                return <strong key={j} className="font-extrabold text-agri-dark dark:text-white">{p.slice(2, -2)}</strong>;
                            } else if (isIncompleteBold) {
                                return <strong key={j} className="font-extrabold text-agri-dark dark:text-white">{p.slice(2)}</strong>;
                            }
                            return <span key={j}>{p}</span>;
                        })}
                    </div>
                );
            })}
        </div>
    );
};

const AdvisorPage = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am your AI Crop Advisor powered by Lyzr. You can ask me any farming questions or upload an image of your crop for immediate disease diagnosis.' }
    ]);
    const [inputText, setInputText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const cameraInputRef = useRef(null);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            requestAnimationFrame(() => {
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const openCamera = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Camera API is not supported in your browser or you are not on a secure connection (HTTPS/localhost).");
            return;
        }

        try {
            let stream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            } catch (err) {
                console.warn("Environment camera failed, falling back to default camera");
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
            }

            setIsCameraOpen(true);
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play().catch(e => console.error("Error playing video:", e));
                }
            }, 100); 
        } catch (err) {
            console.warn("Live stream blocked or unavailable, falling back to secure System Camera...", err);
            if (cameraInputRef.current) {
                cameraInputRef.current.click();
            } else {
                alert(`Camera access failed: ${err.message}`);
            }
        }
    };

    const closeCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setIsCameraOpen(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg', 0.8);
            
            closeCamera();
            setSelectedImage(imageData);
        }
    };

    const sendMessage = async () => {
        if (!inputText.trim() && !selectedImage) return;

        const userMsg = { role: 'user', text: inputText, image: selectedImage };
        setMessages(prev => [...prev, userMsg]);
        
        let apiMessage = inputText;
        if (selectedImage) {
            apiMessage = apiMessage ? `${apiMessage}\n\nImage reference included: ${selectedImage}` : `Please analyze this image: ${selectedImage}`;
        }

        setInputText('');
        setSelectedImage(null);
        setIsLoading(true);

        try {
            const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'sk-default-cct6kTZStziDusmcEoYBxr0MHNwPFRKY'
                },
                body: JSON.stringify({
                    user_id: "shaswatshaswat620@gmail.com",
                    agent_id: "69cfebc2f9a5fbfe6167e38e",
                    session_id: "69cfebc2f9a5fbfe6167e38e-1vca6i6dvth",
                    message: apiMessage
                })
            });

            const data = await response.json();
            
            let answerText = "No response received";
            if (data?.response) {
                answerText = typeof data.response === 'string' ? data.response : (data.response.response || JSON.stringify(data.response));
            } else if (data?.answer || data?.message || data?.text) {
                answerText = data.answer || data.message || data.text;
            }

            setMessages(prev => [...prev, { role: 'bot', text: answerText }]);
        } catch (error) {
            console.error("Error connecting to Lyzr AI:", error);
            setMessages(prev => [...prev, { role: 'bot', text: "Failed to connect to the Lyzr AI Advisor. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-24 pb-8 flex flex-col">
            <div className="max-w-4xl mx-auto px-4 w-full flex flex-col flex-grow h-full">
                
                {/* Header */}
                <div className="text-center mb-8 shrink-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-agri-primary/10 text-agri-primary font-bold text-sm mb-4"
                    >
                        <Search size={16} /> Lyzr AI Assistant
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-agri-dark dark:text-white mb-2">
                        Crop Health <span className="text-agri-primary">Advisor</span>
                    </h1>
                </div>

                {/* Chat Container */}
                <div className="glass rounded-[2rem] shadow-premium border-white/40 flex flex-col flex-grow overflow-hidden h-[600px] mb-8 relative">
                    
                    {/* Messages Area */}
                    <div id="chat-scroll-container" ref={chatContainerRef} className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
                        <AnimatePresence initial={false}>
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-agri-dark text-white' : 'bg-agri-primary/10 text-agri-primary'}`}>
                                        {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                                    </div>
                                    <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div 
                                            className={`p-4 rounded-2xl ${
                                                msg.role === 'user' 
                                                ? 'bg-agri-primary text-white rounded-tr-none' 
                                                : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-tl-none leading-relaxed break-words'
                                            }`}
                                        >
                                            {msg.image && (
                                                <img 
                                                    src={msg.image} 
                                                    alt="User Upload" 
                                                    className="w-full max-w-[200px] rounded-lg mb-3 object-cover shadow-sm border border-black/10"
                                                />
                                            )}
                                            {msg.text && (
                                                msg.role === 'user' ? (
                                                    <span className="whitespace-pre-wrap">{msg.text}</span>
                                                ) : (
                                                    <TypewriterMessage text={msg.text} />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-4 flex-row"
                                >
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-agri-primary/10 text-agri-primary">
                                        <Bot size={20} />
                                    </div>
                                    <div className="p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 text-gray-700 rounded-2xl rounded-tl-none flex items-center gap-2">
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-agri-primary rounded-full" />
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-agri-primary rounded-full" />
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-agri-primary rounded-full" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
                        
                        {/* Image Preview Area */}
                        {selectedImage && (
                            <div className="mb-4 relative inline-block">
                                <img src={selectedImage} alt="Preview" className="h-20 w-auto rounded-lg border border-gray-200 object-cover shadow-sm" />
                                <button 
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}

                        <div className="flex items-end gap-2">
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="p-3 text-gray-400 hover:text-agri-primary hover:bg-agri-primary/10 rounded-xl transition-colors shrink-0"
                                title="Attach Image"
                            >
                                <Paperclip size={22} />
                            </button>
                            
                            <button 
                                onClick={openCamera}
                                className="p-3 text-gray-400 hover:text-agri-primary hover:bg-agri-primary/10 rounded-xl transition-colors shrink-0"
                                title="Use Camera"
                            >
                                <Camera size={22} />
                            </button>

                            <input 
                                type="file" 
                                className="hidden" 
                                ref={fileInputRef} 
                                onChange={handleImageUpload}
                                accept="image/*"
                            />
                            <input 
                                type="file" 
                                className="hidden" 
                                ref={cameraInputRef} 
                                onChange={handleImageUpload}
                                accept="image/*"
                                capture="environment"
                            />

                            <div className="flex-grow bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center px-4 py-2">
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask a question or describe your crop issues..."
                                    className="w-full bg-transparent border-none focus:outline-none resize-none text-agri-dark dark:text-white"
                                    rows="1"
                                    style={{ minHeight: '30px', maxHeight: '120px' }}
                                />
                            </div>

                            <button 
                                onClick={sendMessage}
                                disabled={(!inputText.trim() && !selectedImage) || isLoading}
                                className="p-3 bg-agri-primary disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl shadow-glow hover:bg-agri-primary/90 transition-all shrink-0"
                            >
                                <Send size={22} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Camera Modal overlay */}
            <AnimatePresence>
                {isCameraOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
                    >
                        <div className="relative w-full max-w-2xl h-[80vh] flex items-center justify-center bg-black">
                            <video 
                                ref={videoRef} 
                                className="w-full h-full object-contain"
                                playsInline
                            />
                            <canvas ref={canvasRef} className="hidden" />
                            
                            <button 
                                onClick={closeCamera}
                                className="absolute top-6 right-6 p-4 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                                <button 
                                    onClick={capturePhoto}
                                    className="w-20 h-20 bg-white border-4 border-gray-300 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                                >
                                    <div className="w-16 h-16 bg-agri-primary rounded-full outline outline-4 outline-white"></div>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdvisorPage;
