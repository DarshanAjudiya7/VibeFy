import React from "react";
import songs from "../data/songs.json";
import SongList from "../components/SongList";

const LikedSongs = ({ likedSongs, onSelectSong, onAddToQueue, toggleLike }) => {
  const liked = songs.filter((song) => likedSongs.includes(song.id));

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">❤️ Liked Songs</h1>
      <SongList
        songs={liked}
        onSelectSong={onSelectSong}
        onAddToQueue={onAddToQueue}
        toggleLike={toggleLike}  // Still used here
        likedSongs={likedSongs}
        showDelete={true}       // New prop to show delete button
      />
    </div>
  );
};

export default LikedSongs;
