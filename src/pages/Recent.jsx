import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaClock, FaFire, FaHeart, FaMusic, FaArrowLeft, FaChartLine } from "react-icons/fa";
import PersistentPlayer from "../components/PersistentPlayer";

const RecentPage = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  const [playCounts, setPlayCounts] = useState({});
  const [playingSongId, setPlayingSongId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredSong, setHoveredSong] = useState(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
      // Count plays per song
      const playMap = new Map();
      stored.forEach((song) => {
        const key = song.id;
        if (playMap.has(key)) {
          playMap.set(key, playMap.get(key) + 1);
        } else {
          playMap.set(key, 1);
        }
      });
      setPlayCounts(Object.fromEntries(playMap));
      const unique = Array.from(
        new Map(stored.map((song) => [song.id, song])).values()
      );
      setRecentSongs(unique.reverse());
    } catch (error) {
      console.error("Error parsing recentlyPlayed:", error);
      setRecentSongs([]);
    }
  }, []);

  const handlePlaySong = (song) => {
    setPlayingSongId(song.id);
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play();
    }
    // Update play count in localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
      const updated = [song, ...stored.filter((s) => s.id !== song.id)];
      localStorage.setItem("recentlyPlayed", JSON.stringify(updated.slice(0, 50)));
      setPlayCounts((prev) => ({ ...prev, [song.id]: (prev[song.id] || 0) + 1 }));
    } catch (e) {}
  };

  const getFilteredSongs = () => {
    if (selectedFilter === 'all') return recentSongs;
    return recentSongs.filter(song => song.mood === selectedFilter);
  };

  const getTotalPlays = () => {
    return Object.values(playCounts).reduce((sum, count) => sum + count, 0);
  };

  const getMostPlayedSong = () => {
    return Object.entries(playCounts).reduce((max, [id, count]) => 
      count > max.count ? { id, count } : max, { id: null, count: 0 }
    );
  };

  const mostPlayed = getMostPlayedSong();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] px-4 md:px-8 py-8 text-white overflow-hidden pb-20">
      
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Gradient orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 blur-3xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 150}px`,
              height: `${100 + Math.random() * 150}px`,
              background: `radial-gradient(circle, rgba(29, 185, 84, 0.3) 0%, rgba(0, 131, 254, 0.2) 50%, transparent 100%)`,
              animationDuration: `${8 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/player")}
            className="group flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-cyan-500/20 hover:from-green-500/30 hover:to-cyan-500/30 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 border border-green-400/30 hover:border-green-400/50 backdrop-blur-xl"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Player
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Recently Played
            </h1>
            <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
              <FaClock className="text-green-400" />
              Your listening history
            </p>
          </div>
          
          <div className="w-32" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <FaMusic className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Songs</p>
                <p className="text-2xl font-bold text-white">{recentSongs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                <FaFire className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Plays</p>
                <p className="text-2xl font-bold text-white">{getTotalPlays()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center">
                <FaChartLine className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Most Played</p>
                <p className="text-2xl font-bold text-white">{mostPlayed.count || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {['all', 'romantic', 'party', 'sad', 'intense', 'pretty'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-xl border ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-green-500/30 to-cyan-500/30 border-green-400/50 text-white shadow-lg shadow-green-400/20'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredSongs().length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-xl">
                <FaMusic className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No Recent Songs</h3>
              <p className="text-gray-500">Start playing some music to see your history here!</p>
            </div>
          ) : (
            getFilteredSongs().map((song, index) => (
              <div
                key={song?.id || index}
                onMouseEnter={() => setHoveredSong(song.id)}
                onMouseLeave={() => setHoveredSong(null)}
                className="group relative cursor-pointer"
              >
                {/* Card Background */}
                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/20">
                  
                  {/* Play Count Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {playCounts[song.id] || 1} plays
                  </div>
                  
                  {/* Album Art */}
                  <div className="relative mb-6">
                    <img
                      src={song?.cover || "https://via.placeholder.com/200"}
                      alt={song?.title}
                      className="w-full h-48 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className={`absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      hoveredSong === song.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <button
                        onClick={() => handlePlaySong(song)}
                        className="w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                      >
                        <FaPlay className="text-white text-xl ml-1" />
                      </button>
                    </div>
                    
                    {/* Playing Indicator */}
                    {playingSongId === song.id && (
                      <div className="absolute top-2 left-2 bg-green-500 rounded-full w-4 h-4 animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Song Info */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg text-white truncate group-hover:text-green-400 transition-colors duration-300">
                      {song?.title || "Unknown Title"}
                    </h3>
                    <p className="text-gray-400 text-sm truncate">
                      {song?.artist || "Unknown Artist"}
                    </p>
                    
                    {/* Mood Badge */}
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        song?.mood === 'romantic' ? 'bg-pink-500/20 text-pink-300' :
                        song?.mood === 'party' ? 'bg-purple-500/20 text-purple-300' :
                        song?.mood === 'sad' ? 'bg-blue-500/20 text-blue-300' :
                        song?.mood === 'intense' ? 'bg-red-500/20 text-red-300' :
                        song?.mood === 'pretty' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {song?.mood || 'default'}
                      </span>
                    </div>
                    
                    {/* Play Count */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaFire className="text-orange-400" />
                      <span>Played {playCounts[song.id] || 1} time{playCounts[song.id] !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: "none" }} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

export default RecentPage;