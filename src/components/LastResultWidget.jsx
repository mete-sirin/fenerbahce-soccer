import { useEffect, useRef, useState } from "react";
import fetchMatches from "../scripts/fetchMatches";
import Spinner from "./Spinner";
import { LEAGUES } from "../data/leagues";
import { NavLink } from "react-router";

const FENERBAHCE_ID = 8695;

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
  const [onHover, setOnHover] = useState(false);
  const [matchesByLeague, setMatchesByLeague] = useState(() => {
    try {
      const cached = localStorage.getItem("fixtureMatches");
      return cached ? JSON.parse(cached) : null;
    } catch {
      localStorage.removeItem("fixtureMatches");
      return null;
    }
  });

  const attemptedFetch = useRef(false);

  useEffect(() => {
    if (matchesByLeague && LEAGUES.every((l) => matchesByLeague[l.key])) return;
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

  if (!matchesByLeague) {
    return (
      <div
        className="flex w-full items-center justify-center rounded-[14px] border border-white/12 py-10 lg:w-89.5"
        style={{ background: "#0f2547" }}
      >
        <Spinner />
      </div>
    );
  }

  const finished = LEAGUES.flatMap((league) =>
    (matchesByLeague[league.key] ?? [])
      .filter(
        (m) =>
          (Number(m.home.id) === FENERBAHCE_ID ||
            Number(m.away.id) === FENERBAHCE_ID) &&
          m.status.finished,
      )
      .map((m) => ({ ...m, competition: league.label })),
  );

  if (finished.length === 0) return null;

  const match = finished.reduce((latest, m) =>
    new Date(m.status.utcTime) > new Date(latest.status.utcTime) ? m : latest,
  );
  const imageUrlHome = `https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}_large.png`;
  const imageUrlAway = `https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}_large.png`;

  return (
    <NavLink
      onPointerEnter={() => setOnHover(true)}
      onPointerLeave={() => setOnHover(false)}
      key={match.id}
      to={`/match/${match.id}`}
      className={`w-full cursor-pointer overflow-hidden rounded-[14px] lg:w-89.5 ${onHover ? "border-accent border-[0.5px]" : "border border-white/12"} `}
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
          SON MAÇ
        </span>
        <span
          className="text-text/55"
          style={{
            font: "600 11px/1 'Barlow',sans-serif",
            letterSpacing: ".06em",
          }}
        >
          {match.competition}
          {match.tournament?.stage ? ` · ${match.tournament.stage}` : ""}
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
    </NavLink>
  );
}
