import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM ss_devotionals
      WHERE published = true
      ORDER BY published_at DESC
    `
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
