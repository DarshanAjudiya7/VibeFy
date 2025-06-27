import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white relative overflow-hidden">
      
      {/* Floating music notes animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none animate-float z-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              fontSize: `${20 + Math.random() * 20}px`,
            }}
          >
            🎵
          </div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="z-10 text-center px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 drop-shadow-lg">
          Welcome to My Music App
        </h1>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/player")}
          className="px-8 py-3 bg-white text-pink-500 font-bold rounded-full hover:bg-pink-100 transition-all duration-300 shadow-lg"
        >
          🎧 Get Started
        </motion.button>
      </motion.div>

      {/* Float animation keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Home;
