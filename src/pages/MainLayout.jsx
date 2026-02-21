import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import Sidebar from '../pages/Sidebar';
import Player from '../pages/Player';
import SearchBar from '../components/SearchBar';
import { usePlayer } from '../context/PlayerContext';
import songs from '../data/songs.json';
import { FaChevronLeft, FaChevronRight, FaHome, FaSearch, FaHeart, FaMicrophone, FaList } from 'react-icons/fa';

const MainLayout = () => {
  const [search, setSearch] = useState("");
  const [isRepeating, setIsRepeating] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    playlist,
    setPlaylist,
    likedSongs,
    toggleLike
  } = usePlayer();

  useEffect(() => {
    if (!playlist.length) setPlaylist(songs);
  }, []);

  const navItems = [
    { path: "/", icon: FaHome, label: "Home" },
    { path: "/search", icon: FaSearch, label: "Search" },
    { path: "/library", icon: FaList, label: "Library" },
    { path: "/artists", icon: FaMicrophone, label: "Artists" },
  ];

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden p-0 sm:p-2">
      {/* 1. Left Sidebar - Hidden on mobile */}
      <div className="w-[300px] h-full hidden lg:flex">
        <Sidebar />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#121212] sm:rounded-lg lg:ml-2 relative overflow-hidden group/main">
        {/* Sticky Header */}
        <header className="absolute top-0 w-full z-20 flex items-center justify-between px-4 sm:px-8 py-4 bg-[#121212]/80 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-black/40 rounded-full hover:bg-black/60 active:scale-90 transition-all text-[#b3b3b3] hover:text-white"
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="p-2 bg-black/40 rounded-full hover:bg-black/60 active:scale-90 transition-all text-[#b3b3b3] hover:text-white"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
            <div className="flex-1 max-w-md sm:ml-4">
              <SearchBar search={search} setSearch={setSearch} small />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 ml-2">
            <button
              onClick={() => navigate("/premium")}
              className="hidden md:block bg-white text-black font-bold px-4 py-2 rounded-full text-sm hover:scale-105 active:scale-95 transition-all"
            >
              Explore Premium
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>


        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pt-20 pb-32 sm:pb-32">
          {/* Main Content from Routes */}
          <Outlet context={{ search, likedSongs, toggleLike }} />
        </div>

        {/* Mobile Navigation Bar */}
        <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-lg border-t border-white/5 px-6 py-3 flex items-center justify-between z-[60] pb-6 sm:pb-3">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-all ${pathname === item.path ? "text-white scale-110" : "text-[#b3b3b3]"}`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 3. Bottom Player (Fixed) */}
      <div className="fixed bottom-0 lg:bottom-0 left-0 w-full bg-black px-0 sm:px-2 pb-0 sm:pb-2 h-24 lg:h-24 z-50 mb-[72px] lg:mb-0">
        <Player
          likedSongs={likedSongs}
          toggleLike={toggleLike}
          isRepeating={isRepeating}
          setIsRepeating={setIsRepeating}
        />
      </div>
    </div>
  );
};

export default MainLayout;


