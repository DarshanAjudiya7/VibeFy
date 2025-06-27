// components/AudioPlayer.jsx
const AudioPlayer = ({ currentSong, queue, setQueue, handleSongPlay, setCurrentSong }) => {
  if (!currentSong) return <p className="mb-6">Select a song to play</p>;

  const handleEnded = () => {
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      setQueue(rest);
      handleSongPlay(next);
    } else {
      setCurrentSong(null);
    }
  };

  return (
    <audio
      src={currentSong.url}
      controls
      autoPlay
      className="w-full mb-6"
      onEnded={handleEnded}
    />
  );
};

export default AudioPlayer;
