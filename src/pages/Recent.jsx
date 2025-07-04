import { useEffect, useState } from "react";

const RecentPage = () => {
  const [recentSongs, setRecentSongs] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
      const unique = Array.from(
        new Map(stored.map((song) => [song.id, song])).values()
      );
      setRecentSongs(unique.reverse());
    } catch (error) {
      console.error("Error parsing recentlyPlayed:", error);
      setRecentSongs([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 text-white space-y-4">
      <h2 className="text-xl font-bold">Recently Played</h2>
      {recentSongs.length === 0 ? (
        <p>No recently played songs.</p>
      ) : (
        recentSongs.map((song, index) => (
          <div
            key={song?.id || index}
            className="bg-black bg-opacity-30 p-3 rounded flex items-center gap-4"
          >
            <img
              src={song?.cover || "https://via.placeholder.com/64"}
              alt={song?.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{song?.title || "Unknown Title"}</p>
              <p className="text-sm">{song?.artist || "Unknown Artist"}</p>
              <p className="text-xs italic text-gray-400">Mood: {song?.mood || "--"}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentPage;