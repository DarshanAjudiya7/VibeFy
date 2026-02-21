import React from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { FaPlay, FaPause, FaChevronLeft, FaMicrophone } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import SongList from "../components/SongList";
import songsData from "../data/songs.json";
import artistsData from "../data/artists.json";

const ArtistView = () => {
    const { name } = useParams();
    const decodedName = decodeURIComponent(name);
    const navigate = useNavigate();
    const { playSong, addToQueue, isPlaying, togglePlayPause, currentSong, followedArtists, toggleFollowArtist } = usePlayer();
    const { search, likedSongs, toggleLike } = useOutletContext();

    const artistSongs = songsData.filter(s =>
        s.artist.toLowerCase().includes(decodedName.toLowerCase())
    );
    const artistMeta = artistsData.find(a => a.name.toLowerCase() === decodedName.toLowerCase());

    const filteredSongs = artistSongs.filter(song =>
        song.title.toLowerCase().includes(search.toLowerCase())
    );

    const artistImage = artistMeta?.image || artistSongs[0]?.cover || "/covers/default.jpg";

    const isArtistPlaying = isPlaying && currentSong && artistSongs.some(s => s.id === currentSong.id);
    const isFollowed = followedArtists.includes(decodedName);

    const handlePlayArtist = () => {
        if (isArtistPlaying) {
            togglePlayPause();
        } else if (artistSongs.length > 0) {
            playSong(artistSongs[0], artistSongs, 0);
        }
    };

    return (
        <div className="flex flex-col min-h-full">
            {/* Dynamic Header */}
            <div className="px-4 sm:px-8 pt-16 sm:pt-6 pb-10 bg-gradient-to-b from-zinc-700 to-[#121212] flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 min-h-[350px] relative text-center sm:text-left">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-4 sm:left-8 p-2 bg-black/40 rounded-full hover:bg-black/60 transition-all text-white z-10"
                >
                    <FaChevronLeft size={16} />
                </button>

                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 shadow-2xl flex-shrink-0 rounded-full overflow-hidden border-4 border-white/10 group">
                    <img
                        src={artistImage}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt={decodedName}
                        onError={(e) => (e.target.src = "/covers/default.jpg")}
                    />
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 py-2 w-full">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter">Verified Artist</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl truncate max-w-full">
                        {decodedName}
                    </h1>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 sm:mt-4 text-[11px] sm:text-sm font-bold text-white/90">
                        <span>{artistSongs.length * 1024} Listeners</span>
                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                        <span>{artistSongs.length} songs</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="px-4 sm:px-8 py-6 flex items-center gap-4 sm:gap-8 justify-center sm:justify-start">
                <button
                    onClick={handlePlayArtist}
                    disabled={artistSongs.length === 0}
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1db954] rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isArtistPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="translate-x-0.5" />}
                </button>
                <button
                    onClick={() => toggleFollowArtist(decodedName)}
                    className={`px-6 sm:px-8 py-2 border rounded-full font-bold text-xs sm:text-sm transition-all uppercase tracking-widest active:scale-95 ${isFollowed
                        ? "border-[#1db954] text-[#1db954] hover:bg-[#1db954]/10"
                        : "border-white/20 text-white hover:border-white"
                        }`}
                >
                    {isFollowed ? "Following" : "Follow"}
                </button>
            </div>


            {/* Song List */}
            <div className="px-4 sm:px-8">
                <h2 className="text-2xl font-bold mb-6">Popular Tracks</h2>
                {artistSongs.length === 0 ? (
                    <div className="py-20 text-center text-zinc-500">
                        No songs found for this artist.
                    </div>
                ) : (
                    <SongList
                        songs={filteredSongs}
                        onSelectSong={(song) => playSong(song, artistSongs, artistSongs.indexOf(song))}
                        onAddToQueue={addToQueue}
                        toggleLike={toggleLike}
                        likedSongs={likedSongs}
                    />
                )}
            </div>
        </div>
    );
};

export default ArtistView;
