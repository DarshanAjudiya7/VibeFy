import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import songs from "../data/songs.json";

const StatsPage = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

      const playMap = new Map();
      stored.forEach((song) => {
        const key = song.id;
        if (playMap.has(key)) {
          const existing = playMap.get(key);
          existing.count += 1;
          playMap.set(key, existing);
        } else {
          playMap.set(key, { ...song, count: song.count || 1 });
        }
      });

      const uniqueSongs = Array.from(playMap.values());
      setRecentSongs(uniqueSongs);
    } catch (e) {
      console.error("Stats error", e);
    }
  }, []);

  const moodStats = {};
  const artistStats = {};

  recentSongs.forEach((song) => {
    moodStats[song.mood] = (moodStats[song.mood] || 0) + song.count;
    artistStats[song.artist] = (artistStats[song.artist] || 0) + song.count;
  });

  const handlePlayPause = (song) => {
    if (currentlyPlaying?.id === song.id) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
    } else {
      if (currentAudio) currentAudio.pause();
      const audio = new Audio(song.url);
      audio.play();
      setCurrentAudio(audio);
      setCurrentlyPlaying(song);
      setIsPlaying(true);

      const recent = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
      localStorage.setItem("recentlyPlayed", JSON.stringify([...recent, { ...song, count: 1 }]));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1db954] via-black to-[#121212] p-6 text-white space-y-6">
      <button
        onClick={() => navigate("/player")}
        className="text-sm bg-black bg-opacity-40 px-3 py-1 rounded hover:bg-opacity-60"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold">Your Listening Stats</h2>
      <p className="text-sm">Total Songs Played: {recentSongs.reduce((acc, song) => acc + song.count, 0)}</p>

      <div>
        <h3 className="text-lg font-semibold mt-4">Recent Songs</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
          {recentSongs.map((song, index) => (
            <div key={index} className="bg-black bg-opacity-30 p-3 rounded cursor-pointer">
              <div className="relative w-full h-32" onClick={() => handlePlayPause(song)}>
                <img
                  src={song.cover || "https://via.placeholder.com/150"}
                  alt={song.title}
                  className="w-full h-full object-cover rounded"
                />
                <span className="absolute top-1 left-1 bg-black bg-opacity-60 text-xs text-white px-2 py-1 rounded">
                  {song.count} Plays
                </span>
                {currentlyPlaying?.id === song.id && (
                  <span className="absolute top-1 right-1 bg-green-600 text-xs text-white px-2 py-1 rounded">
                    {isPlaying ? "Playing" : "Paused"}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-semibold">{song.title}</p>
              <p className="text-xs text-gray-400">{song.artist}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4">Top Moods</h3>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          {Object.entries(moodStats).map(([mood, count]) => (
            <li key={mood}>{mood}: {count} times</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4">Top Artists</h3>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          {Object.entries(artistStats).map(([artist, count]) => (
            <li key={artist}>{artist}: {count} plays</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsPage;
