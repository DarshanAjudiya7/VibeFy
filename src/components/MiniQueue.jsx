import React from "react";

const MiniQueue = ({ queue, onClearQueue, onRemoveFromQueue }) => {
  if (queue.length === 0) return null;

  return (
    <div className="mb-6 bg-gray bg-opacity-40 p-4 rounded">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">🎧 Queue</h2>
        <button
          onClick={onClearQueue}
          className="text-sm px-2 py-1 bg-red-600 rounded hover:bg-red-700"
        >
          Clear
        </button>
      </div>

      <ul className="space-y-2 text-sm">
        {queue.map((song, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>
              {index + 1}. {song.title} — {song.artist}
            </span>
            <button
              onClick={() => onRemoveFromQueue(song)}
              className="ml-2 text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniQueue;
