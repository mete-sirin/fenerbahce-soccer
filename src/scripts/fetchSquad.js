const TEAM_IDS = {
  Galatasaray: 8637,
  Fenerbahçe: 8695,
  Trabzonspor: 9752,
  Beşiktaş: 10188,
  Göztepe: 1925,
  Başakşehir: 1933,
  Samsunspor: 9750,
  Rizespor: 2166,
  Gençlerbirliği: 7800,
  Konyaspor: 8622,
  Alanyaspor: 4678,
  Kocaelispor: 1569,
  Kasımpaşa: 4685,
  "Fatih Karagümrük": 2088,
  "Gaziantep FK": 4081,
  Eyüpspor: 4681,
  Antalyaspor: 1931,
  Kayserispor: 10182,
};
export default async function fetchSquad() {
  const url =
    "https://free-api-live-football-data.p.rapidapi.com/football-get-list-player?teamid=8695";
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
      throw new Error(`Squad request failed: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
