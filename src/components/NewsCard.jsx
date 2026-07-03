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

function CategoryChip({ category }) {
  const meta = CATEGORY_META[category] ?? {
    label: category,
    bg: "#37527d",
    fg: "#f5f1e8",
  };
  return (
    <span
      className="absolute top-3 left-3 inline-flex items-center"
      style={{
        height: "22px",
        padding: "0 10px",
        borderRadius: "5px",
        font: "700 10px/1 'Barlow',sans-serif",
        letterSpacing: ".1em",
        background: meta.bg,
        color: meta.fg,
      }}
    >
      {meta.label}
    </span>
  );
}

export default function NewsCard({ newsObj }) {
  const { headline, source, date, category, imageUrl } = newsObj;

  return (
    <article
      className="hover:border-accent/40 flex cursor-pointer flex-col overflow-hidden border border-white/11 transition-[transform,border-color] duration-180 hover:-translate-y-0.75"
      style={{
        background: "#0f2547",
        borderRadius: "13px",
        boxShadow: "0 18px 38px -24px rgba(0,0,0,.65)",
      }}
    >
      <div className="relative aspect-video overflow-hidden">
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
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2.5"
            style={{ background: "linear-gradient(135deg,#17376a,#0e2347)" }}
          >
            <img
              src="/fb-icon.svg"
              alt=""
              className="pointer-events-none block h-13 w-13 opacity-65"
            />
            <span
              className="uppercase"
              style={{
                font: "800 10px/1 'Barlow Condensed',sans-serif",
                letterSpacing: ".26em",
                color: "rgba(255,212,59,.6)",
              }}
            >
              Haberler
            </span>
            <span
              className="absolute uppercase"
              style={{
                bottom: "9px",
                right: "11px",
                font: "600 7.5px/1 'Barlow',sans-serif",
                letterSpacing: ".16em",
                color: "rgba(245,241,232,.28)",
              }}
            >
              Görsel Yok
            </span>
          </div>
        )}
        <CategoryChip category={category} />
      </div>

      <div className="flex flex-1 flex-col px-4.5 pt-4 pb-4.5">
        <h4
          className="m-0 uppercase"
          style={{
            font: "700 20px/1.12 'Barlow Condensed',sans-serif",
            letterSpacing: ".005em",
            color: "#f5f1e8",
          }}
        >
          {headline}
        </h4>

        <div
          className="mt-auto flex items-center gap-2 pt-3.5"
          style={{
            font: "600 11.5px/1 'Barlow',sans-serif",
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
