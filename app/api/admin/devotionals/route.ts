import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sql } from '@/lib/db'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('ss_admin')?.value === 'true'
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await sql`SELECT * FROM ss_devotionals ORDER BY published_at DESC`
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, scripture, body, published_at } = await req.json()
  const rows = await sql`
    INSERT INTO ss_devotionals (title, scripture, body, published_at)
    VALUES (${title}, ${scripture}, ${body}, ${published_at || new Date().toISOString().split('T')[0]})
    RETURNING *
  `
  return NextResponse.json(rows[0])
}

export async function DELETE(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await sql`DELETE FROM ss_devotionals WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, ...fields } = await req.json()
  await sql`
    UPDATE ss_devotionals SET
      title = ${fields.title}, scripture = ${fields.scripture},
      body = ${fields.body}, published = ${fields.published},
      published_at = ${fields.published_at}
    WHERE id = ${id}
  `
  return NextResponse.json({ ok: true })
}
