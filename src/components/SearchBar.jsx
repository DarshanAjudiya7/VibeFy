import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ search, setSearch, small = false }) => {
  return (
    <div className="relative group ">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search songs..."
          className={`w-full ${
            small ? 'px-10 py-3 text-sm' : 'px-6 py-4 text-base'
          } rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/15`}
          style={{ opacity: 0.7 }}
        />
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300">
          <FaSearch className={`${small ? 'text-sm' : 'text-base'}`} />
        </div>
        
        {/* Clear Button */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 p-1 rounded-full hover:bg-white/10"
          >
            <FaTimes className={`${small ? 'text-xs' : 'text-sm'}`} />
          </button>
        )}
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default SearchBar;