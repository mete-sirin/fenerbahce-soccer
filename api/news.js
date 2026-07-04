import { readCache } from "./_lib/cache.js";

export default async function handler(req, res) {
  try {
    const cached = await readCache("news");
    res.status(200).json(cached?.data ?? { articles: [] });
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: "news unavailable" });
  }
}
