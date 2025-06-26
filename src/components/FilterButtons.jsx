const FilterButtons = ({ showLikedOnly, setShowLikedOnly, likedCount }) => {
  return (
    <div className="mb-4 flex items-center gap-4">
      <button
        onClick={() => setShowLikedOnly(false)}
        className={`px-4 py-2 rounded ${
          !showLikedOnly ? "bg-pink-500 text-white  hover:bg-pink-800" : "bg-gray-700 text-gray-300"
        }`}
      >
        All Songs
      </button>

      <button
        onClick={() => setShowLikedOnly(true)}
        className={`px-4 py-2 rounded ${
          showLikedOnly ? "bg-pink-500 text-white  hover:bg-pink-800" : "bg-gray-700 text-gray-300"
        }`}
      >
        Liked Songs ({likedCount})
      </button>
    </div>
  );
};

export default FilterButtons;
