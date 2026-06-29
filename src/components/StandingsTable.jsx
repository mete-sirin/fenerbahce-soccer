import { useState } from "react";
import { TeamLogo } from "./StandingsWidget";

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

  if (!standings) return null;

  const zoneColor = (pos) => {
    if (pos <= 2) return "#3bb273";
    if (pos === 3) return "#4c6ef5";
    if (pos <= 5) return "#5b8def";
    if (pos >= 16) return "#e2574c";
    return "transparent";
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-6 py-14 font-[Barlow,sans-serif]">
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
            <tr className="border-b border-white/10 bg-white/[0.03] text-[11px] font-bold tracking-[0.1em] text-[#f5f1e8]/55 uppercase">
              <th className="w-12 py-3.5 text-center">#</th>
              <th className="py-3.5 pl-2 text-left">Takımlar</th>
              <th className="w-10 py-3.5 text-center">O</th>
              <th className="w-10 py-3.5 text-center">G</th>
              <th className="w-10 py-3.5 text-center">B</th>
              <th className="w-10 py-3.5 text-center">M</th>
              <th className="w-12 py-3.5 text-center">AG</th>
              <th className="w-12 py-3.5 text-center">YG</th>
              <th className="w-14 py-3.5 text-center">AV</th>
              <th className="w-16 py-3.5 text-center text-[#ffd43b]">P</th>
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
                  className={`group h-[54px] border-t border-white/5 transition-colors ${
                    isFB
                      ? "bg-[#ffd43b]/10 hover:bg-[#ffd43b]/15"
                      : "hover:bg-white/[0.04]"
                  }`}
                >
                  <td className="relative text-center">
                    <span
                      className="absolute top-0 left-0 h-full w-1"
                      style={{ background: zoneColor(team.idx) }}
                    />
                    <span
                      className={`font-[Barlow_Condensed,sans-serif] text-base font-bold ${
                        isFB ? "text-[#ffd43b]" : "text-[#f5f1e8]/60"
                      }`}
                    >
                      {team.idx}
                    </span>
                  </td>

                  <td className="pl-2">
                    <div className="flex items-center gap-3">
                      <TeamLogo
                        id={team.id}
                        className="h-[26px] w-[26px] shrink-0"
                      />
                      <span
                        className={`truncate text-[15px] font-semibold ${
                          isFB ? "text-[#ffd43b]" : "text-[#f5f1e8]"
                        }`}
                      >
                        {team.name}
                      </span>
                    </div>
                  </td>

                  <td className="text-center text-sm text-[#f5f1e8]/70">
                    {team.played}
                  </td>
                  <td className="text-center text-sm text-[#f5f1e8]/70">
                    {team.wins}
                  </td>
                  <td className="text-center text-sm text-[#f5f1e8]/70">
                    {team.draws}
                  </td>
                  <td className="text-center text-sm text-[#f5f1e8]/70">
                    {team.losses}
                  </td>
                  <td className="text-center text-sm text-[#f5f1e8]/70">
                    {goalsScored}
                  </td>
                  <td className="text-center text-sm text-[#f5f1e8]/70">
                    {goalsConceded}
                  </td>
                  <td
                    className={`text-center text-sm font-semibold ${
                      isFB
                        ? "text-[#ffd43b]"
                        : gd > 0
                          ? "text-[#7fd6a8]"
                          : gd < 0
                            ? "text-[#e89089]"
                            : "text-[#f5f1e8]/70"
                    }`}
                  >
                    {gd > 0 ? `+${gd}` : gd}
                  </td>
                  <td
                    className={`text-center font-[Barlow_Condensed,sans-serif] text-[17px] font-bold ${
                      isFB ? "text-[#ffd43b]" : "text-[#f5f1e8]"
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
