import { NavLink, useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import newsData from "../data/news.json";

const CATEGORY_LABELS = {
  transfer: "Transfer",
  match: "Maç",
  injury: "Sakatlık",
  club: "Kulüp",
  other: "Gündem",
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

const PAGE_BG =
  "repeating-linear-gradient(125deg, rgba(255,255,255,.016) 0 2px, transparent 2px 9px), radial-gradient(130% 80% at 50% -8%, rgba(44,84,150,.55) 0%, rgba(11,30,61,0) 54%), linear-gradient(180deg, #0b1e3d 0%, #0a1b37 52%, #07152c 100%)";

function Breadcrumb() {
  return (
    <NavLink
      to="/news"
      className="text-text/60 hover:text-accent inline-flex items-center gap-2 uppercase transition-colors"
      style={{
        font: "700 13px/1 'Barlow',sans-serif",
        letterSpacing: ".08em",
        textDecoration: "none",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Haberler
    </NavLink>
  );
}

export default function Article() {
  const { newsId } = useParams();
  // newsId is the article's position in news.json
  const article = /^\d+$/.test(newsId)
    ? newsData.articles[Number(newsId)]
    : undefined;

  if (!article) {
    return (
      <div
        lang="tr"
        className="flex min-h-screen flex-col"
        style={{ background: PAGE_BG }}
      >
        <Navbar />
        <div
          className="w-full flex-1"
          style={{ maxWidth: "820px", margin: "0 auto", padding: "46px 40px 70px" }}
        >
          <Breadcrumb />
          <h1
            className="text-text uppercase"
            style={{
              margin: "26px 0 0",
              font: "800 52px/1 'Barlow Condensed',sans-serif",
            }}
          >
            Haber bulunamadı
          </h1>
          <p
            style={{
              margin: "18px 0 0",
              font: "500 19px/1.55 'Barlow',sans-serif",
              color: "rgba(245,241,232,.82)",
            }}
          >
            Aradığınız haber kaldırılmış veya bağlantı hatalı olabilir.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const { headline, summary, category, date, source, imageUrl } = article;
  const label = CATEGORY_LABELS[category] ?? category;
  const paragraphs = (article.article ?? summary ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const tags = ["Fenerbahçe", label];

  return (
    <div
      lang="tr"
      className="flex min-h-screen flex-col"
      style={{ background: PAGE_BG }}
    >
      <Navbar />

      <div
        className="w-full flex-1"
        style={{ maxWidth: "820px", margin: "0 auto", padding: "46px 40px 70px" }}
      >
        <Breadcrumb />

        <div className="flex items-center" style={{ gap: "12px", marginTop: "26px" }}>
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
              font: "600 13px/1 'Barlow',sans-serif",
              color: "rgba(245,241,232,.6)",
            }}
          >
            {source}
            {source && date && " · "}
            {formatNewsDate(date)}
          </span>
        </div>

        <h1
          className="text-text uppercase"
          style={{
            margin: "18px 0 0",
            font: "800 52px/1 'Barlow Condensed',sans-serif",
            letterSpacing: ".005em",
            textWrap: "pretty",
          }}
        >
          {headline}
        </h1>

        <p
          style={{
            margin: "18px 0 0",
            font: "500 19px/1.55 'Barlow',sans-serif",
            color: "rgba(245,241,232,.82)",
          }}
        >
          {summary}
        </p>

        {imageUrl && (
          <div
            className="relative overflow-hidden border border-white/12"
            style={{
              marginTop: "28px",
              borderRadius: "16px",
              boxShadow: "0 26px 56px -30px rgba(0,0,0,.75)",
            }}
          >
            <img
              src={imageUrl}
              alt={headline}
              className="block w-full object-cover"
              style={{ aspectRatio: "16/8" }}
            />
            {source && (
              <span
                className="absolute right-0 bottom-0 left-0"
                style={{
                  padding: "10px 16px",
                  background:
                    "linear-gradient(180deg, transparent, rgba(6,15,30,.85))",
                  font: "600 12px/1.4 'Barlow',sans-serif",
                  color: "rgba(245,241,232,.75)",
                }}
              >
                Görsel: {source}
              </span>
            )}
          </div>
        )}

        <div
          className="flex flex-col"
          style={{
            marginTop: "34px",
            gap: "22px",
            maxWidth: "680px",
            font: "400 17.5px/1.7 'Barlow',sans-serif",
            color: "rgba(245,241,232,.88)",
          }}
        >
          {paragraphs.map((p, i) => (
            <p key={i} className="m-0">
              {p}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap" style={{ gap: "10px", marginTop: "34px" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full"
              style={{
                height: "32px",
                padding: "0 14px",
                border: "1px solid rgba(245,241,232,.22)",
                font: "600 12.5px/1 'Barlow',sans-serif",
                color: "rgba(245,241,232,.7)",
              }}
            >
              #{tag.replace(/\s+/g, "")}
            </span>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
