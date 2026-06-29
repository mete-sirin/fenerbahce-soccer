import Navbar from "../components/Navbar";
import StandingsTable from "../components/StandingsTable";

export default function Tables() {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-position-[center_36%]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.4) 60%, rgba(11,30,61,1) 100%), url(/stadium.jpg)",
        }}
      />
      <Navbar></Navbar>

      <StandingsTable></StandingsTable>
    </div>
  );
}
