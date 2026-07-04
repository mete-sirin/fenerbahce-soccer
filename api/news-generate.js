import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { writeCache } from "./_lib/cache.js";

const ArticleSchema = z.object({
  headline: z.string().describe("Short, factual headline"),
  article: z
    .string()
    .describe(
      "Full news article in Turkish: 3-6 short paragraphs covering what happened, the context, and any quotes or details found in the search results. Not a summary.",
    ),
  summary: z.string().describe("2-3 sentence summary of the news item"),
  category: z
    .enum(["transfer", "match", "injury", "club", "other"])
    .describe("Type of news"),
  date: z
    .string()
    .nullable()
    .describe("Publication date in YYYY-MM-DD, or null if unknown"),
  source: z.string().nullable().describe("Name of the source outlet"),
  url: z.string().nullable().describe("URL of the source article"),
  imageUrl: z
    .string()
    .nullable()
    .describe("URL of the article's lead image, or null if not available"),
});

const NewsSchema = z.object({
  articles: z.array(ArticleSchema),
});

async function createNews() {
  const client = new OpenAI();
  const response = await client.responses.create({
    model: "gpt-5",
    max_output_tokens: 32000,
    tools: [
      {
        type: "web_search",
        search_context_size: "high",
      },
    ],

    input: `Find the 5 most recent and significant Fenerbahçe men's football news items.

Search the web — do NOT rely on memory, and do NOT invent anything.
1. Search for the latest Fenerbahçe news (transfers, match results, injuries, club announcements).
2. For each item write BOTH of the following, in Turkish:
   - "article": a full news article of 3-6 short paragraphs containing every verified detail (what happened, context, numbers, quotes). This must read like a complete news story, NOT a summary.
   - "summary": a separate 2-3 sentence summary of the same item.
3. Prefer the most recent items; ignore old or unconfirmed rumors.

CRITICAL: Only report what you can verify from a search result. If a field (date, source, url, imageUrl) is not available, set it to null. Never fabricate sources, dates, or URLs.

CRITICAL: Do not put citation markers, footnotes, or markdown links like ([site.com](url)) inside "headline", "article", or "summary". Those fields must be plain prose only — put the source URL in the "url" field instead.`,
    text: {
      format: zodTextFormat(NewsSchema, "news"),
    },
  });

  if (response.status === "incomplete") {
    console.error(
      `news generation incomplete (id=${response.id}):`,
      JSON.stringify(response.incomplete_details),
    );
    return null;
  }

.
  if (!response.output_text) {
    console.error(
      `news generation produced no output_text (id=${response.id}, status=${response.status})`,
    );
    return null;
  }

  const parsed = NewsSchema.safeParse(JSON.parse(response.output_text));
  if (!parsed.success) {
    console.error(
      `news generation output failed schema validation (id=${response.id}):`,
      parsed.error.message,
    );
    return null;
  }

  return parsed.data;
}

export default async function handler(req, res) {

  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  try {
    const news = await createNews();
    if (!news?.articles?.length) {
      res.status(502).json({ error: "news generation returned nothing" });
      return;
    }
    await writeCache("news", news);
    res.status(200).json({ ok: true, count: news.articles.length });
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: "news generation failed" });
  }
}
