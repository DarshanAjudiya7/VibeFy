// App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import MainLayout from "./pages/MainLayout";
import Recent from "./pages/Recent";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Liked from "./pages/Liked";
import Home from "./pages/Home";
import PersistentPlayer from "./components/PersistentPlayer";

function App() {
  // Custom wrapper to access location
  function PersistentPlayerWrapper() {
    const location = useLocation();
    // Hide on home page
    if (location.pathname === "/") return null;
    return <PersistentPlayer />;
  }

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-black dark:bg-black text-white dark:text-white">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/player" element={<MainLayout />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/liked" element={<Liked />} />
          </Routes>
          <PersistentPlayerWrapper />
        </Router>
      </div>
    </PlayerProvider>
  );
}

export default App;
