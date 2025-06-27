// components/PlayerLayout.jsx
const filterBackgrounds = {
  all: "linear-gradient(to right, #434343, #000000)",
  liked: "linear-gradient(to right, #ff5f6d, #ffc371)",
  recent: "linear-gradient(to right, #00c6ff, #0072ff)"
};

const PlayerLayout = ({ children, bgEffect, filter }) => {
  const filterBg = filterBackgrounds[filter] || "#000000";

  return (
    <div
      className="relative min-h-screen text-black transition-all duration-500"
      style={{
        backgroundImage: `${bgEffect}, ${filterBg}`,
        backgroundBlendMode: "overlay"
      }}
    >
      <div className="relative z-10 min-h-screen bg bg-opacity-40 p-6">
        {children}
      </div>
    </div>
  );
};

export default PlayerLayout;
