import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

const releases = [
  { year: '2026', title: 'LAVISH',         type: 'Single', sort_order: 0, desc: 'A worship single meditating on the relentless, inexplicable love of Jesus — His coming, death, resurrection, and the life He makes possible. Released June 6, 2026.' },
  { year: '2024', title: 'CROSSOVER',      type: 'Single', sort_order: 1, desc: 'A prophetic declaration of passing through — beyond every limitation, into the fullness of God. Anchored in Psalm 23.' },
  { year: '2024', title: 'AIKU',           type: 'Single', sort_order: 2, desc: 'Death could not hold Him. A bold, triumphant anthem declaring the resurrection power of Jesus. Rev 1:17-18.' },
  { year: '2024', title: 'Awesome God',    type: 'Single', sort_order: 3, desc: 'A live worship experience capturing the atmosphere of surrender and awe in the presence of God. Psalm 48:1.' },
  { year: '2024', title: 'Alagbada Ina',   type: 'Single', sort_order: 4, desc: 'The God clothed in fire — a Yoruba-infused anthem from the burning bush encounter. Exodus 3:2.' },
  { year: '2024', title: 'RIVERS OF JOY', type: 'Single', sort_order: 5, desc: 'Spontaneous prophetic worship — a live encounter with the river that never runs dry.' },
  { year: '2023', title: 'The Mighty God', type: 'Single', sort_order: 6, desc: 'An encounter with the power and majesty of God — unstoppable, unshakeable, reigning above all. Isaiah 9:6.' },
  { year: '2023', title: 'Alaabo Mi',      type: 'Single', sort_order: 7, desc: 'My Praise — a Yoruba-language offering of pure adoration, surrendered wholly to the Lord.' },
  { year: '2023', title: 'Resolute',       type: 'Single', sort_order: 8, desc: 'A bold declaration of unwavering faith — standing firm, immovable, anchored in the promises of God.' },
]

export async function GET() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS ss_press_releases (id SERIAL PRIMARY KEY, year TEXT DEFAULT '', title TEXT NOT NULL, type TEXT DEFAULT 'Single', description TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`

    // Clear and re-seed cleanly
    await sql`DELETE FROM ss_press_releases`

    for (const r of releases) {
      await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES (${r.year}, ${r.title}, ${r.type}, ${r.desc}, ${r.sort_order})`
    }

    return NextResponse.json({ ok: true, seeded: releases.length })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
