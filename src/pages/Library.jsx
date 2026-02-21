import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaPlus, FaList, FaTrash, FaMusic } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import ConfirmModal from "../components/ConfirmModal";

const Library = () => {
    const navigate = useNavigate();
    const { userPlaylists, removePlaylist, likedSongs } = usePlayer();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    return (
        <div className="flex flex-col gap-8 pb-32 px-4 sm:px-8 pt-16 sm:pt-10">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black mb-2 text-white">Your Library</h1>
                    <p className="text-[#b3b3b3] text-sm font-medium">Manage your playlists and liked songs.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all active:scale-90"
                >
                    <FaPlus />
                </button>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Liked Songs Card - Special Folder */}
                <Link
                    to="/liked"
                    className="relative group aspect-square rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 p-6 flex flex-col justify-end overflow-hidden shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
                >
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white scale-125 group-hover:scale-[1.35] transition-transform">
                        <FaHeart />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Liked Songs</h2>
                        <p className="text-white/80 font-bold text-sm">{likedSongs.length} songs</p>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                </Link>

                {/* User Playlists */}
                {userPlaylists.map((playlist) => (
                    <div
                        key={playlist.id}
                        className="relative group aspect-square rounded-2xl bg-[#181818] hover:bg-[#282828] p-6 flex flex-col justify-end overflow-hidden shadow-xl transition-all cursor-pointer border border-white/5"
                        onClick={() => navigate(`/playlist/${playlist.id}`)}
                    >
                        <div className="absolute top-6 right-6 flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setConfirmDelete(playlist);
                                }}
                                className="p-2 bg-black/40 hover:bg-red-500/80 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                            >
                                <FaTrash size={14} />
                            </button>
                        </div>

                        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-black rounded-xl flex items-center justify-center text-[#1db954] mb-auto">
                            <FaList size={30} />
                        </div>

                        <div className="mt-4">
                            <h2 className="text-xl font-bold text-white mb-1 truncate">{playlist.name}</h2>
                            <p className="text-[#b3b3b3] text-xs font-bold uppercase tracking-wider">Playlist • {playlist.songs.length} songs</p>
                        </div>
                    </div>
                ))}

                {/* Create New Card */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 text-[#b3b3b3] hover:text-white hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaPlus size={24} />
                    </div>
                    <span className="font-bold">Create New Playlist</span>
                </div>
            </div>

            {/* Empty State for Playlists (Requirement from Image 2) */}
            {userPlaylists.length === 0 && (
                <div className="mt-8 flex flex-col items-center justify-center py-16 px-6 bg-[#181818] rounded-[2rem] border border-dashed border-white/10 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <FaMusic className="text-gray-500 text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">No playlists yet</h2>
                    <p className="text-[#b3b3b3] mb-8 max-w-xs">Create your first playlist and start organizing your favorite tunes.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-black px-8 py-3 rounded-full font-black text-sm hover:scale-105 transition-all shadow-xl active:scale-95"
                    >
                        Create First Playlist
                    </button>
                </div>
            )}

            <CreatePlaylistModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <ConfirmModal
                isOpen={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                onConfirm={() => {
                    removePlaylist(confirmDelete.id);
                    setConfirmDelete(null);
                }}
                title="Delete Playlist"
                message={`Are you sure you want to delete "${confirmDelete?.name}"?`}
            />
        </div>
    );
};

export default Library;
