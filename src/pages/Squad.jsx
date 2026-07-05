import { useEffect } from "react";
import { useState } from "react";
import fetchSquad from "../scripts/fetchSquad";
import PlayerCard from "../components/PlayerCard";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import PositionSelector from "../components/PositionSelector";
import Footer from "../components/Footer";

const POSITION_LABELS = {
  attackers: "Hücum",
  midfielders: "Orta Saha",
  defenders: "Defans",
  keepers: "Kaleci",
};

export default function Squad() {
  const positionsArr = ["attackers", "midfielders", "defenders", "keepers"];
  const [position, setPosition] = useState(positionsArr.at(0));
  const [squad, setSquad] = useState(() => {
    const cached = localStorage.getItem("squad");
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    if (squad) return;

    async function getPlayers() {
      const data = await fetchSquad();
      if (!data?.response?.list?.squad) return;
      const groups = data.response.list.squad.filter(
        (g) => g.title !== "coach",
      );
      localStorage.setItem("squad", JSON.stringify(groups));
      setSquad(groups);
    }
    getPlayers();
  }, [squad]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.4) 60%, rgba(11,30,61,1) 100%), url(/stadium.jpg)",
        }}
      />

      <Navbar></Navbar>

      <div className="absolute top-[50vh] left-0 z-10 hidden -translate-y-1/2 lg:block">
        <PositionSelector position={position} setPosition={setPosition} />
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 px-4 pt-6 lg:hidden">
        {positionsArr.map((key) => {
          const selected = key === position;
          return (
            <button
              key={key}
              onClick={() => setPosition(key)}
              className={`inline-flex h-10 cursor-pointer items-center rounded-full border px-4 font-sans text-sm font-bold tracking-wider uppercase transition-colors ${
                selected
                  ? "border-accent bg-accent text-bg"
                  : "border-text/25 text-text/80 hover:border-accent"
              }`}
            >
              {POSITION_LABELS[key]}
            </button>
          );
        })}
      </div>

      <div className="flex flex-1 items-start">
        {!squad ? (
          <div className="flex flex-1 items-center justify-center self-stretch py-24">
            <Spinner />
          </div>
        ) : (
          <ul
            className="grid flex-1 justify-center gap-6 px-4 py-8 pb-16 lg:ml-72 lg:p-8 lg:pb-16"
            style={{
              gridTemplateColumns: "repeat(auto-fit, 260px)",
            }}
          >
            {squad
              .find((group) => group.title === position)
              .members.map((player) => (
                <li key={player.id}>
                  <PlayerCard player={player} />
                </li>
              ))}
          </ul>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
