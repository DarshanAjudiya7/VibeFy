const SearchBar = ({ searchTerm, setSearchTerm, artistFilter, setArtistFilter, artists }) => {
  return (
    <div className="mb-4 flex flex-col sm:flex-row items-center gap-4">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search songs or artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded text-white flex-grow bg-gray-700  hover:bg-black"
      />

      {/* Artist filter dropdown */}
      <select
        value={artistFilter}
        onChange={(e) => setArtistFilter(e.target.value)}
        className="p-2 rounded text-white bg-gray-700  hover:bg-black"
      >
        {artists.map((artist) => (
          <option key={artist} value={artist}>
            {artist}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
