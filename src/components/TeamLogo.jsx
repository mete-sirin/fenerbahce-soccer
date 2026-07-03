import { useState } from "react";

export default function TeamLogo({ id, name, size = 20 }) {
  const [failed, setFailed] = useState(false);
  const url = `https://images.fotmob.com/image_resources/logo/teamlogo/${id}_large.png`;

  if (failed) {
    const init = name.slice(0, 3).toUpperCase();
    return (
      <span
        className="inline-flex items-center justify-center rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          flex: "none",
          background: "#1b3d6e",
          font: `700 ${Math.round(size * 0.4)}px/1 'Barlow Condensed',sans-serif`,
          color: "#fff",
        }}
      >
        {init}
      </span>
    );
  }

  return (
    <img
      src={url}
      alt={name}
      onError={() => setFailed(true)}
      style={{ width: `${size}px`, height: `${size}px`, flex: "none" }}
    />
  );
}
