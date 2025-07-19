import { useState } from 'react';
import { FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';

const SongCard = ({ song, onPlay, liked, onLikeToggle }) => {
  const [likeAnim, setLikeAnim] = useState(false);

  const handleLike = () => {
    setLikeAnim(true);
    onLikeToggle && onLikeToggle(song.id);
    setTimeout(() => setLikeAnim(false), 400);
  };

  return (
    <div
      className="bg-green-800 text-white rounded-xl p-4 hover:bg-pink-600 transition cursor-pointer flex flex-col items-center shadow-md w-full max-w-xs min-w-[160px] mb-4"
    >
      {/* Image and Action Buttons */}
      <div className="relative w-full flex justify-center">
        <img
          src={song.cover}
          alt={song.title}
          className="rounded-lg mb-3 w-28 h-28 md:w-32 md:h-32 object-cover shadow-lg"
        />

        {/* Play Button */}
        <button
          onClick={() => onPlay(song)}
          className="absolute bottom-2 right-2 bg-white text-pink-500 p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition"
          aria-label="Play"
        >
          <FaPlay />
        </button>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`absolute top-2 right-2 bg-black/60 p-2 rounded-full shadow-md hover:bg-pink-500 transition ${likeAnim ? 'animate-like-pop' : ''}`}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          {liked ? <FaHeart className="text-pink-400" /> : <FaRegHeart className="text-white" />}
        </button>
      </div>

      {/* Title and Artist */}
      <h3 className="text-base md:text-lg font-semibold text-center mt-2 w-full overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal hover:overflow-visible transition-all duration-200">
        {song.title}
      </h3>
      <p className="text-xs md:text-sm text-gray-300 text-center line-clamp-1">
        {song.artist}
      </p>

      {/* Like animation CSS */}
      <style>{`
        .animate-like-pop {
          animation: likePop 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes likePop {
          0% { transform: scale(1); }
          30% { transform: scale(1.4); }
          60% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SongCard;
