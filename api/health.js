import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`SELECT 1`;
    res.status(200).json({ ok: true, db: "up" });
  } catch (error) {
    console.error(error);
    res.status(503).json({ ok: false, db: "down" });
  }
}
