// components/NowPlayingCard.jsx
import { motion, AnimatePresence } from "framer-motion";

const NowPlayingCard = ({ song }) => {
  if (!song) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={song.id}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="backdrop-blur-md bg-white/10 text-white rounded-2xl shadow-xl p-4 mb-6 w-full max-w-xs sm:max-w-sm mx-auto border border-pink-300/40"
      >
        {/* Cover image with animated glowing ring */}
        <div className="relative mb-4 animate-pulse">
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-40 sm:h-48 object-cover rounded-xl ring-4 ring-pink-400/70 shadow-md"
          />
        </div>

        <div className="text-xs uppercase text-pink-200 mb-1 tracking-widest">
          Now Playing
        </div>
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-full overflow-hidden">
            <div className="text-lg sm:text-xl font-bold truncate whitespace-nowrap">{song.title}</div>
            <div className="text-sm text-gray-200 truncate whitespace-nowrap">{song.artist}</div>
          </div>
          {song.mood && (
            <div className="mt-2 text-sm sm:text-base text-pink-100">
              Mood: <span className="font-semibold">{song.mood}</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NowPlayingCard;
