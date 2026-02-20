import { useState, useEffect } from "react";
import { FaTimes, FaMusic, FaCheck } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";

const CreatePlaylistModal = ({ isOpen, onClose, initialSong = null }) => {
    const [name, setName] = useState("");
    const { createPlaylist, addSongToPlaylist } = usePlayer();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setName("");
            setSuccess(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        const newPl = createPlaylist(name.trim());
        if (initialSong) {
            addSongToPlaylist(newPl.id, initialSong);
        }

        setSuccess(true);
        setTimeout(() => {
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-md bg-[#282828] rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <FaMusic className="text-[#1db954]" />
                        Create New Playlist
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl mx-auto flex items-center justify-center shadow-inner group">
                            <FaMusic className="text-gray-500 text-3xl group-hover:text-[#1db954] transition-colors" />
                        </div>
                        <p className="text-gray-400 text-sm">
                            Give your playlist a name that matches the vibe.
                        </p>
                    </div>

                    <div className="relative group">
                        <input
                            autoFocus
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Late Night Chill"
                            className="w-full bg-[#3e3e3e] border border-transparent focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/20 rounded-xl px-6 py-4 text-white placeholder-gray-500 transition-all outline-none text-lg font-medium"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!name.trim() || success}
                        className={`w-full py-4 rounded-full font-bold text-black transition-all transform flex items-center justify-center gap-2 ${success
                                ? "bg-green-500 cursor-default"
                                : "bg-[#1db954] hover:bg-[#1ed760] active:scale-95 hover:shadow-[0_0_20px_rgba(29,185,84,0.4)]"
                            } ${(!name.trim() && !success) ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {success ? (
                            <>
                                <FaCheck /> Created Successfully
                            </>
                        ) : (
                            "Create Playlist"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;
