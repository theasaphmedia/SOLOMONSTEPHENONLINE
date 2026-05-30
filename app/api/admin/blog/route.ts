import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sql } from '@/lib/db'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('ss_admin')?.value === 'true'
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await sql`SELECT * FROM ss_blog ORDER BY published_at DESC`
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, excerpt, body, cover_url, category, published_at } = await req.json()
  const slug = slugify(title) + '-' + Date.now().toString(36)
  const rows = await sql`
    INSERT INTO ss_blog (title, slug, excerpt, body, cover_url, category, published_at)
    VALUES (${title}, ${slug}, ${excerpt}, ${body}, ${cover_url}, ${category || 'article'}, ${published_at || new Date().toISOString().split('T')[0]})
    RETURNING *
  `
  return NextResponse.json(rows[0])
}

export async function DELETE(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await sql`DELETE FROM ss_blog WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, ...fields } = await req.json()
  await sql`
    UPDATE ss_blog SET
      title = ${fields.title}, excerpt = ${fields.excerpt}, body = ${fields.body},
      cover_url = ${fields.cover_url}, category = ${fields.category},
      published = ${fields.published}, published_at = ${fields.published_at}
    WHERE id = ${id}
  `
  return NextResponse.json({ ok: true })
}
