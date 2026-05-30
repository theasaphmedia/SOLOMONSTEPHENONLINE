import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sql } from '@/lib/db'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('ss_admin')?.value === 'true'
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await sql`SELECT * FROM ss_announcements ORDER BY created_at DESC`
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, body, link, link_label, expires_at } = await req.json()
  const rows = await sql`
    INSERT INTO ss_announcements (title, body, link, link_label, expires_at)
    VALUES (${title}, ${body}, ${link}, ${link_label}, ${expires_at || null})
    RETURNING *
  `
  return NextResponse.json(rows[0])
}

export async function DELETE(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await sql`DELETE FROM ss_announcements WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, ...fields } = await req.json()
  await sql`
    UPDATE ss_announcements SET
      title = ${fields.title}, body = ${fields.body}, link = ${fields.link},
      link_label = ${fields.link_label}, expires_at = ${fields.expires_at},
      published = ${fields.published}
    WHERE id = ${id}
  `
  return NextResponse.json({ ok: true })
}
