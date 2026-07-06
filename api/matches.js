import { cachedFetch } from "./_lib/cache.js";
import { rapidGet } from "./_lib/rapid.js";

const TTL = 60 * 60;

const LEAGUES = [
  { key: "MainLeague", id: 71 },
  { key: "EuropaLeague", id: 73 },
  { key: "NationalCup", id: 151 },
];

export async function fetchAllLeagues() {
  const results = await Promise.allSettled(
    LEAGUES.map((l) =>
      rapidGet(`football-get-all-matches-by-league?leagueid=${l.id}`),
    ),
  );

  const data = {};
  const errors = {};
  results.forEach((result, i) => {
    const { key } = LEAGUES[i];
    if (
      result.status === "fulfilled" &&
      result.value.status === "success" &&
      result.value.response?.matches
    ) {
      data[key] = result.value.response.matches;
    } else {
      errors[key] =
        result.status === "rejected"
          ? String(result.reason?.message ?? result.reason)
          : "unexpected payload";
    }
  });

  if (Object.keys(data).length === 0) throw new Error("all leagues failed");
  return { data, errors };
}

export default async function handler(req, res) {
  try {
    const matches = await cachedFetch("matches", TTL, fetchAllLeagues, {
      // don't lock a partial result in the cache for an hour
      shouldCache: (result) => Object.keys(result.errors).length === 0,
    });
    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: "matches unavailable" });
  }
}
