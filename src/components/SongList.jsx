import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaPlus, FaHeart, FaRegHeart, FaPlusCircle } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import CreatePlaylistModal from "./CreatePlaylistModal";

const SongList = ({
  songs,
  onSelectSong = () => { },
  onAddToQueue = () => { },
  toggleLike = () => { },
  likedSongs = [],
}) => {
  const { userPlaylists, addSongToPlaylist, isPlaying, togglePlayPause, currentSong } = usePlayer();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSong, setModalSong] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateNewFromSong = (song) => {
    setModalSong(song);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  return (
    <div className="w-full text-[#b3b3b3] text-sm pb-10">
      {/* Table Header */}
      <div className="grid grid-cols-[16px_4fr_1fr_48px] sm:grid-cols-[16px_4fr_1fr_48px] gap-2 sm:gap-4 px-2 sm:px-4 py-2 border-b border-white/10 mb-4 font-medium uppercase tracking-wider text-[11px]">
        <div className="flex justify-center">#</div>
        <div>Title</div>
        <div className="hidden md:block">Artist</div>
        <div className="flex justify-center">
          <FaRegHeart />
        </div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {songs.map((song, index) => {
          const isCurrentActive = currentSong?.id === song.id;

          return (
            <div
              key={song.id}
              onClick={() => isCurrentActive ? togglePlayPause() : onSelectSong(song)}
              className="grid grid-cols-[16px_4fr_1fr_48px] sm:grid-cols-[16px_4fr_1fr_48px] gap-2 sm:gap-4 px-2 sm:px-4 py-2 items-center hover:bg-white/10 rounded-md transition-colors group cursor-pointer relative"
            >
              {/* Index / Play Button */}
              <div className="flex justify-center items-center relative h-10 w-4">
                <span className={`group-hover:hidden transition-opacity text-[10px] sm:text-sm ${isCurrentActive ? "text-[#1db954] font-bold" : ""}`}>
                  {index + 1}
                </span>
                <div className="hidden group-hover:block text-white text-[10px]">
                  {isCurrentActive && isPlaying ? <FaPause /> : <FaPlay />}
                </div>
              </div>

              {/* Title & Cover */}
              <div className="flex items-center gap-4 overflow-hidden">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-10 h-10 rounded shadow-lg object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.src = "/covers/default.jpg";
                  }}
                />
                <div className="flex flex-col overflow-hidden">
                  <span className={`font-medium truncate group-hover:underline ${isCurrentActive ? "text-[#1db954]" : "text-white"}`}>
                    {song.title}
                  </span>
                  <span className="md:hidden text-xs truncate">{song.artist}</span>
                </div>
              </div>

              {/* Artist (Desktop) */}
              <div className="hidden md:block truncate hover:text-white transition-colors">
                {song.artist}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-4 relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song.id);
                  }}
                  className={`transition-all ${likedSongs.includes(song.id) ? 'opacity-100 text-[#1db954]' : 'opacity-0 group-hover:opacity-100 text-[#b3b3b3] hover:text-white'}`}
                >
                  {likedSongs.includes(song.id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === song.id ? null : song.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-[#b3b3b3] hover:text-white transition-all transform hover:scale-110 p-1"
                  >
                    <FaPlus size={12} />
                  </button>

                  {activeMenu === song.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 bottom-full mb-2 w-48 bg-[#282828] rounded-md shadow-2xl z-50 border border-white/10 overflow-hidden"
                    >
                      <div className="p-2 border-b border-white/5">
                        <p className="text-[10px] font-bold uppercase text-gray-400 px-2 py-1">Add to playlist</p>
                      </div>
                      <div className="max-h-48 overflow-y-auto custom-scrollbar">
                        {userPlaylists.map(pl => (
                          <button
                            key={pl.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              addSongToPlaylist(pl.id, song);
                              setActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-white/10 text-xs text-white truncate transition-colors"
                          >
                            {pl.name}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreateNewFromSong(song);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-white/10 text-xs text-[#1db954] font-bold border-t border-white/5 flex items-center gap-2"
                      >
                        <FaPlusCircle size={10} />
                        Create New
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToQueue(song);
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-white/10 text-xs text-gray-300 border-t border-white/5"
                      >
                        Add to Queue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialSong={modalSong}
      />
    </div>
  );
};

export default SongList;
