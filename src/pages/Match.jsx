import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import TeamLogo from "../components/TeamLogo";
import { useParams } from "react-router";
import fetchMatchDetails from "../scripts/fetchMatchDetails";
import { useState, useEffect } from "react";

const STAT_TR = {
  BallPossesion: "Topla oynama",
  expected_goals: "Gol beklentisi (xG)",
  total_shots: "Toplam şut",
  ShotsOnTarget: "İsabetli şut",
  ShotsOffTarget: "İsabetsiz şut",
  touches_opp_box: "Rakip ceza sahasında topla buluşma",
  big_chance: "Net gol fırsatı",
  big_chance_missed_title: "Kaçan net fırsat",
  accurate_passes: "İsabetli pas",
  yellow_cards: "Sarı kart",
  red_cards: "Kırmızı kart",
  corners: "Korner",
  blocked_shots: "Bloklanan şut",
  shots_woodwork: "Direkten dönen",
  shots_inside_box: "Ceza sahası içi şut",
  shots_outside_box: "Ceza sahası dışı şut",
  expected_goals_open_play: "xG akan oyun",
  expected_goals_set_play: "xG duran top",
  expected_goals_non_penalty: "xG penaltı hariç",
  expected_goals_on_target: "xGOT (isabetli)",
  passes: "Pas",
  own_half_passes: "Kendi yarı sahasında",
  opposition_half_passes: "Rakip yarı sahada",
  long_balls_accurate: "İsabetli uzun top",
  accurate_crosses: "İsabetli orta",
  player_throws: "Taç",
  Offsides: "Ofsayt",
  "matchstats.headers.tackles": "Top çalma",
  interceptions: "Pas arası",
  shot_blocks: "Blok",
  clearances: "Uzaklaştırma",
  keeper_saves: "Kaleci kurtarışı",
  duel_won: "Kazanılan mücadele",
  ground_duels_won: "Yerde kazanılan",
  aerials_won: "Havada kazanılan",
  dribbles_succeeded: "Başarılı çalım",
  fouls: "Yapılan faul",
};

const SECTION_TR = {
  shots: "Şutlar",
  expected_goals: "Gol Beklentisi (xG)",
  passes: "Paslar",
  defence: "Savunma",
  duels: "İkili Mücadele",
  discipline: "Disiplin",
};

function decorate(item) {
  const hl = item.highlighted;
  return {
    title: STAT_TR[item.key] ?? item.title,
    home: String(item.stats[0]),
    away: String(item.stats[1]),
    homeBg: hl === "home" ? "#ffd43b" : "transparent",
    homeColor: hl === "home" ? "#0b1e3d" : "rgba(245,241,232,.85)",
    awayBg: hl === "away" ? "rgba(245,241,232,.9)" : "transparent",
    awayColor: hl === "away" ? "#0b1e3d" : "rgba(245,241,232,.85)",
  };
}

function StatRow({ row, small }) {
  const pill = {
    minWidth: small ? "46px" : "52px",
    textAlign: "center",
    padding: small ? "5px 10px" : "6px 12px",
    borderRadius: "999px",
    font: small
      ? "700 13px/1 'Barlow',sans-serif"
      : "700 14px/1 'Barlow',sans-serif",
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: small ? "86px 1fr 86px" : "110px 1fr 110px",
        alignItems: "center",
        padding: small ? "9px 22px" : "11px 26px",
        borderTop: "1px solid rgba(255,255,255,.05)",
      }}
    >
      <span
        style={{
          ...pill,
          justifySelf: "start",
          background: row.homeBg,
          color: row.homeColor,
        }}
      >
        {row.home}
      </span>
      <span
        style={{
          textAlign: "center",
          font: small
            ? "500 13px/1.2 'Barlow',sans-serif"
            : "500 14px/1.2 'Barlow',sans-serif",
          color: "rgba(245,241,232,.78)",
        }}
      >
        {row.title}
      </span>
      <span
        style={{
          ...pill,
          justifySelf: "end",
          background: row.awayBg,
          color: row.awayColor,
        }}
      >
        {row.away}
      </span>
    </div>
  );
}

export default function Match() {
  const { matchId } = useParams();

  const [currentMatch, setCurrentMatch] = useState("");

  useEffect(() => {
    if (currentMatch) return;
    async function getMatchDetails(matchId) {
      const data = await fetchMatchDetails(matchId);
      if (!data) return;
      localStorage.setItem("currentMatch", JSON.stringify(data));
      setCurrentMatch(data);
    }

    getMatchDetails(matchId);
  }, [currentMatch, matchId]);

  if (!currentMatch) {
    return (
      <div className="bg-bg flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
        <Footer />
      </div>
    );
  }

  const groups = currentMatch.stats.stats;
  const top = groups.find((g) => g.key === "top_stats");
  const poss = top.stats.find((s) => s.type === "graph");
  const topStats = top.stats.filter((s) => s.type === "text").map(decorate);
  const sections = groups
    .filter((g) => g.key !== "top_stats")
    .map((g) => ({
      title: SECTION_TR[g.key] ?? g.title,
      rows: g.stats.filter((s) => s.type !== "title").map(decorate),
    }));

  const card = {
    background: "#0f2547",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 26px 56px -30px rgba(0,0,0,.75)",
  };

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />

      <div style={{ paddingBottom: "60px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "44px 40px 0" }}>
          <div style={card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 22px",
                borderBottom: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <span
                style={{
                  font: "700 13px/1 'Barlow',sans-serif",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#ffd43b",
                }}
              >
                Süper Lig
              </span>
              <span
                style={{
                  font: "600 12px/1 'Barlow',sans-serif",
                  color: "rgba(245,241,232,.55)",
                }}
              >
                Ülker Stadyumu
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: "16px",
                padding: "30px 34px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <TeamLogo
                  id={currentMatch.sidesObject.homeTeam.id}
                  name={currentMatch.sidesObject.homeTeam.name}
                  size={72}
                />
                <span
                  style={{
                    font: "700 18px/1 'Barlow Condensed',sans-serif",
                    letterSpacing: ".04em",
                    textTransform: "uppercase",
                    color: "#ffd43b",
                  }}
                >
                  {currentMatch.sidesObject.homeTeam.name}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span
                    style={{
                      font: "800 64px/1 'Barlow Condensed',sans-serif",
                      color: "#ffd43b",
                    }}
                  >
                    2
                  </span>
                  <span
                    style={{
                      font: "700 30px/1 'Barlow Condensed',sans-serif",
                      color: "rgba(245,241,232,.4)",
                    }}
                  >
                    –
                  </span>
                  <span
                    style={{
                      font: "800 64px/1 'Barlow Condensed',sans-serif",
                      color: "#f5f1e8",
                    }}
                  >
                    1
                  </span>
                </div>
                <span
                  style={{
                    font: "700 11px/1 'Barlow',sans-serif",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "rgba(245,241,232,.5)",
                  }}
                >
                  Maç Sonu
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <TeamLogo
                  id={currentMatch.sidesObject.awayteam.id}
                  name={currentMatch.sidesObject.awayteam.name}
                  size={72}
                />
                <span
                  style={{
                    font: "700 18px/1 'Barlow Condensed',sans-serif",
                    letterSpacing: ".04em",
                    textTransform: "uppercase",
                    color: "#f5f1e8",
                  }}
                >
                  {currentMatch.sidesObject.awayteam.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "860px", margin: "22px auto 0", padding: "0 40px" }}>
          <div style={{ ...card, padding: "22px 26px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  font: "700 20px/1 'Barlow Condensed',sans-serif",
                  color: "#ffd43b",
                }}
              >
                %{poss.stats[0]}
              </span>
              <span
                style={{
                  font: "700 12px/1 'Barlow',sans-serif",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "rgba(245,241,232,.6)",
                }}
              >
                Topla Oynama
              </span>
              <span
                style={{
                  font: "700 20px/1 'Barlow Condensed',sans-serif",
                  color: "#f5f1e8",
                }}
              >
                %{poss.stats[1]}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                height: "12px",
                borderRadius: "6px",
                overflow: "hidden",
                gap: "3px",
              }}
            >
              <span
                style={{
                  width: `${poss.stats[0]}%`,
                  background: "#ffd43b",
                  borderRadius: "6px 0 0 6px",
                }}
              />
              <span
                style={{
                  flex: 1,
                  background: "rgba(245,241,232,.28)",
                  borderRadius: "0 6px 6px 0",
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "860px", margin: "22px auto 0", padding: "0 40px" }}>
          <div style={card}>
            <div
              style={{
                padding: "16px 26px",
                borderBottom: "1px solid rgba(255,255,255,.1)",
                background: "rgba(255,255,255,.03)",
              }}
            >
              <span
                style={{
                  font: "700 15px/1 'Barlow',sans-serif",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#ffd43b",
                }}
              >
                Öne Çıkanlar
              </span>
            </div>
            {topStats.map((row) => (
              <StatRow key={row.title} row={row} />
            ))}
          </div>
        </div>

        <div
          style={{
            maxWidth: "860px",
            margin: "22px auto 0",
            padding: "0 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "22px",
            alignItems: "start",
          }}
        >
          {sections.map((sec) => (
            <div key={sec.title} style={card}>
              <div
                style={{
                  padding: "14px 22px",
                  borderBottom: "1px solid rgba(255,255,255,.1)",
                  background: "rgba(255,255,255,.03)",
                }}
              >
                <span
                  style={{
                    font: "700 13px/1 'Barlow',sans-serif",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#ffd43b",
                  }}
                >
                  {sec.title}
                </span>
              </div>
              {sec.rows.map((row) => (
                <StatRow key={row.title} row={row} small />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
