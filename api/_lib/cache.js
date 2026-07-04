import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

/*
  CREATE TABLE IF NOT EXISTS api_cache (
    key text PRIMARY KEY,
    data jsonb NOT NULL,
    fetched_at timestamptz NOT NULL DEFAULT now()
  );
*/

export async function readCache(key) {
  const rows = await sql`
    SELECT data, extract(epoch FROM (now() - fetched_at)) AS age
    FROM api_cache WHERE key = ${key}
  `;
  return rows[0] ?? null;
}

export async function writeCache(key, data) {
  await sql`
    INSERT INTO api_cache (key, data, fetched_at)
    VALUES (${key}, ${JSON.stringify(data)}::jsonb, now())
    ON CONFLICT (key)
    DO UPDATE SET data = EXCLUDED.data, fetched_at = EXCLUDED.fetched_at
  `;
}

// Serve from Neon while fresh; otherwise fetch, cache, and fall back to the
// stale copy if the upstream call fails. `shouldCache` lets callers skip
// caching partial results.
export async function cachedFetch(
  key,
  ttlSeconds,
  fetcher,
  { shouldCache = () => true } = {},
) {
  let cached = null;
  try {
    cached = await readCache(key);
  } catch (error) {
    console.error(`cache read failed for ${key}:`, error);
  }
  if (cached && cached.age < ttlSeconds) return cached.data;

  try {
    const fresh = await fetcher();
    if (shouldCache(fresh)) {
      try {
        await writeCache(key, fresh);
      } catch (error) {
        console.error(`cache write failed for ${key}:`, error);
      }
    }
    return fresh;
  } catch (error) {
    if (cached) {
      console.error(`serving stale ${key} after fetch failure:`, error);
      return cached.data;
    }
    throw error;
  }
}
