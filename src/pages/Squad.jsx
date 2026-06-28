import { useEffect } from "react";
import { useState } from "react";
import fetchSquad from "../scripts/fetchSquad";
import PlayerCard from "../components/PlayerCard";
import Navbar from "../components/Navbar";
import PositionSelector from "../components/PositionSelector";

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
      const groups = data.response.list.squad.filter(
        (g) => g.title !== "coach",
      );
      localStorage.setItem("squad", JSON.stringify(groups));
      setSquad(groups);
    }
    getPlayers();
  }, []);

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

      {/* Pitch centered on the screen at mount, then scrolls with the page */}
      <div className="absolute top-[50vh] left-0 z-10 hidden -translate-y-1/2 lg:block">
        <PositionSelector position={position} setPosition={setPosition} />
      </div>

      <div className="flex items-start">
        {!squad ? (
          <p className="text-text p-10 text-center">Loading…</p>
        ) : (
          <ul
            className="grid flex-1 justify-center gap-6 p-8 lg:ml-72"
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
    </div>
  );
}
