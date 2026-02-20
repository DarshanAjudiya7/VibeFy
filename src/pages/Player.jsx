import React, { useState, useRef, useEffect } from "react";
import {
  FaHeart,
  FaPause,
  FaPlay,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaSyncAlt,
  FaVolumeUp,
  FaListUl,
  FaRegHeart
} from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";

const Player = ({
  likedSongs = [],
  toggleLike = () => { },
  isRepeating = false,
  setIsRepeating = () => { },
}) => {
  const [isShuffled, setIsShuffled] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const {
    currentSong,
    isPlaying,
    playNext,
    playPrevious,
    togglePlayPause,
  } = usePlayer();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log("Playback error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    setProgress(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!currentSong) return null;

  const isLiked = likedSongs.includes(currentSong.id);

  return (
    <div className="flex items-center justify-between h-full bg-black px-4 text-white border-t border-white/5">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => {
          if (isRepeating) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            playNext();
          }
        }}
      />

      {/* 1. Left Section: Song Info */}
      <div className="flex items-center gap-4 w-[30%] min-w-0">
        <div className="relative group flex-shrink-0">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-14 h-14 rounded object-cover shadow-lg"
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <h4 className="text-sm font-semibold truncate hover:underline cursor-pointer">
            {currentSong.title}
          </h4>
          <p className="text-xs text-[#b3b3b3] truncate hover:underline cursor-pointer">
            {currentSong.artist}
          </p>
        </div>
        <button
          onClick={() => toggleLike(currentSong.id)}
          className={`ml-2 transition-transform hover:scale-110 ${isLiked ? 'text-[#1db954]' : 'text-[#b3b3b3]'}`}
        >
          {isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
        </button>
      </div>

      {/* 2. Center Section: Playback Controls & Progress Bar */}
      <div className="flex flex-col items-center max-w-[45%] w-full gap-2">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={`transition-colors ${isShuffled ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
          >
            <FaRandom size={16} />
          </button>
          <button
            onClick={playPrevious}
            className="text-[#b3b3b3] hover:text-white transition-colors"
          >
            <FaStepBackward size={20} />
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform"
          >
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} className="translate-x-0.5" />}
          </button>
          <button
            onClick={playNext}
            className="text-[#b3b3b3] hover:text-white transition-colors"
          >
            <FaStepForward size={20} />
          </button>
          <button
            onClick={() => setIsRepeating(!isRepeating)}
            className={`transition-colors ${isRepeating ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
          >
            <FaSyncAlt size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full text-xs text-[#b3b3b3] font-medium">
          <span className="w-10 text-right">{formatTime(progress)}</span>
          <div className="group relative flex-1 flex items-center h-4 cursor-pointer">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              className="absolute w-full h-1 bg-[#4d4d4d] rounded-full appearance-none cursor-pointer outline-none overflow-hidden accent-white group-hover:accent-[#1db954]"
            />
          </div>
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Right Section: Extra Controls */}
      <div className="flex items-center justify-end gap-3 w-[30%]">
        <button className="text-[#b3b3b3] hover:text-white transition-colors">
          <FaListUl size={16} />
        </button>
        <div className="flex items-center gap-2 group w-32">
          <FaVolumeUp size={16} className="text-[#b3b3b3] group-hover:text-white" />
          <div className="flex-1 h-1 bg-[#4d4d4d] rounded-full group-hover:bg-[#1db954]/50 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer accent-white opacity-0 group-hover:opacity-100 z-10"
            />
            <div
              className="h-full bg-white group-hover:bg-[#1db954] rounded-full"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;

