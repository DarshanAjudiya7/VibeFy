const SongCard = ({ song, onPlay }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg p-4 hover:bg-pink-600 transition">
      <img src={song.cover} alt={song.title} className="rounded mb-2" />
      <h3 className="text-lg font-semibold">{song.title}</h3>
      <p className="text-sm text-gray-300">{song.artist}</p>
      <button
        onClick={() => onPlay(song)}
        className="mt-2 bg-white text-pink-500 px-4 py-1 rounded font-semibold"
      >
        Play
      </button>
    </div>
  );
};

export default SongCard;
