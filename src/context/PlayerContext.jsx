// context/PlayerContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import songs from "../data/songs.json";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const { user } = useUser();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);

  // Load user-specific data on login
  useEffect(() => {
    if (user) {
      const storedPlaylists = localStorage.getItem(`vibefy_playlists_${user.id}`);
      if (storedPlaylists) setUserPlaylists(JSON.parse(storedPlaylists));
      else setUserPlaylists([]);

      const storedArtists = localStorage.getItem(`vibefy_followed_artists_${user.id}`);
      if (storedArtists) setFollowedArtists(JSON.parse(storedArtists));
      else setFollowedArtists([]);
    } else {
      setUserPlaylists([]);
      setFollowedArtists([]);
    }
  }, [user]);

  // Sync data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`vibefy_playlists_${user.id}`, JSON.stringify(userPlaylists));
      localStorage.setItem(`vibefy_followed_artists_${user.id}`, JSON.stringify(followedArtists));
    }
  }, [userPlaylists, followedArtists, user]);

  // On mount, initialize playlist if not set
  useEffect(() => {
    if (!playlist.length) setPlaylist(songs);
    if (!currentSong && songs.length) setCurrentSong(songs[0]);
  }, [playlist, currentSong]);

  // Playlist Management
  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name: name || `My Playlist #${userPlaylists.length + 1}`,
      songs: [],
      createdAt: new Date().toISOString()
    };
    setUserPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  };

  const removePlaylist = (id) => {
    setUserPlaylists(prev => prev.filter(p => p.id !== id));
  };

  const addSongToPlaylist = (playlistId, song) => {
    setUserPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        if (p.songs.some(s => s.id === song.id)) return p;
        return { ...p, songs: [...p.songs, song] };
      }
      return p;
    }));
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setUserPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        return { ...p, songs: p.songs.filter(s => s.id !== songId) };
      }
      return p;
    }));
  };

  const toggleFollowArtist = (artistName) => {
    setFollowedArtists(prev =>
      prev.includes(artistName)
        ? prev.filter(a => a !== artistName)
        : [...prev, artistName]
    );
  };

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
        userPlaylists,
        followedArtists,
        toggleFollowArtist,
        createPlaylist,
        removePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
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
