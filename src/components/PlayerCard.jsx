import { useState } from "react";

export default function PlayerCard({ player }) {
  const imgUrl = `https://images.fotmob.com/image_resources/playerimages/${player.id}.png`;
  const [imgFailed, setImgFailed] = useState(false);

  const parts = player.name.trim().split(" ");
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : parts[0];
  const firstInitial = parts.length > 1 ? `${parts[0][0]}.` : "";

  const pos = player.positionIdsDesc?.split(",").at(0) ?? "-";
  const value =
    player.transferValue != null
      ? `€${(player.transferValue / 1_000_000).toFixed(1)}M`
      : "—";

  const rating = player.rating;
  const ratingText = rating != null ? rating.toFixed(2) : "—";
  let ratingBg = "rgba(255,255,255,.12)";
  let ratingFg = "rgba(255,255,255,.8)";
  if (rating != null) {
    if (rating >= 7.5) {
      ratingBg = "#1aa86c";
      ratingFg = "#fff";
    } else if (rating >= 7.0) {
      ratingBg = "#7bbf3a";
      ratingFg = "#0c1d3c";
    } else if (rating >= 6.5) {
      ratingBg = "#ffec00";
      ratingFg = "#0c1d3c";
    } else {
      ratingBg = "#e08436";
      ratingFg = "#fff";
    }
  }

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-[14px] border border-white/8 shadow-[0_18px_40px_-18px_rgba(0,0,0,.65)] transition hover:-translate-y-1.5 hover:border-[rgba(255,236,0,.5)] hover:shadow-[0_26px_50px_-18px_rgba(0,0,0,.8)]"
      style={{
        animation: "pcFloat .5s ease both",
        background: "linear-gradient(180deg,#13294f 0%,#0c1d3c 100%)",
      }}
    >
      {/* Photo zone */}
      <div
        className="relative h-45 overflow-hidden"
        style={{
          background: "linear-gradient(180deg,#1c3a6b 0%,#13294f 100%)",
        }}
      >
        {/* diagonal stripe texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 10px, transparent 10px 20px)",
          }}
        />
        {/* shirt number watermark */}
        <div
          className="absolute right-2.5 -bottom-1.5 font-bold"
          style={{
            font: "700 96px/1 'Barlow Condensed',sans-serif",
            color: "rgba(255,255,255,.07)",
            letterSpacing: "-.02em",
          }}
        >
          {player.shirtNumber ?? ""}
        </div>
        {/* player photo OR "Görsel Yok" silhouette placeholder */}
        {imgFailed ? (
          <>
            {/* head-and-shoulders silhouette */}
            <svg
              viewBox="0 0 230 160"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 block"
            >
              <circle cx="115" cy="60" r="31" fill="#173058" />
              <path
                d="M58 160 C58 121 84 92 115 92 C146 92 172 121 172 160 Z"
                fill="#173058"
              />
            </svg>
            <div
              className="absolute right-0 bottom-2.25 left-0 text-center uppercase"
              style={{
                font: "600 8px/1 'Barlow',sans-serif",
                letterSpacing: ".18em",
                color: "rgba(255,255,255,.42)",
              }}
            >
              Görsel Yok
            </div>
          </>
        ) : (
          <img
            src={imgUrl}
            alt={player.name}
            className="absolute bottom-0 left-1/2 h-37.5 w-auto -translate-x-1/2 object-contain object-bottom"
            onError={() => setImgFailed(true)}
          />
        )}
        {/* bottom fade */}
        <div
          className="absolute right-0 bottom-0 left-0 h-10"
          style={{
            background:
              "linear-gradient(180deg,transparent,rgba(12,29,60,.55))",
          }}
        />

        {/* position badge + role */}
        <div className="absolute top-3 left-3 flex items-center gap-1.75">
          <span
            className="inline-flex h-6 min-w-8.5 items-center justify-center rounded-md px-2"
            style={{
              background: "#ffec00",
              color: "#0c1d3c",
              font: "700 14px/1 'Barlow Condensed',sans-serif",
              letterSpacing: ".04em",
            }}
          >
            {pos}
          </span>
          <span
            className="uppercase"
            style={{
              font: "600 11px/1 'Barlow',sans-serif",
              letterSpacing: ".12em",
              color: "rgba(255,255,255,.6)",
            }}
          >
            {player.role?.fallback}
          </span>
        </div>

        {/* rating chip */}
        <div
          className="absolute top-3 right-3 flex min-w-11.5 flex-col items-center rounded-lg pt-1.25 pb-1 shadow-[0_6px_16px_-6px_rgba(0,0,0,.6)]"
          style={{ background: ratingBg }}
        >
          <span
            style={{
              font: "700 20px/1 'Barlow Condensed',sans-serif",
              color: ratingFg,
            }}
          >
            {ratingText}
          </span>
          <span
            style={{
              font: "600 8px/1 'Barlow',sans-serif",
              letterSpacing: ".14em",
              color: ratingFg,
              opacity: 0.7,
              marginTop: "3px",
            }}
          >
            PUAN
          </span>
        </div>

        {/* injury badge — bottom-right of photo */}
        {player.injured && (
          <span
            className="absolute right-3 bottom-3 inline-flex items-center gap-1.25 rounded-full px-2 py-0.75"
            style={{
              background: "rgba(225,52,52,.92)",
              font: "700 9px/1 'Barlow',sans-serif",
              letterSpacing: ".1em",
              color: "#fff",
            }}
          >
            INJURED
          </span>
        )}
      </div>

      {/* Identity */}
      <div className="px-4 pt-3.5">
        <div className="mb-1.5 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full py-0.75 pr-2 pl-1"
            style={{ background: "rgba(255,255,255,.07)" }}
          >
            <span
              className="inline-flex h-3.25 w-4.5 items-center justify-center rounded-sm"
              style={{
                background: "rgba(255,255,255,.15)",
                font: "700 7px/1 'Barlow',sans-serif",
                color: "#fff",
                letterSpacing: ".02em",
              }}
            >
              {player.ccode}
            </span>
            <span
              style={{
                font: "600 11px/1 'Barlow',sans-serif",
                color: "rgba(255,255,255,.65)",
              }}
            >
              {player.cname}
            </span>
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span
            style={{
              font: "500 14px/1 'Barlow',sans-serif",
              color: "rgba(255,255,255,.55)",
            }}
          >
            {firstInitial}
          </span>
          <span
            className="uppercase"
            style={{
              font: "700 24px/1 'Barlow Condensed',sans-serif",
              color: "#fff",
              letterSpacing: ".005em",
            }}
          >
            {lastName}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 mt-3.5 grid grid-cols-3 overflow-hidden rounded-[10px] border border-white/8">
        <Stat value={player.goals ?? 0} label="GOL" border />
        <Stat value={player.assists ?? 0} label="ASİST" border />
        <Stat value={player.age ?? "—"} label="YAŞ" />
      </div>

      {/* Market value */}
      <div
        className="mt-3.5 flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(255,236,0,.06)",
          borderTop: "1px solid rgba(255,236,0,.14)",
        }}
      >
        <span
          style={{
            font: "600 9px/1 'Barlow',sans-serif",
            letterSpacing: ".14em",
            color: "rgba(255,255,255,.45)",
          }}
        >
          PIYASA DEĞERI
        </span>
        <span
          style={{
            font: "700 16px/1 'Barlow Condensed',sans-serif",
            color: "#ffec00",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function Stat({ value, label, border }) {
  return (
    <div
      className="py-2.25 text-center"
      style={border ? { borderRight: "1px solid rgba(255,255,255,.08)" } : {}}
    >
      <div
        style={{
          font: "700 19px/1 'Barlow Condensed',sans-serif",
          color: "#fff",
        }}
      >
        {value}
      </div>
      <div
        className="mt-1.25"
        style={{
          font: "600 9px/1 'Barlow',sans-serif",
          letterSpacing: ".12em",
          color: "rgba(255,255,255,.4)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
