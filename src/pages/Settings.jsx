import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCog,
  FaPalette,
  FaPlay,
  FaBell,
  FaGlobe,
  FaVolumeUp,
  FaDownload,
  FaMoon,
  FaSun,
  FaDesktop,
  FaCheck,
  FaTimes
} from "react-icons/fa";
import PersistentPlayer from "../components/PersistentPlayer";

const ToggleSwitch = ({ checked, onChange, label, description, icon: Icon }) => (
  <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${checked
          ? 'bg-gradient-to-br from-green-400 to-cyan-400 shadow-lg shadow-green-400/30'
          : 'bg-gradient-to-br from-gray-500/20 to-gray-600/20'
        }`}>
        <Icon className={`text-xl ${checked ? 'text-white' : 'text-gray-400'}`} />
      </div>
      <div>
        <h3 className="font-semibold text-white">{label}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-14 h-7 bg-gray-700 rounded-full peer peer-checked:bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-300 shadow-lg"></div>
      <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${checked ? 'translate-x-7' : ''
        }`}>
        {checked && <FaCheck className="text-green-500 text-xs" />}
      </div>
    </label>
  </div>
);

const SelectOption = ({ value, onChange, options, label, description, icon: Icon }) => (
  <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-400/30">
        <Icon className="text-white text-xl" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{label}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-xl"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-gray-800 text-white">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: "auto",
    autoplay: true,
    notifications: false,
    language: "en",
    volume: 80,
    downloadQuality: "high"
  });
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "auto";
    applyTheme(theme);
    setSettings({
      theme,
      autoplay: localStorage.getItem("autoplay") === "true",
      notifications: localStorage.getItem("notifications") === "true",
      language: localStorage.getItem("language") || "en",
      volume: parseInt(localStorage.getItem("volume")) || 80,
      downloadQuality: localStorage.getItem("downloadQuality") || "high"
    });
  }, []);

  const applyTheme = (theme) => {
    document.documentElement.classList.remove("light", "dark");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.add("light");
    }
  };

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem(key, value);
    if (key === "theme") applyTheme(value);
  };

  const getThemeIcon = (theme) => {
    switch (theme) {
      case 'dark': return FaMoon;
      case 'light': return FaSun;
      default: return FaDesktop;
    }
  };

  const themeOptions = [
    { value: "auto", label: "Auto (System)" },
    { value: "dark", label: "Dark Mode" },
    { value: "light", label: "Light Mode" }
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "hi", label: "हिंदी" }
  ];

  const qualityOptions = [
    { value: "low", label: "Low (128kbps)" },
    { value: "medium", label: "Medium (256kbps)" },
    { value: "high", label: "High (320kbps)" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white overflow-hidden pb-20">

      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Gradient orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-15 blur-3xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${80 + Math.random() * 120}px`,
              height: `${80 + Math.random() * 120}px`,
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)`,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 mt-12 md:mt-0 px-4 md:px-8">
          <button
            onClick={() => navigate("/")}
            className="w-full md:w-auto group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 border border-blue-400/30 hover:border-blue-400/50 backdrop-blur-xl scale-90 sm:scale-100"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Player
          </button>

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-400 mt-1 md:mt-2 text-sm flex items-center justify-center gap-2">
              <FaCog className="text-blue-400" />
              Customize your experience
            </p>
          </div>

          <div className="hidden md:block w-32" />
        </div>

        {/* Settings Container */}
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Column */}
            <div className="space-y-6">
              {/* Theme Selection */}
              <SelectOption
                value={settings.theme}
                onChange={(e) => updateSetting("theme", e.target.value)}
                options={themeOptions}
                label="Theme"
                description="Choose your preferred color scheme"
                icon={getThemeIcon(settings.theme)}
              />

              {/* Language Selection */}
              <SelectOption
                value={settings.language}
                onChange={(e) => updateSetting("language", e.target.value)}
                options={languageOptions}
                label="Language"
                description="Select your preferred language"
                icon={FaGlobe}
              />

              {/* Download Quality */}
              <SelectOption
                value={settings.downloadQuality}
                onChange={(e) => updateSetting("downloadQuality", e.target.value)}
                options={qualityOptions}
                label="Download Quality"
                description="Choose audio quality for downloads"
                icon={FaDownload}
              />

              {/* Volume Control */}
              <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-400/30">
                    <FaVolumeUp className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Default Volume</h3>
                    <p className="text-sm text-gray-400">Set your preferred volume level</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Volume</span>
                    <span className="text-sm font-semibold text-white">{settings.volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.volume}
                    onChange={(e) => updateSetting("volume", parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Autoplay Toggle */}
              <ToggleSwitch
                checked={settings.autoplay}
                onChange={(e) => updateSetting("autoplay", e.target.checked)}
                label="Autoplay"
                description="Automatically play next song"
                icon={FaPlay}
              />

              {/* Notifications Toggle */}
              <ToggleSwitch
                checked={settings.notifications}
                onChange={(e) => updateSetting("notifications", e.target.checked)}
                label="Notifications"
                description="Receive push notifications"
                icon={FaBell}
              />

              {/* Additional Settings Cards */}
              <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-green-400/30">
                    <FaCog className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Advanced Settings</h3>
                    <p className="text-sm text-gray-400">Additional customization options</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-sm text-gray-300">Crossfade</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-sm text-gray-300">Equalizer</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-sm text-gray-300">Lyrics Display</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10">
                <h3 className="font-semibold text-white mb-4">App Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Version</span>
                    <span className="text-sm font-semibold text-white">1.0.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Last Updated</span>
                    <span className="text-sm font-semibold text-white">Today</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Storage Used</span>
                    <span className="text-sm font-semibold text-white">2.4 GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;