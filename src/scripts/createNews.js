import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const ArticleSchema = z.object({
  headline: z.string().describe("Short, factual headline"),
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
});

const NewsSchema = z.object({
  articles: z.array(ArticleSchema),
});

async function createNews() {
  const client = new OpenAI();
  const response = await client.responses.create({
    model: "gpt-5",
    max_output_tokens: 8000,
    tools: [
      {
        type: "web_search",
        search_context_size: "high",
        filters: {
          allowed_domains: [
            "fenerbahce.org",
            "mackolik.com",
            "fanatik.com.tr",
            "aspor.com.tr",
            "beinsports.com.tr",
            "ntvspor.net",
          ],
        },
      },
    ],

    input: `Find the 3-5 most recent and significant Fenerbahçe men's football news items.

Search the web — do NOT rely on memory, and do NOT invent anything.
1. Search for the latest Fenerbahçe news (transfers, match results, injuries, club announcements).
2. Summarize each item factually in 2-3 sentences.
3. Prefer the most recent items; ignore old or unconfirmed rumors.
4. The news output should be in Turkish language.

CRITICAL: Only report what you can verify from a search result. If a field (date, source, url) is not available, set it to null. Never fabricate sources, dates, or URLs.`,
    text: {
      format: zodTextFormat(NewsSchema, "news"),
    },
  });

  if (response.status === "incomplete") {
    console.error("Response was cut off:", response.incomplete_details);
    return;
  }

  console.log(JSON.stringify(response.output_parsed.articles, null, 2));
}

// createNews();
