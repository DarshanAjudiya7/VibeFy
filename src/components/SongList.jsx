import React from "react";

export default function SongList({ songs, likedSongs, toggleLike, setCurrentSong, onAddToQueue }) {
  if (songs.length === 0) {
    return <p>No songs to show.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {songs.map((song) => {
        const isLiked = likedSongs.includes(song.id);
        return (
          <div
            key={song.id}
            className="bg-gray-800 p-3 rounded-lg shadow hover:bg-pink-600 transition cursor-pointer"
          >
            {/* Song cover */}
            <img
              src={song.cover}
              alt={song.title}
              onClick={() => setCurrentSong(song)}
              className="w-full h-40 object-contain rounded mb-2"
            />

            {/* Song title & artist */}
            <div onClick={() => setCurrentSong(song)}>
              <h3 className="font-semibold truncate">{song.title}</h3>
              <p className="text-sm text-gray-300 truncate">{song.artist}</p>
            </div>

            {/* Like + Queue buttons in flex */}
            <div className="mt-2 flex justify-between gap-2">
              <button
                onClick={() => toggleLike(song.id)}
                className={`flex-1 py-1 rounded text-sm ${
                  isLiked ? "bg-red-500" : "bg-gray-700"
                }`}
              >
                {isLiked ? "❤️ Liked" : "♡ Like"}
              </button>

              <button
                onClick={() => onAddToQueue(song)}
                className="flex-1 py-1 rounded text-sm bg-blue-600 hover:bg-blue-700"
              >
                ➕ Queue
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
