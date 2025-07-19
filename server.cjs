const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve static files (songs and covers)
app.use('/songs', express.static(path.join(__dirname, 'public/songs')));
app.use('/covers', express.static(path.join(__dirname, 'public/covers')));

// Data files
const SONGS_PATH = path.join(__dirname, 'src/data/songs.json');
const USER_PATH = path.join(__dirname, 'user.json');
const PLAYLISTS_PATH = path.join(__dirname, 'playlists.json');
const LIKES_PATH = path.join(__dirname, 'likes.json');

// Helper to read JSON
function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// --- API Endpoints ---

// Get all songs
app.get('/api/songs', (req, res) => {
  const songs = readJSON(SONGS_PATH);
  res.json(songs);
});

// Get all playlists
app.get('/api/playlists', (req, res) => {
  if (!fs.existsSync(PLAYLISTS_PATH)) writeJSON(PLAYLISTS_PATH, []);
  const playlists = readJSON(PLAYLISTS_PATH);
  res.json(playlists);
});

// Get user info
app.get('/api/user', (req, res) => {
  if (!fs.existsSync(USER_PATH)) writeJSON(USER_PATH, { name: 'Michael Snail', avatar: '/covers/Bairiyaa.jpg', likes: [] });
  const user = readJSON(USER_PATH);
  res.json(user);
});

// Like/unlike a song
app.post('/api/like/:songId', (req, res) => {
  const songId = parseInt(req.params.songId);
  let user = readJSON(USER_PATH);
  if (!user.likes) user.likes = [];
  if (user.likes.includes(songId)) {
    user.likes = user.likes.filter(id => id !== songId);
  } else {
    user.likes.push(songId);
  }
  writeJSON(USER_PATH, user);
  res.json({ likes: user.likes });
});

// Add song to playlist
app.post('/api/playlist/:playlistId/add/:songId', (req, res) => {
  const playlistId = req.params.playlistId;
  const songId = parseInt(req.params.songId);
  let playlists = readJSON(PLAYLISTS_PATH);
  const playlist = playlists.find(p => p.id === playlistId);
  if (playlist && !playlist.songs.includes(songId)) {
    playlist.songs.push(songId);
    writeJSON(PLAYLISTS_PATH, playlists);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Playlist not found or song already in playlist' });
  }
});

// Create playlist
app.post('/api/playlist', (req, res) => {
  let playlists = readJSON(PLAYLISTS_PATH);
  const { name } = req.body;
  const newPlaylist = { id: Date.now().toString(), name, songs: [] };
  playlists.push(newPlaylist);
  writeJSON(PLAYLISTS_PATH, playlists);
  res.json(newPlaylist);
});

// Remove song from playlist
app.post('/api/playlist/:playlistId/remove/:songId', (req, res) => {
  const playlistId = req.params.playlistId;
  const songId = parseInt(req.params.songId);
  let playlists = readJSON(PLAYLISTS_PATH);
  const playlist = playlists.find(p => p.id === playlistId);
  if (playlist && playlist.songs.includes(songId)) {
    playlist.songs = playlist.songs.filter(id => id !== songId);
    writeJSON(PLAYLISTS_PATH, playlists);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Playlist not found or song not in playlist' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 