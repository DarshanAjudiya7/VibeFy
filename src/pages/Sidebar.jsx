import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaPlus,
  FaHeart,
  FaList,
  FaArrowRight,
  FaGlobe,
  FaTrash,
  FaMicrophone,
  FaUserCircle
} from "react-icons/fa";
import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import ConfirmModal from "../components/ConfirmModal";
import songsData from "../data/songs.json";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { userPlaylists, removePlaylist, followedArtists } = usePlayer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const primaryNav = [
    { path: "/", icon: FaHome, label: "Home" },
    { path: "/search", icon: FaSearch, label: "Search" },
    { path: "/artists", icon: FaMicrophone, label: "Artists" },
  ];


  const libraryNav = [
    { path: "/liked", icon: FaHeart, label: "Liked Songs", color: "text-purple-400" },
    { path: "/recent", icon: FaList, label: "Recently Played", color: "text-blue-400" },
    { path: "/stats", icon: FaGlobe, label: "Your Stats", color: "text-green-400" },
  ];

  return (
    <>
      <div className="flex flex-col h-full bg-black p-2 gap-2 text-white w-full max-w-[300px]">
        {/* Primary Navigation */}
        <div className="bg-[#121212] rounded-lg p-4 space-y-4">
          {primaryNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-2 py-1 font-bold transition-all hover:text-white ${pathname === item.path ? "text-white" : "text-[#b3b3b3]"
                }`}
            >
              <item.icon size={24} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Library Section */}
        <div className="flex-1 bg-[#121212] rounded-lg p-2 flex flex-col min-h-0">
          <div className="flex items-center justify-between px-4 py-2 text-[#b3b3b3]">
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group" onClick={() => setIsModalOpen(true)}>
              <FaList size={22} className="group-hover:rotate-[-5deg] transition-transform" />
              <span className="font-bold">Your Library</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPlus
                className="hover:text-white transition-colors cursor-pointer"
                size={16}
                onClick={() => setIsModalOpen(true)}
                title="Create Playlist"
              />
              <FaArrowRight className="hover:text-white transition-colors cursor-pointer" size={16} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-2 space-y-1">
            {/* Static Library Items */}
            {libraryNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] transition-all group ${pathname === item.path ? "bg-[#232323]" : ""
                  }`}
              >
                <div className={`p-3 rounded-md bg-[#242424] ${item.color} group-hover:scale-105 transition-transform`}>
                  <item.icon size={18} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium truncate">{item.label}</p>
                  <p className="text-xs text-[#b3b3b3] truncate">Playlist • VibeFy</p>
                </div>
              </Link>
            ))}

            {/* Separator if needed */}
            {(userPlaylists.length > 0 || followedArtists.length > 0) && <div className="h-[1px] bg-white/5 my-2 mx-4" />}

            {/* Followed Artists Section */}
            {followedArtists.length > 0 && (
              <div className="space-y-1">
                <p className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-gray-500">Following</p>
                {followedArtists.map((artistName) => {
                  const artistSong = songsData.find(s => s.artist === artistName);
                  return (
                    <Link
                      key={artistName}
                      to={`/artist/${encodeURIComponent(artistName)}`}
                      className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] transition-all group ${pathname === `/artist/${encodeURIComponent(artistName)}` ? "bg-[#232323]" : ""}`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0 group-hover:scale-105 transition-transform border border-white/5">
                        {artistSong?.cover ? (
                          <img src={artistSong.cover} className="w-full h-full object-cover" alt={artistName} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FaUserCircle size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-bold truncate text-sm text-white">{artistName}</p>
                        <p className="text-xs text-[#b3b3b3] truncate underline-offset-2">Artist</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* User Created Playlists */}
            {userPlaylists.length > 0 && (
              <div className="space-y-1 mt-2">
                <p className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-gray-500">Playlists</p>
                {userPlaylists.map((pl) => (
                  <div
                    key={pl.id}
                    className={`group flex items-center justify-between p-2 rounded-md hover:bg-[#1a1a1a] transition-all cursor-pointer ${pathname === `/playlist/${pl.id}` ? "bg-[#232323]" : ""}`}
                  >
                    <Link to={`/playlist/${pl.id}`} className="flex items-center gap-3 flex-1 overflow-hidden" onClick={() => { if (window.innerWidth < 768) { } }}>
                      <div className="w-12 h-12 rounded-md bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[#1db954] group-hover:scale-105 transition-transform">
                        <FaList size={18} />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-medium truncate text-sm text-white">{pl.name}</p>
                        <p className="text-xs text-[#b3b3b3] truncate">{pl.songs.length} songs</p>
                      </div>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setConfirmDelete(pl);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-500 transition-all"
                      title="Delete Playlist"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}


            {userPlaylists.length === 0 && (
              <div className="px-4 py-8 text-center bg-white/5 rounded-xl border border-dashed border-white/10 mt-4">
                <p className="text-sm text-gray-400 mb-3">No playlists yet</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all"
                >
                  Create First Playlist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmModal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => removePlaylist(confirmDelete.id)}
        title="Delete Playlist"
        message={`This will delete "${confirmDelete?.name}" from your library. This action cannot be undone.`}
        confirmText="Delete"
      />
    </>
  );
};

export default Sidebar;

