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
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user-specific data on login
  useEffect(() => {
    if (user) {
      const storedPlaylists = localStorage.getItem(`vibefy_playlists_${user.id}`);
      const storedArtists = localStorage.getItem(`vibefy_followed_artists_${user.id}`);
      const storedRecent = localStorage.getItem(`vibefy_recent_${user.id}`);
      const storedLiked = localStorage.getItem(`vibefy_liked_${user.id}`);

      setUserPlaylists(storedPlaylists ? JSON.parse(storedPlaylists) : []);
      setFollowedArtists(storedArtists ? JSON.parse(storedArtists) : []);
      setRecentlyPlayed(storedRecent ? JSON.parse(storedRecent) : []);
      setLikedSongs(storedLiked ? JSON.parse(storedLiked) : []);
      setIsLoaded(true);
    } else {
      setUserPlaylists([]);
      setFollowedArtists([]);
      setRecentlyPlayed([]);
      setLikedSongs([]);
      setIsLoaded(false);
    }
  }, [user]);

  // Sync data to localStorage ONLY after initial load is complete
  useEffect(() => {
    if (user && isLoaded) {
      localStorage.setItem(`vibefy_playlists_${user.id}`, JSON.stringify(userPlaylists));
      localStorage.setItem(`vibefy_followed_artists_${user.id}`, JSON.stringify(followedArtists));
      localStorage.setItem(`vibefy_recent_${user.id}`, JSON.stringify(recentlyPlayed));
      localStorage.setItem(`vibefy_liked_${user.id}`, JSON.stringify(likedSongs));
    }
  }, [userPlaylists, followedArtists, recentlyPlayed, likedSongs, user, isLoaded]);

  const toggleLike = (songId) => {
    setLikedSongs(prev =>
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

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

  const clearRecent = () => setRecentlyPlayed([]);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // ... (rest of the states)

  // Player logic
  const playSong = (song, newPlaylist = null, songIndex = 0) => {
    setCurrentSong(song);
    setIsPlaying(true);

    // Update recently played
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 50); // Keep last 50
    });

    if (newPlaylist) {
      setPlaylist(newPlaylist);
      setCurrentIndex(songIndex);
    } else {
      const idx = playlist.findIndex((s) => s.id === song.id);
      setCurrentIndex(idx >= 0 ? idx : 0);
    }
  };

  const playNext = () => {
    if (isRepeat && currentSong) {
      // If repeat is on, just play the same song again by resetting it
      // This logic will be triggered by handleSongEnd primarily
      playSong(currentSong);
      return;
    }

    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(queue.slice(1));
      playSong(nextSong);
      return;
    }

    if (playlist.length > 0) {
      let nextIndex;
      if (isShuffle) {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } else {
        nextIndex = (currentIndex + 1) % playlist.length;
      }
      playSong(playlist[nextIndex], playlist, nextIndex);
    }
  };

  const playPrevious = () => {
    if (playlist.length > 0) {
      let prevIndex;
      if (isShuffle) {
        prevIndex = Math.floor(Math.random() * playlist.length);
      } else {
        prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      }
      playSong(playlist[prevIndex], playlist, prevIndex);
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
        recentlyPlayed,
        likedSongs,
        toggleLike,
        toggleFollowArtist,
        clearRecent,
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
