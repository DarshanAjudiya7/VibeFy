import { useNavigate, useOutletContext } from "react-router-dom";
import { FaClock, FaHistory, FaPlay, FaPause, FaTrash } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import SongList from "../components/SongList";

const RecentPage = () => {
  const navigate = useNavigate();
  const { search, likedSongs, toggleLike } = useOutletContext();
  const { playSong, addToQueue, recentlyPlayed, clearRecent, isPlaying, currentSong, togglePlayPause } = usePlayer();

  const filteredSongs = recentlyPlayed.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const isRecentPlaying = isPlaying && currentSong && recentlyPlayed.some(s => s.id === currentSong.id);

  const handlePlayAll = () => {
    if (isRecentPlaying) {
      togglePlayPause();
    } else if (recentlyPlayed.length > 0) {
      playSong(recentlyPlayed[0], recentlyPlayed, 0);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Premium Dynamic Header */}
      <div className="px-4 sm:px-8 pt-10 pb-8 bg-gradient-to-b from-blue-900/40 to-[#121212] flex flex-col gap-6 relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-gradient-to-br from-blue-600 to-indigo-900 shadow-2xl flex items-center justify-center rounded-lg group">
            <FaHistory size={60} className="sm:size-80 text-white/80 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex flex-col gap-2 mb-2 w-full">
            <p className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-[#b3b3b3]">Collection</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white">Recently Played</h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-sm font-bold text-white/80">
              <span className="text-[#1db954]">History</span>
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
              <span>{recentlyPlayed.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="px-4 sm:px-8 py-6 flex items-center justify-center sm:justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <button
            onClick={handlePlayAll}
            disabled={recentlyPlayed.length === 0}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1db954] rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRecentPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="translate-x-0.5" />}
          </button>
          <button
            onClick={clearRecent}
            disabled={recentlyPlayed.length === 0}
            className="flex items-center gap-2 px-6 py-2 border border-white/20 rounded-full font-bold text-xs sm:text-sm hover:border-white transition-all text-[#b3b3b3] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FaTrash size={12} />
            Clear
          </button>
        </div>
      </div>

      {/* Song List Area */}
      <div className="px-4 sm:px-8 pb-32">
        {recentlyPlayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#b3b3b3] animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <FaClock size={40} className="opacity-20" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No history yet</h3>
            <p className="text-sm max-w-xs text-center">Songs you play will show up here so you can easily find them again.</p>
            <button
              onClick={() => navigate('/search')}
              className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              Start Listening
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SongList
              songs={filteredSongs}
              onSelectSong={(song) => playSong(song, recentlyPlayed, recentlyPlayed.indexOf(song))}
              onAddToQueue={addToQueue}
              toggleLike={toggleLike}
              likedSongs={likedSongs}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPage;