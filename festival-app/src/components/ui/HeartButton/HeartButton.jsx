import { useState } from "react";

export default function HeartButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      onClick={() => setSaved(!saved)}
      className="heart-button"
    >
      {saved ? "❤️" : "🤍"}
    </button>
  );
}