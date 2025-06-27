import React from "react";
import { FaPlay, FaPlus, FaTrash } from "react-icons/fa";

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
    <div className="p-4 rounded-xl text-white overflow-y-auto max-h-[500px] custom-scrollbar">
      <div className="hidden sm:grid grid-cols-5 text-sm border-b border-gray-700 pb-2 mb-2 font-semibold">
        <span>Cover</span>
        <span>Title</span>
        <span>Artist</span>
        <span>Time</span>
        <span>Actions</span>
      </div>

      <div className="flex flex-col gap-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="grid grid-cols-2 sm:grid-cols-5 text-sm items-center py-2 px-2 hover:bg-white/10 rounded transition-all cursor-pointer"
            onClick={() => onSelectSong(song)}
          >
            <div className="flex justify-center sm:justify-start">
              <img
                src={song.cover}
                alt={song.title}
                onError={(e) => {
                  e.target.src = "/default-cover.jpg";
                }}
                className="w-12 h-12 rounded object-cover"
              />
            </div>

            <span className="truncate">{song.title}</span>
            <span className="hidden sm:block truncate">{song.artist}</span>
            <span className="hidden sm:block">3:00</span>

            <div
              className="flex justify-center sm:justify-start gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                onClick={() => onSelectSong(song)}
                title="Play Song"
              >
                <FaPlay />
              </button>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                onClick={() => onAddToQueue(song)}
                title="Add to Queue"
              >
                <FaPlus />
              </button>

              {showLike && (
                <button
                  className={`${
                    likedSongs.includes(song.id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-500 hover:bg-gray-600"
                  } text-white p-2 rounded`}
                  onClick={() => toggleLike(song.id)}
                  title="Like / Unlike"
                >
                  {likedSongs.includes(song.id) ? "💔" : "❤️"}
                </button>
              )}

              {showDelete && (
                <button
                  className="bg-red-700 hover:bg-red-800 text-white p-2 rounded"
                  onClick={() => toggleLike(song.id)}
                  title="Remove from Liked"
                >
                  <FaTrash />
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
