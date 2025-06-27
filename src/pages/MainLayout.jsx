import { useState, useEffect } from 'react';
import Sidebar from '../pages/Sidebar';
import Player from '../pages/Player';
import SongList from '../components/SongList';
import MiniQueue from '../components/MiniQueue';
import SearchBar from '../components/SearchBar';
import NowPlayingCard from '../components/NowPlayingCard';
import songs from '../data/songs.json';

const moodGradients = {
  romantic: "from-pink-400 via-rose-300 to-pink-200",
  sad: "from-blue-600 via-indigo-500 to-gray-500",
  party: "from-yellow-300 via-pink-300 to-orange-200",
  intense: "from-red-700 via-pink-700 to-red-400",
pretty: "from-[#4b6cb7] via-[#182848] to-[#355c7d]",

 // updated monsoon pastel
  default: "from-green-300 via-teal-200 to-green-100"
};

const MainLayout = () => {
  const [currentSong, setCurrentSong] = useState(songs?.[0] || null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [search, setSearch] = useState("");
  const [likedSongs, setLikedSongs] = useState([]);
  const [queue, setQueue] = useState([]); // Empty initially

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(stored);
  }, []);

  const toggleLike = (songId) => {
    const updated = likedSongs.includes(songId)
      ? likedSongs.filter((id) => id !== songId)
      : [...likedSongs, songId];
    setLikedSongs(updated);
    localStorage.setItem("likedSongs", JSON.stringify(updated));
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleAddToQueue = (song) => {
    setQueue((prev) => [...prev, song]);
  };

  const handleRemoveFromQueue = (song) => {
    setQueue((prev) => prev.filter((s) => s.id !== song.id));
  };

  const handleClearQueue = () => {
    setQueue([]);
  };

  const handleNextSong = () => {
    if (queue.length > 0) {
      const next = queue[0];
      setCurrentSong(next);
      setQueue(queue.slice(1));
      setIsPlaying(true);
    }
  };

  const mood = currentSong?.mood || "default";
  const gradient = moodGradients[mood];
  const isLightBackground = mood === "pretty";

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!currentSong) return <div className="text-black p-4">No songs available.</div>;

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br ${gradient} overflow-hidden flex flex-col md:flex-row ${
        isLightBackground ? "text-gray-700" : "text-white"
      }`}
    >
      {/* Floating music notes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 animate-float">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              fontSize: `${20 + Math.random() * 20}px`
            }}
          >
            🎵
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="md:w-16 w-full md:h-auto h-16 fixed md:static bottom-0 z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 z-10 p-4 pt-20 md:pt-6 space-y-4 md:ml-16">
        <SearchBar search={search} setSearch={setSearch} />
        <SongList
          songs={filteredSongs}
          onSelectSong={handleSelectSong}
          onAddToQueue={handleAddToQueue}
          toggleLike={toggleLike}
          likedSongs={likedSongs}
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/4 p-4 space-y-4 z-10">
        <MiniQueue
          queue={queue}
          onRemoveFromQueue={handleRemoveFromQueue}
          onClearQueue={handleClearQueue}
        />
        <NowPlayingCard song={currentSong} />
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPauseClick={() => setIsPlaying(!isPlaying)}
          onSongEnd={handleNextSong}
          likedSongs={likedSongs}
          toggleLike={toggleLike}
          onAddToQueue={handleAddToQueue}
        />
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
