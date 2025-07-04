import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import songs from "../data/songs.json";
import { FaHeart, FaPlay, FaRandom, FaDownload } from "react-icons/fa";

const Liked = () => {
  const [likedSongs, setLikedSongs] = useState([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-purple-800 to-black text-white">
      {/* Header */}
      <div className="flex items-center gap-6 px-6 pt-10 pb-6">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-green-300 rounded shadow-lg flex items-center justify-center">
          <FaHeart className="text-white text-5xl" />
        </div>
        <div>
          <p className="text-sm font-semibold">Playlist</p>
          <h1 className="text-5xl font-bold">Liked Songs</h1>
          <p className="text-sm mt-1">Kirpalsinh Solanki • {liked.length} songs</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 px-6 py-4">
        <button className="bg-green-500 p-4 rounded-full hover:scale-105 transition">
          <FaPlay className="text-black text-xl" />
        </button>
        <button className="text-xl text-white opacity-70 hover:opacity-100">
          <FaRandom />
        </button>
        <button className="text-xl text-white opacity-70 hover:opacity-100">
          <FaDownload />
        </button>
        <Link to="/player" className="ml-auto">
          <button className="text-white border px-4 py-2 rounded hover:bg-white hover:text-black">
            ⬅ Back to Player
          </button>
        </Link>
      </div>

      {/* Song List */}
      <div className="px-6 flex justify-center">
        <div className="w-full max-w-4xl mt-4">
          <div className="grid grid-cols-4 font-semibold text-gray-400 border-b border-gray-600 pb-2 mb-2">
            <p>Mood</p>
            <p>Title</p>
            <p>Album / Artist</p>
            <p className="text-right">Time</p>
          </div>

          {liked.length > 0 ? (
            liked.map((song, index) => (
              <div
                key={song.id}
                className="grid grid-cols-4 items-center py-3 text-sm hover:bg-gray-800 rounded px-2"
              >
                <p className="capitalize">{song.mood}</p>
                <div className="flex items-center gap-3">
                  <img src={song.cover} alt={song.title} className="w-10 h-10 rounded" />
                  <div>
                    <p className="font-medium">{song.title}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">{song.album || "-"}</p>
                  <p className="text-gray-400 text-xs">{song.artist}</p>
                </div>
                <p className="text-right">{song.duration || "3:30"}</p>
              </div>
            ))
          ) : (
            <p>No liked songs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Liked;
