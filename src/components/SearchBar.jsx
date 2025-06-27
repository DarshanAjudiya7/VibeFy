const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search songs..."
      className="w-full p-2 rounded-md bg-[#2c2c2c] text-white placeholder-gray-400 focus:outline-none"
    />
  );
};

export default SearchBar;