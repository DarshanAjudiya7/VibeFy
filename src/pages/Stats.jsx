import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaChartBar, 
  FaMusic, 
  FaHeart, 
  FaClock, 
  FaFire, 
  FaUser, 
  FaPalette,
  FaPlay,
  FaCrown,
  FaStar
} from "react-icons/fa";
import songs from "../data/songs.json";

const StatsPage = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
      const playMap = new Map();
      stored.forEach((song) => {
        const key = song.id;
        if (playMap.has(key)) {
          const existing = playMap.get(key);
          existing.count += 1;
          playMap.set(key, existing);
        } else {
          playMap.set(key, { ...song, count: song.count || 1 });
        }
      });
      const uniqueSongs = Array.from(playMap.values());
      setRecentSongs(uniqueSongs);
    } catch (e) {
      console.error("Stats error", e);
    }
  }, []);

  const moodStats = {};
  const artistStats = {};
  recentSongs.forEach((song) => {
    moodStats[song.mood] = (moodStats[song.mood] || 0) + song.count;
    artistStats[song.artist] = (artistStats[song.artist] || 0) + song.count;
  });

  const totalPlays = recentSongs.reduce((acc, song) => acc + song.count, 0);
  const uniqueSongs = recentSongs.length;
  const topArtist = Object.entries(artistStats).sort((a, b) => b[1] - a[1])[0];
  const topMood = Object.entries(moodStats).sort((a, b) => b[1] - a[1])[0];
  const mostPlayedSong = recentSongs.sort((a, b) => b.count - a.count)[0];

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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] p-4 md:p-8 text-white overflow-hidden pb-20 mb-4">
      
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Gradient orbs */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-15 blur-3xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${80 + Math.random() * 120}px`,
              height: `${80 + Math.random() * 120}px`,
              background: `radial-gradient(circle, rgba(29, 185, 84, 0.2) 0%, rgba(0, 131, 254, 0.15) 50%, transparent 100%)`,
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
              Your Stats
            </h1>
            <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
              <FaChartBar className="text-green-400" />
              Listening Analytics
            </p>
          </div>
          
          <div className="w-32" />
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaPlay className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Plays</p>
                <p className="text-3xl font-bold text-white">{totalPlays}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaMusic className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Unique Songs</p>
                <p className="text-3xl font-bold text-white">{uniqueSongs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Top Artist</p>
                <p className="text-lg font-bold text-white truncate">{topArtist ? topArtist[0] : 'None'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-400/20 hover:border-red-400/40 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaPalette className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Top Mood</p>
                <p className="text-lg font-bold text-white capitalize">{topMood ? topMood[0] : 'None'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Moods Chart */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                <FaPalette className="text-white" />
              </div>
              <h3 className="text-2xl font-bold">Top Moods</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(moodStats).length === 0 ? (
                <p className="text-gray-400 text-center py-8">No mood data available</p>
              ) : (
                Object.entries(moodStats)
                  .sort((a, b) => b[1] - a[1])
                  .map(([mood, count], index) => {
                    const percentage = (count / totalPlays) * 100;
                    return (
                      <div key={mood} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getMoodIcon(mood)}</span>
                            <span className="font-medium capitalize">{mood}</span>
                          </div>
                          <span className="font-bold text-green-400">{count}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${getMoodColor(mood)} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>

          {/* Top Artists Chart */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <h3 className="text-2xl font-bold">Top Artists</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(artistStats).length === 0 ? (
                <p className="text-gray-400 text-center py-8">No artist data available</p>
              ) : (
                Object.entries(artistStats)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([artist, count], index) => {
                    const percentage = (count / totalPlays) * 100;
                    return (
                      <div key={artist} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-400' :
                              index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                              index === 2 ? 'bg-gradient-to-br from-orange-400 to-red-400' :
                              'bg-gradient-to-br from-blue-400 to-cyan-400'
                            }`}>
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            <span className="font-medium truncate">{artist}</span>
                          </div>
                          <span className="font-bold text-green-400">{count}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>

        {/* Most Played Song Highlight */}
        {mostPlayedSong && (
          <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-8 border border-green-400/20 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                <FaCrown className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Most Played Song</h3>
                <p className="text-gray-400">Your favorite track</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <img
                src={mostPlayedSong.cover || "https://via.placeholder.com/120"}
                alt={mostPlayedSong.title}
                className="w-24 h-24 object-cover rounded-2xl shadow-2xl"
              />
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2">{mostPlayedSong.title}</h4>
                <p className="text-gray-400 mb-3">{mostPlayedSong.artist}</p>
                <div className="flex items-center gap-4">
                  <span className="bg-gradient-to-r from-green-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {mostPlayedSong.count} plays
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    mostPlayedSong.mood === 'romantic' ? 'bg-pink-500/20 text-pink-300' :
                    mostPlayedSong.mood === 'party' ? 'bg-purple-500/20 text-purple-300' :
                    mostPlayedSong.mood === 'sad' ? 'bg-blue-500/20 text-blue-300' :
                    mostPlayedSong.mood === 'intense' ? 'bg-red-500/20 text-red-300' :
                    mostPlayedSong.mood === 'pretty' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {mostPlayedSong.mood}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Songs Grid */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
              <FaClock className="text-white" />
            </div>
            <h3 className="text-2xl font-bold">Recent Activity</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recentSongs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMusic className="text-gray-400 text-2xl" />
                </div>
                <p className="text-gray-400">No recent activity</p>
              </div>
            ) : (
              recentSongs.slice(0, 10).map((song, index) => (
                <div
                  key={song.id}
                  onMouseEnter={() => setHoveredItem(song.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group relative cursor-pointer"
                >
                  <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-green-400/30 transition-all duration-300">
                    <img
                      src={song.cover || "https://via.placeholder.com/100"}
                      alt={song.title}
                      className="w-full h-24 object-cover rounded-xl mb-3 group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className="font-semibold text-sm truncate mb-1">{song.title}</p>
                    <p className="text-xs text-gray-400 truncate mb-2">{song.artist}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-400 font-bold">{song.count} plays</span>
                      <span className="text-xs">{getMoodIcon(song.mood)}</span>
                    </div>
                    
                    {/* Hover overlay */}
                    {hoveredItem === song.id && (
                      <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                        <FaPlay className="text-white text-xl" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
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

export default StatsPage;
