import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import songsData from "../data/songs.json";

const Artists = () => {
    const navigate = useNavigate();
    const { search } = useOutletContext();

    // Get unique artists
    const artists = [...new Set(songsData.map(song => song.artist))].map(name => {
        const artistSongs = songsData.filter(s => s.artist === name);
        return {
            name,
            songCount: artistSongs.length,
            cover: artistSongs[0]?.cover || "/covers/default.jpg"
        };
    });

    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="px-8 pt-10">
                <h1 className="text-4xl font-black mb-2">Artists</h1>
                <p className="text-[#b3b3b3] font-medium">Explore music by your favorite singers.</p>
            </div>

            <div className="px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredArtists.map((artist, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(`/artist/${encodeURIComponent(artist.name)}`)}
                        className="p-4 bg-[#181818] hover:bg-[#282828] rounded-xl transition-all cursor-pointer group flex flex-col items-center text-center gap-4"
                    >
                        <div className="relative w-full aspect-square shadow-2xl overflow-hidden rounded-full border-4 border-transparent group-hover:border-[#1db954] transition-all">
                            <img
                                src={artist.cover}
                                alt={artist.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => (e.target.src = "/covers/default.jpg")}
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <FaUserCircle className="text-white text-4xl" />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg truncate w-full">{artist.name}</h4>
                            <p className="text-xs text-[#b3b3b3] mt-1">Artist • {artist.songCount} songs</p>
                        </div>
                    </div>
                ))}

                {filteredArtists.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <p className="text-[#b3b3b3]">No artists found matching "{search}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Artists;
