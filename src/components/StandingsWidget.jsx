import { useState, useEffect } from "react";
import fetchStandings from "../scripts/fetchStandings";
import { NavLink } from "react-router";
import TeamLogo from "./TeamLogo";
import Spinner from "./Spinner";

const FENERBAHCE_ID = 8695;

export default function StandingsWidget() {
  const [standings, setStandings] = useState(() => {
    try {
      const cached = localStorage.getItem("standings");
      return cached ? JSON.parse(cached) : null;
    } catch {
      localStorage.removeItem("standings");
      return null;
    }
  });

  useEffect(() => {
    if (standings) return;
    async function getStandings() {
      try {
        const data = await fetchStandings();
        if (!data) return;
        localStorage.setItem("standings", JSON.stringify(data));
        setStandings(data);
      } catch (error) {
        console.log(error);
      }
    }
    getStandings();
  }, [standings]);

  if (!standings) {
    return (
      <div
        className="flex w-89.5 items-center justify-center rounded-[14px] border border-white/12 py-10"
        style={{ background: "#0f2547" }}
      >
        <Spinner />
      </div>
    );
  }

  const table = standings.filter((obj) => {
    return obj.idx <= 7;
  });
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
          Puan Durumu
        </span>
        <span
          className="text-text/55"
          style={{
            font: "600 11px/1 'Barlow',sans-serif",
            letterSpacing: ".06em",
          }}
        >
          Süper Lig
        </span>
      </div>

      <div
        className="text-text/55 grid px-4.5 pt-2.25 pb-1 uppercase"
        style={{
          gridTemplateColumns: "24px 1fr 30px 34px",
          font: "700 10px/1 'Barlow',sans-serif",
          letterSpacing: ".1em",
        }}
      >
        <span>#</span>
        <span>Takım</span>
        <span className="text-center">O</span>
        <span className="text-center">P</span>
      </div>

      {table.map((team) => {
        const isFb = team.id === FENERBAHCE_ID;
        return (
          <div
            key={team.id}
            className="grid items-center border-t border-white/5 px-4.5 py-2.25"
            style={{
              gridTemplateColumns: "24px 1fr 30px 34px",
              background: isFb ? "rgba(255,212,59,.12)" : "transparent",
            }}
          >
            <span
              style={{
                font: "700 14px/1 'Barlow Condensed',sans-serif",
                color: isFb ? "#ffd43b" : "rgba(245,241,232,.55)",
              }}
            >
              {team.idx}
            </span>

            <span className="flex min-w-0 items-center gap-2.25">
              <TeamLogo id={team.id} name={team.name} />
              <span
                className="overflow-hidden text-ellipsis whitespace-nowrap"
                style={{
                  font: "600 13.5px/1 'Barlow',sans-serif",
                  color: isFb ? "#ffd43b" : "#f5f1e8",
                }}
              >
                {team.name}
              </span>
            </span>

            <span
              className="text-center"
              style={{
                font: "500 13px/1 'Barlow',sans-serif",
                color: "rgba(245,241,232,.74)",
              }}
            >
              {team.played}
            </span>
            <span
              className="text-center"
              style={{
                font: "700 14px/1 'Barlow Condensed',sans-serif",
                color: isFb ? "#ffd43b" : "#f5f1e8",
              }}
            >
              {team.pts}
            </span>
          </div>
        );
      })}

      <NavLink
        to="/tables"
        href="#"
        className="text-text/60 hover:text-accent block border-t border-white/6 py-3 text-center uppercase transition-colors"
        style={{
          font: "700 12px/1 'Barlow',sans-serif",
          letterSpacing: ".08em",
        }}
      >
        Tüm Tablo →
      </NavLink>
    </div>
  );
}
