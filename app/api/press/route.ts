import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { sql } = await import('@/lib/db')

    await sql`
      CREATE TABLE IF NOT EXISTS ss_press_facts (
        id SERIAL PRIMARY KEY,
        label TEXT NOT NULL,
        value TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS ss_press_releases (
        id SERIAL PRIMARY KEY,
        year TEXT DEFAULT '',
        title TEXT NOT NULL,
        type TEXT DEFAULT 'Single',
        description TEXT DEFAULT '',
        sort_order INTEGER DEFAULT 0
      )
    `

    const facts = await sql`SELECT * FROM ss_press_facts ORDER BY sort_order ASC, id ASC`
    const releases = await sql`SELECT * FROM ss_press_releases ORDER BY sort_order ASC, id ASC`

    return NextResponse.json({ facts, releases })
  } catch (error) {
    console.error('Press fetch error:', error)
    return NextResponse.json({ facts: [], releases: [] })
  }
}
