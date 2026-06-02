import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const fp = new URL(req.url).searchParams.get('fp')
    if (!fp) return NextResponse.json({ liked: false })
    const { sql } = await import('@/lib/db')
    const rows = await sql`SELECT id FROM ss_blog_likes WHERE post_id = ${id} AND fingerprint = ${fp}`
    return NextResponse.json({ liked: rows.length > 0 })
  } catch {
    return NextResponse.json({ liked: false })
  }
}
