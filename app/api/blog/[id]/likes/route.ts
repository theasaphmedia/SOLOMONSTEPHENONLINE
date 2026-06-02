import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { sql } = await import('@/lib/db')
    await sql`CREATE TABLE IF NOT EXISTS ss_blog_likes (id SERIAL PRIMARY KEY, post_id TEXT NOT NULL, fingerprint TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(post_id, fingerprint))`
    const rows = await sql`SELECT COUNT(*) as count FROM ss_blog_likes WHERE post_id = ${id}`
    return NextResponse.json({ count: Number(rows[0].count) })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { fingerprint } = await req.json()
    if (!fingerprint) return NextResponse.json({ error: 'Missing fingerprint' }, { status: 400 })
    const { sql } = await import('@/lib/db')
    await sql`CREATE TABLE IF NOT EXISTS ss_blog_likes (id SERIAL PRIMARY KEY, post_id TEXT NOT NULL, fingerprint TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(post_id, fingerprint))`

    // Check if already liked — toggle
    const existing = await sql`SELECT id FROM ss_blog_likes WHERE post_id = ${id} AND fingerprint = ${fingerprint}`
    if (existing.length) {
      await sql`DELETE FROM ss_blog_likes WHERE post_id = ${id} AND fingerprint = ${fingerprint}`
      const rows = await sql`SELECT COUNT(*) as count FROM ss_blog_likes WHERE post_id = ${id}`
      return NextResponse.json({ count: Number(rows[0].count), liked: false })
    } else {
      await sql`INSERT INTO ss_blog_likes (post_id, fingerprint) VALUES (${id}, ${fingerprint})`
      const rows = await sql`SELECT COUNT(*) as count FROM ss_blog_likes WHERE post_id = ${id}`
      return NextResponse.json({ count: Number(rows[0].count), liked: true })
    }
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
