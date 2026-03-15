# fenerbahce-soccer

A fan-built website to track Fenerbahçe S.K. and learn more about web development in the process.  — includes squad info, 
fixtures, and league standings. Not finished yet.

## Features

- Squad page with player stats and positions
- Fixture results across Süper Lig, Türkiye Kupası and UEFA Europa League
- Süper Lig standings table

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Netlify Functions (serverless)
- Data: [API-Football](https://www.api-football.com/) (v3)

## Notes

- All statistics are from the 2024-25 season due to API free tier limitations.
- Market values are not available as they are not covered by API-Football.
- 100 requests/day cap on the free plan, so data is fetched and cached.

## Live Site

[fenerbahce-team.netlify.app](https://fenerbahce-team.netlify.app)
