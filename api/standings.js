import { cachedFetch } from "./_lib/cache.js";
import { rapidGet } from "./_lib/rapid.js";

const TTL = 60 * 60;

export async function fetchStandings() {
  const result = await rapidGet("football-get-standing-all?leagueid=71");
  const standing = result?.response?.standing;
  if (!standing) throw new Error("standings payload missing");
  return standing;
}

export default async function handler(req, res) {
  try {
    const standings = await cachedFetch("standings", TTL, fetchStandings);
    res.status(200).json(standings);
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: "standings unavailable" });
  }
}
