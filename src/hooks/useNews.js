import { useEffect, useState } from "react";
import fetchNews from "../scripts/fetchNews";
import staticNews from "../data/news.json";

const TTL_MS = 6 * 60 * 60 * 1000;

// Serves the LLM-generated articles from /api/news, falling back to the
// bundled news.json until the first generation has run. All news pages must
// read from this hook so the index-based /news/:newsId links stay consistent.
export default function useNews() {
  const [articles, setArticles] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem("news"));
      if (cached?.articles?.length && Date.now() - cached.fetchedAt < TTL_MS) {
        return cached.articles;
      }
    } catch {
      localStorage.removeItem("news");
    }
    return null;
  });

  useEffect(() => {
    if (articles) return;
    let cancelled = false;
    (async () => {
      const data = await fetchNews();
      if (cancelled) return;
      if (data?.articles?.length) {
        localStorage.setItem(
          "news",
          JSON.stringify({ fetchedAt: Date.now(), articles: data.articles }),
        );
        setArticles(data.articles);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [articles]);

  return articles ?? staticNews.articles;
}
