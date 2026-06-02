import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS ss_press_releases (id SERIAL PRIMARY KEY, year TEXT DEFAULT '', title TEXT NOT NULL, type TEXT DEFAULT 'Single', description TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`
    await sql`DELETE FROM ss_press_releases`
    await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES ('2026','LAVISH','Single','A worship single meditating on the relentless, inexplicable love of Jesus. Released June 6, 2026.',0)`
    await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES ('2024','CROSSOVER','Single','A prophetic declaration of passing through — beyond every limitation, into the fullness of God.',1)`
    await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES ('2024','AIKU','Single','Death could not hold Him. A bold, triumphant anthem declaring the resurrection power of Jesus.',2)`
    await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES ('2024','Awesome God','Single','A live worship experience capturing the atmosphere of surrender and awe in the presence of God.',3)`
    await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES ('2024','Alagbada Ina','Single','The God clothed in fire — a Yoruba-infused anthem from the burning bush encounter.',4)`
    await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES ('2024','RIVERS OF JOY','Single','Spontaneous prophetic worship — a live encounter with the river that never runs dry.',5)`
    await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES ('2023','The Mighty God','Single','An encounter with the power and majesty of God — unstoppable, unshakeable, reigning above all.',6)`
    await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES ('2023','Alaabo Mi','Single','My Praise — a Yoruba-language offering of pure adoration, surrendered wholly to the Lord.',7)`
    await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES ('2023','Resolute','Single','A bold declaration of unwavering faith — standing firm, immovable, anchored in the promises of God.',8)`
    const rows = await sql`SELECT COUNT(*) as total FROM ss_press_releases`
    return NextResponse.json({ ok: true, total: Number(rows[0].total) })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
