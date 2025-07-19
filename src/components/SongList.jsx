import React from "react";
import { FaPlay, FaPlus, FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import SongCard from "./SongCard";

const SongList = ({
  songs,
  onSelectSong = () => {},
  onAddToQueue = () => {},
  toggleLike = () => {},
  likedSongs = [],
  showLike = true,
  showDelete = false
}) => {
  return (
    <div className="p-2 md:p-4 rounded-xl text-white mb-20">
      {/* Mobile grid view */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onPlay={onSelectSong}
            liked={likedSongs.includes(song.id)}
            onLikeToggle={toggleLike}
          />
        ))}
      </div>
      {/* Desktop table/list view */}
      <div className="hidden sm:grid grid-cols-5 text-sm border-b border-gray-700 pb-2 mb-2 font-bold">
        <span>Cover</span>
        <span>Title</span>
        <span>Artist</span>
        <span>Time</span>
        <span>Actions</span>
      </div>
      <div className="hidden sm:flex flex-col gap-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="grid grid-cols-2 sm:grid-cols-5 text-sm items-center py-2 px-2 hover:bg-white/10 rounded transition-all"
          >
            <div className="flex justify-center sm:justify-start">
              <img
                src={song.cover}
                alt={song.title}
                onError={(e) => {
                  e.target.src = "/default-cover.jpg";
                }}
                className="w-16 h-16 rounded object-cover"
              />
            </div>
            <span className="truncate">{song.title}</span>
            <span className="hidden sm:block truncate">{song.artist}</span>
            <span className="hidden sm:block">3:00</span>
            <div className="flex justify-center sm:justify-start gap-2">
              {/* Modern Play Button */}
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-green-500/80 active:bg-green-600/90 shadow-lg ring-1 ring-green-400/30 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all backdrop-blur-md"
                onClick={() => onSelectSong(song)}
                title="Play Song"
              >
                <FaPlay className="text-green-400 group-hover:text-white text-lg drop-shadow" />
              </button>
              {/* Modern Queue Button */}
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-blue-500/80 active:bg-blue-600/90 shadow-lg ring-1 ring-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all backdrop-blur-md"
                onClick={() => onAddToQueue(song)}
                title="Add to Queue"
              >
                <FaPlus className="text-blue-400 group-hover:text-white text-lg drop-shadow" />
              </button>
              {/* Modern Like Button */}
              {showLike && (
                <button
                  className={`p-2 rounded-full shadow-lg ring-1 focus:outline-none focus:ring-2 transition-all backdrop-blur-md ${
                    likedSongs.includes(song.id)
                      ? "bg-pink-500/80 hover:bg-pink-600/90 focus:ring-pink-400 ring-pink-400/30"
                      : "bg-white/10 hover:bg-gray-600/80 focus:ring-gray-400 ring-gray-400/30"
                  }`}
                  onClick={() => toggleLike(song.id)}
                  title={likedSongs.includes(song.id) ? "Unlike" : "Like"}
                >
                  {likedSongs.includes(song.id) ? (
                    <FaHeart className="text-white text-lg drop-shadow" />
                  ) : (
                    <FaRegHeart className="text-pink-400 text-lg drop-shadow" />
                  )}
                </button>
              )}
              {showDelete && (
                <button
                  className="p-2 rounded-full bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  onClick={() => toggleLike(song.id)}
                  title="Remove from Liked"
                >
                  <FaTrash className="text-white text-lg" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
