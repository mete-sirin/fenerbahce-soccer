export default async function fetchLastMatch() {
  const url =
    "https://free-api-live-football-data.p.rapidapi.com/football-get-all-matches-by-league?leagueid=71";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Last match request failed: ${response.status}`);
    }
    const result = await response.json();
    const matches = result?.response?.matches;
    if (!matches) return null;
    const fenerbahceMatches = matches.filter((match) => {
      const isFenerbahceMatch =
        match.opponent.id == "8695" ||
        match.home.id === "8695" ||
        match.away.id === "8695";
      return isFenerbahceMatch;
    });
    return fenerbahceMatches;
  } catch (error) {
    console.error(error);
    return null;
  }
}
