import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { FaSearch, FaMicrophone, FaCompass, FaHistory, FaTimes } from "react-icons/fa";
import songsData from "../data/songs.json";
import SongList from "../components/SongList";
import { usePlayer } from "../context/PlayerContext";

const categories = [
    { title: "Romantic", color: "bg-[#8d67ab]", img: "romantic" },
    { title: "Party", color: "bg-[#e21131]", img: "party" },
    { title: "Intense", color: "bg-[#477d95]", img: "intense" },
    { title: "Sad", color: "bg-[#1e3264]", img: "sad" },
    { title: "90's Hits", color: "bg-[#ba5d07]", img: "retro" },
    { title: "New Releases", color: "bg-[#056952]", img: "new" },
    { title: "Bollywood", color: "bg-[#e8115b]", img: "bollywood" },
    { title: "Pop", color: "bg-[#148a08]", img: "pop" },
];

const Search = () => {
    const { search: globalSearch } = useOutletContext();
    const { playSong, addToQueue } = usePlayer();
    const [localSearch, setLocalSearch] = useState("");
    const [results, setResults] = useState([]);
    const { likedSongs, toggleLike } = useOutletContext();
    const [recentSearches, setRecentSearches] = useState(['Arijit Singh', 'Party Mix', 'New Bollywood']);

    // Combine global search from header and local search from this page
    const activeSearch = localSearch || globalSearch;

    useEffect(() => {
        if (activeSearch.trim() === "") {
            setResults([]);
            return;
        }

        const filtered = songsData.filter(song =>
            song.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
            song.artist.toLowerCase().includes(activeSearch.toLowerCase()) ||
            song.mood.toLowerCase().includes(activeSearch.toLowerCase())
        );
        setResults(filtered);
    }, [activeSearch]);

    const handleClearAll = () => {
        setRecentSearches([]);
    };

    const handleRemoveRecent = (e, term) => {
        e.stopPropagation();
        setRecentSearches(recentSearches.filter(t => t !== term));
    };

    return (
        <div className="flex flex-col min-h-full px-8 pt-6 pb-20">
            {/* Premium Search Header */}
            <div className="relative max-w-2xl mb-10 group">
                <div className="absolute inset-0 bg-[#1db954]/5 blur-2xl group-hover:bg-[#1db954]/10 transition-all rounded-full" />
                <div className="relative flex items-center">
                    <FaSearch className="absolute left-5 text-gray-400 group-focus-within:text-white transition-colors" size={20} />
                    <input
                        type="text"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        placeholder="What do you want to listen to?"
                        className="w-full bg-[#242424] border-none rounded-full py-4 pl-14 pr-6 text-base font-medium text-white placeholder:text-gray-500 focus:ring-2 focus:ring-white/20 outline-none transition-all shadow-2xl"
                    />
                    <button className="absolute right-5 text-gray-400 hover:text-white transition-colors">
                        <FaMicrophone size={18} />
                    </button>
                </div>
            </div>

            {activeSearch ? (
                /* Search Results View */
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Search results for "{activeSearch}"</h2>
                        <span className="text-sm text-gray-400 font-medium">{results.length} results found</span>
                    </div>

                    {results.length > 0 ? (
                        <SongList
                            songs={results}
                            onSelectSong={(song) => playSong(song, results, results.indexOf(song))}
                            onAddToQueue={addToQueue}
                            toggleLike={toggleLike}
                            likedSongs={likedSongs}
                        />
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <FaSearch className="text-gray-600 text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No results found for "{activeSearch}"</h3>
                            <p className="text-gray-400">Please check your spelling or try searching for something else.</p>
                        </div>
                    )}
                </div>
            ) : (
                /* Explore / Browse View */
                <div className="animate-in fade-in duration-700">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-[#1db954]/20 rounded-lg flex items-center justify-center">
                            <FaCompass className="text-[#1db954] text-xl animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold">Browse all</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {categories.map((cat, idx) => (
                            <div
                                key={idx}
                                onClick={() => setLocalSearch(cat.title)}
                                className={`${cat.color} aspect-square rounded-xl p-4 overflow-hidden relative cursor-pointer group hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-2xl`}
                            >
                                <span className="text-xl md:text-2xl font-black leading-tight text-white drop-shadow-lg">
                                    {cat.title.split(' ').map((word, i) => (
                                        <React.Fragment key={i}>
                                            {word}<br />
                                        </React.Fragment>
                                    ))}
                                </span>

                                {/* Visual Decoration (Simulating Spotify's tilted images) */}
                                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-black/20 rounded-lg rotate-[25deg] group-hover:rotate-[15deg] transition-transform duration-500 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                    <div className="w-16 h-16 bg-white/10 rounded-md flex items-center justify-center rotate-[-25deg] group-hover:rotate-[-15deg] transition-transform">
                                        <FaCompass className="text-white/20 text-3xl" />
                                    </div>
                                </div>

                                {/* Micro-glow on hover */}
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                            </div>
                        ))}
                    </div>

                    {/* Recent Searches Section */}
                    {recentSearches.length > 0 && (
                        <div className="mt-16 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <FaHistory className="text-gray-400" />
                                    <h2 className="text-xl font-bold">Recent searches</h2>
                                </div>
                                <button
                                    onClick={handleClearAll}
                                    className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
                                >
                                    Clear all
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {recentSearches.map((term, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setLocalSearch(term)}
                                        className="group relative flex items-center gap-2 px-6 py-2 bg-[#282828] hover:bg-[#323232] rounded-full text-sm font-bold border border-white/5 cursor-pointer transition-all pr-10"
                                    >
                                        <span className="text-white">{term}</span>
                                        <button
                                            onClick={(e) => handleRemoveRecent(e, term)}
                                            className="absolute right-3 p-1.5 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <FaTimes size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;

