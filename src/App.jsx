// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Recent from "./pages/Recent";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Liked from "./pages/Liked";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<MainLayout />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/liked" element={<Liked />} />
      </Routes>
    </Router>
  );
}

export default App;
