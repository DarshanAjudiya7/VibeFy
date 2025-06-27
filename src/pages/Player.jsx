import React, { useState, useEffect, useRef } from "react";
import {
  FaHeart,
  FaPause,
  FaPlay,
  FaVolumeUp
} from "react-icons/fa";

const Player = ({
  currentSong,
  isPlaying,
  onPlayPauseClick,
  likedSongs = [],
  toggleLike = () => {},
  onAddToQueue = () => {},
  onSongEnd = () => {} // ✅ autoplay next
}) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying
        ? audioRef.current.play().catch(console.error)
        : audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  const handleSeek = (e) => {
    const value = e.target.value;
    setProgress(value);
    audioRef.current.currentTime = value;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const isLiked = likedSongs.includes(currentSong?.id);

  if (!currentSong) return null;

  return (
    <div className="w-full bg-[#1e1e1e] p-4 rounded-xl text-white space-y-4">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={onSongEnd} // ✅ correct callback for autoplay
      />

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold">{currentSong.title}</h3>
          <p className="text-sm text-gray-300">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button onClick={onPlayPauseClick}>
          {isPlaying ? <FaPause size={32} /> : <FaPlay size={32} />}
        </button>

        <button onClick={() => toggleLike(currentSong.id)}>
          <FaHeart
            size={20}
            className={isLiked ? "text-pink-400 ml-4" : "text-gray-500 ml-4"}
          />
        </button>

        <button onClick={() => onAddToQueue(currentSong)}>
          <FaVolumeUp size={20} title="Add to Queue" />
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span>{formatTime(progress)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
          className="w-full accent-pink-400"
        />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default Player;
