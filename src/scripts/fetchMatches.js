export default async function fetchMatches() {
  const urlMainLeague =
    "https://free-api-live-football-data.p.rapidapi.com/football-get-all-matches-by-league?leagueid=71";
  const urlEuropaLeauge =
    "https://free-api-live-football-data.p.rapidapi.com/football-get-all-matches-by-league?leagueid=73";
  const urlNationalCup =
    "https://free-api-live-football-data.p.rapidapi.com/football-get-all-matches-by-league?leagueid=151";

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  const [MainLeagueRes, EuropaLeagueRes, NationalCupRes] = await Promise.all([
    fetch(urlMainLeague, options),
    fetch(urlEuropaLeauge, options),
    fetch(urlNationalCup, options),
  ]);

  const [MainLeague, EuropaLeague, NationalCup] = await Promise.allSettled([
    MainLeagueRes.json(),
    EuropaLeagueRes.json(),
    NationalCupRes.json(),
  ]);

  const data = {};
  const errors = {};

  if (
    MainLeague.status === "fulfilled" &&
    MainLeague.value.status === "success"
  )
    data.MainLeauge = MainLeague.value.response.matches; //typo fix it later fix the wiring with it as well
  else errors.MainLeauge = MainLeague.reason ?? MainLeague.value;

  if (
    EuropaLeague.status === "fulfilled" &&
    EuropaLeague.value.status === "success"
  )
    data.EuropaLeague = EuropaLeague.value.response.matches;
  else errors.EuropaLeague = EuropaLeague.reason ?? EuropaLeague.value;

  if (
    NationalCup.status === "fulfilled" &&
    NationalCup.value.status === "success"
  )
    data.NationalCup = NationalCup.value.response.matches;
  else errors.NationalCup = NationalCup.reason ?? NationalCup.value;

  return { data, errors };
}
