// localStorage cache with an expiry, so browsers pick up the server-side
// daily refresh instead of keeping the first response forever. Entries in
// the old format (no fetchedAt) are treated as expired and dropped.
export function readLocalCache(key, ttlMs) {
  try {
    const cached = JSON.parse(localStorage.getItem(key));
    if (cached?.fetchedAt && Date.now() - cached.fetchedAt < ttlMs) {
      return cached.value;
    }
  } catch {
    // corrupt entry — fall through and drop it
  }
  localStorage.removeItem(key);
  return null;
}

export function writeLocalCache(key, value) {
  localStorage.setItem(key, JSON.stringify({ fetchedAt: Date.now(), value }));
}
