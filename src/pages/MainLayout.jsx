import { useEffect, useState } from 'react';
import Sidebar from '../pages/Sidebar';
import Player from '../pages/Player';
import PersistentPlayer from '../components/PersistentPlayer';
import SongList from '../components/SongList';
import MiniQueue from '../components/MiniQueue';
import SearchBar from '../components/SearchBar';
import NowPlayingCard from '../components/NowPlayingCard';
import { usePlayer } from '../context/PlayerContext';
import songs from '../data/songs.json';

const moodGradients = {
  romantic: "from-[#2a0a18] via-[#6d214f] to-[#3a0d2e]",       // dark pink and magenta
  sad: "from-[#15181e] via-[#232526] to-[#000000]",            // very dark blue/gray
  party: "from-[#18141c] via-[#1a1a2e] to-[#232526]",          // very dark with subtle neon tint
  intense: "from-[#1a0a1e] via-[#2c1a2e] to-[#232526]",        // very dark magenta/purple
  pretty: "from-[#18141c] via-[#23233a] to-[#232526]",         // very dark purple/blue
  default: "from-[#18141c] via-[#232526] to-[#000000]"         // very dark blue/black
};

const moodEmojis = {
  romantic: "\u2764\ufe0f\ud83d\udc9e",
  intense: "\u2b50\ud83d\udd25",
  pretty: "\u2728\ud83d\udcab",
  default: "\ud83d\udc9d\ud83d\udc98",
  sad:"\ud83d\udda4\ud83d\udc99",
  party:"\ud83c\udf89"
};

const MainLayout = () => {
  const [search, setSearch] = useState("");
  const [likedSongs, setLikedSongs] = useState([]);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Use player context for all player state
  const {
    currentSong,
    isPlaying,
    playlist,
    queue,
    playSong,
    addToQueue,
    removeFromQueue,
    clearQueue,
    togglePlayPause,
    playNext,
    playPrevious,
    setPlaylist
  } = usePlayer();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(stored);
    // Ensure playlist is set on mount
    if (!playlist.length) setPlaylist(songs);
  }, []);

  // Banner carousel timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const bannerImages = [
    "/covers/banner.jpg",
    "/covers/banner1.jpg", 
    "/covers/banner2.jpg",
    "/covers/banner3.jpg",
  ];

  const toggleLike = (songId) => {
    const updated = likedSongs.includes(songId)
      ? likedSongs.filter((id) => id !== songId)
      : [...likedSongs, songId];
    setLikedSongs(updated);
    localStorage.setItem("likedSongs", JSON.stringify(updated));
  };

  const handleSelectSong = (song) => {
    // Play the selected song and set the playlist
    const songIndex = songs.findIndex(s => s.id === song.id);
    playSong(song, songs, songIndex);
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
      const filtered = stored.filter((s) => s.id !== song.id);
      const updated = [song, ...filtered];
      localStorage.setItem("recentlyPlayed", JSON.stringify(updated.slice(0, 50)));
    } catch (e) {
      console.error("Error updating recently played:", e);
    }
  };

  // Only add to queue if not already in queue
  const handleAddToQueue = (song) => {
    if (!queue.find((s) => s.id === song.id)) {
      addToQueue(song);
    }
  };

  const mood = currentSong?.mood || "default";
  const gradient = moodGradients[mood];
  const isLightBackground = mood === "pretty";
  const moodEmoji = moodEmojis[mood] || "\ud83c\udfb5";

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`relative min-h-screen h-screen bg-gradient-to-br ${gradient} overflow-hidden flex flex-col md:flex-row ${
        isLightBackground ? "text-gray-700" : "text-white"
      }`}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-2">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      {/* Animated background icons */}
      {animationsEnabled && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 animate-float">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                fontSize: `${20 + Math.random() * 25}px`
              }}
            >
              {moodEmoji}
            </div>
          ))}
        </div>
      )}

      {/* Party glow */}
      {animationsEnabled && mood === "party" && (
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`party-light-${i}`}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
                opacity: 0.4,
                animation: `pulseGlow ${2 + Math.random() * 2}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      )}

      <div className="md:w-16 w-full md:h-auto h-16 fixed md:static bottom-0 z-10">
        <Sidebar
          animationsEnabled={animationsEnabled}
          setAnimationsEnabled={setAnimationsEnabled}
        />
      </div>

      <div className="flex-1 z-10 p-4 pt-20 pb-0 md:pt-4 space-y-6 md:ml-16 flex flex-col min-h-0 h-full">
        {/* Enhanced Banner Section */}
        <div className="flex justify-center mb-6 relative">
          <div className="relative w-full max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm">
              <img
                src={bannerImages[currentBannerIndex]}
                alt="Banner"
                className="w-full h-30 md:h-36 md:object-cover object-center transition-all duration-700"
                style={{ background: "#222" }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Search Bar Overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
                <div className="relative">
                  <SearchBar search={search} setSearch={setSearch} small />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none"></div>
                </div>
              </div>
              
              {/* Carousel Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBannerIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-400 shadow-lg ${
                      index === currentBannerIndex
                        ? 'bg-white scale-70 shadow-white/50'
                        : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Song List Container */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
          <div className="p-4">
            <SongList
              songs={filteredSongs}
              onSelectSong={handleSelectSong}
              onAddToQueue={handleAddToQueue}
              toggleLike={toggleLike}
              likedSongs={likedSongs}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/4 p-4 z-10 flex flex-col h-full min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-4 flex flex-col">
          <MiniQueue
            queue={queue}
            onRemoveFromQueue={removeFromQueue}
            onClearQueue={clearQueue}
          />
          <NowPlayingCard song={currentSong} />
        </div>
        <Player
          likedSongs={likedSongs}
          toggleLike={toggleLike}
          isRepeating={isRepeating}
          setIsRepeating={setIsRepeating}
        />
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.5; filter: blur(1px); }
          50% { transform: scale(1.5); opacity: 0; filter: blur(3px); }
          100% { transform: scale(1); opacity: 0.5; filter: blur(1px); }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
