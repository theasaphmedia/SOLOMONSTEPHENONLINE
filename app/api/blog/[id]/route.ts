import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { sql } = await import('@/lib/db')
    const rows = await sql`SELECT * FROM ss_blog WHERE (slug = ${id} OR CAST(id AS TEXT) = ${id}) AND published = true ORDER BY (slug = ${id}) DESC LIMIT 1`
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
