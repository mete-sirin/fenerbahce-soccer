import { useState } from "react";
import { NavLink } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import useNews from "../hooks/useNews";

const CATEGORY_LABELS = {
  transfer: "Transfer",
  match: "Maç",
  injury: "Sakatlık",
  club: "Kulüp",
  other: "Gündem",
};

const FILTERS = [
  { key: "all", label: "Tümü" },
  ...Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key, label })),
];

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

const PAGE_BG =
  "repeating-linear-gradient(125deg, rgba(255,255,255,.016) 0 2px, transparent 2px 9px), radial-gradient(130% 80% at 50% -8%, rgba(44,84,150,.55) 0%, rgba(11,30,61,0) 54%), linear-gradient(180deg, #0b1e3d 0%, #0a1b37 52%, #07152c 100%)";

function FeaturedHero({ article, id }) {
  const { headline, summary, source, date, category, imageUrl } = article;
  const label = CATEGORY_LABELS[category] ?? category;
  return (
    <NavLink
      to={`/news/${id}`}
      className="hover:border-accent/45 grid overflow-hidden border border-white/12 transition-colors duration-180"
      style={{
        gridTemplateColumns: "1.05fr 1fr",
        minHeight: "380px",
        borderRadius: "16px",
        boxShadow: "0 26px 56px -30px rgba(0,0,0,.75)",
        background: "#0f2547",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <span
        className="flex flex-col justify-center"
        style={{ gap: "14px", padding: "36px 40px" }}
      >
        <span className="flex items-center" style={{ gap: "12px" }}>
          <span
            className="inline-flex items-center uppercase"
            style={{
              height: "24px",
              padding: "0 12px",
              borderRadius: "5px",
              background: "#ffd43b",
              color: "#0b1e3d",
              font: "700 11px/1 'Barlow',sans-serif",
              letterSpacing: ".1em",
            }}
          >
            {label}
          </span>
          <span
            style={{
              font: "600 12.5px/1 'Barlow',sans-serif",
              color: "rgba(245,241,232,.75)",
            }}
          >
            {source}
            {source && date && " · "}
            {formatNewsDate(date)}
          </span>
        </span>
        <span
          className="uppercase"
          style={{
            font: "800 40px/1.05 'Barlow Condensed',sans-serif",
            letterSpacing: ".005em",
            color: "#f5f1e8",
          }}
        >
          {headline}
        </span>
        <span
          style={{
            font: "500 16px/1.5 'Barlow',sans-serif",
            color: "rgba(245,241,232,.85)",
          }}
        >
          {summary}
        </span>
      </span>

      <span className="relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span
            className="absolute inset-0 flex flex-col items-center justify-center gap-2.5"
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
          </span>
        )}
      </span>
    </NavLink>
  );
}

export default function News() {
  const [active, setActive] = useState("all");
  const articles = useNews();
  // id = position in the articles list; kept on each entry so filtering
  // doesn't break the /news/:newsId links
  const indexed = articles.map((article, id) => ({ article, id }));

  const featured = indexed[0];
  const showFeatured = active === "all";
  const visible = showFeatured
    ? indexed.slice(1)
    : indexed.filter(({ article }) => article.category === active);

  return (
    <div
      lang="tr"
      className="flex min-h-screen flex-col"
      style={{ background: PAGE_BG }}
    >
      <Navbar />

      <div className="w-full flex-1" style={{ paddingBottom: "70px" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "50px 40px 0" }}>
        <div className="mb-4 flex items-center gap-3.5">
          <span className="bg-accent h-0.5 w-12" />
          <span
            className="text-accent uppercase"
            style={{
              font: "600 13px/1 'Barlow',sans-serif",
              letterSpacing: ".24em",
            }}
          >
            Güncel
          </span>
        </div>
        <h1
          className="text-text m-0 uppercase"
          style={{ font: "800 56px/.92 'Barlow Condensed',sans-serif" }}
        >
          Haberler
        </h1>
      </div>

      <div style={{ maxWidth: "1240px", margin: "28px auto 0", padding: "0 40px" }}>
        <div className="flex flex-wrap gap-2.5">
          {FILTERS.map((f) => {
            const selected = f.key === active;
            return (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`inline-flex cursor-pointer items-center rounded-full border uppercase transition-all duration-150 ${
                  selected
                    ? "border-accent bg-accent text-bg"
                    : "border-text/25 text-text/80 hover:border-accent bg-transparent"
                }`}
                style={{
                  height: "42px",
                  padding: "0 20px",
                  font: "700 13.5px/1 'Barlow',sans-serif",
                  letterSpacing: ".05em",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {showFeatured && featured && (
        <div
          style={{ maxWidth: "1240px", margin: "26px auto 0", padding: "0 40px" }}
        >
          <FeaturedHero article={featured.article} id={featured.id} />
        </div>
      )}

      <div
        className="grid grid-cols-3 items-start"
        style={{
          maxWidth: "1240px",
          margin: "26px auto 0",
          padding: "0 40px",
          gap: "22px",
        }}
      >
        {visible.map(({ article, id }) => (
          <NavLink
            key={id}
            to={`/news/${id}`}
            className="block"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <NewsCard newsObj={article} />
          </NavLink>
        ))}
      </div>

      {visible.length === 0 && (
        <div
          className="py-15 text-center"
          style={{
            font: "600 14px/1 'Barlow',sans-serif",
            color: "rgba(245,241,232,.55)",
          }}
        >
          Bu kategoride haber bulunamadı
        </div>
      )}
      </div>

      <Footer />
    </div>
  );
}
