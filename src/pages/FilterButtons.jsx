// components/FilterButtons.jsx
const FilterButtons = ({ filter, setFilter, likedCount }) => (
  <div className="flex flex-wrap gap-4 mb-4">
    <button
      onClick={() => setFilter("all")}
      className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500" : "bg-gray-600"}`}
    >
      🎶 All Songs
    </button>
    <button
      onClick={() => setFilter("liked")}
      className={`px-4 py-2 rounded ${filter === "liked" ? "bg-red-500" : "bg-gray-600"}`}
    >
      ❤️ Liked ({likedCount})
    </button>
    <button
      onClick={() => setFilter("recent")}
      className={`px-4 py-2 rounded ${filter === "recent" ? "bg-yellow-500" : "bg-gray-600"}`}
    >
      ⏱ Recently Played
    </button>
  </div>
);

export default FilterButtons;
