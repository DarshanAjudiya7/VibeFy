import React, { useState, useRef, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaRedo } from "react-icons/fa";

const PersistentPlayer = () => {
  const {
    currentSong,
    isPlaying,
    playlist,
    currentIndex,
    queue,
    playNext,
    playPrevious,
    togglePlayPause
  } = usePlayer();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isRepeating, setIsRepeating] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const value = e.target.value;
    setProgress(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl border-t border-white/10 z-50 p-4 text-center text-gray-400 shadow-2xl">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
            <FaPlay className="text-gray-400 text-sm" />
          </div>
          <span className="text-sm font-medium">No song playing</span>
        </div>
      </div>
    );
  }

  const canGoPrevious = playlist.length > 0 && currentIndex > 0;
  const canGoNext = queue.length > 0 || (playlist.length > 0 && currentIndex < playlist.length - 1);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl border-t border-white/10 z-50 p-2 shadow-2xl">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        volume={volume}
        loop={!!isRepeating}
        onEnded={() => { if (!isRepeating) playNext(); }}
      />
      
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Enhanced Song Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="relative">
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-14 h-14 object-cover rounded-2xl shadow-lg border border-white/10"
            />
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate">
              {currentSong.title}
            </h4>
            <p className="text-xs text-gray-400 truncate">
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={playPrevious}
            disabled={!canGoPrevious}
            className={`p-3 rounded-full transition-all duration-300 ${
              canGoPrevious 
                ? 'text-white hover:text-green-400 hover:bg-white/10' 
                : 'text-gray-600'
            }`}
            title="Previous"
          >
            <FaStepBackward size={18} />
          </button>

          <button
            onClick={togglePlayPause}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-4 rounded-full transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-110"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="ml-1" />}
          </button>

          <button
            onClick={playNext}
            disabled={!canGoNext}
            className={`p-3 rounded-full transition-all duration-300 ${
              canGoNext 
                ? 'text-white hover:text-green-400 hover:bg-white/10' 
                : 'text-gray-600'
            }`}
            title="Next"
          >
            <FaStepForward size={18} />
          </button>
        </div>

        {/* Enhanced Progress and Volume */}
        <div className="flex items-center gap-4 w-80 max-w-xs">
          <div className="flex items-center gap-2">
            <FaVolumeUp className="text-gray-300 text-sm" />
            <input
              type="range"
              min={0}
              max={1}
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          <div className="flex items-center gap-2 flex-1">
            <input
              type="range"
              min={0}
              max={duration || 1}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-300 w-20 text-right font-mono">
              {formatTime(progress)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Queue indicator */}
        {queue.length > 0 && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 text-xs text-green-400 px-3 py-1 rounded-full font-medium">
            +{queue.length}
          </div>
        )}
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: linear-gradient(to right, #10b981, #059669);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: linear-gradient(to right, #10b981, #059669);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default PersistentPlayer; 