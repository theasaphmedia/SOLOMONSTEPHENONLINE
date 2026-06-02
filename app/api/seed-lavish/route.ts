import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// One-time seeder — inserts LAVISH into press releases if not already there.
// Safe to call multiple times (idempotent).
export async function GET() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS ss_press_releases (id SERIAL PRIMARY KEY, year TEXT DEFAULT '', title TEXT NOT NULL, type TEXT DEFAULT 'Single', description TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`
    const existing = await sql`SELECT id FROM ss_press_releases WHERE title = 'LAVISH' LIMIT 1`
    if (existing.length > 0) {
      return NextResponse.json({ ok: true, message: 'LAVISH already exists' })
    }
    await sql`
      INSERT INTO ss_press_releases (year, title, type, description, sort_order)
      VALUES ('2026', 'LAVISH', 'Single', 'A worship single meditating on the relentless, inexplicable love of Jesus — His coming, death, resurrection, and the life He makes possible. Released June 6, 2026.', 0)
    `
    return NextResponse.json({ ok: true, message: 'LAVISH added to press releases' })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
