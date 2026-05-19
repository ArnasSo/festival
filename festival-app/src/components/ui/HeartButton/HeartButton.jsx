export default function HeartButton({ saved, toggleSaved }) {
  return (
    <button onClick={toggleSaved}>
      {saved ? "❤️" : "🤍"}
    </button>
  );
}