import { cachedFetch } from "./_lib/cache.js";
import { rapidGet } from "./_lib/rapid.js";

const TTL = 60 * 60; // 1h

export default async function handler(req, res) {
  try {
    const standings = await cachedFetch("standings", TTL, async () => {
      const result = await rapidGet("football-get-standing-all?leagueid=71");
      const standing = result?.response?.standing;
      if (!standing) throw new Error("standings payload missing");
      return standing;
    });
    res.status(200).json(standings);
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: "standings unavailable" });
  }
}
