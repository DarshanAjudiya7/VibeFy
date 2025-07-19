import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import songs from "../data/songs.json";
import { 
  FaHeart, 
  FaPlay, 
  FaRandom, 
  FaDownload, 
  FaArrowLeft, 
  FaMusic, 
  FaClock, 
  FaHeartBroken,
  FaPause,
  FaListUl
} from "react-icons/fa";
import PersistentPlayer from "../components/PersistentPlayer";
import SongList from "../components/SongList";

const Liked = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredSong, setHoveredSong] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(stored);
  }, []);

  const toggleLike = (id) => {
    const updated = likedSongs.includes(id)
      ? likedSongs.filter((s) => s !== id)
      : [...likedSongs, id];
    setLikedSongs(updated);
    localStorage.setItem("likedSongs", JSON.stringify(updated));
  };

  const liked = songs.filter((song) => likedSongs.includes(song.id));

  // Dummy handlers for Play/Shuffle/Download
  const handlePlayAll = () => {
    setIsPlaying(!isPlaying);
  };
  const handleShuffle = () => {};
  const handleDownload = () => {};

  const getMoodIcon = (mood) => {
    const icons = {
      romantic: '💕',
      party: '🎉',
      sad: '😢',
      intense: '🔥',
      pretty: '✨',
      default: '🎵'
    };
    return icons[mood] || icons.default;
  };

  const getMoodColor = (mood) => {
    const colors = {
      romantic: 'from-pink-500 to-rose-500',
      party: 'from-purple-500 to-pink-500',
      sad: 'from-blue-500 to-cyan-500',
      intense: 'from-red-500 to-orange-500',
      pretty: 'from-yellow-500 to-orange-500',
      default: 'from-gray-500 to-gray-600'
    };
    return colors[mood] || colors.default;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white overflow-hidden pb-20">
      
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Gradient orbs */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-15 blur-3xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${80 + Math.random() * 120}px`,
              height: `${80 + Math.random() * 120}px`,
              background: `radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(244, 63, 94, 0.2) 50%, transparent 100%)`,
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
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 px-4 md:px-8">
          <button
            onClick={() => navigate("/player")}
            className="group flex items-center gap-3 bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 border border-pink-400/30 hover:border-pink-400/50 backdrop-blur-xl"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Player
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Liked Songs
            </h1>
            <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
              <FaHeart className="text-pink-400" />
              Your favorite tracks
            </p>
          </div>
          
          <div className="w-32" />
        </div>

        {/* Playlist Info Card */}
        <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-xl rounded-3xl p-8 border border-pink-400/20 mb-8 mx-4 md:mx-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-400/30">
              <FaHeart className="text-white text-4xl" />
            </div>
            <div className="flex-1">
              <p className="text-pink-400 text-sm font-semibold mb-1">Playlist</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Liked Songs</h2>
              <p className="text-gray-400 mb-4">Your personal collection • {liked.length} songs</p>
              
              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <FaMusic className="text-pink-400" />
                  <span className="text-sm text-gray-300">{liked.length} tracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-pink-400" />
                  <span className="text-sm text-gray-300">~{Math.round(liked.length * 3.5)} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8 px-4 md:px-8">
          <button
            className="group bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
            onClick={handlePlayAll}
          >
            {isPlaying ? (
              <FaPause className="text-lg" />
            ) : (
              <FaPlay className="text-lg" />
            )}
            {isPlaying ? 'Pause' : 'Play All'}
          </button>
          
          <button
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/30 text-white px-6 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
            onClick={handleShuffle}
          >
            <FaRandom className="text-lg" />
            Shuffle
          </button>
          
          <button
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/30 text-white px-6 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
            onClick={handleDownload}
          >
            <FaDownload className="text-lg" />
            Download
          </button>
        </div>

        {/* Songs Grid */}
        <div className="px-4 md:px-8">
          {liked.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-xl">
                <FaHeartBroken className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No Liked Songs</h3>
              <p className="text-gray-500 mb-6">Start liking songs to see them here!</p>
              <button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
              >
                Discover Music
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {liked.map((song, index) => (
                <div
                  key={song.id}
                  onMouseEnter={() => setHoveredSong(song.id)}
                  onMouseLeave={() => setHoveredSong(null)}
                  className="group relative cursor-pointer"
                >
                  {/* Card Background */}
                  <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-pink-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-400/20">
                    
                    {/* Album Art */}
                    <div className="relative mb-4">
                      <img
                        src={song.cover || "https://via.placeholder.com/200"}
                        alt={song.title}
                        className="w-full h-48 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className={`absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        hoveredSong === song.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <button className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                          <FaPlay className="text-white text-xl ml-1" />
                        </button>
                      </div>
                      
                      {/* Like Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song.id);
                        }}
                        className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                      >
                        <FaHeart className="text-white text-sm" />
                      </button>
                    </div>
                    
                    {/* Song Info */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-white truncate group-hover:text-pink-400 transition-colors duration-300">
                        {song.title}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {song.artist}
                      </p>
                      
                      {/* Mood Badge */}
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          song.mood === 'romantic' ? 'bg-pink-500/20 text-pink-300' :
                          song.mood === 'party' ? 'bg-purple-500/20 text-purple-300' :
                          song.mood === 'sad' ? 'bg-blue-500/20 text-blue-300' :
                          song.mood === 'intense' ? 'bg-red-500/20 text-red-300' :
                          song.mood === 'pretty' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {getMoodIcon(song.mood)} {song.mood}
                        </span>
                      </div>
                      
                      {/* Duration */}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FaClock className="text-pink-400" />
                        <span>3:00</span>
                      </div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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

export default Liked;
