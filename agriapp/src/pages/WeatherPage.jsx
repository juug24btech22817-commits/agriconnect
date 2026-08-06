import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sun, Cloud, CloudRain, CloudLightning, 
  Wind, Droplets, MapPin, Navigation, 
  ArrowLeft, AlertTriangle, Info, Thermometer, Clock,
  Sunrise, Sunset, Gauge, Cloudy
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PRESETS = [
    { name: "Nashik, MH", lat: 19.9975, lon: 73.7898 },
    { name: "Nagpur, MH", lat: 21.1458, lon: 79.0882 },
    { name: "Guntur, AP", lat: 16.3067, lon: 80.4365 },
    { name: "Shimla, HP", lat: 31.1048, lon: 77.1734 },
    { name: "Anand, GJ", lat: 22.5645, lon: 72.9289 }
];

const WeatherPage = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [isCelsius, setIsCelsius] = useState(true);

    const formatTemp = (celsius) => {
        if (isCelsius) return `${Math.round(celsius)}°C`;
        return `${Math.round((celsius * 9/5) + 32)}°F`;
    };

    useEffect(() => {
        document.title = "Live Weather Tracker | AgriConnect";
    }, []);

    const fetchWeather = useCallback(async (lat, lon, name) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,uv_index&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=auto`);
            const data = await res.json();
            
            if (data.error) throw new Error("Weather data unavailable");

            setWeather(data);
            setLocationName(name);

            // Save last location for persistence
            localStorage.setItem('lastWeatherLocation', JSON.stringify({ lat, lon, name }));
        } catch {
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
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleMyLocation = useCallback(() => {
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
                } catch {
                    fetchWeather(latitude, longitude, "Your Location");
                }
            },
            () => {
                // If location access denied, try loading the last saved location
                const saved = localStorage.getItem('lastWeatherLocation');
                if (saved) {
                    try {
                        const { lat, lon, name } = JSON.parse(saved);
                        if (lat && lon && name) {
                            fetchWeather(lat, lon, name);
                            return;
                        }
                    } catch {
                         localStorage.removeItem('lastWeatherLocation');
                    }
                }
                setError("Location access denied. Please enter a pincode.");
                setLoading(false);
                // Default fallback to Bengaluru if nothing else
                fetchWeather(12.9716, 77.5946, "Bengaluru, Karnataka");
            },
            { timeout: 5000 }
        );
    }, [fetchWeather]);

    useEffect(() => {
        // ALWAYS prioritize current location on fresh load as requested.
        // Fallbacks are handled inside handleMyLocation().
        handleMyLocation();
    }, [handleMyLocation]);

    const getWeatherIcon = (code, size = 48) => {
        if (code === 0) return <Sun className="text-yellow-400" size={size} />;
        if (code >= 1 && code <= 3) return <Cloud className="text-blue-200" size={size} />;
        if (code >= 51 && code <= 67) return <CloudRain className="text-blue-400" size={size} />;
        if (code >= 80 && code <= 82) return <CloudRain className="text-blue-500" size={size} />;
        if (code >= 95) return <CloudLightning className="text-purple-400" size={size} />;
        return <Cloud className="text-gray-400" size={size} />;
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
        <div className={`min-h-screen pt-28 pb-12 transition-colors duration-1000 bg-gradient-to-br ${bgGradient} text-white selection:bg-agri-primary selection:text-white`}>
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <AnimatePresence>
                    {(weather?.current?.precipitation > 0 || (weather?.current?.weather_code >= 51 && weather?.current?.weather_code <= 82)) && Array.from({ length: 40 }).map((_, i) => (
                        <motion.div
                            key={`rain-${i}`}
                            initial={{ y: -100, x: Math.random() * 100 + "%" }}
                            animate={{ y: "110vh" }}
                            transition={{ repeat: Infinity, duration: 1 + Math.random(), ease: "linear" }}
                            className="absolute w-[1px] h-8 bg-blue-300/30 rounded-full"
                        />
                    ))}
                    {weather?.current?.weather_code === 0 && (
                         <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-400 rounded-full blur-[120px]"
                         />
                    )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Back Button */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="mb-6"
                >
                    <Link to="/dashboard" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group font-bold text-xs uppercase tracking-widest">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>
                </motion.div>

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
                            className="w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl px-8 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-agri-primary/20 transition-all placeholder:text-white/30 shadow-2xl group-hover:bg-white/15"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <button 
                                type="button"
                                onClick={handleMyLocation}
                                className="p-3 hover:bg-white/10 rounded-2xl transition-all text-white/60 hover:text-white hover:scale-110 active:scale-95"
                                title="Use My Location"
                            >
                                <Navigation size={22} />
                            </button>
                            <div className="w-[1px] h-6 bg-white/10 mx-1" />
                            <button 
                                type="submit"
                                className="bg-agri-primary text-white p-3.5 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-105 active:scale-95 transition-all"
                            >
                                <Search size={22} />
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-wrap items-center gap-2 mt-3 px-2">
                        <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mr-1">Hubs:</span>
                        {PRESETS.map((hub) => (
                            <button
                                key={hub.name}
                                type="button"
                                onClick={() => fetchWeather(hub.lat, hub.lon, hub.name)}
                                className="text-[11px] font-bold bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 px-3.5 py-1.5 rounded-full transition-all text-white/80 hover:text-white hover:scale-105 active:scale-95"
                            >
                                {hub.name}
                            </button>
                        ))}
                    </div>
                    {error && (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-300 mt-3 flex items-center gap-2 font-bold px-4 text-xs"
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
                                    <h1 className="text-7xl sm:text-8xl font-display font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                                        {formatTemp(weather.current.temperature_2m)}
                                    </h1>
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                                        <span className="text-2xl font-bold bg-white/10 px-4 py-1 rounded-full backdrop-blur-md">{getConditionName(weather.current.weather_code)}</span>
                                        <span className="text-sm text-white/60 font-medium tracking-wide">• Feels Like {formatTemp(weather.current.apparent_temperature)}</span>
                                    </div>
                                    <div className="mt-6 flex items-center justify-center sm:justify-start gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                                        <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
                                            <Clock size={12} className="text-agri-primary/60" />
                                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <button onClick={handleMyLocation} className="hover:text-white transition-colors">
                                            Refresh Data
                                        </button>
                                        <span className="text-white/20">|</span>
                                        <button onClick={() => setIsCelsius(!isCelsius)} className="hover:text-white transition-colors text-agri-primary font-black">
                                            Switch to {isCelsius ? '°F' : '°C'}
                                        </button>
                                    </div>
                                </div>
                                <div className="sm:text-right flex flex-col items-center sm:items-end">
                                    <motion.div 
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                        className="mb-4 p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl"
                                    >
                                        {getWeatherIcon(weather.current.weather_code, 48)}
                                    </motion.div>
                                    <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center sm:items-end gap-1">
                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Today's Range</div>
                                        <div className="text-sm font-bold text-white">
                                            High {formatTemp(weather.daily.temperature_2m_max[0])} <span className="text-white/20 mx-1">/</span> Low {formatTemp(weather.daily.temperature_2m_min[0])}
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-6 text-[10px] font-black text-white/40 uppercase tracking-tighter">
                                        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl">
                                            <Sunrise size={14} className="text-yellow-400" />
                                            {new Date(weather.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl">
                                            <Sunset size={14} className="text-orange-400" />
                                            {new Date(weather.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dense Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                                {[
                                    { label: 'Humidity', value: `${weather.current.relative_humidity_2m}%`, icon: <Droplets size={16} className="text-blue-300" /> },
                                    { label: 'Wind', value: `${weather.current.wind_speed_10m} km/h`, icon: <Wind size={16} className="text-agri-light" /> },
                                    { label: 'Pressure', value: `${Math.round(weather.current.pressure_msl)} hPa`, icon: <Gauge size={16} className="text-purple-300" /> },
                                    { label: 'Cloud Cover', value: `${weather.current.cloud_cover}%`, icon: <Cloudy size={16} className="text-blue-200" /> },
                                    { label: 'Rain', value: (weather.current.precipitation > 0 || (weather.current.weather_code >= 51 && weather.current.weather_code <= 82)) ? "Yes" : "No", icon: <CloudRain size={16} className="text-blue-400" /> },
                                    { label: 'UV Index', value: `${weather.current.uv_index}`, icon: <Sun size={16} className="text-yellow-400" /> }
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

                        {/* Hourly Forecast */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.05 }}
                            className="bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-[2rem] shadow-2xl"
                        >
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                Hourly Forecast (Next 8 Hours)
                            </h3>
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                {(() => {
                                    const now = new Date();
                                    const currentHourStr = now.toISOString().slice(0, 13) + ":00";
                                    let startIndex = weather.hourly.time.findIndex(t => t.startsWith(currentHourStr));
                                    if (startIndex === -1) startIndex = 0;
                                    
                                    return weather.hourly.time.slice(startIndex, startIndex + 8).map((time, idx) => {
                                        const realIdx = startIndex + idx;
                                        const temp = weather.hourly.temperature_2m[realIdx];
                                        const code = weather.hourly.weather_code[realIdx];
                                        const prob = weather.hourly.precipitation_probability[realIdx];
                                        const hour = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        
                                        return (
                                            <div key={time} className="flex-1 min-w-[80px] bg-white/5 rounded-2xl p-3 text-center border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="text-[10px] text-white/40 font-bold mb-2">{hour}</div>
                                                <div className="flex justify-center mb-2">
                                                    {getWeatherIcon(code, 24)}
                                                </div>
                                                <div className="text-sm font-black mb-1">{formatTemp(temp)}</div>
                                                {prob > 0 && (
                                                    <div className="text-[9px] text-blue-300 font-bold">{prob}% Rain</div>
                                                )}
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        </motion.div>

                        {/* Streamlined Farmer Tip Card */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-agri-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-[2rem] flex items-center gap-6 shadow-2xl relative z-10">
                                <div className="p-4 bg-agri-primary/20 rounded-2xl shrink-0 shadow-glow-sm">
                                    <Info size={28} className="text-agri-primary animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-agri-primary mb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-agri-primary rounded-full" />
                                        Smart Agri-Advisory
                                    </h3>
                                    <p className="text-base sm:text-lg font-bold leading-tight text-white/90">
                                        {getAdvice(weather.current.temperature_2m, weather.current.rain, weather.current.weather_code)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Compact Daily Forecast */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                            {weather.daily.time.map((day, i) => (
                                <motion.div 
                                    key={day}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + (0.05 * i) }}
                                    whileHover={{ 
                                        y: -8, 
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                                    }}
                                    className="bg-white/10 backdrop-blur-md py-5 px-3 rounded-[2rem] text-center border border-white/10 transition-all duration-300 cursor-default group"
                                >
                                    <div className="text-[9px] font-black uppercase text-white/30 mb-3 tracking-widest group-hover:text-agri-primary transition-colors">
                                        {new Date(day).toLocaleDateString('en-IN', { weekday: 'short' })}
                                    </div>
                                    <motion.div 
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        className="flex justify-center mb-4"
                                    >
                                        {getWeatherIcon(weather.daily.weather_code[i], 32)}
                                    </motion.div>
                                    <div className="font-black text-xl mb-1">
                                        {formatTemp(weather.daily.temperature_2m_max[i])}
                                    </div>
                                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">
                                        Low {formatTemp(weather.daily.temperature_2m_min[i])}
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
