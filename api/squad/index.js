import { cachedFetch } from "../_lib/cache.js";
import { rapidGet } from "../_lib/rapid.js";

const TTL = 24 * 60 * 60; // squad changes rarely

export default async function handler(req, res) {
  try {
    const squad = await cachedFetch("squad", TTL, async () => {
      const result = await rapidGet("football-get-list-player?teamid=8695");
      if (!result?.response?.list?.squad) {
        throw new Error("squad payload missing");
      }
      return result;
    });
    res.status(200).json(squad);
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: "squad unavailable" });
  }
}
