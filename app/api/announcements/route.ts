import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM ss_announcements
      WHERE published = true
      AND (expires_at IS NULL OR expires_at >= current_date)
      ORDER BY created_at DESC
    `
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
