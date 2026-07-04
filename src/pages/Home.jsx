import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";
import LastResultWidget from "../components/LastResultWidget";
import StandingsWidget from "../components/StandingsWidget";
import NewsCard from "../components/NewsCard";
import FeaturedNewsCard from "../components/FeaturedNewsCard";
import useNews from "../hooks/useNews";

export default function Home() {
  const articles = useNews();
  const [featured, ...rest] = articles;
  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{
        backgroundColor: "#081429",
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,.022) 0 14px, transparent 14px 28px), linear-gradient(180deg, #0b1e3d 0%, #0a1b37 52%, #07152c 100%)",
      }}
    >
      <Navbar></Navbar>

      <div
        className="relative overflow-hidden"
        style={{ height: "600px", background: "#0b1e3d" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-position-[center_36%]"
          style={{ backgroundImage: "url(/stadium.jpg)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,15,30,.66) 0%, rgba(6,15,30,.25) 36%, rgba(11,30,61,.6) 74%, #0b1e3d 100%)",
          }}
        />
        <div
          className="relative mx-auto flex h-full flex-col justify-end"
          style={{ maxWidth: "1240px", padding: "0 40px 60px" }}
        >
          <div className="mb-4.5 flex items-center gap-3.5">
            <span
              style={{ width: "48px", height: "2px", background: "#ffd43b" }}
            />
            <span
              className="uppercase"
              style={{
                font: "600 13px/1 'Barlow',sans-serif",
                letterSpacing: ".24em",
                color: "#ffd43b",
              }}
            >
              Fenerbahçe S.K. · 2025/26
            </span>
          </div>
          <h1
            className="m-0 uppercase"
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 800,
              lineHeight: ".88",
              letterSpacing: ".005em",
              color: "#f5f1e8",
              textShadow: "0 6px 28px rgba(0,0,0,.55)",
            }}
          >
            <span className="block text-[82px]">Her Şey</span>
            <span className="block text-[82px]" style={{ color: "#ffd43b" }}>
              1907'de Başladı
            </span>
          </h1>
          <p
            style={{
              maxWidth: "540px",
              margin: "22px 0 0",
              font: "500 18px/1.5 'Barlow',sans-serif",
              color: "rgba(245,241,232,.92)",
              textShadow: "0 1px 10px rgba(0,0,0,.7)",
            }}
          >
            Tek yürek, tek ses. Sarı-lacivert dünyasındaki son gelişmeleri
            buradan takip et.
          </p>
          <div className="mt-7 flex gap-3.5">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 uppercase transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(255,212,59,.7)]"
              style={{
                padding: "14px 28px",
                borderRadius: "10px",
                background: "#ffd43b",
                color: "#0b1e3d",
                font: "700 14px/1 'Barlow',sans-serif",
                letterSpacing: ".05em",
                textDecoration: "none",
              }}
            >
              Hakkında →
            </Link>
          </div>
        </div>
      </div>
      <section
        id="haberler"
        className="mx-auto w-full"
        style={{ maxWidth: "1240px", padding: "58px 40px 24px" }}
      >
        <div
          className="flex items-end justify-between gap-6"
          style={{
            paddingBottom: "22px",
            borderBottom: "1px solid rgba(255,212,59,.18)",
            marginBottom: "30px",
          }}
        >
          <div>
            <div
              className="uppercase"
              style={{
                font: "600 12px/1 'Barlow',sans-serif",
                letterSpacing: ".24em",
                color: "#ffd43b",
                marginBottom: "10px",
              }}
            >
              Güncel
            </div>
            <h2
              className="m-0 uppercase"
              style={{
                font: "800 40px/1 'Barlow Condensed',sans-serif",
                letterSpacing: ".01em",
                color: "#f5f1e8",
              }}
            >
              Son Haberler
            </h2>
          </div>
          <Link
            to="/news"
            className="hover:border-accent hover:text-accent inline-flex items-center gap-2 whitespace-nowrap uppercase"
            style={{
              padding: "11px 20px",
              borderRadius: "9px",
              border: "1.5px solid rgba(245,241,232,.28)",
              color: "#f5f1e8",
              font: "700 13px/1 'Barlow',sans-serif",
              letterSpacing: ".05em",
              textDecoration: "none",
            }}
          >
            Tüm Haberler →
          </Link>
        </div>

        <div
          className="grid items-start gap-7.5"
          style={{ gridTemplateColumns: "minmax(0,1fr) 358px" }}
        >
          <div>
            {featured && (
              <Link
                to="/news/0"
                className="block"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <FeaturedNewsCard newsObj={featured} />
              </Link>
            )}
            <div className="mt-5.5 grid grid-cols-2 gap-5.5">
              {rest.map((article, i) => (
                <Link
                  key={article.url ?? i}
                  to={`/news/${i + 1}`}
                  className="block"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <NewsCard newsObj={article} />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5.5">
            <LastResultWidget />
            <StandingsWidget />
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
