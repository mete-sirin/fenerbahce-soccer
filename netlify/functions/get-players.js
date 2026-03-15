exports.handler = async function () {
  const API_KEY = process.env.API_SPORTS_KEY;
  const headers = { "x-apisports-key": API_KEY };

  const [squadRes, statsPage1Res, statsPage2Res, statsPage3Res, statsPage4Res] = await Promise.all([
    fetch("https://v3.football.api-sports.io/players/squads?team=611", { headers }),
    fetch("https://v3.football.api-sports.io/players?team=611&season=2024&page=1", { headers }),
    fetch("https://v3.football.api-sports.io/players?team=611&season=2024&page=2", { headers }),
    fetch("https://v3.football.api-sports.io/players?team=611&season=2024&page=3", { headers }),
    fetch("https://v3.football.api-sports.io/players?team=611&season=2024&page=4", { headers }),
  ]);

  const [squadData, statsPage1, statsPage2, statsPage3, statsPage4] = await Promise.all([
    squadRes.json(),
    statsPage1Res.json(),
    statsPage2Res.json(),
    statsPage3Res.json(),
    statsPage4Res.json(),
  ]);
  const allStats = [
    ...statsPage1.response,
    ...statsPage2.response,
    ...statsPage3.response,
    ...statsPage4.response,
  ];
  const statsMap = {};
  allStats.forEach((entry) => {
    const totals = entry.statistics.reduce(
      (acc, s) => ({
        appearances: acc.appearances + (s.games.appearences || 0),
        goals: acc.goals + (s.goals.total || 0),
        assists: acc.assists + (s.goals.assists || 0),
        minutes: acc.minutes + (s.games.minutes || 0),
      }),
      { appearances: 0, goals: 0, assists: 0, minutes: 0 }
    );
    statsMap[entry.player.id] = totals;
  });

  const players = squadData.response[0].players.map((player) => ({
    ...player,
    stats: statsMap[player.id] || { appearances: 0, goals: 0, assists: 0, minutes: 0 },
  }));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=604800",
    },
    body: JSON.stringify(players),
  };
};
