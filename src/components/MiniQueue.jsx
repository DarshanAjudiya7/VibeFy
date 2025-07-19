import { FaTrash } from "react-icons/fa";

const MiniQueue = ({ queue, onRemoveFromQueue, onClearQueue }) => {
  return (
    <div className="bg-[#1f1f1f] p-4 rounded-xl text-white shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">🎧 Up Next</h2>
        <button
          onClick={onClearQueue}
          className="text-sm text-red-400 hover:underline focus:outline-none"
        >
          Clear
        </button>
      </div>

      {queue && queue.length === 0 ? (
        <p className="text-gray-400 text-sm">Queue is empty.</p>
      ) : (
        <ul className="space-y-3">
          {queue && queue.map((song) => (
            <li key={song.id} className="flex justify-between items-center group">
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-10 h-10 rounded shadow"
                />
                <div className="truncate">
                  <p className="text-sm font-medium truncate">{song.title}</p>
                  <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                </div>
              </div>

              <button
                onClick={() => onRemoveFromQueue(song.id)}
                title="Remove"
                className="text-red-400 hover:text-red-500 transition"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MiniQueue;
