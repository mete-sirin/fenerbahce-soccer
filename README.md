# Fenerbahçe Team

A fan site for Fenerbahçe S.K. — squad, fixtures, league standings, and daily news. Personal project, built primarily to learn React.

Live: https://fenerbahce-soccer.vercel.app/

## Versions

This is the second version of the project. It's a rewrite of an earlier plain HTML/CSS/JS site (built to learn CSS), which is kept on the [`v1` branch](https://github.com/mete-sirin/fenerbahce-soccer/tree/v1) and deployed separately on Netlify. This version was rewritten to learn React.

## Features

- Home page with a last-result widget and a standings widget
- Squad page with player info by position
- Fixtures across Süper Lig, Türkiye Kupası, and UEFA Europa League
- Match detail pages with stats
- Süper Lig standings table
- News section with daily-generated articles and per-article pages

## Tech stack

- React 19 (with the React Compiler Babel plugin)
- React Router
- Tailwind CSS v4
- Vite
- Vercel serverless functions (`api/`)
- Neon (serverless Postgres) for caching
- OpenAI API (`gpt-5` with the web search tool) for generating news content

## How it works

The frontend calls the project's own `/api/*` serverless functions, which proxy requests to third-party APIs and keep API keys server-side.

- `api/_lib/rapid.js` wraps a RapidAPI football-data endpoint (matches, standings, squad, match stats).
- `api/_lib/cache.js` caches each endpoint's response in a Postgres table (Neon) with a per-endpoint TTL (1h for matches/standings, 24h for squad/match details), and falls back to the last cached value if the upstream call fails.
- `api/refresh.js` runs on a daily Vercel Cron job (midnight Turkey time). It re-fetches matches, standings, and squad into the cache, and calls OpenAI's Responses API with the web search tool to produce Turkish-language Fenerbahçe news articles, validated against a Zod schema and written to the same cache table. `api/news.js` just reads whatever is cached.
- On the client, `useNews` reads from `/api/news` and caches the result in `localStorage` for a few hours; until the first cron run has happened, it falls back to a bundled `src/data/news.json`.

## Environment variables

| Variable | Used for |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string, used for caching |
| `RAPIDAPI_KEY` | RapidAPI football-data access |
| `OPENAI_API_KEY` | News generation (read implicitly by the OpenAI SDK) |
| `CRON_SECRET` | Authenticates the `/api/refresh` cron endpoint |

