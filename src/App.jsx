import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { PlayerProvider } from "./context/PlayerContext";
import MainLayout from "./pages/MainLayout";
import Recent from "./pages/Recent";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Liked from "./pages/Liked";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import PlaylistView from "./pages/PlaylistView";
import Artists from "./pages/Artists";
import ArtistView from "./pages/ArtistView";
import Search from "./pages/Search";
import Premium from "./pages/Premium";
import Library from "./pages/Library";

function App() {
  return (
    <PlayerProvider>
      <div className="min-h-screen bg-black text-white">
        <SignedIn>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="recent" element={<Recent />} />
                <Route path="stats" element={<Stats />} />
                <Route path="settings" element={<Settings />} />
                <Route path="liked" element={<Liked />} />
                <Route path="library" element={<Library />} />
                <Route path="playlist/:id" element={<PlaylistView />} />
                <Route path="artists" element={<Artists />} />
                <Route path="artist/:name" element={<ArtistView />} />
                <Route path="search" element={<Search />} />
                <Route path="premium" element={<Premium />} />
              </Route>
            </Routes>
          </Router>
        </SignedIn>
        <SignedOut>
          <AuthPage />
        </SignedOut>
      </div>
    </PlayerProvider>
  );
}

export default App;
