import { Link, useLocation } from "react-router-dom";
import {
  FaMusic,
  FaClock,
  FaChartBar,
  FaHeart,
  FaCog,
  FaRegEye,
  FaEyeSlash,
  FaMoon,
  FaSun,
  FaHome,
  FaSearch
} from "react-icons/fa";
import PersistentPlayer from "../components/PersistentPlayer";
import { useState } from "react";

const Sidebar = ({ animationsEnabled, setAnimationsEnabled }) => {
  const { pathname } = useLocation();
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { path: "/", icon: FaHome, label: "Home", color: "from-blue-500 to-cyan-400" },
    { path: "/recent", icon: FaClock, label: "Recent", color: "from-purple-500 to-pink-400" },
    { path: "/stats", icon: FaChartBar, label: "Stats", color: "from-green-500 to-emerald-400" },
    { path: "/liked", icon: FaHeart, label: "Liked", color: "from-red-500 to-rose-400" },
    { path: "/settings", icon: FaCog, label: "Settings", color: "from-orange-500 to-yellow-400" }
  ];

  const iconClass = (path, isActive) =>
    `relative group transition-all duration-300 hover:scale-110 ${
      isActive ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  const activeIndicator = (path) =>
    pathname === path ? (
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-1 bg-gradient-to-b from-green-400 to-cyan-400 rounded-full shadow-lg shadow-green-400/50"></div>
    ) : null;

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setDarkMode(false);
    } else {
      html.classList.add('dark');
      setDarkMode(true);
    }
  };

  return (
    <div className="flex md:flex-col justify-around md:justify-start items-center md:items-center gap-8 p-6 text-xl bg-gradient-to-b from-black/80 via-gray-900/90 to-gray-800/80 backdrop-blur-xl border-r border-white/10 h-screen w-full md:w-24 fixed md:static bottom-0 shadow-2xl rounded-xl md:rounded-b-none animate-slideIn relative z-50">
      
      {/* Logo/Brand Section */}
      <div className="hidden md:flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-green-400/30 mb-2">
          <FaMusic className="text-white text-xl" />
        </div>
        <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>
      </div>

      {/* Navigation icons */}
      <div className="flex md:flex-col gap-6 md:gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path}
              to={item.path} 
              title={item.label}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {activeIndicator(item.path)}
              
              {/* Hover effect background */}
              {hoveredItem === item.path && (
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl opacity-20 blur-sm transition-all duration-300`}></div>
              )}
              
              {/* Icon container */}
              <div className={`relative p-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-br from-green-400/20 to-cyan-400/20 border border-green-400/30 shadow-lg shadow-green-400/20' 
                  : 'hover:bg-white/10 border border-transparent'
              }`}>
                <Icon 
                  className={`${iconClass(item.path, isActive)} ${isActive ? 'drop-shadow-lg' : ''}`} 
                  size={24} 
                />
                
                {/* Pulse effect for active item */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-400/20 to-cyan-400/20 animate-pulse"></div>
                )}
              </div>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {item.label}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/90 rotate-45"></div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="hidden md:block w-8 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4"></div>

      {/* Control buttons */}
      <div className="flex md:flex-col gap-4 md:gap-6">
        {/* Animation toggle button */}
        <button
          title={animationsEnabled ? "Disable animations" : "Enable animations"}
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          className="relative group p-3 rounded-xl transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20"
          onMouseEnter={() => setHoveredItem('animations')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {animationsEnabled ? (
            <FaRegEye className="text-green-400 hover:text-white transition-colors duration-200 drop-shadow-lg" size={24} />
          ) : (
            <FaEyeSlash className="text-red-400 hover:text-white transition-colors duration-200 drop-shadow-lg" size={24} />
          )}
          
          {/* Tooltip */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {animationsEnabled ? "Disable animations" : "Enable animations"}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/90 rotate-45"></div>
          </div>
        </button>

        {/* Dark mode toggle button */}
        <button
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          onClick={toggleDarkMode}
          className="relative group p-3 rounded-xl transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20"
          onMouseEnter={() => setHoveredItem('darkmode')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {darkMode ? (
            <FaMoon className="text-yellow-300 hover:text-white transition-colors duration-200 drop-shadow-lg" size={24} />
          ) : (
            <FaSun className="text-gray-300 hover:text-yellow-300 transition-colors duration-200 drop-shadow-lg" size={24} />
          )}
          
          {/* Tooltip */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/90 rotate-45"></div>
          </div>
        </button>
      </div>

      {/* Bottom spacer for mobile */}
      <div className="md:hidden flex-1"></div>
    </div>
  );
};

export default Sidebar;
