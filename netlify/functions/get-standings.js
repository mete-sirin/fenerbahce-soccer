exports.handler = async function () {
  const API_KEY = process.env.API_SPORTS_KEY;
  const headers = { "x-apisports-key": API_KEY };

  const response = await fetch(
    "https://v3.football.api-sports.io/standings?league=203&season=2024",
    { headers }
  );

  const data = await response.json();
  console.log("Standings API response:", JSON.stringify(data));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
    body: JSON.stringify(data),
  };
};
