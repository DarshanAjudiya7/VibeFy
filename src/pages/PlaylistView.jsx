import { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { FaMusic, FaPlay, FaTrash, FaChevronLeft, FaSearch, FaPlus, FaCheck, FaPause } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import SongList from "../components/SongList";
import songsData from "../data/songs.json";
import ConfirmModal from "../components/ConfirmModal";

const PlaylistView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        userPlaylists,
        removePlaylist,
        playSong,
        addToQueue,
        addSongToPlaylist,
        isPlaying,
        togglePlayPause,
        currentSong,
        playlist: currentActivePlaylist
    } = usePlayer();
    const { search, likedSongs, toggleLike } = useOutletContext();
    const [addSearch, setAddSearch] = useState("");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const playlist = userPlaylists.find(pl => pl.id === id);

    if (!playlist) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-8">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <FaMusic className="text-gray-600 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Playlist not found</h2>
                <p className="text-gray-400 mb-8">It might have been deleted or moved.</p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-white text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-all"
                >
                    Go Home
                </button>
            </div>
        );
    }

    const filteredPlaylistSongs = playlist.songs.filter(song =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
    );

    const isPlaylistPlaying = isPlaying && currentSong && playlist.songs.some(s => s.id === currentSong.id);

    const handlePlayPlaylist = () => {
        if (isPlaylistPlaying) {
            togglePlayPause();
        } else if (playlist.songs.length > 0) {
            playSong(playlist.songs[0], playlist.songs, 0);
        }
    };

    const searchResults = songsData.filter(song =>
        (song.title.toLowerCase().includes(addSearch.toLowerCase()) ||
            song.artist.toLowerCase().includes(addSearch.toLowerCase())) &&
        addSearch.trim() !== ""
    ).slice(0, 5);

    return (
        <div className="flex flex-col min-h-full">
            {/* Header */}
            <div className="px-8 pt-6 pb-8 bg-gradient-to-b from-gray-800 to-[#121212] flex items-end gap-6 min-h-[300px] relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-8 p-2 bg-black/40 rounded-full hover:bg-black/60 transition-all text-white"
                >
                    <FaChevronLeft size={16} />
                </button>

                <div className="w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br from-gray-700 to-gray-900 shadow-2xl flex items-center justify-center flex-shrink-0 rounded-lg">
                    <FaMusic className="text-white/20 text-7xl md:text-9xl" />
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Playlist</span>
                    <h1 className="text-5xl md:text-8xl font-black truncate max-w-[60vw]">{playlist.name}</h1>
                    <div className="flex items-center gap-2 mt-4 text-sm font-bold">
                        <span className="text-[#1db954]">VibeFy User</span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span>{playlist.songs.length} songs</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <button
                        onClick={handlePlayPlaylist}
                        disabled={playlist.songs.length === 0}
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-black transition-all shadow-xl ${playlist.songs.length > 0 ? "bg-[#1db954] hover:scale-105 active:scale-95" : "bg-gray-600 opacity-50 cursor-not-allowed"
                            }`}
                    >
                        {isPlaylistPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="translate-x-0.5" />}
                    </button>
                    <button
                        onClick={() => setIsDeleteDialogOpen(true)}
                        className="text-gray-400 hover:text-red-500 transition-all"
                        title="Delete Playlist"
                    >
                        <FaTrash size={22} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="px-8">
                {playlist.songs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-[#b3b3b3] bg-white/5 rounded-2xl border border-dashed border-white/10 mb-10">
                        <FaMusic size={64} className="mb-4 opacity-10" />
                        <h3 className="text-xl font-bold text-white mb-2">This playlist is empty</h3>
                        <p className="text-sm px-4">Find some songs to add to your new playlist!</p>
                    </div>
                ) : (
                    <SongList
                        songs={filteredPlaylistSongs}
                        onSelectSong={(song) => playSong(song, playlist.songs, playlist.songs.indexOf(song))}
                        onAddToQueue={addToQueue}
                        toggleLike={toggleLike}
                        likedSongs={likedSongs}
                    />
                )}

                {/* Search to Add Section */}
                <div className="mt-10 border-t border-white/10 pt-10 pb-20">
                    <h2 className="text-2xl font-bold mb-4">Let's find something for your playlist</h2>
                    <div className="relative max-w-xl mb-8">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={addSearch}
                            onChange={(e) => setAddSearch(e.target.value)}
                            placeholder="Search for songs or artists"
                            className="w-full bg-[#2a2a2a] border-none rounded-md py-3 pl-12 pr-4 text-sm text-white focus:ring-1 focus:ring-white/20 outline-none transition-all placeholder:text-gray-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        {searchResults.map((song) => {
                            const isInPlaylist = playlist.songs.some(s => s.id === song.id);
                            return (
                                <div key={song.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-md group transition-colors">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <img src={song.cover} className="w-10 h-10 rounded object-cover" alt={song.title} />
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-white font-medium truncate">{song.title}</span>
                                            <span className="text-xs text-gray-400 truncate">{song.artist}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => !isInPlaylist && addSongToPlaylist(playlist.id, song)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${isInPlaylist
                                            ? "border-white/20 text-gray-400 cursor-default"
                                            : "border-white/40 text-white hover:border-white hover:scale-105 active:scale-95"
                                            }`}
                                    >
                                        {isInPlaylist ? <span className="flex items-center gap-1"><FaCheck /> Added</span> : "Add"}
                                    </button>
                                </div>
                            );
                        })}
                        {addSearch && searchResults.length === 0 && (
                            <p className="text-gray-500 text-sm mt-4">No results found for "{addSearch}"</p>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={() => {
                    removePlaylist(playlist.id);
                    navigate("/");
                }}
                title="Delete Playlist"
                message={`Are you sure you want to delete "${playlist.name}"? This action is permanent and cannot be undone.`}
            />
        </div>
    );
};

export default PlaylistView;
