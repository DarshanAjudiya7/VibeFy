import React from "react";
import { useOutletContext } from "react-router-dom";
import songs from "../data/songs.json";
import { FaHeart, FaPlay, FaPause } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import SongList from "../components/SongList";

const Liked = () => {
  const { likedSongs, toggleLike, search } = useOutletContext();
  const { playSong, addToQueue, isPlaying, togglePlayPause, currentSong } = usePlayer();

  const liked = songs.filter((song) => likedSongs.includes(song.id))
    .filter(song =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
    );

  const isLikedPlaying = isPlaying && currentSong && liked.some(s => s.id === currentSong.id);

  const handlePlayLiked = () => {
    if (isLikedPlaying) {
      togglePlayPause();
    } else if (liked.length > 0) {
      playSong(liked[0], liked, 0);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Playlist Header (Spotify Style) */}
      <div className="px-8 pt-6 pb-8 bg-gradient-to-b from-[#5038a0] to-[#121212] flex items-end gap-6 min-h-[300px]">
        <div className="w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br from-[#450af5] to-[#c4efd9] shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center flex-shrink-0">
          <FaHeart className="text-white text-7xl md:text-9xl" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider">Playlist</span>
          <h1 className="text-5xl md:text-8xl font-black">Liked Songs</h1>
          <div className="flex items-center gap-2 mt-4 text-sm font-bold">
            <span className="hover:underline cursor-pointer">VibeFy User</span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span>{liked.length} songs</span>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="px-8 py-6 flex items-center gap-8">
        <button
          onClick={handlePlayLiked}
          className="w-14 h-14 bg-[#1db954] rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          {isLikedPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="translate-x-0.5" />}
        </button>
      </div>

      {/* Song List */}
      <div className="px-8">
        {liked.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#b3b3b3]">
            <FaHeart size={64} className="mb-4 opacity-20" />
            <h3 className="text-2xl font-bold text-white mb-2">Songs you like will appear here</h3>
            <p className="text-sm">Save songs by tapping the heart icon.</p>
          </div>
        ) : (
          <SongList
            songs={liked}
            onSelectSong={(song) => playSong(song, liked, liked.indexOf(song))}
            onAddToQueue={addToQueue}
            toggleLike={toggleLike}
            likedSongs={likedSongs}
          />
        )}
      </div>
    </div>
  );
};

export default Liked;
