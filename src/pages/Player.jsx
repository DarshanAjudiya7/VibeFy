import { useState, useEffect } from "react";
import songs from "../data/songs.json";
import SongList from "../components/SongList";
import SearchBar from "../components/SearchBar";

import MiniQueue from "../components/MiniQueue";

const moodBackgrounds = {
  romantic: "linear-gradient(to left, #ff69b7, #ffb6c1)", // pink shades
  sad: "linear-gradient(to right, #001f3f, #0074D9)", // dark blue shades
  party: "linear-gradient(to right, #ff6a00, #ee0979)", // energetic colors
  intense: "linear-gradient(to right, #8B0000, #FF0000)", // deep reds
  default: "linear-gradient(to right, #228B22, #32CD32)" // green tones
};


const moodEmojis = {
  romantic: "💗 Romantic",
  sad: "😢 Sad",
  party: "🎉 Party",
  intense: "🔥 Intense",
  default: "🎵 Music"
};

const filterBackgrounds = {
  all: "linear-gradient(to right, #434343, #000000)",
  liked: "linear-gradient(to right, #ff5f6d, #ffc371)",
  recent: "linear-gradient(to right, #00c6ff, #0072ff)"
};

const Player = () => {
  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem("likedSongs");
    return saved ? JSON.parse(saved) : [];
  });

  const [recentSongs, setRecentSongs] = useState(() => {
    const saved = localStorage.getItem("recentSongs");
    return saved ? JSON.parse(saved) : [];
  });

  const [queue, setQueue] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [artistFilter, setArtistFilter] = useState("All");
  const [currentMood, setCurrentMood] = useState("default");
  const [bgEffect, setBgEffect] = useState(moodBackgrounds["default"]);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  useEffect(() => {
    setBgEffect(moodBackgrounds[currentMood] || moodBackgrounds["default"]);
  }, [currentMood]);

  const toggleLike = (songId) => {
    setLikedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  const handleSongPlay = (song) => {
    setCurrentSong(song);
    setCurrentMood(song.mood || "default");

    setRecentSongs((prev) => {
      const withoutDuplicate = prev.filter((s) => s.id !== song.id);
      const updated = [song, ...withoutDuplicate].slice(0, 5);
      localStorage.setItem("recentSongs", JSON.stringify(updated));
      return updated;
    });
  };

  const handleQueueAdd = (song) => {
    setQueue((prev) => {
      if (!prev.find((s) => s.id === song.id)) {
        return [...prev, song];
      }
      return prev;
    });
  };

  const handleRemoveFromQueue = (song) => {
    setQueue((prev) => prev.filter((s) => s.id !== song.id));
  };

  const artists = ["All", ...new Set(songs.map((s) => s.artist))];

  let filteredSongs = songs;
  if (filter === "liked") {
    filteredSongs = filteredSongs.filter((song) =>
      likedSongs.includes(song.id)
    );
  } else if (filter === "recent") {
    filteredSongs = recentSongs;
  }

  filteredSongs = filteredSongs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArtist =
      artistFilter === "All" || song.artist === artistFilter;
    return matchesSearch && matchesArtist;
  });

  return (
    <div
      className="relative min-h-screen text-white transition-all duration-500"
      style={{
        background: `${bgEffect}, ${filterBackgrounds[filter] || "#000000"}`,
        backgroundBlendMode: "overlay"
      }}
    >
      <div className="relative z-10 min-h-screen bg bg-opacity-40 p-6">
        <h1 className="text-3xl font-bold mb-4">🎵 Music Player</h1>

        <p className="mb-4 text-lg">
          Mood: <span className="font-semibold">{moodEmojis[currentMood]}</span>
        </p>

        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500" : "bg-gray-600"}`}
          >
            🎶 All Songs
          </button>

          <button
            onClick={() => setFilter("liked")}
            className={`px-4 py-2 rounded ${filter === "liked" ? "bg-red-500" : "bg-gray-600"}`}
          >
            ❤️ Liked ({likedSongs.length})
          </button>

          <button
            onClick={() => setFilter("recent")}
            className={`px-4 py-2 rounded ${filter === "recent" ? "bg-yellow-500" : "bg-gray-600"}`}
          >
            ⏱ Recently Played
          </button>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          artistFilter={artistFilter}
          setArtistFilter={setArtistFilter}
          artists={artists}
        />

        {currentSong ? (
          <audio
            src={currentSong.url}
            controls
            autoPlay
            className="w-full mb-6"
            onEnded={() => {
              if (queue.length > 0) {
                const [next, ...rest] = queue;
                setQueue(rest);
                handleSongPlay(next);
              } else {
                setCurrentSong(null);
              }
            }}
          />
        ) : (
          <p className="mb-6">Select a song to play</p>
        )}

        <MiniQueue
          queue={queue}
          onClearQueue={() => setQueue([])}
          onRemoveFromQueue={handleRemoveFromQueue}
        />

        <SongList
          songs={filteredSongs}
          likedSongs={likedSongs}
          toggleLike={toggleLike}
          setCurrentSong={handleSongPlay}
          onAddToQueue={handleQueueAdd}
        />
      </div>
    </div>
  );
};

export default Player;