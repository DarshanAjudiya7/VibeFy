// context/PlayerContext.js
import { createContext, useContext, useState, useEffect } from "react";
import songs from "../data/songs.json";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // On mount, initialize playlist and currentSong if not set
  useEffect(() => {
    if (!playlist.length) setPlaylist(songs);
    if (!currentSong && songs.length) setCurrentSong(songs[0]);
  }, [playlist, currentSong]);

  // Player logic
  const playSong = (song, newPlaylist = null, songIndex = 0) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (newPlaylist) {
      setPlaylist(newPlaylist);
      setCurrentIndex(songIndex);
    } else {
      const idx = playlist.findIndex((s) => s.id === song.id);
      setCurrentIndex(idx >= 0 ? idx : 0);
    }
  };

  const playNext = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(queue.slice(1));
      setCurrentSong(nextSong);
      setIsPlaying(true);
    } else if (playlist.length > 0 && currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentSong(playlist[nextIndex]);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (playlist.length > 0 && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(playlist[prevIndex]);
      setIsPlaying(true);
    }
  };

  const addToQueue = (song) => {
    setQueue((prev) => [...prev, song]);
  };

  const removeFromQueue = (songId) => {
    setQueue((prev) => prev.filter((song) => song.id !== songId));
  };

  const clearQueue = () => setQueue([]);

  const togglePlayPause = () => setIsPlaying((p) => !p);

  const handleSongEnd = () => playNext();

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        playlist,
        setPlaylist,
        queue,
        setQueue,
        currentIndex,
        setCurrentIndex,
        playSong,
        playNext,
        playPrevious,
        addToQueue,
        removeFromQueue,
        clearQueue,
        togglePlayPause,
        handleSongEnd,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
