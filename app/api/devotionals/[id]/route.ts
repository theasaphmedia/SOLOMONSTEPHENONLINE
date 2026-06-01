import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const rows = await sql`
      SELECT * FROM ss_devotionals
      WHERE id = ${id} AND published = true
      LIMIT 1
    `
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
