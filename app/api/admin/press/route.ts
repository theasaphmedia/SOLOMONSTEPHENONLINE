import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('ss_admin')?.value === 'true'
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { sql } = await import('@/lib/db')
    await sql`CREATE TABLE IF NOT EXISTS ss_press_facts (id SERIAL PRIMARY KEY, label TEXT NOT NULL, value TEXT NOT NULL, sort_order INTEGER DEFAULT 0)`
    await sql`CREATE TABLE IF NOT EXISTS ss_press_releases (id SERIAL PRIMARY KEY, year TEXT DEFAULT '', title TEXT NOT NULL, type TEXT DEFAULT 'Single', description TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`
    const facts = await sql`SELECT * FROM ss_press_facts ORDER BY sort_order ASC, id ASC`
    const releases = await sql`SELECT * FROM ss_press_releases ORDER BY sort_order ASC, id ASC`
    return NextResponse.json({ facts, releases })
  } catch (e) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { sql } = await import('@/lib/db')
    const body = await req.json()

    if (body.type === 'fact') {
      const { label, value, sort_order = 0 } = body
      if (!label || !value) return NextResponse.json({ error: 'label and value required' }, { status: 400 })
      await sql`INSERT INTO ss_press_facts (label, value, sort_order) VALUES (${label}, ${value}, ${sort_order})`
    } else if (body.type === 'release') {
      const { year = '', title, release_type = 'Single', description = '', sort_order = 0 } = body
      if (!title) return NextResponse.json({ error: 'title required' }, { status: 400 })
      await sql`INSERT INTO ss_press_releases (year, title, type, description, sort_order) VALUES (${year}, ${title}, ${release_type}, ${description}, ${sort_order})`
    } else {
      return NextResponse.json({ error: 'invalid type' }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { sql } = await import('@/lib/db')
    const { id, type } = await req.json()
    if (type === 'fact') {
      await sql`DELETE FROM ss_press_facts WHERE id = ${id}`
    } else {
      await sql`DELETE FROM ss_press_releases WHERE id = ${id}`
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
