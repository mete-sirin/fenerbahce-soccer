const CATEGORY_META = {
  transfer: { label: "Transfer", bg: "#ffd43b", fg: "#0b1e3d" },
  match: { label: "Maç", bg: "#4c6ef5", fg: "#ffffff" },
  injury: { label: "Sakatlık", bg: "#e2574c", fg: "#ffffff" },
  club: { label: "Kulüp", bg: "#37527d", fg: "#f5f1e8" },
  other: { label: "Gündem", bg: "#37527d", fg: "#f5f1e8" },
};

function formatNewsDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default function FeaturedNewsCard({ newsObj }) {
  const { headline, summary, source, date, category, imageUrl } = newsObj;
  const chip = CATEGORY_META[category] ?? {
    label: category,
    bg: "#37527d",
    fg: "#f5f1e8",
  };

  return (
    <article
      className="hover:border-accent/40 grid cursor-pointer overflow-hidden border border-white/11 transition-[transform,border-color] duration-180 hover:-translate-y-0.75"
      style={{
        gridTemplateColumns: "1.1fr 1fr",
        background: "#0f2547",
        borderRadius: "14px",
        boxShadow: "0 22px 46px -26px rgba(0,0,0,.7)",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          minHeight: "240px",
          background: "linear-gradient(135deg,#17376a,#0e2347)",
        }}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={headline}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(6,15,30,.7) 100%)",
              }}
            />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 12px, transparent 12px 24px)",
              }}
            />
            <span
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                font: "500 12px/1 ui-monospace,monospace",
                letterSpacing: ".18em",
                color: "rgba(245,241,232,.4)",
              }}
            >
              görsel · 16:9
            </span>
          </>
        )}
        <span
          className="absolute inline-flex items-center"
          style={{
            top: "14px",
            left: "14px",
            height: "24px",
            padding: "0 11px",
            borderRadius: "5px",
            font: "700 11px/1 'Barlow',sans-serif",
            letterSpacing: ".1em",
            background: chip.bg,
            color: chip.fg,
          }}
        >
          {chip.label}
        </span>
      </div>

      <div className="flex flex-col" style={{ padding: "24px 24px 22px" }}>
        <h3
          className="m-0 uppercase"
          style={{
            font: "700 27px/1.08 'Barlow Condensed',sans-serif",
            letterSpacing: ".005em",
            color: "#f5f1e8",
          }}
        >
          {headline}
        </h3>
        {summary && (
          <p
            style={{
              margin: "13px 0 0",
              font: "400 14.5px/1.6 'Barlow',sans-serif",
              color: "rgba(245,241,232,.86)",
            }}
          >
            {summary}
          </p>
        )}
        <div
          className="mt-auto flex items-center gap-2"
          style={{
            paddingTop: "18px",
            font: "600 12px/1 'Barlow',sans-serif",
            color: "rgba(245,241,232,.66)",
          }}
        >
          {source && <span style={{ color: "#ffd43b" }}>{source}</span>}
          {source && date && <span>·</span>}
          {date && <span>{formatNewsDate(date)}</span>}
        </div>
      </div>
    </article>
  );
}
