const HOST = "free-api-live-football-data.p.rapidapi.com";

export async function rapidGet(path) {
  const response = await fetch(`https://${HOST}/${path}`, {
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": HOST,
    },
  });
  if (!response.ok) {
    throw new Error(`RapidAPI ${path} failed: ${response.status}`);
  }
  return response.json();
}
