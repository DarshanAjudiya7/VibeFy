import React, { useRef, useEffect, useState } from "react";

const AudioPlayer = ({ currentSong }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-20 flex flex-col sm:flex-row items-center justify-between shadow-lg">
      <audio
        ref={audioRef}
        src={currentSong?.url}
        onTimeUpdate={handleTimeUpdate}
      />
      <div>
        <strong>{currentSong?.title}</strong> - {currentSong?.artist}
      </div>
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-pink-500 px-3 py-1 rounded"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-32"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
