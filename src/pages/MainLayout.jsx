import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import Sidebar from '../pages/Sidebar';
import Player from '../pages/Player';
import SearchBar from '../components/SearchBar';
import { usePlayer } from '../context/PlayerContext';
import songs from '../data/songs.json';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MainLayout = () => {
  const [search, setSearch] = useState("");
  const [likedSongs, setLikedSongs] = useState([]);
  const [isRepeating, setIsRepeating] = useState(false);
  const navigate = useNavigate();

  const {
    playlist,
    setPlaylist
  } = usePlayer();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(stored);
    if (!playlist.length) setPlaylist(songs);
  }, []);

  const toggleLike = (songId) => {
    const updated = likedSongs.includes(songId)
      ? likedSongs.filter((id) => id !== songId)
      : [...likedSongs, songId];
    setLikedSongs(updated);
    localStorage.setItem("likedSongs", JSON.stringify(updated));
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden p-2">
      {/* 1. Left Sidebar */}
      <div className="w-[300px] h-full hidden lg:flex">
        <Sidebar />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#121212] rounded-lg ml-2 relative overflow-hidden group/main">
        {/* Sticky Header */}
        <header className="absolute top-0 w-full z-20 flex items-center justify-between px-8 py-4 bg-[#121212]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
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
            <div className="ml-4 w-64 md:w-80">
              <SearchBar search={search} setSearch={setSearch} small />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-white text-black font-bold px-4 py-2 rounded-full text-sm hover:scale-105 active:scale-95 transition-all">
              Explore Premium
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>


        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pt-20 pb-32">
          {/* Main Content from Routes */}
          <Outlet context={{ search, likedSongs, toggleLike }} />
        </div>
      </div>

      {/* 3. Bottom Player (Fixed) */}
      <div className="absolute bottom-0 left-0 w-full bg-black px-2 pb-2 h-24 z-50">
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


