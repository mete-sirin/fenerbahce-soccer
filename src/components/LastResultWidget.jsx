import { useEffect, useState } from "react";
import fetchLastMatch from "../scripts/fetchLastMatch";

function formatMatchDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default function LastResultWidget() {
  const [matches, setMatches] = useState(() => {
    const cached = localStorage.getItem("matches");
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    if (matches) return;
    async function getFenerbahceMatches() {
      const data = await fetchLastMatch();
      if (!data) return;
      localStorage.setItem("matches", JSON.stringify(data));
      setMatches(data);
    }
    getFenerbahceMatches();
  }, [matches]);

  if (!matches) return null;

  const week = matches.length;
  const match = matches.at(-1);
  const imageUrlHome = `https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}_large.png`;
  const imageUrlAway = ` https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}_large.png`;

  return (
    <div
      className="w-89.5 overflow-hidden rounded-[14px] border border-white/12"
      style={{ background: "#0f2547", fontFamily: "'Barlow',sans-serif" }}
    >
      <div className="flex items-center justify-between border-b border-white/11 px-4.5 py-3.5">
        <span
          className="text-accent uppercase"
          style={{
            font: "700 13px/1 'Barlow',sans-serif",
            letterSpacing: ".16em",
          }}
        >
          SON LİG MAÇI
        </span>
        <span
          className="text-text/55"
          style={{
            font: "600 11px/1 'Barlow',sans-serif",
            letterSpacing: ".06em",
          }}
        >
          Süper Lig {week}. Hafta
        </span>
      </div>

      <div
        className="grid items-center gap-2.5 px-4.5 pt-5.5 pb-4"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        <div className="flex flex-col items-center gap-2.25">
          <img
            src={imageUrlHome}
            alt={match.home.name}
            className="h-11.5 w-11.5"
          />
          <span
            className="text-text uppercase"
            style={{
              font: "700 13px/1 'Barlow Condensed',sans-serif",
              letterSpacing: ".04em",
            }}
          >
            {match.home.name}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className="text-accent"
            style={{ font: "800 40px/1 'Barlow Condensed',sans-serif" }}
          >
            {match.home.score}
          </span>
          <span
            className="text-text/40"
            style={{ font: "700 20px/1 'Barlow Condensed',sans-serif" }}
          >
            –
          </span>
          <span
            className="text-text"
            style={{ font: "800 40px/1 'Barlow Condensed',sans-serif" }}
          >
            {match.away.score}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2.25">
          <img
            src={imageUrlAway}
            alt={match.away.name}
            className="h-11.5 w-11.5"
          />
          <span
            className="text-text uppercase"
            style={{
              font: "700 13px/1 'Barlow Condensed',sans-serif",
              letterSpacing: ".04em",
            }}
          >
            {match.away.name}
          </span>
        </div>
      </div>

      <div
        className="flex items-center justify-between px-4.5 py-3"
        style={{
          background: "rgba(255,212,59,.05)",
          borderTop: "1px solid rgba(255,212,59,.12)",
        }}
      >
        <span
          className="text-text/65"
          style={{ font: "600 11px/1 'Barlow',sans-serif" }}
        >
          {formatMatchDate(match.status.utcTime)}
        </span>
        <span
          className="text-text/50"
          style={{
            font: "700 10px/1 'Barlow',sans-serif",
            letterSpacing: ".14em",
          }}
        >
          MAÇ SONU
        </span>
      </div>
    </div>
  );
}
