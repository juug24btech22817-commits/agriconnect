import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Search, CheckCircle2, AlertTriangle, RefreshCw, X, ChevronRight, Info } from 'lucide-react';

const AdvisorPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const cameraInputRef = useRef(null); // Back-up native camera trigger

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                startScan();
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
            // First try environment (back) camera
            let stream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            } catch (err) {
                // If back camera fails (e.g. on desktop), fallback to default camera
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
            // If the browser blocks the live-feed (Permission Denied), seamlessly fallback 
            // to the Mac/iOS/Android native secure camera picker modal!
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
            startScan();
        }
    };

    const startScan = () => {
        setIsScanning(true);
        setResult(null);
        // Simulate AI analysis
        setTimeout(() => {
            setIsScanning(false);
            setResult({
                diagnosis: "Early Blight (Alternaria solani)",
                confidence: "94.8%",
                severity: "Moderate",
                symptoms: [
                    "Small black spots on older leaves",
                    "Concentric rings appearing in spots",
                    "Lower leaves turning yellow and dropping"
                ],
                recommendations: [
                    "Remove and destroy infected plant debris.",
                    "Apply copper-based fungicide at 7-10 day intervals.",
                    "Ensure proper spacing for air circulation.",
                    "Avoid overhead watering to keep foliage dry."
                ]
            });
        }, 3000);
    };

    const resetScan = () => {
        setSelectedImage(null);
        setResult(null);
        setIsScanning(false);
    };

    return (
        <div className="bg-agri-surface dark:bg-slate-950 min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-agri-primary/10 text-agri-primary font-bold text-sm mb-4"
                    >
                        <Search size={16} /> AI-Powered Diagnostics
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-display font-black text-agri-dark dark:text-white mb-4">
                        Crop Health <span className="text-agri-primary">Advisor</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                        Upload a photo of your crop to identify diseases and get instant treatment advice.
                    </p>
                </div>

                {/* Main Content */}
                <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-premium border-white/40">
                    <AnimatePresence mode="wait">
                        {!selectedImage && (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center"
                            >
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-agri-primary/30 rounded-[2rem] p-16 hover:bg-agri-primary/5 transition-all cursor-pointer group"
                                >
                                    <div className="w-20 h-20 rounded-2xl bg-agri-primary/10 flex items-center justify-center text-agri-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <Upload size={32} />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-agri-dark dark:text-white mb-2">Drop your image here</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Supports JPG, PNG (Max 10MB)</p>
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
                                </div>
                                <div className="mt-8 flex items-center justify-center gap-4">
                                    <button 
                                        onClick={openCamera}
                                        className="flex items-center gap-2 px-6 py-3 bg-agri-dark text-white rounded-xl font-bold hover:bg-black transition-all"
                                    >
                                        <Camera size={20} /> Use Camera
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {selectedImage && (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="relative rounded-[2rem] overflow-hidden group h-[400px]">
                                    <img src={selectedImage} alt="Selected Crop" className="w-full h-full object-cover" />
                                    
                                    {isScanning && (
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                            <motion.div 
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                className="w-16 h-16 border-4 border-agri-primary border-t-transparent rounded-full mb-6"
                                            />
                                            <h3 className="text-2xl font-display font-bold mb-2">Analyzing Image...</h3>
                                            <p className="text-white/60 font-medium tracking-widest text-xs uppercase">Connecting to AI Neural Network</p>
                                            
                                            {/* Scanning line animation */}
                                            <motion.div 
                                                animate={{ top: ['0%', '100%', '0%'] }}
                                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                                className="absolute left-0 right-0 h-1 bg-agri-primary/50 shadow-[0_0_15px_#10b981]"
                                            />
                                        </div>
                                    )}

                                    {!isScanning && (
                                        <button 
                                            onClick={resetScan}
                                            className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>

                                {result && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-8"
                                    >
                                        <div className="flex flex-col md:flex-row gap-8 items-start">
                                            <div className="flex-grow space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold uppercase tracking-wider">High Risk</span>
                                                    <span className="text-sm font-bold text-gray-500">Confidence: {result.confidence}</span>
                                                </div>
                                                <h2 className="text-3xl font-display font-bold text-agri-dark dark:text-white">{result.diagnosis}</h2>
                                                <p className="text-gray-500 dark:text-gray-400 font-medium">Early blight is caused by the fungus Alternaria solani. It can result in significant yield loss if left untreated.</p>
                                            </div>
                                            <div className="w-full md:w-auto p-6 bg-agri-primary/5 rounded-2xl border border-agri-primary/10 text-center">
                                                <div className="text-agri-primary font-display font-bold text-3xl mb-1">{result.severity}</div>
                                                <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">Severity Level</div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="p-8 bg-gray-50 dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                                                <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                                                    <AlertTriangle size={20} className="text-amber-500" /> Observed Symptoms
                                                </h4>
                                                <ul className="space-y-4">
                                                    {result.symptoms.map((s, i) => (
                                                        <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-400 font-medium text-sm">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> {s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-8 bg-agri-primary/5 rounded-[2rem] border border-agri-primary/10">
                                                <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                                                    <CheckCircle2 size={20} className="text-agri-primary" /> Recommended Treatment
                                                </h4>
                                                <ul className="space-y-4">
                                                    {result.recommendations.map((r, i) => (
                                                        <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-400 font-medium text-sm">
                                                            <ChevronRight size={16} className="text-agri-primary shrink-0" /> {r}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            <button className="px-8 py-4 bg-agri-primary text-white rounded-xl font-bold shadow-glow flex-grow md:flex-grow-0">
                                                Buy Recommended Pesticides
                                            </button>
                                            <button 
                                                onClick={resetScan}
                                                className="px-8 py-4 glass text-agri-dark dark:text-white rounded-xl font-bold flex items-center justify-center gap-2 flex-grow md:flex-grow-0"
                                            >
                                                <RefreshCw size={20} /> Scan Another
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

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

                {/* FAQ / Info Section */}
                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    {[
                        { title: '98% Accuracy', desc: 'Trained on over 2 million agricultural image datasets.' },
                        { title: 'Global Database', desc: 'Covers 500+ crop varieties and 1200+ diseases.' },
                        { title: 'Instant Advice', desc: 'Get localized treatment plans based on your region.' }
                    ].map((item, i) => (
                        <div key={i} className="text-center">
                            <h5 className="font-display font-bold text-agri-dark dark:text-white mb-2">{item.title}</h5>
                            <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvisorPage;
