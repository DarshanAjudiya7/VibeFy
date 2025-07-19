import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const musicNotes = ['🎵', '🎶', '🎼', '🎤', '🎧'];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/');
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#232526] via-[#28292a] to-[#191b1d]">
      {/* Animated floating music notes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${24 + Math.random() * 32}px`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {musicNotes[Math.floor(Math.random() * musicNotes.length)]}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[#232946] flex flex-col items-center"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
      >
        {/* Music icon */}
        <div className="mb-2 text-5xl animate-bounce drop-shadow-lg">🎵</div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center font-mono tracking-tight">Login</h2>
        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        <div className="mb-4 w-full">
          <label className="block text-gray-300 mb-2 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-[#232946] text-white focus:outline-none focus:ring-2 focus:ring-[#1db954] font-mono"
            required
          />
        </div>
        <div className="mb-6 w-full">
          <label className="block text-gray-300 mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-[#232946] text-white focus:outline-none focus:ring-2 focus:ring-[#1db954] font-mono"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#1db954] text-white font-semibold rounded hover:bg-[#17a74a] transition shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] animate-pulse-on-hover"
        >
          Login
        </button>
      </form>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .animate-pulse-on-hover:hover {
          animation: pulse 0.7s;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 #1db95455; }
          70% { box-shadow: 0 0 0 10px #1db95400; }
          100% { box-shadow: 0 0 0 0 #1db95400; }
        }
      `}</style>
    </div>
  );
};

export default Login; 