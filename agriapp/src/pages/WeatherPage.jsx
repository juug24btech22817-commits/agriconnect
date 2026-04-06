import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sun, Cloud, CloudRain, CloudLightning, 
  Wind, Droplets, MapPin, Navigation, 
  ArrowLeft, AlertTriangle, Info, Thermometer
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WeatherPage = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState(null);
    const [locationName, setLocationName] = useState('');

    useEffect(() => {
        document.title = "Live Weather Tracker | AgriConnect";
    }, []);

    const fetchWeather = useCallback(async (lat, lon, name) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=auto`);
            const data = await res.json();
            
            if (data.error) throw new Error("Weather data unavailable");

            setWeather(data);
            setLocationName(name);

            // Save last location for persistence
            localStorage.setItem('lastWeatherLocation', JSON.stringify({ lat, lon, name }));
        } catch (err) {
            setError("Failed to fetch weather data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        try {
            // Append India for better pincode/city accuracy if it's a numeric query or short string
            const searchQuery = query.match(/^\d+$/) ? `${query}, India` : query;
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1&addressdetails=1`);
            const geoData = await geoRes.json();

            if (geoData.length === 0) throw new Error("Location not found. Try a specific city or pincode.");

            const { lat, lon, address } = geoData[0];
            const city = address.city || address.town || address.village || address.suburb || address.city_district || address.county || "";
            const state = address.state || address.state_district || "";
            const name = city && state ? `${city}, ${state}` : city || state || geoData[0].display_name.split(',')[0];
            
            fetchWeather(lat, lon, name);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleMyLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                // Reverse geocode to get name
                try {
                    const revRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const revData = await revRes.json();
                    const addr = revData.address;
                    const city = addr.city || addr.town || addr.village || addr.suburb || addr.city_district || addr.county || "";
                    const state = addr.state || addr.state_district || "";
                    const name = city && state ? `${city}, ${state}` : city || state || revData.display_name.split(',')[0] || "Your Location";
                    fetchWeather(latitude, longitude, name);
                } catch (err) {
                    fetchWeather(latitude, longitude, "Your Location");
                }
            },
            (err) => {
                // If location access denied, try loading the last saved location
                const saved = localStorage.getItem('lastWeatherLocation');
                if (saved) {
                    const { lat, lon, name } = JSON.parse(saved);
                    fetchWeather(lat, lon, name);
                } else {
                    setError("Location access denied. Please enter a pincode.");
                    setLoading(false);
                    // Default fallback to Bengaluru if nothing else
                    fetchWeather(12.9716, 77.5946, "Bengaluru, Karnataka");
                }
            }
        );
    };

    useEffect(() => {
        const saved = localStorage.getItem('lastWeatherLocation');
        if (saved) {
            const { lat, lon, name } = JSON.parse(saved);
            fetchWeather(lat, lon, name);
        } else {
            handleMyLocation();
        }
    }, []);

    const getWeatherIcon = (code, isDay) => {
        if (code === 0) return <Sun className="text-yellow-400" size={48} />;
        if (code >= 1 && code <= 3) return <Cloud className="text-blue-200" size={48} />;
        if (code >= 51 && code <= 67) return <CloudRain className="text-blue-400" size={48} />;
        if (code >= 80 && code <= 82) return <CloudRain className="text-blue-500" size={48} />;
        if (code >= 95) return <CloudLightning className="text-purple-400" size={48} />;
        return <Cloud className="text-gray-400" size={48} />;
    };

    const getConditionName = (code) => {
        if (code === 0) return "Clear Sky";
        if (code >= 1 && code <= 3) return "Partly Cloudy";
        if (code >= 45 && code <= 48) return "Foggy";
        if (code >= 51 && code <= 67) return "Rainy";
        if (code >= 71 && code <= 77) return "Snowy";
        if (code >= 80 && code <= 82) return "Showers";
        if (code >= 95) return "Thunderstorm";
        return "Overcast";
    };

    const getAdvice = (temp, rain, code) => {
        if (rain > 5 || code >= 80) return "Heavy rain expected. Avoid irrigation and ensure proper drainage in your fields.";
        if (temp > 35) return "High heat warning. Water your crops early in the morning and check for heat stress.";
        if (temp < 10) return "Cold weather. Protect sensitive young plants and monitor soil temperature.";
        if (rain > 0) return "Light showers. Good for most crops, no need for intensive watering today.";
        return "Weather is optimal for field work and harvesting. Happy farming!";
    };

    const bgGradient = weather?.current?.is_day 
        ? "from-blue-400 via-blue-500 to-indigo-600" 
        : "from-slate-900 via-indigo-950 to-black";

    return (
        <div className={`min-h-screen pt-20 pb-12 transition-colors duration-1000 bg-gradient-to-br ${bgGradient} text-white selection:bg-agri-primary selection:text-white`}>
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <AnimatePresence>
                    {weather?.current?.rain > 0 && Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={`rain-${i}`}
                            initial={{ y: -100, x: Math.random() * window.innerWidth }}
                            animate={{ y: window.innerHeight + 100 }}
                            transition={{ repeat: Infinity, duration: 1.5 + Math.random(), ease: "linear" }}
                            className="absolute w-0.5 h-6 bg-blue-200/40 rounded-full"
                        />
                    ))}
                </AnimatePresence>
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Compact Search Bar */}
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8"
                >
                    <form onSubmit={handleSearch} className="relative group">
                        <input 
                            type="text" 
                            placeholder="Enter Pincode or City..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-agri-primary/30 transition-all placeholder:text-white/40 shadow-premium"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                             <button 
                                type="button"
                                onClick={handleMyLocation}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
                                title="Use My Location"
                            >
                                <Navigation size={20} />
                            </button>
                            <button 
                                type="submit"
                                className="bg-agri-primary text-white p-2.5 rounded-xl shadow-glow hover:scale-105 active:scale-95 transition-all"
                            >
                                <Search size={20} />
                            </button>
                        </div>
                    </form>
                    {error && (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-300 mt-2 flex items-center gap-2 font-bold px-4 text-xs"
                        >
                            <AlertTriangle size={14} /> {error}
                        </motion.p>
                    )}
                </motion.div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
                        <p className="text-lg font-medium animate-pulse">Updating weather...</p>
                    </div>
                ) : weather && (
                    <div className="space-y-6">
                        {/* More Compact Main Weather Card */}
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass p-6 sm:p-8 rounded-[2rem] shadow-premium relative overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6 gap-6">
                                <div className="text-center sm:text-left">
                                    <div className="flex items-center justify-center sm:justify-start gap-2 text-white/70 mb-1">
                                        <MapPin size={16} className="text-agri-primary" />
                                        <span className="font-bold uppercase tracking-widest text-[10px]">{locationName}</span>
                                    </div>
                                    <h1 className="text-6xl sm:text-7xl font-display font-black tracking-tighter mb-2">
                                        {Math.round(weather.current.temperature_2m)}°
                                    </h1>
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                                        <span className="text-xl font-bold">{getConditionName(weather.current.weather_code)}</span>
                                        <span className="text-sm text-white/60">• Feels {Math.round(weather.current.apparent_temperature)}°</span>
                                    </div>
                                </div>
                                <div className="sm:text-right flex flex-col items-center sm:items-end">
                                    <div className="mb-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl">
                                        {getWeatherIcon(weather.current.weather_code, weather.current.is_day)}
                                    </div>
                                    <div className="text-[10px] font-bold text-white/50 uppercase">
                                        H: {Math.round(weather.daily.temperature_2m_max[0])}° • L: {Math.round(weather.daily.temperature_2m_min[0])}°
                                    </div>
                                </div>
                            </div>

                            {/* Dense Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { label: 'Humidity', value: `${weather.current.relative_humidity_2m}%`, icon: <Droplets size={16} className="text-blue-300" /> },
                                    { label: 'Wind', value: `${weather.current.wind_speed_10m} km/h`, icon: <Wind size={16} className="text-agri-light" /> },
                                    { label: 'Rain', value: weather.current.rain > 0 ? "Yes" : "No", icon: <CloudRain size={16} className="text-blue-400" /> },
                                    { label: 'UV Index', value: weather.daily.uv_index_max[0], icon: <Sun size={16} className="text-yellow-400" /> }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-3 border border-white/10 flex items-center gap-3">
                                        <div className="shrink-0">{item.icon}</div>
                                        <div>
                                            <div className="text-[8px] uppercase font-bold text-white/40">{item.label}</div>
                                            <div className="text-sm font-black">{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Streamlined Farmer Tip Card */}
                        <motion.div 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-agri-dark/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-premium"
                        >
                            <div className="p-3 bg-agri-primary/20 rounded-xl shrink-0">
                                <Info size={20} className="text-agri-primary" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-medium leading-tight italic text-white/90">
                                    "{getAdvice(weather.current.temperature_2m, weather.current.rain, weather.current.weather_code)}"
                                </p>
                            </div>
                        </motion.div>

                        {/* Compact Daily Forecast */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                            {weather.daily.time.map((day, i) => (
                                <motion.div 
                                    key={day}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.05 * i }}
                                    className="glass py-4 px-2 rounded-2xl text-center border border-white/5"
                                >
                                    <div className="text-[8px] font-bold uppercase text-white/40 mb-2">
                                        {new Date(day).toLocaleDateString('en-IN', { weekday: 'short' })}
                                    </div>
                                    <div className="flex justify-center mb-2">
                                        {getWeatherIcon(weather.daily.weather_code[i], true)}
                                    </div>
                                    <div className="font-black text-base">
                                        {Math.round(weather.daily.temperature_2m_max[i])}°
                                    </div>
                                    <div className="text-[9px] text-white/30">
                                        L: {Math.round(weather.daily.temperature_2m_min[i])}°
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherPage;
