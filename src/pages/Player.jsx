import React, { useState, useEffect, useRef } from "react";
import {
  FaHeart,
  FaPause,
  FaPlay,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedo
} from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import { AnimatePresence, motion } from "framer-motion";


const Player = ({
  likedSongs = [],
  toggleLike = () => {},
  isRepeating = false,
  setIsRepeating = () => {},
}) => {
  const [isShuffled, setIsShuffled] = useState(false);
  // Remove local isRepeating state

  const {
    currentSong,
    isPlaying,
    playlist,
    currentIndex,
    queue,
    playNext,
    playPrevious,
    togglePlayPause,
    handleSongEnd,
    addToQueue,
    progress = 0,
    duration = 0,
    setProgress = () => {},
  } = usePlayer();

  const handleSeek = (e) => setProgress(Number(e.target.value));

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePrevious = () => {
    if (progress > 3) {
      setProgress(0);
    } else {
      playPrevious();
    }
  };

  const handleNext = playNext;

  const isLiked = currentSong ? likedSongs.includes(currentSong.id) : false;
  const canGoPrevious = playlist.length > 0 && currentIndex > 0;
  const canGoNext = queue.length > 0 || (playlist.length > 0 && currentIndex < playlist.length - 1);

  if (!currentSong) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSong.id}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        className="w-full mb-15 max-w-xs mx-auto bg-gradient-to-br from-[#2d193c] via-[#3a2352] to-[#1a1027] p-3 rounded-2xl text-white shadow-xl border border-purple-900 flex flex-col items-center space-y-4"
      >
        {/* Song Info Row */}
        <div className="flex flex-row items-center w-full gap-3">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-30 h-16 object-cover rounded-xl shadow-md border-2 border-[#333]"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold truncate w-full drop-shadow-lg">{currentSong.title}</h3>
            <p className="text-xs text-gray-300 truncate w-full">{currentSong.artist}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">
                {currentIndex + 1} of {playlist.length + queue.length}
              </span>
              {queue.length > 0 && (
                <span className="text-xs text-green-400">
                  +{queue.length} in queue
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4 w-full">
          {/* Shuffle Button */}
          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={`transition-colors ${isShuffled ? 'text-green-300' : 'text-gray-400 hover:text-white'}`}
            title="Shuffle"
          >
            <FaRandom size={14} />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className={`transition-colors ${canGoPrevious ? 'text-white hover:text-green-400' : 'text-gray-600'}`}
            title="Previous"
          >
            <FaStepBackward size={18} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="bg-green-400 hover:bg-green-500 text-white p-2 rounded-full transition-colors shadow-lg border-2 border-green-500"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`transition-colors ${canGoNext ? 'text-white hover:text-green-400' : 'text-gray-600'}`}
            title="Next"
          >
            <FaStepForward size={18} />
          </button>

          {/* Repeat Button */}
          {/* <button
            onClick={() => setIsRepeating(!isRepeating)}
            className={`transition-colors ${isRepeating ? 'text-green-400 scale-110' : 'text-gray-400 hover:text-white'}`}
            title="Repeat"
          >
            <FaRedo size={14} />
          </button> */}
        </div>

        {/* Like and Queue Controls */}
        {/* <div className="flex items-center gap-4 w-full justify-center">
          <button 
            onClick={() => toggleLike(currentSong.id)}
            className="transition-colors hover:scale-110"
            title={isLiked ? "Remove from Liked" : "Add to Liked"}
          >
            <FaHeart
              size={18}
              className={isLiked ? "text-pink-400" : "text-gray-500 hover:text-pink-400"}
            />
          </button>
          <button 
            onClick={() => addToQueue(currentSong)}
            className="transition-colors hover:scale-110"
            title="Add to Queue"
          >
            <FaStepForward size={18} className="text-gray-400 hover:text-white" />
          </button>
        </div> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Player;
