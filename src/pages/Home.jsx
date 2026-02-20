import { useNavigate, useOutletContext } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import SongList from "../components/SongList";
import SongCard from "../components/SongCard";
import songsData from "../data/songs.json";

function Home() {
  const navigate = useNavigate();
  const { search, likedSongs, toggleLike } = useOutletContext();
  const { playSong, addToQueue } = usePlayer();

  const filteredSongs = songsData.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectSong = (song) => {
    const songIndex = songsData.findIndex(s => s.id === song.id);
    playSong(song, songsData, songIndex);
  };

  const categories = [
    { title: "Made For You", songs: filteredSongs.slice(0, 4) },
    { title: "Recently Played", songs: filteredSongs.slice(4, 10) },
    { title: "Jump Back In", songs: filteredSongs.slice(10, 16) }
  ];

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Hero Banner */}
      <div className="px-8">
        <div className="relative h-[250px] md:h-[320px] rounded-xl overflow-hidden group cursor-pointer">
          <img
            src="/covers/banner.jpg"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Hero"
            onError={(e) => e.target.src = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
            <p className="text-sm font-bold uppercase tracking-wider mb-2 text-[#1db954]">Featured Playlist</p>
            <h1 className="text-5xl md:text-7xl font-black mb-4">VibeFy Mix</h1>
            <p className="text-gray-300 max-w-xl">Fresh tunes, curated just for you. Discover your next favorite song with our smart recommendation engine.</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-8 flex flex-col gap-10">
        {categories.map((category, idx) => (
          category.songs.length > 0 && (
            <div key={idx}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold hover:underline cursor-pointer">{category.title}</h2>
                <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">Show all</span>
              </div>

              {/* Grid for cards (Spotify Style) */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {category.songs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    onSelectSong={handleSelectSong}
                  />
                ))}
              </div>
            </div>
          )
        ))}

        {/* Full List Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Discover More</h2>
          <SongList
            songs={filteredSongs}
            onSelectSong={handleSelectSong}
            onAddToQueue={addToQueue}
            toggleLike={toggleLike}
            likedSongs={likedSongs}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;


