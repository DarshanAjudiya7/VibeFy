import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Music App</h1>
      
      <button
        onClick={() => navigate("/player")}
        className="px-6 py-3 bg-white text-pink-500 font-semibold rounded-lg hover:bg-pink-100 transition"
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;
