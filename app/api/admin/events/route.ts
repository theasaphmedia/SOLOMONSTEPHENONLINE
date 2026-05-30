import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sql } from '@/lib/db'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('ss_admin')?.value === 'true'
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await sql`SELECT * FROM ss_events ORDER BY date DESC`
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, date, time, location, description, type, is_online, link, flyer_url } = await req.json()
  const rows = await sql`
    INSERT INTO ss_events (title, date, time, location, description, type, is_online, link, flyer_url)
    VALUES (${title}, ${date}, ${time}, ${location}, ${description}, ${type || 'special'}, ${is_online || false}, ${link}, ${flyer_url})
    RETURNING *
  `
  return NextResponse.json(rows[0])
}

export async function DELETE(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await sql`DELETE FROM ss_events WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, ...fields } = await req.json()
  await sql`
    UPDATE ss_events SET
      title = ${fields.title}, date = ${fields.date}, time = ${fields.time},
      location = ${fields.location}, description = ${fields.description},
      type = ${fields.type}, is_online = ${fields.is_online}, link = ${fields.link},
      flyer_url = ${fields.flyer_url}, published = ${fields.published}
    WHERE id = ${id}
  `
  return NextResponse.json({ ok: true })
}
