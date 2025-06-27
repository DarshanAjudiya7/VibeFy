import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import songs from "../data/songs.json";
import SongList from "../components/SongList";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-700 p-6 text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">❤️ Liked Songs</h1>
        <Link to="/player">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            ⬅️ Back to Player
          </button>
        </Link>
      </div>

      {liked.length > 0 ? (
        <SongList
          songs={liked}
          toggleLike={toggleLike}
          likedSongs={likedSongs}
          showDelete={true}
          showLike={false}
        />
      ) : (
        <p>No liked songs found.</p>
      )}
    </div>
  );
};

export default Liked;
