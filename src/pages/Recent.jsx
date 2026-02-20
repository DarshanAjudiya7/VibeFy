import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaClock, FaHistory } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import SongList from "../components/SongList";

const RecentPage = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  const { search, likedSongs, toggleLike } = useOutletContext();
  const { playSong, addToQueue } = usePlayer();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
      // Get unique songs with their latest timestamp
      const unique = Array.from(
        new Map(stored.map((song) => [song.id, song])).values()
      ).reverse();
      setRecentSongs(unique);
    } catch (error) {
      console.error("Error parsing recentlyPlayed:", error);
      setRecentSongs([]);
    }
  }, []);

  const filteredSongs = recentSongs.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="px-8 pt-10 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <FaHistory className="text-[#1db954]" size={24} />
          <h1 className="text-3xl font-black">Recently Played</h1>
        </div>
        <p className="text-[#b3b3b3] text-sm font-medium">Your listening history from the last few days.</p>
      </div>

      {/* Control Bar (Simplified) */}
      <div className="px-8 py-4 border-b border-white/5 mb-6">
        <div className="flex gap-4">
          <button className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-xs font-bold transition-all">Clear history</button>
        </div>
      </div>

      {/* Song List */}
      <div className="px-8">
        {recentSongs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#b3b3b3]">
            <FaClock size={64} className="mb-4 opacity-20" />
            <h3 className="text-2xl font-bold text-white mb-2">No history yet</h3>
            <p className="text-sm">Songs you play will show up here.</p>
          </div>
        ) : (
          <SongList
            songs={filteredSongs}
            onSelectSong={(song) => playSong(song, recentSongs, recentSongs.indexOf(song))}
            onAddToQueue={addToQueue}
            toggleLike={toggleLike}
            likedSongs={likedSongs}
          />
        )}
      </div>
    </div>
  );
};


export default RecentPage;