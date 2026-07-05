import { useState, useEffect } from "react";
import fetchStandings from "../scripts/fetchStandings";
import TeamLogo from "./TeamLogo";
import Spinner from "./Spinner";

export default function StandingsTable() {
  const FENERBAHCE_ID = 8695;
  const [standings, setStandings] = useState(() => {
    try {
      const cached = localStorage.getItem("standings");
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.log(error);
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
      <div className="flex w-full justify-center px-6 py-32">
        <Spinner />
      </div>
    );
  }

  const zoneColor = (pos) => {
    if (pos <= 2) return "#3bb273";
    if (pos === 3) return "#4c6ef5";
    if (pos <= 5) return "#5b8def";
    if (pos >= 16) return "#e2574c";
    return "transparent";
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-3 py-10 font-[Barlow,sans-serif] md:px-6 md:py-14">
      <div className="mb-7 flex w-full max-w-275 flex-col">
        <span className="text-accent text-xs font-bold tracking-[0.24em] uppercase">
          Trendyol Süper Lig · 2025/26
        </span>
        <h1 className="text-text font-[Barlow_Condensed,sans-serif] text-4xl font-extrabold tracking-wide uppercase">
          Puan Durumu
        </h1>
      </div>
      <div className="w-full max-w-275 overflow-hidden rounded-2xl border border-white/10 bg-[#0f2547] shadow-[0_26px_56px_-30px_rgba(0,0,0,0.75)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/3 text-[11px] font-bold tracking-widest text-text/55 uppercase">
              <th className="w-10 py-3.5 text-center md:w-12">#</th>
              <th className="py-3.5 pl-2 text-left">Takımlar</th>
              <th className="w-8 py-3.5 text-center md:w-10">O</th>
              <th className="hidden w-10 py-3.5 text-center sm:table-cell">
                G
              </th>
              <th className="hidden w-10 py-3.5 text-center sm:table-cell">
                B
              </th>
              <th className="hidden w-10 py-3.5 text-center sm:table-cell">
                M
              </th>
              <th className="hidden w-12 py-3.5 text-center md:table-cell">
                AG
              </th>
              <th className="hidden w-12 py-3.5 text-center md:table-cell">
                YG
              </th>
              <th className="w-10 py-3.5 text-center md:w-14">AV</th>
              <th className="text-accent w-12 py-3.5 text-center md:w-16">P</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => {
              const [goalsScored, goalsConceded] = team.scoresStr.split("-");
              const isFB = team.id === FENERBAHCE_ID;
              const gd = Number(team.goalConDiff);
              return (
                <tr
                  key={team.id}
                  className={`group h-13.5 border-t border-white/5 transition-colors ${
                    isFB
                      ? "bg-accent/10 hover:bg-accent/15"
                      : "hover:bg-white/4"
                  }`}
                >
                  <td className="relative text-center">
                    <span
                      className="absolute top-0 left-0 h-full w-1"
                      style={{ background: zoneColor(team.idx) }}
                    />
                    <span
                      className={`font-[Barlow_Condensed,sans-serif] text-base font-bold ${
                        isFB ? "text-accent" : "text-text/60"
                      }`}
                    >
                      {team.idx}
                    </span>
                  </td>

                  <td className="pl-2">
                    <div className="flex items-center gap-3">
                      <TeamLogo
                        id={team.id}
                        className="h-6.5 w-6.5 shrink-0"
                      />
                      <span
                        className={`truncate text-[15px] font-semibold ${
                          isFB ? "text-accent" : "text-text"
                        }`}
                      >
                        {team.name}
                      </span>
                    </div>
                  </td>

                  <td className="text-text/70 text-center text-sm">
                    {team.played}
                  </td>
                  <td className="text-text/70 hidden text-center text-sm sm:table-cell">
                    {team.wins}
                  </td>
                  <td className="text-text/70 hidden text-center text-sm sm:table-cell">
                    {team.draws}
                  </td>
                  <td className="text-text/70 hidden text-center text-sm sm:table-cell">
                    {team.losses}
                  </td>
                  <td className="text-text/70 hidden text-center text-sm md:table-cell">
                    {goalsScored}
                  </td>
                  <td className="text-text/70 hidden text-center text-sm md:table-cell">
                    {goalsConceded}
                  </td>
                  <td
                    className={`text-center text-sm font-semibold ${
                      isFB
                        ? "text-accent"
                        : gd > 0
                          ? "text-[#7fd6a8]"
                          : gd < 0
                            ? "text-[#e89089]"
                            : "text-text/70"
                    }`}
                  >
                    {gd > 0 ? `+${gd}` : gd}
                  </td>
                  <td
                    className={`text-center font-[Barlow_Condensed,sans-serif] text-[17px] font-bold ${
                      isFB ? "text-accent" : "text-text"
                    }`}
                  >
                    {team.pts}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
