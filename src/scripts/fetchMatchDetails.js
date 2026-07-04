export default async function fetchMatchDetails(id) {
  const url1 = `https://free-api-live-football-data.p.rapidapi.com/football-get-match-all-stats?eventid=${id}`; //for stats
  const url2 = `https://free-api-live-football-data.p.rapidapi.com/football-get-match-detail?eventid=${id}`; // to figure out sides amınakoyduğumun api'yı 0-1 demiş ev-deplasman hangi takım bilmyom ki
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const [teamLookUpRes, statsRes] = await Promise.all([
      fetch(url2, options),
      fetch(url1, options),
    ]);

    const [teamLookup, stats] = await Promise.all([
      teamLookUpRes.json(),
      statsRes.json(),
    ]);

    const sidesObject = {
      homeTeam: {
        name: teamLookup.response.detail.homeTeam.name,
        id: teamLookup.response.detail.homeTeam.id,
      },
      awayteam: {
        name: teamLookup.response.detail.awayTeam.name,
        id: teamLookup.response.detail.awayTeam.id,
      },
    };

    return { sidesObject, stats: stats.response };
  } catch (error) {
    console.error(error);
  }
}
