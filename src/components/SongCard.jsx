import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPlus, FaPlusCircle, FaPause } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import CreatePlaylistModal from "./CreatePlaylistModal";

const SongCard = ({ song, onSelectSong }) => {
  const { userPlaylists, addSongToPlaylist, isPlaying, togglePlayPause, currentSong } = usePlayer();
  const [activeMenu, setActiveMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef(null);

  const isCurrentActive = currentSong?.id === song.id;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(false);
      }
    };
    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeMenu]);

  const handleAddClick = (e) => {
    e.stopPropagation();
    setActiveMenu(!activeMenu);
  };

  const handleCreateNew = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
    setActiveMenu(false);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (isCurrentActive) {
      togglePlayPause();
    } else {
      onSelectSong(song);
    }
  };

  return (
    <div
      onClick={() => isCurrentActive ? togglePlayPause() : onSelectSong(song)}
      className="p-4 bg-[#181818] hover:bg-[#282828] rounded-md transition-all cursor-pointer group flex flex-col gap-3 relative"
    >
      <div className="relative aspect-square shadow-2xl">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => (e.target.src = "/covers/default.jpg")}
        />

        {/* Play Button */}
        <button
          onClick={handlePlayClick}
          className={`absolute bottom-2 right-2 p-3 bg-[#1db954] rounded-full text-black shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-105 active:scale-95 z-10 ${isCurrentActive && isPlaying ? "opacity-100 translate-y-0" : ""}`}
        >
          {isCurrentActive && isPlaying ? <FaPause size={16} /> : <FaPlay size={16} className={isCurrentActive ? "" : "translate-x-0.5"} />}
        </button>


        {/* Add to Playlist Button */}
        <button
          onClick={handleAddClick}
          className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#1db954] hover:text-black z-20"
          title="Add to Playlist"
        >
          <FaPlus size={12} />
        </button>

        {activeMenu && (
          <div
            ref={menuRef}
            className="absolute top-12 right-2 w-48 bg-[#282828] rounded-md shadow-2xl z-50 border border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="p-2 border-b border-white/5">
              <p className="text-[10px] font-bold uppercase text-gray-400 px-2 py-1">Add to playlist</p>
            </div>
            <div className="max-h-40 overflow-y-auto custom-scrollbar">
              {userPlaylists.map(pl => (
                <button
                  key={pl.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    addSongToPlaylist(pl.id, song);
                    setActiveMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-white/10 text-xs text-white truncate transition-colors"
                >
                  {pl.name}
                </button>
              ))}
            </div>
            <button
              onClick={handleCreateNew}
              className="w-full text-left px-3 py-2 hover:bg-white/10 text-xs text-[#1db954] font-bold border-t border-white/5 flex items-center gap-2"
            >
              <FaPlusCircle size={10} />
              Create New
            </button>
          </div>
        )}
      </div>

      <div>
        <h4 className="font-bold truncate text-white">{song.title}</h4>
        <p className="text-xs text-[#b3b3b3] mt-1 line-clamp-1">{song.artist}</p>
      </div>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialSong={song}
      />
    </div>
  );
};

export default SongCard;
