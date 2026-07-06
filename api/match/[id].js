import { cachedFetch } from "../_lib/cache.js";
import { rapidGet } from "../_lib/rapid.js";

const TTL = 24 * 60 * 60;

export default async function handler(req, res) {
  const { id } = req.query;
  if (!/^\d+$/.test(String(id))) {
    res.status(400).json({ error: "invalid match id" });
    return;
  }

  try {
    const match = await cachedFetch(`match:${id}`, TTL, async () => {
      const [teamLookup, stats] = await Promise.all([
        rapidGet(`football-get-match-detail?eventid=${id}`),
        rapidGet(`football-get-match-all-stats?eventid=${id}`),
      ]);

      const detail = teamLookup?.response?.detail;
      if (!detail?.homeTeam) throw new Error("match detail payload missing");

      return {
        sidesObject: {
          homeTeam: { name: detail.homeTeam.name, id: detail.homeTeam.id },
          awayteam: { name: detail.awayTeam.name, id: detail.awayTeam.id },
        },
        stats: stats?.response ?? null,
      };
    });
    res.status(200).json(match);
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: "match details unavailable" });
  }
}
