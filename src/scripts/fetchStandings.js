export default async function fetchStandings() {
  const url =
    "https://free-api-live-football-data.p.rapidapi.com/football-get-standing-all?leagueid=71";
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
      throw new Error(`Standings request failed: ${response.status}`);
    }
    const result = await response.json();
    return result?.response?.standing ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
