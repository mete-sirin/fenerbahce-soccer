import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import MatchBar from "../components/MatchBar";
import fetchMatches from "../scripts/fetchMatches";
import { LEAGUES } from "../data/leagues";

const FENERBAHCE_ID = 8695;

const LEGEND = [
  { res: "G", label: "Galibiyet", background: "#3bb273", color: "#06251a" },
  {
    res: "B",
    label: "Beraberlik",
    background: "rgba(245,241,232,.25)",
    color: "#f5f1e8",
  },
  { res: "M", label: "Mağlubiyet", background: "#e2574c", color: "#2b0805" },
];

function normalizeMatch(raw) {
  const kickoff = new Date(raw.status.utcTime);
  return {
    id: raw.id,
    utcTime: raw.status.utcTime,
    day: String(kickoff.getDate()).padStart(2, "0"),
    month: kickoff.toLocaleDateString("tr-TR", { month: "short" }),
    time: kickoff.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    round: raw.tournament?.stage ?? "",
    finished: raw.status.finished,
    notStarted: raw.notStarted ?? !raw.status.started,
    home: {
      id: Number(raw.home.id),
      name: raw.home.name,
      score: raw.home.score,
    },
    away: {
      id: Number(raw.away.id),
      name: raw.away.name,
      score: raw.away.score,
    },
  };
}

function toFbMatches(rawMatches) {
  return rawMatches
    .map(normalizeMatch)
    .filter((m) => m.home.id === FENERBAHCE_ID || m.away.id === FENERBAHCE_ID)
    .sort((a, b) => new Date(b.utcTime) - new Date(a.utcTime));
}

export default function Fixture() {
  const [league, setLeague] = useState(LEAGUES[0].key);
  const [matchesByLeague, setMatchesByLeague] = useState(() => {
    try {
      const cached = localStorage.getItem("fixtureMatches");
      return cached ? JSON.parse(cached) : {};
    } catch {
      localStorage.removeItem("fixtureMatches");
      return {};
    }
  });

  const attemptedFetch = useRef(false);

  useEffect(() => {
    if (LEAGUES.every((l) => matchesByLeague[l.key])) return;
    if (attemptedFetch.current) return;
    attemptedFetch.current = true;
    async function getMatches() {
      const { data, errors } = await fetchMatches();
      if (Object.keys(errors).length) console.error("fetchMatches:", errors);
      if (Object.keys(data).length === 0) return;
      localStorage.setItem("fixtureMatches", JSON.stringify(data));
      setMatchesByLeague(data);
    }
    getMatches();
  }, [matchesByLeague]);

  const matches = matchesByLeague[league]
    ? toFbMatches(matchesByLeague[league])
    : null;

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-245 px-5 pt-9 md:px-10 md:pt-12">
        <div className="mb-4 flex items-center gap-3.5">
          <span className="bg-accent h-0.5 w-12" />
          <span
            className="text-accent uppercase"
            style={{
              font: "600 13px/1 'Barlow',sans-serif",
              letterSpacing: ".24em",
            }}
          >
            2025/26 Sezonu
          </span>
        </div>
        <h1
          className="text-text m-0 text-[40px] leading-[.92] font-extrabold uppercase md:text-[56px]"
          style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
        >
          Fikstür
        </h1>
      </div>

      <div className="mx-auto mt-7 max-w-245 px-5 md:px-10">
        <div className="flex flex-wrap gap-2.5">
          {LEAGUES.map((l) => {
            const selected = l.key === league;
            const count = matchesByLeague[l.key]
              ? toFbMatches(matchesByLeague[l.key]).length
              : null;
            return (
              <button
                key={l.key}
                onClick={() => setLeague(l.key)}
                className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-5 uppercase transition-colors ${
                  selected
                    ? "border-accent bg-accent text-bg"
                    : "border-text/25 text-text/80 hover:border-accent"
                }`}
                style={{
                  font: "700 14px/1 'Barlow',sans-serif",
                  letterSpacing: ".05em",
                }}
              >
                {l.label}
                {count !== null && (
                  <span
                    className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.75 ${
                      selected ? "bg-bg/16 text-bg" : "text-text/70 bg-white/10"
                    }`}
                    style={{ font: "700 12px/1 'Barlow',sans-serif" }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-245 px-5 pb-20 md:px-10">
        {!matches ? (
          <div className="py-20">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#0f2547] shadow-[0_26px_56px_-30px_rgba(0,0,0,0.75)]">
              {matches.map((match) => (
                <MatchBar key={match.id} match={match} />
              ))}
              {matches.length === 0 && (
                <div
                  className="py-10 text-center"
                  style={{
                    font: "600 14px/1 'Barlow',sans-serif",
                    color: "rgba(245,241,232,.55)",
                  }}
                >
                  Maç bulunamadı
                </div>
              )}
            </div>

            <div
              className="mx-0.5 mt-4.5 flex flex-wrap items-center gap-x-6 gap-y-2"
              style={{
                font: "600 12.5px/1 'Barlow',sans-serif",
                color: "rgba(245,241,232,.65)",
              }}
            >
              {LEGEND.map((item) => (
                <span key={item.res} className="inline-flex items-center gap-2">
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                    style={{
                      background: item.background,
                      color: item.color,
                      font: "800 11px/1 'Barlow Condensed',sans-serif",
                    }}
                  >
                    {item.res}
                  </span>
                  {item.label}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
