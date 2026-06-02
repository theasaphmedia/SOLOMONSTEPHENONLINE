import { NextRequest, NextResponse } from 'next/server'

const SETUP = `CREATE TABLE IF NOT EXISTS ss_blog_comments (
  id SERIAL PRIMARY KEY,
  post_id TEXT NOT NULL,
  name TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
)`

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { sql } = await import('@/lib/db')
    await sql.unsafe(SETUP)
    const rows = await sql`SELECT id, name, body, created_at FROM ss_blog_comments WHERE post_id = ${id} ORDER BY created_at ASC`
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { name, body } = await req.json()
    if (!name || !body || body.length < 3) return NextResponse.json({ error: 'Name and message required' }, { status: 400 })
    const { sql } = await import('@/lib/db')
    await sql.unsafe(SETUP)
    const rows = await sql`INSERT INTO ss_blog_comments (post_id, name, body) VALUES (${id}, ${name.slice(0,60)}, ${body.slice(0,800)}) RETURNING id, name, body, created_at`
    return NextResponse.json(rows[0])
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { sql } = await import('@/lib/db')
    const { id } = await req.json()
    await sql`DELETE FROM ss_blog_comments WHERE id = ${id}`
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
